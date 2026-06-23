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
          { text: '第一篇文章', link: '/posts/first-post' },
          { text: 'Vue 学习笔记', link: '/posts/vue-note' }
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

