import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate id="homepage.feature.about.title" description="首页功能区域 - 关于我的博客标题">📖 关于我的博客</Translate>,
    Svg: require('@site/static/img/Sherry1.svg').default,
    description: (
      <Translate id="homepage.feature.about.description" description="首页功能区域 - 关于我的博客描述">
        欢迎来到我的博客！这里是我在技术学习过程中点滴积累的记录与思考。
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.share.title" description="首页功能区域 - 分享与总结标题">🔧 分享与总结</Translate>,
    Svg: require('@site/static/img/Sherry2.svg').default,
    description: (
      <Translate id="homepage.feature.share.description" description="首页功能区域 - 分享与总结描述">
        在这里，我会整理学习过程中的思考与经验，记录遇到的问题与解决思路，希望能为他人或未来的自己提供一份清晰的技术沉淀。
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.growth.title" description="首页功能区域 - 记录成长之路标题">🌱 记录成长之路</Translate>,
    Svg: require('@site/static/img/Sherry3.svg').default,
    description: (
      <Translate id="homepage.feature.growth.description" description="首页功能区域 - 记录成长之路描述">
        不出意外，这里将成为我技术成长的见证。从零开始，不断探索，每一步进步都会被记录下来，作为总结与前行的参考。
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