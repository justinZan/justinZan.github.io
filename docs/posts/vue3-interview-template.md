# 模板语法与常用指令

## v-if 和 v-for 为什么不建议写在同一个元素上？

在同一个元素上同时使用 `v-if` 和 `v-for`，容易造成优先级和作用域混乱。

例如：

```vue
<li v-for="todo in todos" v-if="!todo.done">
  {{ todo.title }}
</li>
```

这种写法不推荐。更好的做法有两种：

- 如果是过滤列表，使用 `computed` 先得到过滤后的列表。
- 如果是控制整个列表是否显示，把 `v-if` 放到外层容器。

```vue
<ul v-if="visible">
  <li v-for="todo in activeTodos" :key="todo.id">
    {{ todo.title }}
  </li>
</ul>
```

面试时可以强调：模板里尽量表达结果，过滤、排序这类逻辑更适合放到计算属性里。

## v-html 有什么风险？

`v-html` 会把字符串当作 HTML 插入页面。如果内容来自用户输入或不可信接口，可能造成 XSS 攻击。

```vue
<div v-html="content"></div>
```

使用建议：

- 只渲染可信内容。
- 不要直接渲染用户输入。
- 必要时先做白名单过滤或 HTML 清洗。

如果只是展示普通文本，直接使用插值语法：

```vue
<div>{{ content }}</div>
```

## v-bind class 和 style 有哪些常见写法？

对象写法适合按条件切换：

```vue
<div :class="{ active: isActive, disabled: disabled }"></div>
```

数组写法适合组合多个 class：

```vue
<div :class="['card', activeClass]"></div>
```

style 也支持对象：

```vue
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>
```

面试追问通常会问：复杂 class 计算是否应该写在模板里？建议把复杂逻辑放到 `computed`，模板保持清晰。

## 事件修饰符有哪些？为什么要用？

常见事件修饰符：

- `.stop` 阻止事件冒泡
- `.prevent` 阻止默认行为
- `.once` 只触发一次
- `.capture` 使用捕获阶段
- `.self` 只在事件来自自身时触发

```vue
<form @submit.prevent="submit">
  <button @click.stop="handleClick">提交</button>
</form>
```

修饰符的价值是把 DOM 事件细节声明在模板中，让方法更专注于业务逻辑。

## v-model 有哪些修饰符？

常见修饰符：

- `.lazy` 在 `change` 事件后同步，而不是每次输入都同步
- `.number` 把输入值转成数字
- `.trim` 去掉首尾空格

```vue
<input v-model.trim="keyword" />
<input v-model.number="age" />
```

如果是自定义组件，也可以接收自定义修饰符，根据 `modelModifiers` 或 `defineModel` 相关能力处理输入。

## template ref 有什么作用？

`ref` 可以拿到 DOM 元素或组件实例。

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

常见场景：

- 输入框自动聚焦
- 获取元素尺寸
- 调用子组件暴露的方法
- 操作第三方库挂载点

不要滥用 template ref。能通过状态驱动视图时，优先使用响应式数据。

## 自定义指令适合什么场景？

自定义指令适合封装底层 DOM 行为，而不是封装业务组件。

常见场景：

- 自动聚焦
- 权限控制显示
- 点击外部区域关闭弹层
- 图片懒加载
- 埋点曝光

```ts
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  }
}
```

如果逻辑和组件状态、模板结构强相关，通常应该封装成组件或组合式函数。

## v-once 和 v-memo 有什么作用？

`v-once` 用来渲染只需要初始化一次的内容，后续更新会跳过这个子树。

```vue
<h1 v-once>{{ title }}</h1>
```

`v-memo` 可以根据依赖数组决定是否跳过更新，常见于大列表局部优化。

```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
  {{ item.name }}
</div>
```

它们都属于性能优化手段。面试时要说明：先定位性能瓶颈，再使用这类优化，不要一开始就到处加。

