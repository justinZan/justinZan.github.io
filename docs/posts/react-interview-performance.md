# 性能优化与 memo

## React 常见性能优化手段有哪些？

常见方向：

- 使用 `React.memo` 避免子组件不必要渲染
- 使用 `useMemo` 缓存昂贵计算结果
- 使用 `useCallback` 保持函数引用稳定
- 列表使用稳定 key
- 大列表使用虚拟滚动
- 路由和组件懒加载
- 避免把高频变化状态放到过大的父组件或 Context
- 拆分组件，让状态尽量靠近使用它的地方

面试时要强调：优化前先定位问题，不要默认给所有组件套 memo。

## React.memo 有什么作用？

`React.memo` 可以在 props 没有变化时跳过组件重新渲染。

```tsx
const UserCard = memo(function UserCard({ name }: { name: string }) {
  return <div>{name}</div>
})
```

它适合：

- 子组件渲染成本较高
- 父组件频繁更新
- 子组件 props 比较稳定

如果 props 每次都是新对象或新函数，`memo` 的效果会变差。

## useMemo 和 useCallback 有什么区别？

`useMemo` 缓存计算结果：

```tsx
const visibleList = useMemo(() => {
  return list.filter((item) => item.visible)
}, [list])
```

`useCallback` 缓存函数引用：

```tsx
const handleClick = useCallback(() => {
  submit(id)
}, [id])
```

可以理解为：

- `useMemo` 返回值
- `useCallback` 返回函数

`useCallback(fn, deps)` 基本等价于 `useMemo(() => fn, deps)`。

## useMemo 是不是越多越好？

不是。

`useMemo` 本身也有成本：React 需要保存依赖、比较依赖、维护缓存。

适合使用的场景：

- 计算确实比较昂贵。
- 结果作为 memo 子组件的 props，需要保持引用稳定。
- 依赖变化频率低，缓存命中率高。

不适合：

- 简单字符串拼接
- 简单数组长度计算
- 没有性能问题的普通表达式

## 为什么传对象或函数给 memo 组件容易失效？

每次渲染都会创建新的对象或函数引用。

```tsx
<UserCard config={{ showAvatar: true }} />
```

即使内容一样，引用也不一样，`memo` 会认为 props 变了。

可以把对象移到组件外，或者用 `useMemo`：

```tsx
const config = useMemo(() => ({ showAvatar: true }), [])
```

函数可以使用 `useCallback` 保持引用稳定。

## 大列表如何优化？

常见方案：

- 分页
- 虚拟列表
- 懒加载
- 减少列表项组件复杂度
- 保持列表项 key 稳定
- 避免列表项收到不稳定 props

如果一次渲染几千个 DOM 节点，再多 memo 也不如虚拟列表直接减少 DOM 数量有效。

## React.lazy 和 Suspense 有什么作用？

`React.lazy` 可以懒加载组件，配合 `Suspense` 展示加载状态。

```tsx
const Settings = lazy(() => import('./Settings'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  )
}
```

常见场景：

- 路由级代码分割
- 首屏不需要的大组件
- 弹窗、图表、编辑器等重型模块

