import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio, Input } from 'antd';

/**
  Echarts 标题 配置项

  Title 返回的是整个 Echarts4.x 中 title 的配置内容

  @author Witee<github.com/Witee>
  @date   2018-12-03
*/

class Title extends React.Component {
  change = (type, { target: { value } }) => {
    const { title, onChange } = this.props;

    if (onChange) {
      const newTitle = {};

      if (type === 'text') {
        _.set(newTitle, 'text', value);
      } else if (type === 'subtext') {
        _.set(newTitle, 'subtext', value);
      } else if (type === 'left') {
        _.set(newTitle, 'left', value);
      } else if (type === 'top') {
        _.set(newTitle, 'top', value);
      }

      onChange(_.assign(title, newTitle));
    }
  }

  render() {
    const { label, title, layout } = this.props;

    const text = _.get(title, 'text', '');
    const subtext = _.get(title, 'subtext', '');
    const top = _.get(title, 'top', 'top');
    const left = _.get(title, 'left', 'left');

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        <Form.Item {...layout} label="主">
          <Input
            placeholder="图表标题"
            defaultValue={text}
            onBlur={(evt) => this.change('text', evt)}
            onPressEnter={(evt) => this.change('text', evt)}
          />
        </Form.Item>

        <Form.Item {...layout} label="副">
          <Input
            placeholder="图表副标题"
            defaultValue={subtext}
            onBlur={(evt) => this.change('subtext', evt)}
            onPressEnter={(evt) => this.change('subtext', evt)}
          />
        </Form.Item>

        <Form.Item {...layout}></Form.Item> {/* 占位 */}
        <Form.Item {...layout} label="横对齐">
          <Radio.Group value={left} onChange={(evt) => this.change('left', evt)}>
            <Radio value="left">左</Radio>
            <Radio value="center">中</Radio>
            <Radio value="right">右</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...layout} label="纵对齐">
          <Radio.Group value={top} onChange={(evt) => this.change('top', evt)}>
            <Radio value="top">上</Radio>
            <Radio value="middle">中</Radio>
            <Radio value="bottom">下</Radio>
          </Radio.Group>
        </Form.Item>
      </Form.Item>
    );
  }
}

Title.propTypes = {
  label: PropTypes.string,
  title: PropTypes.object,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

Title.defaultProps = {
  label: '标题',
  title: undefined,
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
  onChange: undefined,
};

export default Title;
