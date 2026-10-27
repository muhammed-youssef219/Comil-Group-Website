/**
 * Comil Group - Product Details Controller
 * Phase 4: Dynamic Single-Product Details Engine
 * 
 * Features:
 * - Dynamic route handling via URL query parameter (?id=comil-ck-001)
 * - Safe DOM hydration using textContent
 * - Full bilingual parity (Arabic RTL & English LTR)
 * - Technical specifications table and quick parameters
 * - Add to Cart and Quotation request modal integration
 * - 5-column related equipment recommendation grid
 * - Graceful 404 / Model Not Found state handling
 */

import { products, categories } from '../data/products.js';
import { getActiveLanguage, getTranslation } from './i18n.js';
import { openQuoteModal, closeQuoteModal } from './catalog.js';
import { openCartDrawer, initCartDrawer, renderCartDrawerContent, getCartItems, saveCartItems, updateCartBadge } from './cartDrawer.js';

let currentProduct = null;

/**
 * Initializes the Product Details view if present on the page
 */
export function initProductDetails() {
  const detailsContainer = document.getElementById('product-details-content');
  if (!detailsContainer) return; // Not on details page

  renderProductDetails();

  // Listen for language change events to re-render dynamically
  window.addEventListener('languagechange', () => {
    if (currentProduct) {
      renderProductDetails();
    }
  });

  // Global click delegator for details page actions
  document.addEventListener('click', (e) => {
    // Request Quote button on main product
    const quoteBtn = e.target.closest('#detail-quote-btn');
    if (quoteBtn && currentProduct) {
      e.preventDefault();
      const lang = getActiveLanguage();
      const name = currentProduct.name[lang] || currentProduct.name.en;
      openQuoteModal(name, currentProduct.sku, quoteBtn);
      return;
    }

    // Add to Cart button on main product
    const addCartBtn = e.target.closest('#detail-add-cart-btn');
    if (addCartBtn && currentProduct) {
      e.preventDefault();
      const qtySelect = document.getElementById('detail-quantity-select');
      const qty = qtySelect ? parseInt(qtySelect.value, 10) || 1 : 1;
      const lang = getActiveLanguage();
      const name = currentProduct.name[lang] || currentProduct.name.en;

      const cart = getCartItems();
      const existing = cart.find((item) => item.id === currentProduct.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + qty;
      } else {
        cart.push({ id: currentProduct.id, name, sku: currentProduct.sku, quantity: qty });
      }
      saveCartItems(cart);

      // Temporary visual confirmation state
      const originalText = getTranslation('productDetails.addToCartBtn', lang);
      addCartBtn.textContent = `✓ ${getTranslation('catalog.addedToCart', lang)}`;
      addCartBtn.classList.remove('bg-navy-900');
      addCartBtn.classList.add('bg-emerald-600');

      setTimeout(() => {
        addCartBtn.textContent = originalText;
        addCartBtn.classList.remove('bg-emerald-600');
        addCartBtn.classList.add('bg-navy-900');
      }, 1200);

      // Open e-commerce Cart Drawer to show added item
      openCartDrawer(addCartBtn);

      return;
    }

    // Related equipment Add to Cart click
    const relatedAddToCartBtn = e.target.closest('[data-action="add-to-cart"]');
    if (relatedAddToCartBtn) {
      e.preventDefault();
      const id = relatedAddToCartBtn.getAttribute('data-product-id');
      const name = relatedAddToCartBtn.getAttribute('data-product-name');
      const sku = relatedAddToCartBtn.getAttribute('data-product-sku');
      
      const cart = getCartItems();
      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ id, name, sku, quantity: 1 });
      }
      saveCartItems(cart);

      const lang = getActiveLanguage();
      const originalText = getTranslation('catalog.addToCart', lang);
      relatedAddToCartBtn.textContent = `✓ ${getTranslation('catalog.addedToCart', lang)}`;
      relatedAddToCartBtn.classList.remove('bg-navy-100', 'text-navy-800');
      relatedAddToCartBtn.classList.add('bg-emerald-600', 'text-white');

      setTimeout(() => {
        relatedAddToCartBtn.textContent = originalText;
        relatedAddToCartBtn.classList.remove('bg-emerald-600', 'text-white');
        relatedAddToCartBtn.classList.add('bg-navy-100', 'text-navy-800');
      }, 1200);

      // Open e-commerce Cart Drawer to show added item
      openCartDrawer(relatedAddToCartBtn);

      return;
    }

    // Spec sheet prototype download button
    const downloadBtn = e.target.closest('#detail-download-spec-btn');
    if (downloadBtn && currentProduct) {
      e.preventDefault();
      alert(`[Prototype] Technical specification PDF generation for model ${currentProduct.sku} triggered.`);
      return;
    }

    // Open Cart Drawer from Header
    const openCartBtn = e.target.closest('[data-action="open-cart-modal"]');
    if (openCartBtn) {
      e.preventDefault();
      openCartDrawer(openCartBtn);
      return;
    }

    // Open Quote Modal from footer or page action
    const openQuoteBtn = e.target.closest('[data-action="open-quote-modal"]');
    if (openQuoteBtn) {
      e.preventDefault();
      const lang = getActiveLanguage();
      const name = openQuoteBtn.getAttribute('data-product-name') || (currentProduct ? (currentProduct.name[lang] || currentProduct.name.en) : 'General Inquiry');
      const sku = openQuoteBtn.getAttribute('data-product-sku') || (currentProduct ? currentProduct.sku : 'COMIL-INQUIRY');
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

  // Modal Keyboard Dismiss (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const backdrop = document.getElementById('quote-modal-backdrop');
      if (backdrop && !backdrop.classList.contains('pointer-events-none')) {
        closeQuoteModal();
      }
    }
  });

  // Quotation form submission inside modal
  const quoteForm = document.getElementById('quote-modal-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleModalSubmit);
  }

  // Update cart badge on boot
  updateCartBadge();
}

/**
 * Handles test quotation modal submission
 * @param {Event} e
 */
function handleModalSubmit(e) {
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

  if (form) form.classList.add('hidden');
  if (modalBody) modalBody.classList.add('hidden');
  if (modalSuccess) modalSuccess.classList.remove('hidden');

  setTimeout(() => {
    const successClose = document.getElementById('quote-modal-success-close');
    if (successClose) successClose.focus();
  }, 50);
}

/**
 * Renders the product details view based on the URL ?id= parameter
 */
export function renderProductDetails() {
  const lang = getActiveLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const contentContainer = document.getElementById('product-details-content');
  const notFoundContainer = document.getElementById('detail-not-found');

  if (!productId) {
    showNotFound();
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    showNotFound();
    return;
  }

  currentProduct = product;

  // Show content container
  if (contentContainer) contentContainer.classList.remove('hidden');
  if (notFoundContainer) notFoundContainer.classList.add('hidden');

  const name = product.name[lang] || product.name.en;
  const description = product.shortDescription[lang] || product.shortDescription.en;
  const categoryObj = categories.find((c) => c.id === product.category);
  const categoryName = categoryObj ? (categoryObj[`name_${lang}`] || categoryObj.name_en) : product.category;

  // Update document title
  document.title = `${name} — Comil Group Commercial Equipment`;

  // 1. Breadcrumbs
  const breadcrumbCat = document.getElementById('detail-breadcrumb-cat');
  const breadcrumbCurrent = document.getElementById('detail-breadcrumb-current');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = categoryName;
    breadcrumbCat.href = `products.html?category=${encodeURIComponent(product.category)}`;
  }
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = name;
  }

  // 2. Main Studio Image & Badges
  const mainImg = document.getElementById('detail-main-img');
  const catBadge = document.getElementById('detail-cat-badge');
  const skuBadge = document.getElementById('detail-sku-badge');

  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = name;
  }
  if (catBadge) catBadge.textContent = categoryName;
  if (skuBadge) skuBadge.textContent = product.sku;

  // 3. Header Info
  const titleElem = document.getElementById('detail-product-name');
  const skuText = document.getElementById('detail-sku-text');
  const catText = document.getElementById('detail-cat-text');
  const descElem = document.getElementById('detail-product-desc');

  if (titleElem) titleElem.textContent = name;
  if (skuText) skuText.textContent = product.sku;
  if (catText) catText.textContent = categoryName;
  if (descElem) descElem.textContent = description;

  // 4. Quick Specs Matrix (4 key specs in 2x2 grid)
  const quickSpecsContainer = document.getElementById('detail-quick-specs');
  if (quickSpecsContainer && product.specs) {
    quickSpecsContainer.innerHTML = '';
    product.specs.slice(0, 4).forEach((spec) => {
      const box = document.createElement('div');
      box.className = 'bg-navy-50/70 border border-navy-200/80 rounded-lg p-3 text-xs';
      
      const lbl = document.createElement('span');
      lbl.className = 'text-navy-500 font-medium block truncate';
      lbl.textContent = spec[`label_${lang}`] || spec.label_en;

      const val = document.createElement('span');
      val.className = 'text-navy-950 font-bold text-sm block mt-0.5 truncate';
      val.textContent = spec[`value_${lang}`] || spec.value_en;

      box.appendChild(lbl);
      box.appendChild(val);
      quickSpecsContainer.appendChild(box);
    });
  }

  // 5. Full Engineering Technical Specifications Table
  const specsTableBody = document.getElementById('detail-specs-table-body');
  if (specsTableBody && product.specs) {
    specsTableBody.innerHTML = '';
    product.specs.forEach((spec, idx) => {
      const row = document.createElement('tr');
      row.className = idx % 2 === 0 ? 'bg-white' : 'bg-navy-50/40';

      const paramCell = document.createElement('td');
      paramCell.className = 'py-3 px-4 font-semibold text-navy-700 w-1/3 border-b border-navy-100';
      paramCell.textContent = spec[`label_${lang}`] || spec.label_en;

      const valCell = document.createElement('td');
      valCell.className = 'py-3 px-4 font-bold text-navy-900 border-b border-navy-100';
      valCell.textContent = spec[`value_${lang}`] || spec.value_en;

      row.appendChild(paramCell);
      row.appendChild(valCell);
      specsTableBody.appendChild(row);
    });
  }

  // 6. Related Products (5-Column Grid matching reference)
  renderRelatedProducts(product, lang);
}

/**
 * Renders the 5-column related equipment recommendation section
 * @param {Object} currentProd
 * @param {string} lang
 */
function renderRelatedProducts(currentProd, lang) {
  const container = document.getElementById('detail-related-grid');
  if (!container) return;

  container.innerHTML = '';

  // Get other items in the same category, or complementary items
  let related = products.filter((p) => p.category === currentProd.category && p.id !== currentProd.id);
  if (related.length < 5) {
    const others = products.filter((p) => p.id !== currentProd.id && !related.includes(p));
    related = related.concat(others.slice(0, 5 - related.length));
  }
  related = related.slice(0, 5);

  const fragment = document.createDocumentFragment();

  related.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'bg-white rounded-xl border border-navy-100/90 shadow-sm hover:shadow-md hover:border-navy-300 transition-all duration-200 flex flex-col justify-between p-3 sm:p-4 text-center group relative';

    const pName = p.name[lang] || p.name.en;
    const detailUrl = `product-details.html?id=${encodeURIComponent(p.id)}`;

    // Image Link
    const imgLink = document.createElement('a');
    imgLink.href = detailUrl;
    imgLink.className = 'block aspect-square w-full rounded-lg bg-navy-50/50 p-3 sm:p-4 mb-2.5 flex items-center justify-center overflow-hidden group-hover:scale-[1.03] transition-transform duration-200';
    imgLink.setAttribute('aria-label', pName);

    const img = document.createElement('img');
    img.src = p.image;
    img.alt = pName;
    img.loading = 'lazy';
    img.className = 'max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300';
    imgLink.appendChild(img);
    card.appendChild(imgLink);

    // Name Link
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'flex-1 flex items-center justify-center mb-3';

    const titleLink = document.createElement('a');
    titleLink.href = detailUrl;
    titleLink.className = 'text-xs sm:text-sm font-bold text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center leading-snug';
    titleLink.textContent = pName;
    titleWrapper.appendChild(titleLink);
    card.appendChild(titleWrapper);

    // Add to Cart Button
    const addToCartBtn = document.createElement('button');
    addToCartBtn.type = 'button';
    addToCartBtn.className = 'w-full py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold bg-navy-100 hover:bg-navy-900 text-navy-800 hover:text-white transition-all duration-150 focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm active:scale-95 flex items-center justify-center gap-1 cursor-pointer';
    addToCartBtn.setAttribute('data-action', 'add-to-cart');
    addToCartBtn.setAttribute('data-product-id', p.id);
    addToCartBtn.setAttribute('data-product-sku', p.sku);
    addToCartBtn.setAttribute('data-product-name', pName);
    addToCartBtn.textContent = getTranslation('catalog.addToCart', lang);

    card.appendChild(addToCartBtn);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Displays the 404 / Model Not Found state
 */
function showNotFound() {
  const contentContainer = document.getElementById('product-details-content');
  const notFoundContainer = document.getElementById('detail-not-found');

  if (contentContainer) contentContainer.classList.add('hidden');
  if (notFoundContainer) notFoundContainer.classList.remove('hidden');

  document.title = 'Model Not Found — Comil Group Commercial Equipment';
}
