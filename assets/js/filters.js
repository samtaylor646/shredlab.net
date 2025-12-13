// filters.js – GSAP Flip filtering + list/grid toggle (Reef style)
(function () {
  const LAYOUT_KEY = 'shredlab.layout';
  const grid = document.querySelector('#eventsGrid, #servicesGrid');
  
  // Exit if no grid found (not on events/services page)
  if (!grid) return;
  
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(grid.querySelectorAll('.project-item'));
  const toggle = document.getElementById('layoutToggle');
  const iconGrid = document.getElementById('icon-grid');
  const iconList = document.getElementById('icon-list');
  
  let currentFilter = 'all';
  // Load saved layout preference or default to list view
  let listView = localStorage.getItem(LAYOUT_KEY) === 'grid' ? false : true;
  let isInitialized = false;

  // Wait for GSAP Flip to load
  function ready(cb) {
    if (window.gsap && window.Flip) return cb();
    
    const maxAttempts = 100;
    let attempts = 0;
    
    const interval = setInterval(() => {
      attempts++;
      if (window.gsap && window.Flip) {
        clearInterval(interval);
        cb();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('GSAP or Flip failed to load');
      }
    }, 50);
  }

  ready(() => {
    gsap.registerPlugin(Flip);

    // Filter functionality
    function updateLayout(animate = true) {
      if (!animate) {
        // Just update visibility without animation
        cards.forEach(card => {
          const cardCategory = (card.dataset.category || '').toLowerCase();
          const match = currentFilter === 'all' || cardCategory === currentFilter.toLowerCase();
          card.style.display = match ? '' : 'none';
        });
        return;
      }

      const state = Flip.getState(cards);
      
      // Show/hide cards based on filter
      cards.forEach(card => {
        const cardCategory = (card.dataset.category || '').toLowerCase();
        const match = currentFilter === 'all' || cardCategory === currentFilter.toLowerCase();
        card.style.display = match ? '' : 'none';
      });
      
      // Animate with Flip
      Flip.from(state, {
        duration: 0.4,
        ease: 'power2.inOut',
        absolute: true,
        stagger: 0.02
      });
    }

    // Filter button clicks
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        
        // Update active state
        buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', b === btn);
        });
        
        updateLayout(true);
      });
    });

    // Layout toggle (Grid/List)
    if (toggle) {
      // Apply initial layout state
      grid.classList.toggle('list-view', listView);
      iconGrid.classList.toggle('hidden', !listView);
      iconList.classList.toggle('hidden', listView);
      
      toggle.addEventListener('click', () => {
        const state = Flip.getState(cards);
        listView = !listView;
        
        // Save preference to localStorage
        localStorage.setItem(LAYOUT_KEY, listView ? 'list' : 'grid');
        
        grid.classList.toggle('list-view', listView);
        // Show grid icon when in list view, show list icon when in grid view
        iconGrid.classList.toggle('hidden', !listView);
        iconList.classList.toggle('hidden', listView);
        
        Flip.from(state, {
          duration: 0.4,
          ease: 'power2.inOut',
          absolute: true,
          stagger: 0.015
        });
      });
    }

    // Set cards to invisible initially using GSAP (no transform)
    gsap.set(cards, { opacity: 0 });

    // Initial layout update (no animation)
    updateLayout(false);

    // Delayed initial fade-in animation (opacity only)
    setTimeout(() => {
      const visibleCards = cards.filter(card => card.style.display !== 'none');
      
      gsap.to(visibleCards, { 
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out'
      });
      
      isInitialized = true;
    }, 400);
  });
})();