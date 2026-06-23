# Composition API 高频题

## Composition API 解决了什么问题？

Options API 按 `data`、`methods`、`computed`、`watch` 拆分代码。组件简单时很清晰，但组件复杂后，同一块业务逻辑可能分散在多个选项里。

Composition API 允许把同一功能相关的状态、计算属性、监听和方法放在一起。

```ts
import { computed, ref } from 'vue'

export function useCounter() {
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
}
```

它的核心价值是逻辑复用和逻辑聚合，而不是“写法更高级”。

## ref 和 reactive 有什么区别？

`ref` 通常用于基本类型，也可以包对象；访问和修改时需要 `.value`。

```ts
const count = ref(0)
count.value++
```

`reactive` 用于对象、数组、Map、Set 等引用类型，返回一个响应式代理对象。

```ts
const state = reactive({
  count: 0,
  user: {
    name: 'Justin'
  }
})

state.count++
```

常见选择：

- 简单值用 `ref`
- 表单对象、复杂对象用 `reactive`
- 组合式函数返回值更推荐多个 `ref`，方便解构后保持响应式

## ref 解构为什么可能丢失响应式？

`reactive` 返回的是 Proxy，响应式依赖建立在代理对象的属性访问上。如果直接解构，拿到的是普通值，后续就不再经过代理。

```ts
const state = reactive({
  count: 0
})

const { count } = state
```

这里的 `count` 不再是响应式数据。可以使用 `toRef` 或 `toRefs` 保持响应式：

```ts
const { count } = toRefs(state)
```

## computed 和 watch 的区别是什么？

`computed` 适合从已有状态派生出新状态，有缓存，只有依赖变化时才重新计算。

```ts
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
```

`watch` 适合响应数据变化后执行副作用，例如请求接口、写入缓存、手动操作 DOM。

```ts
watch(keyword, async (value) => {
  await fetchList(value)
})
```

一句话区分：`computed` 产出一个值，`watch` 执行一段动作。

## watch 和 watchEffect 有什么区别？

`watch` 需要明确指定监听源，适合精确控制。

```ts
watch(userId, (id) => {
  fetchUser(id)
})
```

`watchEffect` 会自动收集回调中用到的响应式依赖，初始化时立即执行一次。

```ts
watchEffect(() => {
  fetchUser(userId.value)
})
```

如果依赖关系明确，优先用 `watch`；如果依赖较多且和副作用代码绑定很紧，可以考虑 `watchEffect`。

