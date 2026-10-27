/**
 * Comil Group - Products Catalog Module
 * Phase 3: Filtering, Search, Sorting, URL State Sync, Safe Rendering,
 * and Accessible Commercial Quotation Modal.
 */

import { products, categories } from '../data/products.js';
import { getTranslation, getActiveLanguage } from './i18n.js';
import {
  initCartDrawer,
  openCartDrawer,
  renderCartDrawerContent,
  getCartItems,
  saveCartItems,
  updateCartBadge
} from './cartDrawer.js';

export { getCartItems, saveCartItems, updateCartBadge, initCartDrawer, openCartDrawer, renderCartDrawerContent };

// Internal Catalog Filter & Sort State
const catalogState = {
  category: 'all',
  search: '',
  sort: 'featured',
};

let lastTriggerButton = null;

/**
 * Parses URL query parameters to restore state on initial load
 */
export function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  
  // Category parameter
  const categoryParam = params.get('category');
  const validCategory = categories.some((c) => c.id === categoryParam);
  catalogState.category = validCategory ? categoryParam : 'all';

  // Search parameter
  const searchParam = params.get('search');
  catalogState.search = searchParam ? searchParam.trim() : '';

  // Sort parameter
  const sortParam = params.get('sort');
  if (['featured', 'name-asc', 'name-desc'].includes(sortParam)) {
    catalogState.sort = sortParam;
  } else {
    catalogState.sort = 'featured';
  }

  // Open Quote Modal from checkout intent if redirected
  if (params.get('openQuote') === 'cart') {
    setTimeout(() => {
      const cart = getCartItems();
      if (cart.length > 0) {
        const summary = cart.map((i) => `${i.name} (x${i.quantity || 1})`).join(', ');
        const skuList = cart.map((i) => i.sku || 'DEMO').join(', ');
        openQuoteModal(summary, `CART: ${skuList}`, null);
      }
    }, 250);
  }
}

/**
 * Updates URL search parameters to match current state without page reload
 */
export function syncUrlParameters() {
  const url = new URL(window.location.href);

  if (catalogState.category && catalogState.category !== 'all') {
    url.searchParams.set('category', catalogState.category);
  } else {
    url.searchParams.delete('category');
  }

  if (catalogState.search) {
    url.searchParams.set('search', catalogState.search);
  } else {
    url.searchParams.delete('search');
  }

  if (catalogState.sort && catalogState.sort !== 'featured') {
    url.searchParams.set('sort', catalogState.sort);
  } else {
    url.searchParams.delete('sort');
  }

  window.history.replaceState(null, '', url.toString());
}

/**
 * Filters and sorts products array based on current catalogState
 * @param {string} lang - 'en' | 'ar'
 * @returns {Array}
 */
export function getFilteredProducts(lang = getActiveLanguage()) {
  let list = [...products];

  // 1. Category Filter
  if (catalogState.category && catalogState.category !== 'all') {
    list = list.filter((p) => p.category === catalogState.category);
  }

  // 2. Keyword Search
  if (catalogState.search) {
    const query = catalogState.search.toLowerCase();
    list = list.filter((p) => {
      const nameEn = (p.name.en || '').toLowerCase();
      const nameAr = (p.name.ar || '').toLowerCase();
      const descEn = (p.shortDescription.en || '').toLowerCase();
      const descAr = (p.shortDescription.ar || '').toLowerCase();
      const sku = (p.sku || '').toLowerCase();
      return (
        nameEn.includes(query) ||
        nameAr.includes(query) ||
        descEn.includes(query) ||
        descAr.includes(query) ||
        sku.includes(query)
      );
    });
  }

  // 3. Sorting
  if (catalogState.sort === 'name-asc') {
    list.sort((a, b) => {
      const nameA = a.name[lang] || a.name.en;
      const nameB = b.name[lang] || b.name.en;
      return nameA.localeCompare(nameB, lang === 'ar' ? 'ar' : 'en');
    });
  } else if (catalogState.sort === 'name-desc') {
    list.sort((a, b) => {
      const nameA = a.name[lang] || a.name.en;
      const nameB = b.name[lang] || b.name.en;
      return nameB.localeCompare(nameA, lang === 'ar' ? 'ar' : 'en');
    });
  } else {
    // Default 'featured': featured first, then original order
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return list;
}



function handleAddToCart(productId, productName, productSku, btn) {
  const cart = getCartItems();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ id: productId, name: productName, sku: productSku, quantity: 1 });
  }
  saveCartItems(cart);

  const lang = getActiveLanguage();
  if (btn) {
    const originalText = getTranslation('catalog.addToCart', lang);
    const addedText = `✓ ${getTranslation('catalog.addedToCart', lang)}`;
    btn.textContent = addedText;
    btn.classList.remove('bg-navy-100', 'text-navy-800');
    btn.classList.add('bg-emerald-600', 'text-white');

    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('bg-emerald-600', 'text-white');
      btn.classList.add('bg-navy-100', 'text-navy-800');
    }, 1200);
  }

  // Open e-commerce Cart Drawer to show added product
  openCartDrawer(btn);
}

/**
 * Safely creates a minimalist 5-column product card DOM element matching the reference layout.
 * Shows ONLY image, product name, and "Add to Cart" button, linking to product-details.html.
 * @param {Object} product
 * @param {string} lang
 * @returns {HTMLElement}
 */
function createProductCard(product, lang) {
  const card = document.createElement('article');
  card.className = 'bg-white rounded-xl border border-navy-100/90 shadow-sm hover:shadow-md hover:border-navy-300 transition-all duration-200 flex flex-col justify-between p-3 sm:p-4 text-center group relative';

  const name = product.name[lang] || product.name.en;
  const detailUrl = `product-details.html?id=${encodeURIComponent(product.id)}`;

  // 1. Image Container (Link to product details page)
  const imgLink = document.createElement('a');
  imgLink.href = detailUrl;
  imgLink.className = 'block aspect-square w-full rounded-lg bg-navy-50/50 p-3 sm:p-4 mb-2.5 flex items-center justify-center overflow-hidden group-hover:scale-[1.03] transition-transform duration-200';
  imgLink.setAttribute('aria-label', name);

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = name;
  img.loading = 'lazy';
  img.className = 'max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300';
  img.onerror = () => {
    img.style.display = 'none';
  };
  imgLink.appendChild(img);
  card.appendChild(imgLink);

  // 2. Product Name Only (Link to product details page)
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'flex-1 flex items-center justify-center mb-3';

  const titleLink = document.createElement('a');
  titleLink.href = detailUrl;
  titleLink.className = 'text-xs sm:text-sm font-bold text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center leading-snug';
  titleLink.textContent = name;
  titleWrapper.appendChild(titleLink);
  card.appendChild(titleWrapper);

  // 3. Add to Cart Button (أضف إلى السلة)
  const addToCartBtn = document.createElement('button');
  addToCartBtn.type = 'button';
  addToCartBtn.className = 'w-full py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold bg-navy-100 hover:bg-navy-900 text-navy-800 hover:text-white transition-all duration-150 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm active:scale-95 flex items-center justify-center gap-1 cursor-pointer';
  addToCartBtn.setAttribute('data-action', 'add-to-cart');
  addToCartBtn.setAttribute('data-product-id', product.id);
  addToCartBtn.setAttribute('data-product-sku', product.sku);
  addToCartBtn.setAttribute('data-product-name', name);
  addToCartBtn.textContent = getTranslation('catalog.addToCart', lang);

  card.appendChild(addToCartBtn);

  return card;
}

/**
 * Updates the Active Filters Chips strip
 * @param {string} lang
 */
function updateActiveChips(lang) {
  const container = document.getElementById('catalog-active-chips');
  if (!container) return;

  container.innerHTML = '';
  const hasCategory = catalogState.category && catalogState.category !== 'all';
  const hasSearch = Boolean(catalogState.search);

  if (!hasCategory && !hasSearch) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');

  // Category Tag Chip
  if (hasCategory) {
    const catObj = categories.find((c) => c.id === catalogState.category);
    const catName = catObj ? (catObj[`name_${lang}`] || catObj.name_en) : catalogState.category;

    const chip = document.createElement('span');
    chip.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-semibold';
    chip.innerHTML = `
      <span class="text-navy-500">${getTranslation('catalog.activeCategory', lang)}</span>
      <span>${catName}</span>
      <button type="button" data-action="remove-cat-chip" class="ms-1 hover:text-red-600 focus:outline-none" aria-label="${getTranslation('catalog.clearFilter', lang)}">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;
    container.appendChild(chip);
  }

  // Search Tag Chip
  if (hasSearch) {
    const chip = document.createElement('span');
    chip.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold';
    chip.innerHTML = `
      <span class="text-amber-700">${getTranslation('catalog.activeSearch', lang)}</span>
      <span class="truncate max-w-[140px]">"${catalogState.search}"</span>
      <button type="button" data-action="remove-search-chip" class="ms-1 hover:text-red-600 focus:outline-none" aria-label="${getTranslation('catalog.clearFilter', lang)}">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;
    container.appendChild(chip);
  }
}

/**
 * Opens the accessible quotation modal for a specific equipment model
 * @param {string} productName
 * @param {string} sku
 * @param {HTMLElement} triggerBtn
 */
export function openQuoteModal(productName, sku, triggerBtn = null) {
  lastTriggerButton = triggerBtn;

  const backdrop = document.getElementById('quote-modal-backdrop');
  const modal = document.getElementById('quote-modal');
  const modalProdName = document.getElementById('quote-modal-product-name');
  const modalProdSku = document.getElementById('quote-modal-product-sku');
  const modalBody = document.getElementById('quote-modal-body');
  const modalSuccess = document.getElementById('quote-modal-success');
  const form = document.getElementById('quote-modal-form');
  const errorMsg = document.getElementById('quote-form-error');

  if (!backdrop || !modal) return;

  if (modalProdName) modalProdName.textContent = productName;
  if (modalProdSku) modalProdSku.textContent = sku;

  // Reset form views
  if (modalBody) modalBody.classList.remove('hidden');
  if (form) form.classList.remove('hidden');
  if (modalSuccess) modalSuccess.classList.add('hidden');
  if (errorMsg) errorMsg.classList.add('hidden');
  if (form) form.reset();

  // Show modal
  document.body.classList.add('overflow-hidden');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');
  modal.classList.remove('scale-95');
  modal.classList.add('scale-100');

  // Focus first input
  setTimeout(() => {
    const firstInput = document.getElementById('quote-company-name');
    if (firstInput) firstInput.focus();
  }, 100);
}

/**
 * Closes the quotation modal and returns focus
 */
export function closeQuoteModal() {
  const backdrop = document.getElementById('quote-modal-backdrop');
  const modal = document.getElementById('quote-modal');

  if (!backdrop || !modal) return;

  document.body.classList.remove('overflow-hidden');
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('scale-100');
  modal.classList.add('scale-95');

  if (lastTriggerButton && typeof lastTriggerButton.focus === 'function') {
    lastTriggerButton.focus();
  }
}

/**
 * Handles test quotation form submission with client-side validation
 * @param {Event} e
 */
function handleQuoteSubmit(e) {
  e.preventDefault();
  const companyInput = document.getElementById('quote-company-name');
  const emailInput = document.getElementById('quote-contact-email');
  const errorMsg = document.getElementById('quote-form-error');
  const form = document.getElementById('quote-modal-form');
  const modalBody = document.getElementById('quote-modal-body');
  const modalSuccess = document.getElementById('quote-modal-success');

  const companyVal = companyInput ? companyInput.value.trim() : '';
  const emailVal = emailInput ? emailInput.value.trim() : '';

  if (!companyVal || !emailVal || !emailVal.includes('@')) {
    if (errorMsg) errorMsg.classList.remove('hidden');
    return;
  }

  if (errorMsg) errorMsg.classList.add('hidden');

  // Switch to success confirmation state
  if (form) form.classList.add('hidden');
  if (modalBody) modalBody.classList.add('hidden');
  if (modalSuccess) modalSuccess.classList.remove('hidden');

  // Focus close button inside success state
  setTimeout(() => {
    const successClose = document.getElementById('quote-modal-success-close');
    if (successClose) successClose.focus();
  }, 50);
}

/**
 * Renders the product grid, result counts, and empty state
 */
export function renderCatalog() {
  const lang = getActiveLanguage();
  const gridContainer = document.getElementById('catalog-grid');
  const emptyState = document.getElementById('catalog-empty-state');
  const resultsCounter = document.getElementById('catalog-results-count');
  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort-select');

  if (!gridContainer) return;

  // Sync input and sort values with state
  if (searchInput && searchInput.value !== catalogState.search) {
    searchInput.value = catalogState.search;
  }
  if (sortSelect && sortSelect.value !== catalogState.sort) {
    sortSelect.value = catalogState.sort;
  }

  // Update Category Buttons active state
  const categoryButtons = document.querySelectorAll('[data-category-filter]');
  categoryButtons.forEach((btn) => {
    const catId = btn.getAttribute('data-category-filter');
    if (catId === catalogState.category) {
      btn.classList.add('bg-navy-900', 'text-white', 'border-navy-900', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-navy-700', 'border-navy-200');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('bg-navy-900', 'text-white', 'border-navy-900', 'shadow-sm');
      btn.classList.add('bg-white', 'text-navy-700', 'border-navy-200');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  const filtered = getFilteredProducts(lang);

  // Update Result Count String
  if (resultsCounter) {
    const countTemplate = getTranslation('catalog.resultsCount', lang);
    resultsCounter.textContent = countTemplate
      .replace('{count}', String(filtered.length))
      .replace('{total}', String(products.length));
  }

  // Update Active Filter Tags Strip
  updateActiveChips(lang);

  // Clear existing cards
  gridContainer.innerHTML = '';

  if (filtered.length === 0) {
    // Show empty state
    if (emptyState) emptyState.classList.remove('hidden');
    gridContainer.classList.add('hidden');
  } else {
    // Show grid
    if (emptyState) emptyState.classList.add('hidden');
    gridContainer.classList.remove('hidden');

    const fragment = document.createDocumentFragment();
    filtered.forEach((p) => {
      const card = createProductCard(p, lang);
      fragment.appendChild(card);
    });
    gridContainer.appendChild(fragment);
  }

  // Synchronize state to URL query parameters
  syncUrlParameters();
}

/**
 * Resets all catalog filters to default
 */
export function resetFilters() {
  catalogState.category = 'all';
  catalogState.search = '';
  catalogState.sort = 'featured';

  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  renderCatalog();
}

let isCatalogInitialized = false;

/**
 * Initializes catalog interactivity, listeners, and URL parameters
 */
export function initCatalog() {
  const catalogGrid = document.getElementById('catalog-grid');
  if (!catalogGrid) return; // Not on products page

  if (isCatalogInitialized) {
    renderCatalog();
    return;
  }
  isCatalogInitialized = true;

  // 1. Read initial state from URL
  parseUrlParameters();

  // 2. Hydrate Quotation Cart Badge
  updateCartBadge();

  // 2. Global click delegator
  document.addEventListener('click', (e) => {
    // Category filter button click
    const catBtn = e.target.closest('[data-category-filter]');
    if (catBtn) {
      e.preventDefault();
      const targetCategory = catBtn.getAttribute('data-category-filter');
      if (targetCategory && targetCategory !== catalogState.category) {
        catalogState.category = targetCategory;
        renderCatalog();
      }
      return;
    }

    // Category link click (e.g. from footer categories)
    const catLink = e.target.closest('a[href*="category="]');
    if (catLink && (window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('product-details'))) {
      const url = new URL(catLink.href, window.location.origin);
      const catParam = url.searchParams.get('category');
      if (catParam) {
        e.preventDefault();
        catalogState.category = catParam;
        renderCatalog();
        const catalogSec = document.getElementById('catalog-section');
        if (catalogSec) {
          catalogSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.history.pushState(null, '', `products.html?category=${catParam}#catalog-section`);
        return;
      }
    }

    // In-page hash link smooth scrolling (e.g. #brands-section, #about, #contact, #catalog-section)
    const hashLink = e.target.closest('a[href*="#"]');
    if (hashLink && (window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('product-details'))) {
      const href = hashLink.getAttribute('href');
      if (href && href.includes('#')) {
        const hash = href.split('#')[1];
        if (hash) {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${hash}`);
            return;
          }
        }
      }
    }

    // Home link smooth scroll to top if already on products.html
    const homeLink = e.target.closest('a[href="products.html"]');
    if (homeLink && (window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('/'))) {
      const href = homeLink.getAttribute('href');
      if (href === 'products.html') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', 'products.html');
        return;
      }
    }

    // Sector Card click from Main Sectors section
    const sectorBtn = e.target.closest('[data-sector-target]');
    if (sectorBtn) {
      e.preventDefault();
      const target = sectorBtn.getAttribute('data-sector-target');
      if (target) {
        const catMap = {
          buffet: 'buffet',
          bakery: 'bakery',
          tableware: 'buffet',
          butchery: 'food-prep',
          barista: 'buffet',
          cooking: 'cooking',
          scales: 'food-prep',
          warewashing: 'warewashing',
          cookware: 'cooking',
          refrigeration: 'refrigeration'
        };
        const mappedCat = catMap[target] || 'all';
        catalogState.category = mappedCat;
        renderCatalog();
        const catalogSec = document.getElementById('catalog-section');
        if (catalogSec) {
          catalogSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    // Brand Card click from Search by Brand section
    const brandBtn = e.target.closest('[data-brand-filter]');
    if (brandBtn) {
      e.preventDefault();
      const brand = brandBtn.getAttribute('data-brand-filter');
      if (brand) {
        catalogState.search = brand;
        catalogState.category = 'all';
        const searchInput = document.getElementById('catalog-search-input');
        if (searchInput) {
          searchInput.value = brand;
        }
        renderCatalog();
        const catalogSec = document.getElementById('catalog-section');
        if (catalogSec) {
          catalogSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    // Reset filters trigger
    const resetBtn = e.target.closest('[data-action="reset-filters"]');
    if (resetBtn) {
      e.preventDefault();
      resetFilters();
      return;
    }

    // Remove active category chip
    const removeCatBtn = e.target.closest('[data-action="remove-cat-chip"]');
    if (removeCatBtn) {
      e.preventDefault();
      catalogState.category = 'all';
      renderCatalog();
      return;
    }

    // Remove active search chip
    const removeSearchBtn = e.target.closest('[data-action="remove-search-chip"]');
    if (removeSearchBtn) {
      e.preventDefault();
      catalogState.search = '';
      const searchInput = document.getElementById('catalog-search-input');
      if (searchInput) searchInput.value = '';
      renderCatalog();
      return;
    }

    // Add to Cart Action
    const addToCartBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addToCartBtn) {
      e.preventDefault();
      const id = addToCartBtn.getAttribute('data-product-id');
      const name = addToCartBtn.getAttribute('data-product-name');
      const sku = addToCartBtn.getAttribute('data-product-sku');
      handleAddToCart(id, name, sku, addToCartBtn);
      return;
    }

    // Open Cart Drawer from Header
    const openCartBtn = e.target.closest('[data-action="open-cart-modal"]');
    if (openCartBtn) {
      e.preventDefault();
      openCartDrawer(openCartBtn);
      return;
    }

    // Open Quote Modal
    const openQuoteBtn = e.target.closest('[data-action="open-quote-modal"]');
    if (openQuoteBtn) {
      e.preventDefault();
      const name = openQuoteBtn.getAttribute('data-product-name');
      const sku = openQuoteBtn.getAttribute('data-product-sku');
      openQuoteModal(name, sku, openQuoteBtn);
      return;
    }

    // Close Quote Modal buttons
    if (
      e.target.closest('#quote-modal-close') ||
      e.target.closest('#quote-modal-success-close') ||
      e.target.closest('#quote-modal-cancel-btn') ||
      e.target.id === 'quote-modal-backdrop'
    ) {
      e.preventDefault();
      closeQuoteModal();
      return;
    }
  });

  // 3. Search input listener with debounce
  const searchInput = document.getElementById('catalog-search-input');
  const clearSearchBtn = document.getElementById('catalog-clear-search');
  let searchDebounceTimer = null;

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        catalogState.search = e.target.value.trim();
        renderCatalog();
      }, 200);
    });

    // Keyboard shortcut: '/' focuses search input
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      catalogState.search = '';
      renderCatalog();
      searchInput.focus();
    });
  }

  // 4. Sort select listener
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      catalogState.sort = e.target.value;
      renderCatalog();
    });
  }

  // 5. Modal Keyboard Dismiss (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const backdrop = document.getElementById('quote-modal-backdrop');
      if (backdrop && !backdrop.classList.contains('pointer-events-none')) {
        closeQuoteModal();
      }
    }
  });

  // 6. Modal Form Submit
  const quoteForm = document.getElementById('quote-modal-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleQuoteSubmit);
  }

  // 7. Listen to language changes dispatched by i18n module
  document.addEventListener('comil:langchange', () => {
    renderCatalog();
    renderCartDrawerContent();
  });

  // 8. Initialize Cart Drawer
  initCartDrawer();

  // 9. Initial render
  renderCatalog();
}
