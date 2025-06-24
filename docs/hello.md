---
sidebar_label: 'Hi!'
sidebar_position: 4
---



# Hello

This is my **first Docusaurus document**!

*this is a test document*

**2025/06/23**

<div class="text-blue-500 p-4">Tailwind 测试文字</div>

<div className="text-blue-500 p-4">Tailwind 测试文字</div>

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);
export const Button = ({ icon, href, children }) => (  <a    href={href}    target="_blank"    rel="noopener noreferrer"    style={{      display: 'inline-flex',      alignItems: 'center',      gap: '0.5rem',      padding: '0.5rem 1.5rem',      borderRadius: '6px',      backgroundColor: '#F6D2F4',      color: 'white',      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',      fontWeight: 'bold',      textDecoration: 'none',      cursor: 'pointer',      transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',      marginBottom: '1rem',   }}    onMouseEnter={(e) => {      e.currentTarget.style.transform = 'scale(1.05)';      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';    }}    onMouseLeave={(e) => {      e.currentTarget.style.transform = 'scale(1)';      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';    }}  >    {icon}    <span style={{ color: 'white', textDecoration: 'none' }}>{children}</span>  </a> );



> <Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.
>
> I can write **Markdown** alongside my _JSX_!

<Button icon="📘" href="https://example.com">去学习</Button> <Button icon="📘" href="https://example.com">去学习</Button>

上面 MDX 示例说明了：

- **要在 MDX 中定义 React 组件，必须使用 `export` 导出**。
- 可以在 Markdown 中混合使用 JSX 和普通文本。
- **MDX 中的 HTML 实际上是 JSX**，写内联样式时要使用对象语法（如 `style={{color: 'red'}}`），而不是字符串（如 `style="color: red"`）。
- 最终，React 组件和 Markdown 内容会被正确渲染成网页内容。

✅ 简单说：**MDX = Markdown + React 组件，写法要符合 JSX 规范。**
