# LLMOps

LLMOps 是围绕大模型应用开发、测试、部署、监控和持续改进的一套工程实践。

## 核心知识点

LLMOps 关注：

- Prompt 版本管理
- 数据集和评估集管理
- 模型选择和路由
- RAG 检索链路观测
- Agent 工具调用 trace
- 离线评估和线上评估
- 成本和延迟监控
- 安全和合规
- 回归测试
- 人工反馈闭环

<div class="flow-diagram">
  <p class="flow-title">LLMOps 生命周期</p>
  <div class="flow-row">
    <div class="flow-node"><strong>开发</strong><span>Prompt、工具、RAG、工作流</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>评估</strong><span>离线数据集、自动评测、人工审核</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>部署</strong><span>灰度、限流、降级、版本控制</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>监控</strong><span>质量、成本、延迟、安全</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>迭代</strong><span>反馈样本进入评估集</span></div>
  </div>
</div>

## LLMOps 和 MLOps 有什么区别？

MLOps 更关注传统机器学习模型的训练、部署、特征、模型版本和数据漂移。

LLMOps 更关注大模型应用链路：

- Prompt 变化会影响结果。
- RAG 检索质量会影响结果。
- 模型输出非确定性更强。
- 工具调用和 Agent 轨迹需要观测。
- 成本和 token 消耗是核心指标。

LLMOps 不是替代 MLOps，而是在大模型应用场景下增加了 Prompt、上下文、检索、工具和评估治理。

## LLM 应用如何做评估？

评估分为离线和线上。

离线评估：

- 使用固定数据集。
- 比较不同 Prompt、模型、检索策略。
- 做回归测试。
- 适合上线前验证。

线上评估：

- 收集真实用户问题。
- 监控异常输出。
- 记录用户反馈。
- 把线上 bad case 回流到离线评估集。

评估对象不仅是最终答案，也包括检索结果、工具选择、输出格式和安全性。

## 什么是 trace？

trace 是一次 LLM 应用请求的完整链路记录。

通常包括：

- 用户输入
- Prompt
- 模型输入输出
- 检索 query
- 召回文档
- rerank 结果
- 工具调用参数
- 工具返回
- token 消耗
- 延迟
- 错误信息

没有 trace，很难排查“为什么这次回答错了”。

## LLMOps 面试常见问题

常见题目：

- LLMOps 和 MLOps 有什么区别？
- LLM 应用怎么做回归测试？
- 如何评估 RAG 效果？
- 如何记录和分析 Agent 执行轨迹？
- Prompt 如何做版本管理？
- 如何监控 token 成本？
- 如何做线上 bad case 回流？
- 如何灰度发布新的 Prompt 或模型？
- 如何发现模型质量退化？

成熟回答要体现工程闭环：上线前有评估，上线后有监控，出现问题能回放，修复后能防回归。

