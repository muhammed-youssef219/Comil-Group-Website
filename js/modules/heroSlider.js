/**
 * Comil Group - Hero Equipment Slider
 * Phase 3: High-Impact Commercial Kitchen Equipment Carousel
 * 
 * Features:
 * - 3 Full-width high-resolution commercial equipment slides
 * - 2-second automatic slide transition (Autoplay: 2000ms)
 * - Touch swipe gesture support for mobile & tablet ("drag / swipe with hand")
 * - Mouse drag support for desktop
 * - Previous / Next controls & pagination dots
 * - Auto-pauses on hover and touch interaction
 * - Interactive CTAs that filter the catalog grid directly
 */

export function initHeroSlider() {
  const viewport = document.getElementById('hero-carousel-viewport');
  const track = document.getElementById('hero-carousel-track');
  const slides = document.querySelectorAll('[data-carousel-slide]');
  const prevBtn = document.getElementById('hero-carousel-prev');
  const nextBtn = document.getElementById('hero-carousel-next');
  const dots = document.querySelectorAll('[data-carousel-dot]');
  const ctaButtons = document.querySelectorAll('[data-slider-action="filter-category"]');

  if (!viewport || !track || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;
  const AUTOPLAY_INTERVAL = 2000; // 2 seconds, as explicitly requested by user
  let autoplayTimer = null;
  let isInteracting = false;

  // Swipe & Drag Gesture Tracking
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function updateSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    // Smooth horizontal translation
    // In our container with fixed LTR coordinate flow for slider math,
    // translating by -100% per slide gives deterministic cross-browser behavior
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update slides accessibility state (Keep 100% full brightness on all slides)
    slides.forEach((slide, idx) => {
      const isActive = idx === currentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.classList.remove('opacity-60');
      slide.classList.add('opacity-100');
    });

    // Update pagination dots
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        dot.classList.remove('w-2.5', 'bg-black/40', 'bg-white/50');
        dot.classList.add('w-8', 'bg-amber-500');
      } else {
        dot.classList.remove('w-8', 'bg-amber-500', 'bg-amber-400');
        dot.classList.add('w-2.5', 'bg-black/40');
      }
    });
  }

  function nextSlide() {
    updateSlider(currentIndex + 1);
  }

  function prevSlide() {
    updateSlider(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!isInteracting) {
      autoplayTimer = setInterval(() => {
        nextSlide();
      }, AUTOPLAY_INTERVAL);
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Prev / Next button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      restartAutoplay();
    });
  }

  // Dots listeners
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(dot.getAttribute('data-carousel-dot'), 10);
      if (!isNaN(targetIndex)) {
        updateSlider(targetIndex);
        restartAutoplay();
      }
    });
  });

  // Slide CTA integration: filters the catalog directly
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cat = btn.getAttribute('data-target-category');
      if (cat) {
        const catFilterBtn = document.querySelector(`button[data-category-filter="${cat}"]`);
        if (catFilterBtn) {
          catFilterBtn.click();
        }
        // Smooth scroll to catalog toolbar / grid
        const targetElement = document.getElementById('catalog-search-input') || document.getElementById('catalog-grid');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Hover pause / resume (Desktop)
  viewport.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopAutoplay();
  });

  viewport.addEventListener('mouseleave', () => {
    isInteracting = false;
    isDragging = false;
    startAutoplay();
  });

  // Touch Swipe Gesture ("سحبة إيدي")
  viewport.addEventListener('touchstart', (e) => {
    isInteracting = true;
    stopAutoplay();
    if (e.touches && e.touches.length > 0) {
      startX = e.touches[0].clientX;
      currentX = startX;
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      currentX = e.touches[0].clientX;
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isInteracting = false;
    const diffX = currentX - startX;
    const swipeThreshold = 40; // minimum 40px to trigger swipe

    if (Math.abs(diffX) > swipeThreshold) {
      const isRtl = document.documentElement.dir === 'rtl';
      if (diffX < 0) {
        // Swiped Left
        if (isRtl) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Swiped Right
        if (isRtl) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    startX = 0;
    currentX = 0;
    startAutoplay();
  });

  // Mouse Drag Support (Desktop Drag-to-Swipe)
  viewport.addEventListener('mousedown', (e) => {
    // Avoid interfering with button clicks
    if (e.target.closest('button')) return;
    isDragging = true;
    isInteracting = true;
    stopAutoplay();
    startX = e.clientX;
    currentX = startX;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    isInteracting = false;
    const diffX = currentX - startX;
    const dragThreshold = 50;

    if (Math.abs(diffX) > dragThreshold) {
      const isRtl = document.documentElement.dir === 'rtl';
      if (diffX < 0) {
        // Dragged Left
        if (isRtl) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Dragged Right
        if (isRtl) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    startX = 0;
    currentX = 0;
    startAutoplay();
  });

  // Keyboard navigation when viewport is focused
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      restartAutoplay();
    }
  });

  // Initialize first slide and start 2-second autoplay
  updateSlider(0);
  startAutoplay();
}
