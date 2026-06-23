# Hooks 高频题

## Hooks 为什么不能写在条件或循环里？

Hooks 依赖稳定的调用顺序来保存每个 Hook 对应的状态。

不推荐：

```tsx
if (visible) {
  const [count, setCount] = useState(0)
}
```

如果某次渲染调用了这个 Hook，下一次渲染没有调用，React 就无法准确匹配每个 Hook 对应的状态。

所以 Hooks 必须写在组件或自定义 Hook 的顶层。

## useState 和 useReducer 怎么选？

`useState` 适合简单、独立的状态。

```tsx
const [keyword, setKeyword] = useState('')
```

`useReducer` 适合复杂状态，尤其是多个状态变化互相关联，或者更新逻辑需要集中管理时。

```tsx
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}
```

一句话：状态简单用 `useState`，状态关系复杂用 `useReducer`。

## useEffect 是做什么的？

`useEffect` 用来让组件和外部系统同步，例如：

- 请求接口
- 订阅事件
- 操作浏览器 API
- 建立 WebSocket
- 同步第三方库实例

```tsx
useEffect(() => {
  const handler = () => console.log(window.innerWidth)
  window.addEventListener('resize', handler)

  return () => {
    window.removeEventListener('resize', handler)
  }
}, [])
```

清理函数用于取消订阅、清除定时器或销毁资源。

## useEffect 的依赖数组怎么理解？

依赖数组告诉 React：这个 Effect 依赖哪些响应式值。

```tsx
useEffect(() => {
  fetchUser(userId)
}, [userId])
```

常见情况：

- 不传依赖数组：每次渲染后都执行。
- 空数组 `[]`：挂载后执行一次。
- 有依赖：依赖变化后重新执行。

不要为了“只执行一次”强行漏写依赖。更好的方式是重构代码，让依赖关系真实、清晰。

## useEffect 和 useLayoutEffect 有什么区别？

`useEffect` 在浏览器完成绘制后执行，适合大多数副作用。

`useLayoutEffect` 在浏览器绘制前同步执行，适合读取布局并立即修正 DOM 的场景。

常见选择：

- 请求接口、订阅事件：用 `useEffect`
- 测量元素尺寸、避免闪烁的布局调整：考虑 `useLayoutEffect`

`useLayoutEffect` 会阻塞浏览器绘制，不应该滥用。

## useRef 有什么作用？

`useRef` 可以保存跨渲染不变的可变值，修改它不会触发重新渲染。

常见用途：

- 获取 DOM 节点
- 保存定时器 ID
- 保存上一次的值
- 保存第三方实例

```tsx
const inputRef = useRef<HTMLInputElement>(null)

function focusInput() {
  inputRef.current?.focus()
}
```

如果值变化需要驱动 UI 更新，用 `useState`；如果只是保存可变引用，用 `useRef`。

## 自定义 Hook 解决什么问题？

自定义 Hook 用来复用状态逻辑，而不是复用 UI。

```tsx
function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
    toggle: () => setValue((value) => !value)
  }
}
```

命名必须以 `use` 开头，这样 React 和 lint 规则才能识别其中的 Hook 调用。

## 常见闭包陷阱是什么？

事件、定时器、异步回调中拿到的可能是某次渲染时的旧 state。

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count)
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

这里的 `count` 会停留在首次渲染时的值。解决方式取决于场景：

- 把依赖加入依赖数组。
- 使用函数式更新。
- 用 `useRef` 保存最新值。

