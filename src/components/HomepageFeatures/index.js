import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate id="homepage.feature.about.title" description="首页功能区域 - 关于我的博客标题">💼 关于我</Translate>,
    Svg: require('@site/static/img/Sherry1.svg').default,
    description: (
      <Translate id="homepage.feature.about.description" description="首页功能区域 - 关于我的博客描述">
        嵌入式软件开发候选人，专注 STM32/C 语言/嵌入式 Linux，50+ 篇技术博客见证成长轨迹。
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.share.title" description="首页功能区域 - 分享与总结标题">🚀 项目实战</Translate>,
    Svg: require('@site/static/img/Sherry2.svg').default,
    description: (
      <Translate id="homepage.feature.share.description" description="首页功能区域 - 分享与总结描述">
        平衡小车闭环控制、ESP8266 IoT 节点、智能家居系统——从问题现象到根因分析的完整复盘。
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.growth.title" description="首页功能区域 - 记录成长之路标题">📚 技术博客</Translate>,
    Svg: require('@site/static/img/Sherry3.svg').default,
    description: (
      <Translate id="homepage.feature.growth.description" description="首页功能区域 - 记录成长之路描述">
        LeetCode 算法训练、嵌入式调试技巧、工程化实践，系统性构建知识体系。
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}