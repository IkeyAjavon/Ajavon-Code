/* =========================================================
   RETRO 8-BIT ABOUT ME — JAVASCRIPT
   ========================================================= */

// ---------- BOOT SCREEN ----------
function bootUp() {
  const boot = document.getElementById('boot-screen');
  const site = document.getElementById('main-site');

  boot.style.transition = 'opacity 0.4s';
  boot.style.opacity = '0';

  setTimeout(() => {
    boot.style.display = 'none';
    site.classList.remove('hidden');
    startScoreCounter();
    animateStatBars();
  }, 400);
}

// ---------- SCORE COUNTER ----------
function startScoreCounter() {
  const scoreEl = document.getElementById('score');
  let score = 0;
  const target = Math.floor(Math.random() * 900000) + 10000;
  const step = Math.ceil(target / 60);

  const ticker = setInterval(() => {
    score = Math.min(score + step, target);
    scoreEl.textContent = String(score).padStart(6, '0');
    if (score >= target) clearInterval(ticker);
  }, 30);

  // Keep ticking slowly after boot
  setTimeout(() => {
    setInterval(() => {
      const el = document.getElementById('score');
      const cur = parseInt(el.textContent, 10);
      el.textContent = String(cur + Math.floor(Math.random() * 5)).padStart(6, '0');
    }, 3000);
  }, 2000);
}

// ---------- STAT BARS ANIMATE IN ----------
function animateStatBars() {
  const fills = document.querySelectorAll('.stat-fill');
  fills.forEach(f => {
    const target = f.style.width;
    f.style.width = '0';
    setTimeout(() => { f.style.width = target; }, 200);
  });
}

// ---------- GALLERY LIGHTBOX ----------
const photoPaths = [
  'https://picsum.photos/seed/ajavon1/400/400',
  'https://picsum.photos/seed/ajavon2/400/400',
  'https://picsum.photos/seed/ajavon3/400/400',
  'https://picsum.photos/seed/ajavon4/400/400',
  'https://picsum.photos/seed/ajavon5/400/400',
  'https://picsum.photos/seed/ajavon6/400/400',
  'https://picsum.photos/seed/ajavon7/400/400',
  'https://picsum.photos/seed/ajavon8/400/400',
];

let currentPhoto = 0;

function openLightbox(index) {
  currentPhoto = index;
  renderLightboxPhoto();
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function changePhoto(dir) {
  currentPhoto = (currentPhoto + dir + photoPaths.length) % photoPaths.length;
  renderLightboxPhoto();
}

function renderLightboxPhoto() {
  const img = document.getElementById('lb-img');
  const placeholder = document.getElementById('lb-placeholder');
  const label = document.getElementById('lb-label');

  label.textContent = `MEM SLOT ${currentPhoto + 1}`;

  img.style.display = 'block';
  placeholder.classList.add('hidden');

  img.onerror = () => {
    img.style.display = 'none';
    placeholder.classList.remove('hidden');
  };
  img.src = photoPaths[currentPhoto];
}

// Close lightbox with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  changePhoto(-1);
  if (e.key === 'ArrowRight') changePhoto(1);
});

// ---------- CONTACT FORM ----------
function submitForm(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.classList.remove('hidden');
  e.target.reset();

  // Bump score
  const scoreEl = document.getElementById('score');
  const cur = parseInt(scoreEl.textContent, 10);
  scoreEl.textContent = String(cur + 1000).padStart(6, '0');

  setTimeout(() => success.classList.add('hidden'), 5000);
}

// ---------- SECTION SNAP NAV ----------
const sectionOrder = ['hero', 'bio', 'gallery', 'work', 'contact'];

function getCurrentSectionIndex() {
  const scrollMid = window.scrollY + window.innerHeight / 2;
  let closest = 0;
  let closestDist = Infinity;
  sectionOrder.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const dist = Math.abs(el.offsetTop + el.offsetHeight / 2 - scrollMid);
    if (dist < closestDist) { closestDist = dist; closest = i; }
  });
  return closest;
}

function navigateSection(dir) {
  const current = getCurrentSectionIndex();
  const next = Math.max(0, Math.min(sectionOrder.length - 1, current + dir));
  const el = document.getElementById(sectionOrder[next]);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------- FOOTER YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- SCROLL HIGHLIGHT NAV ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.pixel-nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.background = '';
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.background = 'var(--green)';
      link.style.color = 'var(--black)';
    }
  });
});
