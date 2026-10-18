/**
 * Stable, deterministic identifier generator for UI Universe catalog entries.
 * Format: <type>.<category>.<slug>.v1
 */

export function sanitizeSlug(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function sanitizeCategory(cat) {
  return sanitizeSlug(cat || 'general');
}

export function generateComponentId(category, name, type = 'component', version = 1) {
  const cleanCat = sanitizeCategory(category);
  const cleanName = sanitizeSlug(name);
  const cleanType = ['component', 'effect', 'primitive', '3d', 'shader'].includes(type) ? type : 'component';
  return `${cleanType}.${cleanCat}.${cleanName}.v${version}`;
}

export function generateTemplateId(category, slug, version = 1) {
  const cleanCat = sanitizeCategory(category);
  const cleanSlug = sanitizeSlug(slug);
  return `template.${cleanCat}.${cleanSlug}.v${version}`;
}

export function generateSectionId(category, slug, version = 1) {
  const cleanCat = sanitizeCategory(category);
  const cleanSlug = sanitizeSlug(slug);
  return `section.${cleanCat}.${cleanSlug}.v${version}`;
}

export function parseId(id) {
  if (!id || typeof id !== 'string') return null;
  const parts = id.split('.');
  if (parts.length < 4) return null;
  return {
    type: parts[0],
    category: parts[1],
    slug: parts[2],
    version: parseInt(parts[3].replace('v', ''), 10) || 1
  };
}
