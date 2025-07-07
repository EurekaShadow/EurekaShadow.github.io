import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Styles from '@site/src/css/MyCss.module.css';

import Lazyimg from 'react-lazyimg-component';// 懒加载插件

import BrowserOnly from '@docusaurus/BrowserOnly';


export const MyColor = 
{
  docusaurusGreen:'#25c2a0',
  facebookBlue:'#1877F2',
  yellow:'#ffff50',
  green:'#6abe30',
  red:'#f03c46',
  white:'white',
  black:'black',
  qing:'#f0f5fa',
  Purple: '#5c62d5',
  Pink: '#F2BBE0',
  Blue: '#87CEFA'
}


/*********************************************************************************
 * 改自 docusaurus 文档 MDX 和 React 一节中的高亮代码
 * 功能：为文字加上背景色，并设置字体颜色  
 ********************************************************************************/
export function Highlight({children, bgColor = MyColor.yellow, fontColor = MyColor.black}) {
  return (
    <span
      style={{
        backgroundColor: bgColor,
        borderRadius: '4px',
        color: fontColor,
        padding: '0.2rem',
        display: 'inline-block', // 确保 margin 生效
      }}>
      {children}
    </span>
  )
}
/* end */


export function Keyword({children}) {
  return (
    <span className={Styles.InlineHighlight}
      style={{
        padding: '0.2rem',        // 内部留白（已有）
        margin: '0.4rem 0.4rem',       // 左右各 0.4rem 空隙，上下为 0
      }}>
      {children}
    </span>
  )
}
/* end */

/*************************************************************************************
 * 功能：为一级标题添加装饰性样式（如下方渐变横线）
 * 说明：
 *   - 使用 <span> 包裹标题内容，并添加 className={Styles.B1}
 *   - 实际装饰效果由 CSS 控制（如渐变线条 + hover 拉伸动画）
 *   - 命名从 H1 改为 B1 是为了避免与 HTML 标签冲突
 *************************************************************************************/
export function B1({children}) {
  return (
    <span className={Styles.B1}>
      {children}
    </span>
  )
}
/*************************************************************************************
 * 功能：为二级标题添加装饰性样式（如下方渐变横线）
 * 说明：
 *   - 使用 <span> 包裹标题内容，并添加 className={Styles.B2}
 *   - 实际装饰效果由 CSS 控制（如渐变线条 + hover 拉伸动画）
 *   - 命名从 H2 改为 B2 是为了避免与 HTML 标签冲突
 *************************************************************************************/
export function B2({children}) {
  return (
    <span className={Styles.B2}>
      {children}
    </span>
  )
}

/* export function B2({children}) {
  return (
    <span
      style={{
        backgroundColor: MyColor.docusaurusGreen,
        borderRadius: '4px',
        color: MyColor.white,
        padding: '0.2rem',
      }}>
      {children}
    </span>
  )
} */
/* end */

/*************************************************************************************
* 功能：三级标题样式
* B3：为无数字的设置，左边加一小块背景色
* BH3：为有数字的设置，为文字加背景色
* B3W：设置文字颜色为 docusaurusGreen
* 其他：H3 是标签的关键字，所以改成了 B3
*************************************************************************************/
export function B3({children}) {
  return (
    <span className={Styles.B3}>{children}</span>
  );
}

export function BH3({children}) {
  return (
    <span 
      className={Styles.BH3}
      style={{        
        padding: '0.2rem',
        marginRight: '0.5rem', // 添加右边距
      }}>
      {children}
    </span>
  )
}

export function B3W({children}) {
  return (
    <span
      style={{
        borderRadius: '4px',
        color: MyColor.docusaurusGreen,
        padding: '0.2rem',
      }}>
      {children}
    </span>
  )
}
/* end */





const Card = ({ children }) => (
  <div className={Styles.Card}>{children}</div>
);

// 如果未来需要扩展再启用
// const CardContent = ({ children }) => <div>{children}</div>;

export { Card };