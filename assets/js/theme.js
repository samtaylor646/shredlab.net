// theme.js – Simple Day/Night theme toggle
// FIXED: No keyboard shortcut, correct icon display, no FOUC
(function () {
  const THEME_KEY = 'shredlab.theme';
  
  // IMMEDIATE APPLICATION: Must run before DOMContentLoaded to prevent FOUC
  // This reads from localStorage and applies the class to <html> immediately
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  } catch (e) {
    console.warn('Theme access error:', e);
  }

  // DEFERRED LOGIC: UI interactions wait for DOM
  document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const iconLight = document.getElementById('icon-light');
    const iconDark = document.getElementById('icon-dark');

    // Helper to update icons
    function updateIcons() {
      if (!iconLight || !iconDark) return;
      const isDark = rootEl.classList.contains('theme-dark');
      
      if (isDark) {
        // Dark mode active: show SUN (to switch to light)
        iconLight.classList.remove('hidden');
        iconDark.classList.add('hidden');
      } else {
        // Light mode active: show MOON (to switch to dark)
        iconLight.classList.add('hidden');
        iconDark.classList.remove('hidden');
      }
    }

    // Initialize icons based on the class we already applied
    updateIcons();

    // Toggle event listener
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle class
        const isDarkNow = rootEl.classList.toggle('theme-dark');
        
        // Save preference
        localStorage.setItem(THEME_KEY, isDarkNow ? 'dark' : 'light');
        
        // Update UI
        updateIcons();
      });
    }
  });
})();