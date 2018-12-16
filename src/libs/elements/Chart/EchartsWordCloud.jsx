import React from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { Row, Col, Form } from 'antd';
import 'echarts-wordcloud';
import 'echarts/theme/macarons.js';
import Title from './configs/Title';
import Theme from './configs/Theme';
import Height from './configs/Height';
import Toolbox from './configs/Toolbox';
// import Legend from './configs/Legend';
import SeriesWordCloud from './configs/series/WordCloud';
import Baseline from '../Baseline';

const colors = [
  '#2874D7', '#70D12D', '#ECB513', '#1BCFE7', '#B8C0F2',
  '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
];

const defaultConfigs = {
  type: 'wordCloud',
  shape: 'circle',
  left: 'center',
  top: 'center',
  width: '70%',
  height: '80%',
  rotationStep: 45,
  drawOutOfBound: false,
  gridSize: 8,
  rotationRange: [-90, 90],
  sizeRange: [12, 60],
  textStyle: {
    emphasis: { shadowBlur: 10, shadowColor: '#333' },
    normal: {
      fontWeight: 'normal',
      color: () => (`rgb(${[Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',')})`),
    },
  },
};

/**
  echarts 词云图配置器 - 使用图形化的方式配置 echarts4.x 图表

  - 除 theme、chartHeight 外其它参数均为 echarts4.x 的标准参数，简称[标准参数]
  - [标准参数]只能是 echarts4.x 的顶级参数
      即: http://www.echartsjs.com/option.html#title 中 .setOption() 中直接子参数
  - 每一个[标准参数]都返回其所有的配置，如 title = {text: '', ....}
  - 数据需要在本组件外处理完成，并通过[标准参数]中的 dataset 传递，只支持以下一种格式
      即: 只有两列，(第一行为 dimensions(维度名、表头)，使用时排除掉，返回时再添加:
        dataset = {
          source: [
            ['词', '值'],
            ['搞笑幽默', 3535333],
            ['新闻趣事', 786129],
            ['视频音乐', 745129],
            ['八卦杂谈', 692445],
          ]
        }
    注意：
      - 在实际上，词云的数据是保存在 series[0].data 中，但为了统一，放在了 dataset.source 中，
        所以在接收 dataset 参数时需要将数据转到 series[0].data 中，在返回时需要做相反操作
      - series[0].data 格式为 [ {name: xxx, value: xxx} ]
        - dataset.source 第一列维度、表头，使用时需要排除，返回时再添加

  @author Witee<github.com/Witee>
  @date   2018-12-05
  @update 2018-12-10
*/
class EChartsWordCloud extends React.Component {
  constructor(props) {
    super(props);

    const {
      theme,
      chartHeight,
      // [标准参数]
      title,
      backgroundColor,
      toolbox,
      // legend,
      series,
      dataset,
    } = props;

    /**
      首次加载时保存 header，在返回值时会使用
    */
    this.header = _.get(dataset, ['source', 0], []);

    const [newSeries, newDataset] = this.exchangeValues('toSeries', series, dataset);

    this.state = {
      theme,
      chartHeight,
      // [标准参数]
      title,
      backgroundColor,
      toolbox,
      // legend,
      series: [_.assign(defaultConfigs, newSeries[0])],
      dataset: newDataset,
    };
  }

  /**
    完成加载后回传一次数据，使父层获取初始值
  */
  componentDidMount() {
    this.handleConfigChange();
  }

  componentWillReceiveProps(nextProps) {
    const {
      title,
      theme,
      backgroundColor,
      chartHeight,
      toolbox,
      // legend,
      series,
      dataset,
    } = this.props;

    const [newSeries, newDataset] = this.exchangeValues('toSeries', series, dataset);
    const [nextSeries, nextDataset] = this.exchangeValues('toSeries', nextProps.series, nextProps.dataset);

    const needUpdate = {};

    if (!_.isEqual(title, nextProps.title)) { needUpdate.title = nextProps.title; }
    if (!_.isEqual(theme, nextProps.theme)) { needUpdate.theme = nextProps.theme; }
    if (!_.isEqual(backgroundColor, nextProps.backgroundColor)) { needUpdate.backgroundColor = nextProps.backgroundColor; }
    if (!_.isEqual(chartHeight, nextProps.chartHeight)) { needUpdate.chartHeight = nextProps.chartHeight; }
    if (!_.isEqual(toolbox, nextProps.toolbox)) { needUpdate.toolbox = nextProps.toolbox; }
    // if (!_.isEqual(legend, nextProps.legend)) { needUpdate.legend = nextProps.legend; }
    if (!_.isEqual(newSeries, nextSeries)) { needUpdate.series = nextSeries; }
    if (!_.isEqual(newDataset, nextDataset)) { needUpdate.dataset = nextDataset; }

    if (!_.isEmpty(needUpdate)) {
      this.setState(needUpdate);
    }
  }

  onTitleChange = (title) => {
    this.setState({ title });
    this.handleConfigChange({ title });
  };

  onThemeChange = ({ theme, backgroundColor }) => {
    this.setState({ theme, backgroundColor });
    this.handleConfigChange({ theme, backgroundColor });
  };

  onChartHeightChange = (chartHeight) => {
    const intChartHeight = _.parseInt(chartHeight);
    this.setState({ chartHeight: intChartHeight });
    this.handleConfigChange({ chartHeight: intChartHeight });
  }

  onToolboxChange = (toolbox) => {
    this.setState({ toolbox });
    this.handleConfigChange({ toolbox });
  };

  // onLegendChange = (legend) => {
  //   this.setState({ legend });
  //   this.handleConfigChange({ legend });
  // };

  onSeriesChange = (series) => {
    this.setState({ series });
    this.handleConfigChange({ series });
  };

  getOption = () => {
    const {
      title,
      backgroundColor,
      toolbox,
      // legend,
      series,
      dataset,
    } = this.state;

    return {
      color: colors,
      backgroundColor,
      title,
      toolbox,
      // legend,
      series,
      dataset,
    };
  }

  /**
    监听所有配置变化，通过 onChange 返回
    注意参数 newConfig 必须是对象
  */
  handleConfigChange = (newConfig = {}) => {
    const { onChange } = this.props;
    if (_.isFunction(onChange)) {
      const {
        title,
        theme,
        backgroundColor,
        chartHeight,
        toolbox,
        // legend,
        series,
        dataset,
      } = this.state;

      const [newSeries, newDataset] = this.exchangeValues('toDataset', series, dataset);

      const oldConfigs = {
        title,
        theme,
        backgroundColor,
        chartHeight,
        toolbox,
        // legend,
        series,
        dataset,
      };

      const finalConfigs = _.assign(oldConfigs, newConfig, { series: newSeries }, { dataset: newDataset });

      // 回传
      onChange(finalConfigs);
    }
  }

  /**
    将值在 series[0].data 与 dataset.source 之间移动，并转换格式
      - toDataset 表示将 series[0].data 的值移动到 dataset.source 中
      - toSeries 表示将 dataset.source 的值移动到 series[0].data 中

    数据格式转换:
      - dataset.source 第一列为表头，toSeries 时需要排除掉，toDataset 时需要添加(header 保存在 this.header 中)
      - series[0].data = [{name: xxx, value: xxx}, ...]
      - dataset.source = [[xxx, xxx], ...]
  */
  exchangeValues = (type, series, dataset) => {
    const clonedSeries = _.cloneDeep(series);
    const clonedDataset = _.cloneDeep(dataset);

    if (type === 'toDataset') {
      /**
        [{name: xxx, value: xxx}, ...] --> [[xxx, xxx], ...]
        第一条数据为表头，需要添加
      */
      const data = _.get(clonedSeries, [0, 'data'], []);
      const newData = [];
      _.forEach(data, (d) => {
        newData.push([_.get(d, 'name', null), _.get(d, 'value', null)]);
      });

      newData.unshift(this.header);

      _.set(clonedDataset, 'source', newData);
      _.unset(clonedSeries, [0, 'data']);
    } else if (type === 'toSeries') {
      /**
        [[xxx, xxx], ...]  --> [{name: xxx, value: xxx}, ...]
        第一条数据为表头，需要排除
      */
      const data = _.get(clonedDataset, 'source', []);
      const body = _.slice(data, 1);
      const newData = [];
      _.forEach(body, (b) => {
        newData.push({
          name: _.get(b, 0, null),
          value: _.get(b, 1, null),
        });
      });

      _.set(clonedSeries, [0, 'data'], newData);
      _.unset(clonedDataset, 'source');
    }

    return [clonedSeries, clonedDataset];
  }

  render() {
    const {
      editable,
      style,
      configStyle,
      colorPickerConfig,
    } = this.props;

    const {
      title,
      theme,
      backgroundColor,
      chartHeight,
      toolbox,
      // legend,
      series,
    } = this.state;

    /**
      配置区域的高度跟随图表高度
    */
    const newConfigHeight = _.get(configStyle, 'height', `${chartHeight}px`);
    const oldConfigStyle = { height: newConfigHeight, overflow: 'scroll', padding: '0 0.8rem 0 0', backgroundColor: '#f7f7f7', borderRadius: '4px' };
    const newConfigStyle = _.assign(oldConfigStyle, configStyle);

    return (
      <Row style={style} gutter={16}>
        {editable && (
          <Col span={editable ? 8 : 0} style={newConfigStyle}>
            <Form>
              <Title
                title={_.cloneDeep(title)}
                onChange={this.onTitleChange}
              />

              <Theme
                theme={theme}
                backgroundColor={backgroundColor}
                colorPickerConfig={colorPickerConfig}
                onChange={this.onThemeChange}
              />

              <Height
                defaultValue={chartHeight}
                onHeightSet={this.onChartHeightChange}
              />

              <Toolbox
                /**
                  const { toolbox } = this.state; 是 toolbox 的浅拷贝，对 toolbox 的修改就是对其本身的修改
                  所以需要创建一个新的对象才能使 equal 对比时出现不相等的情况
                */
                toolbox={_.cloneDeep(toolbox)}
                onChange={this.onToolboxChange}
              />

              {/* <Legend
                legend={_.cloneDeep(legend)}
                onChange={this.onLegendChange}
              /> */}

              <SeriesWordCloud
                series={_.cloneDeep(series)}
                onChange={this.onSeriesChange}
              />
            </Form>

            <Baseline />
          </Col>
        )}

        <Col span={editable ? 16 : 24}>
          <ReactECharts
            option={this.getOption()}
            notMerge={false}
            lazyUpdate={false}
            theme={theme}
            style={{ height: `${chartHeight}px` }}
          />
        </Col>
      </Row>
    );
  }
}

EChartsWordCloud.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.object,
  configStyle: PropTypes.object,
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  colorPickerConfig: PropTypes.object,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  // legend: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  dataset: PropTypes.object,
  onChange: PropTypes.func,
};

EChartsWordCloud.defaultProps = {
  editable: true,
  style: {},
  configStyle: {},
  title: undefined,
  theme: 'default',
  backgroundColor: '#FFFFFF',
  colorPickerConfig: undefined,
  chartHeight: 420,
  toolbox: { feature: { saveAsImage: { title: '下载', pixelRatio: 5 } }, top: '10%' },
  // legend: undefined,
  series: [{ type: 'wordCloud' }],
  dataset: undefined,
  onChange: undefined,
};

export default EChartsWordCloud;
