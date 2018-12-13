import React from 'react';
import PropTypes from 'prop-types';
import { Table as ANTTable } from 'antd';

/**
  再次封装了 AntD 的 Table，目录是固定一些参数，如 pagination
*/

const Table = (props) => {
  const { dataSource, currentPage, total, ...args } = props;
  const pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (totalNum, range) => `${range[0]}-${range[1]} 共 ${totalNum} 项`,
  };
  /**
    直接在 pagination 中添加 {current: currentPage}
    会导致在不传递 currentPage 时由于值固定而无法翻页，所以在这里添加
  */
  if (currentPage) { pagination.current = currentPage; }

  /**
    如果 total 没有传递时使用 dataSource 的数据长度作为值
  */
  if (total) { pagination.total = total; } else { pagination.total = dataSource.length; }

  return (
    <ANTTable
      dataSource={dataSource}
      pagination={pagination}
      {...args}
    />

  );
};

Table.propTypes = {
  dataSource: PropTypes.array,
  currentPage: PropTypes.number,
  total: PropTypes.number,
};

Table.defaultProps = {
  dataSource: [],
  currentPage: undefined,
  total: undefined,
};

export default Table;
