import { validateBlueprint } from '../validator/blueprintValidator.mjs';

/**
 * Component Composition Engine
 * Binds blueprint declarations to trusted implementations and theme tokens.
 */
export class BlueprintComposer {
  constructor(registryMap = new Map()) {
    this.registryMap = registryMap;
  }

  setRegistryMap(map) {
    this.registryMap = map;
  }

  compose(blueprint) {
    const validation = validateBlueprint(blueprint);
    if (!validation.valid) {
      throw new Error(`Cannot compose invalid blueprint:\n- ${validation.errors.join('\n- ')}`);
    }

    const theme = typeof blueprint.theme === 'string'
      ? { mode: 'dark', palette: {}, stylePreset: blueprint.theme }
      : (blueprint.theme || {});

    const pages = blueprint.pages || [];
    const composedPages = [];

    for (const page of pages) {
      const composedSections = [];
      for (const sec of page.sections) {
        // Resolve component
        const compEntry = this.registryMap.get(sec.component) || {
          id: sec.component,
          name: sec.id,
          category: 'section',
          type: 'component',
          status: 'verified'
        };

        composedSections.push({
          id: sec.id,
          componentId: sec.component,
          componentMeta: compEntry,
          props: sec.props || {},
          animation: sec.animation || null,
          responsive: sec.responsive || null,
          slots: sec.slots || null
        });
      }

      composedPages.push({
        id: page.id,
        path: page.path || '/',
        title: page.title || 'UI Universe Page',
        sections: composedSections
      });
    }

    return {
      version: blueprint.version,
      template: blueprint.template || null,
      theme,
      navigation: blueprint.navigation || null,
      footer: blueprint.footer || null,
      pages: composedPages
    };
  }
}
