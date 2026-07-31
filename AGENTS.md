# AGENTS.md — Project Context for AI Agents

> This file provides complete context for AI coding agents working on this portfolio.
> It documents architecture, conventions, file roles, and contribution guidelines.

---

## Project Overview

**Name:** Om Tiwari — Personal Portfolio Website
**Live URL:** [https://omtiwari.tech](https://omtiwari.tech)
**GitHub:** [https://github.com/omtiwari17/my-portfolio](https://github.com/omtiwari17/my-portfolio)
**Hosting:** GitHub Pages with custom domain (see `CNAME`)

**Description:**
A multi-page static developer portfolio for Om Tiwari — a B.Tech CSE graduate specializing in Python, Django, AWS, DevOps, and Agentic AI. The site showcases projects, experience, certifications, skills, and provides a downloadable resume and contact form.

**Philosophy:** Built entirely from scratch using vanilla HTML5, CSS3, and ES6+ JavaScript. Zero frameworks, zero build tools, zero dependencies. Designed for performance, accessibility, and full creative control.

---

## Tech Stack

| Layer         | Technology                                              |
|---------------|---------------------------------------------------------|
| Structure     | HTML5 (semantic elements: `<header>`, `<main>`, `<section>`, `<footer>`) |
| Styling       | Vanilla CSS3 — CSS Custom Properties, Grid, Flexbox, Glassmorphism, Keyframe Animations |
| Logic         | Vanilla ES6+ JavaScript — no jQuery, no frameworks      |
| Fonts         | Google Fonts — `Inter`, `Syne`, `Shadows Into Light`, `DM Sans` |
| Icons         | Inline SVGs (no icon library CDN)                        |
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
├── index.html               # Homepage — hero, marquee skills, featured projects, experience
├── about.html               # About — bio, education timeline, certifications, values
├── projects.html            # Project gallery — 7 projects with filter controls
├── resume.html              # Interactive resume — 2-column layout + certifications
├── contact.html             # Contact form (Formspree AJAX) + social links
├── 404.html                 # Custom 404 error page with animated astronaut
└── assets/
    ├── css/
    │   └── style.css        # Global design system: tokens, reset, components, layouts, themes, responsive, premium enhancements
    ├── js/
    │   └── main.js          # All interactivity: particles, theme toggle, nav, scroll reveal, filters, typing, form, preloader, custom cursor, counters
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

All colors, shadows, radii, transitions, and typography are centralized as CSS Custom Properties under `:root` (dark mode) and `.light` (light mode override):

| Token Category | Key Variables |
|---|---|
| Backgrounds | `--bg` (`#060b18`), `--bg-soft`, `--card`, `--card-hover` |
| Text | `--text` (`#e8edf5`), `--muted`, `--muted-2` |
| Accents | `--accent` (`#38bdf8` cyan), `--accent-2` (`#818cf8`), `--purple` (`#7c3aed`) |
| Borders | `--border`, `--border-light`, `--ring` |
| Gradients | `--grad-hero` (cyan → purple), `--grad-card` |
| Shadows | `--shadow-sm`, `--shadow`, `--shadow-lg`, `--shadow-glow` |
| Radius | `--radius-sm` (8px), `--radius` (14px), `--radius-lg` (20px), `--radius-xl` (28px) |
| Transitions | `--ease`, `--t-fast` (0.18s), `--t-mid` (0.32s) |
| Typography | `--font-body` (`DM Sans`), `--font-display` (`Playfair Display`) |

### Light Mode

Triggered by adding the `.light` class to `<body>`. Overrides all design tokens with light-appropriate values. Controlled via `localStorage` persistence.

### Component Library (CSS classes)

| Class | Purpose |
|---|---|
| `.container` | Centered content wrapper, `min(1100px, 92%)` |
| `.site-header` | Sticky glassmorphism navbar with backdrop blur |
| `.nav` | Horizontal nav links (vertical on mobile) |
| `.btn`, `.btn.outline`, `.btn.small` | Action buttons with ripple effect |
| `.card`, `.card.hover`, `.card.glow` | Glass cards with hover glow borders |
| `.pill` | Rounded tech stack tags |
| `.section`, `.section.alt` | Page sections with optional gradient bg |
| `.section-title` | Section headers with gradient underline |
| `.grid`, `.cards-3`, `.skills-grid` | CSS Grid layouts |
| `.timeline`, `.t-item`, `.t-dot` | Vertical timeline component |
| `.reveal`, `.reveal-up`, `.reveal-down` | Scroll-triggered entrance animations |
| `.gradient-text` | Animated gradient text (hero heading) |
| `.icons`, `.icon` | Social icon buttons with hover lift |
| `.site-footer` | Glassmorphism footer with social links |
| `.form`, `.form .row` | Contact form layout |
| `.preloader`, `.preloader-logo` | Page load animation with pulsing gradient "OM" logo |
| `.scroll-progress` | Fixed gradient bar at top tracking scroll position |
| `.back-to-top` | Floating circular button, appears after 400px scroll |
| `.cursor-dot`, `.cursor-ring` | Custom cursor system (desktop only, `pointer: fine`) |
| `.marquee`, `.marquee-track`, `.marquee-item` | Auto-scrolling horizontal tech skills ribbon |
| `.section-divider` | Gradient horizontal rule between sections |

### JavaScript (`assets/js/main.js`)

All functionality in a single file, no modules:

| Feature | Implementation |
|---|---|
| Theme Toggle | `localStorage`-based dark/light with `.light` class on `<body>` |
| Mobile Nav | Hamburger button toggles `.open` on `#nav` |
| Scroll Reveal | `IntersectionObserver` adds `.is-visible` class |
| Button Ripple | Dynamic `<span>` injection on click with CSS animation |
| Project Filters | `data-filter` buttons match `data-tags` on `.project` elements |
| Contact Form | AJAX `fetch` POST to Formspree, inline status feedback |
| Typing Animation | Character-by-character typing into `<pre><code>` block |
| Particle Background | HTML5 Canvas with 70 floating particles + distance-based line connections |
| Preloader | `window.load` event adds `.loaded` class to `#preloader`, then hides after fade |
| Scroll Progress | `scroll` event updates `#scrollProgress` width based on scroll percentage |
| Back to Top | Shows `#backToTop` button after 400px scroll, smooth scrolls to top on click |
| Animated Counter | `IntersectionObserver` triggers count-up animation on `[data-count]` elements with cubic easing |
| Custom Cursor | Creates `.cursor-dot` + `.cursor-ring` elements, ring follows dot with 0.15 lerp, expands on hover targets |

---

## Premium Visual Enhancements

All enhancements are 100% static (HTML + CSS + JS) and fully compatible with GitHub Pages.

### Present on Every Page

| Feature | HTML Element | CSS Class | JS Handler |
|---|---|---|---|
| **Preloader** | `<div class="preloader" id="preloader">` right after `<body>` | `.preloader`, `.preloader-logo`, `.preloader.loaded` | `window.load` → adds `.loaded` class |
| **Scroll Progress** | `<div class="scroll-progress" id="scrollProgress">` after preloader | `.scroll-progress` (fixed, top:0, gradient bg) | `scroll` event → updates `width` |
| **Back-to-Top** | `<button class="back-to-top" id="backToTop">` before `<footer>` | `.back-to-top`, `.back-to-top.visible` | `scroll` event → toggles `.visible` |
| **Particle Background** | `<canvas id="bgParticles">` after scroll progress | `#bgParticles` (fixed, z-index:-1) | 70 particles + distance-based lines |
| **Noise Texture** | `body::before` pseudo-element | SVG-based fractal noise, `opacity: .035` | None (pure CSS) |
| **Custom Cursor** | Injected dynamically by JS | `.cursor-dot`, `.cursor-ring` | Tracks mouse, enlarges on hover targets |

### Homepage-Specific

| Feature | Details |
|---|---|
| **Live Status Indicator** | Glowing green status badge (`.live-status`, `.pulse-dot`) above hero headline (`Available for Software & AWS Roles`). |
| **Subtle 3D Floating Animation** | `.hero-art` block animates with continuous, smooth `@keyframes float-subtle`. |
| **MacOS IDE Window Header** | Hero JSON code block features authentic window controls (`.code-dot.red`, `.yellow`, `.green`) and `profile.py` title bar. |
| **Card Spotlight & 3D Lift** | `mousemove` tracking on `.card` updates CSS variables (`--mouse-x`, `--mouse-y`). Cards lift smoothly on hover (`translateY(-5px)`) with cyan glow border. |
| **Stat Counter** | `<strong data-count="7" data-suffix="+">0</strong>` on hero stats. Counts from 0 to target with cubic ease-out animation when scrolled into view. |
| **Image Zoom** | `.card.hover:hover .project-img` applies `scale(1.04)` and `brightness(1.08)` |

### Lazy Loading

All `<img>` tags across `index.html` and `projects.html` have `loading="lazy"` for deferred image loading.

---

## Page Body Structure (Standard Template)

Every page follows this exact structure inside `<body>`:

```html
<body class="theme-auto">
  <!-- 1. Preloader (fades out on load) -->
  <div class="preloader" id="preloader">
    <div class="preloader-logo">OM</div>
  </div>

  <!-- 2. Scroll progress bar -->
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- 3. Particle canvas -->
  <canvas id="bgParticles" aria-hidden="true"></canvas>

  <!-- 4. Sticky header with nav -->
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
      <button class="btn small" id="menuToggle" aria-label="Open menu"><!-- hamburger SVG --></button>
    </div>
  </header>

  <!-- 5. Main content -->
  <main class="container">
    <!-- Page-specific sections -->
  </main>

  <!-- 6. Back-to-top button -->
  <button class="back-to-top" id="backToTop" aria-label="Back to top">
    <!-- chevron-up SVG -->
  </button>

  <!-- 7. Footer -->
  <footer class="site-footer reveal-up">
    <p>© <span id="year"></span> Om Tiwari</p>
    <div class="footer-icons icons">
      <!-- GitHub, LinkedIn, Email SVG icons -->
    </div>
  </footer>
</body>
```

---

## Page Details

### `index.html` — Homepage
- Hero section with live status badge (`.live-status`), gradient heading, bio, CTA buttons, social links, animated stat counter (`7+` counts up from 0)
- Glass code block with MacOS window header (`profile.py`) and typing animation (JSON profile)
- Skills section with 4 clean categorized glass cards (Languages, Cloud, Database, Tools)
- Featured projects (3-column cards with 3D hover lift and image zoom, lazy loaded images)
- Experience timeline (Software Engineer Trainee, AWS Trainee with Credly badge)
- Footer with social icons

### `about.html` — About
- Bio narrative
- Education vertical timeline (B.Tech CSE at Medi-Caps University, 12th CBSE)
- Certifications grid (6 cards: AWS ×2, nasscom/IBM ×3, TCS CodeVita)
- Values section (Clean Code, User First, Always Learning)

### `projects.html` — Project Gallery
- Filter controls: All, Python, Web, AI, DevOps, Cloud
- 7 project cards with: image (lazy loaded), description, feature bullets, tech pills, GitHub/Live links
- Projects: WinPulse, K8s Deploy, Multi-Agent Manufacturing, Patient Depict, Find My Book, Smart Traffic, Banking System

### `resume.html` — Interactive Resume
- PDF download CTA (Google Drive)
- 2-column layout: Experience + Education (left), Skills + Projects (right)
- Full-width certifications section (6 detailed cards)

### `contact.html` — Contact
- AJAX form (Name, Email, Message) via Formspree
- Real-time status feedback (success/error)
- Social links card (GitHub, LinkedIn, Email)

### `404.html` — Error Page
- Animated floating astronaut SVG with orbit ring and blinking eyes
- Glitch-effect 404 number with gradient animation (glitches on hover)
- Decorative code snippet styled like hero code block
- Navigation buttons back to Home, Projects, Contact
- Quick links to About, Resume, GitHub
- **Note:** GitHub Pages automatically serves `404.html` for unknown routes. Does NOT work on local dev servers (e.g., VS Code Live Server) — access directly via `/404.html` to preview.

---

## Conventions & Coding Standards

### HTML
- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include ARIA attributes (`aria-label`, `aria-hidden`) on interactive/decorative elements
- Use inline SVGs for icons (not font icons)
- Every page must include: preloader `#preloader`, scroll progress `#scrollProgress`, `<canvas id="bgParticles">`, site header, nav, main container, back-to-top `#backToTop`, footer
- Font preconnect links must be in every `<head>`
- All `<img>` tags should include `loading="lazy"` for performance

### CSS
- All values must use design tokens (CSS variables) — never hardcode colors or sizes
- Light mode overrides go under `.light { }` selector (or `body.light::before` for pseudo-elements)
- Responsive breakpoints: `900px` (tablet), `700px` (cert grids), `600px` (mobile)
- Use `var(--t-fast)` and `var(--t-mid)` for transitions
- Page-specific styles use inline `<style>` blocks in the HTML `<head>` (not in global CSS)
- Custom cursor only active on devices with fine pointer (`@media (pointer: fine)`)

### JavaScript
- Vanilla ES6+ only — no frameworks, no build step
- Use `$()` and `$$()` helpers defined at top of `main.js`
- All DOM-dependent code is safe (null-checked with `?.` and `if` guards)
- `main.js` is loaded with `defer` attribute
- Scroll event listeners use `{ passive: true }` for performance
- Animated counters use `data-count` and `data-suffix` attributes on elements

### File Naming
- HTML pages: lowercase, hyphen-separated (e.g., `about.html`, `contact.html`)
- Image assets: descriptive names, may contain spaces (legacy), prefer lowercase with hyphens for new files
- Single CSS file: `assets/css/style.css`
- Single JS file: `assets/js/main.js`

---

## Adding a New Page

1. Create `new-page.html` in the project root
2. Copy the `<head>` block from any existing page (update `<title>` and `<meta description>`)
3. Include the standard body structure (see **Page Body Structure** above):
   - `<div class="preloader" id="preloader">` with logo
   - `<div class="scroll-progress" id="scrollProgress">`
   - `<canvas id="bgParticles">`
   - `<header class="site-header reveal-down">` with full nav
   - `<main class="container">`
   - `<button class="back-to-top" id="backToTop">` with chevron SVG
   - `<footer class="site-footer reveal-up">` with social icons
4. Add the nav link to ALL existing pages' `<nav>` sections
5. Page-specific CSS goes in an inline `<style>` block in `<head>`
6. No additional JS files needed — `main.js` handles all shared interactivity (preloader, scroll progress, back-to-top, cursor, etc.)

---

## Deployment & Branching Policy

- **Platform:** GitHub Pages (auto-deployed from the `main` branch)
- **Custom Domain:** Configured via `CNAME` file → `omtiwari.tech`
- **Development Branch:** `dev` — **ALL work and commits MUST be done on `dev` first.**
- **No Build Step:** Push HTML/CSS/JS directly — GitHub Pages serves static files as-is
- **Testing Locally:** Open any `.html` file directly in a browser, or use VS Code Live Server (port 5500). Note: custom 404 routing only works on GitHub Pages, not locally.

---

## Key External Links

| Resource | URL |
|---|---|
| Live Site | https://omtiwari.tech |
| GitHub Repo | https://github.com/omtiwari17/my-portfolio |
| LinkedIn | https://www.linkedin.com/in/tiwariom/ |
| Email | work.om.tiwari@gmail.com |
| Formspree Endpoint | https://formspree.io/f/mkgwrrar |

---

## Important Notes for Agents

1. **ALWAYS commit to `dev` branch first.** Never commit or push directly to `main`. All agent development, bug fixes, visual improvements, and code changes MUST be committed on `dev` and pushed to `origin/dev`. Merging `dev` into `main` must only occur when explicitly confirmed by the user.
2. **No build tools.** Do not introduce npm, webpack, vite, or any build system unless explicitly asked.
3. **No frameworks.** Do not add React, Vue, Bootstrap, Tailwind, or jQuery unless explicitly asked.
4. **Preserve existing comments and docstrings** unless the change specifically requires modifying them.
5. **Test in both themes.** Any visual change must look correct in both dark mode (default) and light mode (`.light` class).
6. **Maintain responsive design.** Test at desktop (1100px+), tablet (900px), and mobile (600px) breakpoints.
7. **Keep page structure consistent.** All pages share the same header, nav, particle canvas, preloader, scroll progress, back-to-top, and footer structure.
8. **Use design tokens.** Never hardcode colors, shadows, radii, or transition values — always reference CSS custom properties.
9. **Images go in `assets/img/`.** Prefer lowercase filenames with hyphens for new assets.
10. **Lazy load images.** All `<img>` tags must include `loading="lazy"`.
11. **GitHub Pages only.** All features must be 100% static (HTML + CSS + JS). No server-side rendering, no APIs beyond Formspree.
12. **Custom cursor is desktop-only.** Wrapped in `@media (pointer: fine)` — do not break this.
