import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Tooltip, Icon, InputNumber } from 'antd';
import { table } from 'open-js-tools';
import LineBar from './LineBar';
import DataEditor from '../DataEditor';
import './style.css';


/**
  带数据编辑的 折线/柱状图 专用编辑器

  - 首次传递的 dataSource 将认为是原始数据，恢复时、DataEditor.Table 使用，所以 dataSource 为空时不应该渲染此组件
  - 饼图在使用数据时在 render 与 return 之间要经过以下处理
    - fiters sorter
    - useLastNDaysData 只保留最后N天数据
    - 图表使用的数据与数据编辑器使用的图不同

    @author Witee<github.com/Witee>
    @date   2018-12-17
*/

class LineBarFull extends React.Component {
  constructor(props) {
    super(props);

    const {
      useLastNDaysData,
      filters,
      sorter,
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
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      useLastNDaysData,
      filters,
      sorter,
      dataSource,
    } = nextProps;

    this.setState({
      useLastNDaysData,
      filters,
      sorter,
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
      useLastNDaysData: 0,
      dataSource: this.originData,
    });
    this.submitConfig({
      filters: null,
      sorter: null,
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
      dataSource,
    } = this.state;

    const {
      title,
      theme,
      backgroundColor,
      colorPickerConfig,
      chartHeight,
      toolbox,
      legend,
      xAxis,
      yAxis,
      series,
    } = this.props;

    let newDataSource = _.cloneDeep(dataSource);

    /**
      过滤与排序
    */
    newDataSource = table.filterAndSorter(newDataSource, filters, sorter);

    const header = _.get(newDataSource, 0, null);
    let body = _.slice(newDataSource, 1);

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
        <LineBar
          title={title}
          theme={theme}
          backgroundColor={backgroundColor}
          colorPickerConfig={colorPickerConfig}
          chartHeight={chartHeight}
          toolbox={toolbox}
          legend={legend}
          xAxis={xAxis}
          yAxis={yAxis}
          series={series}
          dataset={{ source: newDataSource }}
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

LineBarFull.propTypes = {
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  colorPickerConfig: PropTypes.object,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  legend: PropTypes.object,
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  sorter: PropTypes.object,
  useLastNDaysData: PropTypes.number,
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
};

LineBarFull.defaultProps = {
  title: undefined,
  theme: 'default',
  backgroundColor: '#FFFFFF',
  colorPickerConfig: undefined,
  chartHeight: 420,
  toolbox: { feature: { saveAsImage: { title: '下载', pixelRatio: 5 } }, top: '10%' },
  legend: undefined,
  xAxis: undefined,
  yAxis: undefined,
  series: undefined,
  filters: undefined,
  sorter: undefined,
  useLastNDaysData: 0, // 0 表示使用所有数据
  dataSource: [[]],
  onChange: undefined,
};

export default LineBarFull;
