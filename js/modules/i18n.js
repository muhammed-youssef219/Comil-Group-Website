/**
 * Comil Group - Internationalization (i18n) Engine
 * Handles bilingual switching (English LTR <-> Arabic RTL),
 * localStorage persistence, and safe DOM translation updates.
 */

import { translations } from '../i18n/translations.js';

export const STORAGE_KEY = 'comil_preferred_lang';
export const SUPPORTED_LANGS = ['en', 'ar'];
export const DEFAULT_LANG = 'en';

let currentLang = DEFAULT_LANG;

/**
 * Safely resolves nested dictionary keys (e.g., "nav.home")
 * @param {string} keyPath - Dot notation key
 * @param {string} lang - 'en' | 'ar'
 * @returns {string}
 */
export function getTranslation(keyPath, lang = currentLang) {
  if (!keyPath) return '';
  
  const targetDict = translations[lang] || translations[DEFAULT_LANG];
  const keys = keyPath.split('.');
  
  let result = targetDict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      result = undefined;
      break;
    }
  }

  // Fallback to English if translation is missing in the target language
  if (result === undefined && lang !== DEFAULT_LANG) {
    let fallback = translations[DEFAULT_LANG];
    for (const k of keys) {
      if (fallback && typeof fallback === 'object' && k in fallback) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
        break;
      }
    }
    result = fallback;
  }

  return typeof result === 'string' ? result : keyPath;
}

/**
 * Traverses DOM elements with data-i18n attributes and updates text safely using textContent
 * @param {string} lang
 */
export function applyTranslations(lang = currentLang) {
  // Update text content safely
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = getTranslation(key, lang);
    if (text) {
      el.textContent = text;
    }
  });

  // Update input placeholders
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = getTranslation(key, lang);
    if (text) {
      el.setAttribute('placeholder', text);
    }
  });

  // Update aria-labels for screen readers
  const ariaElements = document.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    const text = getTranslation(key, lang);
    if (text) {
      el.setAttribute('aria-label', text);
    }
  });

  // Update title attributes
  const titleElements = document.querySelectorAll('[data-i18n-title]');
  titleElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    const text = getTranslation(key, lang);
    if (text) {
      el.setAttribute('title', text);
    }
  });

  // Update language switcher indicators
  const switchers = document.querySelectorAll('[data-action="toggle-language"]');
  switchers.forEach((btn) => {
    const targetLang = lang === 'en' ? 'ar' : 'en';
    const targetLabel = targetLang === 'ar' ? 'العربية' : 'English';
    const ariaLabel = getTranslation('nav.switchLang', lang);

    btn.setAttribute('aria-label', ariaLabel);
    
    // If the switcher contains a specific target label span
    const labelSpan = btn.querySelector('[data-lang-label]');
    if (labelSpan) {
      labelSpan.textContent = targetLabel;
    }

    // Update active badges if present
    const activeEn = btn.querySelector('[data-lang-badge="en"]');
    const activeAr = btn.querySelector('[data-lang-badge="ar"]');
    if (activeEn && activeAr) {
      if (lang === 'en') {
        activeEn.classList.add('bg-amber-600', 'text-white');
        activeEn.classList.remove('text-navy-700', 'hover:bg-navy-100');
        activeAr.classList.remove('bg-amber-600', 'text-white');
        activeAr.classList.add('text-navy-700', 'hover:bg-navy-100');
      } else {
        activeAr.classList.add('bg-amber-600', 'text-white');
        activeAr.classList.remove('text-navy-700', 'hover:bg-navy-100');
        activeEn.classList.remove('bg-amber-600', 'text-white');
        activeEn.classList.add('text-navy-700', 'hover:bg-navy-100');
      }
    }
  });
}

/**
 * Changes active language, updates document attributes, saves preference,
 * and notifies listeners via custom event.
 * @param {'en' | 'ar'} lang
 */
export function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = DEFAULT_LANG;
  }

  currentLang = lang;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (err) {
    console.warn('localStorage is unavailable for storing language preference:', err);
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = dir;

  // Apply translations to the DOM
  applyTranslations(lang);

  // Dispatch custom event for page-specific components to react
  document.dispatchEvent(
    new CustomEvent('comil:langchange', {
      detail: { lang, dir },
    })
  );
}

/**
 * Toggles between English and Arabic
 */
export function toggleLanguage() {
  const nextLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(nextLang);
}

/**
 * Returns current language code ('en' | 'ar')
 */
export function getActiveLanguage() {
  return currentLang;
}

/**
 * Returns current layout direction ('ltr' | 'rtl')
 */
export function getActiveDirection() {
  return currentLang === 'ar' ? 'rtl' : 'ltr';
}

let isI18nInitialized = false;

/**
 * Initializes i18n from localStorage or browser default
 */
export function initI18n() {
  let savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.warn('localStorage is unavailable:', err);
  }

  const initialLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : DEFAULT_LANG;
  setLanguage(initialLang);

  if (isI18nInitialized) return;
  isI18nInitialized = true;

  // Attach event listeners to all language switcher triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="toggle-language"]');
    if (trigger) {
      e.preventDefault();
      toggleLanguage();
    }
  });
}

