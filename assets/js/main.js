// ===== UTILITIES =====
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

// ===== YEAR =====
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== THEME =====
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
    particleFill = 'rgba(0,119,204,0.45)';
    particleLine = 'rgba(0,119,204,0.06)';
  } else {
    particleFill = 'rgba(56,189,248,0.55)';
    particleLine = 'rgba(124,58,237,0.07)';
  }
}
setParticleColors();

// ===== MOBILE NAV =====
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

// Close nav when a link is clicked
$$('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== REVEAL ON SCROLL =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal, .reveal-up, .reveal-down').forEach(el => io.observe(el));

// Tilt effect removed

// ===== RIPPLE =====
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

// ===== PROJECT FILTERING =====
const filterButtons = $$('[data-filter]');
const projects = $$('.project');

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => {
    b.classList.remove('active');
    b.classList.add('outline');
  });
  btn.classList.add('active');
  btn.classList.remove('outline');

  const tag = btn.dataset.filter;
  projects.forEach(p => {
    const show = tag === 'all' || (p.dataset.tags || '').includes(tag);
    p.style.display = show ? '' : 'none';
    if (show) {
      // micro-animate back in
      p.style.opacity = '0';
      p.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          p.style.transition = 'opacity .25s ease, transform .25s ease';
          p.style.opacity = '1';
          p.style.transform = 'none';
        });
      });
    }
  });
}));

// ===== CONTACT FORM (Formspree) =====
const form = $('#contactForm');
const statusEl = $('#formStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending…';
  statusEl.style.color = '';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      statusEl.textContent = '✅ Message sent! I\'ll get back to you soon.';
      statusEl.style.color = '#4ade80';
      form.reset();
    } else {
      statusEl.textContent = '❌ Something went wrong. Please try again.';
      statusEl.style.color = '#f87171';
    }
  } catch {
    statusEl.textContent = '⚠️ Network error. Please try again.';
    statusEl.style.color = '#fbbf24';
  }
});

// ===== TYPING ANIMATION (hero code block) =====
const codeTarget = $('pre code');
if (codeTarget) {
  const lines = [
    { text: 'hello, world!', delay: 0 },
    { text: 'profile = {', delay: 400 },
    { text: '  name: "Om Tiwari",', delay: 700 },
    { text: '  role: "CSE Student",', delay: 1000 },
    { text: '  stack: ["Python", "Django", "AWS"],', delay: 1300 },
    { text: '  open_to: "opportunities 🚀"', delay: 1600 },
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
          // Insert before cursor
          cursor.insertAdjacentText('beforebegin', text[i]);
          i++;
          setTimeout(typeChar, 30 + Math.random() * 20);
        } else {
          // newline after each line except last
          if (index < lines.length - 1) {
            cursor.insertAdjacentText('beforebegin', '\n');
          }
          typeLines(index + 1);
        }
      }
      typeChar();
    }, index === 0 ? delay + 600 : 0);
  }

  // Only run if hero is visible
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
  window.addEventListener('resize', resize);
  resize();

  function initParticles(n = 70) {
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 1.0 - 0.5),
      vy: (Math.random() * 1.0 - 0.5),
      r: Math.random() * 1.6 + 0.4,
    }));
  }
  initParticles();

  const LINK_DIST = 100;
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