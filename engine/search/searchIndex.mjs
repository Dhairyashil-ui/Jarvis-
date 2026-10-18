/**
 * Fast, deterministic multi-index search engine for UI Universe catalog entries.
 * Produces compact candidate summaries to maximize AI token efficiency.
 */

export class SearchIndex {
  constructor(entries = []) {
    this.entries = entries;
    this.idMap = new Map();
    this.typeMap = new Map();
    this.categoryMap = new Map();
    this.tagMap = new Map();
    this.tokenIndex = new Map();

    this.buildIndex(entries);
  }

  buildIndex(entries) {
    this.entries = entries;
    this.idMap.clear();
    this.typeMap.clear();
    this.categoryMap.clear();
    this.tagMap.clear();
    this.tokenIndex.clear();

    entries.forEach((entry, idx) => {
      if (!entry || !entry.id) return;

      this.idMap.set(entry.id, entry);

      // Type index
      const type = entry.type || (entry.id.startsWith('template.') ? 'template' : (entry.id.startsWith('section.') ? 'section' : 'component'));
      if (!this.typeMap.has(type)) this.typeMap.set(type, []);
      this.typeMap.get(type).push(entry);

      // Category index
      const cat = (entry.category || 'general').toLowerCase();
      if (!this.categoryMap.has(cat)) this.categoryMap.set(cat, []);
      this.categoryMap.get(cat).push(entry);

      // Tag index
      if (Array.isArray(entry.tags)) {
        entry.tags.forEach(t => {
          const tag = t.toLowerCase();
          if (!this.tagMap.has(tag)) this.tagMap.set(tag, []);
          this.tagMap.get(tag).push(entry);
        });
      }

      // Inverted word index
      const textToTokenize = `${entry.id} ${entry.name} ${entry.category} ${entry.description || ''} ${(entry.tags || []).join(' ')} ${(entry.capabilities || []).join(' ')}`.toLowerCase();
      const tokens = textToTokenize.split(/[^a-z0-9_-]+/).filter(tok => tok.length > 2);

      tokens.forEach(tok => {
        if (!this.tokenIndex.has(tok)) this.tokenIndex.set(tok, new Set());
        this.tokenIndex.get(tok).add(idx);
      });
    });
  }

  getById(id) {
    return this.idMap.get(id) || null;
  }

  search(query = '', options = {}) {
    const {
      type = null,
      category = null,
      framework = null,
      status = null,
      limit = 20
    } = options;

    let candidateIndices = null;
    const cleanQuery = (query || '').toLowerCase().trim();
    const queryTokens = cleanQuery.split(/[^a-z0-9_-]+/).filter(tok => tok.length > 1);

    if (queryTokens.length > 0) {
      // Find matches for each token
      const tokenMatchSets = [];
      queryTokens.forEach(tok => {
        const matches = new Set();
        for (const [key, idxSet] of this.tokenIndex.entries()) {
          if (key === tok || key.includes(tok) || tok.includes(key)) {
            idxSet.forEach(idx => matches.add(idx));
          }
        }
        tokenMatchSets.push(matches);
      });

      // Union with scoring
      const scoreMap = new Map();
      tokenMatchSets.forEach(set => {
        set.forEach(idx => {
          scoreMap.set(idx, (scoreMap.get(idx) || 0) + 1);
        });
      });

      candidateIndices = Array.from(scoreMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
    } else {
      candidateIndices = this.entries.map((_, i) => i);
    }

    // Filter candidates
    const results = [];
    for (const idx of candidateIndices) {
      const entry = this.entries[idx];
      if (!entry) continue;

      const entryType = entry.type || (entry.id.startsWith('template.') ? 'template' : (entry.id.startsWith('section.') ? 'section' : 'component'));

      if (type && type !== 'all' && entryType !== type) continue;
      if (category && category !== 'all' && (entry.category || '').toLowerCase() !== category.toLowerCase()) continue;
      if (framework && framework !== 'all' && entry.framework && entry.framework !== framework) continue;
      if (status && status !== 'all' && entry.status !== status) continue;

      results.push(entry);
      if (results.length >= limit) break;
    }

    return results;
  }

  /**
   * Generates a compact, token-efficient representation for AI prompts.
   * Strips internal metadata, license blobs, and giant arrays.
   */
  getCompactCandidateSummary(entry) {
    if (!entry) return null;
    const isTemplate = entry.id.startsWith('template.');
    const isSection = entry.id.startsWith('section.');

    if (isTemplate) {
      return {
        id: entry.id,
        name: entry.name,
        category: entry.category,
        description: entry.description,
        sections: (entry.sections || []).map(s => s.name)
      };
    }

    if (isSection) {
      return {
        id: entry.id,
        name: entry.name,
        category: entry.category,
        description: entry.description,
        tags: entry.tags
      };
    }

    // UI Component / Effect
    const props = {};
    if (entry.properties) {
      for (const [k, v] of Object.entries(entry.properties)) {
        props[k] = v.type || 'string';
      }
    }

    return {
      id: entry.id,
      name: entry.name,
      type: entry.type,
      category: entry.category,
      description: entry.description,
      props: Object.keys(props).length > 0 ? props : undefined,
      capabilities: entry.capabilities
    };
  }

  /**
   * Returns a compact prompt payload for an AI planner given a user query.
   */
  getCompactPromptPayload(query, limit = 12) {
    const candidates = this.search(query, { limit });
    return {
      query,
      candidateCount: candidates.length,
      candidates: candidates.map(c => this.getCompactCandidateSummary(c))
    };
  }
}
