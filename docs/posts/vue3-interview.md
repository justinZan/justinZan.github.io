# Vue3 常见面试题整理

这里按主题整理 Vue3 高频面试题，方便复习时快速定位。

建议不要只背答案。每个问题都尽量从“结论、原因、适用场景、项目经验”四个角度理解。

## 知识地图

<div class="flow-diagram">
  <p class="flow-title">Vue3 面试复习路径</p>
  <div class="flow-row">
    <div class="flow-node"><strong>基础概念</strong><span>Vue2 区别、SFC、script setup</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>组合式 API</strong><span>ref、reactive、computed、watch</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>响应式原理</strong><span>Proxy、track、trigger、nextTick</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>业务能力</strong><span>组件通信、Router、Pinia、性能优化</span></div>
  </div>
  <p class="flow-note">复习时先搭框架，再补原理，最后用项目经验把答案讲完整。</p>
</div>

## 题目分类

- [Vue3 基础与 Vue2 区别](/posts/vue3-interview-basic)
- [Composition API 高频题](/posts/vue3-interview-composition)
- [响应式原理与更新机制](/posts/vue3-interview-reactivity)
- [模板语法与常用指令](/posts/vue3-interview-template)
- [组件通信与内置组件](/posts/vue3-interview-components)
- [Vue Router 与 Pinia](/posts/vue3-interview-router-pinia)
- [性能优化与答题思路](/posts/vue3-interview-performance)
- [生命周期与工程实践](/posts/vue3-interview-lifecycle-engineering)

## 推荐复习顺序

1. 先看基础概念，建立 Vue3 的整体认知。
2. 再看 Composition API 和响应式原理，这是 Vue3 面试最核心的部分。
3. 接着看模板指令、组件通信、Router、Pinia，贴近日常业务开发。
4. 最后看性能优化、生命周期和工程实践，把答案组织得更像真实项目经验。

## 面试答题模板

回答问题时可以按这个顺序组织：

1. 先给结论
2. 再解释原因
3. 说明适用场景
4. 最后补一个项目例子

例如回答 `computed` 和 `watch`：

> `computed` 更适合派生状态，有缓存；`watch` 更适合处理副作用，比如请求接口。项目里搜索框联想请求我会用 `watch` 监听关键词，而订单金额、折扣价这种派生值会用 `computed`。
