# React 基础与 JSX

## React 是什么？

React 是用于构建用户界面的 JavaScript 库。它的核心思想是组件化和声明式 UI。

声明式 UI 的意思是：开发者描述“界面应该是什么样”，React 根据状态变化负责更新真实 DOM。

```tsx
function Counter({ count }: { count: number }) {
  return <button>当前计数：{count}</button>
}
```

面试时可以补充：React 本身只负责 UI 层，路由、数据请求、状态管理、构建工具通常由生态方案配合完成。

## JSX 是什么？

JSX 是 JavaScript 的语法扩展，可以在 JS/TS 代码中描述 UI。

```tsx
const element = <h1>Hello React</h1>
```

JSX 最终会被编译成 React 元素。它不是字符串模板，也不是 HTML，而是 JavaScript 表达式。

常见注意点：

- JSX 中使用 `className`，不是 `class`。
- JSX 中事件名使用驼峰，例如 `onClick`。
- JSX 中只能返回一个根节点，可以使用 Fragment。

```tsx
function App() {
  return (
    <>
      <h1>标题</h1>
      <p>内容</p>
    </>
  )
}
```

## 函数组件和类组件有什么区别？

类组件通过 `class`、`state`、生命周期方法组织逻辑。

函数组件通过函数、props、Hooks 组织逻辑。

现在 React 开发中函数组件是主流：

- 代码更简洁。
- 更容易复用逻辑。
- Hooks 能表达状态、副作用、缓存、引用等能力。
- TypeScript 推导通常更自然。

类组件仍然可能在老项目里出现，面试时需要看懂生命周期和 `this` 绑定问题。

## 组件为什么要保持纯粹？

纯组件的核心是：相同输入应该得到相同输出，不应该在渲染过程中修改外部变量或产生副作用。

不推荐：

```tsx
let count = 0

function BadComponent() {
  count++
  return <div>{count}</div>
}
```

推荐：

```tsx
function GoodComponent({ count }: { count: number }) {
  return <div>{count}</div>
}
```

副作用应该放到事件处理函数或 `useEffect` 中，而不是放在渲染过程里。

## 受控组件和非受控组件有什么区别？

受控组件的表单值由 React state 控制。

```tsx
function SearchInput() {
  const [keyword, setKeyword] = useState('')

  return (
    <input
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
    />
  )
}
```

非受控组件的表单值由 DOM 自己维护，React 通过 `ref` 读取。

```tsx
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function submit() {
    console.log(inputRef.current?.value)
  }

  return <input ref={inputRef} />
}
```

常见选择：复杂表单、需要实时校验时用受控组件；简单文件上传、只在提交时读取时可以用非受控组件。

