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
  setParticleColors();
});

function isLight() { return document.body.classList.contains('light'); }

let particleFill = 'rgba(56,189,248,0.55)';
let particleLine = 'rgba(124,58,237,0.07)';

function setParticleColors() {
  if (isLight()) {
    particleFill = 'rgba(2,132,199,0.45)';
    particleLine = 'rgba(2,132,199,0.06)';
  } else {
    particleFill = 'rgba(56,189,248,0.55)';
    particleLine = 'rgba(124,58,237,0.07)';
  }
}
setParticleColors();

// ===== MOBILE NAVIGATION TOGGLE =====
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle?.addEventListener('click', () => nav?.classList.toggle('open'));

// Close mobile nav when clicking a link
$$('.nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

// ===== REVEAL ON SCROLL (Optimized threshold & rootMargin) =====
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

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => {
    b.classList.remove('active');
    b.classList.add('outline');
  });
  btn.classList.add('active');
  btn.classList.remove('outline');
  filterProjects();
}));

searchInput?.addEventListener('input', filterProjects);
if (projects.length > 0) filterProjects();

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(msg) {
  let toast = $('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== COPY EMAIL TO CLIPBOARD =====
const copyBtn = $('#copyEmailBtn');
copyBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText('work.om.tiwari@gmail.com').then(() => {
    showToast('📋 Email copied to clipboard!');
  }).catch(() => {
    showToast('✉️ work.om.tiwari@gmail.com');
  });
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName : '';
  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);

  if (e.key === 'Escape') {
    if (isInput) {
      const currentInput = document.activeElement;
      if (currentInput.id === 'projectSearch') {
        currentInput.value = '';
        currentInput.dispatchEvent(new Event('input'));
      }
      currentInput.blur();
    } else {
      nav?.classList.remove('open');
    }
    return;
  }

  if (isInput) return;

  if (e.key.toLowerCase() === 't') {
    themeToggle?.click();
  } else if (e.key === '/') {
    const sInput = $('#projectSearch');
    if (sInput) {
      e.preventDefault();
      sInput.focus();
      sInput.select();
    }
  }
});

// ===== CONTACT FORM (Formspree AJAX) =====
const form = $('#contactForm');
const statusEl = $('#formStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (statusEl) {
    statusEl.textContent = 'Sending…';
    statusEl.style.color = 'var(--muted)';
  }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      if (statusEl) {
        statusEl.textContent = '✅ Message sent! I\'ll get back to you soon.';
        statusEl.style.color = '#34d399';
      }
      form.reset();
    } else {
      if (statusEl) {
        statusEl.textContent = '❌ Something went wrong. Please try again.';
        statusEl.style.color = '#f87171';
      }
    }
  } catch {
    if (statusEl) {
      statusEl.textContent = '⚠️ Network error. Please try again.';
      statusEl.style.color = '#fbbf24';
    }
  }
});

// ===== TYPING ANIMATION (Hero IDE Window) =====
const codeTarget = $('pre code');
if (codeTarget) {
  const lines = [
    { text: 'hello, world!', delay: 0 },
    { text: 'profile = {', delay: 400 },
    { text: '  name: "Om Tiwari",', delay: 700 },
    { text: '  role: "CS Graduate",', delay: 1000 },
    { text: '  stack: ["Python", "Django", "AWS"],', delay: 1300 },
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

// ===== BACKGROUND PARTICLES =====
const canvas = $('#bgParticles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function initParticles(n = 60) {
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 0.8 - 0.4),
      vy: (Math.random() * 0.8 - 0.4),
      r: Math.random() * 1.5 + 0.4,
    }));
  }
  initParticles();

  const LINK_DIST = 90;
  const LINK_DIST2 = LINK_DIST * LINK_DIST;

  function step() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width)  p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = particleFill;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST2) {
          const alpha = 1 - d2 / LINK_DIST2;
          ctx.strokeStyle = particleLine.replace('0.07', (0.07 * alpha).toFixed(3));
          ctx.lineWidth = 1;
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

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = $('#preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('loaded'), 250);
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
  }
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = $('#scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });
}

// ===== BACK TO TOP =====
const backToTop = $('#backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 350);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ANIMATED STAT COUNTER =====
const statNumbers = $$('[data-count]');
if (statNumbers.length) {
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const ratio = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - ratio, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (ratio < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIo.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => counterIo.observe(el));
}

// ===== CUSTOM CURSOR =====
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }, { passive: true });

  function followCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(followCursor);
  }
  requestAnimationFrame(followCursor);

  const hoverTargets = 'a, button, input, textarea, .btn, .icon, .card, .nav a, .pill, [data-filter]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hover');
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hover');
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// ===== DYNAMIC CARD SPOTLIGHT MOUSE TRACKING (rAF Throttled for 120 FPS Scroll) =====
let cardRafPending = false;
let activeCard = null;
let cardMouseEvt = null;

document.addEventListener('mousemove', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  activeCard = card;
  cardMouseEvt = e;

  if (!cardRafPending) {
    cardRafPending = true;
    requestAnimationFrame(() => {
      if (activeCard && cardMouseEvt) {
        const rect = activeCard.getBoundingClientRect();
        const x = cardMouseEvt.clientX - rect.left;
        const y = cardMouseEvt.clientY - rect.top;
        activeCard.style.setProperty('--mouse-x', `${x}px`);
        activeCard.style.setProperty('--mouse-y', `${y}px`);
      }
      cardRafPending = false;
    });
  }
}, { passive: true });