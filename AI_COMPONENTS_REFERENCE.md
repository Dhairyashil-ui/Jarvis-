# AI Website Builder Component Registry & Prompts

> **Machine-Readable Registry**: [ai-components-registry.json](file:///d:/ui%20componants/ai-components-registry.json)
> **Total Components**: 302 (React Bits: 218, Magic UI: 79, 3D Engines: 5)
> **Generated**: 18/10/2026

---

## 🤖 Instructions for AI Website Builder Agents

When the user commands you to build a website, select components from this registry according to the user's intent:

| User Intent / Page Section | Recommended Component | Library | Tech / Style |
| :--- | :--- | :--- | :--- |
| **Headline / Hero Text Animation** | `SplitText` or `BlurText` or `SparklesText` | React Bits / Magic UI | GSAP / Motion staggered letters |
| **Hero 3D Floating Showcase** | `RingCarousel3D` or `OrbitGlobe3D` or `SpiralStream3D` | 3D-UI | Pure CSS 3D (0 dependencies, 1-line images) |
| **Hero Infinite Corridor** | `CardTunnel3D` | 3D-UI | 4-Wall infinite corridor flythrough |
| **120-Card Curved Dome Portfolio** | `SphereWall3D` | 3D-UI | Spherical Matrix (0 dependencies) |
| **Interactive 3D Globe Anchor** | `Globe` | Magic UI | Cobe WebGL interactive world |
| **Bento Feature Grid** | `BentoGrid` + `BentoCard` | Magic UI | Framer Motion responsive bento layout |
| **Social Proof / Logo Rail** | `Marquee` | Magic UI | Infinite scrolling marquee rail |
| **Hero Animated Canvas Background** | `Hyperspeed` or `Particles` or `RetroGrid` | React Bits / Magic UI | WebGL / Canvas interactive |
| **Interactive Card Grids** | `SpotlightCard` or `TiltedCard` or `MagicCard` | React Bits / Magic UI | Radial pointer glow & 3D tilt |
| **CTA / Action Buttons** | `ShimmerButton` or `ShinyButton` or `RainbowButton` | Magic UI | CSS shimmer & glowing gradients |
| **Device Mockups & Chrome** | `Safari` or `Iphone` or `Terminal` | Magic UI | Modern SVG device wrappers |
| **Navigation Menus** | `Dock` or `BubbleMenu` or `CardNav` | React Bits | macOS style magnification & elastic |
| **Cursor / Micro-interactions** | `BlobCursor` or `ClickSpark` or `Confetti` | React Bits / Magic UI | Fluid Physics & Canvas bursts |

---

## 🛠️ CLI Quick Install Guide

### Magic UI Components:
```bash
# Add any Magic UI component to a React/Next.js app:
npx shadcn@latest add @magicui/<component-name>

# Examples:
npx shadcn@latest add @magicui/marquee
npx shadcn@latest add @magicui/bento-grid
npx shadcn@latest add @magicui/shimmer-button
npx shadcn@latest add @magicui/border-beam
npx shadcn@latest add @magicui/globe
```

### 3D UI Showcase Components:
```html
<!-- 100% Zero-dependency standalone HTML files in your workspace -->
<iframe src="ring-carousel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="spiral-stream.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="card-tunnel.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="orbit-globe.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
<iframe src="sphere-wall.html" style="width:100%; height:750px; border:none; border-radius:32px;"></iframe>
```

---

## 📚 Component Index by Category

### TextAnimations (33 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **ASCIIText** | ReactBits | Waving ASCII text that tilts toward the pointer, scrambles on hover and ripples on click. | [Docs](https://reactbits.dev/text-animations/ascii-text) |
| **BlurText** | ReactBits | Text starts blurred then crisply resolves for a soft-focus reveal effect. | [Docs](https://reactbits.dev/text-animations/blur-text) |
| **CircularText** | ReactBits | Layouts characters around a circle with optional rotation animation. | [Docs](https://reactbits.dev/text-animations/circular-text) |
| **CountUp** | ReactBits | Animated number counter supporting formatting and decimals. | [Docs](https://reactbits.dev/text-animations/count-up) |
| **CurvedLoop** | ReactBits | Flowing looping text path along a customizable curve with drag interaction. | [Docs](https://reactbits.dev/text-animations/curved-loop) |
| **DecryptedText** | ReactBits | Hacker-style decryption cycling random glyphs until resolving to real text. | [Docs](https://reactbits.dev/text-animations/decrypted-text) |
| **FallingText** | ReactBits | Text that breaks apart and tumbles into a pile you can drag, throw and swipe, then flies back into place. | [Docs](https://reactbits.dev/text-animations/falling-text) |
| **FuzzyText** | ReactBits | Vibrating fuzzy text with controllable hover intensity. | [Docs](https://reactbits.dev/text-animations/fuzzy-text) |
| **GlitchText** | ReactBits | RGB split and distortion glitch effect with jitter effects. | [Docs](https://reactbits.dev/text-animations/glitch-text) |
| **GradientText** | ReactBits | Living gradients inside your text: a sliding sweep, a drifting mesh or a swinging conic fan. | [Docs](https://reactbits.dev/text-animations/gradient-text) |
| **RotatingText** | ReactBits | Cycles through multiple phrases with 3D rotate / flip transitions. | [Docs](https://reactbits.dev/text-animations/rotating-text) |
| **ScrambledText** | ReactBits | Detects cursor position and applies a distortion effect to text. | [Docs](https://reactbits.dev/text-animations/scrambled-text) |
| **ScrollFloat** | ReactBits | Text gently floats / parallax shifts on scroll. | [Docs](https://reactbits.dev/text-animations/scroll-float) |
| **ScrollReveal** | ReactBits | Text gently unblurs and reveals on scroll. | [Docs](https://reactbits.dev/text-animations/scroll-reveal) |
| **ScrollVelocity** | ReactBits | Text marquee animatio - speed and distortion scale with user's scroll velocity. | [Docs](https://reactbits.dev/text-animations/scroll-velocity) |
| **ShinyText** | ReactBits | A sheen of light that sweeps across text, from soft bands to chrome-like reflections. | [Docs](https://reactbits.dev/text-animations/shiny-text) |
| **SplitText** | ReactBits | Splits text into characters / words for staggered entrance animation. | [Docs](https://reactbits.dev/text-animations/split-text) |
| **TextCursor** | ReactBits | Text or emoji that trails your cursor as stamped copies, a following chain or a ribbon of letters. | [Docs](https://reactbits.dev/text-animations/text-cursor) |
| **TextPressure** | ReactBits | Characters scale / warp interactively based on pointer pressure zone. | [Docs](https://reactbits.dev/text-animations/text-pressure) |
| **TextType** | ReactBits | Typewriter effect with blinking cursor and adjustable typing cadence. | [Docs](https://reactbits.dev/text-animations/text-type) |
| **TrueFocus** | ReactBits | Applies dynamic blur / clarity based over a series of words in order. | [Docs](https://reactbits.dev/text-animations/true-focus) |
| **VariableProximity** | ReactBits | Letter styling changes continuously with pointer distance mapping. | [Docs](https://reactbits.dev/text-animations/variable-proximity) |
| **Shuffle** | ReactBits | Animated text reveal where characters shuffle before settling. | [Docs](https://reactbits.dev/text-animations/shuffle) |
| **ParticleText** | ReactBits | Text assembles from drifting particles that scatter and reform on demand. | [Docs](https://reactbits.dev/text-animations/particle-text) |
| **SplitFlapText** | ReactBits | Mechanical split-flap departure board that clacks through to each new phrase. | [Docs](https://reactbits.dev/text-animations/split-flap-text) |
| **WarpText** | ReactBits | WebGL warp that bends and refracts the text around the pointer. | [Docs](https://reactbits.dev/text-animations/warp-text) |
| **TechText** | ReactBits | A wordmark whose letters turn into dashed vector paths under the cursor. | [Docs](https://reactbits.dev/text-animations/tech-text) |
| **StrokeText** | ReactBits | Outlined letterforms draw themselves on, then flood with fill. | [Docs](https://reactbits.dev/text-animations/stroke-text) |
| **DepthText** | ReactBits | Layered extruded type with parallax that shifts against the pointer. | [Docs](https://reactbits.dev/text-animations/depth-text) |
| **FoldText** | ReactBits | Lines unfold into place like creased paper opening flat. | [Docs](https://reactbits.dev/text-animations/fold-text) |
| **EchoText** | ReactBits | Ghosted copies trail behind the text and settle into a single word. | [Docs](https://reactbits.dev/text-animations/echo-text) |
| **MaskedHeading** | ReactBits | A headline with a drifting colour mesh or image showing through, revealed word by word. | [Docs](https://reactbits.dev/text-animations/masked-heading) |
| **TextLoop** | ReactBits | A seamless text marquee that flows along curved SVG paths. | [Docs](https://reactbits.dev/text-animations/text-loop) |

### Components (48 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedList** | ReactBits | A scrolling list whose rows spring into view, with a gliding selection and arrow keys. | [Docs](https://reactbits.dev/components/animated-list) |
| **BounceCards** | ReactBits | A fan of photo cards that bounce in, then spread apart and straighten the one you hover. | [Docs](https://reactbits.dev/components/bounce-cards) |
| **BubbleMenu** | ReactBits | Floating circular expanding menu with staggered item reveal. | [Docs](https://reactbits.dev/components/bubble-menu) |
| **CardNav** | ReactBits | A navigation bar that springs open into a row of cards, each with its own links. | [Docs](https://reactbits.dev/components/card-nav) |
| **CardSwap** | ReactBits | A 3D stack of cards that sends the front card to the back on a timer, or when you fling it. | [Docs](https://reactbits.dev/components/card-swap) |
| **Carousel** | ReactBits | Swipeable cards for feature tours, stories and galleries, with five transitions and an autoplay timer. | [Docs](https://reactbits.dev/components/carousel) |
| **ChromaGrid** | ReactBits | A grid of grayscale photo cards where a spotlight follows the cursor and brings back color. | [Docs](https://reactbits.dev/components/chroma-grid) |
| **HoloCard** | ReactBits | Collectible trading card with a real holographic foil and glitter that sparkles as it tilts. | [Docs](https://reactbits.dev/components/holo-card) |
| **CircularCarousel** | ReactBits | A 3D ring of images with bendable cards, momentum drag, snapping and click to focus. | [Docs](https://reactbits.dev/components/circular-carousel) |
| **FlexCarousel** | ReactBits | An infinite image row that flows through invisible liquid glass at its edges. | [Docs](https://reactbits.dev/components/flex-carousel) |
| **DepthCarousel** | ReactBits | Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance. | [Docs](https://reactbits.dev/components/depth-carousel) |
| **AccordionGallery** | ReactBits | Panels expand on hover or focus, revealing parallax imagery and captions. | [Docs](https://reactbits.dev/components/accordion-gallery) |
| **MorphSlider** | ReactBits | WebGL slider that melts between images with a displacement transition. | [Docs](https://reactbits.dev/components/morph-slider) |
| **DriftWall** | ReactBits | An endless perspective wall of tiles drifting past, lifting on hover. | [Docs](https://reactbits.dev/components/drift-wall) |
| **CircularGallery** | ReactBits | A curved image gallery you can drag, scroll or tab through, with cards that open to the full image. | [Docs](https://reactbits.dev/components/circular-gallery) |
| **Counter** | ReactBits | An odometer-style number whose digits roll to every new value, with currency, separators and locales. | [Docs](https://reactbits.dev/components/counter) |
| **DecayCard** | ReactBits | An image card that tears and melts as the pointer moves, then pulls itself back together. | [Docs](https://reactbits.dev/components/decay-card) |
| **Dock** | ReactBits | macOS style dock with smooth magnification, launch bounce, badges and context menus. | [Docs](https://reactbits.dev/components/dock) |
| **DomeGallery** | ReactBits | Immersive 3D dome gallery projecting images on a hemispheric surface. | [Docs](https://reactbits.dev/components/dome-gallery) |
| **ElasticSlider** | ReactBits | A slider that grows under your cursor and stretches like rubber when pulled past either end, then springs back. | [Docs](https://reactbits.dev/components/elastic-slider) |
| **FlowingMenu** | ReactBits | A full-height menu with a liquid band that glides between rows and reveals a scrolling marquee of each item. | [Docs](https://reactbits.dev/components/flowing-menu) |
| **FluidGlass** | ReactBits | A 3D glass object that refracts your headline, image or video, follows the cursor and melts between shapes. | [Docs](https://reactbits.dev/components/fluid-glass) |
| **FlyingPosters** | ReactBits | 3D posters that twist and flip as you scroll or drag through an endless column. | [Docs](https://reactbits.dev/components/flying-posters) |
| **Folder** | ReactBits | Folder that drops its flap open or swings open like a book, with pages you can pick. | [Docs](https://reactbits.dev/components/folder) |
| **GlassIcons** | ReactBits | Liquid glass icons that bend the color behind them, for app grids, docks and social links. | [Docs](https://reactbits.dev/components/glass-icons) |
| **GlassSurface** | ReactBits | Apple-style liquid glass that bends what is behind it, in a rounded panel or any logo shape. | [Docs](https://reactbits.dev/components/glass-surface) |
| **GooeyNav** | ReactBits | A navigation bar whose active pill breaks into goo that flows over to the item you pick. | [Docs](https://reactbits.dev/components/gooey-nav) |
| **InfiniteSpiral** | ReactBits | An endlessly looping 3D helix of images with adjustable motion, depth and spacing. | [Docs](https://reactbits.dev/components/infinite-spiral) |
| **InfiniteMenu** | ReactBits | A draggable sphere of image tiles that snaps the nearest one forward and shows its title. | [Docs](https://reactbits.dev/components/infinite-menu) |
| **Lanyard** | ReactBits | Swinging 3D badge on a stretchy woven band that you can drag, throw or click to flip. | [Docs](https://reactbits.dev/components/lanyard) |
| **MagicBento** | ReactBits | A bento grid of feature cards with live artwork, edge light that follows the cursor and a click wave. | [Docs](https://reactbits.dev/components/magic-bento) |
| **Masonry** | ReactBits | A masonry gallery that springs into place, reflows as it resizes and opens images in a lightbox. | [Docs](https://reactbits.dev/components/masonry) |
| **ModelViewer** | ReactBits | A product-style 3D model viewer that frames itself and floats over a soft shadow. | [Docs](https://reactbits.dev/components/model-viewer) |
| **PillNav** | ReactBits | A pill navigation bar where a fill rises through each link as its label rolls over, with a sliding active dot. | [Docs](https://reactbits.dev/components/pill-nav) |
| **PixelCard** | ReactBits | A card that fills with twinkling pixels on hover, rippling out from the center or the cursor. | [Docs](https://reactbits.dev/components/pixel-card) |
| **ProfileCard** | ReactBits | A framed profile card that tilts toward the cursor, with holographic foil shining through a tiled pattern. | [Docs](https://reactbits.dev/components/profile-card) |
| **ScrollStack** | ReactBits | Cards pin and stack as you scroll, settling back into a dimmed deck with smooth, jitter-free motion. | [Docs](https://reactbits.dev/components/scroll-stack) |
| **SpotlightCard** | ReactBits | Card lit by a soft spotlight that follows the pointer, catches its edge and reaches nearby cards. | [Docs](https://reactbits.dev/components/spotlight-card) |
| **BorderGlow** | ReactBits | Glowing mesh-gradient border that follows cursor direction and intensifies near edges. | [Docs](https://reactbits.dev/components/border-glow) |
| **LineSidebar** | ReactBits | Static list navigation with a cursor-proximity effect that shifts and highlights nearby items. | [Docs](https://reactbits.dev/components/line-sidebar) |
| **OptionWheel** | ReactBits | Curved option picker that spins with scroll, drag or arrow keys, tilting items away. | [Docs](https://reactbits.dev/components/option-wheel) |
| **SpecularButton** | ReactBits | Glass button whose edge catches the light, with a highlight that glides toward the cursor. | [Docs](https://reactbits.dev/components/specular-button) |
| **CurvedInput** | ReactBits | Arc-bent input bar with text, caret and submit button all following the curve. | [Docs](https://reactbits.dev/components/curved-input) |
| **Stack** | ReactBits | Pile of cards you can drag, flick or click through, with thrown cards tucking underneath. | [Docs](https://reactbits.dev/components/stack) |
| **Stepper** | ReactBits | A multi-step flow with a gliding step indicator, spring transitions and horizontal or vertical layouts. | [Docs](https://reactbits.dev/components/stepper) |
| **TiltedCard** | ReactBits | A 3D card that tilts toward the cursor, with glare, a soft shadow, floating layers and a flip side. | [Docs](https://reactbits.dev/components/tilted-card) |
| **StaggeredMenu** | ReactBits | Menu with staggered item animations and smooth transitions on open/close. | [Docs](https://reactbits.dev/components/staggered-menu) |
| **ReflectiveCard** | ReactBits | A metal ID card that reflects your camera or a looping video and catches the light as it tilts. | [Docs](https://reactbits.dev/components/reflective-card) |

### Animations (38 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedContent** | ReactBits | Wrapper that reveals its content on scroll with slides, blur, 3D tilts, soft wipes and staggered children. | [Docs](https://reactbits.dev/animations/animated-content) |
| **BlobCursor** | ReactBits | Liquid metal blob cursor that stretches, sloshes and bursts into droplets, in chrome, jelly, pearl or ink. | [Docs](https://reactbits.dev/animations/blob-cursor) |
| **ClickSpark** | ReactBits | Bursts of sparks at every click, as dashes, comets, dots or stars, that can spill around buttons. | [Docs](https://reactbits.dev/animations/click-spark) |
| **Crosshair** | ReactBits | Crosshair cursor with live coordinates that locks onto links and buttons and measures them. | [Docs](https://reactbits.dev/animations/crosshair) |
| **Cubes** | ReactBits | A grid of outlined 3D cubes that turn to face the cursor, spin when swept and ripple on click. | [Docs](https://reactbits.dev/animations/cubes) |
| **ElectricBorder** | ReactBits | Wraps any element in crackling strands of current that surge near the cursor and leap off in sparks. | [Docs](https://reactbits.dev/animations/electric-border) |
| **FadeContent** | ReactBits | Wrapper that fades content in on scroll, plain or out of focus, from washed-out gray, or through grain, mist and pixel blocks. | [Docs](https://reactbits.dev/animations/fade-content) |
| **GlareHover** | ReactBits | A glossy light streak that sweeps across any element in the direction the cursor moves. | [Docs](https://reactbits.dev/animations/glare-hover) |
| **GradualBlur** | ReactBits | Progressive edge blur for headers, footers, captions and carousels, with an optional fade to color that hides at the ends of a scroll. | [Docs](https://reactbits.dev/animations/gradual-blur) |
| **CrystalizedBall** | ReactBits | A glass ball with a crackling electric rim and glowing dust that swirls with the cursor. | [Docs](https://reactbits.dev/animations/crystalized-ball) |
| **ElectricLogo** | ReactBits | Turns any logo into a living lightning outline, with arcs that leap off its edges. | [Docs](https://reactbits.dev/animations/electric-logo) |
| **DitherVeil** | ReactBits | A 1-bit dithered photo the cursor burns through to full colour, knitting back cell by cell. | [Docs](https://reactbits.dev/animations/dither-veil) |
| **GlowCursor** | ReactBits | Light that pours from the cursor, drifts softly through the air and cools as it fades. | [Docs](https://reactbits.dev/animations/glow-cursor) |
| **GhostCursor** | ReactBits | A ghost of glowing smoke that floats after the cursor and curls away as it rises. | [Docs](https://reactbits.dev/animations/ghost-cursor) |
| **ImageTrail** | ReactBits | Cursor-based image trail with several built-in variants. | [Docs](https://reactbits.dev/animations/image-trail) |
| **LogoLoop** | ReactBits | Continuously looping marquee of brand or tech logos with seamless repeat and hover pause. | [Docs](https://reactbits.dev/animations/logo-loop) |
| **Magnet** | ReactBits | Elements magnetically ease toward the cursor then settle back with spring physics. | [Docs](https://reactbits.dev/animations/magnet) |
| **MetaBalls** | ReactBits | Liquid metaballs that merge, stretch and pinch apart, with a cursor blob that pushes through them. | [Docs](https://reactbits.dev/animations/meta-balls) |
| **Strands** | ReactBits | Spectral strands that twist inside a frosted glass orb and swell into a smooth bulge where they come together, like the new Siri. | [Docs](https://reactbits.dev/animations/strands) |
| **MetallicPaint** | ReactBits | Liquid chrome that flows over your logo or text, adapted from Paper's Liquid Metal shader. | [Docs](https://reactbits.dev/animations/metallic-paint) |
| **Noise** | ReactBits | Film grain overlay for photos and pages, from fine 35mm grain to dust, paper and TV static. | [Docs](https://reactbits.dev/animations/noise) |
| **PixelTrail** | ReactBits | Glossy pixels melt into a fluid goo trail behind the cursor, with color shifts and drips. | [Docs](https://reactbits.dev/animations/pixel-trail) |
| **PixelTransition** | ReactBits | Retro pixel dissolve that covers a card in solid pixels, swaps the content underneath and clears again. | [Docs](https://reactbits.dev/animations/pixel-transition) |
| **PixelSwap** | ReactBits | New content builds in pixel by pixel in a springy wave that starts wherever the cursor enters. | [Docs](https://reactbits.dev/animations/pixel-swap) |
| **Ribbons** | ReactBits | Springy ribbons that trail the cursor, in lens, comet or even shapes with an optional wave. | [Docs](https://reactbits.dev/animations/ribbons) |
| **ShapeBlur** | ReactBits | A crisp logo or shape that drifts out of focus under the pointer like a camera lens. | [Docs](https://reactbits.dev/animations/shape-blur) |
| **SplashCursor** | ReactBits | A fluid simulation that trails the cursor in swirling ink and bursts into a splash on click. | [Docs](https://reactbits.dev/animations/splash-cursor) |
| **StarBorder** | ReactBits | A twinkling star that travels the exact outline of any button, pill or card, trailing light and stardust. | [Docs](https://reactbits.dev/animations/star-border) |
| **StickerPeel** | ReactBits | A die-cut sticker you can peel at any edge, drag, throw and swing, in gloss, matte or holographic finishes. | [Docs](https://reactbits.dev/animations/sticker-peel) |
| **TargetCursor** | ReactBits | A reticle cursor whose corner brackets snap around targets, matching their shape. | [Docs](https://reactbits.dev/animations/target-cursor) |
| **LaserFlow** | ReactBits | A beam of light that splashes onto your content and pours over its corners. | [Docs](https://reactbits.dev/animations/laser-flow) |
| **OrbitImages** | ReactBits | SVG Path customizable orbiting images effect | [Docs](https://reactbits.dev/animations/orbit-images) |
| **ElasticMesh** | ReactBits | Turns text or any logo into a puffy inflated shape you can press, poke and stretch like jelly. | [Docs](https://reactbits.dev/animations/elastic-mesh) |
| **RippleDistortion** | ReactBits | Pointer-driven water displacement that warps content and leaves a decaying wake. | [Docs](https://reactbits.dev/animations/ripple-distortion) |
| **SwarmCursor** | ReactBits | A liquid swarm of particles that flows after the cursor, curls into eddies and pours around hovered buttons. | [Docs](https://reactbits.dev/animations/swarm-cursor) |
| **HalftoneReveal** | ReactBits | A halftone print of an image whose dots swell into the real photo under the cursor. | [Docs](https://reactbits.dev/animations/halftone-reveal) |
| **ScrollExpand** | ReactBits | A rounded media frame that grows to full bleed as it scrolls through the viewport. | [Docs](https://reactbits.dev/animations/scroll-expand) |
| **CursorGrid** | ReactBits | A crisp grid whose cells light up and fade behind the cursor, with grid styles, tiles and click pulses. | [Docs](https://reactbits.dev/animations/cursor-grid) |

### Backgrounds (64 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **Antigravity** | ReactBits | A field of particles that lifts into a glowing ring around the cursor and bursts outward on click. | [Docs](https://reactbits.dev/backgrounds/antigravity) |
| **PatternWaves** | ReactBits | A lit halftone surface of dots, lines or glyphs that moves like draped silk. | [Docs](https://reactbits.dev/backgrounds/pattern-waves) |
| **MicroSlats** | ReactBits | A wall of tiny slats that becomes a rolling sea in perspective, with glinting crests. | [Docs](https://reactbits.dev/backgrounds/micro-slats) |
| **ShapeWaves** | ReactBits | A field of triangles, circles and squares that brighten and grow along rolling waves. | [Docs](https://reactbits.dev/backgrounds/shape-waves) |
| **AeroShards** | ReactBits | Silk ribbons of thick glass shards streaming on layered depths among survey markers, catching light along their edges. | [Docs](https://reactbits.dev/backgrounds/aero-shards) |
| **GhostFibers** | ReactBits | Layered ribbons of fine glowing fibers that twist, fold and drift through soft depth of field. | [Docs](https://reactbits.dev/backgrounds/ghost-fibers) |
| **Aurora** | ReactBits | A soft, calm aurora that flows across the top of the page and drifts toward the cursor. | [Docs](https://reactbits.dev/backgrounds/aurora) |
| **Balatro** | ReactBits | The swirling Balatro paint shader, with crisp pixels, a cursor that stirs the paint and click whirlpools. | [Docs](https://reactbits.dev/backgrounds/balatro) |
| **Ballpit** | ReactBits | A soft-lit pit of physics balls you can shove with the cursor, grab, throw and blast apart. | [Docs](https://reactbits.dev/backgrounds/ballpit) |
| **Beams** | ReactBits | Glossy ribbons that ripple in the dark and catch the light, which follows your cursor. | [Docs](https://reactbits.dev/backgrounds/beams) |
| **ColorBends** | ReactBits | Vibrant color bends with smooth flowing animation. | [Docs](https://reactbits.dev/backgrounds/color-bends) |
| **CRTWarp** | ReactBits | A blocky plasma glowing on a curved CRT, with real scanlines, a phosphor mask, afterglow and a power-on intro. | [Docs](https://reactbits.dev/backgrounds/crt-warp) |
| **DarkVeil** | ReactBits | A silky veil of light that drifts in the dark and bends around the cursor. | [Docs](https://reactbits.dev/backgrounds/dark-veil) |
| **Dither** | ReactBits | Retro dithered waves with Bayer, halftone, line and noise patterns, palettes and cursor trails. | [Docs](https://reactbits.dev/backgrounds/dither) |
| **DotField** | ReactBits | A gradient dot field seen through a lens that follows the cursor, magnifying, pinching or swirling the dots. | [Docs](https://reactbits.dev/backgrounds/dot-field) |
| **DotGrid** | ReactBits | A springy dot grid that the cursor flicks and drags through like jelly, with click shockwaves. | [Docs](https://reactbits.dev/backgrounds/dot-grid) |
| **FaultyTerminal** | ReactBits | A flickering CRT terminal of glowing glyphs, with phosphor trails under the cursor and glitches on click. | [Docs](https://reactbits.dev/backgrounds/faulty-terminal) |
| **Galaxy** | ReactBits | Endless flight through a twinkling starfield with warp jumps, cursor repulsion and star palettes. | [Docs](https://reactbits.dev/backgrounds/galaxy) |
| **GradientBlinds** | ReactBits | Satin gradient blinds lit by a spotlight that follows the cursor, swaying and turning toward the light. | [Docs](https://reactbits.dev/backgrounds/gradient-blinds) |
| **Lightfall** | ReactBits | Streaks of light falling down a curved tunnel, bending around the cursor and stretching into warp trails on hold. | [Docs](https://reactbits.dev/backgrounds/lightfall) |
| **FluxLines** | ReactBits | Glowing flux lines tracing a churning magnetic fluid. The cursor magnet reveals and curls them. | [Docs](https://reactbits.dev/backgrounds/flux-lines) |
| **Ferrofluid** | ReactBits | A glossy sea of magnetic fluid where swells of spikes roll in and the cursor raises a crown. | [Docs](https://reactbits.dev/backgrounds/ferrofluid) |
| **MoltenMetal** | ReactBits | Swirling caustic filaments with white-hot cores that heat up under the cursor and flare on click. | [Docs](https://reactbits.dev/backgrounds/molten-metal) |
| **GradientWaves** | ReactBits | Lit satin waves rolling in from a hazy horizon, with a light that follows the cursor and swells on click. | [Docs](https://reactbits.dev/backgrounds/gradient-waves) |
| **WebThreads** | ReactBits | Glowing threads woven through luminous pinch points that light up under the cursor and carry light on click. | [Docs](https://reactbits.dev/backgrounds/web-threads) |
| **Topography** | ReactBits | A 3D landscape drawn in glowing contour lines that rises under the cursor, with light pulses on click. | [Docs](https://reactbits.dev/backgrounds/topography) |
| **LightTunnel** | ReactBits | A swirling fibre-optic tunnel where comets of light race into depth, steered by the cursor. | [Docs](https://reactbits.dev/backgrounds/light-tunnel) |
| **SlicedWaves** | ReactBits | Waves of colored light sliced into glowing bars, seen in depth with a focus that follows the cursor. | [Docs](https://reactbits.dev/backgrounds/sliced-waves) |
| **AcidSquares** | ReactBits | A rolling field of glossy squares that ripples under two drifting colored lights. | [Docs](https://reactbits.dev/backgrounds/acid-squares) |
| **Scanner** | ReactBits | Glowing interference lines swept by a scan beam, with a CRT finish, cursor lensing and click pings. | [Docs](https://reactbits.dev/backgrounds/scanner) |
| **GradientASCII** | ReactBits | Soft gradient glows drawn in ASCII characters that scramble under the cursor. | [Docs](https://reactbits.dev/backgrounds/gradient-ascii) |
| **Grainient** | ReactBits | Flowing grainy gradients you can stir with the cursor. | [Docs](https://reactbits.dev/backgrounds/grainient) |
| **GridScan** | ReactBits | A 3D grid room swept by a scanning light that follows your view. | [Docs](https://reactbits.dev/backgrounds/grid-scan) |
| **GridDistortion** | ReactBits | Image background that breaks into a grid of blocks under the cursor and settles back into place. | [Docs](https://reactbits.dev/backgrounds/grid-distortion) |
| **GridMotion** | ReactBits | A tilted wall of drifting tiles that slides with the pointer and lights up where it rests. | [Docs](https://reactbits.dev/backgrounds/grid-motion) |
| **Hyperspeed** | ReactBits | Night highway of glowing light trails on a winding road that warps into hyperspace while you hold. | [Docs](https://reactbits.dev/backgrounds/hyperspeed) |
| **Iridescence** | ReactBits | Liquid iridescent surface with shifting folds that you can stir with the cursor. | [Docs](https://reactbits.dev/backgrounds/iridescence) |
| **LetterGlitch** | ReactBits | A calm field of letters that flicker, scramble and glitch in color, stirred by the cursor and torn by clicks. | [Docs](https://reactbits.dev/backgrounds/letter-glitch) |
| **LightRays** | ReactBits | Volumetric light rays from any edge, with source glow and haze. The cursor steers the beam and casts a shadow. | [Docs](https://reactbits.dev/backgrounds/light-rays) |
| **Lightning** | ReactBits | Crackling, branching lightning that bends toward the cursor and strikes wherever you click. | [Docs](https://reactbits.dev/backgrounds/lightning) |
| **LineWaves** | ReactBits | Fine lines that flow in silky waves while a band of light drifts through them. | [Docs](https://reactbits.dev/backgrounds/line-waves) |
| **EvilEye** | ReactBits | Procedural evil eye shader with animated iris, slit pupil, and fiery outer glow. | [Docs](https://reactbits.dev/backgrounds/evil-eye) |
| **Radar** | ReactBits | A radar scope whose sweep leaves a phosphor afterglow and picks up moving contacts. | [Docs](https://reactbits.dev/backgrounds/radar) |
| **SoftAurora** | ReactBits | Soft aurora borealis shader with 3D Perlin noise and cosine gradient palettes. | [Docs](https://reactbits.dev/backgrounds/soft-aurora) |
| **MagicRings** | ReactBits | Glowing rings that pulse outward in a wave, swell toward the cursor and flare on click. | [Docs](https://reactbits.dev/backgrounds/magic-rings) |
| **LiquidChrome** | ReactBits | Soft ribbons of liquid chrome that swirl through a dark pool, ripple under the cursor and catch the light as it moves. | [Docs](https://reactbits.dev/backgrounds/liquid-chrome) |
| **Orb** | ReactBits | A glowing ring of swirling color that breathes, trails an orbiting light and reaches toward the cursor. | [Docs](https://reactbits.dev/backgrounds/orb) |
| **Particles** | ReactBits | A drifting 3D field of particles with glow, twinkle, constellation lines and cursor interaction. | [Docs](https://reactbits.dev/backgrounds/particles) |
| **PixelBlast** | ReactBits | Dithered pixel clouds that drift, shimmer and light up under the cursor, with ripples, shapes and a perspective floor. | [Docs](https://reactbits.dev/backgrounds/pixel-blast) |
| **Plasma** | ReactBits | Folds of satin light twisting slowly through the dark, turning to follow the cursor. | [Docs](https://reactbits.dev/backgrounds/plasma) |
| **PlasmaWave** | ReactBits | Two ribbons of plasma curling through each other, with soft glow and white-hot cores. | [Docs](https://reactbits.dev/backgrounds/plasma-wave) |
| **Prism** | ReactBits | Rotating prism of glowing spectral light with configurable shape, colors and motion. | [Docs](https://reactbits.dev/backgrounds/prism) |
| **PrismaticBurst** | ReactBits | A burst of prismatic light rays that leans toward the cursor and sends a wave of light outward on click. | [Docs](https://reactbits.dev/backgrounds/prismatic-burst) |
| **RippleGrid** | ReactBits | A crisp grid that ripples like water, bending and lighting up as waves pass through it. | [Docs](https://reactbits.dev/backgrounds/ripple-grid) |
| **Silk** | ReactBits | Flowing satin folds with glossy highlights that turn toward the cursor and ripple on click. | [Docs](https://reactbits.dev/backgrounds/silk) |
| **SideRays** | ReactBits | Shafts of light that fan in from a corner or side, shimmer slowly and lean toward the cursor. | [Docs](https://reactbits.dev/backgrounds/side-rays) |
| **ShapeGrid** | ReactBits | A drifting grid of shapes that lights up under the cursor, with perspective tilt and rainbow trails. | [Docs](https://reactbits.dev/backgrounds/shape-grid) |
| **Threads** | ReactBits | Flowing threads that fray apart and part around the cursor, from fine silk to contour lines. | [Docs](https://reactbits.dev/backgrounds/threads) |
| **Waves** | ReactBits | Dense flowing lines that sway like silk, bend around the cursor and spring back into place. | [Docs](https://reactbits.dev/backgrounds/waves) |
| **MagnetLines** | ReactBits | A field of magnetic lines that swing toward the cursor, ripple outward and spin with every click. | [Docs](https://reactbits.dev/backgrounds/magnet-lines) |
| **LiquidEther** | ReactBits | A glowing liquid that swirls under the cursor, colored by how fast it flows. | [Docs](https://reactbits.dev/backgrounds/liquid-ether) |
| **FloatingLines** | ReactBits | Ribbons of fine glowing lines that drift in waves, part around the cursor and curl when clicked. | [Docs](https://reactbits.dev/backgrounds/floating-lines) |
| **LightPillar** | ReactBits | A swirling pillar of light that ignites on load, leans toward the cursor and surges on click. | [Docs](https://reactbits.dev/backgrounds/light-pillar) |
| **PixelSnow** | ReactBits | Pixel-art snowflakes drifting down in layers of depth, brushed aside by the cursor. | [Docs](https://reactbits.dev/backgrounds/pixel-snow) |

### Micro (35 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **SquishSwitch** | ReactBits | Switch whose thumb stretches with speed and squashes against the end when you flick it. | [Docs](https://reactbits.dev/micro/squish-switch) |
| **HoldButton** | ReactBits | Hold-to-confirm button whose liquid fill rises while pressed and snaps back if you let go. | [Docs](https://reactbits.dev/micro/hold-button) |
| **PeekRating** | ReactBits | Star rating that lifts a wave of stars up to the pointer, then commits with a pop on click. | [Docs](https://reactbits.dev/micro/peek-rating) |
| **SpringCheck** | ReactBits | Checkbox row where one spring fills the box, draws the tick and strikes through the label. | [Docs](https://reactbits.dev/micro/spring-check) |
| **PulseHeart** | ReactBits | Like button that contracts to a dot, flips colour and pulses back as the count ticks over. | [Docs](https://reactbits.dev/micro/pulse-heart) |
| **RubberSegment** | ReactBits | Segmented control whose rubber thumb stretches across the gap and squashes into place. | [Docs](https://reactbits.dev/micro/rubber-segment) |
| **SlideCommit** | ReactBits | Slide-to-confirm handle that spins while your action runs and unfurls into a done pill. | [Docs](https://reactbits.dev/micro/slide-commit) |
| **WarmTooltip** | ReactBits | Tooltip group where the first label waits, then its siblings open instantly while warm. | [Docs](https://reactbits.dev/micro/warm-tooltip) |
| **FuseButton** | ReactBits | Action button whose done state carries an undo on a burning fuse. | [Docs](https://reactbits.dev/micro/fuse-button) |
| **ScrubField** | ReactBits | Number chip you drag to scrub, with rubber-band limits and click to type. | [Docs](https://reactbits.dev/micro/scrub-field) |
| **LatticeLoader** | ReactBits | Agent status row with a lattice of cells that brighten in a wave beside a live stopwatch. | [Docs](https://reactbits.dev/micro/lattice-loader) |
| **DodgeField** | ReactBits | Wrapper that makes any child dodge the pointer until it relents and glides home. | [Docs](https://reactbits.dev/micro/dodge-field) |
| **CodeSlots** | ReactBits | One-time code input whose digits spring into their slots, with paste and SMS autofill. | [Docs](https://reactbits.dev/micro/code-slots) |
| **WakeSlider** | ReactBits | Thumbless range slider of thin bars where drag speed raises a wake behind the handle. | [Docs](https://reactbits.dev/micro/wake-slider) |
| **CometDial** | ReactBits | Tick-ring dial you flick by angle, with a comet that streaks behind the lit head. | [Docs](https://reactbits.dev/micro/comet-dial) |
| **JellyRadio** | ReactBits | Radio group of chips where the chosen one swells and barges its neighbours outward. | [Docs](https://reactbits.dev/micro/jelly-radio) |
| **SwipeRow** | ReactBits | List row that swipes open to reveal actions and deletes on a full swipe. | [Docs](https://reactbits.dev/micro/swipe-row) |
| **GlideSelect** | ReactBits | Select chip whose menu pops from its corner and whose highlight glides between rows. | [Docs](https://reactbits.dev/micro/glide-select) |
| **StatusMark** | ReactBits | Agent task status glyph that morphs from an idle ring to a progress arc, then a check. | [Docs](https://reactbits.dev/micro/status-mark) |
| **CallChip** | ReactBits | Tool-call chip whose fill wipes across as a live timer ticks, ending green or shaking red. | [Docs](https://reactbits.dev/micro/call-chip) |
| **BellToggle** | ReactBits | Pill toggle where a press rings the bell, crossfades the label and unfurls the pill. | [Docs](https://reactbits.dev/micro/bell-toggle) |
| **SlingButton** | ReactBits | Send button you pull back like a slingshot and release to fire. | [Docs](https://reactbits.dev/micro/sling-button) |
| **SwipeToast** | ReactBits | Toast that swipes down to dismiss and burns a thin fuse for its remaining time. | [Docs](https://reactbits.dev/micro/swipe-toast) |
| **PromptBar** | ReactBits | Chat composer with @ sources, / commands, a model picker, dictation and attachments. | [Docs](https://reactbits.dev/micro/prompt-bar) |
| **SloshGauge** | ReactBits | Tank gauge whose liquid chases the value, tilts as it moves and splashes when it fills. | [Docs](https://reactbits.dev/micro/slosh-gauge) |
| **VoicePill** | ReactBits | Mic button that swells into a capsule of live equalizer bars and a timer while recording. | [Docs](https://reactbits.dev/micro/voice-pill) |
| **ThoughtLine** | ReactBits | Reasoning trace header with a live clock that folds its steps into one line when done. | [Docs](https://reactbits.dev/micro/thought-line) |
| **RefineFrame** | ReactBits | Media frame that steps an image through generation stages without any layout shift. | [Docs](https://reactbits.dev/micro/refine-frame) |
| **FolderFloat** | ReactBits | Folder whose notes spring out into a floating cloud when it opens on hover or press. | [Docs](https://reactbits.dev/micro/folder-float) |
| **BranchedMenu** | ReactBits | Collapsible menu that branches each section from a trunk and traces a line to your pick. | [Docs](https://reactbits.dev/micro/branched-menu) |
| **FlipCard** | ReactBits | Two-faced card that flips in 3D on a click, drag or flick and settles on a spring. | [Docs](https://reactbits.dev/micro/flip-card) |
| **TearTicket** | ReactBits | Ticket whose perforated stub tears off by hand, fibre by fibre, and drops away. | [Docs](https://reactbits.dev/micro/tear-ticket) |
| **PaperCrumple** | ReactBits | An image that crumples into a textured 3D sheet while you hold and drag it. | [Docs](https://reactbits.dev/micro/paper-crumple) |
| **Shredder** | ReactBits | A list with a paper shredder at the bottom that cuts dragged rows into curling strips. | [Docs](https://reactbits.dev/micro/shredder) |
| **FlyingButton** | ReactBits | Button that fires its thrusters on hover, lifts off on a WebGL smoke plume and lands back in its own cloud. | [Docs](https://reactbits.dev/micro/flying-button) |

### 3D-UI (5 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **RingCarousel3D** | Pure3D | 3D cylindrical ring carousel with tilted perspective, momentum dragging, card flipping, and keyframes control drawer. | [Docs](http://localhost:5176/ring-carousel.html) |
| **SphereWall3D** | Pure3D | 3D curved spherical dome matrix with 120 cards, 2-axis dragging, depth darkening, and click-to-center focus. | [Docs](http://localhost:5176/sphere-wall.html) |
| **OrbitGlobe3D** | Pure3D | 3D rotating spherical satellite card cluster with dynamic z-index depth sorting, center headline card, and smooth inertia. | [Docs](http://localhost:5176/orbit-globe.html) |
| **CardTunnel3D** | Pure3D | 3D perspective infinite corridor flythrough with 4 walls (floor, ceiling, walls), depth fog, and continuous modulo looping. | [Docs](http://localhost:5176/card-tunnel.html) |
| **SpiralStream3D** | Pure3D | 3D corkscrew helical card stream winding through space with 2.5 turns, 24 cards, infinite modulo loop, and keyframes drawer. | [Docs](http://localhost:5176/spiral-stream.html) |

### MagicUI-Layout (7 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedList** | MagicUI | A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page. | `npx shadcn@latest add @magicui/animated-list` |
| **AvatarCircles** | MagicUI | Overlapping circles of avatars. | `npx shadcn@latest add @magicui/avatar-circles` |
| **BentoGrid** | MagicUI | Bento grid is a layout used to showcase the features of a product in a simple and elegant way. | `npx shadcn@latest add @magicui/bento-grid` |
| **ClientTweetCard** | MagicUI | Animated client-tweet-card component from Magic UI. | `npx shadcn@latest add @magicui/client-tweet-card` |
| **Dock** | MagicUI | An implementation of the MacOS dock using react + tailwindcss + framer motion | `npx shadcn@latest add @magicui/dock` |
| **Marquee** | MagicUI | An infinite scrolling component that can be used to display text, images, or videos. | `npx shadcn@latest add @magicui/marquee` |
| **TweetCard** | MagicUI | A card that displays a tweet with the author's name, handle, and profile picture. | `npx shadcn@latest add @magicui/tweet-card` |

### MagicUI-Hero (8 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedGridPattern** | MagicUI | A animated background grid pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/animated-grid-pattern` |
| **Globe** | MagicUI | An autorotating, interactive, and highly performant globe made using WebGL. | `npx shadcn@latest add @magicui/globe` |
| **HeroVideoDialog** | MagicUI | A hero video dialog component. | `npx shadcn@latest add @magicui/hero-video-dialog` |
| **IconCloud** | MagicUI | An interactive 3D tag cloud component | `npx shadcn@latest add @magicui/icon-cloud` |
| **InteractiveGridPattern** | MagicUI | A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/interactive-grid-pattern` |
| **OrbitingCircles** | MagicUI | A collection of circles which move in orbit along a circular path | `npx shadcn@latest add @magicui/orbiting-circles` |
| **RetroGrid** | MagicUI | An animated scrolling retro grid effect | `npx shadcn@latest add @magicui/retro-grid` |
| **WarpBackground** | MagicUI | A card with a time warping background effect. | `npx shadcn@latest add @magicui/warp-background` |

### MagicUI-Text (20 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedGradientText** | MagicUI | An animated gradient background which transitions between colors for text. | `npx shadcn@latest add @magicui/animated-gradient-text` |
| **AnimatedShinyText** | MagicUI | A light glare effect which pans across text making it appear as if it is shimmering. | `npx shadcn@latest add @magicui/animated-shiny-text` |
| **AuroraText** | MagicUI | A beautiful aurora text effect | `npx shadcn@latest add @magicui/aurora-text` |
| **BlurFade** | MagicUI | Blur fade in and out animation. Used to smoothly fade in and out content. | `npx shadcn@latest add @magicui/blur-fade` |
| **ComicText** | MagicUI | Comic text animation that looks like a comic book text | `npx shadcn@latest add @magicui/comic-text` |
| **DiaTextReveal** | MagicUI | A horizontal color band sweeps across text with a gradient shine, then settles on your theme foreground color. | `npx shadcn@latest add @magicui/dia-text-reveal` |
| **HyperText** | MagicUI | A text animation that scrambles letters before revealing the final text. | `npx shadcn@latest add @magicui/hyper-text` |
| **KineticText** | MagicUI | A text component that animates font weight of characters on hover. | `npx shadcn@latest add @magicui/kinetic-text` |
| **LineShadowText** | MagicUI | A text component with a moving line shadow. | `npx shadcn@latest add @magicui/line-shadow-text` |
| **MorphingText** | MagicUI | A dynamic text morphing component for Magic UI. | `npx shadcn@latest add @magicui/morphing-text` |
| **NumberTicker** | MagicUI | Animate numbers to count up or down to a target number | `npx shadcn@latest add @magicui/number-ticker` |
| **ScrollBasedVelocity** | MagicUI | Scrolling text whose speed changes based on scroll speed | `npx shadcn@latest add @magicui/scroll-based-velocity` |
| **SparklesText** | MagicUI | A dynamic text that generates continuous sparkles with smooth transitions, perfect for highlighting text with animated stars. | `npx shadcn@latest add @magicui/sparkles-text` |
| **SpinningText** | MagicUI | The Spinning Text component animates text in a circular motion with customizable speed, direction, color, and transitions for dynamic and engaging effects. | `npx shadcn@latest add @magicui/spinning-text` |
| **Text3dFlip** | MagicUI | A text effect that flips each letter in 3D with a staggered animation on hover. | `npx shadcn@latest add @magicui/text-3d-flip` |
| **TextAnimate** | MagicUI | A text animation component that animates text using a variety of different animations. | `npx shadcn@latest add @magicui/text-animate` |
| **TextReveal** | MagicUI | Fade in text as you scroll down the page. | `npx shadcn@latest add @magicui/text-reveal` |
| **TypingAnimation** | MagicUI | Characters appearing in typed animation | `npx shadcn@latest add @magicui/typing-animation` |
| **VideoText** | MagicUI | A text component with a video background. | `npx shadcn@latest add @magicui/video-text` |
| **WordRotate** | MagicUI | A vertical rotation of words | `npx shadcn@latest add @magicui/word-rotate` |

### MagicUI-Buttons (7 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedSubscribeButton** | MagicUI | Animated animated-subscribe-button component from Magic UI. | `npx shadcn@latest add @magicui/animated-subscribe-button` |
| **InteractiveHoverButton** | MagicUI | A visually engaging button component that responds to hover with dynamic transitions, adapting smoothly between light and dark modes for enhanced user interactivity. | `npx shadcn@latest add @magicui/interactive-hover-button` |
| **PulsatingButton** | MagicUI | An animated pulsating button useful for capturing attention of users. | `npx shadcn@latest add @magicui/pulsating-button` |
| **RainbowButton** | MagicUI | An animated button with a rainbow effect. | `npx shadcn@latest add @magicui/rainbow-button` |
| **RippleButton** | MagicUI | An animated button with ripple useful for user engagement. | `npx shadcn@latest add @magicui/ripple-button` |
| **ShimmerButton** | MagicUI | A button with a shimmering light which travels around the perimeter. | `npx shadcn@latest add @magicui/shimmer-button` |
| **ShinyButton** | MagicUI | A shiny button component with dynamic styles in the dark mode or light mode. | `npx shadcn@latest add @magicui/shiny-button` |

### MagicUI-Effects (31 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **AnimatedBeam** | MagicUI | An animated beam of light which travels along a path. Useful for showcasing the "integration" features of a website. | `npx shadcn@latest add @magicui/animated-beam` |
| **AnimatedCircularProgressBar** | MagicUI | Animated Circular Progress Bar is a component that displays a circular gauge with a percentage value. | `npx shadcn@latest add @magicui/animated-circular-progress-bar` |
| **AnimatedThemeToggler** | MagicUI | Animated theme toggle using the View Transitions API with configurable clip-path shapes and origin. | `npx shadcn@latest add @magicui/animated-theme-toggler` |
| **Backlight** | MagicUI | A backlight glow effect for videos, images, and SVGs. | `npx shadcn@latest add @magicui/backlight` |
| **BorderBeam** | MagicUI | An animated beam of light which travels along the border of its container. | `npx shadcn@latest add @magicui/border-beam` |
| **Confetti** | MagicUI | Confetti animations are best used to delight your users when something special happens | `npx shadcn@latest add @magicui/confetti` |
| **CoolMode** | MagicUI | Cool mode effect for buttons, links, and other DOMs | `npx shadcn@latest add @magicui/cool-mode` |
| **DotPattern** | MagicUI | A background dot pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/dot-pattern` |
| **DottedMap** | MagicUI | A component with a svg dotted map. | `npx shadcn@latest add @magicui/dotted-map` |
| **FlickeringGrid** | MagicUI | A flickering grid background made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/flickering-grid` |
| **Floating3dParticles** | MagicUI | A canvas-based pseudo-3D particle field with perspective projection, continuous rotation, buoyant drift and depth-aware rendering. | `npx shadcn@latest add @magicui/floating-3d-particles` |
| **GlareHover** | MagicUI | A diagonal light glare on hover using a ::before gradient, CSS variables, and background-position animation—no extra global keyframes required. | `npx shadcn@latest add @magicui/glare-hover` |
| **GlyphMatrix** | MagicUI | An animated grid of subtly shifting glyphs on a canvas, with a theme-aware color driven by the consumer. | `npx shadcn@latest add @magicui/glyph-matrix` |
| **GridPattern** | MagicUI | A background grid pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/grid-pattern` |
| **HexagonPattern** | MagicUI | A background hexagon pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/hexagon-pattern` |
| **Highlighter** | MagicUI | A text highlighter that mimics the effect of a human-drawn marker stroke. | `npx shadcn@latest add @magicui/highlighter` |
| **Lens** | MagicUI | A interactive component that enables zooming into images, videos and other elements. | `npx shadcn@latest add @magicui/lens` |
| **LightRays** | MagicUI | A component with animated light rays which shine down from above. | `npx shadcn@latest add @magicui/light-rays` |
| **MagicCard** | MagicUI | A spotlight effect that follows your mouse cursor and highlights borders on hover. | `npx shadcn@latest add @magicui/magic-card` |
| **Meteors** | MagicUI | A meteor shower effect. | `npx shadcn@latest add @magicui/meteors` |
| **NeonGradientCard** | MagicUI | A beautiful neon card effect | `npx shadcn@latest add @magicui/neon-gradient-card` |
| **NoiseTexture** | MagicUI | An SVG fractal noise layer using feTurbulence for subtle texture overlays. | `npx shadcn@latest add @magicui/noise-texture` |
| **Particles** | MagicUI | Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity. | `npx shadcn@latest add @magicui/particles` |
| **PixelImage** | MagicUI | A component that displays your image with a pixelated effect, enhancing the visual appeal of any image in your website. | `npx shadcn@latest add @magicui/pixel-image` |
| **Pointer** | MagicUI | A component that displays a pointer when hovering over an element | `npx shadcn@latest add @magicui/pointer` |
| **ProgressiveBlur** | MagicUI | Add a progressive blur effect to scrollable content | `npx shadcn@latest add @magicui/progressive-blur` |
| **Ripple** | MagicUI | An animated ripple effect typically used behind elements to emphasize them. | `npx shadcn@latest add @magicui/ripple` |
| **ScrollProgress** | MagicUI | Animated Scroll Progress for your pages | `npx shadcn@latest add @magicui/scroll-progress` |
| **ShineBorder** | MagicUI | Shine border is an animated background border effect. | `npx shadcn@latest add @magicui/shine-border` |
| **SmoothCursor** | MagicUI | A customizable, physics-based smooth cursor animation component for React applications. | `npx shadcn@latest add @magicui/smooth-cursor` |
| **StripedPattern** | MagicUI | A background striped pattern made with SVGs, fully customizable using Tailwind CSS. | `npx shadcn@latest add @magicui/striped-pattern` |

### MagicUI-Mockups (6 components)

| Component | Library | Description | CLI / Docs |
| :--- | :--- | :--- | :--- |
| **Android** | MagicUI | A mockup of an Android device. | `npx shadcn@latest add @magicui/android` |
| **CodeComparison** | MagicUI | A component which compares two code snippets. | `npx shadcn@latest add @magicui/code-comparison` |
| **FileTree** | MagicUI | A component used to showcase the folder and file structure of a directory. | `npx shadcn@latest add @magicui/file-tree` |
| **Iphone** | MagicUI | A mockup of the iPhone | `npx shadcn@latest add @magicui/iphone` |
| **Safari** | MagicUI | A safari browser mockup to showcase your website. | `npx shadcn@latest add @magicui/safari` |
| **Terminal** | MagicUI | An implementation of the MacOS terminal. Useful for showcasing a command line interface. | `npx shadcn@latest add @magicui/terminal` |

