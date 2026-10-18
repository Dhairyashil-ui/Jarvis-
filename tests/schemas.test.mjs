import test from 'node:test';
import assert from 'node:assert';
import {
  validateComponent,
  validateTemplate,
  validateSection
} from '../engine/validator/schemaValidator.mjs';
import { validateBlueprint } from '../engine/validator/blueprintValidator.mjs';

test('Schema Validator: Validates component structure', () => {
  const validComponent = {
    id: 'component.buttons.shimmer-button.v1',
    name: 'Shimmer Button',
    type: 'component',
    category: 'buttons',
    description: 'A button with a smooth animated shimmer light border.',
    sourceRepository: 'https://github.com/magicuidesign/magicui',
    framework: 'react',
    license: {
      id: 'MIT',
      verified: true,
      commercialUsePermitted: true
    },
    status: 'verified'
  };

  const res = validateComponent(validComponent);
  assert.strictEqual(res.valid, true);
  assert.strictEqual(res.errors.length, 0);

  // Missing required field
  const invalidComponent = { ...validComponent, id: 'invalid-id' };
  const res2 = validateComponent(invalidComponent);
  assert.strictEqual(res2.valid, false);
  assert.ok(res2.errors.some(e => e.includes('Invalid or missing component ID')));
});

test('Schema Validator: Validates template structure', () => {
  const validTemplate = {
    id: 'template.saas.ai-chatbot.v1',
    name: 'Mira AI Chatbot',
    category: 'saas',
    description: 'Landing page for an AI chatbot.',
    sourcePath: '100-free-html-templates/saas-landing/ai-chatbot/index.html',
    screenshotPath: '100-free-html-templates/saas-landing/ai-chatbot/screenshot.png',
    sections: [
      { id: 'hero', name: 'Hero', category: 'hero' }
    ],
    license: { id: 'MIT', verified: true, commercialUsePermitted: true },
    status: 'verified'
  };

  const res = validateTemplate(validTemplate);
  assert.strictEqual(res.valid, true);

  const invalidTemplate = { ...validTemplate, sections: [] };
  const res2 = validateTemplate(invalidTemplate);
  assert.strictEqual(res2.valid, false);
});

test('Schema Validator: Validates section structure', () => {
  const validSection = {
    id: 'section.hero.cinematic-space.v1',
    name: 'Cinematic Space Hero',
    category: 'hero',
    description: 'Hero section with space atmosphere.',
    status: 'verified'
  };

  const res = validateSection(validSection);
  assert.strictEqual(res.valid, true);
});

test('Blueprint Validator: Accepts valid AI Blueprint', () => {
  const validBlueprint = {
    version: '1.0',
    theme: 'midnight_cinematic',
    pages: [
      {
        id: 'home',
        sections: [
          {
            id: 'hero',
            component: 'section.hero.cinematic-space.v1',
            props: { headline: 'Welcome to Universe' }
          }
        ]
      }
    ]
  };

  const res = validateBlueprint(validBlueprint);
  assert.strictEqual(res.valid, true);
  assert.strictEqual(res.errors.length, 0);
});

test('Blueprint Validator: Rejects arbitrary code / script injection', () => {
  const maliciousBlueprint = {
    version: '1.0',
    theme: 'midnight_cinematic',
    pages: [
      {
        id: 'home',
        sections: [
          {
            id: 'hero',
            component: 'section.hero.cinematic-space.v1',
            props: {
              headline: '<script>alert("xss")</script>',
              onHover: 'javascript:stealCookie()'
            }
          }
        ]
      }
    ]
  };

  const res = validateBlueprint(maliciousBlueprint);
  assert.strictEqual(res.valid, false);
  assert.ok(res.errors.some(e => e.includes('Unsafe executable expression')));
});
