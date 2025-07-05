// src/components/CardImg.js

// 引入 React 基础库
import React from 'react';

// 引入 react-photo-view 的组件和样式
// PhotoProvider：提供图片查看器的全局配置
// PhotoView：包裹图片，实现点击放大、滚轮缩放等交互功能
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css'; // 引入默认样式

// 引入 react-lazyimg-component，用于图片懒加载（延迟加载）
import Lazyimg from 'react-lazyimg-component';

// 定义并导出默认组件 CardImg
// 接收三个 props：
// - src: 图片地址
// - alt: 图片描述文字（alt 属性）
// - isCenter: 是否居中显示，默认为 false
export default function CardImg({ src, alt, isCenter = false }) {
  return (
    // 外层 div：用于整体布局控制
    // 设置文本居中 + 上下外边距 20px
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      
      {/* 
        PhotoProvider 是 react-photo-view 的顶层组件，用于配置全局行为
        maskOpacity：遮罩透明度（0.6 表示半透明）
        speed：动画持续时间（单位毫秒），这里用函数返回固定值 500ms
      */}
      <PhotoProvider maskOpacity={0.6} speed={() => 500}>
        
        {/* 
          PhotoView 包裹图片，使其可交互
          点击后进入放大模式，支持手势/滚轮缩放
        */}
        <PhotoView src={src} alt={alt}>
          
          {/* 
            判断是否需要居中显示图片
            如果 isCenter 为 true，则使用 <center> 标签包裹图片
            否则直接插入图片
          */}
          {isCenter ? (
            // 居中显示图片
            <center>
              {/* 
                Lazyimg 是 react-lazyimg-component 提供的懒加载图片组件
                src：图片地址
                alt：替代文本
                style：自定义样式
              */}
              <Lazyimg
                src={src}
                alt={alt}
                style={{
                  width: '100%',                      // 宽度适应容器
                  maxWidth: '700px',                 // 最大宽度限制为 600px
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
                maxWidth: '650px',
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
  );
}