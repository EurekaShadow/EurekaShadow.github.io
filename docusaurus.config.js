// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '我的网站',
  tagline: '这是我的个人网站',
  favicon: 'img/Eureka.ico',

  future: {
    v4: true,
  },
        //https://eurekashadow.github.io/
		//https://www.eurekashadow.xin/
  url: 'https://www.eurekashadow.xin/',//网站最终部署的域名
  baseUrl: '/',

  organizationName: 'EurekaShadow',
  projectName: 'EurekaShadow.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 简化 plugins 部分
  plugins: [
    // 只保留必要的插件，删除 webpack 优化插件
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/EurekaShadow/EurekaShadow.github.io/tree/master',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/EurekaShadow/EurekaShadow.github.io/tree/master',
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
	  //添加Algolia搜索
	  algolia: {
		// Application ID
		appId: 'AFEW9ZLEC6',
		//  Search-Only API Key
		apiKey: '2732fa24db8a85aaa29ee5c2e96be219',
		//git-pages-index是 gitpages 的 Algolia 搜索 Index
		//test-site是 Vercel 的 Algolia 搜索 Index
		//切换网站部署的话，还要改docsearch.json文件的前三行
		indexName: 'test-site',
		searchPagePath: 'search',
		contextualSearch: true
      },
	  //添加giscus评论
      giscus: {
        repo: 'eurekashadow/eurekashadow.github.io',
        repoId: 'R_kgDOO5sA8w',
        category: 'General',
        categoryId: 'DIC_kwDOO5sA884CuZHY',
		inputPosition: 'top',
        lang: 'zh-CN',
      },
      
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
                to: '/docs/mydoc/testpage0',
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
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },        
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
    
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      magicComments: [
        {
          className: 'code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' }
        },
        {
          className: 'code-block-add-line',
          line: 'highlight-add-line',
          block: { start: 'highlight-add-start', end: 'highlight-add-end' }
        },
        {
          className: 'code-block-update-line',
          line: 'highlight-update-line',
          block: { start: 'highlight-update-start', end: 'highlight-update-end' }
        },
        {
          className: 'code-block-error-line',
          line: 'highlight-error-line',
          block: { start: 'highlight-error-start', end: 'highlight-error-end' }
        },
      ],
      additionalLanguages: [
        'java',
        'c',
      ],
    },
  }),
};

export default config;