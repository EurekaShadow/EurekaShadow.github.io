import React from 'react';
import styles from './styles.module.css';

/**
 * 速记章节标题装饰组件 - 纯视觉装饰，不支持导航功能
 * 
 * 特性：
 * - 纯装饰性组件，不生成锚点 ID
 * - 样式与 QuickNoteCard 卡片风格统一
 * - 支持多种变体（default/warning/error/tip）
 * - 支持深色模式
 * 
 * 重要说明：
 * - ⚠️ 本组件不会出现在右侧目录（TOC）中
 * - ✅ 推荐用法：配合 Markdown 语法使用，如 `## <NoteSectionTitle>内容</NoteSectionTitle>`
 * - 📝 如需 TOC 导航，请使用标准 Markdown 标题 + B2/B3 装饰组件
 * 
 * @param {Object} props
 * @param {string} props.children - 标题文字内容
 * @param {'default' | 'warning' | 'error' | 'tip'} props.variant - 标题变体（可选，默认 default）
 */
export function NoteSectionTitle({ 
  children, 
  variant = 'default',
  ...props // 接收其他所有 props
}) {
  return (
    <span 
      className={`${styles.noteSectionTitle} ${styles[variant]}`}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * 简化版标题装饰组件 - 默认使用 default 变体
 */
export function NoteTitle({ children }) {
  return (
    <NoteSectionTitle variant="default">
      {children}
    </NoteSectionTitle>
  );
}
