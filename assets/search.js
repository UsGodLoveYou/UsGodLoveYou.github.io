/* =====================================================================
 * search.js — 客户端搜索 (无后端)
 *
 * 用法: 在 search.html 加:
 *   <div class="search-box">
 *     <input id="search-input" placeholder="搜索文章...">
 *   </div>
 *   <div id="search-results"></div>
 *   <script src="assets/search.js"></script>
 * =====================================================================*/

(function() {
    'use strict';

    const POSTS_JSON = 'data/posts.json';
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    if (!input || !results) return;

    let posts = [];
    let postsContent = [];  // 缓存 HTML 内容 (用于高级搜索)

    async function loadPosts() {
        try {
            const response = await fetch(POSTS_JSON);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            posts = await response.json();

            // 加载每篇文章的 HTML 供搜索
            for (const post of posts) {
                try {
                    const r = await fetch(post.url);
                    if (r.ok) {
                        post._html = await r.text();
                    }
                } catch (e) { /* ignore */ }
            }
        } catch (err) {
            console.error('[search.js] 加载失败:', err);
        }
    }

    /**
     * 高亮匹配的关键词
     */
    function highlight(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * 搜索文章
     */
    function search(query) {
        if (!query || query.length < 2) {
            results.innerHTML = '';
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = [];

        for (const post of posts) {
            let score = 0;

            // 标题匹配 (权重高)
            if (post.title && post.title.toLowerCase().includes(lowerQuery)) {
                score += 10;
            }

            // 标签匹配
            if (post.tags && post.tags.some(t => t.toLowerCase().includes(lowerQuery))) {
                score += 5;
            }

            // 描述匹配
            if (post.description && post.description.toLowerCase().includes(lowerQuery)) {
                score += 3;
            }

            // 内容匹配
            if (post._html && post._html.toLowerCase().includes(lowerQuery)) {
                score += 1;
            }

            if (score > 0) {
                matches.push({ post, score });
            }
        }

        matches.sort((a, b) => b.score - a.score);

        if (matches.length === 0) {
            results.innerHTML = '<p style="color: var(--color-text-alt); padding: 1rem;">没有找到匹配的文章</p>';
            return;
        }

        results.innerHTML = matches.map(({ post, score }) => `
            <article class="post-card">
                <time>${post.date}</time>
                <h2><a href="${post.url}">${highlight(post.title, query)}</a></h2>
                <p>${highlight(post.description || '', query)}</p>
                <div class="post-tags">
                    ${(post.tags || []).map(t => `<a class="tag" href="tags.html#${t}">${highlight(t, query)}</a>`).join('')}
                </div>
            </article>
        `).join('');
    }

    // 输入防抖
    let timeoutId = null;
    input.addEventListener('input', (e) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => search(e.target.value), 150);
    });

    // URL 参数 ?q=xxx 自动填充
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) {
        input.value = params.get('q');
        search(input.value);
    }

    // 初始化加载
    loadPosts();
})();