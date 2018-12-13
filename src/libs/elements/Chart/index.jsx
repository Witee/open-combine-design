import Base from './Base';
import ReactEcharts from './ReactEcharts';
import EchartsEditor from './EchartsEditor';
import EchartsPie from './EchartsPie';
import EchartsWordCloud from './EchartsWordCloud';

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
  - ReactEcharts 是封装了 echarts-for-react 组件的组件，目的是为了使用 echart4
  - EchartsEditor 标准的使用方法，将所有的配置项组合，编辑 echarts 图表
  - EchartsPie echarts4.x 饼图配置器
  - EchartsWordCloud 词云 配置器

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
Chart.ReactEcharts = ReactEcharts;
Chart.EchartsEditor = EchartsEditor;
Chart.EchartsPie = EchartsPie;
Chart.EchartsWordCloud = EchartsWordCloud;

Chart.Title = Title;
Chart.Theme = Theme;
Chart.Height = Height;
Chart.Legend = Legend;
Chart.Toolbox = Toolbox;
Chart.SeriesPie = SeriesPie;
Chart.SeriesWordCloud = SeriesWordCloud;

export default Chart;
