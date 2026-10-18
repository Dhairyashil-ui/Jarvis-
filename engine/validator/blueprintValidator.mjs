/**
 * Strict AI Blueprint Validator
 * Ensures blueprint conforms to format, checks IDs against known registry,
 * detects and rejects script injections or executable JS code.
 */

// Patterns that indicate attempted JavaScript execution / injection in JSON props
const UNSAFE_PATTERNS = [
  /<script\b[^>]*>([\s\S]*?)<\/script>/i,
  /javascript\s*:/i,
  /\bon\w+\s*=/i, // e.g. onload=, onclick=
  /\beval\s*\(/i,
  /\bFunction\s*\(/i,
  /\bsetTimeout\s*\(/i,
  /\bsetInterval\s*\(/i,
  /<iframe\b[^>]*>/i,
  /document\.cookie/i,
  /window\.location/i
];

function checkUnsafeValues(value, path = 'props') {
  const issues = [];
  if (typeof value === 'string') {
    for (const pattern of UNSAFE_PATTERNS) {
      if (pattern.test(value)) {
        issues.push(`Unsafe executable expression or injection attempt detected in ${path}: "${value.slice(0, 50)}..."`);
        break;
      }
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, idx) => {
      issues.push(...checkUnsafeValues(item, `${path}[${idx}]`));
    });
  } else if (value !== null && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      issues.push(...checkUnsafeValues(v, `${path}.${k}`));
    }
  }
  return issues;
}

export function validateBlueprint(blueprint, registryIds = null) {
  const errors = [];
  const warnings = [];

  if (!blueprint || typeof blueprint !== 'object') {
    return { valid: false, errors: ['Blueprint must be a non-null JSON object.'], warnings: [] };
  }

  // 1. Version check
  if (!blueprint.version) {
    errors.push('Missing required blueprint field: "version". Supported: "1.0", "1.1", "2.0".');
  } else if (!['1.0', '1.1', '2.0'].includes(blueprint.version)) {
    warnings.push(`Unrecognized blueprint version "${blueprint.version}". Expected "1.0", "1.1", or "2.0".`);
  }

  // 2. Theme check
  if (!blueprint.theme) {
    warnings.push('No theme specified; falling back to "midnight_cinematic".');
  }

  // 3. Pages check
  if (!blueprint.pages || !Array.isArray(blueprint.pages) || blueprint.pages.length === 0) {
    errors.push('Blueprint must contain a "pages" array with at least one page.');
  } else {
    blueprint.pages.forEach((page, pIdx) => {
      const pageId = page.id || `page_${pIdx}`;
      if (!page.sections || !Array.isArray(page.sections) || page.sections.length === 0) {
        errors.push(`Page "${pageId}" has no sections defined.`);
        return;
      }

      page.sections.forEach((section, sIdx) => {
        const secId = section.id || `sec_${sIdx}`;

        if (!section.component) {
          errors.push(`Section "${secId}" on page "${pageId}" is missing required "component" identifier.`);
          return;
        }

        // Check if component ID is known in registry
        if (registryIds && registryIds instanceof Set) {
          if (!registryIds.has(section.component)) {
            // Check for nearest suggestions
            const candidate = Array.from(registryIds).find(id => id.includes(section.component.split('.').slice(-2, -1)[0]));
            let msg = `Unknown component identifier: "${section.component}" in section "${secId}".`;
            if (candidate) {
              msg += ` Did you mean "${candidate}"?`;
            }
            errors.push(msg);
          }
        }

        // Check props for code execution / unsafe payload
        if (section.props) {
          if (typeof section.props !== 'object' || Array.isArray(section.props)) {
            errors.push(`Section "${secId}" props must be a key-value object.`);
          } else {
            const unsafeIssues = checkUnsafeValues(section.props, `page[${pageId}].section[${secId}].props`);
            errors.push(...unsafeIssues);
          }
        }

        // Check slots if present
        if (section.slots && typeof section.slots === 'object') {
          for (const [slotName, slotItems] of Object.entries(section.slots)) {
            if (Array.isArray(slotItems)) {
              slotItems.forEach((slotItem, slotIdx) => {
                if (!slotItem.component) {
                  errors.push(`Slot item [${slotIdx}] in slot "${slotName}" is missing "component" ID.`);
                }
                if (slotItem.props) {
                  errors.push(...checkUnsafeValues(slotItem.props, `slot[${slotName}][${slotIdx}].props`));
                }
              });
            }
          }
        }
      });
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
