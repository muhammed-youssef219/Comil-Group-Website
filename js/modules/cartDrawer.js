/**
 * Comil Group - E-Commerce Shopping Cart Drawer Module
 * Provides a modern slide-over cart drawer with real-time quantity adjustments,
 * product thumbnails, remove items, clear cart, empty state, and checkout integration.
 */

import { products, categories } from '../data/products.js';
import { getTranslation, getActiveLanguage } from './i18n.js';

export const CART_STORAGE_KEY = 'comil_quote_cart';

let isCartDrawerOpen = false;
let lastTriggerBtn = null;

/**
 * Retrieves the quotation cart items array from localStorage
 * @returns {Array<{id: string, name: string, sku: string, quantity: number}>}
 */
export function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch (err) {
    return [];
  }
}

/**
 * Saves cart items array to localStorage and triggers badge sync
 * @param {Array} items
 */
export function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateCartBadge();
  } catch (err) {
    console.error('Failed to save cart items', err);
  }
}

/**
 * Updates the header cart badge count
 */
export function updateCartBadge() {
  const badge = document.getElementById('header-cart-badge');
  if (!badge) return;
  const items = getCartItems();
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (totalCount > 0) {
    badge.textContent = String(totalCount);
    badge.classList.remove('hidden');
    badge.style.display = 'flex';
  } else {
    badge.classList.add('hidden');
    badge.style.display = 'none';
  }
}

/**
 * Generates the HTML markup for the Cart Drawer Backdrop & Sheet
 */
function getCartDrawerMarkup() {
  return `
  <!-- Cart Drawer Backdrop Overlay -->
  <div
    id="cart-drawer-backdrop"
    class="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 opacity-0 pointer-events-none"
    aria-hidden="true"
  ></div>

  <!-- Cart Drawer Sliding Sheet -->
  <aside
    id="cart-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Shopping Cart"
    class="cart-drawer fixed top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 pointer-events-none"
  >
    <!-- Cart Drawer Header -->
    <div class="flex items-center justify-between p-5 border-b border-navy-100 bg-slate-50/80">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div>
          <h2 class="font-extrabold text-lg text-navy-950 leading-tight" data-cart-title>
            سلة المشتريات
          </h2>
          <span class="text-xs text-navy-500 font-medium" id="cart-drawer-item-count">
            0 منتجات
          </span>
        </div>
      </div>

      <!-- Close Drawer Button -->
      <button
        type="button"
        id="cart-drawer-close"
        aria-label="Close Cart"
        class="w-8 h-8 rounded-full bg-white hover:bg-navy-100 text-navy-500 hover:text-navy-900 border border-slate-200 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Cart Drawer Dynamic Content Container -->
    <div id="cart-drawer-content" class="flex-1 flex flex-col overflow-hidden">
      <!-- Populated dynamically by renderCartDrawerContent() -->
    </div>
  </aside>
  `;
}

/**
 * Populates the Cart Drawer content based on current items
 */
export function renderCartDrawerContent() {
  const container = document.getElementById('cart-drawer-content');
  if (!container) return;

  const items = getCartItems();
  const lang = getActiveLanguage();
  const isAr = lang === 'ar';

  // Update header count and title
  const countEl = document.getElementById('cart-drawer-item-count');
  const titleEl = document.querySelector('[data-cart-title]');
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (titleEl) {
    titleEl.textContent = getTranslation('cartDrawer.title', lang) || (isAr ? 'سلة المشتريات' : 'Shopping Cart');
  }

  if (countEl) {
    const itemWord = totalCount === 1 
      ? (getTranslation('cartDrawer.itemSingle', lang) || (isAr ? 'منتج' : 'item'))
      : (getTranslation('cartDrawer.itemsCount', lang) || (isAr ? 'منتجات' : 'items'));
    countEl.textContent = `${totalCount} ${itemWord}`;
  }

  // 1. EMPTY CART STATE
  if (items.length === 0) {
    container.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div class="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <div class="space-y-1.5 max-w-xs">
          <h3 class="text-lg font-bold text-navy-900">
            ${getTranslation('cartDrawer.emptyTitle', lang) || 'سلتك فارغة حالياً'}
          </h3>
          <p class="text-xs text-navy-500 leading-relaxed">
            ${getTranslation('cartDrawer.emptySubtitle', lang) || 'تصفح أحدث معدات المطابخ والمطاعم والفنادق وأضف ما يحتاجه مشروعك إلى السلة.'}
          </p>
        </div>
        <button
          type="button"
          data-cart-action="browse-catalog"
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <svg class="w-4 h-4 text-amber-400 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
          <span>${getTranslation('cartDrawer.browseCatalogBtn', lang) || 'تصفح كتالوج المعدات'}</span>
        </button>
      </div>
    `;
    return;
  }

  // 2. POPULATED CART STATE
  const itemsHtml = items.map((item) => {
    // Find rich product data from catalog dataset
    const product = products.find((p) => p.id === item.id) || null;
    let name = item.name || '';
    if (product && product.name) {
      name = typeof product.name === 'object'
        ? (product.name[lang] || product.name.ar || product.name.en || item.name)
        : product.name;
    }
    const sku = item.sku || (product ? product.sku : 'DEMO-SKU');
    const image = product && product.image ? product.image : 'assets/images/products/cooking-range.jpg';
    const quantity = item.quantity || 1;
    const catObj = product ? categories.find((c) => c.id === product.category) : null;
    const catName = catObj ? (catObj[`name_${lang}`] || catObj.name_ar || catObj.name_en) : null;

    return `
      <div class="flex items-start gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 bg-white border border-slate-200/90 rounded-xl shadow-xs hover:border-amber-500/50 transition-colors group">
        <!-- Thumbnail -->
        <a href="product-details.html?id=${encodeURIComponent(item.id)}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0 relative block flex items-center justify-center p-1">
          <img src="${image}" alt="${name}" class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-200" loading="lazy">
        </a>

        <!-- Info & Controls -->
        <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div class="space-y-1.5">
            <div class="flex items-start justify-between gap-2">
              <a href="product-details.html?id=${encodeURIComponent(item.id)}" class="text-xs sm:text-sm font-bold text-navy-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                ${name}
              </a>
              <!-- Remove Item Button -->
              <button
                type="button"
                data-cart-action="remove"
                data-id="${item.id}"
                aria-label="${getTranslation('cartDrawer.removeBtn', lang) || 'حذف من السلة'}"
                title="${getTranslation('cartDrawer.removeBtn', lang) || 'حذف من السلة'}"
                class="text-slate-400 hover:text-red-600 p-1 rounded transition-colors shrink-0"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-navy-100 text-navy-800">
                ${sku}
              </span>
              ${catName ? `
                <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                  ${catName}
                </span>
              ` : ''}
              <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60">
                ${getTranslation('cartDrawer.directQuoteLabel', lang) || (isAr ? 'عرض سعر معتمد' : 'Certified Quotation')}
              </span>
            </div>
          </div>

          <!-- Quantity Stepper Controls -->
          <div class="pt-2 flex items-center justify-between">
            <div class="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                type="button"
                data-cart-action="dec"
                data-id="${item.id}"
                aria-label="Decrease quantity"
                class="w-7 h-7 rounded-md bg-white hover:bg-slate-200 text-navy-800 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              >
                −
              </button>
              <span class="w-8 text-center text-xs font-bold text-navy-950 font-mono">
                ${quantity}
              </span>
              <button
                type="button"
                data-cart-action="inc"
                data-id="${item.id}"
                aria-label="Increase quantity"
                class="w-7 h-7 rounded-md bg-white hover:bg-slate-200 text-navy-800 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
              >
                +
              </button>
            </div>

            <span class="text-[11px] font-bold text-navy-600">
              ${quantity} × ${getTranslation('cartDrawer.piecesLabel', lang) || 'أجهزة'}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Scrollable Items List -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100" id="cart-drawer-items-list">
      ${itemsHtml}
    </div>

    <!-- Drawer Footer / Summary & Actions -->
    <div class="p-5 border-t border-navy-100 bg-slate-50/90 space-y-3.5 shadow-lg">
      
      <!-- B2B Order Summary Strip -->
      <div class="flex items-center justify-between text-xs sm:text-sm">
        <span class="font-bold text-navy-700">
          ${getTranslation('cartDrawer.totalItemsLabel', lang) || 'إجمالي المعدات المختارة:'}
        </span>
        <span class="font-extrabold text-navy-950 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
          ${totalCount} ${getTranslation('cartDrawer.piecesLabel', lang) || 'أجهزة'}
        </span>
      </div>

      <!-- Commercial Quality / Warranty Note -->
      <div class="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 font-medium">
        <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span class="leading-tight">
          ${getTranslation('cartDrawer.b2bNotice', lang) || 'عروض أسعار تجارية مباشرة وموثقة بضمان الوكيل المعتمد.'}
        </span>
      </div>

      <!-- Primary Checkout Action -->
      <button
        type="button"
        data-cart-action="checkout"
        class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all duration-150 focus-visible:ring-4 focus-visible:ring-amber-400"
      >
        <svg class="w-4 h-4 rtl-flip shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>${getTranslation('cartDrawer.checkoutBtn', lang) || 'إتمام الطلب وطلب عرض الأسعار'}</span>
      </button>

      <!-- Secondary Controls: Continue Shopping & Clear Cart -->
      <div class="flex items-center justify-between text-xs pt-1">
        <button
          type="button"
          data-cart-action="close"
          class="font-semibold text-navy-600 hover:text-navy-950 transition-colors"
        >
          ← ${getTranslation('cartDrawer.continueShoppingBtn', lang) || 'متابعة التسوق'}
        </button>

        <button
          type="button"
          data-cart-action="clear"
          class="font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span>${getTranslation('cartDrawer.clearCartBtn', lang) || 'تفريغ السلة'}</span>
        </button>
      </div>

    </div>
  `;
}

/**
 * Ensures Cart Drawer markup is injected into document body
 */
export function ensureCartDrawerMounted() {
  if (!document.getElementById('cart-drawer')) {
    let wrapper = document.getElementById('cart-drawer-root');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'cart-drawer-root';
      document.body.appendChild(wrapper);
    }
    wrapper.innerHTML = getCartDrawerMarkup();
  }
}

/**
 * Opens the Cart Drawer
 * @param {HTMLElement|null} triggerBtn
 */
export function openCartDrawer(triggerBtn = null) {
  if (triggerBtn) {
    lastTriggerBtn = triggerBtn;
  }
  isCartDrawerOpen = true;

  ensureCartDrawerMounted();

  const backdrop = document.getElementById('cart-drawer-backdrop');
  const drawer = document.getElementById('cart-drawer');

  // Render fresh items list
  renderCartDrawerContent();

  if (backdrop && drawer) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    backdrop.style.opacity = '1';
    backdrop.style.pointerEvents = 'auto';

    drawer.classList.add('is-open');
    drawer.classList.remove('pointer-events-none');
    drawer.style.transform = 'translateX(0)';
    drawer.style.pointerEvents = 'auto';

    document.body.classList.add('overflow-hidden');

    // Accessibility focus on close button
    const closeBtn = document.getElementById('cart-drawer-close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }
}

/**
 * Closes the Cart Drawer
 */
export function closeCartDrawer() {
  isCartDrawerOpen = false;

  const backdrop = document.getElementById('cart-drawer-backdrop');
  const drawer = document.getElementById('cart-drawer');

  if (backdrop && drawer) {
    const isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100');
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';

    drawer.classList.remove('is-open');
    drawer.classList.add('pointer-events-none');
    drawer.style.transform = isRtl ? 'translateX(-100%)' : 'translateX(100%)';
    drawer.style.pointerEvents = 'none';

    document.body.classList.remove('overflow-hidden');

    if (lastTriggerBtn && typeof lastTriggerBtn.focus === 'function') {
      lastTriggerBtn.focus();
    }
  }
}

/**
 * Updates item quantity (+1 or -1)
 */
function updateItemQuantity(productId, delta) {
  const cart = getCartItems();
  const itemIndex = cart.findIndex((i) => i.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + delta;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCartItems(cart);
  renderCartDrawerContent();
  updateCartBadge();
}

/**
 * Removes a specific item from cart
 */
function removeCartItem(productId) {
  let cart = getCartItems();
  cart = cart.filter((i) => i.id !== productId);
  saveCartItems(cart);
  renderCartDrawerContent();
  updateCartBadge();
}

/**
 * Clears all items from cart
 */
function clearAllCart() {
  const lang = getActiveLanguage();
  const confirmMsg = getTranslation('cartDrawer.clearCartConfirm', lang) || 'هل أنت متأكد من رغبتك في تفريغ السلة؟';
  if (window.confirm(confirmMsg)) {
    saveCartItems([]);
    renderCartDrawerContent();
    updateCartBadge();
  }
}

/**
 * Proceeds to the quotation modal pre-filled with all cart items
 */
function proceedToCheckout() {
  const cart = getCartItems();
  if (cart.length === 0) return;

  const summary = cart.map((i) => `${i.name} (x${i.quantity || 1})`).join(', ');
  const skuList = cart.map((i) => i.sku || 'DEMO').join(', ');

  closeCartDrawer();

  const backdrop = document.getElementById('quote-modal-backdrop');
  const modal = document.getElementById('quote-modal');
  const modalProdName = document.getElementById('quote-modal-product-name');
  const modalProdSku = document.getElementById('quote-modal-product-sku');
  const modalBody = document.getElementById('quote-modal-body');
  const modalSuccess = document.getElementById('quote-modal-success');
  const form = document.getElementById('quote-modal-form');

  if (backdrop && modal) {
    if (modalProdName) modalProdName.textContent = summary;
    if (modalProdSku) modalProdSku.textContent = `CART: ${skuList}`;
    if (modalBody) modalBody.classList.remove('hidden');
    if (form) form.classList.remove('hidden');
    if (modalSuccess) modalSuccess.classList.add('hidden');
    if (form) form.reset();

    document.body.classList.add('overflow-hidden');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    modal.classList.remove('scale-95');
    modal.classList.add('scale-100');

    setTimeout(() => {
      const firstInput = document.getElementById('quote-company-name');
      if (firstInput) firstInput.focus();
    }, 100);
  } else {
    window.location.href = 'products.html?openQuote=cart';
  }
}

let isCartInitialized = false;

/**
 * Mounts the Cart Drawer to DOM and binds event delegation
 */
export function initCartDrawer() {
  if (isCartInitialized) return;
  isCartInitialized = true;

  // 1. Mount markup to document body if not already present
  if (!document.getElementById('cart-drawer')) {
    const wrapper = document.createElement('div');
    wrapper.id = 'cart-drawer-root';
    wrapper.innerHTML = getCartDrawerMarkup();
    document.body.appendChild(wrapper);
  }

  // Sync badge count immediately
  updateCartBadge();

  // Listen to language changes to re-render drawer
  document.addEventListener('comil:langchange', () => {
    renderCartDrawerContent();
  });

  // 2. Global Event Delegation for Cart Actions
  document.addEventListener('click', (e) => {
    // Open Cart Button (e.g. from Header)
    const openCartBtn = e.target.closest('[data-action="open-cart-modal"]');
    if (openCartBtn) {
      e.preventDefault();
      openCartDrawer(openCartBtn);
      return;
    }

    // Close Cart Button or Backdrop
    if (
      e.target.closest('#cart-drawer-close') ||
      e.target.closest('[data-cart-action="close"]') ||
      e.target.id === 'cart-drawer-backdrop'
    ) {
      e.preventDefault();
      closeCartDrawer();
      return;
    }

    // Increment Quantity
    const incBtn = e.target.closest('[data-cart-action="inc"]');
    if (incBtn) {
      e.preventDefault();
      const id = incBtn.getAttribute('data-id');
      updateItemQuantity(id, 1);
      return;
    }

    // Decrement Quantity
    const decBtn = e.target.closest('[data-cart-action="dec"]');
    if (decBtn) {
      e.preventDefault();
      const id = decBtn.getAttribute('data-id');
      updateItemQuantity(id, -1);
      return;
    }

    // Remove Item
    const removeBtn = e.target.closest('[data-cart-action="remove"]');
    if (removeBtn) {
      e.preventDefault();
      const id = removeBtn.getAttribute('data-id');
      removeCartItem(id);
      return;
    }

    // Clear Cart
    const clearBtn = e.target.closest('[data-cart-action="clear"]');
    if (clearBtn) {
      e.preventDefault();
      clearAllCart();
      return;
    }

    // Checkout / Request Quote
    const checkoutBtn = e.target.closest('[data-cart-action="checkout"]');
    if (checkoutBtn) {
      e.preventDefault();
      proceedToCheckout();
      return;
    }

    // Browse Catalog from Empty State
    const browseBtn = e.target.closest('[data-cart-action="browse-catalog"]');
    if (browseBtn) {
      e.preventDefault();
      closeCartDrawer();
      const catalogEl = document.getElementById('catalog-section') || document.getElementById('main-content');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'products.html#catalog-section';
      }
      return;
    }
  });

  // 3. Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCartDrawerOpen) {
      e.preventDefault();
      closeCartDrawer();
    }
  });
}

// Expose functions globally for debugging and immediate event triggers
if (typeof window !== 'undefined') {
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.initCartDrawer = initCartDrawer;
  window.getCartItems = getCartItems;
}
