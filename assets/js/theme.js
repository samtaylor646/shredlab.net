// theme.js – Simple Day/Night theme toggle (Reef style)
// FIXED: No keyboard shortcut, correct icon display
(function () {
  const THEME_KEY = 'shredlab.theme';
  const rootEl = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconLight = document.getElementById('icon-light');
  const iconDark = document.getElementById('icon-dark');

  // Load saved theme or default to light
  let isDark = localStorage.getItem(THEME_KEY) === 'dark';

  function applyTheme(dark) {
    if (dark) {
      rootEl.classList.add('theme-dark');
      // Show SUN icon on dark theme (click to go light)
      iconLight.classList.remove('hidden');
      iconDark.classList.add('hidden');
    } else {
      rootEl.classList.remove('theme-dark');
      // Show MOON icon on light theme (click to go dark)
      iconLight.classList.add('hidden');
      iconDark.classList.remove('hidden');
    }
    
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }

  // Initialize theme
  applyTheme(isDark);

  // Toggle on click only
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      isDark = !isDark;
      applyTheme(isDark);
    });
  }

  // NO KEYBOARD SHORTCUT
  // Removed to prevent interference with typing in form fields
})();