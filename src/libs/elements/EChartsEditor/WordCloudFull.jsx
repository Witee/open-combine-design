import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { table } from 'open-js-tools';
import WordCloud from './WordCloud';
import DataEditor from '../DataEditor';
import './style.css';


/**
  带数据编辑的词云图专用编辑器

  - 首次传递的 dataSource 将认为是原始数据，恢复时、DataEditor.Table 使用，所以 dataSource 为空时不应该渲染此组件
  - 词云图在使用数据时在 render 与 return 之间要经过以下处理
    - fiters sorter
    - useLastNDaysData 只保留最后N天数据
    - nameCol dataCol 指定词云图的名称与数据列，并对列进行聚合
    - 图表使用的数据与数据编辑器使用的图不同

    @author Witee<github.com/Witee>
    @date   2018-12-14
    @update 2018-12-19
*/

class WordCloudFull extends React.Component {
  constructor(props) {
    super(props);

    const {
      filters,
      sorter,
      dataSource,
    } = props;

    /**
      恢复数据 及 DataEditor.Table 使用
    */
    this.originData = dataSource;

    this.state = {
      filters,
      sorter,
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters,
      sorter,
      dataSource,
    } = nextProps;

    this.setState({
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
      dataSource: this.originData,
    });
    this.submitConfig({
      filters: null,
      sorter: null,
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
      filters,
      sorter,
      dataSource,
    } = this.state;

    const {
      title,
      theme,
      backgroundColor,
      chartHeight,
      toolbox,
      series,
    } = this.props;

    let newDataSource = _.cloneDeep(dataSource);

    /**
      过滤与排序
    */
    newDataSource = table.filterAndSorter(newDataSource, filters, sorter);

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
        <WordCloud
          title={title}
          theme={theme}
          backgroundColor={backgroundColor}
          chartHeight={chartHeight}
          toolbox={toolbox}
          series={series}
          dataset={{ source: newDataSource }} // 图表使用的数据与数据编辑器使用的数据不同
          onChange={this.handleChartChange}
        />

        <Row className="toolbar">
          <Col span={4} className="margin-top-bottom-middle tool">
            <Button icon="reload" onClick={this.handleReloadClick}>重置</Button>
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

WordCloudFull.propTypes = {
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  sorter: PropTypes.object,
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
};

WordCloudFull.defaultProps = {
  title: undefined,
  theme: 'default',
  backgroundColor: '#FFFFFF',
  chartHeight: 420,
  toolbox: { feature: { saveAsImage: { title: '下载', pixelRatio: 5 } }, top: '10%' },
  series: [{ type: 'wordCloud' }],
  filters: undefined,
  sorter: undefined,
  dataSource: [[]],
  onChange: undefined,
};

export default WordCloudFull;
