import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import { table } from 'open-js-tools';
import ReactECharts from './ReactECharts';
import Title from './configs/Title';
import Theme from './configs/Theme';
import Height from './configs/Height';
import Toolbox from './configs/Toolbox';
import Legend from './configs/Legend';
import SeriesLineBar from './configs/series/LineBar';
import XAxis from './configs/XAxis';
import YAxis from './configs/YAxis';
import Baseline from '../Baseline';

/**
  echarts 折线、柱状图配置器 - 使用图形化的方式配置 echarts4.x 图表

  - 通用说明
    - 除 theme、chartHeight 外其它参数均为 echarts4.x 的标准参数，简称[标准参数]
    - [标准参数]只能是 echarts4.x 的顶级参数
        即: http://www.echartsjs.com/option.html#title 中 .setOption() 中直接子参数
    - 每一个[标准参数]都返回其所有的配置，如 title = {text: '', ....}
    - 数据需要在本组件外处理完成，并通过[标准参数]中的 dataset 传递，只支持以下一种格式
        即 (第一列为 dimensions(维度名) ):
          dataset = {
            source: [
              ['日期', '平台', '声量'],
              ['2018-07-20', '微博', 52872],
              ['2018-07-20', '微信', 8510],
              ['2018-07-21', '微博', 47381],
              ['2018-07-21', '微信', 8195],
              ['2018-07-22', '微博', 37072],
              ['2018-07-22', '微信', 6925],
              ['2018-07-23', '微博', 44665],
              ['2018-07-23', '微信', 7934],
              ['2018-07-24', '微博', 46858],
              ['2018-07-24', '微信', 8889],
              ['2018-07-25', '微博', 30272],
              ['2018-07-25', '微信', 3925],
            ]
          }


  @author Witee<github.com/Witee>
  @date   2018-12-14
*/
class LineBar extends React.Component {
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
      xAxis,
      yAxis,
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
      xAxis,
      yAxis,
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
      xAxis,
      yAxis,
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
    if (!_.isEqual(xAxis, nextProps.xAxis)) { needUpdate.xAxis = nextProps.xAxis; }
    if (!_.isEqual(yAxis, nextProps.yAxis)) { needUpdate.yAxis = nextProps.yAxis; }
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

  onXAxisChange = (xAxis) => {
    this.setState({ xAxis });
    this.handleConfigChange({ xAxis });
  };

  onYAxisChange = (yAxis) => {
    this.setState({ yAxis });
    this.handleConfigChange({ yAxis });
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
        xAxis,
        yAxis,
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
        xAxis,
        yAxis,
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
      xAxis,
      yAxis,
      series,
      dataset,
    } = this.state;

    /**
      配置区域的高度跟随图表高度
    */
    const newConfigHeight = _.get(configStyle, 'height', `${chartHeight}px`);
    const oldConfigStyle = { height: newConfigHeight, overflow: 'scroll', padding: '0 0.8rem 0 0', backgroundColor: '#f7f7f7', borderRadius: '4px' };
    const newConfigStyle = _.assign(oldConfigStyle, configStyle);

    /**
      第一条数据认为是表头
    */
    const dataSource = _.get(dataset, 'source', []);
    const header = _.get(dataSource, 0, []);
    const body = _.slice(dataSource, 1);
    const headerLength = _.get(header, 'length', 0);
    const bodyLength = _.get(body, 'length', 0);

    /**
      当 dataset 有数据且 header 大于3列时，设置以下的默认值
      legend、xAxis、yAxis 如果没有指定 column(取值) 的列，在这里设置了默认值

      1. xAxis.column 默认为 header[0]
      2. yAxis.column 默认为 header[ header.length - 1 ]
      3. legend.column 默认为 header[1]
      4. 根据 legend.column 设置 legend.data
      5. 根据以上 1~3 的值设置每个 series 中的 encode
    */
    const newXAxis = _.cloneDeep(xAxis);
    const newYAxis = _.cloneDeep(yAxis);
    const newLegend = _.cloneDeep(legend);
    let newSeries = _.cloneDeep(series);

    const xColumn = _.get(newXAxis, 'column', undefined);
    const yColumn = _.get(newYAxis, 'column', undefined);
    const legendColumn = _.get(legend, 'column', undefined);

    const xAxisType = _.get(newXAxis, 'type', 'category');

    if (bodyLength > 0) {
      // 1. 设置 xAxis.column 默认值
      if (_.isUndefined(xColumn) && headerLength >= 3) {
        _.set(newXAxis, 'column', _.get(header, 0));
      }

      // 2. 设置 yAxis.column 默认值
      if (_.isUndefined(yColumn) && headerLength >= 3) {
        _.set(newYAxis, 'column', _.get(header, (headerLength - 1)));
      }

      // 3. 设置 legend.column 默认值
      if (_.isUndefined(legendColumn) && headerLength >= 3) {
        _.set(newLegend, 'column', _.get(header, 1));
      }

      // 4. 设置 legend.data 默认值
      if (_.get(body, 'length', 0) > 0) {
        const newLegendColumn = _.get(newLegend, 'column', undefined);
        if (newLegendColumn) {
          const legendColumnIndex = _.findIndex(header, (d) => (d === newLegendColumn));
          const grouppedBody = _.groupBy(body, legendColumnIndex);

          _.set(newLegend, 'data', _.keys(grouppedBody));
        }
      }

      // 5. 设置 series 中的 encode
      // type 根据原有 series 中的配置,如果未找到,则设置为 line
      const legendData = _.get(newLegend, 'data', []);
      newSeries = _.map(legendData, (l) => {
        const originSeries = _.find(newSeries, (s) => (_.get(s, 'name', null) === l));

        let x;
        let y;
        if (xAxisType === 'category') {
          x = xColumn;
          y = l;
        } else {
          x = l;
          y = xColumn;
        }
        return {
          name: l,
          type: _.get(originSeries, 'type', 'line'),
          color: _.get(originSeries, 'color', false),
          encode: { x, y },
        };
      });
    }

    /**
      多系列显示时需要根据 legend.data 转换数据格式

      原数据  [
              ['日期', '平台', '声量'],
              ['2018-7-1', '微博', 1024],
              ['2018-7-1', '微信', 2048],
            ]

      转换后  [
              ['日期', '微博', '微信'],
              ['2018-7-1', 1024, 2048],
            ]

      参数文档: https://witee.github.io/open-js-tools/#api-table-dataSource2Dataset
    */
    const categoryColumn = xAxisType === 'category' ? newXAxis.column : newYAxis.column;
    const valueColumn = xAxisType === 'category' ? newYAxis.column : newXAxis.column;
    const newLegendColumn = _.get(newLegend, 'column', undefined);

    const newDataset = table.dataSource2Dataset(dataset.source, categoryColumn, valueColumn, newLegendColumn);

    const option = {
      title,
      backgroundColor,
      toolbox,
      legend: newLegend,
      xAxis: newXAxis,
      yAxis: newYAxis,
      series: newSeries,
      dataset: newDataset,
      tooltip: { show: true },
      grid: { left: '12%' },
    };

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
                header={header}
                onChange={this.onLegendChange}
              />

              <XAxis
                xAxis={_.cloneDeep(newXAxis)}
                header={header}
                onChange={this.onXAxisChange}
              />

              <YAxis
                yAxis={_.cloneDeep(newYAxis)}
                header={header}
                onChange={this.onYAxisChange}
              />

              <SeriesLineBar
                series={_.cloneDeep(newSeries)}
                legend={newLegend}
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

LineBar.propTypes = {
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
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
  series: PropTypes.arrayOf(PropTypes.object),
  dataset: PropTypes.object,
  onChange: PropTypes.func,
};

LineBar.defaultProps = {
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
  xAxis: { name: 'X轴', type: 'category', column: undefined }, // column 为自定义参数, 不在 echarts.xAxis 中
  yAxis: { name: 'Y轴', type: 'value', column: undefined },
  series: undefined,
  dataset: { source: [] },
  onChange: undefined,
};

export default LineBar;
