'use strict';

const fs   = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────────
const SRC_DIR   = path.join(__dirname, 'src');
const DIST_DIR  = path.join(__dirname, 'dist');
const ADMIN_SRC = path.join(__dirname, 'admin');
const ADMIN_DST = path.join(DIST_DIR, 'admin');

// ── Read content ───────────────────────────────────────────────────────────
const data = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'content.json'), 'utf8'));

// ── Helper: copy a directory recursively ──────────────────────────────────
function copyDir(src, dst) {
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  fs.readdirSync(src).forEach(function (entry) {
    const srcPath = path.join(src, entry);
    const dstPath = path.join(dst, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  });
}

// ── Generators ────────────────────────────────────────────────────────────

function genStatCards(stats) {
  return stats.map(function (s) {
    return (
      '<div class="stat-card">' +
        '<div class="stat-number">' + s.number + '</div>' +
        '<div class="stat-label">'  + s.label  + '</div>' +
      '</div>'
    );
  }).join('\n        ');
}

function genExpertiseCards(cards) {
  var delays = ['fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3'];
  return cards.map(function (c, i) {
    return (
      '<div class="expertise-card fade-in ' + delays[i % 3] + '">' +
        '<div class="expertise-icon">' + c.icon        + '</div>' +
        '<div class="expertise-title">' + c.title      + '</div>' +
        '<div class="expertise-desc">'  + c.description + '</div>' +
      '</div>'
    );
  }).join('\n      ');
}

function genCaseTags(tags) {
  return tags.map(function (t) {
    return '<span class="case-tag">' + t + '</span>';
  }).join('\n              ');
}

function genImpacts(impacts) {
  return impacts.map(function (imp) {
    return '<span class="impact-item">' + imp + '</span>';
  }).join('\n              ');
}

function genCaseStudies(studies) {
  var delays = ['', ' fade-in-delay-1', ' fade-in-delay-2'];
  return studies.map(function (s, i) {
    return (
      '<div class="case-card fade-in' + delays[i % 3] + '" id="' + s.id + '">\n' +
      '        <div class="case-header" onclick="toggleCase(\'' + s.id + '\')">\n' +
      '          <span class="case-number">' + s.number + '</span>\n' +
      '          <div>\n' +
      '            <div class="case-title">' + s.title + '</div>\n' +
      '            <div class="case-meta">\n' +
      '              <span class="case-client">' + s.client + '</span>\n' +
      '              ' + genCaseTags(s.tags) + '\n' +
      '            </div>\n' +
      '          </div>\n' +
      '          <div class="case-toggle">+</div>\n' +
      '        </div>\n' +
      '        <div class="case-summary">\n' +
      '          ' + s.summary + '\n' +
      '        </div>\n' +
      '        <div class="case-body">\n' +
      '          <div class="case-section">\n' +
      '            <div class="case-section-label">Challenge</div>\n' +
      '            <p>' + s.challenge + '</p>\n' +
      '          </div>\n' +
      '          <div class="case-section">\n' +
      '            <div class="case-section-label">Solution</div>\n' +
      '            <p>' + s.solution + '</p>\n' +
      '          </div>\n' +
      '          <div class="case-section">\n' +
      '            <div class="case-section-label">Impact</div>\n' +
      '            <div class="impact-list">\n' +
      '              ' + genImpacts(s.impacts) + '\n' +
      '            </div>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </div>'
    );
  }).join('\n\n      ');
}

function genSkillGroups(groups) {
  var delays = ['fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3', 'fade-in-delay-4'];
  return groups.map(function (g, i) {
    var tags = g.tags.map(function (t) {
      return '<span class="skill-tag">' + t + '</span>';
    }).join('\n          ');
    return (
      '<div class="skill-group fade-in ' + delays[i % 4] + '">\n' +
      '        <div class="skill-group-title">' + g.title + '</div>\n' +
      '        <div class="skill-tags">\n' +
      '          ' + tags + '\n' +
      '        </div>\n' +
      '      </div>'
    );
  }).join('\n      ');
}

function genTimelineItems(items) {
  var delays = ['fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3'];
  return items.map(function (item, i) {
    return (
      '<div class="timeline-item fade-in ' + delays[i % 3] + '">\n' +
      '        <div class="timeline-dot"></div>\n' +
      '        <div class="timeline-period">' + item.period      + '</div>\n' +
      '        <div class="timeline-role">'   + item.role        + '</div>\n' +
      '        <div class="timeline-company">' + item.company    + '</div>\n' +
      '        <div class="timeline-desc">'    + item.description + '</div>\n' +
      '      </div>'
    );
  }).join('\n      ');
}

function genEduCards(items) {
  var delays = ['fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3', 'fade-in-delay-4'];
  return items.map(function (item, i) {
    return (
      '<div class="edu-card fade-in ' + delays[i % 4] + '">\n' +
      '        <div class="edu-icon">' + item.icon   + '</div>\n' +
      '        <div>\n' +
      '          <div class="edu-degree">' + item.degree + '</div>\n' +
      '          <div class="edu-issuer">' + item.issuer + '</div>\n' +
      '        </div>\n' +
      '      </div>'
    );
  }).join('\n      ');
}

function genMetricCards(items) {
  var delays = ['fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3'];
  return items.map(function (item, i) {
    var decimalAttr = item.decimal ? ' data-decimal="1"' : '';
    var suffixAttr  = item.suffix  ? ' data-suffix="' + item.suffix + '"' : '';
    return (
      '<div class="metric-card fade-in ' + delays[i % 3] + '">\n' +
      '        <div class="metric-value" data-target="' + item.target + '"' + suffixAttr + decimalAttr + '>0</div>\n' +
      '        <div class="metric-label">' + item.label + '</div>\n' +
      '      </div>'
    );
  }).join('\n      ');
}

// ── Full HTML generator ────────────────────────────────────────────────────
function generateHTML(d) {
  var hero      = d.hero;
  var about     = d.about;
  var expertise = d.expertise;
  var cs        = d.caseStudies;
  var skills    = d.skills;
  var timeline  = d.timeline;
  var education = d.education;
  var metrics   = d.metrics;
  var contact   = d.contact;
  var footer    = d.footer;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.site.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #1a1a26;
    --bg-card-hover: #1e1e2e;
    --accent: #4f8cff;
    --accent-dim: rgba(79, 140, 255, 0.12);
    --accent-glow: rgba(79, 140, 255, 0.3);
    --accent-2: #7c5cfc;
    --accent-gradient: linear-gradient(135deg, #4f8cff, #7c5cfc);
    --text-primary: #e8e8f0;
    --text-secondary: #9090aa;
    --text-muted: #5a5a72;
    --border: rgba(79, 140, 255, 0.18);
    --border-subtle: rgba(255, 255, 255, 0.06);
    --shadow-card: 0 4px 28px rgba(0, 0, 0, 0.45);
    --shadow-accent: 0 0 40px rgba(79, 140, 255, 0.12);
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --nav-height: 68px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }

  body {
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent-dim); color: var(--accent); }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-primary); }
  ::-webkit-scrollbar-thumb { background: rgba(79, 140, 255, 0.25); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: var(--nav-height);
    background: rgba(10, 10, 15, 0.82);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-bottom: 1px solid var(--border-subtle);
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 0 clamp(1rem, 5vw, 3rem);
    transition: var(--transition);
  }

  nav.scrolled {
    background: rgba(10, 10, 15, 0.97);
    box-shadow: 0 4px 30px rgba(0,0,0,0.55);
  }

  .nav-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
  }

  .nav-links {
    display: flex;
    gap: 0.15rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.84rem;
    font-weight: 500;
    padding: 0.45rem 0.8rem;
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }

  .nav-links a:hover {
    color: var(--text-primary);
    background: var(--accent-dim);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    border: none;
    background: none;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-secondary);
    border-radius: 2px;
    transition: var(--transition);
  }

  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    display: none;
    position: fixed;
    top: var(--nav-height);
    left: 0; right: 0;
    background: rgba(10, 10, 15, 0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    padding: 0.75rem 1rem 1rem;
    z-index: 999;
    flex-direction: column;
    gap: 0.2rem;
  }

  .mobile-menu.open { display: flex; }

  .mobile-menu a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.7rem 1rem;
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }

  .mobile-menu a:hover {
    color: var(--text-primary);
    background: var(--accent-dim);
  }

  /* ── LAYOUT ── */
  section { padding: clamp(4rem, 10vw, 7rem) clamp(1rem, 5vw, 3rem); }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 0.7rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-label::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 2px;
    background: var(--accent-gradient);
    border-radius: 2px;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.7rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.18;
    margin-bottom: 0.9rem;
    color: var(--text-primary);
  }

  .section-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 600px;
    margin-bottom: 3rem;
    line-height: 1.7;
  }

  /* ── ANIMATIONS ── */
  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-in-delay-1 { transition-delay: 0.1s; }
  .fade-in-delay-2 { transition-delay: 0.2s; }
  .fade-in-delay-3 { transition-delay: 0.3s; }
  .fade-in-delay-4 { transition-delay: 0.4s; }
  .fade-in-delay-5 { transition-delay: 0.5s; }

  /* ── HERO ── */
  #hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: calc(var(--nav-height) + 2rem);
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  .hero-glow-1 {
    position: absolute;
    top: -15%;
    left: -8%;
    width: 65%;
    height: 65%;
    background: radial-gradient(ellipse, rgba(79, 140, 255, 0.09) 0%, transparent 68%);
    animation: bgPulse 9s ease-in-out infinite alternate;
  }

  .hero-glow-2 {
    position: absolute;
    bottom: -20%;
    right: -8%;
    width: 55%;
    height: 55%;
    background: radial-gradient(ellipse, rgba(124, 92, 252, 0.07) 0%, transparent 68%);
    animation: bgPulse 11s ease-in-out infinite alternate-reverse;
  }

  @keyframes bgPulse {
    0%   { transform: scale(1) translate(0,0); opacity: 0.55; }
    100% { transform: scale(1.18) translate(2%, 2%); opacity: 1; }
  }

  .hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(79, 140, 255, 0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79, 140, 255, 0.028) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 920px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: rgba(79, 140, 255, 0.1);
    border: 1px solid rgba(79, 140, 255, 0.22);
    border-radius: 100px;
    padding: 0.38rem 1rem;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 1.6rem;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.04em;
  }

  .hero-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    animation: dotBlink 2.2s ease-in-out infinite;
  }

  @keyframes dotBlink {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(79,140,255,0.5); }
    50% { opacity: 0.35; box-shadow: 0 0 0 4px rgba(79,140,255,0); }
  }

  .hero-name {
    font-size: clamp(3.2rem, 8.5vw, 6.2rem);
    font-weight: 900;
    letter-spacing: -0.045em;
    line-height: 0.95;
    margin-bottom: 0.7rem;
    background: linear-gradient(145deg, #ffffff 0%, #c8d8ff 45%, #9898cc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-title {
    font-size: clamp(0.95rem, 2.2vw, 1.3rem);
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 1.6rem;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: -0.01em;
  }

  .hero-tagline {
    font-size: clamp(0.97rem, 1.9vw, 1.1rem);
    color: var(--text-secondary);
    max-width: 680px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .hero-tagline strong { color: var(--text-primary); font-weight: 600; }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--accent-gradient);
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.88rem;
    padding: 0.78rem 1.75rem;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 22px rgba(79, 140, 255, 0.38);
    letter-spacing: 0.01em;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(79, 140, 255, 0.52);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.88rem;
    padding: 0.78rem 1.75rem;
    border-radius: 100px;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: var(--transition);
    letter-spacing: 0.01em;
  }

  .btn-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-dim);
    transform: translateY(-2px);
  }

  .hero-scroll-cue {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    color: var(--text-muted);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
    animation: scrollFloat 2.2s ease-in-out infinite;
  }

  .hero-scroll-cue::after {
    content: '';
    width: 1px;
    height: 36px;
    background: linear-gradient(to bottom, var(--text-muted), transparent);
  }

  @keyframes scrollFloat {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
    50% { transform: translateX(-50%) translateY(7px); opacity: 0.9; }
  }

  /* ── ABOUT ── */
  #about { background: var(--bg-secondary); }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .about-text p {
    color: var(--text-secondary);
    line-height: 1.88;
    font-size: 0.98rem;
  }

  .about-text p + p { margin-top: 1.1rem; }
  .about-text strong { color: var(--text-primary); font-weight: 600; }

  .about-stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }

  .stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1.4rem;
    transition: var(--transition);
  }

  .stat-card:hover {
    border-color: var(--border);
    background: var(--bg-card-hover);
    transform: translateY(-3px);
    box-shadow: var(--shadow-card);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 900;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .stat-label {
    font-size: 0.76rem;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1.4;
  }

  /* ── EXPERTISE ── */
  #expertise { background: var(--bg-primary); }

  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.1rem;
  }

  .expertise-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1.65rem;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }

  .expertise-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent-gradient);
    opacity: 0;
    transition: var(--transition);
  }

  .expertise-card:hover {
    border-color: var(--border);
    background: var(--bg-card-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-card), var(--shadow-accent);
  }

  .expertise-card:hover::before { opacity: 1; }

  .expertise-icon {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-sm);
    background: var(--accent-dim);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .expertise-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .expertise-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.68;
  }

  /* ── CASE STUDIES ── */
  #case-studies { background: var(--bg-secondary); }

  .case-studies-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .case-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color var(--transition), box-shadow var(--transition);
  }

  .case-card:hover {
    border-color: rgba(79, 140, 255, 0.22);
    box-shadow: var(--shadow-card);
  }

  .case-card.open {
    border-color: rgba(79, 140, 255, 0.28);
  }

  .case-header {
    padding: 1.6rem 1.85rem;
    cursor: pointer;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1.1rem;
    align-items: start;
    transition: background var(--transition);
    user-select: none;
  }

  .case-header:hover { background: rgba(79, 140, 255, 0.04); }

  .case-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--accent);
    background: var(--accent-dim);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.28rem 0.6rem;
    white-space: nowrap;
    margin-top: 0.15rem;
    letter-spacing: 0.04em;
  }

  .case-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.35rem;
    line-height: 1.3;
  }

  .case-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }

  .case-client {
    font-size: 0.78rem;
    color: var(--text-muted);
    margin-right: 0.25rem;
  }

  .case-tag {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent);
    background: var(--accent-dim);
    padding: 0.18rem 0.6rem;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.02em;
  }

  .case-toggle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1rem;
    line-height: 1;
    transition: var(--transition);
    flex-shrink: 0;
    margin-top: 0.1rem;
    font-weight: 300;
  }

  .case-card.open .case-toggle {
    transform: rotate(45deg);
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }

  .case-summary {
    padding: 0 1.85rem 1.5rem calc(1.85rem + 2.3rem + 1.1rem);
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.72;
    margin-top: -0.25rem;
  }

  .case-body {
    display: none;
    padding: 1.5rem 1.85rem 1.85rem;
    border-top: 1px solid var(--border-subtle);
  }

  .case-card.open .case-body { display: block; }

  .case-section { margin-top: 1.4rem; }
  .case-section:first-child { margin-top: 0; }

  .case-section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 0.55rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .case-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-subtle);
  }

  .case-section p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.82;
  }

  .case-section p strong { color: var(--text-primary); font-weight: 600; }

  .impact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.65rem;
  }

  .impact-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(79, 255, 140, 0.07);
    border: 1px solid rgba(79, 255, 140, 0.18);
    border-radius: 100px;
    padding: 0.3rem 0.8rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #50e09a;
  }

  .impact-item::before { content: '↗'; font-size: 0.72rem; }

  /* ── SKILLS ── */
  #skills { background: var(--bg-primary); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
    gap: 1.25rem;
  }

  .skill-group {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1.65rem;
    transition: var(--transition);
  }

  .skill-group:hover {
    border-color: var(--border);
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-card);
  }

  .skill-group-title {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 0.9rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .skill-tag {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.28rem 0.7rem;
    border-radius: 6px;
    transition: var(--transition);
  }

  .skill-tag:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-dim);
  }

  /* ── TIMELINE ── */
  #timeline { background: var(--bg-secondary); }

  .timeline {
    position: relative;
    padding-left: 2.5rem;
    max-width: 800px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0.6rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--accent-2), transparent);
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2.5rem;
  }

  .timeline-item:last-child { margin-bottom: 0; }

  .timeline-dot {
    position: absolute;
    left: -2.15rem;
    top: 0.42rem;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent-gradient);
    border: 2.5px solid var(--bg-secondary);
    box-shadow: 0 0 0 3px rgba(79, 140, 255, 0.2);
  }

  .timeline-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 0.3rem;
    letter-spacing: 0.06em;
  }

  .timeline-role {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
    line-height: 1.3;
  }

  .timeline-company {
    font-size: 0.86rem;
    color: var(--text-secondary);
    margin-bottom: 0.7rem;
  }

  .timeline-company strong { color: var(--accent); }

  .timeline-desc {
    font-size: 0.86rem;
    color: var(--text-muted);
    line-height: 1.78;
  }

  /* ── EDUCATION ── */
  #education { background: var(--bg-primary); }

  .edu-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }

  .edu-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 1.4rem;
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    transition: var(--transition);
  }

  .edu-card:hover {
    border-color: var(--border);
    background: var(--bg-card-hover);
    transform: translateY(-3px);
    box-shadow: var(--shadow-card);
  }

  .edu-icon {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: var(--radius-sm);
    background: var(--accent-dim);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  .edu-degree {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
    line-height: 1.35;
  }

  .edu-issuer {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  /* ── METRICS ── */
  #metrics { background: var(--bg-secondary); }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .metric-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 2rem 1.5rem;
    text-align: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }

  .metric-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent-gradient);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  .metric-card:hover {
    border-color: var(--border);
    background: var(--bg-card-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-card), var(--shadow-accent);
  }

  .metric-card:hover::after { transform: scaleX(1); }

  .metric-value {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 0.55rem;
    letter-spacing: -0.035em;
  }

  .metric-label {
    font-size: 0.82rem;
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1.45;
  }

  /* ── CONTACT ── */
  #contact { background: var(--bg-primary); }

  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-intro {
    font-size: 0.97rem;
    color: var(--text-secondary);
    line-height: 1.82;
    margin-bottom: 1.85rem;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    text-decoration: none;
    color: var(--text-secondary);
    padding: 0.9rem 1.15rem;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    transition: var(--transition);
    font-size: 0.88rem;
  }

  .contact-link:hover {
    color: var(--text-primary);
    border-color: var(--accent);
    background: var(--accent-dim);
    transform: translateX(4px);
  }

  .contact-link-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: var(--radius-sm);
    background: var(--accent-dim);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
  }

  .contact-link-label {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.82rem;
    display: block;
    margin-bottom: 0.05rem;
  }

  .contact-link-val {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .contact-cta-box {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 2.25rem;
    position: relative;
    overflow: hidden;
  }

  .contact-cta-box::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -15%;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(79, 140, 255, 0.055) 0%, transparent 70%);
    pointer-events: none;
  }

  .contact-cta-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.9rem;
    letter-spacing: -0.025em;
    line-height: 1.32;
  }

  .contact-cta-text {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 1.65rem;
  }

  /* ── FOOTER ── */
  footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-subtle);
    padding: 1.75rem clamp(1rem, 5vw, 3rem);
    text-align: center;
  }

  .footer-text {
    font-size: 0.83rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .footer-accent {
    color: var(--accent);
    font-style: italic;
    font-weight: 500;
  }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: var(--border-subtle);
    margin: 0 clamp(1rem, 5vw, 3rem);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .about-grid        { grid-template-columns: 1fr; gap: 2.5rem; }
    .contact-wrapper   { grid-template-columns: 1fr; gap: 2.5rem; }
    .metrics-grid      { grid-template-columns: repeat(2, 1fr); }
    .edu-grid          { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .nav-links         { display: none; }
    .hamburger         { display: flex; }
    .about-stat-grid   { grid-template-columns: 1fr 1fr; }
    .metrics-grid      { grid-template-columns: repeat(2, 1fr); }
    .case-summary      { padding-left: 1.85rem; }
  }

  @media (max-width: 480px) {
    .metrics-grid      { grid-template-columns: 1fr 1fr; }
    .hero-ctas         { flex-direction: column; }
    .btn-primary,
    .btn-secondary     { text-align: center; justify-content: center; }
    .case-header       { gap: 0.65rem; }
  }
</style>
</head>
<body>

<!-- ═══ NAV ═══ -->
<nav id="navbar">
  <div class="nav-inner">
    <a href="#hero" class="nav-logo">TP//</a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#expertise">Expertise</a></li>
      <li><a href="#case-studies">Case Studies</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#timeline">Experience</a></li>
      <li><a href="#metrics">Impact</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <a href="#about">About</a>
  <a href="#expertise">Expertise</a>
  <a href="#case-studies">Case Studies</a>
  <a href="#skills">Skills</a>
  <a href="#timeline">Experience</a>
  <a href="#metrics">Impact</a>
  <a href="#contact">Contact</a>
</div>

<!-- ═══ HERO ═══ -->
<section id="hero">
  <div class="hero-bg">
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>
    <div class="hero-grid-bg"></div>
  </div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        ${hero.badge}
      </div>
      <h1 class="hero-name">${hero.name_line1}<br>${hero.name_line2}</h1>
      <p class="hero-title">${hero.title}</p>
      <p class="hero-tagline">
        ${hero.tagline}
      </p>
      <div class="hero-ctas">
        <a href="#case-studies" class="btn-primary">View My Work &darr;</a>
        <a href="#contact" class="btn-secondary">Contact Me</a>
      </div>
    </div>
  </div>
  <div class="hero-scroll-cue">Scroll</div>
</section>

<!-- ═══ ABOUT ═══ -->
<section id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-text fade-in">
        <div class="section-label">About Me</div>
        <h2 class="section-title">${about.heading}</h2>
        ${about.paragraphs.map(function(p){ return '<p>' + p + '</p>'; }).join('\n        ')}
      </div>
      <div class="about-stat-grid fade-in fade-in-delay-2">
        ${genStatCards(about.stats)}
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ EXPERTISE ═══ -->
<section id="expertise">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Domain Expertise</div>
      <h2 class="section-title">${expertise.heading}</h2>
      <p class="section-subtitle">${expertise.subtitle}</p>
    </div>
    <div class="expertise-grid">
      ${genExpertiseCards(expertise.cards)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ CASE STUDIES ═══ -->
<section id="case-studies">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Case Studies</div>
      <h2 class="section-title">${cs.heading}</h2>
      <p class="section-subtitle">${cs.subtitle}</p>
    </div>

    <div class="case-studies-list">
      ${genCaseStudies(cs.studies)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ SKILLS ═══ -->
<section id="skills">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Technical Skills</div>
      <h2 class="section-title">${skills.heading}</h2>
      <p class="section-subtitle">${skills.subtitle}</p>
    </div>
    <div class="skills-grid">
      ${genSkillGroups(skills.groups)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ TIMELINE ═══ -->
<section id="timeline">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Professional Timeline</div>
      <h2 class="section-title">${timeline.heading}</h2>
      <p class="section-subtitle">${timeline.subtitle}</p>
    </div>
    <div class="timeline">
      ${genTimelineItems(timeline.items)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ EDUCATION ═══ -->
<section id="education">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Education &amp; Certifications</div>
      <h2 class="section-title">${education.heading}</h2>
    </div>
    <div class="edu-grid">
      ${genEduCards(education.items)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ METRICS ═══ -->
<section id="metrics">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Impact Numbers</div>
      <h2 class="section-title">${metrics.heading}</h2>
      <p class="section-subtitle">${metrics.subtitle}</p>
    </div>
    <div class="metrics-grid">
      ${genMetricCards(metrics.items)}
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ CONTACT ═══ -->
<section id="contact">
  <div class="container">
    <div class="fade-in">
      <div class="section-label">Get In Touch</div>
      <h2 class="section-title">Let's Connect</h2>
    </div>
    <div class="contact-wrapper">
      <div class="fade-in fade-in-delay-1">
        <p class="contact-intro">
          ${contact.intro}
        </p>
        <div class="contact-links">
          <a href="mailto:${contact.email}" class="contact-link">
            <div class="contact-link-icon">&#x2709;&#xFE0F;</div>
            <div>
              <span class="contact-link-label">Email</span>
              <span class="contact-link-val">${contact.email}</span>
            </div>
          </a>
          <a href="tel:${contact.phone.replace(/\s/g,'')}" class="contact-link">
            <div class="contact-link-icon">&#x1F4F1;</div>
            <div>
              <span class="contact-link-label">Phone</span>
              <span class="contact-link-val">${contact.phone}</span>
            </div>
          </a>
          <a href="#" class="contact-link">
            <div class="contact-link-icon">&#x1F4CD;</div>
            <div>
              <span class="contact-link-label">Location</span>
              <span class="contact-link-val">${contact.location}</span>
            </div>
          </a>
          <a href="${contact.linkedin}" target="_blank" rel="noopener" class="contact-link">
            <div class="contact-link-icon">&#x1F4BC;</div>
            <div>
              <span class="contact-link-label">LinkedIn</span>
              <span class="contact-link-val">View Profile</span>
            </div>
          </a>
        </div>
      </div>
      <div class="contact-cta-box fade-in fade-in-delay-2">
        <div class="contact-cta-title">${contact.cta_title}</div>
        <p class="contact-cta-text">
          ${contact.cta_text}
        </p>
        <a href="mailto:${contact.email}" class="btn-primary">Send Me a Message &rarr;</a>
      </div>
    </div>
  </div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer>
  <p class="footer-text">
    ${footer.text} &nbsp;&mdash;&nbsp;
    <span class="footer-accent">"${footer.tagline}"</span>
  </p>
</footer>

<script>
(function () {
  'use strict';

  /* ── NAV SCROLL CLASS ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── INTERSECTION OBSERVER: fade-in ── */
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -55px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ── CASE STUDY TOGGLE ── */
  window.toggleCase = function (id) {
    var card = document.getElementById(id);
    if (!card) return;
    card.classList.toggle('open');
  };

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el) {
    var target  = parseFloat(el.dataset.target);
    var suffix  = el.dataset.suffix  || '';
    var decimal = el.dataset.decimal === '1';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed  = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current  = eased * target;

      el.textContent = decimal
        ? current.toFixed(1) + suffix
        : Math.floor(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = (decimal ? target.toFixed(1) : Math.floor(target)) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric-value[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });

})();
</script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

const html = generateHTML(data);
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf8');
console.log('Built: dist/index.html (' + html.length + ' bytes)');

// Copy admin folder to dist/admin
if (fs.existsSync(ADMIN_SRC)) {
  copyDir(ADMIN_SRC, ADMIN_DST);
  console.log('Copied: admin/ → dist/admin/');
}

console.log('Build complete.');
