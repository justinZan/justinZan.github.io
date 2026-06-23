# RAG 高频题

<div class="flow-diagram">
  <p class="flow-title">RAG 从文档到答案的完整链路</p>
  <div class="flow-row">
    <div class="flow-node"><strong>文档处理</strong><span>加载、清洗、切分、保留 metadata</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>向量入库</strong><span>Embedding 后写入向量数据库</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>问题检索</strong><span>query rewrite、top-k、hybrid search</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>重排组装</strong><span>rerank、权限过滤、构造上下文</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>生成答案</strong><span>LLM 基于资料回答并给出引用</span></div>
  </div>
  <p class="flow-note">RAG 质量通常先看检索链路，再看 Prompt 和模型。</p>
</div>

## RAG 是什么？

RAG 是 Retrieval-Augmented Generation，也就是检索增强生成。

它把外部知识检索和大模型生成结合起来，让模型在回答前先查找相关资料，再基于资料生成答案。

典型流程：

1. 文档加载
2. 文档切分
3. 生成 Embedding
4. 存入向量数据库
5. 用户提问
6. 检索相关片段
7. 组装 Prompt
8. 调用模型生成答案
9. 返回答案和引用来源

RAG 常见于企业知识库、文档问答、客服问答、合规问答和内部搜索。

## 为什么需要 RAG？

大模型有几个天然限制：

- 训练知识可能过期
- 不知道企业私有数据
- 容易产生幻觉
- 无法直接引用内部文档
- 重新训练成本高

RAG 可以把最新、私有、可追溯的知识放进上下文中，让模型基于资料回答。

但 RAG 不能保证绝对正确。检索不到、检索错、上下文过长、Prompt 设计差，都会影响答案质量。

## RAG 和普通搜索有什么区别？

普通搜索主要返回文档列表或网页链接。

RAG 会把搜索到的内容交给 LLM，让模型进行总结、归纳、推理和回答。

对比：

- 搜索重在“找资料”
- RAG 重在“基于资料生成答案”

面试时可以补充：RAG 的核心难点不是调用模型，而是把正确资料在正确时机放到模型上下文里。

## 文档切分为什么重要？

文档切分会直接影响召回质量和答案质量。

切得太大：

- 噪声多
- 占用上下文
- 精确匹配变差

切得太小：

- 语义不完整
- 重要上下文丢失
- 需要更多片段拼接

常见策略：

- 按标题、段落、章节切分
- 设置 chunk size 和 overlap
- 保留 metadata，比如来源、标题、页码
- 对表格、代码、问答文档使用特殊切分方式

## chunk overlap 有什么作用？

chunk overlap 是相邻片段之间保留一部分重叠内容。

它可以减少切分边界导致的语义断裂。

例如一句关键解释刚好跨越两个 chunk，如果没有 overlap，检索到其中一个片段时可能上下文不完整。

但 overlap 过大会带来重复内容、索引膨胀和成本增加。

## RAG 检索效果不好怎么排查？

可以按这个顺序排查：

1. 文档是否成功入库
2. 文档切分是否合理
3. metadata 是否丢失
4. embedding 模型是否适合语言和领域
5. query 是否需要改写
6. top-k 是否太小或太大
7. 是否需要 hybrid search
8. 是否需要 rerank
9. Prompt 是否正确要求模型基于资料回答

很多 RAG 问题不是模型能力问题，而是检索链路没有把正确上下文送进去。

## 什么是 Query Rewrite？

Query Rewrite 是把用户问题改写成更适合检索的查询。

例如用户问：

```text
这个怎么申请？
```

单看这句话无法检索，需要结合历史对话改写为：

```text
年假申请流程是什么？
```

常见场景：

- 多轮对话
- 问题过短
- 口语化表达
- 有代词引用
- 查询意图不明确

## 什么是 rerank？

rerank 是对初步召回的文档再排序。

常见流程：

1. 向量检索召回 top 20
2. reranker 判断 query 和文档片段的相关性
3. 选出 top 5 放入 Prompt

向量检索适合快速召回，rerank 适合提升最终相关性。

如果知识库规模大、问题复杂、召回噪声多，rerank 很有价值。

## RAG 如何处理权限？

企业 RAG 一定要考虑权限。

常见方案：

- 文档入库时保存权限 metadata
- 检索时按用户身份过滤
- 生成答案前再次校验来源权限
- 不把无权限片段放入上下文
- 日志中避免泄露敏感内容

不能只在前端隐藏入口。真正的权限隔离必须发生在检索和服务端逻辑中。

## RAG 如何评估效果？

常见评估维度：

- 检索召回率
- 检索相关性
- 答案准确率
- 忠实度，是否基于资料回答
- 引用是否正确
- 无答案时是否拒答
- 延迟
- 成本
- 用户满意度

可以准备一批标准问答集，持续评估每次切分策略、embedding 模型、top-k、rerank 和 prompt 调整后的效果。
