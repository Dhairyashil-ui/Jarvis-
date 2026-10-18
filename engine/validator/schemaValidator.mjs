/**
 * Schema validator for UI Universe components, templates, and sections.
 */

const ID_PATTERNS = {
  component: /^(component|effect|primitive|3d|shader)\.[a-z0-9_-]+\.[a-z0-9_-]+\.v[0-9]+$/,
  template: /^template\.[a-z0-9_-]+\.[a-z0-9_-]+\.v[0-9]+$/,
  section: /^section\.[a-z0-9_-]+\.[a-z0-9_-]+\.v[0-9]+$/
};

export function validateComponent(entry) {
  const errors = [];

  if (!entry) {
    return { valid: false, errors: ['Entry is undefined or null'] };
  }

  if (!entry.id || !ID_PATTERNS.component.test(entry.id)) {
    errors.push(`Invalid or missing component ID: "${entry.id}". Must follow format: (component|effect|primitive|3d|shader).<category>.<slug>.v1`);
  }

  if (!entry.name || typeof entry.name !== 'string' || entry.name.trim().length === 0) {
    errors.push('Missing required string property: "name"');
  }

  if (!entry.category || typeof entry.category !== 'string') {
    errors.push('Missing required string property: "category"');
  }

  if (!entry.description || typeof entry.description !== 'string') {
    errors.push('Missing required string property: "description"');
  }

  if (!entry.license || !entry.license.id) {
    errors.push('Missing or invalid "license" object with an "id" field');
  }

  if (!entry.status || !['verified', 'adapted', 'reference', 'unverified'].includes(entry.status)) {
    errors.push(`Invalid status: "${entry.status}". Must be one of: verified, adapted, reference, unverified`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateTemplate(entry) {
  const errors = [];

  if (!entry) {
    return { valid: false, errors: ['Entry is undefined or null'] };
  }

  if (!entry.id || !ID_PATTERNS.template.test(entry.id)) {
    errors.push(`Invalid or missing template ID: "${entry.id}". Must follow format: template.<category>.<slug>.v1`);
  }

  if (!entry.name || typeof entry.name !== 'string') {
    errors.push('Missing required string property: "name"');
  }

  if (!entry.category || typeof entry.category !== 'string') {
    errors.push('Missing required string property: "category"');
  }

  if (!entry.sourcePath) {
    errors.push('Missing required property: "sourcePath"');
  }

  if (!Array.isArray(entry.sections) || entry.sections.length === 0) {
    errors.push('Template must have a non-empty "sections" array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateSection(entry) {
  const errors = [];

  if (!entry.id || !ID_PATTERNS.section.test(entry.id)) {
    errors.push(`Invalid or missing section ID: "${entry.id}". Must follow format: section.<category>.<slug>.v1`);
  }

  if (!entry.name) errors.push('Missing "name" property');
  if (!entry.category) errors.push('Missing "category" property');

  return {
    valid: errors.length === 0,
    errors
  };
}
