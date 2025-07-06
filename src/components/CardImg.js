// src/components/CardImg.js

// 引入 React 基础库
import React from 'react';

// 引入 react-photo-view 组件和样式，用于实现图片点击放大、滚轮缩放等功能
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// 引入 Lazyimg 实现图片懒加载（延迟加载），提升页面性能
import Lazyimg from 'react-lazyimg-component';

// 引入 Docusaurus 提供的 BrowserOnly 组件，确保某些代码只在浏览器中执行，避免 SSR 报错
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * 卡片式图片组件 CardImg
 * 支持居中显示、统一最大宽度、阴影圆角样式、点击放大查看等功能
 *
 * @param {string} src - 图片地址
 * @param {string} alt - 图片替代文本
 * @param {boolean} isCenter - 是否居中显示，默认为 false
 */
export default function CardImg({ src, alt, isCenter = false }) {
  return (
    // 使用 <BrowserOnly> 包裹依赖浏览器环境的组件
    // 确保该部分代码只在客户端运行，避免服务端渲染时出现 document is not defined 错误
    <BrowserOnly>
      {() => (
        // 外层 div 用于控制整体布局：居中 + 上下外边距
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          
          {/* 
            PhotoProvider 是 react-photo-view 的顶层组件，提供全局配置：
            maskOpacity: 遮罩透明度
            speed: 动画持续时间（单位毫秒）
          */}
          <PhotoProvider maskOpacity={0.6} speed={() => 500}>
            
            {/* 
              PhotoView 包裹图片，使其可交互：
              点击后进入放大模式，支持手势/滚轮缩放
            */}
            <PhotoView src={src} alt={alt}>
              
              {/* 
                判断是否需要居中显示图片：
                如果 isCenter 为 true，则使用 <center> 标签包裹图片
                否则直接插入图片
              */}
              {isCenter ? (
                // 居中显示图片
                <center>
                  {/* 
                    Lazyimg 是 react-lazyimg-component 提供的懒加载图片组件
                    src: 图片地址
                    alt: 替代文本
                    style: 自定义样式
                  */}
                  <Lazyimg
                    src={src}
                    alt={alt}
                    style={{
                      width: '100%',                      // 宽度适应容器
                      maxWidth: '700px',                 // 最大宽度限制为 700px
                      height: 'auto',                    // 高度按比例自动调整
                      cursor: 'zoom-in',                 // 鼠标悬停时显示放大镜效果
                      objectFit: 'cover',                // 图片裁剪适配容器
                      borderRadius: '8px',               // 四角圆角效果
                      boxShadow: '0 0 15px rgba(0,0,0,0.1)', // 添加轻微阴影效果
                    }}
                  />
                </center>
              ) : (
                // 不居中显示图片
                <Lazyimg
                  src={src}
                  alt={alt}
                  style={{
                    width: '100%',
                    maxWidth: '700px',
                    height: 'auto',
                    cursor: 'zoom-in',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                  }}
                />
              )}
            </PhotoView>
          </PhotoProvider>
        </div>
      )}
    </BrowserOnly>
  );
}