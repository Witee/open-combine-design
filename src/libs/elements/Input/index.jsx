import React from 'react';
import PropTypes from 'prop-types';
import { Input as ANTInput, Form } from 'antd';
import regularUtil from '../../utils/regular';

/*
  封装了 antd 的 Input，目的是增加校验

  直接返回 input 输入的值，如果为 null 则表示输入不合法
*/

class Input extends React.Component {
  constructor(props) {
    const { value } = props;
    super(props);
    let inputValue = value;
    // 如果 value 值为 undefined 或 null 则显示没有传递 value 的值
    if (_.isNull(value) || _.isUndefined(value)) {
      inputValue = '';
    }
    this.state = {
      input: inputValue, // 输入的内容
      legal: true,
    };
  }

  // 检查长度及格式
  // onChange 返回数据格式为 trimedValue
  // legal 是为了判断当前输入的是否合法
  checkInput = ({ target: { value } }) => {
    this.setState({ input: value });
    let trimedValue = _.trim(value);
    const { onChange, max, regular } = this.props;

    let legal = false;
    if (regular.test(trimedValue)) {
      legal = true;

      // 如果定义了 max 表示需要判断最大长度
      if (!_.isUndefined(max)) {
        if (trimedValue.length <= max) {
          legal = true;
        } else {
          legal = false;
        }
      }
    }

    // 如果合法，则返回实际的值，不合法返回 null
    if (!legal) {
      trimedValue = null;
    }
    this.setState({ legal });
    onChange(trimedValue);
  }

  render() {
    const {
      help,
      style,
      labelName,
      labelSpan,
      wrapperSpan,
      hasFeedback,
      required,
      placeholder,
      autoFocus,
    } = this.props;

    const { input, legal } = this.state;

    // 判断显示反馈图标
    let validateStatus;
    if (hasFeedback) {
      if (input.length === 0) {
        validateStatus = undefined;
      } else if (legal) {
        validateStatus = 'success';
      } else {
        validateStatus = 'error';
      }
    }

    return (
      <Form style={style}>
        <Form.Item
          label={labelName}
          labelCol={{ span: labelSpan }}
          wrapperCol={{ span: wrapperSpan }}
          hasFeedback={hasFeedback}
          validateStatus={validateStatus}
          help={legal || help} // 只有不合法时才显示 help
          required={required}
        >
          <ANTInput
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={this.checkInput}
            value={input}
          />
        </Form.Item>
      </Form>
    );
  }
}


Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  labelName: PropTypes.string,
  labelSpan: PropTypes.number,
  wrapperSpan: PropTypes.number,
  hasFeedback: PropTypes.bool,
  required: PropTypes.bool,
  help: PropTypes.string,
  regular: PropTypes.object,
  placeholder: PropTypes.string,
  max: PropTypes.number,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  value: undefined,
  onChange: () => {},
  style: {},
  labelName: undefined,
  labelSpan: 6,
  wrapperSpan: 18,
  hasFeedback: true,
  required: true,
  help: '支持中英文、数字、下划线、减号、空格',
  regular: regularUtil.cnEnNumSpaceUnderlineLine,
  placeholder: '请输入内容',
  max: undefined,
  autoFocus: false,
};

export default Input;
