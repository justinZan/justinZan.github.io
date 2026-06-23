# Vue Router 与 Pinia

## Vue Router 常见面试点有哪些？

常见问题包括：

- `history` 模式和 `hash` 模式的区别
- 路由懒加载如何写
- 导航守卫执行顺序
- 动态路由和权限路由如何实现
- 路由参数 `params` 和 `query` 的区别

路由懒加载示例：

```ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  }
]
```

权限路由通常会结合登录态、用户角色、后端菜单和 `router.addRoute` 实现。

## 导航守卫一般用来做什么？

导航守卫常见用途：

- 登录鉴权
- 权限校验
- 页面离开确认
- 动态设置页面标题
- 埋点统计
- 加载用户信息或权限菜单

全局前置守卫示例：

```ts
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLogin()) {
    return '/login'
  }
})
```

面试时要说明：守卫里不要做过重的业务逻辑，否则会拖慢页面跳转。

## 动态权限路由怎么做？

常见流程：

1. 登录后拿到 token。
2. 请求用户信息和权限菜单。
3. 根据权限生成路由表。
4. 使用 `router.addRoute` 动态注册。
5. 刷新页面时重新恢复权限路由。

需要注意：

- 动态路由要避免重复添加。
- 404 路由通常放在动态路由添加之后。
- 菜单权限和按钮权限可以分层处理。
- 前端权限只负责体验，真正的数据安全必须靠后端校验。

## hash 模式和 history 模式有什么区别？

`hash` 模式 URL 中带 `#`，刷新页面时不会向服务器请求真实路径。

```text
https://example.com/#/about
```

`history` 模式 URL 更干净，但刷新页面时服务器需要把所有前端路由都回退到 `index.html`。

```text
https://example.com/about
```

如果服务器没有配置回退，`history` 模式刷新深层页面可能会出现 404。

## params 和 query 有什么区别？

`params` 通常和动态路由路径绑定：

```ts
router.push({
  name: 'user',
  params: {
    id: '1'
  }
})
```

`query` 是 URL 查询参数：

```ts
router.push({
  path: '/search',
  query: {
    keyword: 'vue'
  }
})
```

常见区别：

- `params` 更适合资源 ID。
- `query` 更适合筛选条件、搜索关键词、分页参数。
- 刷新页面后，`query` 通常更容易保留和分享。

## Pinia 和 Vuex 有什么区别？

Pinia 是 Vue 官方推荐的新状态管理方案。相比 Vuex，它更轻量，写法更接近 Composition API，对 TypeScript 更友好。

```ts
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isLogin = computed(() => Boolean(token.value))

  function setToken(value: string) {
    token.value = value
  }

  return {
    token,
    isLogin,
    setToken
  }
})
```

Pinia 没有 Vuex 中强制的 mutation 概念，直接通过 action 或 store 实例修改状态即可。

## Option Store 和 Setup Store 怎么选？

Option Store 类似 Options API：

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

Setup Store 类似 Composition API：

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return {
    count,
    double,
    increment
  }
})
```

如果团队更熟悉 Options API，可以用 Option Store；如果项目大量使用 Composition API，Setup Store 会更自然。

## storeToRefs 有什么作用？

直接解构 Pinia store 可能丢失响应式。

```ts
const userStore = useUserStore()
const { userInfo } = userStore
```

推荐使用 `storeToRefs` 解构状态和 getter：

```ts
const userStore = useUserStore()
const { userInfo, isLogin } = storeToRefs(userStore)
const { logout } = userStore
```

注意：action 是方法，不需要放进 `storeToRefs`。

## 什么状态应该放到 Pinia？

适合放到 Pinia 的状态：

- 登录用户信息
- token
- 权限菜单
- 跨页面共享的筛选条件
- 多组件共享的业务状态

不建议所有状态都放到 Pinia。只在当前组件内部使用的临时状态，放在组件内部会更清晰。

## Pinia 数据持久化怎么做？

常见方式：

- 手动监听 store 变化并写入 `localStorage`
- 使用 Pinia 持久化插件
- 登录态只保存 token，用户信息进入页面后重新请求

```ts
watch(
  () => userStore.token,
  (token) => {
    localStorage.setItem('token', token)
  }
)
```

需要注意：不要把敏感信息完整存到本地，尤其是权限细节、用户隐私或后端可变状态。
