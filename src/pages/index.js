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
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title">我的网站</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.tagline">这是我的个人网站</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/reflection-space">
            <Translate id="homepage.hero.button" description="首页按钮文本">
              回想空间 🌸
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