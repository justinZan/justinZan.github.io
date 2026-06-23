# AI 常见面试题整理

这里整理 AI、RAG、LangChain、Agent 和 LLM 应用工程相关的常见面试题。

这类面试题通常不只考概念，还会追问：为什么这样设计、如何落地、如何评估效果、出了问题怎么排查。

## 知识地图

<div class="flow-diagram">
  <p class="flow-title">AI 应用面试复习路径</p>
  <div class="flow-row">
    <div class="flow-node"><strong>模型基础</strong><span>Token、上下文、幻觉、微调</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>知识增强</strong><span>Embedding、向量库、RAG、rerank</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>应用编排</strong><span>LangChain、工具调用、Agent</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>生产落地</strong><span>评估、权限、成本、延迟、安全</span></div>
  </div>
  <p class="flow-note">AI 应用面试最看重“能不能把模型能力稳定接进业务”。</p>
</div>

## 题目分类

- [AI 与大模型基础](/posts/ai-interview-basic)
- [RAG 高频题](/posts/ai-interview-rag)
- [Embedding 与向量检索](/posts/ai-interview-embedding-vector)
- [LangChain 高频题](/posts/ai-interview-langchain)
- [Agent、工具调用与工作流](/posts/ai-interview-agent-tools)
- [AI 应用工程实践](/posts/ai-interview-engineering)
- [多模态模型](/posts/ai-interview-multimodal)
- [模型微调、LoRA 与蒸馏](/posts/ai-interview-finetuning-lora-distillation)
- [知识图谱](/posts/ai-interview-knowledge-graph)
- [LLMOps](/posts/ai-interview-llmops)
- [AI 安全](/posts/ai-interview-security)

## 推荐复习顺序

1. 先理解 LLM、Token、上下文窗口、幻觉、微调等基础概念。
2. 再看 RAG 和向量检索，这是企业知识库、智能客服、文档问答的核心。
3. 接着看 LangChain、Agent 和工具调用，理解应用编排方式。
4. 最后看评估、成本、延迟、安全、LLMOps 和上线实践。

## 面试答题模板

回答 AI 应用类问题时，可以按这个结构：

1. 先给结论
2. 说明适用场景
3. 讲清楚核心流程
4. 补充评估和风险
5. 结合项目落地经验

例如回答 RAG：

> RAG 是把外部知识检索和大模型生成结合起来，适合企业知识库、文档问答、客服问答等需要引用私有或更新知识的场景。核心流程是文档切分、Embedding、向量入库、检索、重排、组装上下文、调用模型生成答案。上线时要重点评估召回率、答案准确率、引用来源、延迟和权限隔离。
