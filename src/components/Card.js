// 引入 React，才能写 React 组件
import React from 'react';

// 定义一个叫做 Card 的组件，它会显示一个好看的盒子
const Card = ({ children }) => (
  <div style={{
    // 设置样式：
    border: '0px solid #ddd',            // 边框宽度为0，不显示边框
    borderRadius: '8px',                  // 四个角是圆角
    padding: '1rem',                      // 内容与边框之间留一点空隙
    boxShadow: '0 3px 6px 2px rgba(0, 0, 0, 0.1)', // 加上淡淡的阴影
    background: 'white'                   // 背景色是白色
  }}>
    {/* 插入外部传进来的子内容 */}
    {children}
  </div>
);

// 定义一个叫做 CardContent 的组件，用来包裹内容
const CardContent = ({ children }) => (
  <div>
    {/* 显示传进来的具体内容 */}
    {children}
  </div>
);

// 把这两个组件导出，供其他地方使用
export { Card, CardContent };