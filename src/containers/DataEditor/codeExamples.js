const base = `
\`\`\`js
import { DataEditor } from 'open-combine-design';

class App extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = {
      dataSource,
      originData,
      tableFilters: { 日期: null, 平台: ['微博'], 声量: null },
      tableSorter: { field: '声量', order: 'descend' },
    };
  }

  onChange = (dataSource, tableFilters, tableSorter, reload) => {
    console.log('tableFilters, tableSorter, reload', tableFilters, tableSorter, reload);
    this.setState({ dataSource, tableFilters, tableSorter });
  };


  render(){
    const { originData, dataSource, tableFilters, tableSorter  } = this.state;
    return(
      <DataEditor
        dataSource={dataSource}
        onChange={this.onChange}
        tableParams={{ size: 'small' }}
        tableFilters={tableFilters}
        tableSorter={tableSorter}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const text = `
\`\`\`js
import { DataEditor } from 'open-combine-design';

// 传递的参数
props = {
  dataSource: [
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
}

/**
  本组件只处理数据的 增、删、改

    - onChange 会将修改后的 dataSource 返回

    - 推荐用法: 将 onChange 返回的 dataSource 再次传递给 DataEditor.Text 的 dataSource 参数
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
    };
  }

  onChange = (dataSource) => {
    console.log('new dataSource: ', textDataSource);
    this.setState({ dataSource });
  }

  render(){
    const { dataSource } = this.state;
    return(
      <DataEditor.Text
        rows={15}
        dataSource={dataSource}
        onChange={this.onChange}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const table = `
\`\`\`js
import { DataEditor } from 'open-combine-design';

// 传递的参数
props = {
  filters: { 日期: null, 平台: ['微博'], 声量: null },
  sorter: { field: '声量', order: 'descend' },
  dataSource: [
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
}

/**
  本组件只处理数据的 排序、过滤

  - onChange 会将 filters、sorter 和经过 filters、sorter 处理的 result 返回

  - 推荐使用方法： dataSource 始终传递 [原始数据]，即 props.dataSource,
    父层使用时经过 filters、sorter 处理，或直接使用 onChange 返回的 result 参数，
    如将 onChange 返回的 result 再次传递给 DataEditor.Table 会由于已有的 filters 选项造成不能生成所有的过滤列表

  - filters, sorter 需要在 onChange 返回之后再次传回；

*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { 日期: null, 平台: ['微博'], 声量: null },
      sorter: { field: '声量', order: 'descend' },
    };
  }

  /**
    filters、sorter 是 antd Table onChange 的返回
    result 是使用 filters、sorter 过滤、排序后的数据

    这里的 result 可以用于下一步的使用，如提供给图表等
  */
  onChange = ({ filters, sorter, result }) => {
    console.log(filters, sorter, result);
    this.setState({ filters, sorter });
  }

  render(){
    const { dataSource } = this.props;
    const { filters, sorter } = this.state;
    return(
      <DataEditor.Table
        size="small"
        filters={filters}
        sorter={sorter}
        dataSource={dataSource}
        onChange={this.onChange}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  base,
  text,
  table,
};
