const LineBar = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <EChartsEditor.LineBar
        dataset={{ source: [
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
        ]}}
        onChange={(configs) => { console.log('LineBar: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const LineBarFull = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <EChartsEditor.LineBarFull
        dataset={{ source: [
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
        ]}}
        onChange={(configs) => { console.log('LineBarFull: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const pie = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
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
        onChange={(configs) => { console.log('Pie: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const pieFull = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
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
        dataSource={[
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
        ]}
        onChange={(configs) => { console.log('PieFull: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const wordCloud = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <EChartsEditor.WordCloud
        style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
        title={{ text: '词云图' }}
        series={[{ type: 'wordCloud' }]}
        dataset={{ source: [
          ['词', '值'],
          ['搞笑幽默', 3535333],
          ['新闻趣事', 786129],
          ['视频音乐', 745129],
          ['八卦杂谈', 692445],
        ]}}
        onChange={(configs) => { console.log('EChartsWordCloud: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const wordCloudFull = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <EChartsEditor.WordCloudFull
        dataSource={[
          ['词', '值'],
          ['搞笑幽默', 3535333],
          ['新闻趣事', 786129],
          ['视频音乐', 745129],
          ['八卦杂谈', 692445],
        ]}
        onChange={(configs) => { console.log('WordCloudFull: ', configs); }}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  LineBar,
  LineBarFull,
  pie,
  pieFull,
  wordCloud,
  wordCloudFull,
};
