import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

/**
    文本编辑器 - 在文本框中编辑二维表

    - onChange 会将修改后的 dataSource 返回

    - 推荐用法: 父层需要将 onChange 返回的 dataSource 再次传递给 DataEditor.Text 的 dataSource 参数

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
  @date   2018-12-04
*/

class Text extends React.Component {
  constructor(props) {
    super(props);

    const { dataSource } = props;

    this.state = { dataSource };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    this.setState({ dataSource });
  }

  /**
    提交，将以逗号分隔的字符串还原成列表
  */
  onTextAreaSubmit = ({ target: { value } }) => {
    const { onChange } = this.props;

    if (_.isFunction(onChange)) {
      onChange(this.textToArray(value));
    }
  }

  /**
    监听文档变化
  */
  onTextAreaChange = ({ target: { value } }) => {
    this.setState({ dataSource: this.textToArray(value) });
  }

  textToArray = (text) => {
    const newData = [];
    const rawData = _.compact(_.split(text, '\n'));
    _.forEach(rawData, (v) => {
      newData.push(_.split(v, ','));
    });
    return newData;
  }


  render() {
    const { toolbar, ...args } = this.props;
    const { dataSource } = this.state;

    /**
      将列表格式的数据，转换成以逗号分隔的数据
    */
    const textData = [];
    _.map(dataSource, (value) => { textData.push(_.join(value, ',')); });

    /**
       ...args 会将定义处的其它 props 参数都包含进来，
       所以在使用的时候需要提前删除已定义的参数或不能被覆盖的参数
    */
    const filteredArgs = _.cloneDeep(args);
    const protectedArgs = ['value', 'onBlur', 'dataSource', 'onChange'];
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
          {/*
            onChange 只是改变 state 中的值，在 onBlur 时才会回传
          */}
          <Input.TextArea
            value={_.join(textData, '\n')}
            onBlur={this.onTextAreaSubmit}
            onChange={this.onTextAreaChange}
            {...filteredArgs}
          />
        </Col>
      </Row>
    );
  }
}

Text.propTypes = {
  toolbar: PropTypes.node,
  dataSource: PropTypes.array,
  onChange: PropTypes.func,
};

Text.defaultProps = {
  toolbar: undefined,
  dataSource: [[]],
  onChange: undefined,
};

export default Text;
