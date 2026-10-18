import { sanitizeSlug } from '../normalization/idGenerator.mjs';

/**
 * Deduplicator and variant organizer for UI Universe catalog entries.
 */
export function deduplicateAndGroup(entries) {
  const seenIds = new Set();
  const exactDuplicates = [];
  const uniqueEntries = [];
  const nameMap = new Map();

  // 1. Filter exact duplicate IDs
  entries.forEach(entry => {
    if (!entry.id) return;
    if (seenIds.has(entry.id)) {
      exactDuplicates.push({
        id: entry.id,
        name: entry.name,
        source: entry.sourceRepository
      });
      return;
    }
    seenIds.add(entry.id);
    uniqueEntries.push(entry);
  });

  // 2. Identify functional variants across different libraries
  // E.g. 'accordion' (shadcn) vs 'animated-accordion' (motiq)
  uniqueEntries.forEach(entry => {
    const normName = sanitizeSlug(entry.name)
      .replace(/^animated-/, '')
      .replace(/-animated$/, '')
      .replace(/^interactive-/, '');

    if (!nameMap.has(normName)) {
      nameMap.set(normName, []);
    }
    nameMap.get(normName).push(entry);
  });

  let groupedVariantsCount = 0;
  for (const [normName, group] of nameMap.entries()) {
    if (group.length > 1) {
      groupedVariantsCount += group.length;
      // Mark first as primary/canonical (if not already set)
      const primary = group[0];
      primary.variants = group.slice(1).map(g => ({
        id: g.id,
        name: g.name,
        sourceRepository: g.sourceRepository,
        framework: g.framework
      }));

      // Tag secondary items with variantOf reference
      group.slice(1).forEach(item => {
        item.variantOf = primary.id;
        if (item.status === 'verified') {
          item.status = 'adapted';
        }
      });
    }
  }

  return {
    uniqueEntries,
    exactDuplicates,
    groupedVariantsCount,
    totalOriginal: entries.length,
    totalUnique: uniqueEntries.length
  };
}
