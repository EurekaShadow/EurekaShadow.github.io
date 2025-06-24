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
  url: 'https://EurekaShadow.github.io/',
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
                label: 'Hi',
                to: '/docs/hello',
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
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
