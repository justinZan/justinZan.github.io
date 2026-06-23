# Vue 学习笔记

这篇文章用于记录 Vue 学习过程中的关键知识点。

## 组件通信

常见方式：

- `props`
- `emit`
- `provide / inject`
- `Pinia`

## 状态管理

局部状态优先放在组件内部，全局状态再放入 Pinia。

## 工程建议

- 页面组件放在 `views`
- 通用组件放在 `components`
- 接口请求放在 `services`
- 类型声明放在 `types`

