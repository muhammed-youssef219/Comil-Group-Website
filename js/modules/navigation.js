/**
 * Comil Group - Responsive Navigation & Accessible Mobile Drawer
 * Handles mobile drawer toggling, focus trapping, Escape key dismiss,
 * backdrop clicks, active link indicators, and sticky header scrolling.
 */

let isDrawerOpen = false;
let previouslyFocusedElement = null;

/**
 * Opens the mobile navigation drawer with proper accessibility management
 */
export function openDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mainContent = document.getElementById('main-content');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!drawer || !backdrop) return;

  previouslyFocusedElement = document.activeElement;
  isDrawerOpen = true;

  // Update ARIA
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  // Prevent background scrolling
  document.body.classList.add('overflow-hidden');

  // Activate backdrop
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');

  // Slide drawer into view
  drawer.classList.add('is-open');

  // Make background content inert to keyboard and screen readers
  if (mainContent) {
    mainContent.inert = true;
  }

  // Move focus to close button
  setTimeout(() => {
    if (closeBtn) {
      closeBtn.focus();
    }
  }, 100);
}

/**
 * Closes the mobile navigation drawer and restores focus
 */
export function closeDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mainContent = document.getElementById('main-content');

  if (!drawer || !backdrop || !isDrawerOpen) return;

  isDrawerOpen = false;

  // Update ARIA
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  // Re-enable background scrolling
  document.body.classList.remove('overflow-hidden');

  // Hide backdrop
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  backdrop.classList.add('opacity-0', 'pointer-events-none');

  // Slide drawer out of view
  drawer.classList.remove('is-open');

  // Remove inert from main content
  if (mainContent) {
    mainContent.inert = false;
  }

  // Return focus to previously focused element or toggle button
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
    previouslyFocusedElement.focus();
  } else if (toggleBtn) {
    toggleBtn.focus();
  }
}

/**
 * Traps keyboard focus within the drawer when open
 * @param {KeyboardEvent} e
 */
function handleDrawerKeyDown(e) {
  if (!isDrawerOpen) return;

  // Escape key closes drawer immediately
  if (e.key === 'Escape') {
    e.preventDefault();
    closeDrawer();
    return;
  }

  // Tab key focus trap
  if (e.key === 'Tab') {
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(drawer.querySelectorAll(focusableSelectors)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: if on first element, wrap to last
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: if on last element, wrap to first
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

/**
 * Handles sticky header shadow and styling on scroll
 */
function handleScroll() {
  const navBar = document.getElementById('main-nav-bar');
  if (!navBar) return;

  if (window.scrollY > 20) {
    navBar.classList.add('shadow-md', 'border-navy-300');
    navBar.classList.remove('border-navy-200/80');
  } else {
    navBar.classList.remove('shadow-md', 'border-navy-300');
    navBar.classList.add('border-navy-200/80');
  }
}

/**
 * Closes drawer if resized to desktop viewport
 */
function handleResize() {
  if (window.innerWidth >= 1024 && isDrawerOpen) {
    closeDrawer();
  }
}

let isNavInitialized = false;

/**
 * Initializes navigation event handlers
 */
export function initNavigation() {
  if (isNavInitialized) return;
  isNavInitialized = true;

  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const backdrop = document.getElementById('drawer-backdrop');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Auto-close mobile drawer when any navigation link is clicked
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        closeDrawer();
      }
    });
  }

  // Keyboard navigation & Escape key dismiss
  document.addEventListener('keydown', handleDrawerKeyDown);

  // Scroll listener for sticky header styling
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Breakpoint listener
  window.addEventListener('resize', handleResize);
}
