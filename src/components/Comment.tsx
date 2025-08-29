// site/src/components/Comment/Comment.tsx
import React, { useEffect, useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function Comment(): JSX.Element {
  return (
    <div style={{ marginTop: '2rem' }}>
      <BrowserOnly fallback={<div style={{ minHeight: '200px' }}>加载评论中...</div>}>
        {() => {
          // 所有 require 语句必须放在函数最开始
          const { useThemeConfig } = require('@docusaurus/theme-common')
          const { useLocation } = require('@docusaurus/router')
          const Giscus = require('@giscus/react').default
          
          // 始终调用 hooks
          const themeConfig = useThemeConfig()
          const location = useLocation()

          // 处理路径，移除语言前缀以确保多语言环境下使用相同term
          const path = location.pathname.replace(/^\/|\/$/g, '');
          console.log('=== Path Processing Debug ===');
          console.log('Original cleaned path:', path);

          // 直接移除已知的语言前缀
          let normalizedPath = path;
          const knownLanguages = ['zh-Hans', 'en', 'zh']; // 根据你的配置添加更多语言
          
          for (const lang of knownLanguages) {
            if (path.startsWith(lang + '/')) {
              normalizedPath = path.substring(lang.length + 1);
              console.log(`Removed language prefix '${lang}'. New path:`, normalizedPath);
              break;
            }
          }
          
          // 如果上面的方法没匹配到，使用通用方法
          if (normalizedPath === path) {
            const pathSegments = path.split('/');
            if (pathSegments.length > 1) {
              const firstSegment = pathSegments[0];
              const languageCodePattern = /^[a-z]{2}(?:-[A-Za-z]+)?$/;
              if (languageCodePattern.test(firstSegment)) {
                normalizedPath = pathSegments.slice(1).join('/');
                console.log('Removed language prefix (generic method). New path:', normalizedPath);
              }
            }
          }

          console.log('Final normalized path:', normalizedPath);
          console.log('=== End Path Processing Debug ===');

          // 修改页面类型检查，适配多语言路径格式
          // 检查是否为博客文章页面：blog/文章标题 (处理多语言路径)
          const isBlogPostPage = normalizedPath.startsWith('blog/') && 
                                normalizedPath.split('/').length === 2 && 
                                !normalizedPath.endsWith('/'); // 确保不是分类页面
          
          // 检查是否为文档页面（支持多语言路径）
          const isDocPage = normalizedPath.startsWith('docs/');
          
          // 调试信息，可以帮助你确认路径匹配
          console.log('Current path:', location.pathname);
          console.log('Normalized path:', normalizedPath);
          console.log('Is blog post page:', isBlogPostPage);
          console.log('Is doc page:', isDocPage);
          
          // 如果不是博客文章页面或文档页面，不显示评论
          if (!isBlogPostPage && !isDocPage) {
            console.log('Not a blog post or doc page, hiding comments');
            return <div></div>; // 返回空内容，不显示评论
          }

          const giscus: any = { ...themeConfig.giscus }

          if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
            return (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'red' }}>
                评论系统配置缺失
              </div>
            )
          }

          const subPath = normalizedPath || "index";
          giscus.term = subPath;
          
          // 确保强制使用统一的语言设置，实现评论共享
          giscus.lang = 'zh-CN'; // 使用中文作为统一界面语言

          // 调试信息
          console.log('Final term:', subPath);
          console.log('Giscus config:', {
            repo: giscus.repo,
            repoId: giscus.repoId,
            category: giscus.category,
            categoryId: giscus.categoryId,
            term: giscus.term,
            lang: giscus.lang
          });
          console.log('=== End Giscus Debug Info ===');

          // 主题监听组件
          const GiscusWithThemeListener = () => {
            const [theme, setTheme] = useState('light');

            useEffect(() => {
              const updateTheme = () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                setTheme(currentTheme === 'dark' ? 'transparent_dark' : 'light');
              };

              // 初始化
              updateTheme();

              // 监听主题变化
              const observer = new MutationObserver(() => {
                updateTheme();
              });

              observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
              });

              return () => observer.disconnect();
            }, []);

            return <Giscus {...giscus} theme={theme} />;
          };

          return <GiscusWithThemeListener />;
        }}
      </BrowserOnly>
    </div>
  )
}