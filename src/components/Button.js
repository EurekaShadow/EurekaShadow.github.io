// 引入 React，才能写 React 组件
import React from 'react';

// 定义一个叫做 Button 的组件，它是一个带图标的按钮
const Button = ({ icon, href, children }) => (
  // 使用 button 标签（注意：通常应使用 a 标签来配合 href）
  <a
    href={href}  // 设置跳转链接
	target="_blank"             // 在新标签页中打开
	rel="noopener noreferrer"   // 安全防护：防止新页面访问 window.opener	
	//加上 rel="noopener noreferrer" 是为了保护你的网站不被新开的页面攻击或窃取信息。
    // 使用 Tailwind CSS 写的样式：
    className="
      flex items-center gap-2         // 图标与文字水平排列，间距适中
      px-6 py-2                       // 内边距，控制按钮宽度和高度
      rounded-md                      // 圆角边框
      bg-[#F6D2F4]                    // 粉色背景
      text-white                      // 白色文字
      shadow-md                       // 添加轻微阴影
      cursor-pointer                  // 鼠标变为手指形状，表示可点击
      font-bold                       // 文字加粗
      no-underline                    // 去掉下划线
      hover:no-underline              // 悬浮时不出现下划线
      hover:scale-105                 // 鼠标悬停时稍微放大
      hover:shadow-lg                 // 悬停时阴影变大
      active:scale-100                // 按下时恢复原大小
      transition duration-150 ease-in-out  // 动画过渡效果
    "
  >
    {/* 显示图标 */}
    {icon}
    {/* 显示按钮文字 */}
    <span className="text-white no-underline">
      {children}
    </span>
  </a>
);

// 把这个按钮组件导出，供其他地方使用
export { Button };