/**
 * Comil Group - Global Layout Component
 * Renders the shared Header, Mobile Navigation Drawer, and Footer
 * using clean semantic HTML and data-i18n attributes.
 */

import { initCartDrawer, updateCartBadge, openCartDrawer } from './cartDrawer.js';
export { initCartDrawer, updateCartBadge, openCartDrawer };

/**
 * Generates the semantic header HTML string
 * @returns {string}
 */
export function getHeaderMarkup() {
  return `
  <!-- Unified Full-Width White Navbar (Vertically Centered, Logo Far Right, Language next to Cart) -->
  <div class="bg-white/95 backdrop-blur-md border-b border-navy-200/80 sticky top-0 z-30 transition-shadow duration-200 shadow-sm" id="main-nav-bar">
    <div class="w-full px-3 sm:px-6 lg:px-12">
      <div class="flex items-center justify-between h-16 sm:h-20 md:h-24">
        
        <!-- Brand Wordmark / Logo (Far Right in Arabic RTL) -->
        <a href="products.html" class="flex flex-col group focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-1 shrink-0">
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="w-2.5 sm:w-3 h-6 sm:h-8 bg-navy-900 rounded-sm inline-block group-hover:bg-amber-600 transition-colors duration-200"></span>
            <span class="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-navy-900 group-hover:text-navy-950 transition-colors">
              COMIL <span class="text-amber-600">GROUP</span>
            </span>
          </div>
          <span class="hidden sm:block text-[10px] sm:text-xs uppercase font-semibold tracking-wider text-navy-500 ms-4 sm:ms-5 -mt-0.5" data-i18n="nav.brandTagline">
            Commercial Kitchen & Hospitality Supplies
          </span>
        </a>

        <!-- Desktop Navigation Links (Centered in the Navbar) -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          <a
            href="products.html"
            data-nav-link="products.html"
            class="px-3.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-amber-600 hover:bg-navy-50/80 transition-colors"
            data-i18n="nav.home"
          >
            Home
          </a>
          <a
            href="products.html#catalog-section"
            data-nav-link="catalog"
            class="px-3.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-amber-600 hover:bg-navy-50/80 transition-colors"
            data-i18n="nav.products"
          >
            Products Catalog
          </a>
          <a
            href="products.html#about"
            data-nav-link="about"
            class="px-3.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-amber-600 hover:bg-navy-50/80 transition-colors"
            data-i18n="nav.about"
          >
            About Us
          </a>
          <a
            href="products.html#brands-section"
            data-nav-link="brands"
            class="px-3.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-amber-600 hover:bg-navy-50/80 transition-colors"
            data-i18n="nav.brands"
          >
            Brands
          </a>
          <a
            href="products.html#contact"
            data-nav-link="contact"
            class="px-3.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-amber-600 hover:bg-navy-50/80 transition-colors"
            data-i18n="nav.contact"
          >
            Contact
          </a>
        </nav>

        <!-- Actions: Language Toggle + Cart + Mobile Toggle (Vertically Centered) -->
        <div class="flex items-center gap-1 sm:gap-3 shrink-0">
          
          <!-- Bilingual Language Switcher Button (Directly next to Cart) -->
          <button
            type="button"
            data-action="toggle-language"
            data-i18n-aria="nav.switchLang"
            class="inline-flex items-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white text-navy-800 hover:text-amber-600 hover:border-amber-500/60 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-amber-500 font-bold text-xs shadow-xs cursor-pointer"
          >
            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <span class="font-bold tracking-wider text-[11px] sm:text-xs" data-lang-label>العربية</span>
          </button>

          <!-- Quotation Cart Button -->
          <button
            type="button"
            id="header-cart-btn"
            data-action="open-cart-modal"
            data-i18n-aria="nav.cart"
            aria-label="Quotation Cart"
            onclick="if(window.openCartDrawer) window.openCartDrawer(this);"
            class="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full text-navy-700 hover:text-amber-600 hover:bg-navy-50 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span id="header-cart-badge" class="absolute -top-1 -end-1 w-4 h-4 sm:w-5 sm:h-5 bg-amber-600 text-white rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center hidden">0</span>
          </button>

          <!-- Mobile Hamburger Toggle Button -->
          <button
            type="button"
            id="mobile-menu-toggle"
            data-i18n-aria="nav.openMenu"
            aria-expanded="false"
            aria-controls="mobile-drawer"
            class="lg:hidden inline-flex items-center justify-center p-2 sm:p-2.5 rounded-md text-navy-700 hover:text-navy-950 hover:bg-navy-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <svg id="hamburger-icon" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Mobile Drawer Backdrop Overlay -->
  <div
    id="drawer-backdrop"
    class="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0 pointer-events-none"
    aria-hidden="true"
  ></div>

  <!-- Mobile Drawer Sheet -->
  <div
    id="mobile-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation Menu"
    class="mobile-drawer fixed top-0 bottom-0 z-50 w-full max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 pointer-events-none"
  >
    <!-- Drawer Top Header -->
    <div class="flex items-center justify-between p-5 border-b border-navy-100">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-6 bg-navy-900 rounded-sm inline-block"></span>
        <span class="font-extrabold text-lg tracking-tight text-navy-900">
          COMIL <span class="text-amber-600">GROUP</span>
        </span>
      </div>
      <button
        type="button"
        id="mobile-menu-close"
        data-i18n-aria="nav.closeMenu"
        class="p-2 rounded-md text-navy-500 hover:text-navy-900 hover:bg-navy-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Drawer Navigation Links -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
      <a
        href="products.html"
        data-nav-link="products.html"
        class="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-navy-800 hover:bg-navy-50 hover:text-amber-600 transition-colors"
      >
        <span data-i18n="nav.home">Home</span>
        <svg class="w-4 h-4 rtl-flip text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href="products.html#catalog-section"
        data-nav-link="catalog"
        class="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-navy-800 hover:bg-navy-50 hover:text-amber-600 transition-colors"
      >
        <span data-i18n="nav.products">Products Catalog</span>
        <svg class="w-4 h-4 rtl-flip text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href="products.html#about"
        data-nav-link="about"
        class="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-navy-800 hover:bg-navy-50 hover:text-amber-600 transition-colors"
      >
        <span data-i18n="nav.about">About Us</span>
        <svg class="w-4 h-4 rtl-flip text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href="products.html#brands-section"
        data-nav-link="brands"
        class="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-navy-800 hover:bg-navy-50 hover:text-amber-600 transition-colors"
      >
        <span data-i18n="nav.brands">Brands</span>
        <svg class="w-4 h-4 rtl-flip text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href="products.html#contact"
        data-nav-link="contact"
        class="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-navy-800 hover:bg-navy-50 hover:text-amber-600 transition-colors"
      >
        <span data-i18n="nav.contact">Contact</span>
        <svg class="w-4 h-4 rtl-flip text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>

      <!-- Drawer Language Switcher Button -->
      <div class="pt-6 mt-6 border-t border-navy-100">
        <button
          type="button"
          data-action="toggle-language"
          class="w-full flex items-center justify-between px-4 py-3 rounded-md border border-navy-200 bg-navy-50 text-navy-900 font-medium hover:border-amber-500 hover:bg-white transition-colors"
        >
          <span class="inline-flex items-center gap-2">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <span data-i18n="nav.switchLang">Switch Language</span>
          </span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-navy-200 text-navy-800" data-lang-label>العربية</span>
        </button>
      </div>
    </div>

    <!-- Drawer Footer Actions -->
    <div class="p-4 border-t border-navy-100 bg-navy-50/70">
      <a
        href="products.html#contact"
        data-action="open-quote-modal"
        data-product-name="Turnkey Kitchen Engineering Project"
        data-product-sku="COMIL-TURNKEY"
        class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm transition-colors"
      >
        <span data-i18n="nav.quoteCTA">Request a Quote</span>
        <svg class="w-4 h-4 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </a>
    </div>
  </div>
  `;
}

/**
 * Generates the semantic footer HTML string
 * @returns {string}
 */
export function getFooterMarkup() {
  return `
  <!-- Main Corporate Footer -->
  <div class="bg-navy-900 text-navy-200 border-t border-navy-800 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid: 4 Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-navy-800">
        
        <!-- Column 1: Brand & Sector Profile (lg: 4 cols) -->
        <div class="sm:col-span-2 lg:col-span-4 space-y-4">
          <a href="products.html" class="inline-flex items-center gap-2 group">
            <span class="w-3 h-7 bg-amber-500 rounded-sm inline-block group-hover:bg-amber-400 transition-colors"></span>
            <span class="font-extrabold text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
              COMIL <span class="text-amber-500 group-hover:text-amber-300">GROUP</span>
            </span>
          </a>
          <p class="text-navy-300 text-sm leading-relaxed" data-i18n="footer.description">
            B2B supplier of commercial-grade kitchen equipment, refrigeration systems, and food preparation machinery for hotels, restaurants, and catering operations.
          </p>
        </div>

        <!-- Column 2: Quick Navigation Links (lg: 2 cols) -->
        <div class="sm:col-span-1 lg:col-span-2 space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-white border-b border-navy-800 pb-2" data-i18n="footer.navTitle">
            Quick Navigation
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a href="products.html" class="hover:text-amber-400 transition-colors" data-i18n="nav.home">Home</a>
            </li>
            <li>
              <a href="products.html#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="nav.products">Products Catalog</a>
            </li>
            <li>
              <a href="products.html#about" class="hover:text-amber-400 transition-colors" data-i18n="nav.about">About Us</a>
            </li>
            <li>
              <a href="products.html#brands-section" class="hover:text-amber-400 transition-colors" data-i18n="nav.brands">Brands</a>
            </li>
            <li>
              <a href="products.html#contact" class="hover:text-amber-400 transition-colors" data-i18n="nav.contact">Contact</a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Equipment Categories (lg: 3 cols) -->
        <div class="sm:col-span-1 lg:col-span-3 space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-white border-b border-navy-800 pb-2" data-i18n="footer.sectorsTitle">
            Equipment Categories
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a href="products.html?category=cooking#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catCooking">Commercial Cooking</a>
            </li>
            <li>
              <a href="products.html?category=refrigeration#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catRefrigeration">Commercial Refrigeration</a>
            </li>
            <li>
              <a href="products.html?category=warewashing#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catWarewashing">Warewashing & Sanitation</a>
            </li>
            <li>
              <a href="products.html?category=food-prep#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catFoodPrep">Food Preparation</a>
            </li>
            <li>
              <a href="products.html?category=bakery#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catBakery">Bakery & Pastry Equipment</a>
            </li>
            <li>
              <a href="products.html?category=buffet#catalog-section" class="hover:text-amber-400 transition-colors" data-i18n="footer.catBuffet">Buffet & Beverage Systems</a>
            </li>
          </ul>
        </div>

        <!-- Column 4: Showroom Coordinates (lg: 3 cols) -->
        <div class="sm:col-span-2 lg:col-span-3 space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-white border-b border-navy-800 pb-2" data-i18n="footer.contactTitle">
            Showroom & Inquiries
          </h3>
          <div class="space-y-3 text-sm text-navy-300">
            <div>
              <p class="font-medium text-navy-200 text-xs" data-i18n="footer.addressLabel">Showroom Address:</p>
              <a href="products.html#contact" class="hover:text-amber-400 transition-colors block text-navy-300" data-i18n="footer.addressPlaceholder">Commercial District, Main Showroom (Placeholder)</a>
            </div>
           
            <div>
              <p class="font-medium text-navy-200 text-xs" data-i18n="footer.inquiryLabel">Inquiry Desk:</p>
              <button
                type="button"
                data-action="open-quote-modal"
                data-product-name="General Commercial Inquiry"
                data-product-sku="COMIL-INQUIRY"
                class="text-amber-400 hover:text-amber-300 hover:underline font-semibold text-xs sm:text-sm text-start flex items-center gap-1.5 transition-colors cursor-pointer mt-1"
              >
                <span data-i18n="footer.inquiryPlaceholder">Available via Request a Quote portal</span>
                <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Strip: Legal -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-400">
        <p data-i18n="footer.copyright">© Comil Group. All rights reserved.</p>
      </div>

    </div>
  </div>
  `;
}

/**
 * Initializes and mounts shared layout components
 */
export function initLayout() {
  const headerContainer = document.getElementById('site-header');
  if (headerContainer && headerContainer.children.length === 0) {
    headerContainer.innerHTML = getHeaderMarkup();
  }

  const footerContainer = document.getElementById('site-footer');
  if (footerContainer && footerContainer.children.length === 0) {
    footerContainer.innerHTML = getFooterMarkup();
  }

  // Highlight active page link based on current URL path
  highlightActiveNavLink();

  // Mount e-commerce shopping cart drawer and sync badge on all pages
  initCartDrawer();
  updateCartBadge();

  // Direct click binding on header cart button as explicit guarantee
  const headerCartBtn = document.getElementById('header-cart-btn');
  if (headerCartBtn) {
    headerCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer(headerCartBtn);
    });
  }
}

/**
 * Compares current window pathname with nav links and applies active state
 */
export function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach((link) => {
    const targetPath = link.getAttribute('data-nav-link');
    if (targetPath === currentPath) {
      link.classList.add('text-amber-600', 'font-semibold', 'bg-navy-50/90');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('text-amber-600', 'font-semibold', 'bg-navy-50/90');
      link.removeAttribute('aria-current');
    }
  });
}
