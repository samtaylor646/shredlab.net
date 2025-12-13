// main.js — Common functionality for all pages

// Mobile Navigation Toggle
(function () {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.global-nav');
  
  if (!toggle || !nav) return;
  
  const menuIcon = toggle.querySelector('.menu-icon');
  const closeIcon = toggle.querySelector('.close-icon');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('mobile-open');
    
    if (isOpen) {
      // Close menu
      nav.classList.remove('mobile-open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // Open menu
      nav.classList.add('mobile-open');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking a link
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('mobile-open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Copyright Year
(function () {
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.textContent = `© ${year} ShredLab. All rights reserved.`;
  }
})();