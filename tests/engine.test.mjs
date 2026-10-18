import test from 'node:test';
import assert from 'node:assert';
import {
  generateComponentId,
  generateTemplateId,
  generateSectionId,
  parseId,
  sanitizeSlug
} from '../engine/normalization/idGenerator.mjs';
import { deduplicateAndGroup } from '../engine/deduplication/deduplicator.mjs';
import { SearchIndex } from '../engine/search/searchIndex.mjs';
import { AIBlueprintPlanner } from '../engine/planner/aiPlanner.mjs';
import { BlueprintComposer } from '../engine/composer/composer.mjs';
import { renderBlueprintToHtml } from '../engine/renderer/renderer.mjs';

test('ID Generator: Generates stable deterministic identifiers', () => {
  const compId = generateComponentId('Buttons', 'Shimmer Button', 'component');
  assert.strictEqual(compId, 'component.buttons.shimmer-button.v1');

  const tplId = generateTemplateId('SaaS Landing', 'AI Chatbot');
  assert.strictEqual(tplId, 'template.saas-landing.ai-chatbot.v1');

  const secId = generateSectionId('Hero', 'Cinematic Space');
  assert.strictEqual(secId, 'section.hero.cinematic-space.v1');

  const parsed = parseId(compId);
  assert.deepStrictEqual(parsed, {
    type: 'component',
    category: 'buttons',
    slug: 'shimmer-button',
    version: 1
  });
});

test('Deduplicator: Eliminates exact duplicates and groups variants', () => {
  const entries = [
    { id: 'component.ui.accordion.v1', name: 'Accordion', sourceRepository: 'repoA' },
    { id: 'component.ui.accordion.v1', name: 'Accordion', sourceRepository: 'repoA' }, // exact dupe
    { id: 'component.motion.animated-accordion.v1', name: 'Animated Accordion', sourceRepository: 'repoB' } // variant
  ];

  const result = deduplicateAndGroup(entries);
  assert.strictEqual(result.exactDuplicates.length, 1);
  assert.strictEqual(result.uniqueEntries.length, 2);
  assert.strictEqual(result.uniqueEntries[0].variants.length, 1);
});

test('SearchIndex: Searches by query, filters, and generates compact summaries', () => {
  const mockEntries = [
    {
      id: 'component.buttons.shimmer-button.v1',
      name: 'Shimmer Button',
      category: 'buttons',
      type: 'component',
      description: 'Glowing button with animated shimmer gradient.',
      tags: ['button', 'glow', 'interactive'],
      capabilities: ['interactive', 'animated'],
      properties: { label: { type: 'string' } }
    },
    {
      id: 'section.hero.cinematic-space.v1',
      name: 'Cinematic Space Hero',
      category: 'hero',
      type: 'section',
      description: 'Atmospheric hero section with space background.',
      tags: ['hero', 'space', 'dark']
    }
  ];

  const index = new SearchIndex(mockEntries);
  const searchResults = index.search('shimmer');
  assert.strictEqual(searchResults.length, 1);
  assert.strictEqual(searchResults[0].name, 'Shimmer Button');

  const summary = index.getCompactCandidateSummary(searchResults[0]);
  assert.strictEqual(summary.id, 'component.buttons.shimmer-button.v1');
  assert.deepStrictEqual(summary.props, { label: 'string' });

  const payload = index.getCompactPromptPayload('space hero');
  assert.strictEqual(payload.candidateCount, 1);
  assert.strictEqual(payload.candidates[0].name, 'Cinematic Space Hero');
});

test('AI Planner: Generates valid blueprint with >90% token savings', () => {
  const planner = new AIBlueprintPlanner();
  const plan = planner.planWebsite('Build an autonomous AI SaaS platform with dark neon theme');

  assert.strictEqual(plan.validation.valid, true);
  assert.strictEqual(plan.blueprint.pages.length, 1);
  assert.ok(plan.blueprint.pages[0].sections.length >= 5);
  assert.ok(plan.tokenMetrics.tokenSavingsPct >= 90, `Expected >=90% savings, got ${plan.tokenMetrics.tokenSavingsPct}%`);
});

test('Composer & Renderer: Composes blueprint and renders responsive HTML', () => {
  const planner = new AIBlueprintPlanner();
  const plan = planner.planWebsite('Minimal portfolio for a creative agency');

  const composer = new BlueprintComposer();
  const composed = composer.compose(plan.blueprint);

  assert.strictEqual(composed.pages.length, 1);
  assert.ok(composed.pages[0].sections.length > 0);

  const html = renderBlueprintToHtml(composed);
  assert.ok(html.includes('<!DOCTYPE html>'));
  assert.ok(html.includes('Creative Agency') || html.includes('Minimal Portfolio') || html.includes('UI Universe'));
  assert.ok(html.includes('site-header'));
  assert.ok(html.includes('site-footer'));
});
