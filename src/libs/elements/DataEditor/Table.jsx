import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { table as tableUtils } from 'open-js-tools';
import OCDTable from '../Table';

/**
    表格编辑器 - 使用 antd Table 编辑二维表

      - onChange 会将 filters、sorter 和经过 filters、sorter 处理的 result 返回

      - 推荐使用方法： dataSource 始终传递 [原始数据]，即 props.dataSource,
        父层使用时经过 filters、sorter 处理，或直接使用 onChange 返回的 result 参数，
        如将 onChange 返回的 result 再次传递给 DataEditor.Table 会由于已有的 filters 选项造成不能生成所有的过滤列表

      - filters, sorter 需要在 onChange 返回之后再次传回；

      - 输入与输出数据格式均为 echarts4.x 中 dataset 的格式
        即: 第一行为表头，其它行为数据，每一行中以英文逗号分隔
        dataSource = [
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

  @author Witee<github.com/Witee>
  @date   2018-12-06
*/

class Table extends React.Component {
  constructor(props) {
    super(props);

    const { dataSource, filters, sorter } = props;

    this.state = { dataSource, filters, sorter };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, filters, sorter } = nextProps;
    this.setState({ dataSource, filters, sorter });
  }

  /**
    推荐使用方法： dataSource 应始终保持为 [原始数据]，
    filters, sorter 为对[原始数据]的处理方法，result 为处理结果
    sorter 只需要返回 field、order

    注意: pagination 并未使用，所以 dataSource 必须为全部数据
  */
  onTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    const { dataSource } = this.state;

    const newSorter = { field: sorter.field, order: sorter.order };

    this.setState({ filters, sorter: newSorter });

    if (_.isFunction(onChange)) {
      const fixedDataSource = tableUtils.fixData(dataSource);
      const result = tableUtils.filterAndSorter(fixedDataSource, filters, newSorter);

      onChange({ filters, sorter: newSorter, result });
    }
  }

  render() {
    const { toolbar, ...args } = this.props;
    const { dataSource, filters, sorter } = this.state;

    let tableDataSource = [];
    let columns = [];

    const fixedDataSource = tableUtils.fixData(dataSource);
    const newDataSource = tableUtils.filterAndSorter(fixedDataSource, filters, sorter);
    const header = _.get(fixedDataSource, 0, []);
    /**
      这里有两种 body,
        - body 是排序、过滤后的
        - originBody 是生成过滤列表专用的
    */
    const originBody = _.slice(fixedDataSource, 1);
    const body = _.slice(newDataSource, 1);

    /**
      只有 header 有数据时才会设置 tableDataSource，否则无论怎么操作都不符合 antd Table dataSource 参数格式
    */
    if (_.get(header, 'length', 0) > 0) {
      /**
        表格标题
        每一列都添加排序与过滤，其中数值型的使用数值大小排序
      */
      columns = _.map(header, (h, i) => {
        const filterOptions = _.uniqBy(
          _.map(originBody, (r) => {
            const option = _.get(r, i, '-');
            return { text: option, value: option };
          }),
          'text'
        );
        return {
          title: h,
          dataIndex: h,
          filters: filterOptions,
          filteredValue: _.get(filters, h, null), // 这里要设置成 null，不能是 undefined，否则不能清除 filter 状态
          onFilter: (value, record) => (_.toString(_.get(record, h, null)).includes(value)),
          sorter: true, // 在 Table 的 onChange 中进行了排序，并回传至上层，上层再传回，实现排序
          sortOrder: _.get(sorter, 'field', null) === h ? _.get(sorter, 'order', false) : undefined,
        };
      });

      /**
        表格数据
        将列表格式的数据转换为 antd Table 需要的格式
          即:
          old = [
            ['日期', '平台', '声量'],
            ['2018-07-20', '微博', 52872],
          ]
          new = [
            {key: INDEX, '日期': '2018-07-20', '平台': '微博', '声量', 52872},
          ]
      */
      tableDataSource = _.map(body, (value, index) => {
        const objData = _.zipObject(header, value);
        _.set(objData, 'key', `${_.get(value, 0, '')} = ${index}`);

        return objData;
      });
    }

    /**
       ...args 会将定义处的其它 props 参数都包含进来，
       所以在使用的时候需要提前删除已定义的参数或不能被覆盖的参数
    */
    const filteredArgs = _.cloneDeep(args);
    const protectedArgs = ['dataSource', 'columns', 'onChange', 'filters', 'sorter'];
    _.map(protectedArgs, (arg) => {
      _.unset(filteredArgs, arg);
    });

    return (
      <Row>
        {toolbar && (
          <Col className="margin-top-bottom-middle">
            { toolbar }
          </Col>
        )}

        <Col>
          <OCDTable
            dataSource={tableDataSource}
            columns={columns}
            onChange={this.onTableChange}
            {...filteredArgs}
          />

        </Col>
      </Row>
    );
  }
}

Table.propTypes = {
  toolbar: PropTypes.node,
  dataSource: PropTypes.arrayOf(PropTypes.array), // 需要始终传递 [原始数据]
  onChange: PropTypes.func,
  filters: PropTypes.object,
  sorter: PropTypes.object,
};

Table.defaultProps = {
  toolbar: undefined,
  dataSource: [[]],
  onChange: undefined,
  filters: {},
  sorter: {},
};

export default Table;
