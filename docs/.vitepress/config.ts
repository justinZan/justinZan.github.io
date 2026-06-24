import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  title: 'JustinZan',
  description: 'JustinZan 的全栈、AI 与英语学习笔记',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '英语学习', link: '/posts/english-learning' },
      { text: '全栈面试', link: '/posts/fullstack-interview' },
      { text: '关于我', link: '/about' }
    ],
    sidebar: [
      {
        text: '英语学习',
        items: [
          { text: '学习入口', link: '/posts/english-learning' },
          { text: '高频单词', link: '/posts/english-words' },
          { text: '六级词库', link: '/posts/english-cet6-words' },
          { text: '常见短句', link: '/posts/english-phrases' },
          { text: '场景表达', link: '/posts/english-scenarios' }
        ]
      },
      {
        text: '全栈面试题',
        items: [
          { text: '面试题目录', link: '/posts/fullstack-interview' },
          { text: '能力清单', link: '/posts/fullstack-skills-roadmap' },
          { text: '答案速查', link: '/posts/fullstack-interview-answers' },
          { text: '前端基础', link: '/posts/fullstack-interview-frontend' },
          { text: '后端与 API', link: '/posts/fullstack-interview-backend-api' },
          { text: '后端技术', link: '/posts/fullstack-interview-backend-tech' },
          { text: '数据库与缓存', link: '/posts/fullstack-interview-database-cache' },
          { text: '网络与安全', link: '/posts/fullstack-interview-network-security' },
          { text: '系统设计', link: '/posts/fullstack-interview-system-design' },
          { text: 'DevOps 与部署', link: '/posts/fullstack-interview-devops' },
          { text: '项目经验', link: '/posts/fullstack-interview-project' }
        ]
      },
      {
        text: '项目场景题',
        items: [
          { text: '场景题目录', link: '/posts/project-interview-scenarios' },
          { text: 'Vue 项目场景', link: '/posts/project-scenarios-vue' },
          { text: 'React 项目场景', link: '/posts/project-scenarios-react' },
          { text: 'AI 项目场景', link: '/posts/project-scenarios-ai' },
          { text: '全栈项目场景', link: '/posts/project-scenarios-fullstack' }
        ]
      },
      {
        text: 'Vue3 面试题',
        items: [
          { text: '面试题目录', link: '/posts/vue3-interview' },
          { text: '答案速查', link: '/posts/vue3-interview-answers' },
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
          { text: '答案速查', link: '/posts/react-interview-answers' },
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
          { text: '答案速查', link: '/posts/ai-interview-answers' },
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/justinZan' }],
    footer: {
      message: 'Built with VitePress and GitHub Pages.',
      copyright: 'Copyright © 2026'
    },
    search: {
      provider: 'local'
    }
  }
})
