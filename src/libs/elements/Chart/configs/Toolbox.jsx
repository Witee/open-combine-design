import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';

/**
  Echarts Toolbox 配置项，受控组件

  Toolbox 返回的是整个 Echarts4.x 中 toolbox 的配置内容，如 saveAsImage

  @author Witee<github.com/Witee>
  @date   2018-12-03
*/

class Toolbox extends React.Component {
  /**
    参数支持 bool 或 object

    只有 参数 = undefined 或 false 时不显示

    参数 === true 或 object(配置项) 表示开启
  */
  change = (type, evt) => {
    const { toolbox, onChange } = this.props;

    if (onChange) {
      const newToolbox = _.cloneDeep(toolbox);
      const ifChecked = _.get(evt, 'target.checked', null);
      const saveAsImage = _.get(toolbox, 'feature.saveAsImage', undefined);

      if (type === 'saveAsImage') {
        if (ifChecked === true) {
          if (_.isBoolean(saveAsImage)) {
            _.set(newToolbox, 'feature.saveAsImage', { show: true });
          } else {
            _.set(newToolbox, 'feature.saveAsImage', _.assign(saveAsImage, { show: true }));
          }
        } else if (_.isObject(saveAsImage)) {
          _.set(newToolbox, 'feature.saveAsImage', _.assign(saveAsImage, { show: false }));
        }
      }
      onChange(newToolbox);
    }
  }

  render() {
    const { label, toolbox, layout } = this.props;
    /**
      判断是否勾选，
       - 明确 show 为 true
       - 或 为 {} 且 没有设置 show 字段
    */
    const saveAsImage = _.get(toolbox, 'feature.saveAsImage', undefined);
    const saveAsImageShow = _.get(saveAsImage, 'show', false);
    const hasSaveAsImageShow = _.has(saveAsImage, 'show');

    return (
      <Form.Item {...layout} label={label}>
        <Checkbox
          onChange={(evt) => this.change('saveAsImage', evt)}
          checked={saveAsImageShow || (_.isObject(saveAsImage) && !hasSaveAsImageShow)}
        >
          {_.get(saveAsImage, 'title', '保存为图片')}
        </Checkbox>
      </Form.Item>
    );
  }
}

Toolbox.propTypes = {
  label: PropTypes.string,
  toolbox: PropTypes.object,
  layout: PropTypes.object,
  onChange: PropTypes.func,
};

Toolbox.defaultProps = {
  label: '工具',
  toolbox: undefined,
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

export default Toolbox;
