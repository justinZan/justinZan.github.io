# 组件通信与状态管理

## React 组件通信有哪些方式？

常见方式：

- 父传子：props
- 子传父：回调函数
- 兄弟组件：状态提升到共同父组件
- 跨层级：Context
- 全局状态：Redux、Zustand、Jotai、Recoil 等
- URL 状态：路由参数和 query

面试时不要只列方式，要说明适用场景：局部状态优先放局部，跨组件共享再提升，跨页面或全局业务状态再考虑状态管理库。

## 什么是状态提升？

当多个组件需要共享同一份状态时，可以把状态移动到它们最近的共同父组件，再通过 props 分发。

```tsx
function Parent() {
  const [keyword, setKeyword] = useState('')

  return (
    <>
      <SearchInput value={keyword} onChange={setKeyword} />
      <SearchResult keyword={keyword} />
    </>
  )
}
```

状态提升适合局部共享。不要一遇到共享状态就直接上全局 store。

## Context 解决什么问题？

Context 用来避免多层 props 透传。

```tsx
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  )
}
```

常见场景：

- 主题
- 国际化
- 当前登录用户
- 权限信息
- 全局配置

需要注意：Context 值变化会影响使用该 Context 的组件更新。高频变化的数据不一定适合直接放进一个大 Context。

## Context 和 Redux 有什么区别？

Context 是 React 内置的跨层级传值能力，不是完整状态管理方案。

Redux 是状态管理库，提供更清晰的数据流、调试能力、中间件、状态快照等能力。

选择建议：

- 简单全局配置：Context 足够。
- 复杂业务状态、多人协作、需要调试和中间件：可以考虑 Redux 或其他状态管理库。

面试回答可以补一句：Context 解决传递问题，状态管理库解决状态组织和更新流程问题。

## Redux 的核心思想是什么？

Redux 常见核心概念：

- Store：保存全局状态
- Action：描述发生了什么
- Reducer：根据旧状态和 action 返回新状态
- Dispatch：派发 action

```ts
function counterReducer(state = 0, action: { type: string }) {
  switch (action.type) {
    case 'increment':
      return state + 1
    default:
      return state
  }
}
```

Redux 强调单向数据流和不可变更新，适合复杂状态变化需要可预测、可追踪的项目。

## Zustand 这类轻量状态库适合什么场景？

Zustand 写法更轻量，没有 Redux 那么多样板代码，适合中小型项目或局部全局状态。

常见适用场景：

- 用户信息
- 主题配置
- 弹窗状态
- 页面之间共享的筛选条件

状态库不是越早引入越好。判断标准是：状态是否跨多个页面共享，更新逻辑是否复杂，是否需要调试和持久化能力。

