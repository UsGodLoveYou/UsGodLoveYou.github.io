# 🚀 部署到 GitHub Pages 指南

## 一键部署流程

### 步骤 1: 创建 GitHub 仓库

访问 https://github.com/new 创建仓库：
- **Repository name**: `usgodloveyou.github.io` (必须这个名称！)
- **Public** (GitHub Pages 免费版需要 public)
- **不要**勾选 "Add a README file"

### 步骤 2: 在 Windows 上初始化 git

打开 PowerShell 或 CMD：

```powershell
cd C:\Users\yue_z\Desktop\blog

git init -b main
git config --local user.name "Zhou Yue"
git config --local user.email "你的邮箱@example.com"

git add .
git commit -m "Initial blog: Bootstrap 5 + AOS + Mermaid + hljs + tsparticles"
```

### 步骤 3: 推送到 GitHub

```powershell
git remote add origin https://github.com/usgodloveyou/usgodloveyou.github.io.git
git branch -M main
git push -u origin main
```

**如果 push 失败**（认证问题），按下面"认证"部分处理。

### 步骤 4: 启用 GitHub Pages

1. 访问 https://github.com/usgodloveyou/usgodloveyou.github.io/settings/pages
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `/ (root)`
4. 点 **Save**

### 步骤 5: 等 1-3 分钟

访问 **https://usgodloveyou.github.io**

---

## 认证方案

### 方案 A: GitHub CLI (推荐)

```powershell
# 安装
winget install GitHub.CLI

# 登录
gh auth login
# 选 GitHub.com → HTTPS → Yes (authenticate git) → Login with a web browser

# 然后 push
cd C:\Users\yue_z\Desktop\blog
git push -u origin main
```

### 方案 B: Personal Access Token

1. 访问 https://github.com/settings/tokens
2. **Generate new token** → **Classic**
3. 勾选 `repo` 权限
4. 复制 token (ghp_xxxxx)
5. push 时当密码用:

```powershell
git remote set-url origin https://ghp_你的TOKEN@github.com/usgodloveyou/usgodloveyou.github.io.git
git push -u origin main
```

### 方案 C: SSH Key

```powershell
# 生成 key
ssh-keygen -t ed25519 -C "你的邮箱@example.com"
# 复制公钥 (~/.ssh/id_ed25519.pub)
# 粘到 GitHub: https://github.com/settings/keys

# 改用 SSH
git remote set-url origin git@github.com:usgodloveyou/usgodloveyou.github.io.git
git push -u origin main
```

---

## 部署后验收清单

访问 https://usgodloveyou.github.io 检查：

- [ ] 浏览器标签显示 CPU 图标 (Favicon)
- [ ] 背景有彩色粒子动画
- [ ] 顶部导航栏 7 个链接 (首页/时间线/归档/标签/搜索/关于/RSS)
- [ ] 点击 🌙 切换明/暗主题
- [ ] 主页 Hero 区显示统计 badge
- [ ] 主页有"按分类浏览"4 个卡片
- [ ] 主页有"热门标签"15 个
- [ ] 主页底部 Mermaid 流程图正常渲染
- [ ] 点击文章卡片 → 进入文章页
- [ ] 文章页有 TOC (右侧目录)
- [ ] 代码块有彩色高亮
- [ ] 滚动有进度条 (顶部蓝色)
- [ ] 出现"回到顶部"按钮 (右下角)
- [ ] 代码块 hover 显示复制按钮
- [ ] 时间线页面左侧有时间轴
- [ ] 搜索页面输入关键词有结果
- [ ] RSS (https://usgodloveyou.github.io/feed.xml) 返回 XML

---

## 常见问题

### Q: 看不到页面？
A: 等 3-5 分钟，GitHub Pages 需要构建时间。

### Q: 资源 404？
A: 检查 `assets/` 路径，确保 `<script src="assets/xxx.js">` 正确。

### Q: 怎么改样式？
A: 改 `assets/style.css` → `git push` → 等 1 分钟。

### Q: 加新文章？
A: 复制 `posts/template.html` → 改 → 更新 4 个页面的 POSTS 数组 → `git push`。

### Q: 自定义域名？
A: 在 repo 根目录加 `CNAME` 文件，写你的域名。然后到 DNS 添加 CNAME 记录指向 `usgodloveyou.github.io`。

---

## 自动部署 (可选)

GitHub Pages 默认每次 `git push` 后自动构建。**你什么都不用做**。

---

## 性能优化 (可选)

CDN 已经在用 (jsdelivr) — 首屏加载 ~200KB (Bootstrap + hljs + AOS + Mermaid + tsparticles)。

**进一步优化**:
- 用 `loading="lazy"` 加载图片
- 视频用 `<iframe>` 而不是 `<video>`
- Mermaid 只在需要的页面引用

---

## 内容更新流程

```
1. 编辑 /home/zhouyue/blog/posts/2026-09-25-xxx.html (WSL)
2. 或: 编辑 C:\Users\yue_z\Desktop\blog\posts\2026-09-25-xxx.html (Windows)
3. git add . && git commit -m "新文章: xxx"
4. git push
5. 等 1-3 分钟看线上
```

## 与小Q协作

```
你说: "写一篇新文章，主题: I2C 总线调试实战，分类 Embedded，标签: STM32, I2C, Embedded"

小Q 做:
1. 复制 template.html
2. 写 HTML 正文 (含 Mermaid 时序图、代码高亮)
3. 更新 data/posts.json
4. 更新 index.html, timeline.html, archive.html, tags.html 的 POSTS 数组
5. 更新 feed.xml
6. 更新 sitemap.xml
7. 复制到 Windows 桌面

你做:
git add . && git commit -m "新文章: I2C 总线调试"
git push
```
