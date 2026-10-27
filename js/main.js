/**
 * Comil Group - Main Client Entry Point
 * Phase 2: Global Shell Initialization
 */

import { initLayout } from './modules/layout.js';
import { initI18n } from './modules/i18n.js';
import { initNavigation } from './modules/navigation.js';
import { initCatalog } from './modules/catalog.js';
import { initHeroSlider } from './modules/heroSlider.js';
import { initProductDetails } from './modules/productDetails.js';

/**
 * Boots the global shell application and page-specific controllers
 */
export function initApp() {
  // 1. Mount shared layout (Header, Mobile Drawer, Footer)
  initLayout();

  // 2. Initialize bilingual translation engine and language preference
  initI18n();

  // 3. Initialize responsive navigation, drawer interactions, and keyboard handlers
  initNavigation();

  // 4. Initialize Products Catalog if catalog grid is present on the page
  initCatalog();

  // 5. Initialize Hero Equipment Slider if present on the page
  initHeroSlider();

  // 6. Initialize Product Details if on the product details page
  initProductDetails();
}

// Auto-run when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
