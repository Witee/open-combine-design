import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

/**
  echarts 高度 配置项

  @author Witee<github.com/Witee>
  @date   2018-12-04
*/

class Height extends React.Component {
  change = ({ target: { value } }) => {
    const { onHeightSet } = this.props;
    const numberReg = /^\d+$/;

    if (onHeightSet && numberReg.test(value)) {
      onHeightSet(value);
    }
  }

  render() {
    const { label, size, width, defaultValue, layout } = this.props;

    return (
      <Form.Item {...layout} label={label}>
        <Input
          size={size}
          style={{ width }}
          defaultValue={defaultValue}
          onBlur={this.change}
          onPressEnter={this.change}
        /> px
      </Form.Item>
    );
  }
}

Height.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  width: PropTypes.string,
  defaultValue: PropTypes.number,
  layout: PropTypes.object,
  onHeightSet: PropTypes.func,
};

Height.defaultProps = {
  label: '高度',
  size: 'small',
  width: '4em',
  defaultValue: 420,
  layout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  },
  onHeightSet: undefined,
};

export default Height;
