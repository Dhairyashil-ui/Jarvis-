import fs from 'fs';
import path from 'path';
import { componentMetadata } from '../react-bits-repo/src/constants/Information.js';

const ROOT_DIR = path.resolve('d:/ui componants');
const REPO_DIR = path.join(ROOT_DIR, 'react-bits-repo');
const CODE_DIR = path.join(REPO_DIR, 'src/constants/code');

console.log('Extracting React Bits components for AI website builder...');

const catalog = {
  version: '2.0.0',
  generatedAt: new Date().toISOString(),
  totalComponents: 0,
  categories: {
    TextAnimations: [],
    Components: [],
    Animations: [],
    Backgrounds: [],
    Micro: [],
    '3D-UI': []
  },
  components: []
};

// 1. Process all React Bits components
for (const [key, meta] of Object.entries(componentMetadata)) {
  const parts = key.split('/');
  const category = meta.category || parts[0];
  const name = meta.name || parts[1];

  // Try to find the corresponding code file in constants/code
  let dependencies = 'react';
  let usage = '';

  const possibleCodeFilenames = [
    `${name.charAt(0).toLowerCase() + name.slice(1)}Code.js`,
    `${name}Code.js`,
    `${name.toLowerCase()}Code.js`
  ];

  const catCodeDir = path.join(CODE_DIR, category);
  if (fs.existsSync(catCodeDir)) {
    for (const codeFile of possibleCodeFilenames) {
      const fullCodePath = path.join(catCodeDir, codeFile);
      if (fs.existsSync(fullCodePath)) {
        try {
          const codeContent = fs.readFileSync(fullCodePath, 'utf8');
          const depMatch = codeContent.match(/dependencies:\s*['"]([^'"]*)['"]/);
          if (depMatch && depMatch[1]) {
            dependencies = depMatch[1].trim();
          }
          const usageMatch = codeContent.match(/usage:\s*`([\s\S]*?)`\s*,\s*\n\s*code/);
          if (usageMatch && usageMatch[1]) {
            usage = usageMatch[1].trim();
          }
        } catch (e) {
          // ignore error reading code file
        }
        break;
      }
    }
  }

  // Check which source files exist
  const jsContentPath = path.join(REPO_DIR, `src/content/${category}/${name}/${name}.jsx`);
  const cssPath = path.join(REPO_DIR, `src/content/${category}/${name}/${name}.css`);
  const twPath = path.join(REPO_DIR, `src/tailwind/${category}/${name}/${name}.jsx`);
  const tsContentPath = path.join(REPO_DIR, `src/ts-default/${category}/${name}/${name}.tsx`);
  const tsTwPath = path.join(REPO_DIR, `src/ts-tailwind/${category}/${name}/${name}.tsx`);

  const hasJs = fs.existsSync(jsContentPath);
  const hasCss = fs.existsSync(cssPath);
  const hasTailwind = fs.existsSync(twPath);
  const hasTs = fs.existsSync(tsContentPath);
  const hasTsTw = fs.existsSync(tsTwPath);

  // If no usage found from code file, generate a smart drop-in usage snippet
  if (!usage) {
    if (category === 'TextAnimations') {
      usage = `import ${name} from './${name}';\n\n<${name} text="Your Animated Heading" />`;
    } else if (category === 'Backgrounds') {
      usage = `import ${name} from './${name}';\n\n<div style={{ width: '100%', height: '500px', position: 'relative' }}>\n  <${name} />\n</div>`;
    } else {
      usage = `import ${name} from './${name}';\n\n<${name} />`;
    }
  }

  const componentItem = {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: name,
    category: category,
    library: 'ReactBits',
    description: meta.description || `${name} component from React Bits.`,
    docsUrl: meta.docsUrl || `https://reactbits.dev/${category.toLowerCase()}/${name.toLowerCase()}`,
    tags: meta.tags || [],
    dependencies: dependencies,
    usage: usage,
    sourceFiles: {
      hasJs,
      hasCss,
      hasTailwind,
      hasTs,
      hasTsTw,
      jsPath: hasJs ? `react-bits-repo/src/content/${category}/${name}/${name}.jsx` : null,
      cssPath: hasCss ? `react-bits-repo/src/content/${category}/${name}/${name}.css` : null,
      tailwindPath: hasTailwind ? `react-bits-repo/src/tailwind/${category}/${name}/${name}.jsx` : null,
      tsPath: hasTs ? `react-bits-repo/src/ts-default/${category}/${name}/${name}.tsx` : null,
      tsTailwindPath: hasTsTw ? `react-bits-repo/src/ts-tailwind/${category}/${name}/${name}.tsx` : null
    }
  };

  catalog.components.push(componentItem);
  if (catalog.categories[category]) {
    catalog.categories[category].push(componentItem.id);
  }
}

// 2. Add our 5 Custom 3D UI Showcase Components
const custom3D = [
  {
    id: 'ring-carousel',
    name: 'RingCarousel3D',
    category: '3D-UI',
    library: 'Pure3D',
    description: '3D cylindrical ring carousel with tilted perspective, momentum dragging, card flipping, and keyframes control drawer.',
    docsUrl: 'http://localhost:5176/ring-carousel.html',
    tags: ['3d', 'carousel', 'cylinder', 'ring', 'momentum', 'flip', 'drag', 'showcase'],
    dependencies: 'vanilla-css-3d (zero npm dependencies)',
    usage: `<!-- Single-File Drop-In -->\n<iframe src="ring-carousel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>\n\n<!-- 1-Line Image Configuration: line 430 of ring-carousel.html -->\nconst IMAGES = ['img1.jpg', 'img2.jpg', 'img3.jpg', ...];`,
    sourceFiles: {
      hasJs: true,
      hasCss: true,
      hasTailwind: false,
      hasTs: false,
      hasTsTw: false,
      jsPath: 'ring-carousel.html',
      cssPath: 'ring-carousel.html',
      tailwindPath: null,
      tsPath: null,
      tsTailwindPath: null
    }
  },
  {
    id: 'sphere-wall',
    name: 'SphereWall3D',
    category: '3D-UI',
    library: 'Pure3D',
    description: '3D curved spherical dome matrix with 120 cards, 2-axis dragging, depth darkening, and click-to-center focus.',
    docsUrl: 'http://localhost:5176/sphere-wall.html',
    tags: ['3d', 'sphere', 'dome', 'matrix', 'gallery', 'wall', 'grid', 'orbit'],
    dependencies: 'vanilla-css-3d (zero npm dependencies)',
    usage: `<!-- Single-File Drop-In -->\n<iframe src="sphere-wall.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>\n\n<!-- 1-Line Image Configuration: line 880 of sphere-wall.html -->\nconst IMAGES = ['img1.jpg', 'img2.jpg', 'img3.jpg', ...];`,
    sourceFiles: {
      hasJs: true,
      hasCss: true,
      hasTailwind: false,
      hasTs: false,
      hasTsTw: false,
      jsPath: 'sphere-wall.html',
      cssPath: 'sphere-wall.html',
      tailwindPath: null,
      tsPath: null,
      tsTailwindPath: null
    }
  },
  {
    id: 'orbit-globe',
    name: 'OrbitGlobe3D',
    category: '3D-UI',
    library: 'Pure3D',
    description: '3D rotating spherical satellite card cluster with dynamic z-index depth sorting, center headline card, and smooth inertia.',
    docsUrl: 'http://localhost:5176/orbit-globe.html',
    tags: ['3d', 'globe', 'orbit', 'satellite', 'sphere', 'cluster', 'hero'],
    dependencies: 'vanilla-css-3d (zero npm dependencies)',
    usage: `<!-- Single-File Drop-In -->\n<iframe src="orbit-globe.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>\n\n<!-- 1-Line Image Configuration: line 850 of orbit-globe.html -->\nconst IMAGES = ['img1.jpg', 'img2.jpg', 'img3.jpg', ...];`,
    sourceFiles: {
      hasJs: true,
      hasCss: true,
      hasTailwind: false,
      hasTs: false,
      hasTsTw: false,
      jsPath: 'orbit-globe.html',
      cssPath: 'orbit-globe.html',
      tailwindPath: null,
      tsPath: null,
      tsTailwindPath: null
    }
  },
  {
    id: 'card-tunnel',
    name: 'CardTunnel3D',
    category: '3D-UI',
    library: 'Pure3D',
    description: '3D perspective infinite corridor flythrough with 4 walls (floor, ceiling, walls), depth fog, and continuous modulo looping.',
    docsUrl: 'http://localhost:5176/card-tunnel.html',
    tags: ['3d', 'tunnel', 'corridor', 'infinite', 'flythrough', 'fog', 'portal'],
    dependencies: 'vanilla-css-3d (zero npm dependencies)',
    usage: `<!-- Single-File Drop-In -->\n<iframe src="card-tunnel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>\n\n<!-- 1-Line Image Configuration: line 890 of card-tunnel.html -->\nconst IMAGES = ['img1.jpg', 'img2.jpg', 'img3.jpg', ...];`,
    sourceFiles: {
      hasJs: true,
      hasCss: true,
      hasTailwind: false,
      hasTs: false,
      hasTsTw: false,
      jsPath: 'card-tunnel.html',
      cssPath: 'card-tunnel.html',
      tailwindPath: null,
      tsPath: null,
      tsTailwindPath: null
    }
  },
  {
    id: 'spiral-stream',
    name: 'SpiralStream3D',
    category: '3D-UI',
    library: 'Pure3D',
    description: '3D corkscrew helical card stream winding through space with 2.5 turns, 24 cards, infinite modulo loop, and keyframes drawer.',
    docsUrl: 'http://localhost:5176/spiral-stream.html',
    tags: ['3d', 'spiral', 'helix', 'corkscrew', 'stream', 'ribbon', 'dna', 'flow'],
    dependencies: 'vanilla-css-3d (zero npm dependencies)',
    usage: `<!-- Single-File Drop-In -->\n<iframe src="spiral-stream.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>\n\n<!-- 1-Line Image Configuration: line 865 of spiral-stream.html -->\nconst IMAGES = ['img1.jpg', 'img2.jpg', 'img3.jpg', ...];`,
    sourceFiles: {
      hasJs: true,
      hasCss: true,
      hasTailwind: false,
      hasTs: false,
      hasTsTw: false,
      jsPath: 'spiral-stream.html',
      cssPath: 'spiral-stream.html',
      tailwindPath: null,
      tsPath: null,
      tsTailwindPath: null
    }
  }
];

custom3D.forEach(c => {
  catalog.components.push(c);
  catalog.categories['3D-UI'].push(c.id);
});

// 3. Process all Magic UI components from magicui-repo
const MAGIC_DIR = path.join(ROOT_DIR, 'magicui-repo/apps/www/registry/magicui');
const MAGIC_DOCS_DIR = path.join(ROOT_DIR, 'magicui-repo/apps/www/content/docs/components');
const MAGIC_EXAMPLE_DIR = path.join(ROOT_DIR, 'magicui-repo/apps/www/registry/example');

catalog.categories['MagicUI-Layout'] = [];
catalog.categories['MagicUI-Hero'] = [];
catalog.categories['MagicUI-Text'] = [];
catalog.categories['MagicUI-Buttons'] = [];
catalog.categories['MagicUI-Effects'] = [];
catalog.categories['MagicUI-Mockups'] = [];

if (fs.existsSync(MAGIC_DIR)) {
  const magicFiles = fs.readdirSync(MAGIC_DIR).filter(f => f.endsWith('.tsx'));

  for (const file of magicFiles) {
    const slug = file.replace('.tsx', '');
    const pascalName = slug
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    let title = pascalName;
    let description = `Animated ${slug} component from Magic UI.`;
    let docsUrl = `https://magicui.design/docs/components/${slug}`;

    // Read MDX frontmatter if available
    const mdxPath = path.join(MAGIC_DOCS_DIR, `${slug}.mdx`);
    if (fs.existsSync(mdxPath)) {
      try {
        const mdxContent = fs.readFileSync(mdxPath, 'utf8');
        const titleMatch = mdxContent.match(/title:\s*(.+)/);
        if (titleMatch && titleMatch[1]) title = titleMatch[1].trim();

        const descMatch = mdxContent.match(/description:\s*(.+)/);
        if (descMatch && descMatch[1]) description = descMatch[1].trim();
      } catch (e) {}
    }

    // Determine Magic UI category family
    let category = 'MagicUI-Effects';
    if (['bento-grid', 'marquee', 'avatar-circles', 'animated-list', 'dock', 'tweet-card', 'client-tweet-card'].includes(slug)) {
      category = 'MagicUI-Layout';
    } else if (['globe', 'warp-background', 'animated-grid-pattern', 'retro-grid', 'icon-cloud', 'orbiting-circles', 'hero-video-dialog', 'interactive-grid-pattern'].includes(slug)) {
      category = 'MagicUI-Hero';
    } else if (['blur-fade', 'text-animate', 'word-rotate', 'sparkles-text', 'typing-animation', 'aurora-text', 'hyper-text', 'line-shadow-text', 'morphing-text', 'spinning-text', 'text-reveal', 'kinetic-text', 'animated-shiny-text', 'animated-gradient-text', 'comic-text', 'video-text', 'scroll-based-velocity', 'number-ticker', 'dia-text-reveal', 'text-3d-flip'].includes(slug)) {
      category = 'MagicUI-Text';
    } else if (['shiny-button', 'shimmer-button', 'rainbow-button', 'ripple-button', 'pulsating-button', 'interactive-hover-button', 'animated-subscribe-button'].includes(slug)) {
      category = 'MagicUI-Buttons';
    } else if (['safari', 'iphone', 'android', 'terminal', 'code-comparison', 'file-tree'].includes(slug)) {
      category = 'MagicUI-Mockups';
    }

    // Try to load exact demo usage
    let usage = '';
    const possibleDemos = [
      path.join(MAGIC_EXAMPLE_DIR, `${slug}-demo.tsx`),
      path.join(MAGIC_EXAMPLE_DIR, `${slug}-demo-2.tsx`),
      path.join(MAGIC_EXAMPLE_DIR, `${slug}.tsx`)
    ];

    for (const demoPath of possibleDemos) {
      if (fs.existsSync(demoPath)) {
        try {
          usage = fs.readFileSync(demoPath, 'utf8');
          break;
        } catch (e) {}
      }
    }

    if (!usage) {
      usage = `// Install via shadcn CLI:\n// npx shadcn@latest add @magicui/${slug}\n\nimport { ${pascalName} } from "@/components/ui/${slug}";\n\nexport default function Example() {\n  return (\n    <${pascalName} />\n  );\n}`;
    } else {
      usage = `// Install via shadcn CLI:\n// npx shadcn@latest add @magicui/${slug}\n\n` + usage;
    }

    const componentItem = {
      id: `magic-${slug}`,
      name: pascalName,
      title: title,
      category: category,
      library: 'MagicUI',
      description: description,
      docsUrl: docsUrl,
      cliCommand: `npx shadcn@latest add @magicui/${slug}`,
      tags: ['magicui', slug, category.replace('MagicUI-', '').toLowerCase()],
      dependencies: 'motion tailwindcss lucide-react',
      usage: usage,
      sourceFiles: {
        hasJs: false,
        hasCss: false,
        hasTailwind: true,
        hasTs: true,
        hasTsTw: true,
        jsPath: null,
        cssPath: null,
        tailwindPath: `magicui-repo/apps/www/registry/magicui/${file}`,
        tsPath: `magicui-repo/apps/www/registry/magicui/${file}`,
        tsTailwindPath: `magicui-repo/apps/www/registry/magicui/${file}`
      }
    };

    catalog.components.push(componentItem);
    catalog.categories[category].push(componentItem.id);
  }
}

catalog.totalComponents = catalog.components.length;

// Write JSON catalog
const jsonPath = path.join(ROOT_DIR, 'ai-components-registry.json');
fs.writeFileSync(jsonPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Saved ai-components-registry.json with ${catalog.totalComponents} components!`);

// Generate AI Prompt Reference Markdown
let md = `# AI Website Builder Component Registry & Prompts

> **Machine-Readable Registry**: [ai-components-registry.json](file:///d:/ui%20componants/ai-components-registry.json)
> **Total Components**: ${catalog.totalComponents} (React Bits: 218, Magic UI: 79, 3D Engines: 5)
> **Generated**: ${new Date().toLocaleDateString()}

---

## 🤖 Instructions for AI Website Builder Agents

When the user commands you to build a website, select components from this registry according to the user's intent:

| User Intent / Page Section | Recommended Component | Library | Tech / Style |
| :--- | :--- | :--- | :--- |
| **Headline / Hero Text Animation** | \`SplitText\` or \`BlurText\` or \`SparklesText\` | React Bits / Magic UI | GSAP / Motion staggered letters |
| **Hero 3D Floating Showcase** | \`RingCarousel3D\` or \`OrbitGlobe3D\` or \`SpiralStream3D\` | 3D-UI | Pure CSS 3D (0 dependencies, 1-line images) |
| **Hero Infinite Corridor** | \`CardTunnel3D\` | 3D-UI | 4-Wall infinite corridor flythrough |
| **120-Card Curved Dome Portfolio** | \`SphereWall3D\` | 3D-UI | Spherical Matrix (0 dependencies) |
| **Interactive 3D Globe Anchor** | \`Globe\` | Magic UI | Cobe WebGL interactive world |
| **Bento Feature Grid** | \`BentoGrid\` + \`BentoCard\` | Magic UI | Framer Motion responsive bento layout |
| **Social Proof / Logo Rail** | \`Marquee\` | Magic UI | Infinite scrolling marquee rail |
| **Hero Animated Canvas Background** | \`Hyperspeed\` or \`Particles\` or \`RetroGrid\` | React Bits / Magic UI | WebGL / Canvas interactive |
| **Interactive Card Grids** | \`SpotlightCard\` or \`TiltedCard\` or \`MagicCard\` | React Bits / Magic UI | Radial pointer glow & 3D tilt |
| **CTA / Action Buttons** | \`ShimmerButton\` or \`ShinyButton\` or \`RainbowButton\` | Magic UI | CSS shimmer & glowing gradients |
| **Device Mockups & Chrome** | \`Safari\` or \`Iphone\` or \`Terminal\` | Magic UI | Modern SVG device wrappers |
| **Navigation Menus** | \`Dock\` or \`BubbleMenu\` or \`CardNav\` | React Bits | macOS style magnification & elastic |
| **Cursor / Micro-interactions** | \`BlobCursor\` or \`ClickSpark\` or \`Confetti\` | React Bits / Magic UI | Fluid Physics & Canvas bursts |

---

## 🛠️ CLI Quick Install Guide

### Magic UI Components:
\`\`\`bash
# Add any Magic UI component to a React/Next.js app:
npx shadcn@latest add @magicui/<component-name>

# Examples:
npx shadcn@latest add @magicui/marquee
npx shadcn@latest add @magicui/bento-grid
npx shadcn@latest add @magicui/shimmer-button
npx shadcn@latest add @magicui/border-beam
npx shadcn@latest add @magicui/globe
\`\`\`

### 3D UI Showcase Components:
\`\`\`html
<!-- 100% Zero-dependency standalone HTML files in your workspace -->
<iframe src="ring-carousel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="spiral-stream.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="card-tunnel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="orbit-globe.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="sphere-wall.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
\`\`\`

---

## 📚 Component Index by Category

`;

for (const [catName, compIds] of Object.entries(catalog.categories)) {
  if (compIds.length === 0) continue;
  md += `### ${catName} (${compIds.length} components)\n\n`;
  md += `| Component | Library | Description | CLI / Docs |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  compIds.forEach(id => {
    const c = catalog.components.find(x => x.id === id);
    const cliOrDocs = c.cliCommand ? `\`${c.cliCommand}\`` : `[Docs](${c.docsUrl})`;
    md += `| **${c.name}** | ${c.library || 'ReactBits'} | ${c.description} | ${cliOrDocs} |\n`;
  });
  md += `\n`;
}

const mdPath = path.join(ROOT_DIR, 'AI_COMPONENTS_REFERENCE.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log(`Saved AI_COMPONENTS_REFERENCE.md!`);
