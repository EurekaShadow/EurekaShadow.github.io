import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading'; // 使用 @theme/Heading（推荐）
import Translate from '@docusaurus/Translate';

// 本地组件和样式
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// 单独提取 Header 组件（可选，保持结构清晰）
function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* 添加动态背景元素 */}
        <div className={styles.animatedBackground}>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
        </div>
        
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title">航行日志 · 技术星图</Translate>
        </Heading>
        
        {/* 副标题增加打字机效果 */}
        <p className={clsx("hero__subtitle", styles.typewriter)}>
          <Translate id="homepage.hero.tagline">
            记录我在数字宇宙中的探索轨迹
          </Translate>
        </p>
        
        {/* 多个 CTA 按钮 */}
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/reflection-space">
            <Translate id="homepage.hero.button.reflection" description="首页按钮 - 回想空间">
              🌸 回想空间
            </Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            <Translate id="homepage.hero.button.blog" description="首页按钮 - 最新博客">
              📝 最新博客
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

// 主页面组件
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // 页面 meta 信息（用于 <title> 和 <meta name="description">）
  const title = `学习轨迹 - ${siteConfig.title}`;
  const description =
    '这里是我在技术探索和日常学习中的点滴记录，涵盖编程笔记、项目复盘与成长感悟。';

  return (
    <Layout title={title} description={description}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}