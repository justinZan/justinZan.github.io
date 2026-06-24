# Vue3 高频面试题答案速查

这页只整理 Vue3 相关的高频答案。回答时建议先给结论，再补项目场景。

## Vue2 和 Vue3 有哪些核心区别？

Vue3 使用 Proxy 重写响应式系统，引入 Composition API，对 TypeScript 支持更好，支持 Fragment、Teleport、Suspense，并在编译和运行时做了更多性能优化。

项目化补充：复杂页面里 Composition API 更方便按业务逻辑拆分代码，而不是按 `data`、`methods`、`watch` 分散。

## Composition API 解决了什么问题？

Composition API 主要解决复杂组件中逻辑分散和复用困难的问题。它可以把同一个业务功能相关的状态、计算属性、监听和方法放在一起，也可以抽成组合式函数复用。

项目化补充：比如订单表单里价格计算、库存联动、远程选项加载可以分别抽成 `usePriceRules`、`useStockRules`、`useRemoteOptions`。

## ref 和 reactive 有什么区别？

`ref` 适合基本类型，也可以包装对象，访问时需要 `.value`。`reactive` 适合对象、数组、Map、Set 等引用类型，返回响应式代理对象。

项目化补充：组合式函数返回多个状态时，我更常用 `ref`，因为解构后更容易保持响应式。

## reactive 解构为什么可能丢失响应式？

`reactive` 的响应式依赖建立在代理对象属性访问上。直接解构会拿到普通值，后续不再经过代理，所以可能丢失响应式。

解决方式是使用 `toRef` 或 `toRefs`。

```ts
const state = reactive({ count: 0 })
const { count } = toRefs(state)
```

项目化补充：如果 composable 返回 reactive 对象，调用方直接解构很容易踩坑。

## computed 和 watch 有什么区别？

`computed` 用来根据已有状态派生新值，有缓存；`watch` 用来监听数据变化后执行副作用，比如请求接口、写缓存、操作 DOM。

项目化补充：订单金额、折扣价用 `computed`；搜索关键词变化后请求接口用 `watch`。

## watch 和 watchEffect 有什么区别？

`watch` 需要明确监听源，适合精确控制。`watchEffect` 会自动收集回调中用到的响应式依赖，并且默认立即执行。

项目化补充：业务依赖明确时优先用 `watch`，依赖很多且和副作用强绑定时再考虑 `watchEffect`。

## Vue3 响应式原理是什么？

Vue3 通过 Proxy 代理对象。组件渲染读取响应式数据时触发 `track` 收集依赖，数据变化时触发 `trigger` 通知相关副作用重新执行，最终更新视图。

项目化补充：`nextTick` 等待的是 Vue 批量更新 DOM 完成后的时机。

## nextTick 有什么作用？

Vue 的 DOM 更新是异步批量执行的。修改响应式数据后，如果需要读取最新 DOM，就要等 `nextTick`。

```ts
count.value++
await nextTick()
```

项目化补充：滚动到底部、获取元素尺寸、输入框聚焦、等待列表渲染完成时很常用。

## v-if 和 v-show 怎么选？

`v-if` 是条件渲染，条件不满足时元素不会创建；`v-show` 是 CSS 显示隐藏。切换频率低用 `v-if`，频繁切换用 `v-show`。

项目化补充：权限控制、懒加载重组件适合 `v-if`；tab 内容频繁切换可以考虑 `v-show`。

## v-if 和 v-for 为什么不建议写在同一个元素上？

因为会让模板逻辑混乱，也容易造成优先级和作用域问题。更推荐用 `computed` 先过滤列表，或者把 `v-if` 放到外层容器。

项目化补充：模板负责表达结果，过滤、排序、分组这类逻辑更适合放到计算属性里。

## v-for 为什么要写 key？

key 帮助 Vue 在 diff 时识别节点身份，避免错误复用 DOM 或组件实例。推荐使用稳定唯一 ID，不建议用数组索引，尤其是列表会增删排序时。

项目化补充：表单列表用 index 做 key，删除一项后输入框内容错位，就是典型问题。

## 组件通信有哪些方式？

常见方式包括 `props`、`emit`、`v-model`、`provide/inject`、Pinia、插槽、`defineExpose`。

项目化补充：父子通信用 props/emit，跨层级稳定依赖可用 provide/inject，跨页面共享状态用 Pinia。

## v-model 在组件上如何实现？

Vue3 组件默认通过 `modelValue` 和 `update:modelValue` 实现 `v-model`。父组件传值，子组件通过 emit 通知更新。

项目化补充：表单组件库里常用这个模式，多个字段可以用多个 `v-model:name`、`v-model:age`。

## Pinia 和 Vuex 有什么区别？

Pinia 是 Vue 官方推荐的新状态管理方案，更轻量，对 TypeScript 更友好，没有强制 mutation，写法更贴近 Composition API。

项目化补充：全局用户信息、权限菜单、跨页面筛选条件可以放 Pinia；页面内部临时状态不要都塞进 store。

## Vue 项目首屏慢怎么优化？

先定位瓶颈：资源下载慢、JS 执行慢、接口慢还是渲染慢。常见优化包括路由懒加载、组件懒加载、拆包、压缩资源、图片懒加载、CDN、接口并行、减少首屏不必要依赖。

项目化补充：如果图表、富文本、编辑器不在首屏，就用异步组件或动态 import。

## 大列表卡顿怎么优化？

核心是减少 DOM 数量和渲染成本。可以分页、虚拟列表、懒加载，列表项组件保持轻量，避免在模板中做复杂计算。

项目化补充：几千条数据一次性渲染时，虚拟列表通常比单纯优化 computed 更有效。

## Vue 项目如何做权限控制？

前端根据用户权限控制菜单、路由和按钮展示，但这只负责用户体验。真正的接口权限和数据权限必须由后端校验。

项目化补充：刷新页面后要重新拉取用户信息和权限，恢复动态路由和按钮权限。

