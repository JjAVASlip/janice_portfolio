const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function createSvg(width, height, title, subtitle, tag, icon, accentColor = '#2864FF', glowColor = '#7652E8') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1530"/>
      <stop offset="50%" stop-color="#060810"/>
      <stop offset="100%" stop-color="#2A164D"/>
    </linearGradient>
    <radialGradient id="glow" cx="65%" cy="35%" r="60%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="${glowColor}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- Geometric Elements -->
  <circle cx="${width * 0.8}" cy="${height * 0.3}" r="${height * 0.35}" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="1" stroke-dasharray="6 6"/>
  <circle cx="${width * 0.8}" cy="${height * 0.3}" r="${height * 0.45}" fill="none" stroke="rgba(40,100,255,0.1)" stroke-width="1"/>
  <circle cx="${width * 0.2}" cy="${height * 0.8}" r="${height * 0.25}" fill="none" stroke="rgba(118,82,232,0.12)" stroke-width="1"/>

  <!-- Content Box -->
  <g transform="translate(${width * 0.1}, ${height * 0.25})">
    <!-- Tag -->
    <rect x="0" y="0" width="${tag.length * 9 + 24}" height="26" rx="13" fill="rgba(255,255,255,0.06)" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
    <text x="12" y="17" font-family="'Sora', sans-serif" font-size="11" font-weight="600" fill="#D4AF37" letter-spacing="1.5">${tag.toUpperCase()}</text>

    <!-- Icon Badge -->
    <g transform="translate(0, 45)">
      <rect x="0" y="0" width="60" height="60" rx="16" fill="rgba(40,100,255,0.15)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <text x="30" y="38" font-family="'Sora', sans-serif" font-size="24" text-anchor="middle" fill="#F0D77A">${icon}</text>
    </g>

    <!-- Title -->
    <text x="0" y="145" font-family="'Sora', sans-serif" font-size="${width > 600 ? '28' : '22'}" font-weight="700" fill="#F5F3EE" letter-spacing="0.5">${title}</text>
    
    <!-- Subtitle -->
    <text x="0" y="175" font-family="'Inter', sans-serif" font-size="14" font-weight="400" fill="#A9B0C0">${subtitle}</text>

    <!-- Decorative Gold Accent Line -->
    <line x1="0" y1="205" x2="120" y2="205" stroke="#D4AF37" stroke-width="2"/>
    <circle cx="120" cy="205" r="3" fill="#D4AF37"/>
  </g>

  <!-- Watermark -->
  <text x="${width - 30}" y="${height - 25}" font-family="'Sora', sans-serif" font-size="10" font-weight="500" fill="rgba(255,255,255,0.3)" text-anchor="end" letter-spacing="2">JANICE MAS BULANON • BSIT NCST</text>
</svg>`;
}

const assets = [
  {
    name: 'janice-portrait.jpg',
    w: 800, h: 1000,
    title: 'Janice Mas Bulanon',
    sub: '3rd Year BSIT • National College of Science & Technology',
    tag: 'PORTRAIT PLACEHOLDER',
    icon: 'JB',
    acc: '#D4AF37', glow: '#7652E8'
  },
  {
    name: 'about-01.jpg',
    w: 800, h: 1000,
    title: 'NCST Campus & Systems Lab',
    sub: 'Academic Exploration & Process Planning',
    tag: 'STUDENT PROFILE',
    icon: '🎓',
    acc: '#2864FF', glow: '#7652E8'
  },
  {
    name: 'about-02.jpg',
    w: 800, h: 600,
    title: 'Pamplona STEM Graduate',
    sub: 'Consistent Honor Student Foundation',
    tag: 'HONORS & ACADEMICS',
    icon: '⭐',
    acc: '#D4AF37', glow: '#2864FF'
  },
  {
    name: 'about-03.jpg',
    w: 800, h: 600,
    title: 'Systems & Workflow Design',
    sub: 'From Concept to Functional Diagram',
    tag: 'METHODOLOGY',
    icon: '📊',
    acc: '#7652E8', glow: '#2864FF'
  },
  {
    name: 'studyquest.jpg',
    w: 1200, h: 750,
    title: 'StudyQuest Application',
    sub: 'Gamified Milestone Tracker & Study Routine Planner',
    tag: 'COMPROG 1 PROJECT',
    icon: '🎯',
    acc: '#2864FF', glow: '#D4AF37'
  },
  {
    name: 'ihelpu.jpg',
    w: 1200, h: 750,
    title: 'iHelp U Assistance Portal',
    sub: 'Responsive Community Support & Ticket Routing Platform',
    tag: 'WEBTECH 2 PROJECT',
    icon: '🤝',
    acc: '#7652E8', glow: '#2864FF'
  },
  {
    name: 'oop-project.jpg',
    w: 1200, h: 750,
    title: 'OOP Management System',
    sub: 'Object-Oriented Architecture & UML Class Modeling',
    tag: 'OBJECT-ORIENTED PROGRAMMING',
    icon: '⚙️',
    acc: '#2864FF', glow: '#7652E8'
  },
  {
    name: 'sarismart.jpg',
    w: 1200, h: 750,
    title: 'SariSmart POS & HR System',
    sub: 'Integrated Store Operations & Employee Management Architecture',
    tag: 'SYSTEM INTEGRATION ARCHITECTURE',
    icon: '🏪',
    acc: '#D4AF37', glow: '#7652E8'
  },
  {
    name: 'visual-01.jpg',
    w: 900, h: 675,
    title: 'SariSmart Process Flowchart',
    sub: 'Complete Transaction & Shift Routing Diagram',
    tag: 'WORKFLOW DIAGRAM',
    icon: '🔄',
    acc: '#2864FF', glow: '#7652E8'
  },
  {
    name: 'visual-02.jpg',
    w: 900, h: 675,
    title: 'Relational Schema (ERD)',
    sub: 'Normalized Multi-Table MySQL Architecture',
    tag: 'DATA MODEL',
    icon: '🗄️',
    acc: '#7652E8', glow: '#D4AF37'
  },
  {
    name: 'visual-03.jpg',
    w: 900, h: 675,
    title: 'iHelp U Figma UI Suite',
    sub: 'High-Fidelity Component Library & Responsive Mockups',
    tag: 'UI/UX DESIGN',
    icon: '🎨',
    acc: '#2864FF', glow: '#D4AF37'
  },
  {
    name: 'visual-04.jpg',
    w: 900, h: 675,
    title: 'StudyQuest Wireframe Journey',
    sub: 'Low-Fidelity Screen Architecture & User Path Mapping',
    tag: 'WIREFRAMING',
    icon: '📐',
    acc: '#D4AF37', glow: '#7652E8'
  },
  {
    name: 'visual-05.jpg',
    w: 900, h: 675,
    title: 'QA Functional Test Matrix',
    sub: 'Validation Checklist, Edge Case Log & Bug Triage',
    tag: 'QUALITY ASSURANCE',
    icon: '📋',
    acc: '#2864FF', glow: '#7652E8'
  },
  {
    name: 'visual-06.jpg',
    w: 900, h: 675,
    title: 'Data Flow Diagram (DFD 0 & 1)',
    sub: 'Information Exchange Protocols & Data Store Boundaries',
    tag: 'SYSTEM ANALYSIS',
    icon: '🔀',
    acc: '#7652E8', glow: '#2864FF'
  }
];

assets.forEach(a => {
  const svg = createSvg(a.w, a.h, a.title, a.sub, a.tag, a.icon, a.acc, a.glow);
  fs.writeFileSync(path.join(imgDir, a.name), svg, 'utf8');
});

console.log('Successfully generated all placeholder assets!');
