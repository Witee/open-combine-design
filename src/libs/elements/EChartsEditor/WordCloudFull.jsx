import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Select } from 'antd';
import { table } from 'open-js-tools';
import WordCloud from './WordCloud';
import DataEditor from '../DataEditor';
import './style.css';


/**
  带数据编辑的词云图专用编辑器

  - 首次传递的 dataSource 将认为是原始数据，恢复时、DataEditor.Table 使用，所以 dataSource 为空时不应该渲染此组件
  - 词云图在使用数据时在 render 与 return 之间要经过以下处理
    - fiters sorter
    - wordCol wordFreqCol 指定词云图的名称与数据列
    - 图表使用的数据与数据编辑器使用的数据不同

    @author Witee<github.com/Witee>
    @date   2018-12-14
    @update 2019-01-02
*/

class WordCloudFull extends React.Component {
  constructor(props) {
    super(props);

    const {
      filters,
      sorter,
      wordCol,
      wordFreqCol,
      dataSource,
    } = props;

    /**
      恢复数据 及 DataEditor.Table 使用
    */
    this.originData = dataSource;

    this.state = {
      filters,
      sorter,
      wordCol,
      wordFreqCol,
      dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters,
      sorter,
      wordCol,
      wordFreqCol,
      dataSource,
    } = nextProps;

    this.setState({
      filters,
      sorter,
      wordCol,
      wordFreqCol,
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
      wordCol: null,
      wordFreqCol: null,
      dataSource: this.originData,
    });
    this.submitConfig({
      filters: null,
      sorter: null,
      wordCol: null,
      wordFreqCol: null,
    });
  }

  /**
    词列
  */
  handleNameColSelect = (value) => {
    this.setState({ wordCol: value });
    this.submitConfig({ wordCol: value });
  }

  /**
    词频列
  */
  handleDataColSelect = (value) => {
    this.setState({ wordFreqCol: value });
    this.submitConfig({ wordFreqCol: value });
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
      wordCol,
      wordFreqCol,
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

    const header = _.get(newDataSource, 0, null);
    const headerLength = _.get(header, 'length', 0);
    const body = _.slice(newDataSource, 1);

    /**
      指定 WordCloud 使用的 词、词频 列

      wordCol 默认倒数第二列
      wordFreqCol 默认倒数第一列

      WordCloud 只接收2列，即，词、词频

      @author Witee<github.com/Witee>
      @date   2019-01-02
    */
    const wordCloudData = []; // 最终生成的数据只能有两列，一列词，一列词频
    let newWordCol = wordCol;
    let newWordFreqCol = wordFreqCol;

    if (headerLength >= 2) {
      if (_.isEmpty(wordCol)) {
        newWordCol = _.get(header, (headerLength - 2));
      }
      if (_.isEmpty(wordFreqCol)) {
        newWordFreqCol = _.get(header, (headerLength - 1));
      }


      const wordIndex = _.indexOf(header, newWordCol);
      const wordFreqIndex = _.indexOf(header, newWordFreqCol);

      if (wordIndex >= 0) {
        _.forEach(body, (b) => {
          wordCloudData.push([_.get(b, wordIndex, null), _.get(b, wordFreqIndex, null)]);
        });

        const headerName = _.get(header, wordIndex, null);
        const headerDataName = _.get(header, wordFreqIndex, null);

        wordCloudData.unshift([headerName, headerDataName]);
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
        <WordCloud
          title={title}
          theme={theme}
          backgroundColor={backgroundColor}
          chartHeight={chartHeight}
          toolbox={toolbox}
          series={series}
          dataset={{ source: wordCloudData }}
          onChange={this.handleChartChange}
        />

        <Row className="toolbar">
          <Col span={4} className="margin-top-bottom-middle tool">
            <Button icon="reload" onClick={this.handleReloadClick}>重置</Button>
          </Col>

          <Col span={6} className="margin-top-bottom-middle tool">
            <b>词:&nbsp;&nbsp;</b>
            <Select
              value={newWordCol}
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
            <b>词频:&nbsp;&nbsp;</b>
            <Select
              value={newWordFreqCol}
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

WordCloudFull.propTypes = {
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  sorter: PropTypes.object,
  wordCol: PropTypes.string, // 词云图 词对应的列
  wordFreqCol: PropTypes.string, // 词云图 词频对应的列
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
  wordCol: undefined,
  wordFreqCol: undefined,
  dataSource: [[]],
  onChange: undefined,
};

export default WordCloudFull;
