// animations.js – GSAP scroll animations (Reef style)
(function () {
  // Wait for GSAP and ScrollTrigger to load
  function waitForGsap(cb) {
    if (window.gsap && window.ScrollTrigger) return cb();
    
    const maxAttempts = 100;
    let attempts = 0;
    
    const interval = setInterval(() => {
      attempts++;
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(interval);
        cb();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('GSAP or ScrollTrigger failed to load');
      }
    }, 50);
  }

  waitForGsap(() => {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // Animate intro section (if exists)
      const intro = document.querySelector('.intro');
      if (intro) {
        gsap.from(intro, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Animate filter bar (if exists)
      const filterBar = document.querySelector('.filter-bar');
      if (filterBar) {
        gsap.from(filterBar, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out'
        });
      }

      // Wait for initial animations to complete, then set up scroll triggers
      setTimeout(() => {
        const items = document.querySelectorAll('.project-item');
        
        if (items.length > 0) {
          const windowHeight = window.innerHeight;
          
          items.forEach((item) => {
            // Skip hidden cards
            if (item.style.display === 'none') return;
            
            const rect = item.getBoundingClientRect();
            
            // Only add scroll animation to cards below the viewport
            if (rect.top > windowHeight * 0.9) {
              ScrollTrigger.create({
                trigger: item,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                  gsap.fromTo(item, 
                    { opacity: 0, y: 30 },
                    { 
                      opacity: 1, 
                      y: 0, 
                      duration: 0.6, 
                      ease: 'power2.out' 
                    }
                  );
                }
              });
            }
          });
        }

        // Mouse parallax on hover (desktop only)
        if (window.innerWidth > 768 && items.length > 0) {
          items.forEach(card => {
            const img = card.querySelector('.card-img');
            if (!img) return;

            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              const moveX = x * 8;
              const moveY = y * 6;
              
              gsap.to(img, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: 'power2.out'
              });
            });

            card.addEventListener('mouseleave', () => {
              gsap.to(img, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
              });
            });
          });
        }
      }, 1000);

    } catch (err) {
      console.warn('GSAP/ScrollTrigger error:', err);
    }
  });
})();