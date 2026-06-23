# React 常见面试题整理

这里按主题整理 React 高频面试题，方便复习时快速定位。

React 面试的重点通常不只是 API，而是能否解释清楚：组件如何渲染、状态如何更新、Hooks 为什么有规则、性能优化应该在什么场景下做。

## 知识地图

<div class="flow-diagram">
  <p class="flow-title">React 面试复习路径</p>
  <div class="flow-row">
    <div class="flow-node"><strong>组件基础</strong><span>JSX、props、受控组件</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>渲染机制</strong><span>state、render、commit、key</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>Hooks</strong><span>useState、useEffect、useRef、自定义 Hook</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>工程能力</strong><span>Context、状态管理、memo、Suspense</span></div>
  </div>
  <p class="flow-note">React 的核心线索是：状态变化如何触发渲染，以及如何控制副作用和重渲染。</p>
</div>

## 题目分类

- [React 基础与 JSX](/posts/react-interview-basic)
- [State、Props 与渲染机制](/posts/react-interview-state-render)
- [Hooks 高频题](/posts/react-interview-hooks)
- [组件通信与状态管理](/posts/react-interview-communication-state)
- [性能优化与 memo](/posts/react-interview-performance)
- [工程实践与进阶能力](/posts/react-interview-engineering)

## 推荐复习顺序

1. 先看 React 基础、JSX、组件和 props。
2. 再看 state、渲染流程、批量更新和 key。
3. 接着看 Hooks，这是 React 面试的核心。
4. 然后看组件通信、Context、状态管理。
5. 最后看性能优化、Suspense、错误边界和工程实践。

## 面试答题模板

回答 React 问题时可以按这个顺序：

1. 先说结论
2. 解释背后的渲染或状态机制
3. 说明适用场景
4. 补一个项目中的例子

例如回答 `useMemo`：

> `useMemo` 用来缓存计算结果，适合昂贵计算或需要保持引用稳定的场景。它不是默认性能优化手段，只有当计算成本高、子组件依赖引用稳定，或者配合 `memo` 时才更有价值。
