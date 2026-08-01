// ===== UTILITIES =====
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

// ===== YEAR =====
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== ACTIVE NAVIGATION LINK =====
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
$$('.nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.style.color = 'var(--heading)';
    link.style.background = 'rgba(255, 255, 255, 0.08)';
    link.style.fontWeight = '600';
  }
});

// ===== THEME TOGGLE & PERSISTENCE =====
const themeToggle = $('#themeToggle');

function applyTheme() {
  const saved = localStorage.getItem('theme');
  document.body.classList.toggle('light', saved === 'light');
}

if (!localStorage.getItem('theme')) {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  localStorage.setItem('theme', prefersLight ? 'light' : 'dark');
}

applyTheme();

themeToggle?.addEventListener('click', () => {
  const next = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme();
});

function isLight() { return document.body.classList.contains('light'); }

// ===== MOBILE NAVIGATION TOGGLE =====
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle?.addEventListener('click', () => nav?.classList.toggle('open'));

// Close mobile nav when clicking a link
$$('.nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

// ===== REVEAL ON SCROLL =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

$$('.reveal, .reveal-up, .reveal-down').forEach(el => io.observe(el));

// ===== BUTTON RIPPLE EFFECT =====
$$('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-el';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
    `;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// ===== PROJECT SEARCH & FILTER =====
const searchInput = $('#projectSearch');
const projectCountEl = $('#projectCount');
const filterButtons = $$('[data-filter]');
const projects = $$('.project');

function filterProjects() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const activeBtn = $('.filters .btn.active');
  const tag = activeBtn ? activeBtn.dataset.filter : 'all';

  let visibleCount = 0;
  projects.forEach(p => {
    const tags = (p.dataset.tags || '').toLowerCase();
    const text = p.textContent.toLowerCase();
    const showTag = tag === 'all' || tags.includes(tag);
    const showQuery = !query || text.includes(query);

    const show = showTag && showQuery;
    p.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  if (projectCountEl) {
    projectCountEl.textContent = `Showing ${visibleCount} of ${projects.length} Projects`;
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects();
  });
});

searchInput?.addEventListener('input', filterProjects);

// ===== GLOBAL KEYBOARD SHORTCUTS MANAGER =====
document.addEventListener('keydown', (e) => {
  const activeEl = document.activeElement;
  const isInput = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);

  // ESCAPE Key (Works everywhere)
  if (e.key === 'Escape') {
    if (isInput) {
      if (activeEl.id === 'projectSearch') {
        activeEl.value = '';
        filterProjects();
      }
      activeEl.blur();
    } else {
      const mobileNav = $('#nav');
      if (mobileNav?.classList.contains('open')) {
        mobileNav.classList.remove('open');
      }
    }
    return;
  }

  // Do not trigger page/theme shortcuts while typing inside inputs
  if (isInput) return;

  const key = e.key ? e.key.toLowerCase() : '';

  // Keyboard Shortcut Help (?, Shift+/, or / on pages without search input)
  const isSlashOrQuestion = e.key === '?' || e.key === '/' || e.code === 'Slash';
  const searchEl = $('#projectSearch');

  if (isSlashOrQuestion) {
    if (e.key === '?' || e.shiftKey || !searchEl) {
      e.preventDefault();
      showToast('⌨️ Shortcuts: T (Theme), / (Search), Esc (Close), H/A/P/R/C (Pages)');
      return;
    } else if (searchEl && !e.shiftKey) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
      showToast('🔍 Search focused (Press Esc to exit)');
      return;
    }
  }

  // T: Toggle Theme
  if (key === 't') {
    const themeBtn = $('#themeToggle');
    if (themeBtn) {
      themeBtn.click();
      const currentTheme = isLight() ? 'Light Mode' : 'Dark Mode';
      showToast(`🌓 Switched to ${currentTheme}`);
    }
    return;
  }

  // Page Navigation Shortcuts
  if (key === 'h' && !window.location.pathname.endsWith('index.html')) { window.location.href = 'index.html'; }
  else if (key === 'a' && !window.location.pathname.endsWith('about.html')) { window.location.href = 'about.html'; }
  else if (key === 'p' && !window.location.pathname.endsWith('projects.html')) { window.location.href = 'projects.html'; }
  else if (key === 'r' && !window.location.pathname.endsWith('resume.html')) { window.location.href = 'resume.html'; }
  else if (key === 'c' && !window.location.pathname.endsWith('contact.html')) { window.location.href = 'contact.html'; }
});

// Click handler for shortcut badge button (For non-tech users / touch devices)
document.addEventListener('click', (e) => {
  const badgeBtn = e.target.closest('.shortcut-badge-btn, #shortcutHelpBtn');
  if (badgeBtn) {
    showToast('⌨️ Shortcuts: T (Theme), / (Search), Esc (Close), H/A/P/R/C (Pages)');
  }
});

// ===== FORMSPREE AJAX SUBMISSION =====
const contactForm = $('#contactForm');
const formStatus = $('#formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const data = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.style.color = '#34d399';
          formStatus.textContent = '✓ Message sent successfully! I will reply soon.';
        }
        contactForm.reset();
        showToast('Message sent successfully!');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (formStatus) {
        formStatus.style.color = '#f87171';
        formStatus.textContent = '✕ Error sending message. Please try again.';
      }
      showToast('Failed to send message.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  let toast = $('#toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== COPY EMAIL UTILITY =====
const copyEmailBtn = $('#copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const email = 'work.om.tiwari@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast('Email: work.om.tiwari@gmail.com');
    });
  });
}

// ===== CARD SPOTLIGHT MOUSE TRACKING =====
const cards = $$('.card');
let isTrackingSpotlight = false;

window.addEventListener('mousemove', (e) => {
  if (isTrackingSpotlight) return;
  isTrackingSpotlight = true;

  requestAnimationFrame(() => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
    isTrackingSpotlight = false;
  });
}, { passive: true });

// ===== TYPING ANIMATION (profile.py) =====
const codeTarget = $('.code-block code');
if (codeTarget) {
  const lines = [
    { text: 'hello world!', delay: 200 },
    { text: 'profile = {', delay: 700 },
    { text: '  name: "Om Tiwari",', delay: 1000 },
    { text: '  role: "CS Graduate",', delay: 1200 },
    { text: '  stack: ["Python", "Django", "AWS"],', delay: 1400 },
    { text: '  status: "available for roles 🚀"', delay: 1600 },
    { text: '}', delay: 1900 },
  ];

  codeTarget.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  codeTarget.appendChild(cursor);

  function typeLines(index = 0) {
    if (index >= lines.length) return;
    const { text, delay } = lines[index];
    setTimeout(() => {
      let i = 0;
      function typeChar() {
        if (i < text.length) {
          cursor.insertAdjacentText('beforebegin', text[i]);
          i++;
          setTimeout(typeChar, 30 + Math.random() * 20);
        } else {
          if (index < lines.length - 1) {
            cursor.insertAdjacentText('beforebegin', '\n');
          }
          typeLines(index + 1);
        }
      }
      typeChar();
    }, index === 0 ? delay + 500 : 0);
  }

  const heroSection = $('.hero');
  if (heroSection) {
    const heroIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeLines();
        heroIo.disconnect();
      }
    }, { threshold: 0.3 });
    heroIo.observe(heroSection);
  } else {
    typeLines();
  }
}

// ===== MULTI-COLOR FLOATING PARTICLES & MOUSE CONNECTIONS =====
const canvas = $('#bgParticles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles;
  let mouse = { x: -1000, y: -1000 };

  const updateTouch = (e) => {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  };

  const resetTouch = () => {
    mouse.x = -1000;
    mouse.y = -1000;
  };

  window.addEventListener('touchstart', updateTouch, { passive: true });
  window.addEventListener('touchmove', updateTouch, { passive: true });
  window.addEventListener('touchend', resetTouch, { passive: true });
  window.addEventListener('touchcancel', resetTouch, { passive: true });
  window.addEventListener('mouseleave', resetTouch, { passive: true });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }
  window.addEventListener('resize', resize, { passive: true });

  const colors = [
    { r: 56,  g: 189, b: 248 }, // Cyan
    { r: 129, g: 140, b: 248 }, // Indigo
    { r: 192, g: 132, b: 252 }, // Violet
    { r: 244, g: 114, b: 182 }  // Pink
  ];

  function initParticles() {
    const isMobile = width < 600;
    const n = isMobile ? 35 : 75;
    particles = Array.from({ length: n }, () => {
      const col = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 0.7 - 0.35),
        vy: (Math.random() * 0.7 - 0.35),
        r: Math.random() * 2 + 1,
        color: col
      };
    });
  }
  resize();

  const LINK_DIST = 115;
  const LINK_DIST2 = LINK_DIST * LINK_DIST;
  const MOUSE_DIST = 145;
  const MOUSE_DIST2 = MOUSE_DIST * MOUSE_DIST;

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width)  p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw floating particle dot
      const isLightMode = isLight();
      const dotAlpha = isLightMode ? 0.65 : 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${dotAlpha})`;
      ctx.fill();

      // Connect particles to mouse cursor with glowing line
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < MOUSE_DIST2) {
        const mAlpha = (1 - md2 / MOUSE_DIST2) * 0.45;
        ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${mAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      // Connect to neighboring particles with color-mixed line
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST2) {
          const alpha = (1 - d2 / LINK_DIST2) * (isLightMode ? 0.16 : 0.24);
          const mr = Math.round((p.color.r + q.color.r) / 2);
          const mg = Math.round((p.color.g + q.color.g) / 2);
          const mb = Math.round((p.color.b + q.color.b) / 2);

          ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ===== PRELOADER & SCROLL PROGRESS & BACK TO TOP =====
window.addEventListener('load', () => {
  const preloader = $('#preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('loaded'), 200);
    setTimeout(() => { preloader.style.display = 'none'; }, 700);
  }
});

const scrollProgress = $('#scrollProgress');
const backToTop = $('#backToTop');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const current = window.scrollY;
  const pct = total > 0 ? (current / total) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${pct}%`;

  if (backToTop) {
    if (current > 350) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== STAT COUNTERS =====
const counters = $$('[data-count]');
if (counters.length) {
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(ease * target);
          el.textContent = `${current}${suffix}`;
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = `${target}${suffix}`;
        }

        requestAnimationFrame(update);
        countIo.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countIo.observe(c));
}

// ===== CUSTOM CURSOR (Dynamic Creation & Event Delegation) =====
if (window.matchMedia('(pointer: fine)').matches) {
  let dot = $('.cursor-dot');
  let ring = $('.cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
  }
  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
  }

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = `${mx}px`;
    dot.style.top = `${my}px`;
  }, { passive: true });

  function followCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(followCursor);
  }
  requestAnimationFrame(followCursor);

  const hoverTargets = 'a, button, input, textarea, select, .btn, .icon, .card, .nav a, .pill, [data-filter]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hover');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}