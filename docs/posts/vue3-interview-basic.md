# Vue3 基础与 Vue2 区别

## Vue2 和 Vue3 有哪些主要区别？

常见回答方向：

- Vue3 使用 Proxy 重写响应式系统，解决 Vue2 中对象新增属性、数组索引修改等场景的限制。
- Vue3 引入 Composition API，更适合抽离和复用复杂业务逻辑。
- Vue3 支持 Fragment、Teleport、Suspense 等新能力。
- Vue3 对 TypeScript 支持更好，源码也使用 TypeScript 重写。
- Vue3 编译器和运行时做了更多性能优化，例如静态提升、Patch Flag、事件缓存等。

面试时可以补一句：Vue3 不是简单替代 Vue2，而是围绕大型应用的逻辑组织、类型能力和性能做了一轮升级。

## Vue3 为什么使用 Proxy？

Vue2 使用 `Object.defineProperty` 做数据劫持，主要限制是只能劫持已经存在的属性，对新增属性、删除属性、数组索引修改等场景不够自然。

Vue3 使用 `Proxy` 代理整个对象，可以拦截更多操作：

- 属性读取
- 属性设置
- 属性删除
- `in` 操作
- `Object.keys`
- 数组和集合类型操作

这让响应式系统更完整，也减少了 Vue2 中一些需要特殊 API 处理的场景。

## Vue3 的优势主要体现在哪里？

可以从三个层面回答：

- 开发体验：Composition API、`<script setup>`、更好的 TypeScript 支持。
- 框架能力：Teleport、Suspense、Fragment、多个根节点。
- 性能：响应式系统、编译优化、Tree-shaking 支持更好。

如果结合项目经验，可以说：复杂页面里用组合式函数拆分业务逻辑，比把所有代码堆在 Options API 中更容易维护。

## `<script setup>` 有什么特点？

`<script setup>` 是 Composition API 的编译时语法糖，代码更简洁。

特点包括：

- 顶层变量可以直接在模板中使用。
- `defineProps`、`defineEmits` 是编译器宏，不需要导入。
- 更适合 TypeScript 类型推导。
- 默认逻辑更靠近普通函数写法。

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <h1>{{ props.title }}</h1>
</template>
```

