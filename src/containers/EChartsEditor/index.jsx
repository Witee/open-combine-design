import React from 'react';
import { EChartsEditor } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';
import wordCloudData from './wordCloudData';


const Chart = () => {
  const apiDocs = [
    {
      title: 'EChartsEditor 使用的API',
      doc: [
        // ['style', '整体的样式', 'object', '{}'],
        // ['titleStyle', '标题的样式', 'object', '{}'],
        // ['title', '标题，任意可渲染的内容', 'node', 'undefined'],
        // ['descriptionStyle', '描述的样式', 'object', '{}'],
        // ['description', '描述，任意可渲染的内容', 'node', 'undefined'],
        // ['contentStyle', '内容的样式', 'object', '{}'],
        // ['children', '内容，任意可渲染的内容', 'node', 'undefined'],
      ],
    },
  ];

  const dataSource = [
    ['日期', '规则', '平台', '声量'],
    ['2018-07-20', '规则一', '微博', 52872],
    ['2018-07-20', '规则一', '微信', 8510],
    ['2018-07-21', '规则一', '微博', 47381],
    ['2018-07-21', '规则一', '微信', 8195],
    ['2018-07-22', '规则一', '微博', 37072],
    ['2018-07-22', '规则一', '微信', 6925],
    ['2018-07-23', '规则一', '微博', 44665],
    ['2018-07-23', '规则一', '微信', 7934],
    ['2018-07-24', '规则一', '微博', 46858],
    ['2018-07-24', '规则一', '微信', 8889],
    ['2018-07-25', '规则一', '微博', 30272],
    ['2018-07-25', '规则一', '微信', 3925],
  ];
  const codes = [
    {
      title: '折线、柱状图编辑器',
      example: (
        <EChartsEditor.LineBar
          dataset={{ source: dataSource }}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('LineBar: ', configs); }}
        />
      ),
      code: codeExamples.LineBar,
    },
    {
      title: '折线、柱状图全功能编辑器',
      example: (
        <EChartsEditor.LineBarFull
          dataSource={dataSource}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('LineBarFull: ', configs); }}
        />
      ),
      code: codeExamples.LineBarFull,
    },
    {
      title: '饼图编辑器',
      example: (
        <EChartsEditor.Pie
          style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
          title={{ text: '饼图编辑器', left: 'center', top: 'middle' }}
          series={[
            {
              type: 'pie',
              radius: ['50%', '70%'],
              label: { formatter: '{b} {d}%' },
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
          // eslint-disable-next-line
          onChange={(configs) => { console.log('Pie: ', configs); }}
        />
      ),
      code: codeExamples.pie,
    },
    {
      title: '饼图全功能编辑器',
      example: (
        <EChartsEditor.PieFull
          title={{ text: '饼图全功能编辑器', left: 'center', top: 'middle' }}
          series={[
            {
              type: 'pie',
              radius: ['50%', '70%'],
              label: { formatter: '{b} {d}%' },
            },
          ]}
          nameCol="平台"
          dataCol="声量"
          dataSource={dataSource}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('PieFull: ', configs); }}
        />
      ),
      code: codeExamples.pieFull,
    },
    {
      title: '词云图编辑器',
      example: (
        <EChartsEditor.WordCloud
          style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
          title={{ text: '词云图' }}
          series={[{ type: 'wordCloud' }]}
          dataset={{ source: wordCloudData }}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('EChartsWordCloud: ', configs); }}
        />
      ),
      code: codeExamples.wordCloud,
    },
    {
      title: '词云图全功能编辑器',
      example: (
        <EChartsEditor.WordCloudFull
          dataSource={wordCloudData}
          // eslint-disable-next-line
          onChange={(configs) => { console.log('WordCloudFull: ', configs); }}
        />
      ),
      code: codeExamples.wordCloudFull,
    },
  ];
  return (
    <Content
      title="EChartsEditor 图表编辑器"
      subTitle="图表编辑器"
      whenUse="数据需要展示时"
      codes={codes}
      apiDocs={apiDocs}
    />
  );
};

export default Chart;
