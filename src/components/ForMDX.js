import React, { useMemo } from 'react';
import Styles from '@site/src/css/MyCss.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { QuickNoteCard, QuickNoteCardSimple } from '@site/src/components/QuickNoteCard';
import { NoteSectionTitle, NoteTitle } from '@site/src/components/NoteSectionTitle';


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
* 功能：三级标题样式（支持右侧目录导航）
* B3：为无数字的设置，左边加一小块背景色
* BH3：为有数字的设置，为文字加背景色
* B3W：设置文字颜色为 docusaurusGreen
* 其他：H3 是标签的关键字，所以改成了 B3
* 
* 重要说明：
* - 这些组件是纯装饰性的 <span>，必须配合 Markdown 标题语法使用
* - 正确用法：### <B3>标题文字</B3>
* - Docusaurus TOC 只识别 Markdown 的 ### 语法，不识别 React 组件
*************************************************************************************/

/**
 * B3 组件 - 带左侧装饰块的三级标题（纯装饰性 span）
 * @param {string} children - 标题文字
 */
export function B3({ children, ...props }) {
  return (
    <span className={Styles.B3} {...props}>
      {children}
    </span>
  );
}

/**
 * BH3 组件 - 带背景高亮的三级标题（纯装饰性 span）
 * @param {string} children - 标题文字
 */
export function BH3({ children, ...props }) {
  return (
    <span 
      className={Styles.BH3}
      style={{        
        padding: '0.2rem',
        marginRight: '0.5rem',
      }}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * B3W 组件 - 绿色文字的三级标题（纯装饰性 span）
 * @param {string} children - 标题文字
 */
export function B3W({ children, ...props }) {
  return (
    <span
      style={{
        borderRadius: '4px',
        color: MyColor.docusaurusGreen,
        padding: '0.2rem',
      }}
      {...props}
    >
      {children}
    </span>
  );
}
/* end */

const Card = ({ children }) => (
  <div className={Styles.Card}>{children}</div>
);

// 如果未来需要扩展再启用
// const CardContent = ({ children }) => <div>{children}</div>;

export { Card };


/**
 * 自定义通用按钮组件
 *
 * 支持图标、外链跳转、颜色定制、文字颜色、尺寸控制、加载状态和禁用状态。
 * 根据是否存在 href 属性，自动判断渲染为 <a> 或 <button>。
 *
 * 🔧 使用示例：
 *
 * // 基础外链按钮
 * <Button icon="📘" href="https://example.com">跳转链接</Button>
 *
 * // 内部点击按钮（不传 href）
 * <Button icon="⚙️" onClick={() => alert('点击了')}>打开设置</Button>
 *
 * // 加载状态按钮
 * <Button loading>加载中...</Button>
 *
 * // 禁用状态按钮
 * <Button disabled>不可点击</Button>
 */

export const Button = ({
  icon,        // 按钮左侧图标（ReactNode），可选
  href,        // 外链地址，有值时渲染为 <a> 标签
  children,    // 按钮显示的文字内容
  color = '#F2BBE0',     // 按钮背景色，默认粉色
  textColor = 'white',   // 文字颜色，默认白色
  size = 'medium',       // 尺寸，支持 small / medium / large
  loading = false,       // 是否显示加载动画
  disabled = false       // 是否禁用按钮
}) => {

  /**
   * 定义不同尺寸对应的 padding 值
   */
  const paddingMap = useMemo(() => ({
    small: '0.3rem 1rem',
    medium: '0.5rem 1.5rem',
    large: '0.7rem 2rem'
  }), []);

  /**
   * 动态计算样式对象
   * 包括背景色、文字颜色、内边距
   */
  const style = useMemo(() => ({
    backgroundColor: color,
    color: textColor,
    padding: paddingMap[size]
  }), [color, textColor, paddingMap, size]);

  /**
   * 根据是否提供 href 判断使用哪种标签
   * - 有 href → <a>
   * - 无 href → <button>
   */
  const Component = href ? 'a' : 'button';

  /**
   * 公共属性对象
   * 如果是外链按钮，则带上 target="_blank" 和 rel="noopener noreferrer"
   */
  const commonProps = {
    ...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})
  };

  return (
    /**
     * 渲染最终按钮组件
     * - className 使用 CSS Module 样式类名
     * - style 应用动态内联样式
     * - commonProps 提供外链相关属性
     * - 只有 button 才应用 disabled 属性
     */
    <Component
      className={Styles.button}
      style={style}
      {...commonProps}
      {...(Component === 'button' ? { disabled: disabled || loading } : {})}
    >
      {/* 图标 */}
      {icon && <span className={Styles.icon}>{icon}</span>}

      {/* 按钮文字内容 */}
      <span>{children}</span>

      {/* 加载状态图标 */}
      {loading && <span className={Styles.spinner}>⏳</span>}
    </Component>
  );
};

// 导出速记卡片组件
export { QuickNoteCard, QuickNoteCardSimple };

// 导出速记章节标题组件
export { NoteSectionTitle, NoteTitle };