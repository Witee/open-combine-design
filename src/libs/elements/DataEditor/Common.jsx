import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Radio, Input, Button } from 'antd';
import { table as tableUtils } from 'open-js-tools';
import Table from '../Table';

/**
  全功能数据编辑器 - 二维表格式，第一行是表头，其它行是数据

  如下:
  dataSource = [
    ["日期", "声量"]
    ["2018-07-09", 58212]
    ["2018-07-08", 78254]
    ["2018-07-07", 41032]
    ["2018-07-06", 12755]
    ["2018-07-05", 20145]
    ["2018-07-04", 79146]
    ["2018-07-03", 91852]
    ["2018-07-02", 101852]
  ]

  @author Witee<github.com/Witee>
  @date   2018-07-24
*/

class Common extends React.Component {
  constructor(props) {
    super(props);

    const { dataSource, tableFilters, tableSorter } = props;
    const fixedDataSource = tableUtils.fixData(dataSource);
    const newDataSource = tableUtils.filterAndSorter(fixedDataSource, tableFilters, tableSorter);

    this.state = {
      dataEditorType: 'table',
      dataSource: newDataSource,
      filteredInfo: tableFilters,
      sorter: tableSorter,
    };
  }

  componentWillReceiveProps(nextProps) {
    const fixedData = tableUtils.fixData(nextProps.dataSource);
    this.setState({ dataSource: fixedData });
  }

  /**
    切换数据的显示方式，表格或文本
  */
  onDataEditorTypeChange = (e) => {
    this.setState({ dataEditorType: e.target.value });
  }

  /**
    监听文本框编辑
  */
  onTextAreaChange = (e) => {
    const { onChange } = this.props;

    const splitedData = _.compact(_.split(e.target.value, '\n'));
    if (_.isFunction(onChange)) { onChange(_.map(splitedData, (d) => (_.split(d, ',')))); }
  }

  /**
    监听表格过滤、排序，并将处理后的结果及过滤、排序条件返回，
  */
  onTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    const { dataSource } = this.state;

    let newDataSource = _.cloneDeep(dataSource);

    /**
      如果数据长度小于等于2，则认为只有表头或表头+一条数据，所以原样返回
    */
    if (newDataSource.length >= 2) {
      /**
        处理过虑、排序
      */
      newDataSource = tableUtils.filterAndSorter(newDataSource, filters, sorter);
    }
    if (_.isFunction(onChange)) { onChange(newDataSource, filters, sorter); }

    /**
      将过滤条件保存，方便在渲染 columns 时使用
    */
    this.setState({ filteredInfo: filters, sorter });
  }

  /**
    恢复原始数据
  */
  onReloadClick = () => {
    const { onChange, originData } = this.props;

    this.setState({ dataSource: originData, filteredInfo: {}, sorter: {} });
    /**
      恢复之后将原始数据回传
    */
    if (_.isFunction(onChange)) { onChange(originData, null, null, true); }
  }

  render() {
    const { title, tableParams, originData } = this.props;
    const { dataEditorType, dataSource, filteredInfo, sorter } = this.state;

    /**
      这里的 rows 分成了 2 种，
      rows = dataSource.slice(1) 用于表格内容的显示
      orginRows = originData.slice(1) 用于表格过滤条件的渲染
    */
    let newDataSource = dataSource;
    const header = _.get(dataSource, 0, []);
    let rows = dataSource.length >= 2 ? dataSource.slice(1) : [];
    const orginRows = _.get(originData, 'length', null) >= 2 ? originData.slice(1) : [];
    /**
      每一列都添加排序与过滤，其中数值型的使用数值大小排序
    */
    const columns = _.map(header, (h, i) => ({
      key: h,
      title: h,
      dataIndex: h,
      filters: _.uniqBy(_.map(orginRows, (r) => ({ text: `${_.get(r, i, '-')}`, value: _.get(r, i, '-') })), 'text'),
      filteredValue: _.get(filteredInfo, h, null),
      onFilter: (value, record) => (_.toString(_.get(record, h, null)).includes(value)),
      sorter: true, // 在 Table 的 onChange 中进行了排序，并回传至上层，上层再传回，实现排序
      sortOrder: _.get(sorter, 'field', null) === h ? _.get(sorter, 'order', false) : undefined,
    }));
    /**
      如果设置了sorter，说明需要按此排序，所以对 tableDataSource 作排序处理
    */
    if (!_.isEmpty(sorter) && _.get(sorter, 'field', null) && _.get(sorter, 'order', null)) {
      newDataSource = tableUtils.filterAndSorter(dataSource, filteredInfo, sorter);
      rows = newDataSource.length >= 2 ? newDataSource.slice(1) : [];
    }
    const tableDataSource = _.map(rows, (r, index) => {
      const data = {
        key: `${_.get(r, 0, '')} = ${index}`,
      };
      _.forEach(header, (h, i) => {
        data[h] = _.get(r, i, null);
      });
      return data;
    });

    return (
      <Row>
        <Col
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          className="margin-top-bottom-middle"
        >
          {title}
          <Radio.Group
            value={dataEditorType}
            size="small"
            onChange={this.onDataEditorTypeChange}
            className="justify-self-right"
          >
            <Radio.Button key="table" value="table">表格</Radio.Button>
            <Radio.Button key="text" value="text">文本</Radio.Button>
          </Radio.Group>
          <Button
            icon="reload"
            size="small"
            className="margin-left-small"
            disabled={!originData}
            onClick={this.onReloadClick}
          >
            还原
          </Button>
        </Col>

        <Col>
          {dataEditorType === 'table'
            ? (
              <Table
                dataSource={tableDataSource}
                columns={columns}
                onChange={this.onTableChange}
                {..._.assign(
                  {
                    size: 'default',
                  },
                  tableParams
                )}
              />
            )
            : (
              <Input.TextArea
                value={_.join(_.map(newDataSource, (d) => (`${_.join(d, ',')}`)), '\n')}
                rows={15}
                onChange={this.onTextAreaChange}
              />
            )
          }
        </Col>
      </Row>
    );
  }
}

Common.propTypes = {
  title: PropTypes.node,
  originData: PropTypes.arrayOf(PropTypes.array),
  dataSource: PropTypes.arrayOf(PropTypes.array),
  onChange: PropTypes.func.isRequired,
  tableParams: PropTypes.object,
  tableFilters: PropTypes.object,
  tableSorter: PropTypes.object,
};

Common.defaultProps = {
  title: <h3>源数据</h3>,
  originData: undefined,
  dataSource: [[]],
  tableParams: {},
  tableFilters: {},
  tableSorter: {},
};

export default Common;
