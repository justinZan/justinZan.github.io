# My Blog

一个基于 VitePress + GitHub Pages 的个人博客。

## 本地开发

```bash
npm install
npm run docs:dev
```

访问：

```text
http://localhost:5173
```

## 构建预览

```bash
npm run docs:build
npm run docs:preview
```

## 写文章

文章放在：

```text
docs/posts/
```

新增文章后，在 `docs/.vitepress/config.ts` 的 `sidebar` 中增加链接。

## 部署到 GitHub Pages

1. 创建 GitHub 仓库。
2. 推送本项目代码。
3. 在仓库 `Settings -> Pages` 中选择 `GitHub Actions`。
4. 推送到 `main` 后，GitHub Actions 会自动部署。

如果仓库名不是 `你的用户名.github.io`，例如仓库叫 `my-blog`，请在 GitHub Actions 里设置：

```yaml
env:
  BASE_PATH: /my-blog/
```

或者在 `docs/.vitepress/config.ts` 中把 `base` 固定为：

```ts
base: '/my-blog/'
```

