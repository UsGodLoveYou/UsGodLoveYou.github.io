/* =====================================================================
 * nav.js — 自动导航 + 文章底部 "上一篇/下一篇"
 *
 * 用法: 在每个 HTML <body> 加:
 *   <div id="post-nav-container"></div>
 *   <script src="assets/nav.js"></script>
 *
 * 数据源: data/posts.json
 * =====================================================================*/

(function() {
    'use strict';

    const POSTS_JSON = 'data/posts.json';

    /**
     * 加载文章列表
     */
    async function loadPosts() {
        try {
            const response = await fetch(POSTS_JSON);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return await response.json();
        } catch (err) {
            console.error('[nav.js] 加载 posts.json 失败:', err);
            return [];
        }
    }

    /**
     * 获取当前文章 URL (相对路径)
     */
    function getCurrentPath() {
        let path = window.location.pathname;
        // 去掉前导 /
        if (path.startsWith('/')) path = path.slice(1);
        // 标准化: index.html → /
        if (path === '' || path === 'index.html') path = '';
        return path;
    }

    /**
     * 渲染文章底部导航
     */
    async function renderPostNav() {
        const container = document.getElementById('post-nav-container');
        if (!container) return;  // 非文章页面, 跳过

        const currentPath = getCurrentPath();
        const posts = await loadPosts();
        if (posts.length === 0) return;

        // 找当前文章索引
        const currentIdx = posts.findIndex(p => p.url === currentPath || p.url === currentPath.replace(/index\.html$/, ''));
        if (currentIdx === -1) return;

        const prev = currentIdx > 0 ? posts[currentIdx - 1] : null;
        const next = currentIdx < posts.length - 1 ? posts[currentIdx + 1] : null;

        let html = '<nav class="post-nav">';

        if (prev) {
            html += `
                <a class="prev" href="${prev.url}">
                    <span class="label">← 上一篇</span>
                    <span class="title">${escapeHtml(prev.title)}</span>
                </a>`;
        } else {
            html += '<span></span>';
        }

        if (next) {
            html += `
                <a class="next" href="${next.url}">
                    <span class="label">下一篇 →</span>
                    <span class="title">${escapeHtml(next.title)}</span>
                </a>`;
        } else {
            html += '<span></span>';
        }

        html += '</nav>';
        container.innerHTML = html;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderPostNav);
    } else {
        renderPostNav();
    }
})();