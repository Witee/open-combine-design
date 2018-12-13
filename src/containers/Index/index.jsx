import React from 'react';
import ReactMarkdown from 'react-markdown';

const Index = () => {
  const indexMD = `## open-combine-design(OCD) 是什么

      OCD 是基于 Ant Design 组件的组合设计。
      组合常用功能，如:

        - Input 经常使用正则检测输入合法性
        - Popover 弹出框经常用于表单输入
        - Placeholder 用于占位
        - ...


      安装:

        npm install -S open-combine-design

  `;
  return (
    <ReactMarkdown source={indexMD} />
  );
};

export default Index;
