import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Popconfirm } from 'antd';
import Table from '../Table';

/**
  常用布局中常用组合方式，工具栏中包含对内容的搜索、删除、添加

  @author Witee<github.com/Witee>
  @date   2018-07-04
*/

const Layout = (props) => {
  const {
    style,
    searchHidden,
    searchStyle,
    searchPlaceholder,
    onSearch,
    deleteHidden,
    deleteDisabled,
    deleteOnClick,
    text,
    addHidden,
    addDisabled,
    addOnClick,
    tableColumns,
    tableDataSource,
    tableScroll,
    tableLoading,
    tableRowSelection,
    tableTotal,
    tableCurrentPage,
    tableRowClassName,
    tableOnChange,
    tableExpandedRowRender,
    tableExpandedRowKeys,
    tableOnExpand,
  } = props;

  return (
    <Row style={style}>
      <Col className="margin-bottom-middle" style={{ display: 'flex', alignItems: 'center' }}>
        {searchHidden || (
          <Input.Search
            style={searchStyle}
            className="margin-right-small"
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
        )}
        {deleteHidden
        || (
          <Popconfirm
            title="确定删除？"
            okText="确定"
            cancelText="取消"
            onConfirm={deleteOnClick}
          >
            <Button
              icon="delete"
              disabled={deleteDisabled}
              className="margin-right-small"
            >删除
            </Button>
          </Popconfirm>
        )}
        {text}
        {addHidden
        || (
          <Button
            icon="plus"
            disabled={addDisabled}
            className="justify-self-right"
            onClick={addOnClick}
          >添加
          </Button>
        )}
      </Col>
      <Col>
        <Table
          columns={tableColumns}
          dataSource={tableDataSource}
          scroll={tableScroll}
          loading={tableLoading}
          rowSelection={tableRowSelection}
          total={tableTotal}
          currentPage={tableCurrentPage}
          rowClassName={tableRowClassName}
          onChange={tableOnChange}
          expandedRowRender={tableExpandedRowRender}
          expandedRowKeys={tableExpandedRowKeys}
          onExpand={tableOnExpand}
        />
      </Col>
    </Row>
  );
};


Layout.propTypes = {
  style: PropTypes.object,

  searchHidden: PropTypes.bool,
  searchStyle: PropTypes.object,
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,

  deleteHidden: PropTypes.bool,
  deleteDisabled: PropTypes.bool,
  deleteOnClick: PropTypes.func,

  text: PropTypes.node,

  addHidden: PropTypes.bool,
  addDisabled: PropTypes.bool,
  addOnClick: PropTypes.func,

  tableColumns: PropTypes.array,
  tableDataSource: PropTypes.array,
  tableScroll: PropTypes.object,
  tableLoading: PropTypes.bool,
  tableRowSelection: PropTypes.object,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableRowClassName: PropTypes.func,
  tableOnChange: PropTypes.func,
  tableExpandedRowRender: PropTypes.func,
  tableExpandedRowKeys: PropTypes.array,
  tableOnExpand: PropTypes.func,
};

Layout.defaultProps = {
  style: {},

  searchHidden: false,
  searchStyle: { width: '10em' },
  searchPlaceholder: '输入关键字搜索',
  // eslint-disable-next-line
  onSearch: (value) => { console.log('onSearch: ', value); },

  deleteHidden: false,
  deleteDisabled: false,
  // eslint-disable-next-line
  deleteOnClick: (value) => { console.log('onDeleteClick'); },

  text: undefined,

  addHidden: false,
  addDisabled: false,
  // eslint-disable-next-line
  addOnClick: (value) => { console.log('onAddClick'); },

  tableColumns: [],
  tableDataSource: [],
  tableScroll: {},
  tableLoading: undefined,
  tableRowSelection: undefined,
  tableTotal: undefined,
  tableCurrentPage: undefined,
  tableRowClassName: undefined,
  tableOnChange: undefined,
  tableExpandedRowRender: undefined,
  tableExpandedRowKeys: [],
  tableOnExpand: undefined,
};

export default Layout;
