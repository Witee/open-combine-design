import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';

/**
  echarts 图例 配置项，受控组件

  Legend 返回的是整个 echarts4.x 中 legend 的配置内容

  @author Witee<github.com/Witee>
  @date   2018-12-04
*/

class Legend extends React.Component {
  /**
    data 原样返回
  */
  change = (type, { target: { value } }) => {
    const { legend, onChange } = this.props;

    if (onChange) {
      const newLegend = {};
      if (type === 'column') {
        _.set(newLegend, 'column', value);
      } else if (type === 'orient') {
        _.set(newLegend, 'orient', value);
      } else if (type === 'left') {
        _.set(newLegend, 'left', value);
      } else if (type === 'top') {
        _.set(newLegend, 'top', value);
      }

      onChange(_.assign(legend, newLegend));
    }
  }

  render() {
    const { label, legend, header, layout } = this.props;

    const column = _.get(legend, 'column', undefined);
    const orient = _.get(legend, 'orient', 'horizontal');
    const left = _.get(legend, 'left', 'center');
    const top = _.get(legend, 'top', 'top');

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        {!_.isUndefined(header)
          && (
            <Form.Item {...layout} label="取值">
              <Radio.Group value={column} onChange={(evt) => this.change('column', evt)}>
                {_.map(header, (h) => (<Radio key={h} value={h}>{h}</Radio>))}
              </Radio.Group>
            </Form.Item>
          )
        }

        <Form.Item {...layout} label="排列">
          <Radio.Group value={orient} onChange={(evt) => this.change('orient', evt)}>
            <Radio value="horizontal">横向</Radio>
            <Radio value="vertical">纵向</Radio>
          </Radio.Group>
        </Form.Item>

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

Legend.propTypes = {
  label: PropTypes.string,
  legend: PropTypes.object,
  header: PropTypes.array, // 图例可选列表
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

Legend.defaultProps = {
  label: '图例',
  legend: {},
  header: undefined,
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

export default Legend;
