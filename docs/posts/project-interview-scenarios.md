# 真实项目场景面试题

这里整理更接近真实面试的项目场景题。它们不是单纯问概念，而是把 Vue、React、AI、全栈知识放到业务问题里考察。

## 为什么要练场景题？

很多面试不会直接问“什么是防抖”或“什么是 RAG”，而是这样问：

> 搜索框输入很卡、接口被频繁调用、列表结果还会闪，你会怎么处理？

这类问题考察的是组合能力：你能不能把用户体验、代码结构、接口设计、性能、异常处理和项目取舍一起讲清楚。

## 场景题回答结构

<div class="flow-diagram">
  <p class="flow-title">真实项目题回答路径</p>
  <div class="flow-row">
    <div class="flow-node"><strong>澄清场景</strong><span>先问用户量、数据量、边界和目标</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>拆解问题</strong><span>前端、接口、数据、性能、安全分别看</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>给出方案</strong><span>先可落地，再谈优化和扩展</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>说明取舍</strong><span>成本、风险、复杂度和后续演进</span></div>
  </div>
</div>

## 专题入口

- [Vue 项目场景题](/posts/project-scenarios-vue)
- [React 项目场景题](/posts/project-scenarios-react)
- [AI 项目场景题](/posts/project-scenarios-ai)
- [全栈项目场景题](/posts/project-scenarios-fullstack)

## 一个示例回答

面试官问：

> 一个管理后台列表页，数据量变大后变得很慢，你怎么优化？

可以这样答：

1. 我会先确认慢在哪里，是接口慢、渲染慢，还是筛选交互慢。
2. 如果接口慢，先看分页、索引、查询条件和返回字段。
3. 如果前端渲染慢，考虑分页、虚拟列表、减少不必要渲染、避免复杂计算放模板里。
4. 如果交互慢，搜索框加防抖，筛选条件合并请求，loading 和空状态要清晰。
5. 最后加监控指标，比如接口耗时、首屏渲染时间和错误率。

这种回答比只说“加防抖和虚拟列表”更像真实项目经验。

