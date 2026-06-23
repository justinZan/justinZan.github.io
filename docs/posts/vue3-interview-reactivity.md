# 响应式原理与更新机制

<div class="flow-diagram">
  <p class="flow-title">Vue3 响应式更新流程</p>
  <div class="flow-row">
    <div class="flow-node"><strong>创建响应式</strong><span>reactive / ref 包装数据</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>渲染读取</strong><span>组件 render 读取响应式数据</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>依赖收集</strong><span>track 记录数据和副作用关系</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>数据变化</strong><span>set 操作触发 trigger</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>批量更新</strong><span>调度器合并更新并 patch DOM</span></div>
  </div>
  <p class="flow-note">`nextTick` 等待的是这轮批量 DOM 更新完成之后的时机。</p>
</div>

## Vue3 响应式原理是什么？

Vue3 使用 `Proxy` 劫持对象操作。当组件渲染时读取响应式数据，会触发依赖收集；当数据修改时，会触发依赖更新。

可以用三个关键词回答：

- `reactive` 创建代理对象
- `track` 收集依赖
- `trigger` 触发更新

简化理解：

```ts
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return result
  }
})
```

真实源码更复杂，还要处理嵌套对象、数组、集合类型、只读对象、浅响应式等情况。

## nextTick 有什么作用？

Vue 更新 DOM 是异步批量执行的。修改响应式数据后，DOM 不会立刻同步完成更新。

如果需要在数据变化后读取最新 DOM，可以使用 `nextTick`：

```ts
count.value++

await nextTick()

console.log(el.value?.textContent)
```

常见场景包括：滚动到底部、获取元素尺寸、聚焦输入框、等待列表渲染完成。

## Vue 为什么要批量更新？

如果每次数据变化都立刻更新 DOM，连续多次修改状态会造成多次重复渲染。

Vue 会把同一轮事件循环中的状态变更合并起来，再统一刷新视图。这样可以减少不必要的 DOM 操作，提高性能。

```ts
count.value++
count.value++
count.value++
```

这类连续修改通常不会触发三次完整 DOM 更新，而是被合并处理。

## shallowRef 和 shallowReactive 适合什么场景？

`shallowRef` 和 `shallowReactive` 只做浅层响应式，不会递归代理深层对象。

适合场景：

- 大型对象不希望被深度代理
- 第三方库实例
- 图表、地图、编辑器实例
- 只关心对象整体替换，不关心内部属性变化

```ts
const chart = shallowRef(null)
```

如果对象内部变化不需要驱动视图更新，浅响应式可以减少额外开销。

## toRaw 和 markRaw 有什么区别？

`toRaw` 用来从响应式代理对象中拿到原始对象。

```ts
const raw = toRaw(state)
```

它适合临时读取原始对象，不建议长期持有后继续修改，否则容易绕开 Vue 的响应式追踪。

`markRaw` 用来标记一个对象永远不要被转成响应式。

```ts
const chart = markRaw(new Chart())
```

常见场景：

- 第三方库实例
- 复杂类实例
- 不希望被代理的大对象

一句话区分：`toRaw` 是“从代理拿原始对象”，`markRaw` 是“一开始就别代理它”。

## readonly 有什么作用？

`readonly` 可以创建只读代理，防止调用方直接修改状态。

```ts
const state = reactive({ count: 0 })
const readonlyState = readonly(state)
```

常见场景是组合式函数中只暴露只读状态，同时提供明确的修改方法。

```ts
function useCounter() {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count: readonly(count),
    increment
  }
}
```

这样可以让状态修改路径更可控。

## effectScope 是做什么的？

`effectScope` 可以把一组响应式副作用收集到同一个作用域中，之后统一停止。

适合场景：

- 插件内部创建多个 watch
- 组合式函数中需要统一清理副作用
- 非组件上下文中使用响应式能力

```ts
const scope = effectScope()

scope.run(() => {
  watch(source, callback)
})

scope.stop()
```

组件内部大多数时候不需要手动使用，因为组件卸载时会自动清理在 setup 中创建的副作用。
