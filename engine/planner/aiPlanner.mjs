import { validateBlueprint } from '../validator/blueprintValidator.mjs';

/**
 * AI Website Blueprint Planner.
 * Deterministically constructs validated, production-ready website blueprints
 * from user prompts or industry presets, without emitting raw component code.
 */

export const THEME_PRESETS = {
  midnight_cinematic: {
    mode: 'dark',
    palette: {
      primary: '#6366f1',
      secondary: '#a855f7',
      accent: '#38bdf8',
      background: '#090a0f',
      surface: 'rgba(20, 22, 32, 0.75)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      border: 'rgba(255, 255, 255, 0.08)'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'JetBrains Mono'
    },
    radius: '16px',
    stylePreset: 'cinematic_glow'
  },
  cyber_neon: {
    mode: 'dark',
    palette: {
      primary: '#06b6d4',
      secondary: '#10b981',
      accent: '#f43f5e',
      background: '#05070d',
      surface: 'rgba(12, 17, 29, 0.85)',
      text: '#f0fdf4',
      mutedText: '#64748b',
      border: 'rgba(6, 182, 212, 0.2)'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'JetBrains Mono'
    },
    radius: '12px',
    stylePreset: 'neon_grid'
  },
  modern_clean: {
    mode: 'light',
    palette: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#0284c7',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      mutedText: '#64748b',
      border: '#e2e8f0'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'JetBrains Mono'
    },
    radius: '12px',
    stylePreset: 'minimal_light'
  },
  luxury_minimal: {
    mode: 'dark',
    palette: {
      primary: '#e2d9c8',
      secondary: '#998d78',
      accent: '#d4af37',
      background: '#0d0d0e',
      surface: 'rgba(25, 25, 27, 0.8)',
      text: '#f5f5f5',
      mutedText: '#a3a3a3',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      monoFont: 'JetBrains Mono'
    },
    radius: '8px',
    stylePreset: 'luxury'
  }
};

export class AIBlueprintPlanner {
  constructor(searchIndex) {
    this.searchIndex = searchIndex;
  }

  /**
   * Plans and generates a valid AI Blueprint based on intent and optional base template.
   */
  planWebsite(prompt, options = {}) {
    const {
      baseTemplateId = null,
      themeKey = 'midnight_cinematic',
      targetIndustry = 'saas'
    } = options;

    const theme = THEME_PRESETS[themeKey] || THEME_PRESETS.midnight_cinematic;

    // Detect industry or tone from prompt
    const pLower = (prompt || '').toLowerCase();
    let detectedTheme = theme;
    if (pLower.includes('cyber') || pLower.includes('hack') || pLower.includes('dev') || pLower.includes('api')) {
      detectedTheme = THEME_PRESETS.cyber_neon;
    } else if (pLower.includes('light') || pLower.includes('clean') || pLower.includes('medical') || pLower.includes('education')) {
      detectedTheme = THEME_PRESETS.modern_clean;
    } else if (pLower.includes('luxury') || pLower.includes('fashion') || pLower.includes('architecture')) {
      detectedTheme = THEME_PRESETS.luxury_minimal;
    }

    // Determine headline & copy based on prompt
    const headline = prompt && prompt.length > 5
      ? prompt.slice(0, 60).replace(/\b\w/g, c => c.toUpperCase())
      : 'Architecting The Intelligent Autonomous Future';

    // Build ordered sections
    const sections = [
      {
        id: 'hero',
        component: 'section.hero.cinematic_space.v1',
        props: {
          headline,
          subheadline: 'Deliver next-generation digital experiences using verified modular components and lightning-fast JSON blueprints.',
          badge: 'Next-Gen Ecosystem v2.0',
          ctaPrimary: 'Explore Universe',
          ctaSecondary: 'View Documentation',
          floatingEffect: 'effect.3d.ring-carousel.v1'
        },
        animation: {
          preset: 'fade_up',
          duration: 0.8,
          delay: 0.1,
          trigger: 'load'
        }
      },
      {
        id: 'social_proof',
        component: 'section.social-proof.marquee_rail.v1',
        props: {
          label: 'TRUSTED BY INNOVATION TEAMS WORLDWIDE',
          logos: ['Google DeepMind', 'NextGen AI', 'Stripe', 'Vercel', 'Linear', 'Anthropic']
        }
      },
      {
        id: 'features',
        component: 'section.bento.feature_matrix.v1',
        props: {
          eyebrow: 'INTELLIGENT CAPABILITIES',
          headline: 'Engineered for Performance & Aesthetic Supremacy',
          cards: [
            {
              title: 'Compact JSON Blueprints',
              description: 'Zero repetitive code generation. Assemble multi-page responsive experiences with tiny 1KB JSON manifests.',
              tag: '97% Token Savings'
            },
            {
              title: '1,000+ Verified Assets',
              description: 'React Bits, Magic UI, Motion Primitives, and 100 complete verified website templates cataloged and normalized.',
              tag: '100% MIT Licensed'
            },
            {
              title: '3D Real-Time Engines',
              description: 'Zero-dependency pure CSS3D and WebGL orbital carousels, spherical walls, and spatial corridors.',
              tag: 'Zero Bloat'
            }
          ]
        },
        animation: {
          preset: 'blur_reveal',
          trigger: 'scroll'
        }
      },
      {
        id: 'interactive_showcase',
        component: 'section.showcase.3d_interactive.v1',
        props: {
          headline: 'Immersive Spatial 3D Preview',
          subheadline: 'Interact with high-dimensional orbital components in real time.',
          engineId: 'effect.3d.orbit-globe.v1',
          autoRotate: true
        }
      },
      {
        id: 'pricing',
        component: 'section.pricing.three_tier_cards.v1',
        props: {
          eyebrow: 'TRANSPARENT PRICING',
          headline: 'Start Free, Scale Universally',
          plans: [
            {
              name: 'Starter',
              price: '$0',
              period: '/forever',
              description: 'Full access to 100 HTML templates and core UI primitives.',
              features: ['100 Complete Templates', 'Standard AI Blueprints', 'Unlimited Local Previews', 'Community Support']
            },
            {
              name: 'Pro Architect',
              price: '$49',
              period: '/month',
              popular: true,
              description: 'Complete 1,000+ component registry, 3D engines, and token optimizer.',
              features: ['All 1,000+ Components & Effects', 'AI Planner Engine & Auto-Repair', 'Commercial Use License', 'Continuous Updates']
            },
            {
              name: 'Enterprise Universe',
              price: '$199',
              period: '/month',
              description: 'Custom design systems, dedicated registry hosting, and subagent orchestration.',
              features: ['Custom Repository Connectors', 'Private Tokenized Design System', 'Dedicated SLA Support', 'Subagent API Access']
            }
          ]
        }
      },
      {
        id: 'faq',
        component: 'section.faq.accordion_schema.v1',
        props: {
          headline: 'Frequently Asked Questions',
          items: [
            {
              q: 'How does the JSON Blueprint format save tokens for AI website builders?',
              a: 'Instead of having an LLM generate thousands of lines of boilerplate HTML, Tailwind, or JSX on every turn, the LLM emits a compact ~1KB JSON structure. The composition engine then renders the exact verified layout instantly.'
            },
            {
              q: 'Can all components in UI Universe be used commercially?',
              a: 'Yes. All indexed components (React Bits, Magic UI, Motion Primitives, 100 HTML templates, 3D engines) carry permissive open-source licenses (MIT) verified by our automated importer.'
            },
            {
              q: 'Can I export to React or pure HTML?',
              a: 'Absolutely. The composer exports standalone production-ready HTML bundles with inline styling or modern React component scaffolds.'
            }
          ]
        }
      },
      {
        id: 'cta',
        component: 'section.cta.glowing_banner.v1',
        props: {
          headline: 'Ready to build with UI Universe?',
          subheadline: 'Harness the power of modular components and automated AI blueprints today.',
          ctaLabel: 'Launch Studio Now'
        }
      }
    ];

    const blueprint = {
      version: '1.0',
      template: baseTemplateId || 'template.saas.ai_chatbot.v1',
      metadata: {
        title: headline,
        description: `Autonomous website blueprint tailored for ${targetIndustry}.`,
        targetIndustry,
        generatedAt: new Date().toISOString(),
        generatedBy: 'UI Universe AI Planner v1.0'
      },
      theme: detectedTheme,
      navigation: {
        brand: {
          name: 'UI Universe',
          logoUrl: '/assets/logo.svg',
          homeUrl: '/'
        },
        links: [
          { label: 'Templates', href: '#templates' },
          { label: 'Components', href: '#components' },
          { label: 'Showcase', href: '#showcase' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' }
        ],
        actions: [
          { label: 'Sign In', href: '#signin', variant: 'ghost' },
          { label: 'Get Started', href: '#get-started', variant: 'shimmer' }
        ]
      },
      pages: [
        {
          id: 'home',
          path: '/',
          title: headline,
          sections
        }
      ],
      footer: {
        copyright: `© ${new Date().getFullYear()} UI Universe Inc. All rights reserved.`,
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Components', href: '#components' },
              { label: 'Templates', href: '#templates' },
              { label: '3D Engines', href: '#3d' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'Documentation', href: '#docs' },
              { label: 'API Reference', href: '#api' },
              { label: 'License Policy', href: '#license' }
            ]
          }
        ]
      }
    };

    // Validate blueprint
    const validation = validateBlueprint(blueprint);

    // Calculate token metrics
    const jsonLength = JSON.stringify(blueprint).length;
    const estCodeLength = 54000; // Average HTML/JSX length of equivalent website
    const estTokensJson = Math.round(jsonLength / 4);
    const estTokensCode = Math.round(estCodeLength / 4);
    const tokenSavingsPct = Math.round(((estTokensCode - estTokensJson) / estTokensCode) * 100);

    return {
      blueprint,
      validation,
      tokenMetrics: {
        jsonLengthBytes: jsonLength,
        estCodeLengthBytes: estCodeLength,
        estTokensJson,
        estTokensCode,
        tokenSavingsPct
      }
    };
  }
}
