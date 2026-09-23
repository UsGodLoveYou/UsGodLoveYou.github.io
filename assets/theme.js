/* =====================================================================
 * theme.js — 主题切换 (明/暗)
 *
 * 用法: 在每个 HTML <body> 加:
 *   <button id="theme-toggle">🌙</button>
 *   <script src="assets/theme.js"></script>
 * =====================================================================*/

(function() {
    'use strict';

    const STORAGE_KEY = 'zyblog-theme';

    // 读取用户偏好 (本地存储 → 系统偏好 → 默认亮)
    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // 应用主题
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // 切换主题
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);

        // 触发自定义事件, 让 particles.js 重新加载粒子颜色
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
    }

    // 初始化
    function init() {
        applyTheme(getPreferredTheme());
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    }

    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();