import React from 'react';
import { Placeholder as OCDPlaceholder } from 'libs';
import Content from 'components/Content';
import codeExamples from './codeExamples';

const Placeholder = () => {
  const apiDocs = [
    {
      doc: [
        ['text', '文本内容', 'string', '暂无数据'],
        ['icon', '图标，使用 Antd 的 Icon 中图标名称', 'string', 'frown-o'],
        ['style', '样式', 'object', '-'],
      ],
    },
  ];

  const codes = [
    {
      title: '加载中...',
      example: (<OCDPlaceholder icon="loading" text="加载中..." style={{ height: '20em' }} />),
      code: codeExamples.loadingCode,
    },
    {
      title: '暂无数据',
      example: (<OCDPlaceholder icon="frown-o" text="暂无数据" style={{ height: '20em' }} />),
      code: codeExamples.emptyCode,
    },
  ];

  return (
    <Content
      title="Placeholder 占位"
      subTitle="占位符"
      whenUse="当实际内容无法显示时占位使用，如loading、数据错误、无数据等。"
      codes={codes}
      apiDocs={apiDocs}
    />
  );
};

export default Placeholder;
