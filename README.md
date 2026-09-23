# Zhou Yue 静态博客框架

**纯静态 HTML + 多个 CDN 库 + GitHub Pages**，零依赖。

## 集成的库

| 库 | CDN | 用途 |
|---|------|------|
| [Bootstrap 5](https://getbootstrap.com/) | jsdelivr | UI 框架 (栅格/组件/导航) |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | jsdelivr | 2000+ SVG 图标 |
| [highlight.js](https://highlightjs.org/) | jsdelivr | 代码高亮 (GitHub dark 主题) |
| [AOS](https://michalsnik.github.io/aos/) | jsdelivr | 滚动入场动画 |
| [Mermaid](https://mermaid.js.org/) | jsdelivr | 流程图/时序图/类图 |
| [tsparticles](https://github.com/matteobruni/tsparticles) | jsdelivr | ★ 背景粒子特效 (浮动+连线+hover 吸附) |
| (我们的 JS) | 本地 | 主题切换/搜索/导航/粒子配置 |

## CDN 一览 (不下载到 repo, 不增加 GitHub 体积)

```html
<!-- Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css" rel="stylesheet">

<!-- Highlight.js (代码高亮) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css">
<script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js"></script>

<!-- AOS (Animate On Scroll) -->
<link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>

<!-- Mermaid (图表) -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>

<!-- tsparticles (背景粒子) -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles@2.10.0/tsparticles.bundle.min.js"></script>
```

## 文件结构

```
blog/
├── index.html              主页 (Bootstrap + AOS + Mermaid)
├── archive.html            归档 (按年分组)
├── tags.html               标签 (Bootstrap badge)
├── search.html             搜索 (Bootstrap input-group)
├── about.html              关于 (Bootstrap icons)
├── assets/
│   ├── style.css           自定义 + Bootstrap 变量覆盖
│   ├── theme.js            主题切换
│   ├── nav.js              自动导航
│   └── search.js           客户端搜索
├── data/posts.json          文章元数据
├── posts/
│   ├── 2026-09-23-rp2350-winusb.html
│   └── template.html       文章模板
└── README.md
```

## 添加新文章

1. 复制 `posts/template.html` 为 `posts/YYYY-MM-DD-标题.html`
2. 修改 title/date/tags/正文
3. 更新 `data/posts.json` 和 4 个静态页面的 `POSTS` 数组
4. `git push`

## 用法示例

### 代码高亮

文章里直接写 Markdown-style fence + language:

```html
<pre><code class="language-c">int main() { return 0; }</code></pre>
```

### 滚动动画

```html
<div data-aos="fade-up" data-aos-delay="100">
  滚动到这里会淡入
</div>
```

### 流程图 (Mermaid)

```html
<pre class="mermaid">
flowchart LR
    A[用户] --> B[博客] --> C[GitHub Pages]
</pre>
```

## 可选再加的库

| 库 | CDN | 用途 |
|---|---|------|
| [Prism.js](https://prismjs.com/) | jsdelivr | 代码高亮 (highlight.js 备用) |
| [Lozad.js](https://afarkas.github.io/lozad.js/) | jsdelivr | 图片懒加载 |
| [Typed.js](https://mattboldt.github.io/typed.js/) | jsdelivr | 打字机效果 |
| [MathJax](https://www.mathjax.org/) | jsdelivr | 数学公式 |
| [Chart.js](https://www.chartjs.org/) | jsdelivr | 数据图表 |
| [Giscus](https://giscus.app/) | giscus.app | GitHub 评论 |
| [Day.js](https://day.js.org/) | jsdelivr | 日期格式化 |

## 部署

```bash
cd blog
git init -b main
git add .
git commit -m "Initial blog"
git remote add origin https://github.com/usgodloveyou/usgodloveyou.github.io.git
git push -u origin main
```

几分钟后访问 https://usgodloveyou.github.io

## 许可

MIT License