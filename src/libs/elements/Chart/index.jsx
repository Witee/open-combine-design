import Base from './Base';

import ReactECharts from './ReactECharts';

import EChartsEditor from './EChartsEditor';

import EChartsPie from './EChartsPie';
import EChartsWordCloud from './EChartsWordCloud';

import EChartsPieFull from './EChartsPieFull';
import EChartsWordCloudFull from './EChartsWordCloudFull';

import Title from './configs/Title';
import Theme from './configs/Theme';
import Height from './configs/Height';
import Legend from './configs/Legend';
import Toolbox from './configs/Toolbox';
import SeriesPie from './configs/series/Pie';
import SeriesWordCloud from './configs/series/WordCloud';

/**
  基于 EChart 的常用图表

  - Base 是最基础的使用

  - ReactECharts 是封装了 echarts-for-react 组件的组件，目的是为了使用 echart4

  - EChartsEditor 标准的使用方法，将所有的配置项组合，编辑 echarts 图表

  - EChartsPie echarts4.x 饼图配置器
  - EChartsWordCloud 词云 配置器

  - EChartsPieFull 饼图的全功能配置器(包含数据编辑器)
  - EChartsWordCloudFull 词云图的全功能配置器(包含数据编辑器)

  - 可自由组合的配置项
    - Title 标题
    - Theme 主题、背景颜色
    - Height 高度
    - Legend 图例
    - Toolbox 工具
    - SeriesPie 饼图系列
    - SeriesWordCloud 词云系列

  @author Witee<github.com/Witee>
  @date   2018-07-05
  @update 2018-12-07
*/

const Chart = Base; // 不能使用 { Base } 格式，否则 <Chart /> 格式将无法使用，只能使用 <Chart.Base />

Chart.ReactECharts = ReactECharts;

Chart.EChartsEditor = EChartsEditor;

Chart.EChartsPie = EChartsPie;
Chart.EChartsWordCloud = EChartsWordCloud;

Chart.EChartsPieFull = EChartsPieFull;
Chart.EChartsWordCloudFull = EChartsWordCloudFull;

Chart.Title = Title;
Chart.Theme = Theme;
Chart.Height = Height;
Chart.Legend = Legend;
Chart.Toolbox = Toolbox;
Chart.SeriesPie = SeriesPie;
Chart.SeriesWordCloud = SeriesWordCloud;

export default Chart;
