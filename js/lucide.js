/**
 * Minimal Lucide subset (local, no CDN)
 * Includes only icons used in index.html and exposes lucide.createIcons().
 */
(function (global) {
  'use strict';

  const defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  };

  const createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children && children.length) {
      children.forEach((child) => element.appendChild(createSVGElement(child)));
    }
    return element;
  };

  const createElement = (iconNode, customAttrs = {}) => {
    const tag = 'svg';
    const attrs = { ...defaultAttributes, ...customAttrs };
    return createSVGElement([tag, attrs, iconNode]);
  };

  const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

  const getClassNames = (attrs) => {
    if (typeof attrs === 'string') return attrs;
    if (!attrs || !attrs.class) return '';
    if (typeof attrs.class === 'string') return attrs.class.split(' ');
    if (Array.isArray(attrs.class)) return attrs.class;
    return '';
  };

  const combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray
      .map((c) => (c || '').trim())
      .filter(Boolean)
      .filter((v, i, self) => self.indexOf(v) === i)
      .join(' ');
  };

  const toPascalCase = (str) => str.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

  const replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconNameKebab = element.getAttribute(nameAttr);
    if (iconNameKebab == null) return;
    const ComponentName = toPascalCase(iconNameKebab);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      console.warn(`${element.outerHTML} icon name was not found in the provided icons object.`);
      return;
    }
    const elementAttrs = getAttrs(element);
    const iconAttrs = { ...defaultAttributes, 'data-lucide': iconNameKebab, ...attrs, ...elementAttrs };
    const classNames = combineClassNames(['lucide', `lucide-${iconNameKebab}`, elementAttrs, attrs]);
    if (classNames) iconAttrs.class = classNames;
    const svgElement = createElement(iconNode, iconAttrs);
    element.parentNode && element.parentNode.replaceChild(svgElement, element);
  };

  // --- Icons (subset) ---
  const Target = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['circle', { cx: '12', cy: '12', r: '6' }],
    ['circle', { cx: '12', cy: '12', r: '2' }]
  ];

  const ClipboardList = [
    ['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }],
    ['path', { d: 'M12 11h4' }],
    ['path', { d: 'M12 16h4' }],
    ['path', { d: 'M8 11h.01' }],
    ['path', { d: 'M8 16h.01' }]
  ];

  const CircleCheck = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'm9 12 2 2 4-4' }]
  ];

  const Calendar = [
    ['path', { d: 'M8 2v4' }],
    ['path', { d: 'M16 2v4' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }],
    ['path', { d: 'M3 10h18' }]
  ];

  const Book = [[
    'path',
    { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' }
  ]];

  const Search = [
    ['path', { d: 'm21 21-4.34-4.34' }],
    ['circle', { cx: '11', cy: '11', r: '8' }]
  ];

  const MessageCircle = [[
    'path',
    { d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719' }
  ]];

  const MessageCircleCode = [
    ['path', { d: 'm10 9-3 3 3 3' }],
    ['path', { d: 'm14 15 3-3-3-3' }],
    ['path', { d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719' }]
  ];

  const SquareCheckBig = [
    ['path', { d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344' }],
    ['path', { d: 'm9 11 3 3L22 4' }]
  ];

  const SquareCheck = [
    ['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2' }],
    ['path', { d: 'm9 12 2 2 4-4' }]
  ];

  const ClipboardPen = [
    ['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5' }],
    ['path', { d: 'M4 13.5V6a2 2 0 0 1 2-2h2' }],
    ['path', { d: 'M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z' }]
  ];

  const Clock = [
    ['path', { d: 'M12 6v6l4 2' }],
    ['circle', { cx: '12', cy: '12', r: '10' }]
  ];

  const CalendarCheck = [
    ['path', { d: 'M8 2v4' }],
    ['path', { d: 'M16 2v4' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }],
    ['path', { d: 'M3 10h18' }],
    ['path', { d: 'm9 16 2 2 4-4' }]
  ];

  const Check = [['path', { d: 'M20 6 9 17l-5-5' }]];

  const GraduationCap = [
    ['path', { d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z' }],
    ['path', { d: 'M22 10v6' }],
    ['path', { d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' }]
  ];

  const Palette = [
    ['path', { d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z' }],
    ['circle', { cx: '13.5', cy: '6.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '17.5', cy: '10.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '6.5', cy: '12.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '8.5', cy: '7.5', r: '.5', fill: 'currentColor' }]
  ];

  const Settings = [
    ['path', { d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' }],
    ['circle', { cx: '12', cy: '12', r: '3' }]
  ];

  const Brain = [
    ['path', { d: 'M12 18V5' }],
    ['path', { d: 'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4' }],
    ['path', { d: 'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5' }],
    ['path', { d: 'M17.997 5.125a4 4 0 0 1 2.526 5.77' }],
    ['path', { d: 'M18 18a4 4 0 0 0 2-7.464' }],
    ['path', { d: 'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517' }],
    ['path', { d: 'M6 18a4 4 0 0 1-2-7.464' }],
    ['path', { d: 'M6.003 5.125a4 4 0 0 0-2.526 5.77' }]
  ];

  const Briefcase = [
    ['path', { d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }],
    ['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2' }]
  ];

  const Heart = [
    ['path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z' }]
  ];

  const Code = [
    ['path', { d: 'm16 18 6-6-6-6' }],
    ['path', { d: 'm8 6-6 6 6 6' }]
  ];

  const CodeXml = [
    ['path', { d: 'm18 16 4-4-4-4' }],
    ['path', { d: 'm6 8-4 4 4 4' }],
    ['path', { d: 'm14.5 4-5 16' }]
  ];

  const Smartphone = [
    ['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2' }],
    ['path', { d: 'M12 18h.01' }]
  ];

  const Layers = [
    ['path', { d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' }],
    ['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' }],
    ['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' }]
  ];

  // Close icon
  const X = [
    ['path', { d: 'M18 6 6 18' }],
    ['path', { d: 'm6 6 12 12' }]
  ];

  // Aliases used in this project
  const icons = {
    Target,
    ClipboardList,
    // Map kebab-case 'check-circle' to our 'CircleCheck' shape
    CheckCircle: CircleCheck,
    Calendar,
    Book,
    Search,
    MessageCircle,
    MessageCircleCode,
    // Map check-square to big variant for visual parity
    CheckSquare: SquareCheckBig,
    ClipboardPen,
    Clock,
    CalendarCheck,
    Check,
    GraduationCap,
    Palette,
    Settings,
    Brain,
    Briefcase,
    Heart,
    Code,
    Smartphone,
    Layers,
    // Close icon for menu
    X,
    // Aliases present in HTML
    CheckCircle2: CircleCheck,
    Code2: CodeXml
  };

  function createIcons({ nameAttr = 'data-lucide', attrs = {}, root = document } = {}) {
    const elementsToReplace = root.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach((element) => replaceElement(element, { nameAttr, icons, attrs }));
  }

  global.lucide = { createIcons };
})(typeof window !== 'undefined' ? window : this);
