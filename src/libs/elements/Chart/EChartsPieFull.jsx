import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Select, Tooltip, Icon, InputNumber } from 'antd';
import { table } from 'open-js-tools';
import EChartsPie from './EChartsPie';
import DataEditor from '../DataEditor';


/**
  带数据编辑的饼图专用编辑器

  - 首次传递的 dataSource 将认为是原始数据，恢复时、DataEditor.Table 使用，所以 dataSource 为空时不应该渲染此组件
  - 饼图在使用数据时在 render 与 return 之间要经过以下处理
    - fiters sorter
    - useLastNDaysData 只保留最后N天数据
    - nameCol dataCol 指定饼图的名称与数据列，并对列进行聚合

    @author Witee<github.com/Witee>
    @date   2018-12-13
*/

class EChartsPieFull extends React.Component {
  constructor(props) {
    super(props);

    const {
      useLastNDaysData,
      filters,
      sorter,
      nameCol,
      dataCol,
      dataSource,
    } = props;

    /**
      恢复数据 及 DataEditor.Table 使用
    */
    this.originData = dataSource;

    this.state = {
      useLastNDaysData,
      filters,
      sorter,
      nameCol,
      dataCol,
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      useLastNDaysData,
      filters,
      sorter,
      nameCol,
      dataCol,
      dataSource,
    } = nextProps;

    this.setState({
      useLastNDaysData,
      filters,
      sorter,
      nameCol,
      dataCol,
      dataSource,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)) {
      return true;
    }
    return false;
  }

  handleTableEditorChange = ({ filters, sorter, result }) => {
    this.submitConfig({ filters, sorter });
    this.setState({ filters, sorter, dataSource: result });
  }

  handleTextEditorChange = (dataSource) => {
    this.setState({ dataSource });
  }

  /**
    恢复数据

    注意: 清除时不能设置为 undefined，因为父层如果使用 _.merge() 会忽略 undefined 的值，所以这里设置成了 null
  */
  handleReloadClick = () => {
    this.setState({
      filters: null,
      sorter: null,
      nameCol: null,
      dataCol: null,
      useLastNDaysData: 0,
      dataSource: this.originData,
    });
    this.submitConfig({
      filters: null,
      sorter: null,
      nameCol: null,
      dataCol: null,
      useLastNDaysData: 0,
    });
  }

  /**
    使用最后 N 天数据
  */
  handleUseLastNDaysDataChange = (value) => {
    this.setState({ useLastNDaysData: value });
    this.submitConfig({ useLastNDaysData: value });
  }

  /**
    名称列
  */
  handleNameColSelect = (value) => {
    this.setState({ nameCol: value });
    this.submitConfig({ nameCol: value });
  }

  /**
    数据列
  */
  handleDataColSelect = (value) => {
    this.setState({ dataCol: value });
    this.submitConfig({ dataCol: value });
  }

  /**
    图表配置变化
  */
  handleChartChange = (config = {}) => {
    this.submitConfig(config);
  }

  /**
    提交数据
  */
  submitConfig = (config = {}) => {
    const { onChange } = this.props;
    if (_.isFunction(onChange)) {
      onChange(config);
    }
  }

  render() {
    const {
      useLastNDaysData,
      filters,
      sorter,
      nameCol,
      dataCol,
      dataSource,
    } = this.state;

    const {
      title,
      theme,
      backgroundColor,
      chartHeight,
      toolbox,
      legend,
      series,
    } = this.props;

    let newDataSource = _.cloneDeep(dataSource);

    /**
      过滤与排序
    */
    newDataSource = table.filterAndSorter(newDataSource, filters, sorter);

    const header = _.get(newDataSource, 0, null);
    let body = _.slice(newDataSource, 1);
    const bodyLength = _.get(body, 'length', 0);
    /**
      只保留最后N天数据

      获取 body 中最大的日期 maxDate，然后保留比 maxDate 大 useLastNDaysData 天内数据
    */
    if (useLastNDaysData > 0) {
      const maxDateObj = _.maxBy(body, (d) => (moment(_.get(d, 0, null))));
      const maxDate = _.get(maxDateObj, 0, null);
      if (maxDate) {
        body = _.filter(body, (ds) => (moment(_.get(ds, 0, null)).add(useLastNDaysData, 'days') > moment(maxDate)));
        const tmpData = _.cloneDeep(body);
        tmpData.unshift(header);
        newDataSource = _.cloneDeep(tmpData);
      }
    }

    /**
      将指定的列聚合，每个名称列的名称只保留一个，数据相加，用于只需要一列名称、一列数据的图表，如饼图、词云图

      从 header 中分别找到选中 nameCol、dataCol 列的 index，
      将 body 聚合，同样名称作为 nameIndex 作为 key，dataIndex 作为 values，
      循环 values，计算每个 name 对应 data 的总和，最后将 headerName, headerDataName 作为表头，
      生成最终 名称,数据 结构的数据:
        即: [
              [HEADER_NAME, HEADER_DATA_NAME],
              [NAME, DATA],
              ...
            ]
    */
    let aggrData = _.cloneDeep(newDataSource);
    if (nameCol && bodyLength > 0 && dataCol && nameCol !== dataCol) {
      const nameIndex = _.indexOf(header, nameCol);
      const dataIndex = _.indexOf(header, dataCol);

      if (nameIndex >= 0) {
        const grouppedData = _.groupBy(body, (b) => (_.get(b, nameIndex)));

        aggrData = _.map(grouppedData, (value, key) => {
          const name = key;
          const num = _.sumBy(value, (v) => (_.parseInt(_.get(v, dataIndex, 0))));
          return [name, num];
        });

        const headerName = _.get(header, nameIndex, null);
        const headerDataName = _.get(header, dataIndex, null);

        aggrData.unshift([headerName, headerDataName]);
      }
    }

    /**
      根据数据量动态设置 textarea 高度
    */
    const dataLength = _.get(newDataSource, 'length', 0);
    let textareaRows = 4;
    if (dataLength >= 20) {
      textareaRows = 38;
    } else {
      textareaRows = dataLength * 2;
    }

    return (
      <div>
        <EChartsPie
          title={title}
          theme={theme}
          backgroundColor={backgroundColor}
          chartHeight={chartHeight}
          toolbox={toolbox}
          legend={legend}
          series={series}
          dataset={{ source: aggrData }}
          onChange={this.handleChartChange}
        />

        <Row className="toolbar">
          <Col span={4} className="margin-top-bottom-middle tool">
            <Button icon="reload" onClick={this.handleReloadClick}>重置</Button>
          </Col>

          <Col span={8} className="margin-top-bottom-middle tool">
            <div className="tool">
              <b>动态过滤:&nbsp;&nbsp;</b>
              使用最后
              <InputNumber
                size="small"
                min={0}
                max={99}
                value={useLastNDaysData}
                onChange={this.handleUseLastNDaysDataChange}
              />
              天数据
              <Tooltip title="0 表示不过滤">
                <Icon type="question-circle-o" className="icon" />
              </Tooltip>
            </div>
          </Col>

          <Col span={6} className="margin-top-bottom-middle tool">
            <b>名称列:&nbsp;&nbsp;</b>
            <Select
              value={nameCol}
              style={{ width: 140 }}
              disabled={!header}
              onChange={this.handleNameColSelect}
            >
              {_.map(header, (h) => (
                <Select.Option key={h} value={h}>{h}</Select.Option>
              ))}
            </Select>
          </Col>

          <Col span={6} className="margin-top-bottom-middle tool">
            <b>数据列:&nbsp;&nbsp;</b>
            <Select
              value={dataCol}
              style={{ width: 140 }}
              disabled={!header}
              onChange={this.handleDataColSelect}
            >
              {_.map(header, (h) => (
                <Select.Option key={h} value={h}>{h}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <DataEditor.Table
              size="small"
              toolbar={<h6>使用表格编辑</h6>}
              filters={filters}
              sorter={sorter}
              dataSource={newDataSource}
              onChange={this.handleTableEditorChange}
            />
          </Col>
          <Col span={12}>
            <DataEditor.Text
              rows={textareaRows}
              toolbar={<h6>使用文本编辑</h6>}
              dataSource={newDataSource}
              onChange={this.handleTextEditorChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

EChartsPieFull.propTypes = {
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  legend: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  sorter: PropTypes.object,
  useLastNDaysData: PropTypes.number,
  nameCol: PropTypes.string, // 饼图 需要指定名称列与数据列
  dataCol: PropTypes.string, // 饼图 需要指定名称列与数据列
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
};

EChartsPieFull.defaultProps = {
  title: undefined,
  theme: 'default',
  backgroundColor: '#FFFFFF',
  chartHeight: 420,
  toolbox: { feature: { saveAsImage: { title: '下载', pixelRatio: 5 } }, top: '10%' },
  legend: undefined,
  series: [{ type: 'pie' }],
  filters: undefined,
  sorter: undefined,
  useLastNDaysData: 0, // 0 表示使用所有数据
  nameCol: undefined,
  dataCol: undefined,
  dataSource: [[]],
  onChange: undefined,
};

export default EChartsPieFull;
