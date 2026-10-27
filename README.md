# Comil Group - B2B Commercial Kitchen & Hospitality Equipment Website

A front-end-only corporate website for **Comil Group**, a B2B supplier of commercial kitchen equipment, catering machinery, and hospitality supplies for hotels, restaurants, and professional kitchens.

---

## Technical Specifications
- **Structure:** Multi-page HTML5 architecture (`index.html`, `products.html`, `product-details.html`, `about.html`, `brands.html`, `contact.html`).
- **Styling:** Custom CSS3 + Tailwind CSS CLI with design tokens tailored for industrial B2B.
- **Interactivity:** Vanilla JavaScript (ES6+ modular architecture).
- **Internationalization:** Complete bilingual support (English LTR and Arabic RTL) with `localStorage` persistence and state retention.
- **Data Layer:** Static, structured mock product and brand datasets.
- **Backend / External Services:** None. Inquiries and quotation requests run client-side simulations clearly badged as prototypes.

---

## Directory Structure
```
comil-group-website/
├── index.html                   # Corporate Homepage (To be implemented in Phase 5)
├── products.html                # Product Catalog & Filter Grid (Phase 3)
├── product-details.html         # Technical Data Sheet & Spec Table (Phase 4)
├── about.html                   # Corporate Background & Capabilities (Phase 5)
├── brands.html                  # Equipment Partner Directory (Phase 5)
├── contact.html                 # Contact Coordinates & RFQ Prototype Form (Phase 5)
│
├── css/
│   ├── input.css                # Source CSS with Tailwind directives & Google Fonts
│   └── output.css               # Compiled production stylesheet
│
├── js/
│   ├── main.js                  # Global application initializer (Phase 2)
│   ├── data/                    # Mock catalog and brand data arrays (Phase 3)
│   ├── i18n/                    # Bilingual translations dictionary (Phase 2)
│   └── modules/                 # Vanilla JS modules: navigation, catalog, modal, form
│
├── assets/
│   ├── images/                  # Visual assets (branding, heroes, categories, products)
│   └── icons/                   # Reusable SVG vector icons
│
├── tailwind.config.js           # Design tokens, color palette, typography definitions
├── package.json                 # Tailwind CLI scripts and dependencies
└── .gitignore                   # Ignored development files
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 2. Installation
Install the Tailwind CSS CLI dependency:
```bash
npm install
```

### 3. Development Mode
To start the Tailwind CSS compiler in watch mode (recompiles automatically on changes to HTML or JS files):
```bash
npm run dev:css
```

### 4. Production Build
To generate a minified, purged stylesheet:
```bash
npm run build:css
```

### 5. Running the Website
Because this is a static multi-page project, you can serve the root directory using any local HTTP static server:
```bash
# Using Python
python -m http.server 8080

# Or using npx serve
npx serve .
```
Or simply open any `.html` file with the VS Code Live Server extension.
