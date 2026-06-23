import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  title: '我的博客',
  description: '记录技术、生活和思考',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/first-post' },
      { text: '关于我', link: '/about' }
    ],
    sidebar: [
      {
        text: '博客文章',
        items: [
          { text: '第一篇文章', link: '/posts/first-post' }
        ]
      },
      {
        text: 'Vue3 面试题',
        items: [
          { text: '面试题目录', link: '/posts/vue3-interview' },
          { text: '基础与 Vue2 区别', link: '/posts/vue3-interview-basic' },
          { text: 'Composition API', link: '/posts/vue3-interview-composition' },
          { text: '响应式原理', link: '/posts/vue3-interview-reactivity' },
          { text: '模板与指令', link: '/posts/vue3-interview-template' },
          { text: '组件通信', link: '/posts/vue3-interview-components' },
          { text: 'Router 与 Pinia', link: '/posts/vue3-interview-router-pinia' },
          { text: '性能优化', link: '/posts/vue3-interview-performance' },
          { text: '生命周期与工程', link: '/posts/vue3-interview-lifecycle-engineering' }
        ]
      },
      {
        text: 'React 面试题',
        items: [
          { text: '面试题目录', link: '/posts/react-interview' },
          { text: '基础与 JSX', link: '/posts/react-interview-basic' },
          { text: 'State 与渲染', link: '/posts/react-interview-state-render' },
          { text: 'Hooks 高频题', link: '/posts/react-interview-hooks' },
          { text: '通信与状态管理', link: '/posts/react-interview-communication-state' },
          { text: '性能优化', link: '/posts/react-interview-performance' },
          { text: '工程实践', link: '/posts/react-interview-engineering' }
        ]
      },
      {
        text: 'AI 面试题',
        items: [
          { text: '面试题目录', link: '/posts/ai-interview' },
          { text: 'AI 与大模型基础', link: '/posts/ai-interview-basic' },
          { text: 'RAG 高频题', link: '/posts/ai-interview-rag' },
          { text: 'Embedding 与向量检索', link: '/posts/ai-interview-embedding-vector' },
          { text: 'LangChain 高频题', link: '/posts/ai-interview-langchain' },
          { text: 'Agent / Function / MCP', link: '/posts/ai-interview-agent-tools' },
          { text: 'AI 工程实践', link: '/posts/ai-interview-engineering' },
          { text: '多模态模型', link: '/posts/ai-interview-multimodal' },
          { text: '微调 / LoRA / 蒸馏', link: '/posts/ai-interview-finetuning-lora-distillation' },
          { text: '知识图谱', link: '/posts/ai-interview-knowledge-graph' },
          { text: 'LLMOps', link: '/posts/ai-interview-llmops' },
          { text: 'AI 安全', link: '/posts/ai-interview-security' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/your-github-username' }],
    footer: {
      message: 'Built with VitePress and GitHub Pages.',
      copyright: 'Copyright © 2026'
    },
    search: {
      provider: 'local'
    }
  }
})
