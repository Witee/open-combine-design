import ReactECharts from './ReactECharts';

import LineBar from './LineBar';
import Pie from './Pie';
import WordCloud from './WordCloud';

import LineBarFull from './LineBarFull';
import PieFull from './PieFull';
import WordCloudFull from './WordCloudFull';

import Title from './configs/Title';
import Theme from './configs/Theme';
import Height from './configs/Height';
import Legend from './configs/Legend';
import Toolbox from './configs/Toolbox';
import XAxis from './configs/XAxis';
import YAxis from './configs/YAxis';
import SeriesLineBar from './configs/series/LineBar';
import SeriesPie from './configs/series/Pie';
import SeriesWordCloud from './configs/series/WordCloud';

/**
  基于 EChart4.x 的常用图表

  @author Witee<github.com/Witee>
  @date   2018-07-05
  @update 2018-12-17
*/

const EChartsEditor = ReactECharts; // react 版本的 echarts

// 图表配置器
EChartsEditor.LineBar = LineBar; // 折线、柱状图
EChartsEditor.Pie = Pie; // 饼图
EChartsEditor.WordCloud = WordCloud; // 词云图

// 全功能配置器(包含数据编辑器)
EChartsEditor.LineBarFull = LineBarFull; // 折线、柱状图
EChartsEditor.PieFull = PieFull; //  饼图
EChartsEditor.WordCloudFull = WordCloudFull; // 词云图

// 可自由组合的配置项
EChartsEditor.Title = Title; // 标题
EChartsEditor.Theme = Theme; // 主题、背景颜色
EChartsEditor.Height = Height; // 高度
EChartsEditor.Legend = Legend; // 图例
EChartsEditor.Toolbox = Toolbox; // 工具
EChartsEditor.XAxis = XAxis; // x轴
EChartsEditor.YAxis = YAxis; // y轴
EChartsEditor.SeriesLineBar = SeriesLineBar; // 折线、柱状图系列
EChartsEditor.SeriesPie = SeriesPie; // 饼图系列
EChartsEditor.SeriesWordCloud = SeriesWordCloud; // 词云系列

export default EChartsEditor;
