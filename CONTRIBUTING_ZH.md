# 提供帮助

我们欢迎您提供各种帮助。如果方便的话，请您学习并遵守以下标准。


## 结构

- **api** 所有访问我们程序的外部请求
- **assets** 系统的多语言文件夹 
- **components** 应用内常用的组件 
- **connectors** 连接web3钱包的逻辑组件 
- **constants** 常数与设置 
- **design-system** 定义设计标准的文件，例如断点，颜色系统 
- **elements** 通用组件中的零组件 
- **pages** next.js的页面组件 
- **server** 服务器的API逻辑组件
- **types** 程序的types和interfaces 
- **utils** 应用的通用效用函数 
- **Views** 页面的视图构建块 

## 问题报告 

问题意味着有东西未按照期望的运行，这可能是由于这个库里的某些代码造成的。问题报告有助于我们发现并解决他们。

如下是报告问题的方式：

#### 程序中的问题

- **反馈键**: 在表头中，在应用图标的左侧有个按钮（手机上，打开右侧的目录，在最后有“Feedback”键）。填写Google Form来报告问题。

#### 代码库的问题

- **尝试在主干中复制问题**: 有些问题或许在最新的版本中已经被修复。请在报告前先确认问题是否还存在。
- **确认问题是否已经被报告过**: 请确认您想报告的问题是不是已经被他人报告过。请在问题列表中确认是否重复。
- **新建一个git issue**: 请尽可能详细地解释发生了什么以便于我们问题重现

_一个优秀的问题报告应该让他人无需再来要求更多信息_

## 测试

请用如下命令来进行测试

```bash
  yarn test
```

## 提交

您需要如下措施来提交：

  - 确保您的代码对linters有效;
  - 按照[Gitmoji Commitlint](https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/commitlint-config#readme)的提交规则:
  - 使用([Gitmoji](https://gitmoji.dev))中的emoji;

_别忘了用`eslint`和`prettier`设置您的IDE。_
