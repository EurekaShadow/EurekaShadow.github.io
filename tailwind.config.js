/** @type {import('tailwindcss').Config} */

module.exports = {
  // 设置 Tailwind 要扫描哪些文件中的类名（如 class="text-red-500"）
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./docusaurus.config.js",
  "./docs/**/*.{md,mdx}",     // 文档目录
  "./blog/**/*.{md,mdx}",     // 博客目录
  "./pages/**/*.{js,jsx,ts,tsx}",
],

  // 定义主题样式（颜色、字体、间距等），extend 表示在默认基础上扩展
  theme: {
    extend: {
      // 可以在这里添加自定义颜色、字体大小等
      colors: {
        primary: '#2D8E0A',
        secondary: '#39B10D',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },

  // 注册 Tailwind 插件（如 forms、typography 等）
  plugins: [
    // require('@tailwindcss/forms'),     // 表单控件样式优化
    // require('@tailwindcss/typography'),// Markdown 排版支持
    // require('@tailwindcss/aspect-ratio'), // 宽高比支持
  ],
}