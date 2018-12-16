import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio, Input } from 'antd';

/**
  echarts X轴 配置项

  XAxis 返回的是整个 echarts4.x 中 xAxis 的配置内容

  注意，自定义的 column 不是 echarts 的参数，用来定义 X轴 取值列，在 series 的 encode 时会使用

  @author Witee<github.com/Witee>
  @date   2018-12-14
*/

class XAxis extends React.Component {
  change = (type, { target: { value } }) => {
    const { xAxis, onChange } = this.props;

    if (onChange) {
      const newXAxis = {};

      if (type === 'name') {
        _.set(newXAxis, 'name', value);
      } else if (type === 'type') {
        _.set(newXAxis, 'type', value);
      } else if (type === 'column') {
        _.set(newXAxis, 'column', value);
      }

      onChange(_.assign(xAxis, newXAxis));
    }
  }

  render() {
    const { label, xAxis, header, layout } = this.props;

    const name = _.get(xAxis, 'name', 'X轴');
    const type = _.get(xAxis, 'type', 'category');
    const column = _.get(xAxis, 'column', undefined);

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        <Form.Item {...layout} label="名称">
          <Input
            placeholder="X轴名称"
            defaultValue={name}
            onBlur={(evt) => this.change('name', evt)}
            onPressEnter={(evt) => this.change('name', evt)}
          />
        </Form.Item>

        <Form.Item {...layout} label="类型">
          <Radio.Group value={type} onChange={(evt) => this.change('type', evt)}>
            <Radio value="category">类目轴</Radio>
            <Radio value="value">数值轴</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...layout} label="取值">
          <Radio.Group value={column} onChange={(evt) => this.change('column', evt)}>
            {_.map(header, (h) => (<Radio key={h} value={h}>{h}</Radio>))}
          </Radio.Group>
        </Form.Item>
      </Form.Item>
    );
  }
}

XAxis.propTypes = {
  label: PropTypes.string,
  xAxis: PropTypes.object, // echarts 中的 xAxis 配置
  header: PropTypes.array, // X轴可选列表
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

XAxis.defaultProps = {
  label: 'X轴',
  xAxis: { name: 'X轴', type: 'category', column: undefined },
  header: [],
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

export default XAxis;
