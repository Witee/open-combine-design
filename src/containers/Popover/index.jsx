import React from 'react';
import { PopoverInput } from 'libs';
import { Link } from 'react-router-dom';
import Content from 'components/Content';
import codeExamples from './codeExamples';

class Popover extends React.Component {
  handleSubmit = (value) => {
    // eslint-disable-next-line
    console.log('handleSubmit: ', value);
  };

  render() {
    const apiDocs = [
      {
        doc: [
          ['submit', '获取返回值', 'function(value)', '-'],
          ['title', '弹出框的标题', 'string', '请选择'],
          ['cardStyle', '弹出框的样式', 'object', 'undefined'],
          ['cardPlacement', '弹出框的位置, 可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom', 'string', 'bottomRight'],
          ['tooltipTitle', '鼠标悬停到按钮上的提示', 'string', 'undefined'],
          ['btnName', '按钮名称', 'string', '保存'],
          ['btnType', '按钮类型', 'string', 'default'],
          ['btnSize', '按钮大小', 'string', 'default'],
          ['btnIcon', '按钮图标', 'string', 'save'],
          ['btnDisabled', '按钮是否禁用', 'boolean', 'false'],
          ['btnLoading', '按钮loading', 'boolean', 'false'],
          ['btnOnClick', '按钮点击', 'function', '() => {}'],
          ['btnClassName', '按钮样式类', 'string', ''],
          ['btnStyle', '按钮样式', 'object', "{ width: '100%' }"],
          ['input*', <div>使用 [input+Input组件参数] 即可设置Input的选项，详情访问 <Link to="/app/components/input">Input</Link></div>, 'object', 'undefined'],
        ],
      },
    ];

    const codes = [
      {
        title: '基本用法',
        example: (<PopoverInput
          title="请输入名称"
          inputLabelName="名称"
          cardStyle={{ width: '20em' }}
          submit={this.handleSubmit}
          btnStyle={{ width: '10em', margin: '5em' }}
          btnType="primary"
          btnIcon="file"
        />),
        code: codeExamples.base },
    ];

    return (
      <Content
        title="Popover 弹出输入表单"
        subTitle="弹出输入表单"
        whenUse="点击按钮输入一个名称并提交"
        codes={codes}
        apiDocs={apiDocs}
      />
    );
  }
}

export default Popover;
