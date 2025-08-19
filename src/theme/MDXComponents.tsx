import React from 'react';
// 导入原始的组件映射器
import MDXComponents from '@theme-original/MDXComponents';

// 只导入自定义组件
import FileBlock from '@site/src/components/FileBlock';

export default {
  // 复用默认的组件映射
  ...MDXComponents,
  // 注册自定义组件
  FileBlock,
};