# 性能优化与答题思路

## v-if 和 v-show 有什么区别？

`v-if` 是条件渲染，条件为 false 时组件或元素不会创建。

`v-show` 是 CSS 显示隐藏，本质上切换 `display`。

选择建议：

- 条件很少变化，用 `v-if`
- 频繁切换显示隐藏，用 `v-show`
- 涉及权限、懒加载、昂贵组件初始化，用 `v-if`

## v-for 为什么要写 key？

`key` 用来帮助 Vue 在 diff 阶段识别节点身份。没有稳定 `key` 时，Vue 可能复用错误的 DOM 或组件实例，导致输入框内容错乱、组件状态错位等问题。

推荐使用稳定唯一值：

```vue
<li v-for="item in list" :key="item.id">
  {{ item.name }}
</li>
```

不推荐把数组索引作为 `key`，特别是在列表会新增、删除、排序的场景中。

## Vue3 有哪些性能优化手段？

开发层面的常见回答：

- 路由懒加载和组件懒加载
- 合理使用 `computed`，避免模板中写复杂表达式
- 大列表使用虚拟滚动
- 稳定使用 `key`，避免错误复用
- 用 `v-show` 处理高频显示切换
- 对不会变化的大对象使用 `markRaw` 或 `shallowRef`
- 使用 `defineAsyncComponent` 拆分首屏不需要的组件
- 避免把所有状态都放进全局 store
- 保持传给子组件的 props 稳定
- 使用构建分析工具检查包体积

框架层面的优化：

- 静态节点提升
- Patch Flag
- Block Tree
- 事件处理函数缓存
- 更高效的响应式依赖追踪

## 什么是 props 稳定性？

子组件通常会在接收到的 props 变化时更新。如果父组件每次都传入不稳定的对象、数组或函数，可能导致子组件频繁更新。

不太好的写法：

```vue
<UserCard :config="{ showAvatar: true }" />
```

更好的写法：

```ts
const cardConfig = {
  showAvatar: true
}
```

```vue
<UserCard :config="cardConfig" />
```

在大列表中，props 稳定性会更重要。

## 路由懒加载为什么能优化首屏？

如果所有页面组件都打进首屏包，用户第一次访问时需要下载更多 JS。

路由懒加载会把页面拆成独立 chunk，访问到对应路由时再加载。

```ts
const routes = [
  {
    path: '/settings',
    component: () => import('@/views/Settings.vue')
  }
]
```

后台系统、管理端、功能模块很多的应用，通常都应该使用路由懒加载。

## 大列表渲染如何优化？

常见方案：

- 分页加载
- 虚拟列表
- 懒加载
- 减少每一项中的复杂计算
- 避免列表项组件接收过多不稳定 props

如果数据量很大，不要一次性把所有 DOM 都渲染出来。虚拟列表只渲染可视区域附近的元素，可以明显降低 DOM 数量。

## computed 返回对象时有什么性能注意点？

如果 `computed` 每次都返回一个新对象，即使对象内容没变，引用也变了，可能导致依赖它的逻辑重新执行。

```ts
const userView = computed(() => ({
  name: user.value.name,
  active: user.value.status === 'active'
}))
```

如果这个计算值被大量组件依赖，可以考虑拆成多个简单 computed，或在必要时复用旧对象。

面试时可以说明：性能优化不是死记 API，而是减少无意义的重新计算和重新渲染。

## 面试时如何组织答案？

建议采用这个顺序：

1. 先给结论
2. 再解释原因
3. 说适用场景
4. 最后补一个项目经验

例如回答 `computed` 和 `watch`：

> `computed` 更适合派生状态，有缓存；`watch` 更适合处理副作用，比如请求接口。项目里搜索框联想请求我会用 `watch` 监听关键词，而订单金额、折扣价这种派生值会用 `computed`。
