import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';

/**
  Echarts 词云图系列 配置项

  Series 返回的是整个 Echarts4.x 中 series 的配置内容

  注意：数据统一使用 dataset 进行设置，不在 series 中
      即 series 的对象中没有 data 字段

  @author Witee<github.com/Witee>
  @date   2018-12-07
*/

const colorGroups = [
  ['#6a6bd2', '#8ca34d', '#df9cd7', '#e8bb48', '#b4d065'],
  ['#F2572D', '#0067A6', '#008972', '#00ABD8', '#F5C564'],
  ['#161E3E', '#285171', '#D8B368', '#82C0AF', '#DAD4B9'],
  ['#1f010a', '#52020b', '#950707', '#c44a22', '#bd6000'],
  ['#011E4C', '#103961', '#35639D', '#8DA6BD', '#9A9B9B'],
  ['#781308', '#D41D45', '#E86E1B', '#B5AC00', '#ECBA06'],
  ['#111111', '#222222', '#333333', '#444444', '#555555'],
];

class WordCloud extends React.Component {
  change = (type, e) => {
    const { series, onChange } = this.props;

    if (onChange) {
      const originFirstSeries = _.get(series, 0, {});
      /**
        type 为固定值
      */
      const newSeries = { type: 'wordCloud' };

      if (type === 'shape') {
        const value = _.get(e, 'target.value');
        if (_.get(value, 'length', null)) {
          _.set(newSeries, 'shape', value);
        }
      } else if (type === 'rotation') {
        const value = _.get(e, 'target.value');
        _.set(newSeries, 'rotationRange', [-value, value]);
      } else if (type === 'color') {
        const colors = _.get(colorGroups, e.key);
        _.set(newSeries, 'textStyle.normal.color', () => (_.get(colors, _.random(0, colors.length))));
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

    const shape = _.get(firstSeries, 'shape', 'circle');
    const rotationRange = _.get(firstSeries, 'rotationRange', [-90, 90]);
    const rotation = Math.abs(_.get(rotationRange, 0, 90));

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        <Form.Item {...layout} label="形状">
          <Radio.Group value={shape} onChange={(evt) => this.change('shape', evt)}>
            <Radio value="circle">圆形</Radio>
            <Radio value="star">五角星</Radio>
            <Radio value="triangle">三角形</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...layout} label="角度">
          <Radio.Group value={rotation} onChange={(evt) => this.change('rotation', evt)}>
            <Radio value={90}>旋转</Radio>
            <Radio value={0}>不旋转</Radio>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item {...layout} label="颜色">
          <Menu onClick={(evt) => this.change('color', evt)} style={{ width: 120 }}>
            {_.map(colorGroups, (colors, i) => (
              <Menu.Item key={i}>
                {_.map(colors, (color, index) => (
                  <span style={{ background: color, border: '#c3c3c3 solid 1px', width: 20, height: 20, display: 'inline-block' }} key={index} />
                ))}
              </Menu.Item>
            ))}
          </Menu>
        </Form.Item> */}

      </Form.Item>
    );
  }
}

WordCloud.propTypes = {
  label: PropTypes.string,
  series: PropTypes.array,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

WordCloud.defaultProps = {
  label: '词云',
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

export default WordCloud;
