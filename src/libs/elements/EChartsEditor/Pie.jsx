import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import ReactECharts from './ReactECharts';
import Title from './configs/Title';
import Theme from './configs/Theme';
import Height from './configs/Height';
import Toolbox from './configs/Toolbox';
import Legend from './configs/Legend';
import SeriesPie from './configs/series/Pie';
import Baseline from '../Baseline';
import PlaceHolder from '../Placeholder';

const colors = [
  '#2874D7', '#70D12D', '#ECB513', '#1BCFE7', '#B8C0F2',
  '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
];

/**
  echarts 饼图配置器 - 使用图形化的方式配置 echarts4.x 图表

  - 通用说明
    - 除 theme、chartHeight 外其它参数均为 echarts4.x 的标准参数，简称[标准参数]
    - [标准参数]只能是 echarts4.x 的顶级参数
        即: http://www.echartsjs.com/option.html#title 中 .setOption() 中直接子参数
    - 每一个[标准参数]都返回其所有的配置，如 title = {text: '', ....}
    - 数据需要在本组件外处理完成，并通过[标准参数]中的 dataset 传递，只支持以下一种格式
        即，只有两列，第一列为 dimensions(维度)，第二列为数值:
          dataset = {
            source: [
              ['浏览方式', '次数'],
              ['直接访问', 335],
              ['邮件营销', 310],
              ['联盟广告', 234],
              ['视频广告', 135],
              ['搜索引擎', 1548],
            ]
          }


  @author Witee<github.com/Witee>
  @date   2018-12-05
  @update 2018-12-17
*/
class PieEditor extends React.Component {
  constructor(props) {
    super(props);

    const {
      theme,
      chartHeight,
      // [标准参数]
      title,
      backgroundColor,
      toolbox,
      legend,
      series,
      dataset,
    } = props;

    this.state = {
      theme,
      chartHeight,
      // [标准参数]
      title,
      backgroundColor,
      toolbox,
      legend,
      series,
      dataset,
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
      legend,
      series,
      dataset,
    } = this.props;

    const needUpdate = {};

    if (!_.isEqual(title, nextProps.title)) { needUpdate.title = nextProps.title; }
    if (!_.isEqual(theme, nextProps.theme)) { needUpdate.theme = nextProps.theme; }
    if (!_.isEqual(backgroundColor, nextProps.backgroundColor)) { needUpdate.backgroundColor = nextProps.backgroundColor; }
    if (!_.isEqual(chartHeight, nextProps.chartHeight)) { needUpdate.chartHeight = nextProps.chartHeight; }
    if (!_.isEqual(toolbox, nextProps.toolbox)) { needUpdate.toolbox = nextProps.toolbox; }
    if (!_.isEqual(legend, nextProps.legend)) { needUpdate.legend = nextProps.legend; }
    if (!_.isEqual(series, nextProps.series)) { needUpdate.series = nextProps.series; }
    if (!_.isEqual(dataset, nextProps.dataset)) { needUpdate.dataset = nextProps.dataset; }

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

  onLegendChange = (legend) => {
    this.setState({ legend });
    this.handleConfigChange({ legend });
  };

  onSeriesChange = (series) => {
    this.setState({ series });
    this.handleConfigChange({ series });
  };

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
        legend,
        series,
        dataset,
      } = this.state;
      const oldConfigs = {
        title,
        theme,
        backgroundColor,
        chartHeight,
        toolbox,
        legend,
        series,
        dataset,
      };

      const finalConfigs = _.assign(oldConfigs, newConfig);

      // 回传
      onChange(finalConfigs);
    }
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
      legend,
      series,
      dataset,
    } = this.state;

    const dataSource = _.get(dataset, 'source', []);
    const header = _.get(dataSource, 0, []);
    const body = _.slice(dataSource, 1);
    const headerLength = _.get(header, 'length', 0);
    const bodyLength = _.get(body, 'length', 0);

    /**
      配置区域的高度跟随图表高度
    */
    const newConfigHeight = _.get(configStyle, 'height', `${chartHeight}px`);
    const oldConfigStyle = { height: newConfigHeight, overflow: 'scroll', padding: '0 0.8rem 0 0', backgroundColor: '#f7f7f7', borderRadius: '4px' };
    const newConfigStyle = _.assign(oldConfigStyle, configStyle);

    const newLegend = _.cloneDeep(legend);
    const legendColumn = _.get(newLegend, 'column', undefined);

    // 设置 legend.column、legend.data 默认值
    if (_.isUndefined(legendColumn) && headerLength >= 2) {
      _.set(newLegend, 'column', _.get(header, 0));
    }
    if (bodyLength > 0) {
      const newLegendColumn = _.get(newLegend, 'column', undefined);
      if (newLegendColumn) {
        const legendColumnIndex = _.findIndex(header, (d) => (d === newLegendColumn));
        const grouppedBody = _.groupBy(body, legendColumnIndex);
        _.set(newLegend, 'data', _.keys(grouppedBody));
      }
    }

    const option = {
      color: colors,
      backgroundColor,
      title,
      toolbox,
      legend: newLegend,
      series,
      dataset,
      tooltip: { show: true },
    };

    if (headerLength !== 2) {
      return <PlaceHolder text="数据不合法，数据只能为 2 列，如 名称、数值" />;
    }
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

              <Legend
                legend={_.cloneDeep(newLegend)}
                onChange={this.onLegendChange}
              />

              <SeriesPie
                series={_.cloneDeep(series)}
                onChange={this.onSeriesChange}
              />
            </Form>

            <Baseline />
          </Col>
        )}

        <Col span={editable ? 16 : 24}>
          <ReactECharts
            option={option}
            theme={theme}
            height={chartHeight}
          />
        </Col>
      </Row>
    );
  }
}

PieEditor.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.object,
  configStyle: PropTypes.object,
  title: PropTypes.object,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  colorPickerConfig: PropTypes.object,
  chartHeight: PropTypes.number,
  toolbox: PropTypes.object,
  legend: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  dataset: PropTypes.object,
  onChange: PropTypes.func,
};

PieEditor.defaultProps = {
  editable: true,
  style: {},
  configStyle: {},
  title: undefined,
  theme: 'default',
  backgroundColor: '#FFFFFF',
  colorPickerConfig: undefined,
  chartHeight: 420,
  toolbox: { feature: { saveAsImage: { title: '下载', pixelRatio: 5 } }, top: '10%' },
  legend: { show: true }, // legend 不能为 undefined，否则在 render 时不参设置默认值
  series: [{ type: 'pie' }],
  dataset: undefined,
  onChange: undefined,
};

export default PieEditor;
