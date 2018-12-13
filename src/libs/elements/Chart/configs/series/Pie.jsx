import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tooltip, Icon } from 'antd';

/**
  echarts 饼图系列 配置项

  Series 返回的是整个 echarts4.x 中 series 的配置内容

  注意：数据统一使用 dataset 进行设置，不在 series 中
      即 series 的对象中没有 data 字段

  @author Witee<github.com/Witee>
  @date   2018-12-04
*/

class Pie extends React.Component {
  change = (type, { target: { value } }) => {
    const { series, onChange } = this.props;
    const numberReg = /^\d+$/;
    const percentReg = /^\d+%$/;

    if (onChange) {
      const originFirstSeries = _.get(series, 0, {});
      /**
        type 为固定值
      */
      const newSeries = { type: 'pie' };

      if (type === 'name') {
        if (_.get(value, 'length', null)) {
          _.set(newSeries, 'name', value);
        }
      } else if (type === 'radius-in') {
        if (numberReg.test(value) || percentReg.test(value)) {
          const originRadius = _.get(originFirstSeries, 'radius', []);
          const newRadius = _.set(originRadius, 0, value);
          _.set(newSeries, 'radius', newRadius);
        }
      } else if (type === 'radius-out') {
        if (numberReg.test(value) || percentReg.test(value)) {
          const originRadius = _.get(originFirstSeries, 'radius', []);
          const newRadius = _.set(originRadius, 1, value);
          _.set(newSeries, 'radius', newRadius);
        }
      } else if (type === 'formatter') {
        if (_.get(value, 'length', null)) {
          _.set(newSeries, 'label.formatter', value);
        }
      }
      /**
        注意，这里返回的是列表
      */
      onChange([_.assign(originFirstSeries, newSeries)]);
    }
  }

  render() {
    const { label, series, layout } = this.props;

    /**
      只使用第一个
    */
    const firstSeries = _.get(series, 0, {});

    // const name = _.get(firstSeries, 'name', '');
    const sizeIn = _.get(_.get(firstSeries, 'radius', []), 0, undefined);
    const sizeOut = _.get(_.get(firstSeries, 'radius', []), 1, undefined);
    const formatter = _.get(firstSeries, 'label.formatter', '{b}');

    const radiusTooltip = (
      <p>
        饼图的内、外半径。可以为如下类型: <br /><br />

        数值: 直接输入数字指定内外半径像素值。<br />
        字符串: 输入比分比，例如，20%，表示半径为可视区尺寸的 20% 长度。<br /><br />
        内 表示内半径，外 表示外半径。<br />
        同时设置时，如果 外半径&gt;内半径，可以显示为圆环，如内半径设置为 50%; 外半径设置为 70%。<br />
      </p>
    );

    const formatterTooltip = (
      <p>
      字符串模板:<br />
        &nbsp; &#123;a&#125;: 系列名<br />
        &nbsp; &#123;b&#125;: 数据名<br />
        &nbsp; &#123;c&#125;: 数据值<br />
        &nbsp; &#123;d&#125;: 百分比<br />
        如只显示名称和百分比: &#123;b&#125;&nbsp;(&#123;d&#125; %)
      </p>
    );

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        {/* <Form.Item {...layout} label="名称">
          <Input
          placeholder="系列名称"
          defaultValue={name}
          onBlur={(evt) => this.change('name', evt)}
          onPressEnter={(evt) => this.change('name', evt)}
        />
        </Form.Item> */}

        <Form.Item {...layout} label={<Tooltip placement="topLeft" title={radiusTooltip}>半径 <Icon type="question-circle-o" /></Tooltip>}>
          <Form.Item {...layout}></Form.Item> {/* 占位 */}
          <Form.Item {...layout} label="内">
            <Input
              size="small"
              style={{ width: '4em' }}
              defaultValue={sizeIn}
              onBlur={(evt) => this.change('radius-in', evt)}
              onPressEnter={(evt) => this.change('radius-in', evt)}
            />
          </Form.Item>

          <Form.Item {...layout} label="外">
            <Input
              size="small"
              style={{ width: '4em' }}
              defaultValue={sizeOut}
              onBlur={(evt) => this.change('radius-out', evt)}
              onPressEnter={(evt) => this.change('radius-out', evt)}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item {...layout} label={<Tooltip placement="topLeft" title={formatterTooltip}>格式 <Icon type="question-circle-o" /></Tooltip>}>
          <Input
            placeholder="格式"
            defaultValue={formatter}
            onBlur={(evt) => this.change('formatter', evt)}
            onPressEnter={(evt) => this.change('formatter', evt)}
          />

        </Form.Item>

      </Form.Item>
    );
  }
}

Pie.propTypes = {
  label: PropTypes.string,
  series: PropTypes.array,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

Pie.defaultProps = {
  label: '系列',
  series: [],
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

export default Pie;
