import React from 'react';
import { Input as OCDInput } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';

const Input = () => {
  const apiDocs = [
    {
      doc: [
        ['onChange', '获取返回值，返回 null 时表示不合法', 'function(value)', '-'],
        ['value', '输入的内容', 'string | number', 'undefined'],
        ['style', '样式', 'object', '{}'],
        ['hasFeedback', '显示反馈图标', 'boolean', 'true'],
        ['help', '格式错误时的提示文字', 'string', '支持中英文、数字、下划线、减号、空格'],
        ['regular', '正则表达式', 'object', <pre>/^[\u4e00-\u9fa5a-zA-Z0-9-_\s]+$/</pre>],
        ['placeholder', '没有内容时的显示', 'string', '请输入内容'],
        ['max', '最大字符长度', 'number', 'undefined'],
        ['autoFocus', '自动获得焦点', 'boolean', 'false'],
        ['labelName', '表单名称，设置此表示为表单形式显示', 'string', 'undefined'],
        ['labelSpan', '表单名称占用的空间(0~24; labelSpan + wrapperSpan <= 24)', 'object', 6],
        ['wrapperSpan', '表单内容占用的空间(0~24; labelSpan + wrapperSpan <= 24)', 'object', 18],
        ['required', '表单是否必选，(labelName 前增加星号)', 'boolean', 'true'],
      ],
    },
  ];

  const codes = [
    {
      title: '基本用法',
      example: (<OCDInput />),
      code: codeExamples.base,
    },
    {
      title: '自定义正则',
      example: (<OCDInput regular={/^\d+$/} help="只能输入数字" />),
      code: codeExamples.customRegular,
    },
    {
      title: '表单格式',
      example: (<OCDInput labelName="名称" />),
      code: codeExamples.withLabel,
    },
  ];

  return (
    <Content
      title="Input 输入框"
      subTitle="输入框"
      whenUse="输入的内容需要使用正则表达式检测时"
      codes={codes}
      apiDocs={apiDocs}
    />
  );
};

export default Input;
