---
sidebar_label: '测试页1'
sidebar_position: 1.1
description: 这是我的测试页1！
---
import { Highlight, Keyword, Light, B1, B2, B3, BH3, B3W, MyColor} from '@site/src/components/ForMDX';

### testpage1

#### 这是我的测试页面1

Let's see  [testpage2](./testpage2.md).

如果在同一目录下，如现在` testpage1`和`testpage2`同属于目录`myfile`目录下，此时如果想要在`testpage1`中跳转到`testpage2`,只需要`[testpage2](./testpage2.md)`,结果：[testpage2](./testpage2.md)，点击此便可跳转到`testpage2`；

如果不在同一目录下，如`testpage1`在`myfile`目录下，而`回想空间`在`/docs/reflection-space`，就不能使用上述方法，而应该`[回想空间](/docs/reflection-space)`,结果：[回想空间](/docs/reflection-space)


![](./img/docusaurus.png "this is a dinosaur")

![](.\img\Eureka.png "This is Sherry")



```c
int main(){
    Timer_Init();
    OLED_Init();
    while(1){
        Task();
    }
}
```

:::tip[My Tip]

绿色小贴士，用于推荐用法、技巧等场景

:::

:::danger[Take care]

红色危险，用于指示高风险操作、错误操作等场景

:::

:::info[My Info]

蓝色信息提示，用于补充说明、背景知识等场景

:::

:::note[My note]

浅灰备注，需要特别注意的内容

:::

:::warning[My warning]

黄色，指示可能有风险的操作

:::

`<p>`会让一段话成为独立段落，起换行作用

✅ 详细解释 `<div>` 是什么？

`<div>` 是 HTML 中的块级元素（block-level element） 它本身没有语义含义
（不像 `<section>`, `<article>` 那样有明确意义）

常用于：

* 包裹一组内容
* 作为布局容器使用 
* 给这一组内容统一加样式或结构控制


    <div>
      <Highlight>这是一个高亮段落</Highlight>
      <Highlight bgColor={MyColor.Blue} fontColor={MyColor.black}>这是一个高亮段落</Highlight> 
      <p>这是一个<Keyword>关键词</Keyword>哈哈哈哈</p>哈哈哈哈
    
	  # <B1>一级标题</B1>
      ## <B2>二级标题</B2>
      ### <B3>无序三级标题</B3>
      ### <BH3>1.</BH3>有序三级标题
      ### <B3W>绿色字体三级标题</B3W>
    </div>





