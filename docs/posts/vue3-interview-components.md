# 组件通信与内置组件

## 组件通信有哪些方式？

常见方式：

- 父传子：`props`
- 子传父：`emit`
- 双向绑定：`v-model`
- 跨层级：`provide / inject`
- 全局状态：Pinia
- 组件实例暴露：`defineExpose`
- 插槽通信：slot props

面试回答时不要只背 API，可以补充适用场景：简单父子通信用 `props/emit`，跨页面共享状态用 Pinia，组件库内部跨层级依赖可用 `provide/inject`。

## defineProps 和 defineEmits 是什么？

在 `<script setup>` 中，`defineProps` 用来声明组件接收的属性，`defineEmits` 用来声明组件触发的事件。

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  change: [value: number]
}>()

function handleClick() {
  emit('change', 1)
}
</script>
```

它们是编译器宏，不需要从 `vue` 中导入。

## v-model 在组件上是怎么实现的？

Vue3 中组件默认使用 `modelValue` 和 `update:modelValue` 实现 `v-model`。

父组件：

```vue
<UserInput v-model="name" />
```

子组件：

```vue
<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

Vue3 还支持多个 `v-model`：

```vue
<UserForm v-model:name="name" v-model:age="age" />
```

## keep-alive 有什么作用？

`keep-alive` 用来缓存组件实例，避免组件频繁销毁和重建。

常见场景：

- Tab 页面切换
- 列表页进入详情页后返回，保留筛选条件和滚动位置
- 多步骤表单保留中间状态

被缓存组件会触发 `onActivated` 和 `onDeactivated` 生命周期。

## Teleport 解决什么问题？

`Teleport` 可以把组件的一部分 DOM 渲染到当前组件层级之外的指定位置。

常见场景：

- Modal
- Drawer
- Tooltip
- Toast

例如弹窗组件逻辑属于当前页面，但 DOM 更适合挂到 `body` 下，避免被父级 `overflow`、`z-index`、`transform` 影响。

```vue
<Teleport to="body">
  <div class="modal">弹窗内容</div>
</Teleport>
```

