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

import { useMemo } from 'react';
import Styles from '@site/src/css/MyCss.module.css';

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