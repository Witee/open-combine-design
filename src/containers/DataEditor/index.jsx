import React from 'react';
import { DataEditor } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';


class Chart extends React.Component {
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
      textDataSource: _.cloneDeep(dataSource),
      tableDataSource: _.cloneDeep(dataSource),
    };
  }

  onChange = (dataSource, tableFilters, tableSorter, reload) => {
    // eslint-disable-next-line
    console.log('tableFilters, tableSorter, reload', tableFilters, tableSorter, reload);
    this.setState({ dataSource, tableFilters, tableSorter });
  };

  onTextDataSourceChange = (textDataSource) => {
    // eslint-disable-next-line
    console.log('new dataSource: ', textDataSource);
    this.setState({ textDataSource });
  }

  onTableDataSourceChange = ({ filters, sorter, result }) => {
    // eslint-disable-next-line
    console.log(filters, sorter, result);
    this.setState({ tableFilters: filters, tableSorter: sorter });
  }

  render() {
    const { originData, dataSource, tableFilters, tableSorter, textDataSource, tableDataSource } = this.state;
    const apiDocs = [
      {
        doc: [
          ['title', '标题，任意可渲染的内容', 'node', '<h3>源数据</h3>'],
          ['dataSource', '源数据，这里使用的是二维表形式，第一行为表头，其它行为数据', '[array]', '[[]]'],
          ['originData', '只读源数据，同 dataSource，设置之后才能使用"还原"功能', '[array]', 'undefined'],
          ['onChange [必选]', '返回编辑后的数据(二维表形式), 并返回过滤、排序条件、是否点击了还原按钮，当点击还原按钮(reload=true)时，filters 与 sorter 都将清空', 'func(data, filters, sorter, reload)', 'undefined'],
          ['tableParams [专用]', <div>单独给 Table 传递的参数(不可传递 dataSource、columns(及Column所有支持的参数如className, colSpan...)、onChange)详情访问 <a href="http://ant-design-2x.gitee.io/components/table-cn/" target="_blank">Table</a></div>, 'object', '{}'],
          ['tableSorter', '控制 Table 的排序属性(sortOrder)，使其变为受控组件，格式为: { field: "日期", order: "ascend | descend" }', 'object', '{}'],
          ['tableFilters', '控制 Table 的过滤属性(filteredValue)，使其变为受控组件，格式为: { 日期: ["2018-07-09", "2018-07-08"] }', 'object', '{}'],
        ],
      },
    ];

    const codes = [
      {
        title: '全功能用法',
        example: (
          <DataEditor
            dataSource={dataSource}
            originData={originData}
            onChange={this.onChange}
            tableParams={{ size: 'small' }}
            tableFilters={tableFilters}
            tableSorter={tableSorter}
          />
        ),
        code: codeExamples.base,
      },
      {
        title: '文本编辑器',
        example: (
          <DataEditor.Text
            rows={15}
            dataSource={textDataSource}
            onChange={this.onTextDataSourceChange}
          />
        ),
        code: codeExamples.text,
      },
      {
        title: '表格编辑器',
        example: (
          <DataEditor.Table
            size="small"
            filters={tableFilters}
            sorter={tableSorter}
            dataSource={tableDataSource}
            onChange={this.onTableDataSourceChange}
          />
        ),
        code: codeExamples.table,
      },
    ];
    return (
      <Content
        title="DataEditor 数据编辑器"
        subTitle="数据编辑器"
        whenUse="数据需要编辑时"
        codes={codes}
        apiDocs={apiDocs}
      />
    );
  }
}

export default Chart;
