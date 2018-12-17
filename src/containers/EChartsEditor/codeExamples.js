const pie = `
\`\`\`js
import { EChartsEditor } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <EChartsEditor.Pie
        style={{ backgroundColor: '#f9fbfe', padding: '1em' }}
        onChange={(configs) => { console.log('PieEditor: ', configs); }}
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
        dataSource={[
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
        ]}
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
        onChange={(configs) => { console.log('WordCloudEditor: ', configs); }}
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
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  pie,
  pieFull,
  wordCloud,
};
