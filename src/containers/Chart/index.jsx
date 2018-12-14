import React from 'react';
import { Link } from 'react-router-dom';
import { Chart as OCDChart } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';
import wordCloudData from './wordCloudData';


const Chart = () => {
  const apiDocs = [
    {
      title: 'Chart 使用的API',
      doc: [
        ['style', '整体的样式', 'object', '{}'],
        ['titleStyle', '标题的样式', 'object', '{}'],
        ['title', '标题，任意可渲染的内容', 'node', 'undefined'],
        ['descriptionStyle', '描述的样式', 'object', '{}'],
        ['description', '描述，任意可渲染的内容', 'node', 'undefined'],
        ['contentStyle', '内容的样式', 'object', '{}'],
        ['children', '内容，任意可渲染的内容', 'node', 'undefined'],
      ],
    },
    {
      title: 'Chart.EChartsEditor 使用的API',
      doc: [
        ['editable', '有两种显示模式，编辑和只读，只读模式下只显示图表，不显示配置选项', 'bool', 'true'],
        ['onChange', '当加载完成、配置有变化时，将当前的参数回传', 'func', 'undefined'],
        ['style', '整体的样式', 'object', '{}'],
        ['configStyle', '配置区域的样式', 'object', "{ height: '40rem', overflow: 'scroll', padding: '0 0.8rem 0 0', backgroundColor: '#f7f7f7', borderRadius: '4px' }"],
        ['dataSource', '列表，请提供表格形式(示例代码中的格式)的数据，dataSource[0]将作为"表头"，其余的作为它的值', 'array', '[[]]'],
        ['originData', 'DataEditor 还原按钮使用的数据，一般情况与 dataSource 相同，不设置无法使用还原功能', 'array', 'undefined'],
        ['ReactEChartsParams [专用]', <div>单独给 ReactECharts 传递的参数 (不可传递 option、theme), 详情访问 <a href="https://github.com/hustcc/echarts-for-react" target="_blank">ReactECharts</a></div>, 'object', '{}'],
        ['DataEditorParams [专用]', <div>单独给 DataEditor 传递的参数 (不可传递 dataSource、onChange、tableSorter、tableFilters), 详情访问 <Link to="/app/components/data-editor">DataEditor</Link></div>, 'object', '{}'],
        ['title', '图表标题', 'string', '图表标题'],
        ['subtitle', '副标题', 'string', '副标题'],
        ['titlePosition', '标题位置', '枚举 string，可选 left、center、right', 'left'],
        ['legendPosition', '图例位置', '枚举 string，可选 left、center、right', 'center'],
        ['xAxisLabel', 'x轴取值', 'string', '第一列'],
        ['xAxisName', 'x轴名称', 'string', 'X轴'],
        ['yAxisLabel', 'y轴取值', 'string', '最后一列'],
        ['yAxisName', 'y轴名称', 'string', 'Y轴'],
        ['numbericAxis', '数值轴', 'string', 'y'],
        ['seriesColumn', '系列取值', 'string', '当总列数大于2列时，取第二列，小于等于2列时不分系列，值为 null'],
        ['seriesConf', '每个系列的配置', 'object', 'seriesColumn 不为 null 时，设置为折线图，颜色随机'],
        ['filters', 'antd Table 的过滤格式，详情查看示例代码', 'object', 'undefined'],
        ['sorter', 'antd Table 的排序格式，详情查看示例代码', 'object', 'undefined'],
        ['dataRange', '动态设置数据范围，区别于 DataEditor 中对日期的过滤', 'string', 'total'],
        ['lastNDays', '数据范围的值，仅在设置 dataRange 为 "lastNDays" 生效', 'number', '7'],
        ['backgroundColor', '背景颜色', 'string', '#FFFFFF'],
        ['chartHeight', '图表高度(px)，会覆盖掉 ReactEChartsParams 中关于 style.height 的设置', 'number', '420'],
        ['displaySaveButton', '是否显示保存为图片按钮', 'bool', 'true'],
      ],
    },
  ];

  const dataSource = [
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
  ];
  const originData = _.cloneDeep(dataSource);
  const codes = [
    {
      title: '基本用法',
      example: (
        <OCDChart
          style={{
            minHeight: '20em',
            width: '100%',
            border: '1px solid #f6f8fa',
            padding: '1em',
          }}
          title={<h2>演示图表</h2>}
          descriptionStyle={{ backgroundColor: '#f9fbfe' }}
          description="描述内容"
          contentStyle={{ backgroundColor: '#f9fbfe', minHeight: '10em', padding: '1em' }}
        >
          <p>内容区域，例如可以显示文字图表等内容</p>
        </OCDChart>
      ),
      code: codeExamples.base,
    },
    {
      title: '可编辑的折线、柱状图',
      example: (
        <OCDChart.EChartsEditor
          style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
          dataSource={dataSource}
          originData={originData}
          // dataSource={[
          //   ['日期', '声量'],
          //   ['2018-07-20', 52872],
          //   ['2018-07-21', 47381],
          //   ['2018-07-22', 37072],
          //   ['2018-07-23', 44665],
          //   ['2018-07-24', 46858],
          //   ['2018-07-25', 30272],
          // ]}
          DataEditorParams={{
            title: '源数据',
            tableParams: { size: 'small' },
          }}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('EChartsEditor: ', configs); }}
          filters={{ 日期: null, 平台: ['微博'], 声量: null }}
          sorter={{ field: '声量', order: 'descend' }}
          dataRange="lastNDays"
          lastNDays={3}
        />
      ),
      code: codeExamples.editor,
    },
    {
      title: '可编辑的饼图',
      example: (
        <OCDChart.EChartsPie
          style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('EChartsPie: ', configs); }}
          title={{ text: '可编辑的饼图', left: 'center', top: 'middle' }}
          legend={{ data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'], orient: 'vertical', left: 'right', top: 'bottom' }}
          series={[
            {
              type: 'pie',
              radius: ['50%', '70%'],
            },
          ]}
          dataset={{
            source: [
              ['浏览方式', '次数'],
              ['直接访问', 335],
              ['邮件营销', 310],
              ['联盟广告', 234],
              ['视频广告', 135],
              ['搜索引擎', 1548],
            ],
          }}
        />
      ),
      code: codeExamples.pie,
    },
    {
      title: '饼图的全功能编辑器',
      example: (
        <OCDChart.EChartsPieFull
          dataSource={dataSource}
        />
      ),
      code: codeExamples.pieFull,
    },
    {
      title: '词云图',
      example: (
        <OCDChart.EChartsWordCloud
          style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('EChartsWordCloud: ', configs); }}
          title={{ text: '词云图' }}
          series={[{ type: 'wordCloud' }]}
          dataset={{ source: wordCloudData }}
        />
      ),
      code: codeExamples.wordCloud,
    },
    {
      title: '词云图的全功能编辑器',
      example: (
        <OCDChart.EChartsWordCloudFull
          dataSource={wordCloudData}
        />
      ),
      code: codeExamples.pieFull,
    },
  ];
  return (
    <Content
      title="Chart 图表"
      subTitle="图表"
      whenUse="数据需要展示时"
      codes={codes}
      apiDocs={apiDocs}
    />
  );
};

export default Chart;
