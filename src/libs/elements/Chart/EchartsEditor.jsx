import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Radio, Input, Icon, Tooltip, Popover, InputNumber, Checkbox } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { TwitterPicker } from 'react-color';
import { table as tableUtils } from 'open-js-tools';
import PlaceHolder from '../Placeholder';
import DataEditor from '../DataEditor';
import help from './images';
import './style.css';

/**
  EchartsEditor 是可编辑 echarts 图表配置的组件
  左侧编辑，右上侧显示，右下侧可以使用表格、文本方式直接编辑数据

  参数 dataSource 的第一列将作为 X 或 Y 轴的数据源；第一行为表头；
  至少需要 3 列数据，一般为 日期、规则名称、平台、声量

  @author Witee<github.com/Witee>
  @date   2018-07-19
*/

const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

class EchartsEditor extends React.Component {
  /**
    注意： 目前可配置项有 18 项，如果有变化，需要修改
      constructor componentWillReceiveProps handleConfigChange
  */
  constructor(props) {
    super(props);

    const {
      title,
      subtitle,
      titlePosition,
      legendPosition,
      xAxisLabel,
      xAxisName,
      yAxisLabel,
      yAxisName,
      numbericAxis,
      dataSource,
      originData,
      seriesColumn,
      seriesConf,
      filters,
      sorter,
      dataRange,
      lastNDays,
      backgroundColor,
      chartHeight,
      displaySaveButton,
    } = props;
    /**
      至少需要 3 列数据才是合法的

      如果只有 0、1、2 列，则不生成图，不合法；
      如果大于 2 列，则第 1 列为X轴标签，第 2 列为系列，最后一列为Y轴标签；
    */
    const header = _.get(dataSource, 0, []); // 表头
    let xAxisLabelTmp = null;
    let yAxisLabelTmp = null;
    let seriesColumnTmp = null;
    let seriesConfTmp = null;

    /**
      处理不合法字符，将无效字符改为 -
    */
    const fixedData = tableUtils.fixData(dataSource);
    const fixedOriginData = tableUtils.fixData(originData);

    if (header.length > 2) {
      xAxisLabelTmp = _.isNull(xAxisLabel) ? _.get(header, 0, null) : xAxisLabel; // xAxisLabel 为空则使用默认
      yAxisLabelTmp = _.isNull(yAxisLabel) ? _.get(header, (header.length - 1), null) : yAxisLabel;
      seriesColumnTmp = seriesColumn;
      if (_.isNull(seriesColumn)) { // 如果 seriesColumn 为 null，则设置默认值
        seriesColumnTmp = _.get(header, 1, null);
      }

      /**
        dataSource 为空列表时同样不生成系列
        如果设置了系列的过滤，则使用
      */
      const legends = this.getLegend(dataSource, seriesColumnTmp, filters);

      seriesConfTmp = seriesConf;
      if (_.isEmpty(seriesConf)) { // 如果 seriesConf 为空，则设置默认值
        _.map(legends, (l) => {
          _.set(seriesConfTmp, [l, 'type'], 'line');
          _.set(seriesConfTmp, [l, 'color'], 'auto');
          _.set(seriesConfTmp, [l, 'colorValue'], _.get(colors, _.random(0, colors.length), '#749f83'));
        });
      }
    }

    this.state = {
      title,
      subtitle,
      titlePosition,
      legendPosition,
      xAxisLabel: xAxisLabelTmp,
      xAxisName,
      yAxisLabel: yAxisLabelTmp,
      yAxisName,
      numbericAxis,
      dataSource: fixedData,
      originData: fixedOriginData,
      seriesColumn: seriesColumnTmp, // 生成 series 指定的列，不生成系列，值为 null
      seriesConf: seriesConfTmp, // 保存了所有系列的配置，更新时需要先读取原值
      filters, // DataEditor 中控制过滤条件
      sorter, // DataEditor 中控制排序条件
      dataRange,
      lastNDays,
      backgroundColor,
      chartHeight,
      displaySaveButton,
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
      subtitle,
      titlePosition,
      legendPosition,
      xAxisLabel,
      xAxisName,
      yAxisLabel,
      yAxisName,
      numbericAxis,
      dataSource,
      originData,
      seriesColumn,
      seriesConf,
      filters,
      sorter,
      dataRange,
      lastNDays,
      backgroundColor,
      chartHeight,
      displaySaveButton,
    } = this.props;
    const needUpdate = {};

    if (!_.isEqual(title, nextProps.title)) { needUpdate.title = nextProps.title; }
    if (!_.isEqual(subtitle, nextProps.subtitle)) { needUpdate.subtitle = nextProps.subtitle; }
    if (!_.isEqual(titlePosition, nextProps.titlePosition)) { needUpdate.titlePosition = nextProps.titlePosition; }
    if (!_.isEqual(legendPosition, nextProps.legendPosition)) { needUpdate.legendPosition = nextProps.legendPosition; }
    if (!_.isEqual(xAxisLabel, nextProps.xAxisLabel)) { needUpdate.xAxisLabel = nextProps.xAxisLabel; }
    if (!_.isEqual(xAxisName, nextProps.xAxisName)) { needUpdate.xAxisName = nextProps.xAxisName; }
    if (!_.isEqual(yAxisLabel, nextProps.yAxisLabel)) { needUpdate.yAxisLabel = nextProps.yAxisLabel; }
    if (!_.isEqual(yAxisName, nextProps.yAxisName)) { needUpdate.yAxisName = nextProps.yAxisName; }
    if (!_.isEqual(numbericAxis, nextProps.numbericAxis)) { needUpdate.numbericAxis = nextProps.numbericAxis; }
    if (!_.isEqual(dataSource, nextProps.dataSource)) { needUpdate.dataSource = nextProps.dataSource; }
    if (!_.isEqual(originData, nextProps.originData)) { needUpdate.originData = nextProps.originData; }
    if (!_.isEqual(seriesColumn, nextProps.seriesColumn)) { needUpdate.seriesColumn = nextProps.seriesColumn; }
    if (!_.isEqual(seriesConf, nextProps.seriesConf)) { needUpdate.seriesConf = nextProps.seriesConf; }
    if (!_.isEqual(filters, nextProps.filters)) { needUpdate.filters = nextProps.filters; }
    if (!_.isEqual(sorter, nextProps.sorter)) { needUpdate.sorter = nextProps.sorter; }
    if (!_.isEqual(dataRange, nextProps.dataRange)) { needUpdate.dataRange = nextProps.dataRange; }
    if (!_.isEqual(lastNDays, nextProps.lastNDays)) { needUpdate.lastNDays = nextProps.lastNDays; }
    if (!_.isEqual(backgroundColor, nextProps.backgroundColor)) { needUpdate.backgroundColor = nextProps.backgroundColor; }
    if (!_.isEqual(chartHeight, nextProps.chartHeight)) { needUpdate.chartHeight = nextProps.chartHeight; }
    if (!_.isEqual(displaySaveButton, nextProps.displaySaveButton)) { needUpdate.displaySaveButton = nextProps.displaySaveButton; }

    if (!_.isEmpty(needUpdate)) {
      this.setState(needUpdate);
    }
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
    this.handleConfigChange({ title: e.target.value });
  }

  onSubtitleChange = (e) => {
    this.setState({ subtitle: e.target.value });
    this.handleConfigChange({ subtitle: e.target.value });
  }

  onTitlePositionChange = (e) => {
    this.setState({ titlePosition: e.target.value });
    this.handleConfigChange({ titlePosition: e.target.value });
  }

  onLegendPositionChange = (e) => {
    this.setState({ legendPosition: e.target.value });
    this.handleConfigChange({ legendPosition: e.target.value });
  }

  /**
    可以自定义颜色，如果设置了 colorValue 则使用此值作为色值
    注意： 这里没有使用 e.target.value 作为 color 的值，是因为选择 custom 再清空 Input 后，
    会造成值为 undefined ，所以直接写明了设置为 auto，因为只有两种选择.
  */
  onColorChange = (e, legend, colorValue = false) => {
    let colorType = _.get(e, ['target', 'value'], 'auto');
    if (e === 'custom') {
      colorType = 'custom';
    }
    const { seriesConf } = this.state;
    const tmpSeriesConf = _.cloneDeep(seriesConf);
    if (colorType === 'custom') {
      _.set(tmpSeriesConf, [legend, 'color'], 'custom');
      _.set(tmpSeriesConf, [legend, 'colorValue'], colorValue);
    } else {
      _.set(tmpSeriesConf, [legend, 'color'], 'auto');
    }
    this.setState({ seriesConf: tmpSeriesConf });
    this.handleConfigChange({ seriesConf: tmpSeriesConf });
  }

  onChartTypeChange = (e, legend) => {
    const { seriesConf } = this.state;
    const tmpSeriesConf = _.cloneDeep(seriesConf);
    _.set(tmpSeriesConf, [legend, 'type'], e.target.value);

    this.setState({ seriesConf: tmpSeriesConf });
    this.handleConfigChange({ seriesConf: tmpSeriesConf });
  }

  onXLabelChange = (e) => {
    this.setState({ xAxisLabel: e.target.value });
    this.handleConfigChange({ xAxisLabel: e.target.value });
  }

  onXAxisNameChange = (e) => {
    this.setState({ xAxisName: e.target.value });
    this.handleConfigChange({ xAxisName: e.target.value });
  }

  onYLabelChange = (e) => {
    this.setState({ yAxisLabel: e.target.value });
    this.handleConfigChange({ yAxisLabel: e.target.value });
  }

  onYAxisNameChange = (e) => {
    this.setState({ yAxisName: e.target.value });
    this.handleConfigChange({ yAxisName: e.target.value });
  }

  onNumAxisChange = (e) => {
    this.setState({ numbericAxis: e.target.value });
    this.handleConfigChange({ numbericAxis: e.target.value });
  }

  onDataRangeChange = (e) => {
    const dataRange = _.get(e, 'target.value', 'total');
    this.setState({ dataRange });
    this.handleConfigChange({ dataRange });
  }

  onLastNDaysChange = (lastNDays) => {
    this.setState({ lastNDays });
    this.handleConfigChange({ lastNDays });
  }

  onSeriesChange = (e) => {
    const { dataSource, filters } = this.state;
    const legends = this.getLegend(dataSource, e.target.value, filters);
    const seriesConf = {};
    _.map(legends, (l) => {
      _.set(seriesConf, [l, 'type'], 'line');
      _.set(seriesConf, [l, 'color'], 'auto');
      _.set(seriesConf, [l, 'colorValue'], _.get(colors, _.random(0, colors.length), '#749f83'));
    });
    this.setState({ seriesColumn: e.target.value, seriesConf });
    this.handleConfigChange({ seriesColumn: e.target.value, seriesConf });
  }

  /**
    dataSource 是所有的数据，配置的过程就是只保留已选择的项，如默认 x 轴只保留 日期 列，
    然后将保留的配置返回给图表
  */
  getChartOption = (dataSource) => {
    const {
      title,
      subtitle,
      titlePosition,
      legendPosition,
      xAxisLabel,
      xAxisName,
      yAxisLabel,
      numbericAxis,
      yAxisName,
      seriesColumn,
      seriesConf,
      filters,
      sorter,
      backgroundColor,
      displaySaveButton,
    } = this.state;

    /**
      处理默认参数中的过滤、排序
    */
    const filteredAndsortedDataSource = tableUtils.filterAndSorter(dataSource, filters, sorter);

    const xAxis = { type: (numbericAxis === 'x' ? 'value' : 'category'), name: xAxisName };
    const yAxis = { type: (numbericAxis === 'y' ? 'value' : 'category'), name: yAxisName };

    const legends = this.getLegend(filteredAndsortedDataSource, seriesColumn, filters); // 小于 2 列时 seriesColumn 为null，不生成系列

    const series = _.map(legends, (l) => {
      const conf = _.get(seriesConf, l);
      return ({
        name: l,
        type: _.get(conf, 'type', 'line'),
        itemStyle: { color: _.get(conf, 'color', 'auto') === 'custom' ? conf.colorValue : undefined },
        encode: { x: (numbericAxis === 'x' ? l : xAxisLabel), y: (numbericAxis === 'y' ? l : yAxisLabel) },
      });
    });


    /**
      图例的默认值，用于单一系列时使用
    */
    const legendConf = { data: legends, top: '10%', left: legendPosition };
    /**
      数据的默认值，用于单一系列时使用
    */
    let newDatasetSource = filteredAndsortedDataSource;

    /**
      多系列的处理方法
        1. 根据页面上选择的 [系列]-[取值] 指定的列，获取所有 图例(legends)
        2. 将原始数据根据图例重新组合成多系列的格式(需要理解 echarts 默认使用 column 作为维度，
          所以要将 非数值轴 的 label 与 legends 作为表头)，如:
          原数据   日期      平台    声量
                  2018-7-1  微博    1024
                  2018-7-1  微信    2048
          转换后  日期       微信  微博
                2018-7-1  1024  2048
          注意 声量 直接写在了 微信 下面，使 微信 作为了 echarts 使用的维度

      注意: x 、 y 轴可以互换，所以使用 数值轴(numAxis)(默认y轴) 和 非数值轴(unnumAxis)(默认x轴) 作为区分

      指定了 seriesColumn 时，则需要使用定义的列生成多系列及图例(legend)
    */
    if (!_.isNull(seriesColumn)) {
      newDatasetSource = [];

      const header = _.get(filteredAndsortedDataSource, 0, []);
      const body = _.slice(filteredAndsortedDataSource, 1);

      const unnumbericAxisLabel = numbericAxis === 'x' ? yAxisLabel : xAxisLabel; // 如 日期
      const numbericAxisLabel = numbericAxis === 'x' ? xAxisLabel : yAxisLabel; // 如 声量

      /**
        找到选择的 numAxis、unnumAxis 的 label 对应的 index，再找到 series 的 index，
        这样就可以从原始数据中根据 index 获取到对应的值
      */
      const unnumAxisIndex = _.findIndex(header, (d) => (d === unnumbericAxisLabel)); // 如 日期 的 index
      const numAxisIndex = _.findIndex(header, (d) => (d === numbericAxisLabel)); // 如 声量 的 index
      const seriesIndex = _.findIndex(header, (d) => (d === seriesColumn));

      /**
        先把 unnumbericAxisLabel 填写到 newDatasetSourceHeader ，
        再把 legends 的名称追加到 newDatasetSourceHeader 中，生成新的表头

        因为在 series 中使用了 encode 映射，所以顺序不是问题
      */
      let newDatasetSourceHeader = [unnumbericAxisLabel];
      newDatasetSourceHeader = newDatasetSourceHeader.concat(legends); // 新的表头

      const tmpData = {};
      _.forEach(body, (b) => {
        // 找到 legend 的 index，即 微博 、 微信 在 legends ([微博, 微信])中的位置，以此顺序保存数据
        const legendIndex = _.findIndex(legends, (l) => (l === b[seriesIndex]));
        // 保存数据，格式: {'2017-7-1': [1024, 2048], ...}
        _.set(tmpData, [b[unnumAxisIndex], legendIndex], _.get(b, numAxisIndex, null));
      });

      _.forEach(tmpData, (value, key) => {
        newDatasetSource.push([
          key,
          ...value,
        ]);
      });
      newDatasetSource.unshift(newDatasetSourceHeader);
    }

    let saveAsImage = { pixelRatio: 10 };
    if (!displaySaveButton) {
      saveAsImage = undefined;
    }

    const chartOption = {
      backgroundColor,
      legend: legendConf,
      title: { text: title, subtext: subtitle, left: titlePosition },
      grid: { containLabel: true, top: '25%' },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      dataset: { source: newDatasetSource },
      toolbox: { feature: { saveAsImage }, top: '10%' },
      xAxis,
      yAxis,
      series,
    };

    return chartOption;
  }

  /**
    通过系列指定的列获取 legend 列表，如 [微博, 微信]
  */
  getLegend = (dataSource = [], column = null, filters = null) => {
    // column 不存在时不生成系列
    if (_.isNull(column)) {
      return [];
    }

    /**
      如果设置了 filter 则系列需要使用此进行过滤
    */
    const filteredColumnContent = _.get(filters, column, null);
    if (_.isArray(filteredColumnContent) && filteredColumnContent.length > 0) {
      return filteredColumnContent;
    }
    const body = _.slice(dataSource, 1);
    const header = _.get(dataSource, 0, []);
    const seriesIndex = _.findIndex(header, (d) => (d === column));
    const grouppedBody = _.groupBy(body, seriesIndex);
    const keys = _.keys(grouppedBody);
    return keys;
  }

  /**
    监听数据编辑器变化
  */
  dataEditorOnChange = (data, filters, sorter, reload) => {
    /**
      获取在操作 Table 时的过滤、排序条件，方便保存
      reload 用来判断是否将条件清空，为 true 时表示 "还原"
    */
    if (reload) {
      this.setState({ filters: {}, sorter: {}, dataRange: 'total' });
    }
    this.setState({ dataSource: data });
    this.handleConfigChange({ dataSource: data, filters, sorter });
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
        subtitle,
        titlePosition,
        legendPosition,
        xAxisLabel,
        xAxisName,
        yAxisLabel,
        yAxisName,
        numbericAxis,
        dataSource,
        seriesColumn,
        seriesConf,
        filters,
        sorter,
        dataRange,
        lastNDays,
        backgroundColor,
        chartHeight,
        displaySaveButton,
      } = this.state;
      const oldConfigs = {
        title,
        subtitle,
        titlePosition,
        legendPosition,
        xAxisLabel,
        xAxisName,
        yAxisLabel,
        yAxisName,
        numbericAxis,
        dataSource,
        seriesColumn,
        seriesConf,
        filters,
        sorter,
        dataRange,
        lastNDays,
        backgroundColor,
        chartHeight,
        displaySaveButton,
      };

      const finalConfigs = _.assign(oldConfigs, newConfig);

      // 回传
      onChange(finalConfigs);
    }
  }

  /**
    修改图表背景颜色
  */
  handleBackgroundColorChange = ({ hex }) => {
    this.setState({ backgroundColor: hex });
    this.handleConfigChange({ backgroundColor: hex });
  }

  /**
    图表高度设置
  */
  handleChartHeightChange = ({ target: { value } }) => {
    const numberReg = /^\d+$/;
    if (numberReg.test(value)) {
      this.setState({ chartHeight: value });
      this.handleConfigChange({ chartHeight: value });
    }
  }

  /**
    是否显示下载按钮
  */
  handleSaveButtonCheckboxChange = ({ target: { checked } }) => {
    this.setState({ displaySaveButton: checked });
    this.handleConfigChange({ displaySaveButton: checked });
  }

  render() {
    const {
      editable, // 有只读和编辑两种模式，只读模式只显示图表
      style,
      configStyle,
      DataEditorParams,
      ReactEchartsParams,
    } = this.props;
    const {
      title,
      subtitle,
      titlePosition,
      legendPosition,
      xAxisLabel,
      xAxisName,
      yAxisLabel,
      yAxisName,
      numbericAxis,
      dataSource,
      originData,
      seriesColumn,
      seriesConf,
      filters,
      sorter,
      dataRange,
      lastNDays,
      backgroundColor,
      chartHeight,
      displaySaveButton,
    } = this.state;

    /**
      X轴和Y轴的数据源，第一行存储的是名称
    */
    const firstRow = dataSource.length > 0 ? dataSource[0] : [];
    const radioOptions = _.map(firstRow, (item) => (
      <Radio key={item} value={item}>{item}</Radio>
    ));

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    /**
      x y 轴数值型复选框的功能
    */
    const XYTypeTooltip = 'x 、y 轴中必须有一条为数值轴，即显示数值的轴。如果为数值轴，则表示 [坐标轴标签] 显示为数字范围，如 1 ~ 100；如果不为数值轴，则原样显示；一般情况下 Y 轴为数值轴';

    /**
      如果 dataRange 为 lastNDays 则证明需要过滤

      过程: 获取最大的日期，然后只保留最大日期及前 lastNDays 的数据
    */
    let filteredDataSource = dataSource;
    if (dataRange === 'lastNDays') {
      const header = _.get(dataSource, 0, []);
      let body = _.slice(dataSource, 1);
      const maxDateObj = _.maxBy(body, (d) => (moment(_.get(d, 0, null))));
      const maxDate = _.get(maxDateObj, 0, null);
      if (maxDate) {
        body = _.filter(body, (ds) => (
          moment(_.get(ds, 0, null)).add(lastNDays, 'days') > moment(maxDate)));
        body.unshift(header);
        filteredDataSource = body;
      }
    }

    /**
      x y 轴标签列解释
    */
    const XYLabelTooltip = 'x 、y [坐标轴标签] 的取值列，即每个刻度标签对应所选择列的每个值';
    const legends = this.getLegend(filteredDataSource, seriesColumn, filters); // 小于 2 列时 seriesColumn 为null，不生成系列
    const seriesItems = _.map(legends, (legend) => {
      const conf = _.get(seriesConf, legend);
      return (
        <Form.Item {...formItemLayout} label={legend} key={legend}>
          <Form.Item {...formItemLayout}></Form.Item> {/* 占位 */}

          <Form.Item {...formItemLayout} label="颜色">
            <Radio.Group value={_.get(conf, 'color', 'auto')} onChange={(e) => this.onColorChange(e, legend)}>
              <Radio value="auto">自动</Radio>
              <Radio value="custom">自定义
                {_.get(conf, 'color', null) === 'custom'
                  && (
                    <TwitterPicker
                      width="205px"
                      triangle="hide"
                      color={conf.colorValue}
                      onChange={(color) => this.onColorChange('custom', legend, color.hex)}
                      colors={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#ABB8C3']}
                    />
                  )}
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label="类型">
            <Radio.Group value={_.get(conf, 'type', 'line')} onChange={(e) => this.onChartTypeChange(e, legend)}>
              <Radio value="line">折线图</Radio>
              <Radio value="bar">柱状图</Radio>
            </Radio.Group>
          </Form.Item>

        </Form.Item>
      );
    });
    const option = this.getChartOption(filteredDataSource);

    return (
      <Row style={style} gutter={8}>
        <Col span={editable ? 8 : 0} style={configStyle}>
          <Popover
            trigger="click"
            overlayStyle={{ width: '50%' }}
            placement="topLeft"
            content={<img src={help} alt="帮助信息" style={{ maxHeight: '100%', maxWidth: '100%' }} />}
          >
            <Tooltip title="点击显示帮助信息">
              <Icon type="info-circle-o" style={{ cursor: 'pointer', position: 'absolute', top: '0px', left: '0px', zIndex: 1 }} />
            </Tooltip>
          </Popover>

          <Form>
            <Form.Item {...formItemLayout} label="标题">
              <Form.Item {...formItemLayout}></Form.Item> {/* 占位 */}

              <Form.Item {...formItemLayout} label="主">
                <Input placeholder="图表标题" value={title} onChange={this.onTitleChange} />
              </Form.Item>

              <Form.Item {...formItemLayout} label="副">
                <Input placeholder="图表副标题" value={subtitle} onChange={this.onSubtitleChange} />
              </Form.Item>

              <Form.Item {...formItemLayout} label="位置">
                <Radio.Group value={titlePosition} onChange={this.onTitlePositionChange}>
                  <Radio value="left">左</Radio>
                  <Radio value="center">中</Radio>
                  <Radio value="right">右</Radio>
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item {...formItemLayout} label="背景颜色">
              <TwitterPicker
                width="205px"
                triangle="hide"
                color={backgroundColor}
                onChange={this.handleBackgroundColorChange}
                colors={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#ABB8C3']}
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="图表高度">
              <Input
                size="small"
                style={{ width: '4em' }}
                defaultValue={chartHeight}
                onBlur={this.handleChartHeightChange}
                onPressEnter={this.handleChartHeightChange}
              /> px
            </Form.Item>

            <Form.Item {...formItemLayout} label="保存图片">
              <Checkbox onChange={this.handleSaveButtonCheckboxChange} checked={displaySaveButton}>是否显示保存为图片按钮</Checkbox>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label={<span><Tooltip placement="topLeft" title={XYTypeTooltip}>数值轴 <Icon type="question-circle-o" /></Tooltip></span>}
            >
              <Radio.Group value={numbericAxis} onChange={this.onNumAxisChange}>
                <Radio value="x">X</Radio>
                <Radio value="y">Y</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="动态过滤"
            >
              <Radio.Group value={dataRange} onChange={this.onDataRangeChange}>
                <Radio value="total">不过滤</Radio>
                <Radio value="lastNDays">保留最后 <InputNumber
                  size="small"
                  min={1}
                  max={99}
                  style={{ width: '4em' }}
                  value={lastNDays}
                  onChange={this.onLastNDaysChange}
                /> 天数据
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item {...formItemLayout} label="X轴">
              <Form.Item {...formItemLayout}></Form.Item> {/* 占位 */}

              <Form.Item {...formItemLayout} label="名称">
                <Input value={xAxisName} onChange={this.onXAxisNameChange} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label={<span><Tooltip placement="topLeft" title={XYLabelTooltip}>取值 <Icon type="question-circle-o" /></Tooltip></span>}
              >
                <Radio.Group value={xAxisLabel} onChange={this.onXLabelChange}>
                  {radioOptions}
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Y轴">
              <Form.Item {...formItemLayout}></Form.Item> {/* 占位 */}

              <Form.Item {...formItemLayout} label="名称">
                <Input value={yAxisName} onChange={this.onYAxisNameChange} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label={<span><Tooltip placement="topLeft" title={XYLabelTooltip}>取值 <Icon type="question-circle-o" /></Tooltip></span>}
              >
                <Radio.Group value={yAxisLabel} onChange={this.onYLabelChange}>
                  {radioOptions}
                </Radio.Group>
              </Form.Item>
            </Form.Item>

            {/* 选择系列使用的列，然后在下面生成每个系列的编辑项 */}
            <Form.Item {...formItemLayout} label="系列">
              <Form.Item {...formItemLayout} /> {/* 占位 */}

              <Form.Item {...formItemLayout} label="取值">
                <Radio.Group value={seriesColumn} onChange={this.onSeriesChange}>
                  {radioOptions}
                </Radio.Group>
              </Form.Item>

              <Form.Item {...formItemLayout} label="位置">
                <Radio.Group value={legendPosition} onChange={this.onLegendPositionChange}>
                  <Radio value="left">左</Radio>
                  <Radio value="center">中</Radio>
                  <Radio value="right">右</Radio>
                </Radio.Group>
              </Form.Item>
              {seriesItems}
            </Form.Item>

          </Form>
        </Col>

        <Col span={editable ? 16 : 24}>
          {_.get(filteredDataSource, 0, []).length >= 3
            ? (
              <ReactEcharts
                {..._.assign(
                  { option },
                  ReactEchartsParams,
                  { style: { height: `${chartHeight}px` } } // 覆盖 ReactEchartsParams 中高度的设置
                )}
              />
            )
            : <PlaceHolder text="数据不合法，至少需要 3 列，如 日期、平台、声量" />
          }

          {editable
          && (
            <DataEditor
              {..._.assign(
                {
                  dataSource: filteredDataSource,
                  originData,
                  onChange: this.dataEditorOnChange,
                  tableParams: { size: 'small' },
                  tableFilters: filters,
                  tableSorter: sorter,
                },
                DataEditorParams
              )}
            />
          )}
        </Col>
      </Row>
    );
  }
}


EchartsEditor.propTypes = {
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  configStyle: PropTypes.object,
  dataSource: PropTypes.arrayOf(PropTypes.array),
  originData: PropTypes.arrayOf(PropTypes.array),
  ReactEchartsParams: PropTypes.object,
  DataEditorParams: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titlePosition: PropTypes.string,
  legendPosition: PropTypes.string,
  xAxisLabel: PropTypes.string,
  xAxisName: PropTypes.string,
  yAxisLabel: PropTypes.string,
  yAxisName: PropTypes.string,
  numbericAxis: PropTypes.string,
  seriesColumn: PropTypes.string,
  seriesConf: PropTypes.object,
  filters: PropTypes.object,
  sorter: PropTypes.object,
  dataRange: PropTypes.string,
  lastNDays: PropTypes.number,
  backgroundColor: PropTypes.string,
  chartHeight: PropTypes.number,
  displaySaveButton: PropTypes.bool,
};

EchartsEditor.defaultProps = {
  editable: true,
  onChange: undefined,
  style: {},
  configStyle: { height: '40rem', overflow: 'scroll', padding: '0 0.8rem 0 0', backgroundColor: '#f7f7f7', borderRadius: '4px' },
  dataSource: [[]],
  originData: undefined,
  ReactEchartsParams: { notMerge: true, style: { height: '35em' } },
  DataEditorParams: {},
  title: '图表标题',
  subtitle: '副标题',
  titlePosition: 'left',
  legendPosition: 'center',
  xAxisLabel: null,
  xAxisName: 'X轴',
  yAxisLabel: null,
  yAxisName: 'Y轴',
  numbericAxis: 'y',
  seriesColumn: null,
  seriesConf: {},
  filters: {},
  sorter: {},
  dataRange: 'total',
  lastNDays: 7,
  backgroundColor: '#FFFFFF',
  chartHeight: 420,
  displaySaveButton: true,
};

export default EchartsEditor;
