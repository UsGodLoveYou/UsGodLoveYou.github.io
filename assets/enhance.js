/* =====================================================================
 * enhance.js — 文章增强功能
 *
 * 功能:
 *   1. 阅读进度条 (顶部)
 *   2. 回到顶部按钮
 *   3. 复制代码按钮 (自动给 <pre> 加按钮)
 *   4. 自动生成 TOC (文章目录)
 *   5. 估计阅读时间 (没设置的话, 自动算)
 * =====================================================================*/

(function() {
    'use strict';

    /* ---------- 阅读进度条 ---------- */
    function initProgress() {
        const bar = document.getElementById('reading-progress');
        if (!bar) return;

        window.addEventListener('scroll', () => {
            const article = document.querySelector('article.post-content, article');
            if (!article) return;

            const rect = article.getBoundingClientRect();
            const total = rect.height;
            const scrolled = -rect.top;
            const percent = Math.min(100, Math.max(0, (scrolled / total) * 100));
            bar.style.width = percent + '%';
        }, { passive: true });
    }

    /* ---------- 回到顶部 ---------- */
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.style.display = window.scrollY > 300 ? 'block' : 'none';
        }, { passive: true });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- 复制代码按钮 ---------- */
    function addCopyButtons() {
        document.querySelectorAll('article pre').forEach((pre) => {
            // 跳过已经有按钮的
            if (pre.querySelector('.copy-btn')) return;

            const button = document.createElement('button');
            button.className = 'btn btn-sm btn-outline-secondary copy-btn';
            button.style.cssText = 'position: absolute; top: 8px; right: 8px; opacity: 0.6; font-size: 0.8rem;';
            button.innerHTML = '<i class="bi bi-clipboard"></i>';
            button.title = '复制代码';

            // pre 必须 position: relative 才能放按钮
            if (getComputedStyle(pre).position === 'static') {
                pre.style.position = 'relative';
            }

            button.addEventListener('click', async () => {
                const code = pre.querySelector('code')?.innerText || pre.innerText;
                try {
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = '<i class="bi bi-check-lg"></i>';
                    button.style.opacity = '1';
                    setTimeout(() => {
                        button.innerHTML = '<i class="bi bi-clipboard"></i>';
                        button.style.opacity = '0.6';
                    }, 2000);
                } catch (e) {
                    console.error('复制失败:', e);
                }
            });

            pre.appendChild(button);
        });
    }

    /* ---------- 自动生成 TOC ---------- */
    function generateTOC() {
        const article = document.querySelector('article.post-content');
        if (!article) return;

        const headings = article.querySelectorAll('h2, h3');
        if (headings.length < 2) return;

        const toc = document.createElement('aside');
        toc.className = 'toc card shadow-sm p-3 mt-4';
        toc.innerHTML = `
            <h6 class="border-bottom pb-2 mb-3">
                <i class="bi bi-list-ol"></i> 文章目录
            </h6>
            <ul class="list-unstyled toc-list mb-0">
                ${Array.from(headings).map((h, i) => {
                    const level = h.tagName === 'H3' ? 1 : 0;
                    const text = h.textContent.trim();
                    const id = 'toc-' + i;
                    h.id = id;
                    return `<li class="toc-level-${level}">
                        <a href="#${id}" class="text-decoration-none">${escapeHtml(text)}</a>
                    </li>`;
                }).join('')}
            </ul>
        `;

        // 放在 <article> 第一段后
        article.insertBefore(toc, article.firstChild);

        // 平滑滚动
        toc.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(a.getAttribute('href').slice(1));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /* ---------- 初始化 ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initProgress();
        initBackToTop();
        addCopyButtons();
        generateTOC();
    });
})();