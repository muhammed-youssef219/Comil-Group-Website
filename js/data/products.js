/**
 * Comil Group - Mock Product Catalog Data
 * Representative demo products for commercial kitchens and hospitality sectors.
 * All specifications and SKUs are illustrative demonstrations for front-end evaluation.
 */

export const categories = [
  { id: 'all', name_en: 'All Equipment', name_ar: 'جميع المعدات' },
  { id: 'cooking', name_en: 'Cooking Equipment', name_ar: 'معدات الطهي' },
  { id: 'refrigeration', name_en: 'Refrigeration', name_ar: 'معدات التبريد' },
  { id: 'food-prep', name_en: 'Food Preparation', name_ar: 'تحضير الأغذية' },
  { id: 'warewashing', name_en: 'Warewashing', name_ar: 'غسيل الأواني' },
  { id: 'bakery', name_en: 'Bakery Equipment', name_ar: 'معدات المخابز' },
  { id: 'buffet', name_en: 'Buffet & Beverage', name_ar: 'البوفيه والمشروبات' },
];

export const products = [
  // ==========================================
  // 1. COOKING EQUIPMENT
  // ==========================================
  {
    id: 'comil-ck-001',
    sku: 'DEMO-CK-6B',
    category: 'cooking',
    name: {
      en: 'Heavy-Duty 6-Burner Gas Range with Convection Oven',
      ar: 'موقد غاز تجاري ثقيل بـ 6 شعلات مع فرن حراري',
    },
    shortDescription: {
      en: 'Cast-iron open top burners with pilot ignition and an insulated GN 2/1 convection oven base.',
      ar: 'شعلات علوية من الحديد الزهر مع إشعال تجريبي وقاعدة فرن حراري معزولة قياس GN 2/1.',
    },
    specs: [
      { label_en: 'Power Source', label_ar: 'مصدر الطاقة', value_en: 'LPG / Natural Gas', value_ar: 'غاز مسال / غاز طبيعي' },
      { label_en: 'Burner Capacity', label_ar: 'سعة الشعلات', value_en: '6 x 6.5 kW Burners', value_ar: '6 شعلات × 6.5 كيلوواط' },
      { label_en: 'Construction', label_ar: 'مادة الصنع', value_en: 'AISI 304 Stainless Steel', value_ar: 'فولاذ مقاوم للصدأ AISI 304' },
    ],
    image: 'assets/images/products/cooking-range.jpg',
    isFeatured: true,
  },
  {
    id: 'comil-ck-002',
    sku: 'DEMO-CK-CM10',
    category: 'cooking',
    name: {
      en: 'Electric Multi-Function Combi Steamer Oven (10 Trays)',
      ar: 'فرن كومبي بخاري كهربائي متعدد الوظائف (10 صواني)',
    },
    shortDescription: {
      en: 'Precision direct-injection boilerless steamer with digital programmable touch interface for commercial roasting and baking.',
      ar: 'فرن بخاري رقمي عالي الدقة بنظام الحقن المباشر مع واجهة لمس قابلة للبرمجة للطهي والتحمير التجاري.',
    },
    specs: [
      { label_en: 'Capacity', label_ar: 'السعة', value_en: '10 x GN 1/1 Trays', value_ar: '10 صواني قياس GN 1/1' },
      { label_en: 'Temperature Range', label_ar: 'نطاق الحرارة', value_en: '30°C to 300°C', value_ar: '30° إلى 300° مئوية' },
      { label_en: 'Electrical Supply', label_ar: 'التيار الكهربائي', value_en: '400V / 3N / 50Hz (16 kW)', value_ar: '400 فولت / 3 فاز (16 ك.و)' },
    ],
    image: 'assets/images/products/combi-oven.jpg',
    isFeatured: true,
  },
  {
    id: 'comil-ck-003',
    sku: 'DEMO-CK-FR2',
    category: 'cooking',
    name: {
      en: 'Double-Well Commercial Deep Fryer (2 x 18L)',
      ar: 'قلاية زيت تجارية بحوضين مزدوجين (2 × 18 لتر)',
    },
    shortDescription: {
      en: 'High-recovery dual-tank fryer with cold zone sediment basin and rapid safety thermostatic control.',
      ar: 'قلاية مزدوجة عالية الكفاءة مع منطقة ترسيب باردة وتحكم حراري آمن وسريع الاستجابة.',
    },
    specs: [
      { label_en: 'Tank Capacity', label_ar: 'سعة الأحواض', value_en: '2 x 18 Liters', value_ar: 'حوضان × 18 لتر' },
      { label_en: 'Heating System', label_ar: 'نظام التسخين', value_en: 'Heavy-Duty Gas Tubes', value_ar: 'أنابيب تسخين غازية ثقيلة' },
      { label_en: 'Safety', label_ar: 'الأمان', value_en: 'Overheat Cut-off Valve', value_ar: 'صمام أمان ضد فرط الحرارة' },
    ],
    image: 'assets/images/products/fryer.jpg',
    isFeatured: false,
  },

  // ==========================================
  // 2. REFRIGERATION
  // ==========================================
  {
    id: 'comil-rf-001',
    sku: 'DEMO-RF-2DR',
    category: 'refrigeration',
    name: {
      en: 'Two-Door Upright Storage Chiller (1400L, AISI 304)',
      ar: 'ثلاجة تبريد رأسية ببابين من الفولاذ المقاوم للصدأ (1400 لتر)',
    },
    shortDescription: {
      en: 'Ventilated tropicalized refrigeration system with self-closing insulated doors for heavy hotel kitchen duty.',
      ar: 'نظام تبريد بالهواء المدفوع ملائم للمناخ الحار مع أبواب ذاتية الإغلاق للاستخدام الفندقي الشاق.',
    },
    specs: [
      { label_en: 'Internal Volume', label_ar: 'الحجم الداخلي', value_en: '1400 Liters (Gross)', value_ar: '1400 لتر (إجمالي)' },
      { label_en: 'Temperature Range', label_ar: 'نطاق التبريد', value_en: '-2°C to +8°C', value_ar: '-2° إلى +8° مئوية' },
      { label_en: 'Refrigerant', label_ar: 'غاز التبريد', value_en: 'Eco R290 Hydrocarbon', value_ar: 'غاز R290 الصديق للبيئة' },
    ],
    image: 'assets/images/products/refrigerator.jpg',
    isFeatured: true,
  },
  {
    id: 'comil-rf-002',
    sku: 'DEMO-RF-UC3',
    category: 'refrigeration',
    name: {
      en: 'Under-Counter Prep Table Refrigerator with Splashback',
      ar: 'طاولة تحضير مبردة سفلية بـ 3 أبواب مع حاجز خلفي',
    },
    shortDescription: {
      en: 'Gastronorm refrigerated workbench with solid top surface and 3 self-closing undercounter doors.',
      ar: 'طاولة عمل وتحضير مبردة متوافقة مع أوعية جاسترونورم مع سطح عمل صلب و3 أبواب سفلية.',
    },
    specs: [
      { label_en: 'Configuration', label_ar: 'التكوين', value_en: '3 Solid Doors (GN 1/1)', value_ar: '3 أبواب صلبة (GN 1/1)' },
      { label_en: 'Worktop', label_ar: 'سطح العمل', value_en: '50mm Reinforced Top + 100mm Riser', value_ar: 'سطح مقوى 50 مم + حاجز 100 مم' },
      { label_en: 'Operating Temp', label_ar: 'حرارة التشغيل', value_en: '0°C to +10°C', value_ar: '0° إلى +10° مئوية' },
    ],
    image: 'assets/images/products/prep-table.jpg',
    isFeatured: false,
  },
  {
    id: 'comil-rf-003',
    sku: 'DEMO-RF-BF10',
    category: 'refrigeration',
    name: {
      en: 'Rapid Blast Chiller & Shock Freezer (10 Trays)',
      ar: 'جهاز تجميد وتبريد صدمي فائق السرعة (10 صواني)',
    },
    shortDescription: {
      en: 'HACCP-compliant blast chilling system for rapid pull-down from cooked core temperature to safety thresholds.',
      ar: 'نظام تبريد وتجميد صدمي سريع مطابق لمعايير HACCP لخفض درجات الحرارة المطهوة إلى الحدود الآمنة.',
    },
    specs: [
      { label_en: 'Chilling Capacity', label_ar: 'قدرة التبريد', value_en: '+90°C to +3°C in 90 min (40kg)', value_ar: '+90° إلى +3° في 90 دقيقة (40 كجم)' },
      { label_en: 'Freezing Capacity', label_ar: 'قدرة التجميد', value_en: '+90°C to -18°C in 240 min (25kg)', value_ar: '+90° إلى -18° في 240 دقيقة (25 كجم)' },
      { label_en: 'Tray Compatibility', label_ar: 'توافق الصواني', value_en: '10 x GN 1/1 or 600x400 mm', value_ar: '10 صواني GN 1/1 أو 600×400 مم' },
    ],
    image: 'assets/images/products/blast-chiller.jpg',
    isFeatured: true,
  },

  // ==========================================
  // 3. FOOD PREPARATION
  // ==========================================
  {
    id: 'comil-fp-001',
    sku: 'DEMO-FP-MX40',
    category: 'food-prep',
    name: {
      en: 'Heavy-Duty Commercial Planetary Mixer (40L Capacity)',
      ar: 'خلاط وعجان كوكبي تجاري ثقيل (سعة 40 لتر)',
    },
    shortDescription: {
      en: 'Three-speed gear-driven planetary mixer equipped with stainless steel bowl, dough hook, flat beater, and wire whip.',
      ar: 'خلاط كوكبي بثلاث سرعات وتروس ميكانيكية ثقيلة مزود بوعاء ستانلس ستيل وخطاف عجين ومضرب وسلك خفق.',
    },
    specs: [
      { label_en: 'Bowl Volume', label_ar: 'سعة الوعاء', value_en: '40 Liters', value_ar: '40 لتر' },
      { label_en: 'Motor Power', label_ar: 'قدرة المحرك', value_en: '1.5 kW / 2 HP', value_ar: '1.5 كيلوواط / 2 حصان' },
      { label_en: 'Attachments', label_ar: 'الملحقات', value_en: 'Hook, Beater, Whisk included', value_ar: 'خطاف، مضرب، وسلك خفق' },
    ],
    image: 'assets/images/products/mixer.jpg',
    isFeatured: true,
  },
  {
    id: 'comil-fp-002',
    sku: 'DEMO-FP-VG50',
    category: 'food-prep',
    name: {
      en: 'Multi-Disc Continuous Feed Vegetable Preparation Machine',
      ar: 'ماكينة تقطيع الخضار المستمر بأقراص متعددة',
    },
    shortDescription: {
      en: 'High-speed commercial vegetable cutter with dual feed hoppers for continuous slicing, dicing, grating, and shredding.',
      ar: 'قطاعة خضار تجارية سريعة مع قمعي تغذية للتقطيع والتشريح والبشر المستمر بأشكال متعددة.',
    },
    specs: [
      { label_en: 'Output Capacity', label_ar: 'الإنتاجية', value_en: 'Up to 300 kg/hour', value_ar: 'حتى 300 كجم / ساعة' },
      { label_en: 'Cutting Discs', label_ar: 'أقراص التقطيع', value_en: '5 Interchangeable Stainless Discs', value_ar: '5 أقراص ستانلس ستيل قابلة للتبديل' },
      { label_en: 'Safety Mechanism', label_ar: 'نظام الأمان', value_en: 'Magnetic Micro-switch Cut-off', value_ar: 'مفتاح أمان كهرومغناطيسي' },
    ],
    image: 'assets/images/products/vegetable-cutter.jpg',
    isFeatured: false,
  },
  {
    id: 'comil-fp-003',
    sku: 'DEMO-FP-SL300',
    category: 'food-prep',
    name: {
      en: 'High-Precision Gravity Meat & Deli Slicer (300mm Blade)',
      ar: 'قطاعة لحوم وأجبان عالية الدقة (شفرة 300 مم)',
    },
    shortDescription: {
      en: 'Anodized aluminum gravity slicer with built-in top-mounted dual stone sharpener and micro-metric thickness adjustment.',
      ar: 'قطاعة ألومنيوم مؤكسد مائلة مزودة بمسن حجري مدمج ونظام دقيق لضبط سماكة الشرائح.',
    },
    specs: [
      { label_en: 'Blade Diameter', label_ar: 'قطر الشفرة', value_en: '300 mm (12 inches)', value_ar: '300 مم (12 بوصة)' },
      { label_en: 'Cut Thickness', label_ar: 'سماكة التقطيع', value_en: '0 to 15 mm adjustable', value_ar: 'من 0 إلى 15 مم قابلة للضبط' },
      { label_en: 'Body Material', label_ar: 'الهيكل', value_en: 'Anodized Aluminum Alloy', value_ar: 'سبائك ألومنيوم مؤكسدة' },
    ],
    image: 'assets/images/products/meat-slicer.jpg',
    isFeatured: false,
  },

  // ==========================================
  // 4. WAREWASHING
  // ==========================================
  {
    id: 'comil-ww-001',
    sku: 'DEMO-WW-HD1',
    category: 'warewashing',
    name: {
      en: 'High-Capacity Pass-Through Hood Dishwasher',
      ar: 'غسالة أطباق تجارية بنظام غطاء الرفع المستمر',
    },
    shortDescription: {
      en: 'Corner or straight pass-through dishwasher with insulated hood, built-in rinse booster pump, and detergent dispensers.',
      ar: 'غسالة أطباق بنظام الغطاء المنزلق مع مضخة شطف معززة وموزعات آلية للصابون ومساعد الشطف.',
    },
    specs: [
      { label_en: 'Racks per Hour', label_ar: 'السلال في الساعة', value_en: 'Up to 60 Racks (1080 plates/h)', value_ar: 'حتى 60 سلة (1080 طبق / ساعة)' },
      { label_en: 'Cycle Times', label_ar: 'أزمنة الدورات', value_en: '60 / 90 / 120 seconds', value_ar: '60 / 90 / 120 ثانية' },
      { label_en: 'Water Consumption', label_ar: 'استهلاك الماء', value_en: '2.4 Liters / Cycle', value_ar: '2.4 لتر / دورة' },
    ],
    image: 'assets/images/products/hood-dishwasher.svg',
    isFeatured: true,
  },
  {
    id: 'comil-ww-002',
    sku: 'DEMO-WW-GW2',
    category: 'warewashing',
    name: {
      en: 'Undercounter Bar & Glasswasher with Booster',
      ar: 'غسالة كؤوس وأواني مدمجة للمقاهي والبارات',
    },
    shortDescription: {
      en: 'Compact front-loading glasswasher with rotating upper and lower wash arms and gentle glass-care cycles.',
      ar: 'غسالة كؤوس مدمجة بباب أمامي مزودة بأذرع غسيل علوية وسفلية ودورات حماية للزجاجيات الحساسة.',
    },
    specs: [
      { label_en: 'Rack Size', label_ar: 'مقاس السلة', value_en: '400 x 400 mm', value_ar: '400 × 400 مم' },
      { label_en: 'Max Glass Height', label_ar: 'ارتفاع الكأس الأقصى', value_en: '290 mm clearance', value_ar: '290 مم خلوص رأسي' },
      { label_en: 'Wash Cycle', label_ar: 'دورة الغسيل', value_en: '120 seconds', value_ar: '120 ثانية' },
    ],
    image: 'assets/images/products/glasswasher.svg',
    isFeatured: false,
  },
  {
    id: 'comil-ww-003',
    sku: 'DEMO-WW-PW3',
    category: 'warewashing',
    name: {
      en: 'Commercial Stainless Steel Pot & Utensil Washer',
      ar: 'غسالة قدور وأواني المطبخ الثقيلة',
    },
    shortDescription: {
      en: 'Heavy-duty wash chamber engineered for large stockpots, baking pans, GN containers, and prep utensils.',
      ar: 'غرفة غسيل صناعية متطورة مخصصة لقدور الطهي الكبيرة وصواني المخابز وأوعية التحضير الثقيلة.',
    },
    specs: [
      { label_en: 'Basket Dimensions', label_ar: 'أبعاد السلة', value_en: '650 x 700 mm', value_ar: '650 × 700 مم' },
      { label_en: 'Wash Pump', label_ar: 'مضخة الغسيل', value_en: '2.2 kW High Pressure', value_ar: '2.2 كيلوواط ضغط عالي' },
      { label_en: 'Construction', label_ar: 'جودة التصنيع', value_en: 'Double-Skin AISI 304', value_ar: 'جدار مزدوج AISI 304' },
    ],
    image: 'assets/images/products/pot-washer.svg',
    isFeatured: false,
  },

  // ==========================================
  // 5. BAKERY & PASTRY
  // ==========================================
  {
    id: 'comil-bk-001',
    sku: 'DEMO-BK-DK2',
    category: 'bakery',
    name: {
      en: 'Modular Electric Deck Oven with Stone Hearth (2 Decks)',
      ar: 'فرن طبقات كهربائي للخبز بقاعدة حجرية (طبقتان)',
    },
    shortDescription: {
      en: 'Independent top and bottom heat regulators with refractory ceramic baking stones and integral steam generation.',
      ar: 'تحكم مستقل بحرارة السقف والقاعدة مع ألواح حجرية حرارية ونظام مدمج لتوليد البخار للخبز الحرفي.',
    },
    specs: [
      { label_en: 'Deck Capacity', label_ar: 'سعة الطبقات', value_en: '4 x 600x400 mm Trays', value_ar: '4 صواني قياس 600×400 مم' },
      { label_en: 'Hearth Material', label_ar: 'سطح الخبز', value_en: 'Refractory Stone Slabs', value_ar: 'ألواح حجرية حرارية مقاومة' },
      { label_en: 'Max Temperature', label_ar: 'الحرارة القصوى', value_en: '400°C', value_ar: '400° مئوية' },
    ],
    image: 'assets/images/products/deck-oven.svg',
    isFeatured: true,
  },
  {
    id: 'comil-bk-002',
    sku: 'DEMO-BK-SP50',
    category: 'bakery',
    name: {
      en: 'Industrial Spiral Dough Mixer (50kg Flour Capacity)',
      ar: 'عجانة حلزونية صناعية للعجين (سعة 50 كجم دقيق)',
    },
    shortDescription: {
      en: 'Two-speed reversible dual-motor spiral kneader for consistent artisanal bread and pizza dough hydration.',
      ar: 'عجانة حلزونية بمحركين وسرعتين مع دوران عكسي لعجن مثالي لخبز المخابز وعجائن البيتزا.',
    },
    specs: [
      { label_en: 'Kneading Capacity', label_ar: 'سعة العجن', value_en: '80 kg Finished Dough (50kg flour)', value_ar: '80 كجم عجين جاهز (50 كجم دقيق)' },
      { label_en: 'Bowl & Tool', label_ar: 'الوعاء والحلزون', value_en: 'AISI 304 Solid Stainless', value_ar: 'فولاذ صلب AISI 304' },
      { label_en: 'Timer Control', label_ar: 'المؤقت', value_en: 'Dual Automatic Timers', value_ar: 'مؤقتان رقميان تلقائيان' },
    ],
    image: 'assets/images/products/spiral-mixer.svg',
    isFeatured: false,
  },
  {
    id: 'comil-bk-003',
    sku: 'DEMO-BK-SH100',
    category: 'bakery',
    name: {
      en: 'Reversible Heavy-Duty Tabletop Dough Sheeter',
      ar: 'فرادة وفاردة عجين مزدوجة الاتجاه للحلويات',
    },
    shortDescription: {
      en: 'Precision pastry sheeter with hard-chromium rollers and removable synthetic conveyor belts for puff pastries and croissants.',
      ar: 'فرادة عجين دقيقة بأسطوانات كروم صلبة وسيور قابلة للإزالة لفرد عجائن الكرواسون والحلويات.',
    },
    specs: [
      { label_en: 'Roller Width', label_ar: 'عرض الأسطوانة', value_en: '500 mm (Opening 0.5–35 mm)', value_ar: '500 مم (الفتحة من 0.5 إلى 35 مم)' },
      { label_en: 'Conveyor Length', label_ar: 'طول السيور', value_en: '950 mm per side (Foldable)', value_ar: '950 مم لكل جانب (قابلة للطي)' },
      { label_en: 'Operation', label_ar: 'طريقة التشغيل', value_en: 'Foot Pedal & Hand Lever', value_ar: 'دواسة قدم وذراع يدوي' },
    ],
    image: 'assets/images/products/dough-sheeter.svg',
    isFeatured: false,
  },

  // ==========================================
  // 6. BUFFET & BEVERAGE
  // ==========================================
  {
    id: 'comil-bf-001',
    sku: 'DEMO-BF-ESP2',
    category: 'buffet',
    name: {
      en: 'Professional Multi-Group Commercial Espresso System',
      ar: 'ماكينة قهوة إسبريسو تجارية متعددة المجموعات',
    },
    shortDescription: {
      en: 'Volumetric espresso machine featuring PID thermal stability, dual cool-touch steam wands, and high-clearance group heads.',
      ar: 'ماكينة إسبريسو حجمية متطورة مع نظام تحكم حراري PID وعصي بخار باردة ومجموعات مرتفعة للأكواب الكبيرة.',
    },
    specs: [
      { label_en: 'Group Heads', label_ar: 'المجموعات', value_en: '2 Groups (Volumetric touchpads)', value_ar: 'مجموعتان (أزرار حجمية مبرمجة)' },
      { label_en: 'Boiler Volume', label_ar: 'سعة الغلاية', value_en: '11 Liters Copper Boiler', value_ar: '11 لتر نحاس معزول' },
      { label_en: 'Power Rating', label_ar: 'القدرة', value_en: '3.8 kW / 230V Single Phase', value_ar: '3.8 كيلوواط / 230 فولت' },
    ],
    image: 'assets/images/products/espresso-machine.svg',
    isFeatured: true,
  },
  {
    id: 'comil-bf-002',
    sku: 'DEMO-BF-HC16',
    category: 'buffet',
    name: {
      en: 'Mobile Heated Banquet Holding Cabinet (16 Shelves)',
      ar: 'خزانة تدفئة متنقلة لحفظ أطباق الولائم والبوفيه (16 رفا)',
    },
    shortDescription: {
      en: 'Insulated mobile warming cart with forced-air heating and passive humidity reservoir for banquet and catering service.',
      ar: 'عربة تدفئة متنقلة معزولة بالكامل بنظام هواء ساخن مدفوع وحوض رطوبة لخدمات الحفلات والولائم.',
    },
    specs: [
      { label_en: 'Tray Capacity', label_ar: 'سعة الصواني', value_en: '16 x GN 2/1 or 32 x GN 1/1', value_ar: '16 صينية GN 2/1 أو 32 صينية GN 1/1' },
      { label_en: 'Mobility', label_ar: 'الحركة', value_en: '4 Swivel Heavy-Duty Castors (2 Braked)', value_ar: '4 عجلات صناعية دوارة (اثنتان بفرامل)' },
      { label_en: 'Temperature Range', label_ar: 'نطاق الحرارة', value_en: '+30°C to +85°C', value_ar: '+30° إلى +85° مئوية' },
    ],
    image: 'assets/images/products/holding-cabinet.svg',
    isFeatured: false,
  },
  {
    id: 'comil-bf-003',
    sku: 'DEMO-BF-IC150',
    category: 'buffet',
    name: {
      en: 'Heavy-Duty Countertop Ice Maker (150kg / 24h)',
      ar: 'صانعة ثلج تجارية لأسطح العمل (150 كجم / 24 ساعة)',
    },
    shortDescription: {
      en: 'Modular high-production gourmet ice cube machine with front ventilation and insulated integrated collection bin.',
      ar: 'ماكينة صنع مكعبات ثلج تجارية عالية الإنتاجية مع تهوية أمامية وخزان تجميع معزول بالكامل.',
    },
    specs: [
      { label_en: '24h Production', label_ar: 'الإنتاج في 24 ساعة', value_en: '155 kg / 24 hours', value_ar: '155 كجم / 24 ساعة' },
      { label_en: 'Storage Bin', label_ar: 'حوض التخزين', value_en: '65 kg Integrated Storage', value_ar: '65 كجم سعة تخزين مدمجة' },
      { label_en: 'Cooling System', label_ar: 'نظام التبريد', value_en: 'Air-Cooled Condenser', value_ar: 'مكثف تبريد هوائي' },
    ],
    image: 'assets/images/products/ice-maker.svg',
    isFeatured: false,
  },
];
