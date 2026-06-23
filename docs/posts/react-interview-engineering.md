# 工程实践与进阶能力

## useEffect 中请求接口要注意什么？

常见注意点：

- 依赖数组要正确。
- 组件卸载后避免继续设置 state。
- 处理 loading、error、empty 状态。
- 避免重复请求。
- 对竞态请求做取消或忽略旧结果。

```tsx
useEffect(() => {
  let ignore = false

  async function loadUser() {
    const user = await fetchUser(userId)
    if (!ignore) {
      setUser(user)
    }
  }

  loadUser()

  return () => {
    ignore = true
  }
}, [userId])
```

真实项目中也可以使用 React Query、SWR 等数据请求库管理缓存、重试和并发。

## Error Boundary 是什么？

Error Boundary 用来捕获子组件渲染过程中的错误，并展示降级 UI。

它不能捕获所有错误，例如事件处理函数中的异步错误通常需要自己处理。

常见场景：

- 页面级错误兜底
- 微前端子应用错误隔离
- 复杂组件局部降级

React 传统 Error Boundary 通常使用类组件实现。项目中也可以使用成熟库封装好的错误边界组件。

## Suspense 解决什么问题？

`Suspense` 用来为子树中的异步内容提供统一的加载占位。

最常见用法是配合懒加载组件：

```tsx
<Suspense fallback={<Loading />}>
  <LazyPage />
</Suspense>
```

它能让加载状态靠近 UI 结构，而不是把所有 loading 状态都散落在业务组件里。

## React 项目如何做目录组织？

常见结构：

```text
src/
  api/
  assets/
  components/
  hooks/
  pages/
  router/
  store/
  types/
  utils/
```

组织原则：

- 页面组件放 `pages`
- 通用组件放 `components`
- 复用逻辑放 `hooks`
- 接口请求放 `api`
- 状态管理放 `store`
- 类型声明放 `types`

大型项目也可以按业务模块拆分：

```text
features/
  user/
  order/
  dashboard/
```

## React 中如何接入 TypeScript？

常见实践：

- 给 props 定义类型
- 给接口返回值定义类型
- 给事件处理函数补充事件类型
- 给 ref 指定 DOM 类型
- 避免滥用 `any`

```tsx
type UserCardProps = {
  name: string
  age?: number
}

function UserCard({ name, age }: UserCardProps) {
  return <div>{name} - {age}</div>
}
```

事件类型示例：

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.target.value)
}
```

## React Router 常见面试点有哪些？

常见问题：

- 路由懒加载
- 动态路由参数
- query 参数
- 嵌套路由
- 路由守卫或权限跳转
- 404 页面

权限路由通常会结合登录态、用户角色和后端权限数据。

```tsx
function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!isLogin()) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

面试时可以补充：React Router 本身更偏路由匹配和导航，权限逻辑通常由业务层封装。

## React 项目有哪些常见问题排查思路？

常见排查方向：

- 页面不更新：检查是否直接修改 state。
- 重复请求：检查 `useEffect` 依赖和开发环境 StrictMode。
- 组件频繁渲染：用 React DevTools Profiler 定位。
- 表单输入卡顿：检查父组件状态是否过大、是否触发大范围渲染。
- 列表状态错乱：检查 key 是否稳定。
- useEffect 死循环：检查依赖中是否有每次渲染都新建的对象或函数。

好的面试回答不是只说“用 memo 优化”，而是先定位问题，再选择对应手段。

