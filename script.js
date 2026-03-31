// ── PAGE LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hidden');
  }, 1800);
});



// ── SCROLL-TRIGGERED NAV ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  const btt = document.getElementById('backToTop');
  btt.classList.toggle('visible', window.scrollY > 600);
});

// ── BACK TO TOP ──
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── MENU FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.opacity = '0.2';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }
    });
  });
});

// ── PARALLAX ON HERO SHAPES ──
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  if (shapes[0]) shapes[0].style.transform = `translate(${s * 0.02}px, ${s * 0.04}px)`;
  if (shapes[1]) shapes[1].style.transform = `translate(${-s * 0.03}px, ${s * 0.02}px)`;
  if (shapes[2]) shapes[2].style.transform = `translate(${s * 0.01}px, ${-s * 0.03}px)`;
});

// ── SMOOTH NAV ACTIVE STATE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 200;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--caramel)';
    }
  });
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Message sent! ✓';
  btn.style.background = '#4a7c4e';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ── TILT EFFECT ON COFFEE CARD ──
const coffeeCard = document.querySelector('.coffee-card-big');
if (coffeeCard) {
  coffeeCard.addEventListener('mousemove', e => {
    const rect = coffeeCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    coffeeCard.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  coffeeCard.addEventListener('mouseleave', () => {
    coffeeCard.style.transform = '';
  });
}

// ── COUNTER ANIMATION FOR STATS ──
function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
  }, 30);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const strong = entry.target.querySelector('strong');
      const text = strong.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) {
        strong.dataset.suffix = text.replace(/\d+/, '');
        animateCounter(strong, num);
      }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-pill').forEach(pill => statObserver.observe(pill));
