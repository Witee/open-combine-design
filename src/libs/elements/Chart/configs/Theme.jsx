import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { TwitterPicker } from 'react-color';

/**
  Echarts 主题、背景色 配置项，受控组件

  @author Witee<github.com/Witee>
  @date   2018-12-03
*/

const defaultColors = ['#F7F7F7', '#D9E3F0', '#697689', '#37D67A', '#555555', '#dce775', '#ba68c8', '#ABB8C3'];

class Theme extends React.Component {
  change = (type, evt) => {
    const { theme, backgroundColor, onChange } = this.props;

    if (onChange) {
      let newTheme = theme;
      let newBackgroundColor = backgroundColor;

      if (type === 'theme') {
        newTheme = _.get(evt, 'target.value', null);
      } else if (type === 'backgroundColor') {
        newBackgroundColor = _.get(evt, 'hex', null);
      }

      onChange({
        theme: newTheme,
        backgroundColor: newBackgroundColor,
      });
    }
  }

  render() {
    const { label, theme, backgroundColor, colorPickerConfig, layout } = this.props;

    const defaultColorPickerConfig = {
      width: '168px',
      triangle: 'hide',
      colors: defaultColors,
    };

    const newColorPickerConfig = _.assign(defaultColorPickerConfig, colorPickerConfig);

    return (
      <Form.Item {...layout} label={label}>
        <Form.Item {...layout}></Form.Item> {/* 占位 */}

        <Form.Item {...layout} label="主题">
          <Radio.Group value={theme} onChange={(evt) => this.change('theme', evt)}>
            <Radio value="default">默认</Radio>
            <Radio value="dark">暗色</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...layout} label="背景色">
          <TwitterPicker
            width={newColorPickerConfig.width}
            triangle={newColorPickerConfig.triangle}
            colors={newColorPickerConfig.colors}
            color={backgroundColor}
            onChange={(color) => this.change('backgroundColor', color)}
          />
        </Form.Item>
      </Form.Item>
    );
  }
}

Theme.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'dark']), // 默认已注册的主题
  backgroundColor: PropTypes.string,
  colorPickerConfig: PropTypes.object,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

Theme.defaultProps = {
  label: '颜色',
  theme: 'default',
  backgroundColor: '#FFFFFF',
  colorPickerConfig: {},
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

export default Theme;
