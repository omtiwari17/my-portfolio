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
├── index.html               # Homepage — hero, skills, featured projects, experience
├── about.html               # About — bio, education timeline, certifications, values
├── projects.html            # Project gallery — 7 projects with filter controls
├── resume.html              # Interactive resume — 2-column layout + certifications
├── contact.html             # Contact form (Formspree AJAX) + social links
├── 404.html                 # Custom 404 error page with animated astronaut
└── assets/
    ├── css/
    │   └── style.css        # Global design system: tokens, reset, components, layouts, themes, responsive
    ├── js/
    │   └── main.js          # All interactivity: particles, theme toggle, nav, scroll reveal, filters, typing, form
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

---

## Page Details

### `index.html` — Homepage
- Hero section with gradient heading, bio, CTA buttons, social links, live stats
- Glass code block with typing animation (JSON profile)
- Skills grid (2-column)
- Featured projects (3-column cards)
- Experience timeline (Software Engineer Trainee, AWS Trainee)
- Footer with social icons

### `about.html` — About
- Bio narrative
- Education vertical timeline (B.Tech CSE at Medi-Caps University, 12th CBSE)
- Certifications grid (6 cards: AWS ×2, nasscom/IBM ×3, TCS CodeVita)
- Values section (Clean Code, User First, Always Learning)

### `projects.html` — Project Gallery
- Filter controls: All, Python, Web, AI, DevOps, Cloud
- 7 project cards with: image, description, feature bullets, tech pills, GitHub/Live links
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
- Animated floating astronaut SVG with orbit ring
- Glitch-effect 404 number with gradient animation
- Decorative code snippet
- Navigation buttons back to Home, Projects, Contact
- Quick links to About, Resume, GitHub

---

## Conventions & Coding Standards

### HTML
- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include ARIA attributes (`aria-label`, `aria-hidden`) on interactive/decorative elements
- Use inline SVGs for icons (not font icons)
- Every page must include: `<canvas id="bgParticles">`, site header, nav, main container, footer
- Font preconnect links must be in every `<head>`

### CSS
- All values must use design tokens (CSS variables) — never hardcode colors or sizes
- Light mode overrides go under `.light { }` selector
- Responsive breakpoints: `900px` (tablet), `700px` (cert grids), `600px` (mobile)
- Use `var(--t-fast)` and `var(--t-mid)` for transitions
- Page-specific styles use inline `<style>` blocks in the HTML `<head>` (not in global CSS)

### JavaScript
- Vanilla ES6+ only — no frameworks, no build step
- Use `$()` and `$$()` helpers defined at top of `main.js`
- All DOM-dependent code is safe (null-checked with `?.` and `if` guards)
- `main.js` is loaded with `defer` attribute

### File Naming
- HTML pages: lowercase, hyphen-separated (e.g., `about.html`, `contact.html`)
- Image assets: descriptive names, may contain spaces (legacy), prefer lowercase with hyphens for new files
- Single CSS file: `assets/css/style.css`
- Single JS file: `assets/js/main.js`

---

## Adding a New Page

1. Create `new-page.html` in the project root
2. Copy the `<head>` block from any existing page (update `<title>` and `<meta description>`)
3. Include the standard body structure:
   - `<canvas id="bgParticles">`
   - `<header class="site-header reveal-down">` with full nav
   - `<main class="container">`
   - `<footer class="site-footer reveal-up">` with social icons
4. Add the nav link to ALL existing pages' `<nav>` sections
5. Page-specific CSS goes in an inline `<style>` block in `<head>`
6. No additional JS files needed — `main.js` handles all shared interactivity

---

## Deployment

- **Platform:** GitHub Pages (auto-deployed from the `main` branch)
- **Custom Domain:** Configured via `CNAME` file → `omtiwari.tech`
- **No Build Step:** Push HTML/CSS/JS directly — GitHub Pages serves static files as-is
- **Testing Locally:** Open any `.html` file directly in a browser (or use a simple HTTP server like `python -m http.server`)

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

1. **No build tools.** Do not introduce npm, webpack, vite, or any build system unless explicitly asked.
2. **No frameworks.** Do not add React, Vue, Bootstrap, Tailwind, or jQuery unless explicitly asked.
3. **Preserve existing comments and docstrings** unless the change specifically requires modifying them.
4. **Test in both themes.** Any visual change must look correct in both dark mode (default) and light mode (`.light` class).
5. **Maintain responsive design.** Test at desktop (1100px+), tablet (900px), and mobile (600px) breakpoints.
6. **Keep page structure consistent.** All pages share the same header, nav, particle canvas, and footer structure.
7. **Use design tokens.** Never hardcode colors, shadows, radii, or transition values — always reference CSS custom properties.
8. **Images go in `assets/img/`.** Prefer lowercase filenames with hyphens for new assets.
