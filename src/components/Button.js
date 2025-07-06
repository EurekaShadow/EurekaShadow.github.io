/**

 * 自定义通用按钮组件
 * 支持图标、跳转链接、颜色、文字颜色、尺寸等自定义
   */
   export const Button = ({ 
     icon, 
     href, 
     children, 
     color = '#F2BBE0',    // 默认粉色背景
     textColor = 'white',   // 默认白色文字
     size = 'medium'       // 尺寸支持 small / medium / large
   }) => {

  /* 定义不同尺寸的 padding 值 */
  const sizes = {
    small: '0.3rem 1rem',
    medium: '0.5rem 1.5rem',
    large: '0.7rem 2rem'
  };

  /* 基础样式对象 */
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: sizes[size],
    borderRadius: '20px',
    backgroundColor: color,
    color: textColor,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    marginBottom: '1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  /* 悬停样式 */
  const hoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  };

  /* 离开时恢复原状 */
  const leaveStyle = {
    transform: 'scale(1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  return (
    /* 返回一个带图标的可点击按钮 */
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, leaveStyle)}
    >
      {icon}
      <span style={{ color: textColor, textDecoration: 'none' }}>{children}</span>
    </a>
  );
};