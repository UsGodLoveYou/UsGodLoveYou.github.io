/* =====================================================================
 * particles.js — 背景粒子特效配置
 *
 * 调用方式: 在每个 HTML <body> 后加:
 *   <div id="tsparticles"></div>
 *   <script src="assets/particles.js"></script>
 *
 * 效果: 浮动粒子 + 鼠标 hover 时吸附 + 点击时推开
 * =====================================================================*/

(function() {
    'use strict';

    // 检查浏览器支持
    if (typeof tsParticles === 'undefined') {
        console.warn('[particles.js] tsParticles 未加载');
        return;
    }

    // 主题颜色 (跟 Bootstrap 主题联动)
    function getThemeColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            particles: isDark
                ? ['#58a6ff', '#bc8cff', '#ff7b72', '#7ee787']  // GitHub Dark 配色
                : ['#0d6efd', '#6610f2', '#d63384', '#20c997'], // Bootstrap 配色
            line: isDark ? '#58a6ff' : '#0d6efd'
        };
    }

    // 加载粒子
    function loadParticles() {
        const colors = getThemeColors();

        tsParticles.load('tsparticles', {
            fullScreen: { enable: false },
            detectRetina: true,
            fpsLimit: 60,
            particles: {
                number: {
                    value: 50,
                    density: { enable: true, value_area: 900 }
                },
                color: { value: colors.particles },
                shape: {
                    type: 'circle',
                    stroke: { width: 0 }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.5 }
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    outMode: 'out',
                    bounce: false,
                    attract: { enable: false }
                },
                lineLinked: {
                    enable: true,
                    distance: 150,
                    color: colors.line,
                    opacity: 0.25,
                    width: 1
                }
            },
            interactivity: {
                detectOn: 'canvas',
                events: {
                    onHover: { enable: true, mode: 'grab' },
                    onClick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        lineLinked: { opacity: 0.6 }
                    },
                    push: { quantity: 3 },
                    repulse: { distance: 100, duration: 0.4 }
                }
            },
            background: {
                color: 'transparent'  // 让背景色由 CSS 控制
            }
        });
    }

    // 主题切换时更新粒子颜色
    document.addEventListener('themeChanged', loadParticles);

    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadParticles);
    } else {
        loadParticles();
    }
})();