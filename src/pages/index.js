import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate from '@docusaurus/Translate';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title" description="首页标题" values={{siteTitle: siteConfig.title}}>
            {siteConfig.title}
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle" description="首页副标题" values={{siteTagline: siteConfig.tagline}}>
            {siteConfig.tagline}
          </Translate>
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

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  // 为标题和描述使用字符串格式，而不是 Translate 组件
  const title = `学习轨迹 - ${siteConfig.title}`;
  const description = "这里是我在技术探索和日常学习中的点滴记录，涵盖编程笔记、项目复盘与成长感悟。";
  
  return (
    <Layout
      title={title}
      description={description}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}