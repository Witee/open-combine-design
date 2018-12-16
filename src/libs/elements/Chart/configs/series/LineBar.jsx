import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio, Checkbox } from 'antd';
import { TwitterPicker } from 'react-color';

/**
  echarts 折线、柱状图系列 共用的配置项

  Series 返回的是整个 echarts4.x 中 series 的配置内容

  注意：数据统一使用 dataset 进行设置，不在 series 中
      即 series 的对象中没有 data 字段

  @author Witee<github.com/Witee>
  @date   2018-12-14
*/

const defaultColors = ['#F2572D', '#0067A6', '#008972', '#00ABD8', '#F5C564', '#161E3E', '#285171', '#D8B368', '#82C0AF', '#DAD4B9', '#1f010a'];

class LineBar extends React.Component {
  change = (e, type, legendName) => {
    const { series, onChange } = this.props;

    if (onChange) {
      let newSeries = _.cloneDeep(series);

      if (type === 'type') {
        const value = _.get(e, 'target.value', null);
        newSeries = _.map(newSeries, (s) => {
          if (_.get(s, 'name', null) === legendName) {
            _.set(s, 'type', value);
            return s;
          }
          return s;
        });
      } else if (type === 'checked') {
        const checked = _.get(e, 'target.checked', null);
        newSeries = _.map(newSeries, (s) => {
          if (_.get(s, 'name', null) === legendName) {
            if (checked) {
              _.set(s, 'color', _.get(defaultColors, _.random(0, defaultColors.length)));
            } else {
              _.set(s, 'color', false);
            }
            return s;
          }
          return s;
        });
      } else if (type === 'custom') {
        const hex = _.get(e, 'hex', null);
        newSeries = _.map(newSeries, (s) => {
          if (_.get(s, 'name', null) === legendName) {
            _.set(s, 'color', hex);
            return s;
          }
          return s;
        });
      }

      onChange(newSeries);
    }
  }

  render() {
    const { label, series, legend, layout } = this.props;
    const legendData = _.get(legend, 'data', []);

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item>
        {_.map(legendData, (l) => {
          const currentSeriesConf = _.find(series, (s) => (_.get(s, 'name', null) === l));
          const currentSeriesColor = _.get(currentSeriesConf, 'color', null);

          return (
            <Form.Item {...layout} label={l} key={l}>
              <Form.Item {...layout}></Form.Item>

              <Form.Item {...layout} label="类型">
                <Radio.Group value={_.get(currentSeriesConf, 'type', 'line')} onChange={(e) => this.change(e, 'type', l)}>
                  <Radio value="line">折线图</Radio>
                  <Radio value="bar">柱状图</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item {...layout} label="颜色">
                <Checkbox
                  checked={!!currentSeriesColor}
                  onChange={(e) => this.change(e, 'checked', l)}
                >自定义
                </Checkbox>
                {!!currentSeriesColor
                  && (
                    <TwitterPicker
                      width="132px"
                      triangle="hide"
                      colors={defaultColors}
                      color={currentSeriesColor}
                      onChange={(color) => this.change(color, 'custom', l)}
                    />
                  )}
              </Form.Item>

            </Form.Item>
          );
        })}
      </Form.Item>
    );
  }
}

LineBar.propTypes = {
  label: PropTypes.string,
  series: PropTypes.array,
  legend: PropTypes.object,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

LineBar.defaultProps = {
  label: '系列',
  series: undefined,
  legend: undefined,
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

export default LineBar;
