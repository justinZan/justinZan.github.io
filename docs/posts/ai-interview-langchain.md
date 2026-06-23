# LangChain 高频题

## LangChain 是什么？

LangChain 是一个用于构建 LLM 应用的框架，提供模型调用、Prompt、工具、检索、Agent、记忆、输出解析、链路编排等能力。

它适合快速搭建：

- 聊天机器人
- RAG 应用
- Agent 工具调用
- 文档问答
- SQL 问答
- 多步骤 LLM 工作流

面试时可以补充：LangChain 不是模型本身，而是应用编排层。

## LangChain 的核心组件有哪些？

常见组件：

- Chat Model：对话模型
- Prompt Template：提示词模板
- Output Parser：输出解析
- Document Loader：文档加载
- Text Splitter：文本切分
- Embeddings：向量化
- Vector Store：向量存储
- Retriever：检索器
- Tool：工具
- Agent：能选择工具和步骤的执行器

回答时可以结合 RAG 流程说明这些组件如何串起来。

## Chain 和 Agent 有什么区别？

Chain 更像固定流程，步骤通常由开发者提前定义。

Agent 更像动态决策，模型可以根据任务选择工具和下一步动作。

对比：

- Chain：稳定、可控、延迟低、适合明确流程
- Agent：灵活、能处理开放任务、但更难控制和评估

例如普通文档问答可以用 RAG Chain；需要模型自己决定查知识库、查数据库、调用接口时，可以考虑 Agent。

## LangChain 中 Retriever 是什么？

Retriever 是检索器，输入 query，返回相关文档。

它不一定只来自向量数据库，也可以来自：

- 关键词搜索
- 向量搜索
- 混合搜索
- 数据库查询
- Web 搜索

在 RAG 中，Retriever 决定了模型能看到哪些上下文，直接影响答案质量。

## Output Parser 有什么作用？

Output Parser 用来把模型输出解析成结构化结果。

常见用途：

- JSON 解析
- 分类结果解析
- 表单字段抽取
- 工具参数解析

如果业务后续依赖模型输出，最好不要只让模型输出自然语言，而是约束结构。

```json
{
  "intent": "search_policy",
  "confidence": 0.92
}
```

结构化输出可以降低后处理成本，也更容易测试。

## LangSmith 是什么？

LangSmith 是 LangChain 生态中用于观测、调试和评估 LLM 应用的平台。

它可以帮助查看：

- 每一步 Prompt
- 模型输入输出
- 工具调用
- 检索结果
- 延迟
- 错误
- 评估结果

LLM 应用往往不是单次调用，链路越复杂，越需要 trace 和评估工具。

## 使用 LangChain 有什么风险？

常见风险：

- 抽象层较多，排查问题需要理解框架内部流程
- 版本变化较快
- 简单场景可能显得重
- Agent 行为不够稳定时难以线上控制
- 需要配合日志、评估和权限治理

面试回答可以说：LangChain 适合快速搭建和组合复杂能力，但生产系统仍要关注可控性、可观测性、成本和降级策略。

