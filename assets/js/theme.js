// theme.js – Simple Day/Night theme toggle
(function () {
  const THEME_KEY = 'shredlab.theme';

  document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const iconLight = document.getElementById('icon-light');
    const iconDark = document.getElementById('icon-dark');

    function updateIcons() {
      if (!iconLight || !iconDark) return;
      const isDark = rootEl.classList.contains('theme-dark');
      
      if (isDark) {
        iconLight.classList.remove('hidden');
        iconDark.classList.add('hidden');
      } else {
        iconLight.classList.add('hidden');
        iconDark.classList.remove('hidden');
      }
    }

    // Initialize icons based on the class applied in the <head>
    updateIcons();

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isDarkNow = rootEl.classList.toggle('theme-dark');
        localStorage.setItem(THEME_KEY, isDarkNow ? 'dark' : 'light');
        updateIcons();
      });
    }
  });
})();