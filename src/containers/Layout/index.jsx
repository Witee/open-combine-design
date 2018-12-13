import React from 'react';
import { Input, Table } from 'antd';
import { Layout } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';

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

class OCDLayout extends React.Component {
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
      name: `用户${next}`,
      age: next,
      address: `地址${next}`,
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

  /**
    表格展开后显示的内容
  */
  tableExpandedRowRender = () => ('这是展开后显示的内容')

  render() {
    const { selectedTableRows, tableData, filterValue } = this.state;

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
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedTableRows: selectedRows });
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === '超级用户', // 不可选择的列
      }),
    };

    let text = '';
    if (selectedTableRows.length > 0) { text = `已选择 ${selectedTableRows.length} 项`; }

    /**
      api 文档
    */
    const apiDocs = [
      {
        title: '共有 API',
        doc: [
          ['style', '整体的样式', 'object', '{}'],
        ],
      },
      {
        title: 'Layout 使用的API',
        doc: [
          ['toolbar', '工具栏，任意可渲染的内容', 'node', '"toolbar"'],
          ['children', '内容框，任意可渲染的内容', 'node', '"children"'],
        ],
      },
      {
        title: 'Layout.Group 使用的API',
        doc: [
          ['searchHidden', '是否隐藏搜索框', 'bool', 'false'],
          ['searchStyle', 'search 的 style', 'object', '{ width: \'10em\' }'],
          ['searchPlaceholder', '搜索框无内容时的提示', 'string', '输入关键字搜索'],
          ['onSearch', '搜索的回调', 'func', '(value) => { console.log(\'onSearch: \', value); }'],
          ['deleteHidden', '是否隐藏删除按钮', 'bool', 'false'],
          ['deleteDisabled', '是否禁用删除按钮', 'bool', 'false'],
          ['deleteOnClick', '删除按钮的回调', 'func', '(value) => { console.log(\'onDeleteClick\'); }'],
          ['text', '在删除按钮后显示的内容，任意可渲染的内容', 'node', 'undefined'],
          ['addHidden', '是否隐藏添加按钮', 'bool', 'false'],
          ['addDisabled', '添加按钮是否禁用', 'bool', 'false'],
          ['addOnClick', '添加按钮的回调', 'func', '(value) => { console.log(\'onAddClick\'); }'],
          ['tableColumns', '表格表头', 'array', '[]'],
          ['tableDataSource', '表格数据', 'array', '[]'],
          ['tableScroll', '横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: true, y: 300 }', 'object', '{}'],
          ['tableLoading', '表格是否loading', 'bool', 'false'],
          ['tableRowSelection', <span>配置时表示列表项可选。参考AntD 2.x的<a href="http://2x.ant.design/components/table-cn/#rowSelection" target="_blank">配置项</a></span>, 'object', 'undefined'],
          ['tableTotal', '列表数据总数，用于每次只加载当前分页数量内容时翻页器使用，使翻页器可正常显示页码及总数。示定义时使用 tableDataSource.length ', 'number', 'undefined'],
          ['tableCurrentPage', '分页器当前页，只在页码显示不正确时使用', 'number', 'undefined'],
          ['tableRowClassName', '列应用的样式', 'func', 'undefined'],
          ['tableOnChange', '响应表格翻页、过滤、排序', 'func', 'undefined'],
          ['tableExpandedRowRender', '表格行展开', 'func', 'undefined'],
          ['tableExpandedRowKeys', '当前展开行的id', 'array', '[]'],
          ['tableOnExpand', '点击展开图标时触发', 'func', 'undefined'],
        ],
      },
    ];

    const codes = [
      {
        title: '基本用法',
        example: (
          <Layout toolbar={<Input.Search style={{ width: '10em' }} />}>
            <Table dataSource={dataSource} columns={columns} />
          </Layout>
        ),
        code: codeExamples.base,
      },
      {
        title: '常用组合',
        example: (
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
          />),
        code: codeExamples.group,
      },
    ];
    return (
      <Content
        title="Layout 常用布局"
        subTitle="常用布局"
        whenUse="使用表格展示数据时"
        codes={codes}
        apiDocs={apiDocs}
      />
    );
  }
}

export default OCDLayout;
