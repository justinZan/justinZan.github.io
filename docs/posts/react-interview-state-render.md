# State、Props 与渲染机制

<div class="flow-diagram">
  <p class="flow-title">React 一次更新发生了什么</p>
  <div class="flow-row">
    <div class="flow-node"><strong>触发更新</strong><span>事件、请求回调或外部订阅调用 setState</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>调度批处理</strong><span>React 合并同一轮中的多次更新</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>Render</strong><span>调用组件函数，计算新的 UI 描述</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>Commit</strong><span>把变化提交到 DOM</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>Effect</strong><span>执行副作用和清理逻辑</span></div>
  </div>
  <p class="flow-note">render 阶段保持纯粹，DOM 操作、订阅、请求等副作用放到 Effect 或事件里。</p>
</div>

## state 和 props 有什么区别？

`props` 是父组件传入的数据，子组件不应该直接修改。

`state` 是组件内部自己维护的数据，更新后会触发组件重新渲染。

```tsx
function UserCard({ name }: { name: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <button onClick={() => setLiked(!liked)}>
      {name} - {liked ? '已收藏' : '未收藏'}
    </button>
  )
}
```

一句话区分：props 是外部输入，state 是内部记忆。

## 为什么普通变量变化不会触发视图更新？

普通变量不会被 React 记录，也不会触发渲染。

```tsx
function Counter() {
  let count = 0

  function add() {
    count++
  }

  return <button onClick={add}>{count}</button>
}
```

点击按钮后变量虽然变了，但 React 不知道需要重新渲染。使用 `useState` 才能同时保留数据并触发渲染。

```tsx
const [count, setCount] = useState(0)
```

## React 的渲染流程是什么？

可以简单分成三步：

1. Trigger：状态更新触发一次渲染。
2. Render：React 调用组件函数，计算新的 UI 描述。
3. Commit：React 把变化提交到 DOM。

面试时可以说明：render 阶段应该保持纯粹，不要直接操作 DOM 或发请求；这些副作用应该放到 commit 之后的 Effect 中。

## setState 是同步还是异步？

更准确的说法是：React 会对状态更新进行调度和批处理。

在同一个事件处理函数里多次更新 state，React 通常会合并渲染，避免每次更新都立刻刷新 DOM。

```tsx
function add() {
  setCount(count + 1)
  setCount(count + 1)
}
```

上面两次拿到的都是当前渲染中的 `count` 快照，结果可能只加 1。

如果依赖上一次状态，应该使用函数式更新：

```tsx
setCount((count) => count + 1)
setCount((count) => count + 1)
```

## React 中 state 为什么像快照？

组件渲染时，函数内部拿到的是本次渲染对应的 state 值。即使调用 `setState`，当前函数里的 state 变量也不会立刻变成新值。

```tsx
function handleClick() {
  setCount(count + 1)
  console.log(count)
}
```

这里打印的仍然是当前渲染时的 `count`。React 会在后续渲染中提供新的 state。

这也是为什么事件处理函数中容易遇到“旧值”问题。

## key 的作用是什么？

`key` 帮助 React 在列表更新时识别元素身份。

```tsx
items.map((item) => (
  <li key={item.id}>{item.name}</li>
))
```

稳定的 key 可以帮助 React 正确复用或重建元素，避免输入框错位、组件状态错乱等问题。

不建议使用数组索引作为 key，尤其是列表会新增、删除、排序时。

## React 什么时候会保留或重置组件状态？

React 会根据组件在 UI 树中的位置和类型来判断状态是否保留。

如果同一个组件类型在同一个位置继续渲染，状态通常会保留。

如果组件被移除，或者同一个位置换成不同类型的组件，状态会被重置。

使用不同 `key` 也可以主动重置组件状态：

```tsx
<UserForm key={userId} userId={userId} />
```

常见场景：切换用户时重置表单、切换 tab 时决定是否保留页面状态。
