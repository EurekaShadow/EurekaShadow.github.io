import React from 'react';
import styles from './styles.module.css';

/**
 * 速记卡片组件 - 用于展示"现象 - 根因 - 解法"结构的技术笔记
 * 
 * @param {Object} props
 * @param {string} props.title - 卡片标题（如 "[MQTT] 解析主题时误判非法字符"）
 *                             如果不提供或为空字符串，则不渲染标题区域（用于标题外置模式）
 * @param {string|React.ReactNode} props.phenomenon - 现象描述（支持 MDX）
 * @param {string|React.ReactNode} props.cause - 根因分析（支持 MDX）
 * @param {string|React.ReactNode} props.solution - 解决方案（支持 MDX）
 * @param {Array<string>} props.tags - 标签列表（可选）
 * @param {'default' | 'warning' | 'error' | 'tip'} props.variant - 卡片变体（可选，默认 default）
 */
export function QuickNoteCard({ 
  title, 
  phenomenon, 
  cause, 
  solution, 
  tags = [],
  variant = 'default'
}) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {/* 标题区域 - 仅当 title 存在且非空时渲染 */}
      {title && title.trim() !== '' && (
        <div className={styles.cardTitle}>
          {title}
        </div>
      )}
      
      {/* 内容区域 */}
      <div className={styles.cardContent}>
        {/* 现象 */}
        {phenomenon && (
          <div className={styles.section}>
            <span className={`${styles.label} ${styles.phenomenonLabel}`}>现象</span>
            <div className={styles.text}>{phenomenon}</div>
          </div>
        )}
        
        {/* 根因 */}
        {cause && (
          <div className={styles.section}>
            <span className={`${styles.label} ${styles.causeLabel}`}>根因</span>
            <div className={styles.text}>{cause}</div>
          </div>
        )}
        
        {/* 解法 */}
        {solution && (
          <div className={styles.section}>
            <span className={`${styles.label} ${styles.solutionLabel}`}>解法</span>
            <div className={styles.text}>{solution}</div>
          </div>
        )}
      </div>
      
      {/* 标签区域 */}
      {tags && tags.length > 0 && (
        <div className={styles.cardTags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 简化版速记卡片 - 适用于简单的速记内容
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 卡片内容（可包含 JSX）
 * @param {string} props.title - 卡片标题
 * @param {'default' | 'warning' | 'error' | 'tip'} props.variant - 卡片变体
 */
export function QuickNoteCardSimple({ children, title, variant = 'default' }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {title && (
        <div className={styles.cardTitle}>{title}</div>
      )}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
