# AGENTS.md — Project Context for AI Agents

> This file provides complete context for AI coding agents working on this portfolio.
> It documents architecture, conventions, file roles, design tokens, JavaScript modules, mobile responsiveness, keyboard shortcuts, and strict contribution/branching guidelines.

---

## Project Overview

**Name:** Om Tiwari — Personal Portfolio Website  
**Live URL:** [https://omtiwari.tech](https://omtiwari.tech)  
**GitHub:** [https://github.com/omtiwari17/my-portfolio](https://github.com/omtiwari17/my-portfolio)  
**Hosting:** GitHub Pages with custom domain (`CNAME`)  

**Description:**  
A multi-page static developer portfolio for Om Tiwari — a B.Tech CSE graduate specializing in Python, Django, AWS Cloud Architecture, DevOps Pipelines (Docker & Kubernetes), and Agentic AI. The site showcases flagship projects, professional experience, certifications, interactive search/filter gallery, downloadable resume, and AJAX contact form.

**Philosophy:** Built entirely from scratch using vanilla HTML5, CSS3, and ES6+ JavaScript. Zero frameworks, zero build tools, zero external dependencies. Designed for performance, mobile responsiveness, accessibility, and full creative control.

---

## Tech Stack

| Layer         | Technology                                              |
|---------------|---------------------------------------------------------|
| Structure     | Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`) |
| Styling       | Vanilla CSS3 — CSS Custom Properties, Grid, Flexbox, Glassmorphism, Keyframe Animations, Mobile-First Breakpoints |
| Logic         | Vanilla ES6+ JavaScript — DOM Utilities, Canvas API, Event Delegation, Passive Listeners |
| Fonts         | Google Fonts — `Inter`, `Outfit`, `JetBrains Mono`, `Shadows Into Light` |
| Icons         | Inline SVGs (zero external icon font CDNs)              |
| Forms Backend | [Formspree](https://formspree.io/) (endpoint: `https://formspree.io/f/mkgwrrar`) |
| Hosting       | GitHub Pages + Custom Domain (`omtiwari.tech`)           |
| Resume        | Hosted on Google Drive (linked via CTA buttons)          |

---

## File Structure

```
my-portfolio/
├── CNAME                    # Custom domain config: omtiwari.tech
├── README.md                # Project documentation (user-facing)
├── AGENTS.md                # AI agent context (this file)
├── index.html               # Homepage — hero, live status, core competencies, featured projects, experience
├── about.html               # About — bio, education timeline, 6 cert cards, core values
├── projects.html            # Project gallery — 7 projects with real-time search & category filter tabs
├── resume.html              # Interactive resume — 2-column digital resume + certs grid
├── contact.html             # Contact form (Formspree AJAX) + email copy box + social grid
├── 404.html                 # Custom 404 error page with animated floating astronaut & quick links
└── assets/
    ├── css/
    │   └── style.css        # Global design system: tokens, reset, components, layout grids, dark/light theme, animation keyframes, mobile media queries
    ├── js/
    │   └── main.js          # Shared interactivity: multi-color canvas particles, theme toggle, mobile drawer nav, scroll reveal, project search/filter, typing animation, toast notifications, keyboard shortcuts, rAF card spotlight, custom cursor
    └── img/
        ├── favicon.png      # PNG favicon
        ├── favicon.svg      # SVG favicon (preferred)
        ├── AWS Badge.png    # AWS Credly certification badge
        ├── Agentic Project.png
        ├── Agentic.png
        ├── banking system.png
        ├── Find My Book - Copy.png
        ├── Find My Book.png
        ├── k8s-deploy.png
        ├── multi-agent.png
        ├── osts.png
        ├── pds org.png
        ├── pds.png
        ├── win pulse.png
        └── winpulse.png
```

---

## Architecture & Design System

### CSS Design Tokens (`assets/css/style.css`)

All design tokens are centralized as CSS Custom Properties under `:root` (dark mode default) and `.light` (high-contrast light mode override):

| Token Category | Key Variables | Dark Mode Value | Light Mode Value |
|---|---|---|---|
| Backgrounds | `--bg`, `--bg-soft`, `--bg-subtle` | `#030712`, `#0b0f19`, `#111827` | `#f8fafc`, `#ffffff`, `#f1f5f9` |
| Cards | `--card`, `--card-hover`, `--card-glass`, `--grad-card` | `#0d1424`, `#121b2f`, `rgba(13,20,36,0.94)`, `linear-gradient(...)` | `#ffffff`, `#ffffff`, `#ffffff`, `linear-gradient(...)` |
| Text | `--text`, `--muted`, `--muted-2`, `--heading` | `#f8fafc`, `#94a3b8`, `#64748b`, `#ffffff` | `#334155`, `#64748b`, `#94a3b8`, `#0f172a` |
| Accents | `--accent`, `--accent-hover`, `--accent-2`, `--purple`, `--emerald` | `#38bdf8`, `#7dd3fc`, `#818cf8`, `#c084fc`, `#34d399` | `#0284c7`, `#0369a1`, `#6366f1`, `#a855f7`, `#059669` |
| Borders | `--border`, `--border-hover`, `--border-light` | `rgba(255,255,255,0.08)`, `rgba(56,189,248,0.4)`, `rgba(255,255,255,0.14)` | `#e2e8f0`, `rgba(2,132,199,0.4)`, `#cbd5e1` |
| Gradients | `--grad-hero`, `--grad-text`, `--grad-glow` | 4-stop Cyan → Indigo → Purple → Pink (`#0ea5e9` → `#6366f1` → `#a855f7` → `#f472b6`) | Same 4-stop Gradient |
| Typography | `--font-body`, `--font-display`, `--font-code` | `Inter`, `Inter` (unified), `JetBrains Mono` | Same |

### Component Library (CSS Classes)

| Class | Purpose |
|---|---|
| `.container` | Centered layout wrapper, `width: min(1140px, 92%)` |
| `.site-header` | Sticky capsule navigation bar with `backdrop-filter: blur(20px)` |
| `.brand`, `.logo` | Brand logo badge with 4-stop vibrant gradient (`#0ea5e9` → `#f472b6`), `12px` radius & `Shadows Into Light` cursive text |
| `.nav`, `.nav a` | Capsule navigation menu with hover indicators & active page highlight |
| `.btn`, `.btn.outline`, `.btn.small` | Button system with CSS ripple effect and hover elevation |
| `.card`, `.card.hover`, `.card.glow` | Glassmorphism container cards with subtle mouse spotlight (`.card::before`) and border glow (`.glow::after`) |
| `.pill` | Styled technology stack pills with neutral glass default and hover cyan accent |
| `kbd` | Subtle keyboard shortcut badge |
| `.live-status`, `.pulse-dot` | Glowing green availability pill above hero headline |
| `.code-block`, `.code-block-header` | MacOS IDE window frame with window controls and typing code |
| `.section`, `.section.alt` | Page sections with gradient background washes |
| `.section-title` | Section title with gradient accent underline |
| `.grid`, `.cards-3`, `.skills-grid` | CSS Grid layouts |
| `.timeline`, `.t-item`, `.t-dot` | Vertical experience timeline component |
| `.reveal`, `.reveal-up`, `.reveal-down` | IntersectionObserver scroll reveal entrance animations |
| `.gradient-text` | Animated multi-color gradient text shine sweep (`25s` duration) |
| `.icons`, `.icon` | Social action buttons with hover lift |
| `.site-footer` | Full-width anchored footer with social links & shortcut hint badge |
| `.preloader`, `.preloader-logo` | Page load overlay with pulsing 4-stop gradient logo matching header |
| `.scroll-progress` | Fixed top gradient progress bar tracking window scroll percentage |
| `.back-to-top` | Floating circular scroll-to-top button (appears after 350px scroll) |
| `.cursor-dot`, `.cursor-ring` | Desktop custom cursor system (fine pointers only) |

---

## JavaScript Modules & Interactivity (`assets/js/main.js`)

All interactivity is managed in a single, robust ES6 file without external libraries:

| Feature | Description & Implementation Details |
|---|---|
| **Theme System** | `localStorage`-persisted dark/light theme switching with `.light` class toggled on `<body>`. |
| **Mobile Drawer Nav** | Menu toggle button toggles `.open` on `#nav` drawer overlay. Auto-closes when clicking links or pressing <kbd>Esc</kbd>. |
| **Scroll Reveal** | `IntersectionObserver` adds `.is-visible` to `.reveal` elements at low threshold (`0.05`). On mobile (<=600px), CSS disables 3D `translateY` jumps to prevent scroll stutter. |
| **Multi-Color Canvas Particles** | HTML5 Canvas (`#bgParticles`) rendering 75 particles (desktop) / 35 particles (mobile) with multi-color dots (Cyan, Indigo, Violet, Pink), dynamic RGBA color-mixing connection lines, interactive mouse cursor connection lines, and `touchstart`/`touchmove`/`touchend` reset handlers. |
| **Keyboard Shortcuts Manager** | Global `keydown` listener handling <kbd>T</kbd> (Theme), <kbd>/</kbd> (Search), <kbd>Esc</kbd> (Clear/Close), <kbd>H</kbd>/<kbd>A</kbd>/<kbd>P</kbd>/<kbd>R</kbd>/<kbd>C</kbd> (Navigation), and <kbd>?</kbd> (Help Cheat Sheet Toast). Ignored inside form inputs. |
| **Project Search & Filter** | Real-time text search + category filter tabs (`all`, `python`, `web`, `ai`, `devops`, `cloud`) with dynamic visible item count display (`Showing X of 7 Projects`). |
| **Formspree AJAX** | Contact form submission via `fetch` API POST to Formspree endpoint (`https://formspree.io/f/mkgwrrar`) with inline status message and toast feedback. |
| **Hero Typing Animation** | Types JSON code into `.code-block pre code` character-by-character when hero section enters viewport. Code block uses `min-height: 180px` on mobile to prevent CLS. |
| **Card Spotlight Tracking** | `mousemove` handler updates `--mouse-x` and `--mouse-y` CSS variables on `.card` elements, throttled via `requestAnimationFrame` and marked `{ passive: true }`. |
| **Custom Cursor** | Dynamically appends `.cursor-dot` and `.cursor-ring` to `document.body` on fine pointer devices (`@media (pointer: fine)`). Ring follows dot with `0.18` spring lerp and expands on hover targets via event delegation. |
| **Stat Counters** | `IntersectionObserver` triggers cubic ease-out count-up animation on `[data-count]` elements. |

---

## Global Keyboard Shortcuts

The portfolio includes an active keyboard shortcuts manager accessible on all pages:

| Key | Shortcut Description |
|---|---|
| <kbd>T</kbd> | Toggle Dark / Light Theme (with Toast feedback) |
| <kbd>/</kbd> | Focus & select Project Search Bar input on `projects.html` |
| <kbd>Esc</kbd> | Clear search input & blur focus **or** close mobile drawer menu |
| <kbd>?</kbd> | Display Keyboard Shortcuts Cheat Sheet Toast |
| <kbd>H</kbd> | Quick Navigate to **Home** (`index.html`) |
| <kbd>A</kbd> | Quick Navigate to **About** (`about.html`) |
| <kbd>P</kbd> | Quick Navigate to **Projects** (`projects.html`) |
| <kbd>R</kbd> | Quick Navigate to **Resume** (`resume.html`) |
| <kbd>C</kbd> | Quick Navigate to **Contact** (`contact.html`) |

> ℹ️ *Note: Single-key shortcuts are automatically suppressed while user focus is inside form input fields (`<input>`, `<textarea>`, `<select>`).*

---

## Page Template Structure

Every HTML page inside `<body>` follows this exact standard template:

```html
<body class="theme-auto">
  <!-- 1. Preloader -->
  <div class="preloader" id="preloader"><div class="preloader-logo">OM</div></div>

  <!-- 2. Scroll Progress Bar -->
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- 3. Particle Canvas -->
  <canvas id="bgParticles" aria-hidden="true"></canvas>

  <!-- 4. Sticky Capsule Header -->
  <header class="site-header reveal-down">
    <a class="brand" href="index.html">
      <span class="logo glow">OM</span> <strong>Om Tiwari</strong>
    </a>
    <nav class="nav" id="nav">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="projects.html">Projects</a>
      <a href="resume.html">Resume</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="btn small outline" id="themeToggle" aria-label="Toggle theme">🌓</button>
      <button class="btn small" id="menuToggle" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/></svg>
      </button>
    </div>
  </header>

  <!-- 5. Main Content Container -->
  <main class="container">
    <!-- Page Content -->
  </main>

  <!-- 6. Back-to-Top Button -->
  <button class="back-to-top" id="backToTop" aria-label="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
  </button>

  <!-- 7. Site Footer -->
  <footer class="site-footer">
    <p>© <span id="year"></span> Om Tiwari · All rights reserved. <span style="opacity: 0.85; font-size: 0.82rem; margin-left: 0.35rem;">Press <kbd>?</kbd> for shortcuts</span></p>
    <div class="footer-icons icons">
      <!-- Social SVGs -->
    </div>
  </footer>
</body>
```

---

## Deployment & Branching Guidelines

- **Hosting Platform:** GitHub Pages (auto-deployed from `main` branch)
- **Custom Domain:** `omtiwari.tech` (`CNAME` file)
- **Development Branch:** `dev` — **ALL commits, experiments, and fixes MUST be performed on `dev` / `origin/dev`.**
- **STRICT MERGE POLICY:**  
  - **NEVER merge `dev` into `main` unless the user explicitly requests a branch merge.**  
  - Commands like *"push"*, *"push changes"*, or *"push all commits"* mean `git push origin dev` ONLY.  
  - Merging `dev` into `main` must NEVER occur automatically.

---

## Important Rules for AI Agents

1. **Commit to `dev` only & NEVER auto-merge into `main`.** Always push commits to `origin/dev`.
2. **Zero build tools / zero frameworks.** Do not add npm, webpack, vite, react, tailwind, or jquery.
3. **Preserve page integrity.** Every HTML page must retain identical preloader, scroll progress, background canvas, site header, nav links, container wrapper, back-to-top button, and site footer.
4. **Use design tokens.** Always reference CSS Custom Properties (`var(--bg)`, `var(--accent)`, `var(--border)`).
5. **Dual theme compatibility.** All new UI elements must look pristine in both Dark Mode (`:root`) and Light Mode (`.light`).
6. **Mobile-first performance.** Keep scroll event listeners passive (`{ passive: true }`), throttle mousemove tracking via `requestAnimationFrame`, and ensure touch targets have a minimum height of 44px on mobile devices.
