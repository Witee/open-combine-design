const base = `
\`\`\`js
import { Layout } from 'open-combine-design';

class App extends React.Component {
  render(){
    const dataSource = [
      {
        key: '1',
        name: '普通用户',
        age: 32,
        address: '回龙观99号',
      },
      {
        key: '2',
        name: '超级用户',
        age: 42,
        address: '长安街1号',
      },
      {
        key: '3',
        name: '匿名用户',
        age: 10,
        address: '火星1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return(
      <Layout toolbar={<Input.Search style={{ width: '10em' }} />} >
        <Table dataSource={dataSource} columns={columns} />
      </Layout>,
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const group = `

\`\`\`js
import { Layout } from 'open-combine-design';

const dataSource = [
  {
    key: '1',
    name: '普通用户',
    age: 32,
    address: '回龙观99号',
  },
  {
    key: '2',
    name: '超级用户',
    age: 42,
    address: '长安街1号',
  },
  {
    key: '3',
    name: '匿名用户',
    age: 10,
    address: '火星1号',
  },
];

class App extends React.Component {
  state = {
    selectedTableRows: [],
    tableData: dataSource, // 可以添加列时需要将数据放到 state 中
    filterValue: null, // 搜索时用于判断数据是否需要过滤, null 表示不过滤
  }

  /**
    过滤数据
  */
  onSearch = (value) => {
    const trimValue = _.trim(value);

    let filterValue = null;
    if (trimValue.length > 0) {
      filterValue = trimValue;
    }
    this.setState({ filterValue });
  }

  /**
    点击表格 toolbar 的删除按钮
    删除后需要把 selectedTableRows 恢复默认
  */
  deleteOnClick = () => {
    const { selectedTableRows, tableData } = this.state;

    const selectedKeys = _.map(selectedTableRows, (row) => (row.key));
    _.remove(tableData, (data) => (_.includes(selectedKeys, data.key)));

    this.setState({ tableData, selectedTableRows: [] });
  }

  /**
    点击表格 toolbar 的添加按钮
  */
  addOnClick = () => {
    const { tableData } = this.state;
    /**
      下一个 key 的计算方法不有直接使用 tableData.length + 1
      因为在删除的时候如果有禁止删除的项，key 可能会重复，
      所以要找到最大的 key 再 + 1
      同时需要把 selectedTableRows 恢复默认
    */
    const maxRow = _.maxBy(tableData, (d) => (_.parseInt(d.key)));
    const next = _.toString(_.parseInt(maxRow.key) + 1);

    tableData.push({
      key: next,
      name: '用户' + next,
      age: next,
      address: '地址' + next,
    });

    this.setState({ tableData, selectedTableRows: [] });
  }

  /**
    表格翻页、过滤、排序
  */
  tableOnChange = (pagination, filters, sorter) => {
    // eslint-disable-next-line
    console.log(pagination, filters, sorter);
  };

  render(){
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    /**
      filterValue 用于判断是否对数据进行过滤
    */
    let filteredTableData = tableData;
    if (!_.isNull(filterValue)) {
      filteredTableData = _.filter(tableData, (data) => (_.includes(data.name, filterValue)));
    }

    const tableRowSelection = {
      selectedRowKeys: _.map(selectedTableRows, (row) => (row.key)), // selectedRowKeys 用于控制选中项
      onChange: (selectedRowKeys, selectedRows) => {
        // eslint-disable-next-line
        console.log(\`selectedRowKeys: \${selectedRowKeys}\`, 'selectedRows: ', selectedRows);
        this.setState({ selectedTableRows: selectedRows });
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === '超级用户', // 不可选择的列
      }),
    };

    let text = '';
    if (selectedTableRows.length > 0) { text = \`已选择 \${selectedTableRows.length} 项\`; }

    return(
      <Layout.Group
        onSearch={this.onSearch}
        searchPlaceholder="输入名称搜索"
        deleteDisabled={selectedTableRows.length === 0}
        deleteOnClick={this.deleteOnClick}
        text={text}
        addOnClick={this.addOnClick}
        tableDataSource={filteredTableData}
        tableColumns={columns}
        tableRowSelection={tableRowSelection}
        tableRowClassName={(record) => (record.key === '3' ? 'table-row-warnning' : '')}
        tableOnChange={this.tableOnChange}
        tableExpandedRowRender={this.tableExpandedRowRender}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  base,
  group,
};
