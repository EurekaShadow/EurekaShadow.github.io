# 💡 嵌入式技术博客

> 📚 基于 Docusaurus 构建的嵌入式开发学习笔记与技术分享平台

![Docusaurus](https://img.shields.io/badge/Docusaurus-3.0+-blue?style=for-the-badge&logo=docusaurus)
![React](https://img.shields.io/badge/React-18+-61dafb?style=for-the-badge&logo=react)
![MDX](https://img.shields.io/badge/MDX-v3-yellow?style=for-the-badge&logo=mdx)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 项目简介

这是一个专注于**嵌入式系统开发**的技术博客网站，使用现代化的静态站点生成器 [Docusaurus](https://docusaurus.io/) 构建。

**主要内容：**

- 🔌 嵌入式开发（STM32、ESP8266 等）
- 📖 技术学习笔记与心得
- 🛠️ 项目开发实战经验
- 🔧 开发工具与环境配置指南

---

## ⚙️ 技术栈

| 技术         | 版本                  | 说明                      |
| ------------ | --------------------- | ------------------------- |
| **框架**     | Docusaurus 3.x        | 现代化的文档/博客构建工具 |
| **前端**     | React 18+             | 用户界面库                |
| **标记语言** | MDX v3                | Markdown + JSX 组件       |
| **样式**     | CSS3 + Infima         | 响应式设计                |
| **搜索**     | Algolia DocSearch     | 全文搜索引擎              |
| **部署**     | Vercel / GitHub Pages | 静态托管服务              |

---

## 🚀 快速开始

### 前置要求

确保已安装以下工具：

- [Node.js](https://nodejs.org/) (v18.0 或更高版本)
- [Yarn](https://yarnpkg.com/) 或 npm

### 1️⃣ 安装依赖

```bash
# 克隆项目到本地
git clone https://github.com/EurekaShadow/EurekaShadow.github.io.git
cd EurekaShadow.github.io

# 安装所有依赖
yarn install
```

### 2️⃣ 本地开发

```bash
# 启动本地开发服务器
yarn start
```

**效果：**

- 🌐 自动在浏览器中打开 `http://localhost:3000`
- ⚡ 热重载：修改内容后实时更新
- 📱 响应式预览：支持移动端调试

### 3️⃣ 构建生产版本

```bash
# 生成静态文件到 build 目录
yarn build

# 本地预览构建结果
yarn serve
```

**输出：**

- 📦 `build/` 目录包含所有静态资源
- 🚀 可部署到任何静态托管服务

---

## 📦 项目结构

```
test-site/
├── blog/                    # 博客文章目录
│   ├── 2025-08-03-Algorithm.mdx
│   └── ...                 # 更多文章
├── docs/                   # 文档目录
│   ├── embedded/          # 嵌入式相关文档
│   ├── mydoc/             # 个人笔记
│   └── myproject/         # 项目文档
├── src/                    # 源代码
│   ├── components/        # React 组件
│   ├── css/              # 自定义样式
│   ├── pages/            # 自定义页面
│   └── theme/            # 主题定制
├── static/                # 静态资源
│   ├── img/              # 图片资源
│   └── audio/            # 音频资源
├── scripts/               # 自动化脚本
├── docusaurus.config.js   # 核心配置文件
├── sidebars.js           # 侧边栏配置
└── package.json          # 项目依赖
```

---

## 🌐 部署指南

### 方式一：Vercel 部署（推荐）⭐

本项目已配置好 Vercel 自动部署：

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动构建和部署

**特点：**

- ✅ 零配置自动部署
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS 证书
- ✅ 免费额度充足

### 方式二：GitHub Pages

```bash
# 设置 GitHub 用户名
export GIT_USER=<Your GitHub username>

# 使用 SSH（可选）
export USE_SSH=true

# 部署到 gh-pages 分支
yarn deploy
```

**访问地址：** `https://<username>.github.io`

### 方式三：手动部署

```bash
# 1. 构建项目
yarn build

# 2. 将 build/ 目录上传到任意 Web 服务器
# 或使用 Netlify、Cloudflare Pages 等托管服务
```

---

## 📝 内容创作指南

### 创建博客文章

在 `blog/` 目录下创建 `.mdx` 文件：

```mdx
---
title: 我的第一篇文章
slug: my-first-post
authors: [你的名字]
tags: [嵌入式，STM32]
date: 2025-01-01
---

这里是文章内容...
```

### 创建技术文档

在 `docs/` 目录下创建文档：

```mdx
---
id: stm32-intro
title: STM32 入门教程
sidebar_label: 入门教程
---

这里是文档内容...
```

### 代码质量工具

项目已集成 ESLint + Prettier：

```bash
# 检查代码质量
yarn lint

# 自动格式化代码
yarn format
```

**编辑建议：** 使用 VS Code 并安装以下扩展：

- ESLint
- Prettier - Code formatter
- MDX

---

## 🔗 相关链接

- 📘 [Docusaurus 官方文档](https://docusaurus.io/)
- ⚛️ [React 中文文档](https://zh-hans.react.dev/)
- 📝 [MDX 文档](https://mdxjs.com/)
- 🎨 [Infima 样式库](https://infima.dev/)

---
