# JustinZan Blog

这是 JustinZan 的个人技术博客，基于 VitePress 构建，内容围绕全栈工程、前端框架和 AI 应用工程持续沉淀。

博客地址：<https://justinzan.github.io>

## 内容方向

- 全栈面试：前端、后端、数据库、缓存、网络、安全、系统设计、DevOps。
- Vue3 / React：框架原理、高频面试题、工程实践和项目场景题。
- AI 工程：RAG、LangChain、Agent、Function Calling、MCP、LLMOps、AI 安全。
- 项目复盘：把技术点放进真实业务场景里，练习如何设计、排查和上线。

## 技术栈

- VitePress
- TypeScript 配置
- GitHub Pages
- GitHub Actions
- 本地搜索

## 本地开发

```bash
npm install
npm run docs:dev
```

默认访问：

```text
http://localhost:5173
```

如果端口被占用，VitePress 会自动切换到下一个可用端口。

## 构建

```bash
npm run docs:build
```

本地预览构建结果：

```bash
npm run docs:preview
```

## 项目结构

```text
docs/
  .vitepress/
    config.ts        # VitePress 配置、导航、侧边栏
    theme/           # 自定义主题样式和问答增强逻辑
  public/
    logo.svg         # 站点标志
  posts/             # 博客文章
  index.md           # 首页
  about.md           # 关于我
```

## 写作约定

文章统一放在：

```text
docs/posts/
```

新增文章后，需要在 `docs/.vitepress/config.ts` 的 `sidebar` 中增加入口。

面试题文章建议使用这种结构：

```md
## 问题是什么？

先给结论，再解释原因，最后补充项目化场景。
```

站点主题会自动识别问题标题，并把答案区域用不同背景区分，方便快速查找。

## 部署到 GitHub Pages

项目使用 GitHub Actions 部署。推送到主分支后，会构建 VitePress 并发布到 GitHub Pages。

如果仓库是用户主页仓库：

```text
justinZan.github.io
```

`base` 使用 `/` 即可。

如果未来部署到普通仓库，例如 `my-blog`，需要设置：

```yaml
env:
  BASE_PATH: /my-blog/
```

## 常用命令

```bash
npm run docs:dev      # 启动开发服务
npm run docs:build    # 构建静态站点
npm run docs:preview  # 预览构建结果
npm run format        # 格式化项目
```

## 维护目标

这个博客不是一次性整理，而是一个长期知识库。后续会持续补充：

- 更真实的项目场景题。
- 更完整的全栈后端专题。
- AI 应用上线、评估、安全和成本优化经验。
