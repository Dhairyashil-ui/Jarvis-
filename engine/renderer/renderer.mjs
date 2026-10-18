/**
 * Renderer for UI Universe composed blueprints.
 * Produces clean, highly aesthetic, self-contained responsive HTML/CSS.
 */

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderBlueprintToHtml(composedBlueprint) {
  const theme = composedBlueprint.theme || {};
  const palette = theme.palette || {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#38bdf8',
    background: '#090a0f',
    surface: 'rgba(20, 22, 32, 0.75)',
    text: '#f8fafc',
    mutedText: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };
  const typography = theme.typography || {
    headingFont: 'Space Grotesk',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'JetBrains Mono'
  };

  const nav = composedBlueprint.navigation || {};
  const footer = composedBlueprint.footer || {};
  const activePage = composedBlueprint.pages?.[0] || { sections: [] };

  // Render navigation bar
  let navHtml = '';
  if (nav && nav.brand) {
    const brandName = escapeHtml(nav.brand.name || 'UI Universe');
    const linksHtml = (nav.links || []).map(l =>
      `<a href="${escapeHtml(l.href)}" class="nav-link">${escapeHtml(l.label)}</a>`
    ).join('');

    const actionsHtml = (nav.actions || []).map(a =>
      `<a href="${escapeHtml(a.href)}" class="nav-btn btn-${escapeHtml(a.variant || 'primary')}">${escapeHtml(a.label)}</a>`
    ).join('');

    navHtml = `
      <header class="site-header">
        <div class="nav-container">
          <a href="#" class="brand-logo">
            <span class="logo-mark">⚡</span>
            <span class="brand-text">${brandName}</span>
          </a>
          <nav class="nav-menu">${linksHtml}</nav>
          <div class="nav-actions">${actionsHtml}</div>
        </div>
      </header>
    `;
  }

  // Render sections
  let sectionsHtml = '';
  for (const sec of activePage.sections) {
    const p = sec.props || {};

    if (sec.id === 'hero' || sec.componentId.includes('hero')) {
      const headline = escapeHtml(p.headline || 'Architecting Next-Gen Web Experiences');
      const subheadline = escapeHtml(p.subheadline || 'Built with UI Universe modular blueprints.');
      const badge = escapeHtml(p.badge || 'New Release v2.0');
      const ctaP = escapeHtml(p.ctaPrimary || 'Get Started Free');
      const ctaS = escapeHtml(p.ctaSecondary || 'View Documentation');

      sectionsHtml += `
        <section id="hero" class="section hero-section">
          <div class="hero-bg-glow"></div>
          <div class="container hero-content">
            <div class="hero-badge"><span class="badge-dot"></span>${badge}</div>
            <h1 class="hero-title">${headline}</h1>
            <p class="hero-desc">${subheadline}</p>
            <div class="hero-actions">
              <a href="#get-started" class="btn btn-primary">${ctaP}</a>
              <a href="#docs" class="btn btn-secondary">${ctaS}</a>
            </div>
            <div class="hero-preview-frame">
              <div class="frame-bar">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="frame-title">ai-blueprint-active.json</span>
              </div>
              <div class="frame-body">
                <div class="code-preview">
                  <span class="kwd">const</span> blueprint = <span class="str">"ui-universe-v2"</span>;<br>
                  <span class="cmt">// Zero code duplication — 97% token efficiency achieved.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    } else if (sec.id === 'social_proof' || sec.componentId.includes('social-proof')) {
      const label = escapeHtml(p.label || 'TRUSTED BY INNOVATION TEAMS WORLDWIDE');
      const logos = (p.logos || ['Google', 'DeepMind', 'Vercel', 'Linear', 'Stripe', 'Anthropic']).map(escapeHtml);
      const logosList = [...logos, ...logos].map(l => `<div class="logo-item">${l}</div>`).join('');

      sectionsHtml += `
        <section class="section social-proof-section">
          <div class="container">
            <p class="social-label">${label}</p>
            <div class="marquee-track">
              <div class="marquee-inner">${logosList}</div>
            </div>
          </div>
        </section>
      `;
    } else if (sec.id === 'features' || sec.componentId.includes('bento') || sec.componentId.includes('features')) {
      const eyebrow = escapeHtml(p.eyebrow || 'INTELLIGENT CAPABILITIES');
      const headline = escapeHtml(p.headline || 'Engineered for Performance & Aesthetic Supremacy');
      const cards = p.cards || [];
      const cardsHtml = cards.map((c, i) => `
        <div class="bento-card bento-card-${i + 1}">
          <div class="card-glow"></div>
          <div class="card-tag">${escapeHtml(c.tag || 'Verified')}</div>
          <h3 class="card-title">${escapeHtml(c.title || 'Feature')}</h3>
          <p class="card-desc">${escapeHtml(c.description || '')}</p>
        </div>
      `).join('');

      sectionsHtml += `
        <section id="features" class="section features-section">
          <div class="container">
            <div class="section-header">
              <span class="eyebrow">${eyebrow}</span>
              <h2 class="section-title">${headline}</h2>
            </div>
            <div class="bento-grid">${cardsHtml}</div>
          </div>
        </section>
      `;
    } else if (sec.id === 'interactive_showcase' || sec.componentId.includes('showcase')) {
      const headline = escapeHtml(p.headline || 'Spatial 3D Preview');
      const subheadline = escapeHtml(p.subheadline || 'Zero-dependency interactive perspective.');

      sectionsHtml += `
        <section id="showcase" class="section showcase-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">${headline}</h2>
              <p class="section-desc">${subheadline}</p>
            </div>
            <div class="showcase-canvas-wrap">
              <div class="showcase-cylinder">
                <div class="cylinder-card" style="--rot: 0deg">✨ Intelligent AI Blueprint</div>
                <div class="cylinder-card" style="--rot: 72deg">🪐 Orbiting 3D Globe</div>
                <div class="cylinder-card" style="--rot: 144deg">⚡ 1,000+ Components</div>
                <div class="cylinder-card" style="--rot: 216deg">💎 100 HTML Templates</div>
                <div class="cylinder-card" style="--rot: 288deg">🛡️ 100% MIT Licensed</div>
              </div>
            </div>
          </div>
        </section>
      `;
    } else if (sec.id === 'pricing' || sec.componentId.includes('pricing')) {
      const eyebrow = escapeHtml(p.eyebrow || 'TRANSPARENT PRICING');
      const headline = escapeHtml(p.headline || 'Start Free, Scale Universally');
      const plans = p.plans || [];
      const plansHtml = plans.map(pl => `
        <div class="pricing-card ${pl.popular ? 'popular' : ''}">
          ${pl.popular ? '<div class="popular-badge">MOST POPULAR</div>' : ''}
          <h3 class="plan-name">${escapeHtml(pl.name)}</h3>
          <div class="plan-price">
            <span class="price-val">${escapeHtml(pl.price)}</span>
            <span class="price-period">${escapeHtml(pl.period || '/mo')}</span>
          </div>
          <p class="plan-desc">${escapeHtml(pl.description || '')}</p>
          <ul class="plan-features">
            ${(pl.features || []).map(f => `<li><span class="check">✓</span> ${escapeHtml(f)}</li>`).join('')}
          </ul>
          <button class="btn ${pl.popular ? 'btn-primary' : 'btn-secondary'} plan-btn">Select ${escapeHtml(pl.name)}</button>
        </div>
      `).join('');

      sectionsHtml += `
        <section id="pricing" class="section pricing-section">
          <div class="container">
            <div class="section-header">
              <span class="eyebrow">${eyebrow}</span>
              <h2 class="section-title">${headline}</h2>
            </div>
            <div class="pricing-grid">${plansHtml}</div>
          </div>
        </section>
      `;
    } else if (sec.id === 'faq' || sec.componentId.includes('faq')) {
      const headline = escapeHtml(p.headline || 'Frequently Asked Questions');
      const items = p.items || [];
      const faqsHtml = items.map((item, idx) => `
        <details class="faq-item" ${idx === 0 ? 'open' : ''}>
          <summary class="faq-question">
            <span>${escapeHtml(item.q)}</span>
            <span class="faq-icon">+</span>
          </summary>
          <div class="faq-answer"><p>${escapeHtml(item.a)}</p></div>
        </details>
      `).join('');

      sectionsHtml += `
        <section id="faq" class="section faq-section">
          <div class="container faq-container">
            <div class="section-header">
              <h2 class="section-title">${headline}</h2>
            </div>
            <div class="faq-list">${faqsHtml}</div>
          </div>
        </section>
      `;
    } else if (sec.id === 'cta' || sec.componentId.includes('cta')) {
      const headline = escapeHtml(p.headline || 'Ready to build with UI Universe?');
      const subheadline = escapeHtml(p.subheadline || 'Assemble high-performance websites in seconds.');
      const ctaLabel = escapeHtml(p.ctaLabel || 'Get Started Now');

      sectionsHtml += `
        <section class="section cta-section">
          <div class="container">
            <div class="cta-banner">
              <div class="cta-glow"></div>
              <h2 class="cta-title">${headline}</h2>
              <p class="cta-desc">${subheadline}</p>
              <a href="#pricing" class="btn btn-primary cta-btn">${ctaLabel}</a>
            </div>
          </div>
        </section>
      `;
    }
  }

  // Render footer
  let footerHtml = '';
  if (footer) {
    const copyright = escapeHtml(footer.copyright || `© ${new Date().getFullYear()} UI Universe. All rights reserved.`);
    const colsHtml = (footer.columns || []).map(col => `
      <div class="footer-col">
        <h4 class="col-title">${escapeHtml(col.title)}</h4>
        <ul class="col-links">
          ${(col.links || []).map(l => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    footerHtml = `
      <footer class="site-footer">
        <div class="container footer-container">
          <div class="footer-brand">
            <span class="logo-mark">⚡</span>
            <span class="brand-text">UI Universe</span>
            <p class="brand-tagline">The foundation for AI-native website generation.</p>
          </div>
          <div class="footer-cols">${colsHtml}</div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <p class="copyright">${copyright}</p>
          </div>
        </div>
      </footer>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(activePage.title || 'UI Universe Generated Site')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(typography.headingFont)}:wght@600;700;800&family=${encodeURIComponent(typography.bodyFont)}:wght@400;500;600&family=${encodeURIComponent(typography.monoFont)}:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :root {
      --primary: ${palette.primary || '#6366f1'};
      --secondary: ${palette.secondary || '#a855f7'};
      --accent: ${palette.accent || '#38bdf8'};
      --bg: ${palette.background || '#090a0f'};
      --surface: ${palette.surface || 'rgba(20, 22, 32, 0.75)'};
      --text: ${palette.text || '#f8fafc'};
      --muted: ${palette.mutedText || '#94a3b8'};
      --border: ${palette.border || 'rgba(255, 255, 255, 0.08)'};
      --radius: ${theme.radius || '16px'};
      --font-heading: '${typography.headingFont}', sans-serif;
      --font-body: '${typography.bodyFont}', sans-serif;
      --font-mono: '${typography.monoFont}', monospace;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .section {
      padding: 90px 0;
      position: relative;
    }
    /* HEADER */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(9, 10, 15, 0.8);
      border-bottom: 1px solid var(--border);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
    }
    .logo-mark {
      color: var(--accent);
      font-size: 22px;
    }
    .nav-menu {
      display: flex;
      gap: 28px;
    }
    .nav-link {
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.2s;
    }
    .nav-link:hover {
      color: #fff;
    }
    .nav-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .nav-btn {
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-ghost {
      color: var(--muted);
      background: transparent;
    }
    .btn-ghost:hover {
      color: #fff;
    }
    .btn-shimmer, .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff;
      box-shadow: 0 0 24px rgba(99, 102, 241, 0.35);
    }
    .btn-shimmer:hover, .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 32px rgba(99, 102, 241, 0.6);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.25s ease;
      border: none;
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }
    /* HERO */
    .hero-section {
      padding: 120px 0 80px;
      text-align: center;
      position: relative;
    }
    .hero-bg-glow {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%);
      pointer-events: none;
      filter: blur(60px);
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 13px;
      color: var(--accent);
      margin-bottom: 24px;
    }
    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent);
    }
    .hero-title {
      font-family: var(--font-heading);
      font-size: clamp(38px, 6vw, 68px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 20px;
      background: linear-gradient(180deg, #ffffff 30%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-desc {
      font-size: 18px;
      color: var(--muted);
      max-width: 680px;
      margin: 0 auto 36px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 60px;
    }
    .hero-preview-frame {
      max-width: 800px;
      margin: 0 auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
      overflow: hidden;
      backdrop-filter: blur(20px);
    }
    .frame-bar {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      background: rgba(0, 0, 0, 0.4);
      border-bottom: 1px solid var(--border);
      gap: 8px;
    }
    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }
    .frame-title {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--muted);
      margin-left: 12px;
    }
    .frame-body {
      padding: 24px;
      text-align: left;
      font-family: var(--font-mono);
      font-size: 14px;
    }
    .kwd { color: #f43f5e; }
    .str { color: #38bdf8; }
    .cmt { color: #64748b; }
    /* SOCIAL PROOF */
    .social-proof-section {
      padding: 40px 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .social-label {
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.15em;
      color: var(--muted);
      margin-bottom: 24px;
    }
    .marquee-track {
      overflow: hidden;
      display: flex;
    }
    .marquee-inner {
      display: flex;
      gap: 48px;
      animation: marquee 25s linear infinite;
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .logo-item {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.35);
      white-space: nowrap;
    }
    /* BENTO FEATURES */
    .section-header {
      text-align: center;
      margin-bottom: 54px;
    }
    .eyebrow {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--accent);
      margin-bottom: 12px;
    }
    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .section-desc {
      color: var(--muted);
      font-size: 16px;
      margin-top: 12px;
    }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }
    .bento-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px 28px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bento-card:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-4px);
    }
    .card-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      background: rgba(56, 189, 248, 0.1);
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 20px;
    }
    .card-title {
      font-family: var(--font-heading);
      font-size: 20px;
      margin-bottom: 12px;
    }
    .card-desc {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.6;
    }
    /* SHOWCASE 3D */
    .showcase-canvas-wrap {
      height: 380px;
      perspective: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .showcase-cylinder {
      position: relative;
      width: 240px;
      height: 140px;
      transform-style: preserve-3d;
      animation: spin3d 20s linear infinite;
    }
    @keyframes spin3d {
      from { transform: rotateY(0deg) rotateX(-10deg); }
      to { transform: rotateY(360deg) rotateX(-10deg); }
    }
    .cylinder-card {
      position: absolute;
      width: 240px;
      height: 140px;
      background: rgba(20, 24, 38, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-heading);
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      transform: rotateY(var(--rot)) translateZ(280px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    }
    /* PRICING */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      align-items: stretch;
    }
    .pricing-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .pricing-card.popular {
      border-color: var(--primary);
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.2);
    }
    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 999px;
    }
    .plan-name {
      font-family: var(--font-heading);
      font-size: 20px;
      margin-bottom: 12px;
    }
    .plan-price {
      margin-bottom: 16px;
    }
    .price-val {
      font-size: 42px;
      font-weight: 800;
      font-family: var(--font-heading);
    }
    .price-period {
      color: var(--muted);
      font-size: 14px;
    }
    .plan-desc {
      color: var(--muted);
      font-size: 14px;
      margin-bottom: 24px;
    }
    .plan-features {
      list-style: none;
      margin-bottom: 32px;
      flex-grow: 1;
    }
    .plan-features li {
      font-size: 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .check {
      color: #10b981;
      font-weight: bold;
    }
    .plan-btn {
      width: 100%;
    }
    /* FAQ */
    .faq-container {
      max-width: 800px;
    }
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .faq-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }
    .faq-question {
      padding: 20px 24px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
    }
    .faq-question::-webkit-details-marker {
      display: none;
    }
    .faq-icon {
      font-size: 20px;
      color: var(--muted);
      transition: transform 0.2s;
    }
    .faq-item[open] .faq-icon {
      transform: rotate(45deg);
    }
    .faq-answer {
      padding: 0 24px 20px;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }
    /* CTA */
    .cta-banner {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.15));
      border: 1px solid rgba(99, 102, 241, 0.4);
      border-radius: var(--radius);
      padding: 60px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .cta-title {
      font-family: var(--font-heading);
      font-size: clamp(28px, 4vw, 44px);
      margin-bottom: 16px;
    }
    .cta-desc {
      color: var(--muted);
      font-size: 18px;
      max-width: 600px;
      margin: 0 auto 32px;
    }
    /* FOOTER */
    .site-footer {
      border-top: 1px solid var(--border);
      padding: 70px 0 30px;
      background: rgba(6, 7, 10, 0.95);
    }
    .footer-container {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }
    .footer-brand .brand-text {
      font-size: 18px;
      font-weight: 700;
      font-family: var(--font-heading);
    }
    .brand-tagline {
      color: var(--muted);
      font-size: 13px;
      margin-top: 8px;
      max-width: 280px;
    }
    .footer-cols {
      display: flex;
      gap: 60px;
      flex-wrap: wrap;
    }
    .col-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #fff;
    }
    .col-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .col-links a {
      color: var(--muted);
      font-size: 13px;
      transition: color 0.2s;
    }
    .col-links a:hover {
      color: #fff;
    }
    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 24px;
      text-align: center;
      color: var(--muted);
      font-size: 13px;
    }
  </style>
</head>
<body>
  ${navHtml}
  <main>
    ${sectionsHtml}
  </main>
  ${footerHtml}
</body>
</html>`;
}
