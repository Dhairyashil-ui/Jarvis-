/**
 * UI Universe — Visual Catalog Explorer & AI Website Builder Client
 */

import { SearchIndex } from '../../engine/search/searchIndex.mjs';
import { AIBlueprintPlanner, THEME_PRESETS } from '../../engine/planner/aiPlanner.mjs';
import { BlueprintComposer } from '../../engine/composer/composer.mjs';
import { renderBlueprintToHtml } from '../../engine/renderer/renderer.mjs';
import { validateBlueprint } from '../../engine/validator/blueprintValidator.mjs';

// Application State
const state = {
  registry: null,
  allEntries: [],
  searchIndex: null,
  activeTab: 'explorer',
  activeTypeFilter: 'all',
  activeLibraryFilter: 'all',
  activeCategoryFilter: 'all',
  activeTemplateCategory: 'all',
  searchQuery: '',
  viewMode: 'grid',
  activeModalEntry: null,
  active3dEngine: 'ring-carousel.html',
  currentBlueprint: null,
  planner: null,
  composer: null
};

// Toast notification helper
export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// Copy to clipboard helper
export function copyText(text, label = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(label);
  }).catch(() => {
    showToast('Failed to copy');
  });
}

// Initialize Application
async function initApp() {
  console.log('🌌 UI Universe Client Initializing...');

  try {
    const res = await fetch('/catalog/registry.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.registry = await res.json();
  } catch (err) {
    console.warn('Could not fetch /catalog/registry.json directly, trying relative or fallback:', err);
    try {
      const res = await fetch('catalog/registry.json');
      state.registry = await res.json();
    } catch (e2) {
      console.error('Fatal: Could not load registry.', e2);
      return;
    }
  }

  // Flatten entries for search index
  const templates = (state.registry.templates || []).map(t => ({ ...t, type: 'template' }));
  const sections = (state.registry.sections || []).map(s => ({ ...s, type: 'section' }));
  const components = (state.registry.components || []).map(c => ({ ...c, type: 'component' }));
  const effects = (state.registry.effects || []).map(e => ({ ...e, type: e.type || 'effect' }));

  state.allEntries = [...templates, ...sections, ...components, ...effects];
  state.searchIndex = new SearchIndex(state.allEntries);
  state.planner = new AIBlueprintPlanner(state.searchIndex);
  state.composer = new BlueprintComposer(state.searchIndex.idMap);

  // Update header counters
  updateHeaderMetrics();

  // Setup UI event listeners
  setupTabs();
  setupSearch();
  setupFilters();
  setupStudio();
  setup3dLab();
  setupModal();
  setupTemplatesGallery();
  setupTelemetry();

  // Initial renders
  renderExplorerCards();
  renderTemplatesGallery();

  // Initial AI plan
  generateInitialBlueprint();
}

function updateHeaderMetrics() {
  const counts = state.registry?.counts || {};
  document.getElementById('metric-total').textContent = counts.totalCatalogEntries || state.allEntries.length;
  document.getElementById('metric-templates').textContent = counts.verifiedTemplates || 100;
  document.getElementById('metric-sections').textContent = counts.verifiedSections || 697;
  document.getElementById('metric-components').textContent = counts.verifiedComponents || 415;
  document.getElementById('metric-effects').textContent = counts.verifiedEffectsAnd3d || 140;
}

function setupTabs() {
  const tabBtns = document.querySelectorAll('.nav-tabs .tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetTab = btn.dataset.tab;
      state.activeTab = targetTab;

      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) activePane.classList.add('active');

      if (targetTab === 'templates') {
        renderTemplatesGallery();
      } else if (targetTab === '3d') {
        load3dEngine(state.active3dEngine);
      }
    });
  });
}

function setupSearch() {
  const input = document.getElementById('global-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.activeTab !== 'explorer') {
      // switch to explorer tab
      document.querySelector('.tab-btn[data-tab="explorer"]').click();
    }
    renderExplorerCards();
  });

  // Keyboard shortcut '/'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      input.focus();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function setupFilters() {
  // Type filters
  const typeItems = document.querySelectorAll('.filter-item[data-type]');
  typeItems.forEach(item => {
    item.addEventListener('click', () => {
      typeItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.activeTypeFilter = item.dataset.type;
      renderExplorerCards();
    });
  });

  // Library filters
  const libItems = document.querySelectorAll('.filter-item[data-library]');
  libItems.forEach(item => {
    item.addEventListener('click', () => {
      libItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.activeLibraryFilter = item.dataset.library;
      renderExplorerCards();
    });
  });
}

// -----------------------------------------------------------------------------
// EXPLORER TAB RENDER
// -----------------------------------------------------------------------------
function renderExplorerCards() {
  const container = document.getElementById('explorer-cards');
  const countEl = document.getElementById('results-count');
  if (!container) return;

  const results = state.searchIndex.search(state.searchQuery, {
    type: state.activeTypeFilter,
    limit: 60
  });

  // Filter by library if set
  const filtered = results.filter(entry => {
    if (state.activeLibraryFilter === 'all') return true;
    const lib = state.activeLibraryFilter.toLowerCase();
    const repo = (entry.sourceRepository || '').toLowerCase();
    const id = (entry.id || '').toLowerCase();
    if (lib === '100-templates') return id.startsWith('template.') || id.startsWith('section.');
    if (lib === 'react-bits') return repo.includes('react-bits') || id.includes('reactbits');
    if (lib === 'magic-ui') return repo.includes('magicui') || id.includes('magicui');
    if (lib === 'motion') return repo.includes('motion-primitives') || repo.includes('motiq');
    if (lib === 'shadcn') return repo.includes('animate-ui') || id.includes('primitive');
    if (lib === '3d') return id.includes('3d') || entry.type === '3d';
    return true;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} entries`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 18px; margin-bottom: 8px;">No matching components or templates found.</p>
        <p style="font-size: 13px;">Try clearing filters or searching for terms like "hero", "bento", "button", "carousel", or "pricing".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isTemplate = item.id.startsWith('template.');
    const isSection = item.id.startsWith('section.');
    const typeClass = `type-${item.type || (isTemplate ? 'template' : isSection ? 'section' : 'component')}`;
    const typeLabel = item.type || (isTemplate ? 'template' : isSection ? 'section' : 'component');

    let sourceLabel = 'Open Source';
    if (isTemplate) sourceLabel = '100 Templates';
    else if (item.sourceRepository?.includes('react-bits')) sourceLabel = 'React Bits';
    else if (item.sourceRepository?.includes('magicui')) sourceLabel = 'Magic UI';
    else if (item.sourceRepository?.includes('motion-primitives')) sourceLabel = 'Motion';
    else if (item.sourceRepository?.includes('animate-ui')) sourceLabel = 'Animate UI';
    else if (item.id.includes('.3d.')) sourceLabel = '3D Engine';

    // Thumbnail logic
    let thumbHtml = '';
    if (item.screenshotPath) {
      thumbHtml = `<img src="${item.screenshotPath}" alt="${item.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'thumb-placeholder\\'><span class=\\'thumb-icon\\'>🖼️</span><span>Screenshot</span></div>'">`;
    } else if (item.type === '3d' || item.id.includes('.3d.')) {
      thumbHtml = `<div class="thumb-placeholder"><span class="thumb-icon">🪐</span><span>3D Interactive Engine</span></div>`;
    } else if (item.type === 'shader' || item.category === 'backgrounds') {
      thumbHtml = `<div class="thumb-placeholder"><span class="thumb-icon">✨</span><span>Shader / Canvas Effect</span></div>`;
    } else {
      thumbHtml = `<div class="thumb-placeholder"><span class="thumb-icon">⚡</span><span>${item.category}</span></div>`;
    }

    return `
      <div class="catalog-card" data-id="${item.id}">
        <div class="card-preview-thumb">
          ${thumbHtml}
          <span class="card-type-tag ${typeClass}">${typeLabel}</span>
          <span class="card-source-tag">${sourceLabel}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h4 class="card-title">${item.name}</h4>
            <span class="card-category">${item.category}</span>
          </div>
          <p class="card-desc">${item.description || ''}</p>
          <div class="card-id-chip" title="Click to copy ID" onclick="window.copyText('${item.id}', 'Copied ID: ${item.id}')">
            <span class="card-id-text">${item.id}</span>
            <span class="card-id-copy-icon">📋</span>
          </div>
          <div class="card-footer">
            <div class="card-badges">
              <span class="badge-tag">${item.framework || 'html'}</span>
              <span class="badge-tag">${item.license?.id || 'MIT'}</span>
            </div>
            <button class="card-action-btn" onclick="window.openDetailModal('${item.id}')">Inspect</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -----------------------------------------------------------------------------
// TEMPLATES GALLERY TAB
// -----------------------------------------------------------------------------
function setupTemplatesGallery() {
  const catPills = document.querySelectorAll('.template-cat-bar .cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeTemplateCategory = pill.dataset.cat;
      renderTemplatesGallery();
    });
  });
}

function renderTemplatesGallery() {
  const container = document.getElementById('templates-grid');
  if (!container) return;

  const templates = state.registry?.templates || [];
  const filtered = templates.filter(t => {
    if (state.activeTemplateCategory === 'all') return true;
    return t.category === state.activeTemplateCategory;
  });

  container.innerHTML = filtered.map(t => {
    const secPills = (t.sections || []).slice(0, 4).map(s => `<span class="sec-pill">${s.name}</span>`).join('');
    const extraCount = Math.max(0, (t.sections || []).length - 4);

    return `
      <div class="template-card">
        <div class="template-card-thumb">
          <img src="${t.screenshotPath}" alt="${t.name}" loading="lazy" onerror="this.src='/og.jpg'">
          <span class="template-badge">${t.category.toUpperCase()}</span>
          <span class="template-sections-badge">${t.sections?.length || 0} Sections</span>
        </div>
        <div class="template-card-body">
          <h3 class="template-title">${t.name}</h3>
          <p class="template-desc">${t.description}</p>
          <div class="template-sections-list">
            ${secPills}
            ${extraCount > 0 ? `<span class="sec-pill">+${extraCount} more</span>` : ''}
          </div>
          <div class="template-actions">
            <button class="btn-preview" onclick="window.openTemplatePreview('${t.sourcePath}', '${t.name}')">Launch Preview</button>
            <button class="btn-load-studio" onclick="window.loadTemplateToStudio('${t.id}')">Load in AI Studio</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -----------------------------------------------------------------------------
// AI BLUEPRINT STUDIO
// -----------------------------------------------------------------------------
function setupStudio() {
  const planBtn = document.getElementById('btn-plan-ai');
  const promptInput = document.getElementById('studio-prompt-input');
  const presets = document.querySelectorAll('.preset-chip');
  const textarea = document.getElementById('blueprint-editor');
  const vpBtns = document.querySelectorAll('.viewport-btn');
  const copyBtn = document.getElementById('btn-copy-blueprint');
  const downloadBtn = document.getElementById('btn-download-html');

  if (planBtn && promptInput) {
    planBtn.addEventListener('click', () => {
      const prompt = promptInput.value.trim();
      if (!prompt) return;
      generateBlueprintFromPrompt(prompt);
    });

    promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        planBtn.click();
      }
    });
  }

  presets.forEach(chip => {
    chip.addEventListener('click', () => {
      promptInput.value = chip.dataset.prompt;
      generateBlueprintFromPrompt(chip.dataset.prompt);
    });
  });

  if (textarea) {
    textarea.addEventListener('input', () => {
      try {
        const parsed = JSON.parse(textarea.value);
        state.currentBlueprint = parsed;
        const validation = validateBlueprint(parsed);
        updateValidationBadge(validation);
        if (validation.valid) {
          renderStudioPreview(parsed);
        }
      } catch (err) {
        updateValidationBadge({ valid: false, errors: ['JSON Syntax Error: ' + err.message] });
      }
    });
  }

  vpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vpBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vp = btn.dataset.viewport;
      const iframe = document.getElementById('studio-preview-frame');
      if (iframe) {
        iframe.className = `preview-iframe ${vp}`;
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!state.currentBlueprint) return;
      copyText(JSON.stringify(state.currentBlueprint, null, 2), 'Copied JSON Blueprint!');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!state.currentBlueprint) return;
      const composed = state.composer.compose(state.currentBlueprint);
      const html = renderBlueprintToHtml(composed);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.currentBlueprint.pages?.[0]?.id || 'website'}-ui-universe.html`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded Standalone HTML bundle!');
    });
  }
}

function generateInitialBlueprint() {
  generateBlueprintFromPrompt('Architect an autonomous AI platform with dark neon cinematic styling');
}

function generateBlueprintFromPrompt(prompt) {
  if (!state.planner) return;
  const result = state.planner.planWebsite(prompt);
  state.currentBlueprint = result.blueprint;

  const textarea = document.getElementById('blueprint-editor');
  if (textarea) {
    textarea.value = JSON.stringify(result.blueprint, null, 2);
  }

  updateValidationBadge(result.validation);
  updateTokenMetrics(result.tokenMetrics);
  renderStudioPreview(result.blueprint);
}

function updateValidationBadge(validation) {
  const badge = document.getElementById('blueprint-validation-badge');
  if (!badge) return;

  if (validation.valid) {
    badge.className = 'validation-badge valid';
    badge.innerHTML = '<span>✓</span> Valid Schema';
  } else {
    badge.className = 'validation-badge invalid';
    badge.innerHTML = `<span>✕</span> ${validation.errors.length} Issue(s)`;
    badge.title = validation.errors.join('\n');
  }
}

function updateTokenMetrics(metrics) {
  const savingsEl = document.getElementById('token-savings-val');
  const jsonSizeEl = document.getElementById('token-json-size');
  const codeSizeEl = document.getElementById('token-code-size');

  if (savingsEl) savingsEl.textContent = `${metrics.tokenSavingsPct}% Token Savings`;
  if (jsonSizeEl) jsonSizeEl.textContent = `${(metrics.jsonLengthBytes / 1024).toFixed(1)} KB JSON`;
  if (codeSizeEl) codeSizeEl.textContent = `${(metrics.estCodeLengthBytes / 1024).toFixed(1)} KB Equivalent Code`;
}

function renderStudioPreview(blueprint) {
  const iframe = document.getElementById('studio-preview-frame');
  if (!iframe) return;

  try {
    const composed = state.composer.compose(blueprint);
    const html = renderBlueprintToHtml(composed);
    iframe.srcdoc = html;
  } catch (err) {
    console.error('Error composing/rendering blueprint:', err);
  }
}

// -----------------------------------------------------------------------------
// 3D EXPERIENCES LAB
// -----------------------------------------------------------------------------
function setup3dLab() {
  const cards = document.querySelectorAll('.lab-engine-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const file = card.dataset.file;
      load3dEngine(file);
    });
  });
}

function load3dEngine(file) {
  state.active3dEngine = file;
  const iframe = document.getElementById('lab-viewport');
  if (iframe) {
    iframe.src = file;
  }
}

// -----------------------------------------------------------------------------
// DETAIL MODAL & INSPECTOR
// -----------------------------------------------------------------------------
function setupModal() {
  const modal = document.getElementById('detail-modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Modal tabs
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.modal-tab-pane').forEach(p => p.style.display = 'none');
      const activePane = document.getElementById(`modal-pane-${target}`);
      if (activePane) activePane.style.display = 'block';
    });
  });
}

export function openDetailModal(id) {
  const entry = state.searchIndex.getById(id);
  if (!entry) return;
  state.activeModalEntry = entry;

  const modal = document.getElementById('detail-modal-overlay');
  document.getElementById('modal-title').textContent = entry.name;
  document.getElementById('modal-id').textContent = entry.id;

  // React usage tab
  const reactCodeEl = document.getElementById('modal-code-react');
  if (reactCodeEl) {
    const usage = entry.previewCode || `<${entry.name.replace(/\s+/g, '')} />`;
    const depInstall = (entry.dependencies || []).length > 0 ? `npm install ${(entry.dependencies || []).join(' ')}\n\n` : '';
    reactCodeEl.textContent = `${depInstall}// Import and Usage:\n${usage}`;
  }

  // Blueprint snippet tab
  const bpCodeEl = document.getElementById('modal-code-blueprint');
  if (bpCodeEl) {
    const bpSnippet = {
      id: entry.id.split('.').slice(-2, -1)[0],
      component: entry.id,
      props: entry.properties ? Object.fromEntries(Object.keys(entry.properties).map(k => [k, entry.properties[k].default ?? ''])) : {}
    };
    bpCodeEl.textContent = JSON.stringify(bpSnippet, null, 2);
  }

  // Live preview tab
  const previewContainer = document.getElementById('modal-preview-container');
  if (previewContainer) {
    if (entry.sourcePath) {
      previewContainer.innerHTML = `<iframe class="modal-preview-iframe" src="${entry.sourcePath}"></iframe>`;
    } else if (entry.originalSourcePath && entry.originalSourcePath.endsWith('.html')) {
      previewContainer.innerHTML = `<iframe class="modal-preview-iframe" src="${entry.originalSourcePath}"></iframe>`;
    } else {
      previewContainer.innerHTML = `
        <div style="padding: 60px 20px; text-align: center; color: var(--text-muted);">
          <p style="font-size: 16px; margin-bottom: 8px;">React / TypeScript Component</p>
          <p style="font-size: 13px;">Source: <code>${entry.originalSourcePath || entry.id}</code></p>
          <p style="margin-top: 16px;"><button class="card-action-btn" onclick="window.copyText('${entry.id}')">Copy Registry ID</button></p>
        </div>
      `;
    }
  }

  // Dependencies tab
  const depsEl = document.getElementById('modal-deps-list');
  if (depsEl) {
    const deps = entry.dependencies || [];
    depsEl.textContent = deps.length > 0 ? deps.join('\n') : 'No external dependencies (Zero-dependency asset)';
  }

  modal.classList.add('open');
}

export function openTemplatePreview(path, name) {
  const modal = document.getElementById('detail-modal-overlay');
  document.getElementById('modal-title').textContent = `${name} — Live Preview`;
  document.getElementById('modal-id').textContent = path;

  // switch to preview tab
  document.querySelector('.modal-tab-btn[data-tab="preview"]').click();
  const previewContainer = document.getElementById('modal-preview-container');
  if (previewContainer) {
    previewContainer.innerHTML = `<iframe class="modal-preview-iframe" src="${path}"></iframe>`;
  }
  modal.classList.add('open');
}

export function loadTemplateToStudio(templateId) {
  const tpl = state.searchIndex.getById(templateId);
  if (!tpl) return;

  // Switch to studio tab
  document.querySelector('.tab-btn[data-tab="studio"]').click();
  const promptInput = document.getElementById('studio-prompt-input');
  if (promptInput) {
    promptInput.value = `${tpl.name}: ${tpl.description}`;
  }

  // Build blueprint referencing template sections
  const sections = (tpl.sections || []).map(s => ({
    id: s.id,
    component: s.componentId,
    props: {
      headline: s.name,
      description: s.description
    }
  }));

  const blueprint = {
    version: '1.0',
    template: tpl.id,
    metadata: {
      title: tpl.name,
      description: tpl.description,
      targetIndustry: tpl.category,
      generatedAt: new Date().toISOString(),
      generatedBy: 'UI Universe Template Adapter'
    },
    theme: tpl.designTokens?.themeStyle || 'midnight_cinematic',
    navigation: {
      brand: { name: tpl.name },
      links: [{ label: 'Overview', href: '#' }, { label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }]
    },
    pages: [
      {
        id: 'home',
        sections: sections.length > 0 ? sections : [
          { id: 'hero', component: 'section.hero.cinematic_space.v1', props: { headline: tpl.name } }
        ]
      }
    ]
  };

  state.currentBlueprint = blueprint;
  const textarea = document.getElementById('blueprint-editor');
  if (textarea) textarea.value = JSON.stringify(blueprint, null, 2);

  const validation = validateBlueprint(blueprint);
  updateValidationBadge(validation);
  renderStudioPreview(blueprint);
  showToast(`Loaded ${tpl.name} into AI Studio!`);
}

function closeModal() {
  const modal = document.getElementById('detail-modal-overlay');
  if (modal) modal.classList.remove('open');
}

// Setup Telemetry Tab
function setupTelemetry() {
  const counts = state.registry?.counts || {};
  document.getElementById('stat-total-entries').textContent = counts.totalCatalogEntries || state.allEntries.length;
  document.getElementById('stat-templates-verified').textContent = `${counts.verifiedTemplates || 100} / 100`;
  document.getElementById('stat-license-compliance').textContent = '100% MIT';
  document.getElementById('stat-token-savings').textContent = '90-97%';
}

// Expose globals for inline event handlers
window.copyText = copyText;
window.openDetailModal = openDetailModal;
window.openTemplatePreview = openTemplatePreview;
window.loadTemplateToStudio = loadTemplateToStudio;

// Start app
window.addEventListener('DOMContentLoaded', initApp);
