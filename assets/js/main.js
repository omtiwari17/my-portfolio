
// ===== Utilities =====
const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));

// Year
const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme
const themeToggle = $('#themeToggle');
function applyTheme() {
  const saved = localStorage.getItem('theme');
  document.body.classList.toggle('light', saved === 'light');
}

if (!localStorage.getItem('theme')){
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  localStorage.setItem('theme', prefersLight ? 'light' : 'dark');
}

applyTheme();
themeToggle?.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme();
  setParticleColors(); // <-- add this
});

function currentThemeIsLight(){ return document.body.classList.contains('light'); }

let particleFill = 'rgba(56,189,248,0.6)';   // default for dark
let particleLine = 'rgba(124,58,237,0.08)';

function setParticleColors(){
  if (currentThemeIsLight()){
    particleFill = 'rgba(37,99,235,0.55)';   // deeper blue dots on light bg
    particleLine = 'rgba(37,99,235,0.08)';   // subtle lines
  } else {
    particleFill = 'rgba(56,189,248,0.6)';   // cyan-ish for dark bg
    particleLine = 'rgba(124,58,237,0.08)';  // soft purple lines
  }
}
setParticleColors();

// Mobile nav
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

// Skill meters: removed — using static skill cards now

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
},{threshold: 0.15});
$$('.reveal, .reveal-up, .reveal-down').forEach(el => io.observe(el));

// Tilt effect
function makeTilt(el){
  const rect = () => el.getBoundingClientRect();
  let raf = null;
  function onMove(e){
    const r = rect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = (e.clientX - cx) / (r.width/2);
    const dy = (e.clientY - cy) / (r.height/2);
    const rx = Math.max(Math.min(dy * -6, 6), -6);
    const ry = Math.max(Math.min(dx * 6, 6), -6);
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=>{
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
  }
  function reset(){ el.style.transform = ''; }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
}
$$('.tilt').forEach(makeTilt);

// Buttons ripple
$$('.btn').forEach(btn => {
  btn.classList.add('ripple');
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-el';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2)+'px';
    ripple.style.top = (e.clientY - rect.top - size/2)+'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', ()=>ripple.remove());
  });
});

// Project filtering
const filterButtons = $$('[data-filter]');
const projects = $$('.project');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active', 'outline'));
  btn.classList.add('active'); filterButtons.forEach(b => { if(b!==btn) b.classList.add('outline'); });
  const tag = btn.dataset.filter;
  projects.forEach(p => {
    const tags = p.dataset.tags || '';
    p.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
  });
}));

// Contact form (Formspree)
const form = $('#contactForm'); 
const statusEl = $('#formStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusEl.textContent = "✅ Thank you! Your message has been sent successfully.";
      statusEl.style.color = "limegreen";
      form.reset();
    } else {
      statusEl.textContent = "❌ Oops! Something went wrong. Please try again.";
      statusEl.style.color = "red";
    }
  } catch (err) {
    statusEl.textContent = "⚠️ Network error. Please try again.";
    statusEl.style.color = "red";
  }

});

// Background particles (canvas)
const canvas = $('#bgParticles');
const ctx = canvas.getContext('2d');
let width, height, particles;
function resize(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize); resize();

function initParticles(n=80){
  particles = new Array(n).fill(0).map(()=> ({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()*1.2 - 0.6),
    vy: (Math.random()*1.2 - 0.6),
    r: Math.random()*1.8 + .4,
  }));
}
initParticles();

function step(){
  ctx.clearRect(0,0,width,height);
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x<0||p.x>width) p.vx*=-1;
    if (p.y<0||p.y>height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = particleFill;
    ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q = particles[j];
      const dx = p.x-q.x, dy = p.y-q.y;
      const d2 = dx*dx+dy*dy;
      if (d2 < 110*110){
        ctx.strokeStyle = particleLine;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(q.x,q.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);
