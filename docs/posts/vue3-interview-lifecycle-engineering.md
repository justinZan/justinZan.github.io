# 生命周期与工程实践

## Vue3 常见生命周期有哪些？

Composition API 中常见生命周期：

- `onBeforeMount`
- `onMounted`
- `onBeforeUpdate`
- `onUpdated`
- `onBeforeUnmount`
- `onUnmounted`
- `onActivated`
- `onDeactivated`
- `onErrorCaptured`

常见使用场景：

- `onMounted`：请求初始化数据、挂载第三方库、读取 DOM。
- `onUnmounted`：清理定时器、取消事件监听、销毁第三方实例。
- `onActivated` / `onDeactivated`：配合 `keep-alive` 处理缓存页面。

## 父子组件生命周期执行顺序是什么？

首次挂载时，可以这样理解：

1. 父组件 setup
2. 父组件 beforeMount
3. 子组件 setup
4. 子组件 beforeMount
5. 子组件 mounted
6. 父组件 mounted

更新时通常是父组件先进入更新流程，子组件完成更新后，父组件再完成更新。

卸载时父组件先触发卸载前逻辑，然后子组件卸载，最后父组件卸载完成。

面试回答时不用死背每一步，更重要的是说明：父组件 mounted 时，子组件通常已经挂载完成。

## onMounted 和 nextTick 有什么区别？

`onMounted` 表示组件已经挂载到 DOM。它适合做初始化 DOM 操作。

`nextTick` 表示等待本轮响应式更新导致的 DOM 刷新完成。它可以在任意状态变更后使用。

```ts
onMounted(() => {
  inputRef.value?.focus()
})

async function addItem() {
  list.value.push(newItem)
  await nextTick()
  scrollToBottom()
}
```

简单说：`onMounted` 关注组件首次挂载，`nextTick` 关注某次数据变化后的 DOM 更新。

## 组件卸载时需要清理什么？

常见需要清理的资源：

- `setInterval` / `setTimeout`
- `window` 或 `document` 事件监听
- WebSocket
- 第三方图表、地图、编辑器实例
- 手动创建的订阅或观察器

```ts
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(fetchData, 1000)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
```

如果不清理，可能造成内存泄漏、重复请求或组件卸载后仍然修改状态。

## Vue 项目中如何组织目录？

常见目录结构：

```text
src/
  api/
  assets/
  components/
  composables/
  router/
  stores/
  types/
  utils/
  views/
```

组织原则：

- 页面级组件放 `views`
- 通用组件放 `components`
- 复用逻辑放 `composables`
- 接口请求放 `api` 或 `services`
- 状态管理放 `stores`
- 通用类型放 `types`

面试时可以补充：目录不是越细越好，关键是团队约定清晰，模块边界稳定。

## Composable 应该怎么设计？

Composable 通常以 `use` 开头，用来封装可复用的状态逻辑。

```ts
export function useLoading() {
  const loading = ref(false)

  async function withLoading(task: () => Promise<void>) {
    loading.value = true
    try {
      await task()
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    withLoading
  }
}
```

设计建议：

- 输入和输出要明确。
- 不要偷偷依赖太多全局状态。
- 副作用要可清理。
- 返回 `ref` 时方便调用方解构。

## Vue 项目如何做错误处理？

常见层级：

- 接口层统一处理 HTTP 错误。
- 路由层处理鉴权失败和 404。
- 组件层处理局部错误状态。
- 全局层使用 `app.config.errorHandler` 或错误上报 SDK。

接口请求可以统一包装：

```ts
async function request<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (error) {
    reportError(error)
    throw error
  }
}
```

面试时可以强调：错误处理不是只 `try/catch`，还包括用户提示、日志上报和降级展示。

## Vue 项目如何接入 TypeScript？

常见实践：

- `defineProps` 使用泛型声明 props。
- API 返回值定义接口类型。
- Pinia store 明确状态和方法类型。
- 组件事件使用 `defineEmits` 声明参数。
- 避免到处使用 `any`。

```ts
type User = {
  id: number
  name: string
}

const props = defineProps<{
  user: User
}>()
```

TypeScript 的价值不是“写更多类型”，而是在重构、协作和接口变化时更早暴露问题。

## SPA、SSR、SSG 怎么区分？

SPA 是浏览器加载 JS 后再渲染页面，适合后台系统、交互复杂的应用。

SSR 是服务端每次请求生成 HTML，首屏和 SEO 更好，但服务端复杂度更高。

SSG 是构建时生成静态 HTML，适合博客、文档、营销页。

你的这个博客使用 VitePress，本质上就是偏 SSG 的方式：Markdown 在构建时生成静态页面，再部署到 GitHub Pages。

