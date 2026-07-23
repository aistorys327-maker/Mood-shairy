import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "public", "assets", "card_styles");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper to generate stars
function getStars(count, width = 1080, height = 1350) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * (height * 0.7));
    const r = (Math.random() * 2 + 0.5).toFixed(1);
    const op = (Math.random() * 0.7 + 0.3).toFixed(2);
    stars += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="${op}" />`;
    if (i % 6 === 0) {
      stars += `<path d="M ${cx - 7} ${cy} L ${cx + 7} ${cy} M ${cx} ${cy - 7} L ${cx} ${cy + 7}" stroke="#ffffff" stroke-width="0.8" opacity="${(op * 0.7).toFixed(2)}" />`;
    }
  }
  return `<g id="stars-group">${stars}</g>`;
}

// Helper to generate glowing bokeh circles
function getBokeh(count, color = "#fcd34d") {
  let bokeh = "";
  for (let i = 0; i < count; i++) {
    const cx = Math.floor(Math.random() * 880) + 100;
    const cy = Math.floor(Math.random() * 1150) + 100;
    const r = Math.floor(Math.random() * 80) + 30;
    const op = (Math.random() * 0.12 + 0.04).toFixed(3);
    bokeh += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}" filter="url(#heavyGlow)" />`;
  }
  return `<g id="bokeh-group">${bokeh}</g>`;
}

// Helper to draw a stylized vector rose
function getRose(cx, cy, size, mainColor = "#e11d48", stemColor = "#15803d") {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${size})">
      <!-- Stem -->
      <path d="M 0 30 Q -10 80, 5 150 Q 15 200, 0 250" stroke="${stemColor}" stroke-width="4" fill="none" />
      <!-- Leaves -->
      <path d="M -5 80 C -30 60, -50 80, -5 110" fill="${stemColor}" />
      <path d="M 2 120 C 30 100, 50 120, 2 150" fill="${stemColor}" />
      <!-- Green Sepals -->
      <path d="M -30 20 C -45 5, -15 -10, 0 25" fill="${stemColor}" />
      <path d="M 30 20 C 45 5, 15 -10, 0 25" fill="${stemColor}" />
      <!-- Outer Petals -->
      <path d="M -40 20 C -70 -10, -50 -50, 0 -40 C 50 -50, 70 -10, 40 20 C 50 50, -50 50, -40 20 Z" fill="${mainColor}" opacity="0.9" />
      <path d="M -30 10 C -50 -15, -40 -35, 0 -30 C 40 -35, 50 -15, 30 10 C 35 30, -35 30, -30 10 Z" fill="#9f1239" />
      <!-- Inner bud petals -->
      <path d="M -20 0 C -30 -15, 30 -15, 20 0 C 25 15, -25 15, -20 0 Z" fill="#be123c" />
      <ellipse cx="0" cy="0" rx="8" ry="5" fill="#881337" />
    </g>
  `;
}

// Helper to draw a stylized watercolor blue flower (Reference 3 inspired)
function getWatercolorFlower(cx, cy, scale, mainColor = "#3b82f6", secondaryColor = "#60a5fa") {
  let petals = "";
  for (let i = 0; i < 6; i++) {
    const angle = i * 60;
    petals += `
      <g transform="rotate(${angle})">
        <path d="M 0 0 C -25 -40, -40 -80, 0 -110 C 40 -80, 25 -40, 0 0" fill="${mainColor}" opacity="0.45" filter="url(#softBlur)" />
        <path d="M 0 0 C -15 -30, -25 -60, 0 -85 C 25 -60, 15 -30, 0 0" fill="${secondaryColor}" opacity="0.55" filter="url(#softBlur)" />
      </g>
    `;
  }
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      ${petals}
      <!-- Flower Center -->
      <circle cx="0" cy="0" r="15" fill="#1d4ed8" opacity="0.8" />
      <circle cx="0" cy="0" r="10" fill="#fcd34d" opacity="0.9" />
      <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
    </g>
  `;
}

// Helper to generate falling rose or watercolor petals
function getFallingPetals(count, color = "#fda4af") {
  let petals = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 1080);
    const y = Math.floor(Math.random() * 1350);
    const scale = (Math.random() * 0.7 + 0.3).toFixed(2);
    const rot = Math.floor(Math.random() * 360);
    petals += `<path d="M 0 0 C -15 -25, -20 10, 0 35 C 20 10, 15 -25, 0 0 Z" fill="${color}" transform="translate(${x}, ${y}) rotate(${rot}) scale(${scale})" opacity="0.65" />`;
  }
  return petals;
}

// Helper to generate floating glowing butterflies
function getButterflies(count, mainColor = "#ec4899", glowColor = "#fbcfe8") {
  let butterflies = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 880) + 100;
    const y = Math.floor(Math.random() * 1150) + 100;
    const scale = (Math.random() * 0.6 + 0.3).toFixed(2);
    const rot = Math.floor(Math.random() * 120) - 60;
    butterflies += `
      <g transform="translate(${x}, ${y}) rotate(${rot}) scale(${scale})" opacity="0.75" filter="url(#glow)">
        <!-- Left Wing -->
        <path d="M 0 0 Q -25 -20, -35 10 Q -20 30, 0 5 Z" fill="${mainColor}" />
        <path d="M 0 0 Q -15 -10, -25 5 Q -15 15, 0 2 Z" fill="${glowColor}" />
        <!-- Right Wing -->
        <path d="M 0 0 Q 25 -20, 35 10 Q 20 30, 0 5 Z" fill="${mainColor}" />
        <path d="M 0 0 Q 15 -10, 25 5 Q 15 15, 0 2 Z" fill="${glowColor}" />
        <!-- Body -->
        <line x1="0" y1="-5" x2="0" y2="15" stroke="#1f2937" stroke-width="2.5" />
        <!-- Antennae -->
        <path d="M 0 -5 Q -5 -12, -8 -10" fill="none" stroke="#1f2937" stroke-width="1" />
        <path d="M 0 -5 Q 5 -12, 8 -10" fill="none" stroke="#1f2937" stroke-width="1" />
      </g>
    `;
  }
  return butterflies;
}

// Helper to generate realistic rain effect
function getRain(count, strokeColor = "#cbd5e1", opacity = 0.25) {
  let drops = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 1080);
    const y = Math.floor(Math.random() * 1350);
    const length = Math.floor(Math.random() * 30) + 15;
    drops += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + length}" stroke="${strokeColor}" stroke-width="1.2" opacity="${opacity}" />`;
    if (i % 8 === 0) {
      drops += `<circle cx="${x}" cy="${y + length}" r="1.5" fill="#ffffff" opacity="${(opacity * 1.5).toFixed(2)}" />`;
    }
  }
  return drops;
}

// Primary dynamic generator map for 90 cards
const GENERATORS = {
  // ==================== 1. LOVE SHAYARI (Category: love) ====================
  "love-shayari": (idx) => {
    const colors = [
      ["#310010", "#180005", "#4c0519", "#e11d48"],
      ["#1e0008", "#000000", "#5c0620", "#f43f5e"],
      ["#450520", "#120004", "#881337", "#fda4af"]
    ];
    const c = colors[idx - 1];
    return `
      <defs>
        <linearGradient id="grad-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="50%" stop-color="${c[1]}" />
          <stop offset="100%" stop-color="${c[2]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${idx})" />
      ${getBokeh(15, c[3])}
      <!-- Romantic elements at the bottom corners -->
      ${getRose(120, 1150, 1.3, c[3])}
      ${getRose(960, 1150, 1.3, c[3])}
      <!-- Centered romantic overlay shadow for text readability -->
      <circle cx="540" cy="675" r="450" fill="#000000" opacity="0.35" filter="url(#heavyGlow)" />
      ${getFallingPetals(20, c[3])}
      ${getStars(20)}
    `;
  },

  // ==================== 2. ROMANTIC (Category: love) ====================
  "love-romantic": (idx) => {
    const stops = [
      ["#4a044e", "#2e022f", "#701a75"],
      ["#500724", "#1f000b", "#881337"],
      ["#3b0764", "#1c053a", "#581c87"]
    ];
    const c = stops[idx - 1];
    return `
      <defs>
        <linearGradient id="romantic-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="60%" stop-color="${c[1]}" />
          <stop offset="100%" stop-color="${c[2]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#romantic-${idx})" />
      ${getBokeh(12, "#ec4899")}
      <!-- Swirling floral line designs -->
      <path d="M -100 1350 C 300 1200, 400 1000, 150 900 C 50 850, 120 750, 300 800" fill="none" stroke="#ec4899" stroke-width="2" opacity="0.15" filter="url(#glow)" />
      <path d="M 1180 1350 C 780 1200, 680 1000, 930 900 C 1030 850, 960 750, 780 800" fill="none" stroke="#ec4899" stroke-width="2" opacity="0.15" filter="url(#glow)" />
      <!-- Soft rose overlay at the bottom -->
      ${getRose(540, 1220, 1.1, "#f43f5e")}
      <circle cx="540" cy="675" r="420" fill="#000000" opacity="0.3" filter="url(#heavyGlow)" />
      ${getFallingPetals(15, "#fbcfe8")}
    `;
  },

  // ==================== 3. COUPLE SILHOUETTE (Category: love) ====================
  "love-couple": (idx) => {
    const sky = [
      ["#1e1b4b", "#311042", "#701a75", "#f472b6"],
      ["#030712", "#111827", "#312e81", "#818cf8"],
      ["#7c2d12", "#451a03", "#9a3412", "#fdba74"]
    ];
    const c = sky[idx - 1];
    return `
      <defs>
        <linearGradient id="couple-sky-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="40%" stop-color="${c[1]}" />
          <stop offset="80%" stop-color="${c[2]}" />
          <stop offset="100%" stop-color="${c[3]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#couple-sky-${idx})" />
      <circle cx="540" cy="500" r="280" fill="#ffffff" opacity="0.15" filter="url(#heavyGlow)" />
      
      <!-- Mountain base silhouette -->
      <path d="M -50 1200 Q 300 1080, 540 1120 T 1130 1200 L 1130 1360 L -50 1360 Z" fill="#090514" />
      
      <!-- Couple Silhouette -->
      <g transform="translate(480, 1020) scale(1.1)" fill="#090514">
        <!-- Boy -->
        <circle cx="30" cy="20" r="11" />
        <path d="M 15 31 Q 30 36, 45 31 L 48 95 L 12 95 Z" />
        <!-- Girl -->
        <circle cx="55" cy="25" r="10" />
        <path d="M 42 36 Q 55 41, 68 36 L 62 95 L 38 95 Z" />
      </g>
      
      ${getStars(40)}
      ${getFallingPetals(10, c[3])}
    `;
  },

  // ==================== 4. CANDLE LIGHT (Category: love) ====================
  "love-candle": (idx) => {
    const stops = [
      ["#020617", "#0f172a", "#d97706"],
      ["#0c0a09", "#1c1917", "#ca8a04"],
      ["#090514", "#120c1f", "#b45309"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <!-- Radial Candle Glow at Bottom Center -->
      <circle cx="540" cy="1150" r="400" fill="${c[2]}" opacity="0.25" filter="url(#heavyGlow)" />
      <circle cx="540" cy="1150" r="150" fill="#fef08a" opacity="0.4" filter="url(#heavyGlow)" />
      
      <!-- Beautiful Candle illustration -->
      <g transform="translate(490, 1050)">
        <!-- Candle stick -->
        <rect x="25" y="100" width="50" height="200" fill="#f1f5f9" rx="8" />
        <rect x="25" y="100" width="50" height="20" fill="#cbd5e1" rx="4" />
        <!-- Wick -->
        <line x1="50" y1="100" x2="50" y2="70" stroke="#475569" stroke-width="4" />
        <!-- Flame -->
        <path d="M 50 70 C 25 50, 25 10, 50 -20 C 75 10, 75 50, 50 70 Z" fill="#f59e0b" filter="url(#glow)" />
        <path d="M 50 70 C 35 55, 35 30, 50 10 C 65 30, 65 55, 50 70 Z" fill="#fde047" />
      </g>
      
      <circle cx="540" cy="650" r="450" fill="#000000" opacity="0.45" filter="url(#heavyGlow)" />
      ${getStars(15)}
    `;
  },

  // ==================== 5. BUTTERFLY THEME (Category: love) ====================
  "love-butterfly": (idx) => {
    const stop = [
      ["#0a0015", "#1e0b36", "#db2777"],
      ["#020c1b", "#0f172a", "#3b82f6"],
      ["#140212", "#2e0524", "#8b5cf6"]
    ];
    const c = stop[idx - 1];
    return `
      <defs>
        <linearGradient id="bfly-sky-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="60%" stop-color="${c[1]}" />
          <stop offset="100%" stop-color="${c[2]}" opacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bfly-sky-${idx})" />
      ${getBokeh(10, c[2])}
      ${getButterflies(8, c[2], "#ffffff")}
      <!-- Corner floral frames -->
      ${getWatercolorFlower(100, 100, 0.9, c[2], "#ffffff")}
      ${getWatercolorFlower(980, 1250, 0.9, c[2], "#ffffff")}
      <circle cx="540" cy="675" r="450" fill="#000000" opacity="0.4" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 6. HEART BROKEN (Category: broken) ====================
  "broken-heart": (idx) => {
    const stops = [
      ["#050005", "#1a000e", "#000000"],
      ["#0a040d", "#120216", "#040008"],
      ["#0c0000", "#1f0003", "#000000"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.6" />
      
      <!-- Cracked bleeding heart in bottom left background -->
      <g transform="translate(200, 1100) scale(1.8)" opacity="0.3">
        <!-- Left Side -->
        <path d="M 0 -50 C -35 -90, -70 -50, -70 -10 C -70 30, -35 70, 0 110 L 0 0 Z" fill="#991b1b" />
        <!-- Right Side broken and offset -->
        <path d="M 0 -50 C 35 -90, 70 -50, 70 -10 C 70 30, 35 70, 0 110 L 0 0 Z" fill="#7f1d1d" transform="translate(15, 20) rotate(8)" />
      </g>
      
      <!-- Dying embers rising -->
      ${getStars(35, 1080, 1350)}
      <circle cx="540" cy="675" r="440" fill="#000000" opacity="0.6" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 7. BROKEN GLASS THEME (Category: broken) ====================
  "broken-glass": (idx) => {
    const skies = [
      ["#020617", "#090d16", "#38bdf8"],
      ["#050505", "#141414", "#94a3b8"],
      ["#0f172a", "#1e293b", "#f43f5e"]
    ];
    const c = skies[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <circle cx="540" cy="675" r="500" fill="${c[1]}" opacity="0.5" />
      
      <!-- Sharp Shattered Glass Lines (Reference 4 / Broken design) -->
      <g stroke="${c[2]}" stroke-width="1.5" opacity="0.35" fill="none">
        <line x1="540" y1="675" x2="-100" y2="200" />
        <line x1="540" y1="675" x2="1180" y2="300" />
        <line x1="540" y1="675" x2="900" y2="1500" />
        <line x1="540" y1="675" x2="150" y2="1400" />
        <line x1="540" y1="675" x2="540" y2="-100" />
        <line x1="540" y1="675" x2="540" y2="1450" />
        
        <!-- Concentric shattered rings -->
        <polygon points="540,525 675,675 540,825 405,675" stroke-dasharray="10 5" />
        <polygon points="540,375 840,675 540,975 240,675" />
        <polygon points="540,175 1040,675 540,1175 40,675" />
      </g>
      
      <circle cx="540" cy="675" r="400" fill="#000000" opacity="0.5" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 8. SAD (Category: sad) ====================
  "sad-feeling": (idx) => {
    const themes = [
      ["#0b0f19", "#111827", "#374151"],
      ["#030712", "#0f172a", "#1e293b"],
      ["#110c14", "#1c121e", "#312239"]
    ];
    const c = themes[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <!-- Rainy fog clouds overlay -->
      <path d="M -50 150 Q 200 40, 540 110 T 1130 90 L 1130 -50 L -50 -50 Z" fill="${c[2]}" opacity="0.25" filter="url(#heavyGlow)" />
      <!-- Lonely bare tree branches framing corners -->
      <g stroke="#030712" stroke-width="4" fill="none" opacity="0.6">
        <path d="M 0 0 Q 250 180, 450 120" />
        <path d="M 180 80 Q 280 50, 320 0" />
        <path d="M 1080 0 Q 830 180, 630 120" />
      </g>
      <circle cx="540" cy="675" r="420" fill="#000000" opacity="0.55" filter="url(#heavyGlow)" />
      ${getRain(80, "#cbd5e1", 0.15)}
    `;
  },

  // ==================== 9. ALONE (Category: sad) ====================
  "sad-alone": (idx) => {
    const stops = [
      ["#030712", "#090d16", "#38bdf8"],
      ["#05020c", "#0f071b", "#818cf8"],
      ["#0c0502", "#1a0b05", "#f97316"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.6" />
      
      <!-- Lonely bench with single street lamp at bottom right -->
      <g transform="translate(650, 850)">
        <!-- Post -->
        <line x1="150" y1="50" x2="150" y2="400" stroke="#000" stroke-width="8" />
        <path d="M 150 50 Q 100 20, 80 70" fill="none" stroke="#000" stroke-width="6" />
        <!-- Glowing lamp lamp head -->
        <circle cx="80" cy="80" r="15" fill="${c[2]}" filter="url(#glow)" />
        <polygon points="80,95 20,400 250,400" fill="${c[2]}" opacity="0.12" filter="url(#heavyGlow)" />
        <!-- Lonely Bench -->
        <rect x="-100" y="320" width="160" height="15" fill="#000" rx="4" />
        <line x1="-80" y1="335" x2="-80" y2="380" stroke="#000" stroke-width="6" />
        <line x1="40" y1="335" x2="40" y2="380" stroke="#000" stroke-width="6" />
      </g>
      
      <!-- Moon in upper left corner -->
      <circle cx="200" cy="250" r="40" fill="#f8fafc" opacity="0.7" filter="url(#glow)" />
      <circle cx="540" cy="675" r="440" fill="#000000" opacity="0.55" filter="url(#heavyGlow)" />
      ${getStars(20)}
    `;
  },

  // ==================== 10. RAIN (Category: sad) ====================
  "sad-rain": (idx) => {
    const stops = [
      ["#020617", "#0f172a", "#1e293b"],
      ["#080a15", "#13192f", "#1f2942"],
      ["#050a0a", "#101e21", "#1b2c30"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.75" />
      <!-- Falling dense rain strings across the entire card -->
      ${getRain(250, "#94a3b8", 0.35)}
      <!-- Deep center contrast mask for readable Shayari writing -->
      <circle cx="540" cy="675" r="450" fill="#020617" opacity="0.6" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 11. FRIENDSHIP (Category: friendship) ====================
  "friendship-bond": (idx) => {
    const sky = [
      ["#1e1b4b", "#4338ca", "#b45309", "#fbbf24"],
      ["#020617", "#1e3a8a", "#0284c7", "#60a5fa"],
      ["#311042", "#581c87", "#db2777", "#fbcfe8"]
    ];
    const c = sky[idx - 1];
    return `
      <defs>
        <linearGradient id="friendship-sky-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="45%" stop-color="${c[1]}" />
          <stop offset="80%" stop-color="${c[2]}" />
          <stop offset="100%" stop-color="${c[3]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#friendship-sky-${idx})" />
      ${getBokeh(10, c[3])}
      
      <!-- Mountains -->
      <path d="M 0 1150 L 300 1000 L 600 1120 L 900 950 L 1100 1050 L 1100 1360 L 0 1360 Z" fill="#0d0a1a" />
      
      <!-- Friends Silhouette sitting on the peak together -->
      <g transform="translate(180, 1020) scale(1.15)" fill="#0d0a1a">
        <!-- Friend A -->
        <circle cx="30" cy="20" r="10" />
        <path d="M 12 30 Q 30 35, 48 30 L 40 70 L 20 70 Z" />
        <!-- Friend B with arm around Friend A -->
        <circle cx="65" cy="15" r="10" />
        <path d="M 48 25 Q 65 30, 82 25 L 80 70 L 50 70 Z" />
        <!-- Friend C -->
        <circle cx="100" cy="20" r="10" />
        <path d="M 82 30 Q 100 35, 118 30 L 110 70 L 90 70 Z" />
      </g>
      
      <circle cx="540" cy="600" r="420" fill="#000000" opacity="0.3" filter="url(#heavyGlow)" />
      ${getStars(25)}
    `;
  },

  // ==================== 12. ATTITUDE (Category: attitude) ====================
  "attitude-swag": (idx) => {
    const stops = [
      ["#020617", "#090514", "#ec4899", "#38bdf8"],
      ["#050505", "#18000a", "#dc2626", "#fbbf24"],
      ["#0a0f1d", "#022c22", "#10b981", "#a7f3d0"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.6" />
      
      <!-- Tech energy lines and grids -->
      <g stroke="${c[2]}" stroke-width="1.5" opacity="0.25" fill="none">
        <line x1="0" y1="1200" x2="1080" y2="1200" />
        <line x1="0" y1="1280" x2="1080" y2="1280" />
        <line x1="100" y1="1350" x2="300" y2="1150" />
        <line x1="980" y1="1350" x2="780" y2="1150" />
      </g>
      
      <!-- Epic Crown Symbol at Top Center -->
      <g transform="translate(540, 220) scale(1.4)" filter="url(#glow)">
        <path d="M -60 30 L 60 30 L 50 45 L -50 45 Z" fill="${c[3]}" />
        <path d="M -60 30 L -70 -15 L -30 15 L 0 -35 L 30 15 L 70 -15 L 60 30 Z" fill="${c[2]}" />
        <circle cx="0" cy="-40" r="7" fill="${c[3]}" />
        <circle cx="-70" cy="-20" r="5" fill="${c[3]}" />
        <circle cx="70" cy="-20" r="5" fill="${c[3]}" />
      </g>
      
      <circle cx="540" cy="675" r="420" fill="#000000" opacity="0.5" filter="url(#heavyGlow)" />
      ${getStars(20)}
    `;
  },

  // ==================== 13. DARK AESTHETIC (Category: attitude) ====================
  "attitude-dark": (idx) => {
    const tones = [
      ["#090d16", "#020205", "#334155"],
      ["#110c11", "#050005", "#475569"],
      ["#1c1d24", "#0b0c10", "#1f2833"]
    ];
    const c = tones[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.75" />
      
      <!-- Modern abstract polygons / sharp corners (Aesthetic Darkroom feel) -->
      <g fill="none" stroke="${c[2]}" stroke-width="1" opacity="0.15">
        <polygon points="0,0 540,300 0,600" />
        <polygon points="1080,0 540,300 1080,600" />
        <polygon points="0,1350 540,1050 0,750" />
        <polygon points="1080,1350 540,1050 1080,750" />
        <circle cx="540" cy="675" r="300" />
      </g>
      
      <!-- Focused spot beam halo -->
      <circle cx="540" cy="675" r="480" fill="#000000" opacity="0.65" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 14. MOTIVATION (Category: motivation) ====================
  "motivation-drive": (idx) => {
    const stops = [
      ["#090514", "#311042", "#ea580c", "#fcd34d"],
      ["#020617", "#1e3a8a", "#0284c7", "#67e8f9"],
      ["#0c0a09", "#292524", "#dc2626", "#f87171"]
    ];
    const c = stops[idx - 1];
    return `
      <defs>
        <linearGradient id="motiv-sky-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="50%" stop-color="${c[1]}" />
          <stop offset="85%" stop-color="${c[2]}" />
          <stop offset="100%" stop-color="${c[3]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#motiv-sky-${idx})" />
      
      <!-- Massive soaring eagle silhouette -->
      <g transform="translate(540, 320) scale(1.4)" fill="#090514" opacity="0.85">
        <path d="M 0 0 C 60 -50, 150 -70, 200 -30 C 140 -20, 100 -10, 50 15 C 25 30, 10 50, 0 20 C -10 50, -25 30, -50 15 C -100 -10, -140 -20, -200 -30 C -150 -70, -60 -50, 0 0 Z" />
        <polygon points="0,20 -15,45 0,35 15,45" />
      </g>
      
      <!-- Sharp mountain peaks at the bottom -->
      <path d="M 0 1350 L 350 1000 L 700 1350 Z" fill="#090514" />
      <path d="M 500 1350 L 800 1050 L 1100 1350 Z" fill="#05030a" />
      
      <circle cx="540" cy="675" r="420" fill="#000000" opacity="0.35" filter="url(#heavyGlow)" />
      ${getStars(35)}
    `;
  },

  // ==================== 15. ISLAMIC (Category: islamic) ====================
  "islamic-holy": (idx) => {
    const stop = [
      ["#022c22", "#064e3b", "#f59e0b"],
      ["#0a192f", "#0f3057", "#00bcd4"],
      ["#130f26", "#231b45", "#e91e63"]
    ];
    const c = stop[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.7" />
      
      <!-- Islamic Dome & Minaret Silhouette -->
      <g fill="#021a14" opacity="0.95">
        <rect x="0" y="1180" width="1080" height="170" />
        <!-- Big Dome -->
        <path d="M 400 1180 C 400 1030, 680 1030, 680 1180 Z" />
        <line x1="540" y1="1030" x2="540" y2="970" stroke="${c[2]}" stroke-width="4" />
        <circle cx="540" cy="960" r="8" fill="${c[2]}" />
        <!-- Left Minaret -->
        <rect x="150" y="850" width="40" height="330" />
        <path d="M 130 850 L 210 850 L 170 780 Z" fill="${c[2]}" />
        <!-- Right Minaret -->
        <rect x="890" y="850" width="40" height="330" />
        <path d="M 870 850 L 950 850 L 910 780 Z" fill="${c[2]}" />
      </g>
      
      <!-- Glowing Gold Crescent Moon at Top Right -->
      <g transform="translate(850, 250) scale(1.1)" filter="url(#glow)">
        <circle cx="0" cy="0" r="55" fill="${c[2]}" />
        <circle cx="20" cy="-10" r="50" fill="${c[0]}" />
      </g>
      
      <circle cx="540" cy="675" r="440" fill="#000000" opacity="0.4" filter="url(#heavyGlow)" />
      <rect x="40" y="40" width="1000" height="1270" fill="none" stroke="${c[2]}" stroke-width="3" rx="15" opacity="0.3" />
      ${getStars(40)}
    `;
  },

  // ==================== 16. DUA (Category: islamic) ====================
  "islamic-dua": (idx) => {
    const stops = [
      ["#05241e", "#0a3c32", "#fcd34d"],
      ["#1e1b4b", "#312e81", "#818cf8"],
      ["#120c1f", "#24183e", "#a78bfa"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.65" />
      
      <!-- Spiritual Beams from Top Center -->
      <polygon points="540,0 200,1350 880,1350" fill="#ffffff" opacity="0.06" filter="url(#heavyGlow)" />
      
      <!-- Elegant Hanging Lanterns from the Top -->
      <g stroke="${c[2]}" stroke-width="2" fill="none">
        <line x1="250" y1="0" x2="250" y2="350" />
        <g transform="translate(225, 350)">
          <polygon points="25,0 45,20 35,60 15,60 5,20" fill="#f59e0b" stroke="${c[2]}" stroke-width="2" />
          <circle cx="25" cy="30" r="18" fill="#fff" opacity="0.4" filter="url(#glow)" />
        </g>
        <line x1="830" y1="0" x2="830" y2="280" />
        <g transform="translate(805, 280)">
          <polygon points="25,0 45,20 35,60 15,60 5,20" fill="#f59e0b" stroke="${c[2]}" stroke-width="2" />
          <circle cx="25" cy="30" r="18" fill="#fff" opacity="0.4" filter="url(#glow)" />
        </g>
      </g>
      
      <!-- Crescent moon symbol -->
      <g transform="translate(540, 220) scale(0.85)" filter="url(#glow)">
        <circle cx="0" cy="0" r="40" fill="${c[2]}" />
        <circle cx="15" cy="-8" r="37" fill="${c[1]}" />
      </g>
      
      <circle cx="540" cy="720" r="430" fill="#000000" opacity="0.4" filter="url(#heavyGlow)" />
      ${getStars(30)}
    `;
  },

  // ==================== 17. EID (Category: islamic) ====================
  "islamic-eid": (idx) => {
    const stop = [
      ["#0f172a", "#1e1b4b", "#f59e0b"],
      ["#064e3b", "#022c22", "#fbbf24"],
      ["#3b0764", "#1d003b", "#ec4899"]
    ];
    const c = stop[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.75" />
      
      <!-- Ornamental Hanging Banners / Eid Garlands -->
      <path d="M 0 100 Q 270 200, 540 100 T 1080 100" fill="none" stroke="${c[2]}" stroke-width="2.5" stroke-dasharray="10 8" />
      <!-- Small Hanging Star shapes -->
      <polygon points="270,160 273,170 283,170 275,176 278,186 270,180 262,186 265,176 257,170 267,170" fill="${c[2]}" />
      <polygon points="810,160 813,170 823,170 815,176 818,186 810,180 802,186 805,176 797,170 807,170" fill="${c[2]}" />
      
      <!-- Big Decorative Moon at Center Center but soft watermark -->
      <g transform="translate(540, 675) scale(2.8)" opacity="0.06" filter="url(#heavyGlow)">
        <circle cx="0" cy="0" r="100" fill="${c[2]}" />
      </g>
      
      <!-- Elegant border -->
      <rect x="35" y="35" width="1010" height="1280" fill="none" stroke="${c[2]}" stroke-width="4" rx="20" />
      <rect x="48" y="48" width="984" height="1254" fill="none" stroke="${c[2]}" stroke-width="1.2" rx="15" stroke-dasharray="8 6" opacity="0.5" />
      
      <circle cx="540" cy="675" r="410" fill="#000000" opacity="0.45" filter="url(#heavyGlow)" />
      ${getStars(35)}
    `;
  },

  // ==================== 18. ROSE (Category: rose) ====================
  "rose-bloom": (idx) => {
    const stops = [
      ["#310212", "#4c0519", "#db2777"],
      ["#000000", "#1c000c", "#be123c"],
      ["#4c0519", "#881337", "#f43f5e"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.7" />
      ${getBokeh(14, c[2])}
      
      <!-- Magnificent realistic roses at the bottom/top corners (Reference 1 & 2 inspired) -->
      ${getRose(180, 1150, 1.45, c[2], "#166534")}
      ${getRose(900, 1150, 1.45, "#e11d48", "#166534")}
      ${getRose(540, 1200, 1.1, c[2], "#15803d")}
      
      <circle cx="540" cy="650" r="440" fill="#000000" opacity="0.45" filter="url(#heavyGlow)" />
      ${getFallingPetals(25, c[2])}
    `;
  },

  // ==================== 19. FLOWER GARDEN (Category: nature) ====================
  "nature-garden": (idx) => {
    const tones = [
      ["#051c14", "#064e3b", "#ec4899", "#3b82f6"],
      ["#091105", "#1e3a0a", "#f43f5e", "#fbbf24"],
      ["#04111f", "#0b2545", "#db2777", "#a855f7"]
    ];
    const c = tones[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.65" />
      
      <!-- Stunning Flower Garden frames lining top and bottom -->
      ${getWatercolorFlower(150, 1150, 1.2, c[2], c[3])}
      ${getWatercolorFlower(930, 1150, 1.2, c[2], c[3])}
      ${getWatercolorFlower(540, 1220, 0.95, c[2], c[3])}
      ${getWatercolorFlower(120, 120, 0.9, c[3], c[2])}
      ${getWatercolorFlower(960, 120, 0.9, c[3], c[2])}
      
      <!-- Butterflies flying around the garden -->
      ${getButterflies(4, c[2], "#ffffff")}
      
      <circle cx="540" cy="675" r="430" fill="#000000" opacity="0.45" filter="url(#heavyGlow)" />
      ${getFallingPetals(15, c[2])}
    `;
  },

  // ==================== 20. SUNSET (Category: nature) ====================
  "nature-sunset": (idx) => {
    const skies = [
      ["#311042", "#7c2d12", "#ea580c", "#fcd34d"],
      ["#1e1b4b", "#581c87", "#db2777", "#fda4af"],
      ["#180828", "#4c0519", "#e11d48", "#fde047"]
    ];
    const c = skies[idx - 1];
    return `
      <defs>
        <linearGradient id="sunset-sky-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c[0]}" />
          <stop offset="40%" stop-color="${c[1]}" />
          <stop offset="75%" stop-color="${c[2]}" />
          <stop offset="100%" stop-color="${c[3]}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sunset-sky-${idx})" />
      
      <!-- Huge Glowing Sun sinking in background -->
      <circle cx="540" cy="850" r="240" fill="${c[3]}" opacity="0.25" filter="url(#heavyGlow)" />
      <circle cx="540" cy="850" r="100" fill="#ffffff" opacity="0.75" />
      
      <!-- Sea waves at bottom silhouette -->
      <path d="M -50 1150 Q 200 1100, 540 1130 T 1130 1150 L 1130 1360 L -50 1360 Z" fill="#13041a" />
      
      <!-- Flying sunset birds -->
      <g fill="#13041a" opacity="0.8">
        <path d="M 300 250 Q 320 230, 340 250 Q 360 230, 380 250 Q 360 260, 340 250 Q 320 260, 300 250" />
        <path d="M 750 320 Q 765 305, 780 320 Q 795 305, 810 320 Q 795 328, 780 320 Q 765 328, 750 320" transform="scale(0.85) translate(100, 50)" />
      </g>
      
      <circle cx="540" cy="620" r="410" fill="#000000" opacity="0.32" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 21. MOON NIGHT (Category: night) ====================
  "night-moon": (idx) => {
    const sky = [
      ["#020010", "#090d16", "#0f172a"],
      ["#05020a", "#120c1f", "#1e1b4b"],
      ["#02040a", "#07111e", "#0f1e36"]
    ];
    const c = sky[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.8" />
      
      <!-- Stellar Glowing Silver Moon in upper right corner -->
      <circle cx="850" cy="280" r="140" fill="#f1f5f9" opacity="0.06" filter="url(#heavyGlow)" />
      <circle cx="850" cy="280" r="70" fill="#f8fafc" opacity="0.9" filter="url(#glow)" />
      <circle cx="820" cy="250" r="60" fill="#090d16" opacity="0.85" />
      
      <!-- Pine Forest trees silhouette lining bottom -->
      <g fill="#020008" opacity="0.95">
        <polygon points="100,1350 150,1150 200,1350" />
        <polygon points="150,1350 190,1190 230,1350" />
        <polygon points="800,1350 850,1120 900,1350" />
        <polygon points="860,1350 900,1170 940,1350" />
      </g>
      
      <circle cx="540" cy="675" r="430" fill="#000000" opacity="0.5" filter="url(#heavyGlow)" />
      ${getStars(50)}
    `;
  },

  // ==================== 22. GOOD NIGHT (Category: night) ====================
  "night-good": (idx) => {
    const stop = [
      ["#120c1f", "#24183e", "#6b21a8"],
      ["#0f172a", "#1e293b", "#3b82f6"],
      ["#1e1b4b", "#312e81", "#4338ca"]
    ];
    const c = stop[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.75" />
      
      <!-- Soft dreaming clouds framing bottom -->
      <path d="M -50 1200 Q 150 1100, 350 1150 T 750 1100 T 1130 1200 L 1130 1360 L -50 1360 Z" fill="#1e1b4b" opacity="0.5" filter="url(#heavyGlow)" />
      <path d="M -50 1250 Q 250 1180, 540 1210 T 1130 1250 L 1130 1360 L -50 1360 Z" fill="#0c0a1f" opacity="0.9" />
      
      <!-- Dreamy golden stars and moon -->
      <g transform="translate(250, 250) scale(1.1)" filter="url(#glow)">
        <circle cx="0" cy="0" r="50" fill="#fde047" />
        <circle cx="18" cy="-8" r="47" fill="${c[1]}" />
      </g>
      
      <circle cx="540" cy="675" r="420" fill="#000000" opacity="0.45" filter="url(#heavyGlow)" />
      ${getStars(45)}
    `;
  },

  // ==================== 23. NATURE (Category: nature) ====================
  "nature-scenic": (idx) => {
    const themes = [
      ["#064e3b", "#022c22", "#059669"],
      ["#0b1329", "#1c2541", "#3a506b"],
      ["#141d12", "#22311d", "#4c6e43"]
    ];
    const c = themes[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.8" />
      
      <!-- Clean aesthetic mountain layers -->
      <path d="M -50 1200 L 250 1000 L 580 1180 L 880 960 L 1130 1100 L 1130 1360 L -50 1360 Z" fill="#021f14" opacity="0.6" />
      <path d="M -50 1260 L 320 1090 L 700 1240 L 980 1050 L 1130 1180 L 1130 1360 L -50 1360 Z" fill="#01140d" />
      
      <!-- Rising wild leaves in the bottom foreground -->
      <path d="M -20 1350 Q 80 1180, 150 1350" fill="none" stroke="${c[2]}" stroke-width="8" opacity="0.4" />
      <path d="M 930 1350 Q 1000 1180, 1100 1350" fill="none" stroke="${c[2]}" stroke-width="8" opacity="0.4" />
      
      <circle cx="540" cy="675" r="430" fill="#000000" opacity="0.35" filter="url(#heavyGlow)" />
      ${getFallingPetals(12, c[2])}
    `;
  },

  // ==================== 24. ROYAL BLACK & GOLD (Category: royal) ====================
  "royal-black-gold": (idx) => {
    const stop = [
      ["#050505", "#141414", "#d4af37"],
      ["#0b0b0b", "#020202", "#fcd34d"],
      ["#181818", "#0d0d0d", "#fbbf24"]
    ];
    const c = stop[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.8" />
      
      <!-- Elegant gold ornamental damask patterns / frames (Reference 4 inspired) -->
      <g stroke="${c[2]}" stroke-width="2" fill="none" opacity="0.25">
        <rect x="50" y="50" width="980" height="1250" rx="10" />
        <rect x="65" y="65" width="950" height="1220" rx="6" stroke-width="0.8" stroke-dasharray="10 6" />
        <!-- Corner decorations -->
        <path d="M 50 150 Q 150 150, 150 50 M 1030 150 Q 930 150, 930 50 M 50 1200 Q 150 1200, 150 1300 M 1030 1200 Q 930 1200, 930 1300" />
      </g>
      
      <!-- Shiny golden sparkles -->
      ${getStars(30, 1080, 1350)}
      <circle cx="540" cy="675" r="410" fill="#000000" opacity="0.6" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 25. LUXURY MARBLE (Category: royal) ====================
  "royal-marble": (idx) => {
    const bases = [
      ["#fafaf9", "#e7e5e4", "#d6d3d1", "#fbbf24"],
      ["#f5f5f4", "#e4e4e7", "#d4d4d8", "#e2e8f0"],
      ["#fafaf5", "#ede9fe", "#ddd6fe", "#8b5cf6"]
    ];
    const c = bases[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.6" />
      
      <!-- Gorgeous smooth marble veins wrapping across the background -->
      <g stroke="${c[3]}" stroke-width="3" fill="none" opacity="0.18" filter="url(#softBlur)">
        <path d="M -100 200 Q 300 400, 600 200 T 1180 500" />
        <path d="M -50 600 Q 400 500, 500 800 T 1130 900" stroke-width="1.5" />
        <path d="M 200 1350 Q 500 1000, 900 1350" />
        <path d="M 0 0 C 300 100, 200 500, 500 600" stroke-width="1" />
      </g>
      
      <!-- Soft center glow to keep text easily readable -->
      <circle cx="540" cy="675" r="440" fill="#ffffff" opacity="0.7" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 26. VINTAGE PAPER (Category: minimal) ====================
  "minimal-vintage": (idx) => {
    const colors = [
      ["#fcf6e8", "#f4ecd8", "#854d0e"],
      ["#f7f1e1", "#ebe3cf", "#713f12"],
      ["#faf5e6", "#efe6d1", "#7c2d12"]
    ];
    const c = colors[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.75" />
      
      <!-- Vintage deckled edge border & subtle stamp / ink splatters -->
      <rect x="40" y="40" width="1000" height="1270" fill="none" stroke="${c[2]}" stroke-width="1.5" opacity="0.3" rx="4" />
      
      <!-- Ink splatters / vintage key silhouette at the bottom right -->
      <g fill="${c[2]}" opacity="0.1" transform="translate(850, 1050)">
        <circle cx="20" cy="20" r="15" />
        <circle cx="45" cy="15" r="6" />
        <circle cx="10" cy="45" r="10" />
        <path d="M 10 10 Q -30 -50, -50 -100" stroke="${c[2]}" stroke-width="4" fill="none" />
      </g>
      
      <!-- Warm central read space -->
      <circle cx="540" cy="675" r="420" fill="${c[0]}" opacity="0.6" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 27. FEATHER THEME (Category: minimal) ====================
  "minimal-feather": (idx) => {
    const stops = [
      ["#f0f9ff", "#e0f2fe", "#38bdf8"],
      ["#fdf2f8", "#fce7f3", "#ec4899"],
      ["#faf5ff", "#f3e8ff", "#a855f7"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.5" />
      
      <!-- Floating micro soft vector feathers framing corners (Reference 4 inspired) -->
      <g fill="${c[2]}" opacity="0.18" filter="url(#softBlur)">
        <!-- Feather Top Left -->
        <path d="M 150 150 C 250 120, 300 200, 350 280 C 280 280, 200 220, 150 150 Z" />
        <line x1="150" y1="150" x2="350" y2="280" stroke="${c[2]}" stroke-width="3" />
        <!-- Feather Bottom Right -->
        <path d="M 930 1200 C 830 1230, 780 1150, 730 1070 C 800 1070, 880 1130, 930 1200 Z" />
        <line x1="930" y1="1200" x2="730" y2="1070" stroke="${c[2]}" stroke-width="3" />
      </g>
      
      <!-- Sparkling fairy lights -->
      ${getStars(20, 1080, 1350)}
      <circle cx="540" cy="675" r="440" fill="${c[0]}" opacity="0.75" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 28. GOOD MORNING (Category: minimal) ====================
  "minimal-morning": (idx) => {
    const stops = [
      ["#fffbeb", "#fef3c7", "#f59e0b"],
      ["#f0fdf4", "#dcfce7", "#10b981"],
      ["#f0f9ff", "#e0f2fe", "#0ea5e9"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <!-- Soft morning sun rays radiating from top left -->
      <polygon points="0,0 200,1350 500,1350" fill="#fff" opacity="0.25" filter="url(#heavyGlow)" />
      <polygon points="0,0 600,1350 900,1350" fill="#fff" opacity="0.15" filter="url(#heavyGlow)" />
      
      <!-- Dewy morning fresh leaves at bottom left -->
      <g fill="none" stroke="${c[2]}" stroke-width="4" opacity="0.35">
        <path d="M 0 1350 Q 250 1200, 120 1000" />
        <!-- Leaves -->
        <path d="M 100 1250 C 130 1220, 180 1250, 100 1280 Z" fill="${c[2]}" />
        <path d="M 150 1150 C 180 1120, 230 1150, 150 1180 Z" fill="${c[2]}" />
      </g>
      
      <!-- Morning flight birds -->
      <g fill="${c[2]}" opacity="0.4" transform="translate(650, 250)">
        <path d="M 0 0 Q 15 -10, 30 0 Q 45 -10, 60 0 Q 45 5, 30 0 Q 15 5, 0 0 Z" />
      </g>
      <circle cx="540" cy="675" r="420" fill="${c[0]}" opacity="0.65" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 29. LIFE (Category: minimal) ====================
  "minimal-life": (idx) => {
    const stops = [
      ["#fafaf9", "#f5f5f4", "#78716c"],
      ["#f4f4f5", "#e4e4e7", "#52525b"],
      ["#f0fdfa", "#ccfbf1", "#0d9488"]
    ];
    const c = stops[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.7" />
      
      <!-- Minimalist elegant branches framing edges -->
      <g stroke="${c[2]}" stroke-width="2.5" fill="none" opacity="0.25">
        <path d="M 1080 0 Q 800 150, 950 450" />
        <circle cx="950" cy="450" r="6" fill="${c[2]}" />
        <path d="M 0 1350 Q 280 1200, 130 900" />
        <circle cx="130" cy="900" r="6" fill="${c[2]}" />
      </g>
      
      <!-- Minimal center reading area -->
      <circle cx="540" cy="675" r="450" fill="${c[0]}" opacity="0.8" filter="url(#heavyGlow)" />
    `;
  },

  // ==================== 30. PREMIUM MIXED COLLECTION (Category: minimal) ====================
  "minimal-mixed": (idx) => {
    const setups = [
      ["#fafaf9", "#f5f3ff", "#c084fc", "#f472b6"],
      ["#fffbeb", "#fff7ed", "#fda4af", "#93c5fd"],
      ["#f0fdf4", "#f0fdfa", "#6ee7b7", "#93c5fd"]
    ];
    const c = setups[idx - 1];
    return `
      <rect width="100%" height="100%" fill="${c[0]}" />
      <rect width="100%" height="100%" fill="${c[1]}" opacity="0.5" />
      
      <!-- Soft beautiful abstract shapes in corners -->
      <circle cx="100" cy="100" r="180" fill="${c[2]}" opacity="0.12" filter="url(#heavyGlow)" />
      <circle cx="980" cy="1250" r="220" fill="${c[3]}" opacity="0.12" filter="url(#heavyGlow)" />
      
      <circle cx="540" cy="675" r="440" fill="${c[0]}" opacity="0.85" filter="url(#heavyGlow)" />
      ${getFallingPetals(8, c[2])}
    `;
  }
};

// SVG Global template construction
function buildFullSVG(content) {
  return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <!-- Heavy glow filter for premium lighting effects -->
    <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="60" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="25" />
    </filter>
  </defs>
  ${content}
</svg>`;
}

// Generate the 90 premium SVGs
console.log("Generating 90 premium high-fidelity card backgrounds...");
let count = 0;

for (const [key, generator] of Object.entries(GENERATORS)) {
  for (let i = 1; i <= 3; i++) {
    const filename = `${key}-${i}.svg`;
    const filepath = path.join(OUT_DIR, filename);
    const content = buildFullSVG(generator(i));
    fs.writeFileSync(filepath, content, "utf8");
    count++;
  }
}

console.log(`Successfully generated ${count} high-fidelity Shayari card backgrounds inside public/assets/card_styles/!`);
