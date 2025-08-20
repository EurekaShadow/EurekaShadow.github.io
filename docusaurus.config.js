// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '我的网站',
  tagline: '这是我的个人网站',
  favicon: 'img/Eureka.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.eurekashadow.xin/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'EurekaShadow', // Usually your GitHub org/user name.
  projectName: 'EurekaShadow.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash :false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/EurekaShadow/EurekaShadow.github.io/tree/master',
          showLastUpdateTime: true,
		  showLastUpdateAuthor: true // 不显示作者
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/EurekaShadow/EurekaShadow.github.io/tree/master',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          showLastUpdateTime: true
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
		// 添加 giscus 评论功能
		giscus: {
        repo: 'eurekashadow/eurekashadow.github.io',
        repoId: 'R_kgDOO5sA8w',
        category: 'General',
        categoryId: 'DIC_kwDOO5sA884CuZHY',
      },
		
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '我的网站',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Eureka.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'DocumentSidebar',
            position: 'left',
            label: '记录',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/EurekaShadow/EurekaShadow.github.io/tree/master',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '记录',
            items: [
              {
                label: '模板',
                to: '/docs/category/模板',
              },
            ],
          },
          {
            title: '社交媒体',
            items: [
              {
                label: 'Bilibili',
                href: 'https://space.bilibili.com/283665748',
              },
              {
                label: 'Github',
                href: 'https://github.com/EurekaShadow',
              },
//              {
//                label: 'X',
//                href: 'https://x.com/docusaurus',
//              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'My first page',
                href: '/my-first-markdown-page',
              },
              {
                label: 'ChangeLog',
                href: '/change-log-page',
              },			  
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
	  
		prism: {
		  // 代码高亮主题 - 浅色主题使用 GitHub 风格
		  theme: prismThemes.github,
		  // 代码高亮主题 - 深色主题使用 Dracula 风格
		  darkTheme: prismThemes.dracula,
		  
		  // 自定义代码高亮标记配置
		  magicComments: [
			// 高亮标记 - 用于突出显示重要代码行
			{
			  className: 'code-block-highlighted-line',  // CSS 类名
			  line: 'highlight-next-line',               // 行内标记
			  block: { start: 'highlight-start', end: 'highlight-end' }  // 块标记
			},
			// 新增代码标记 - 用于标识新增的代码行
			{
			  className: 'code-block-add-line',
			  line: 'highlight-add-line',
			  block: { start: 'highlight-add-start', end: 'highlight-add-end' }
			},
			// 更新代码标记 - 用于标识修改的代码行
			{
			  className: 'code-block-update-line',
			  line: 'highlight-update-line',
			  block: { start: 'highlight-update-start', end: 'highlight-update-end' }
			},
			// 错误代码标记 - 用于标识有问题的代码行
			{
			  className: 'code-block-error-line',
			  line: 'highlight-error-line',
			  block: { start: 'highlight-error-start', end: 'highlight-error-end' }
			},
		  ],
		  
		  // 额外支持的语言（超出默认支持的语言列表）
		  // 默认支持的语言列表参考：https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
		  // Prism.js 完整支持语言列表：https://prismjs.com/#supported-languages
		  additionalLanguages: [
			'java',   // Java 编程语言
			'c',
		  ],
		},
    }),
};

export default config;
