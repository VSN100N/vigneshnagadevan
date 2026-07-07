/* =========================================================
   VIGNESH N — Portfolio Interactive JavaScript
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypingAnimation();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initSmoothScroll();
  initActiveNavHighlight();
  initTiltEffect();
});
/* =========================================================
   1. PARTICLE SYSTEM
   ========================================================= */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const PARTICLE_COUNT = 60;
  const CONNECTION_DISTANCE = 140;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }
  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      // Bounce
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      // Mouse repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.02;
        p.vx += dx * force;
        p.vy += dy * force;
      }
      // Damping
      p.vx *= 0.999;
      p.vy *= 0.999;
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(220, 70%, 70%, ${p.opacity})`;
      ctx.fill();
      // Connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const ddx = p.x - p2.x;
        const ddy = p.y - p2.y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(220, 60%, 60%, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animate);
  }
  resize();
  createParticles();
  animate();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}
/* =========================================================
   2. TYPING ANIMATION
   ========================================================= */
function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const phrases = [
    'MBA Student',
    'Business Analyst',
    'Data Enthusiast',
    'Finance Professional',
    'Team Leader',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 80;
  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 80;
    }
    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }
    setTimeout(type, speed);
  }
  type();
}
/* =========================================================
   3. NAVBAR
   ========================================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}
/* =========================================================
   4. SCROLL REVEAL
   ========================================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });
  reveals.forEach(el => observer.observe(el));
}
/* =========================================================
   5. SKILL BARS ANIMATION
   ========================================================= */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => observer.observe(bar));
}
/* =========================================================
   6. COUNTER ANIMATION
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.ceil(current);
  }, 40);
}
/* =========================================================
   7. SMOOTH SCROLL
   ========================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
/* =========================================================
   8. ACTIVE NAV HIGHLIGHT
   ========================================================= */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-72px 0px -50% 0px'
  });
  sections.forEach(section => observer.observe(section));
}
/* =========================================================
   9. TILT EFFECT (Cards & Image)
   ========================================================= */
function initTiltEffect() {
  const heroImage = document.querySelector('.hero-image-container');
  if (!heroImage) return;
  heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;
    heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    heroImage.style.transition = 'transform 0.5s ease';
  });
  heroImage.addEventListener('mouseenter', () => {
    heroImage.style.transition = 'none';
  });
}
/* =========================================================
   10. LIGHTBOX
   ========================================================= */
function openLightbox(element) {
  const img = element.querySelector('img');
  if (!img) return;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
/* =========================================================
   11. CONTACT FORM HANDLER
   ========================================================= */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const message = document.getElementById('formMessage').value;
  // Create mailto link
  const mailtoLink = `mailto:vignesh.n2107@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.open(mailtoLink, '_blank');
  // Show success feedback
  const btn = e.target.querySelector('.form-submit');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    Message Sent!
  `;
  btn.style.background = 'linear-gradient(135deg, hsl(145, 70%, 45%), hsl(160, 75%, 40%))';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
/* =========================================================
   12. PARALLAX ON SCROLL (Subtle)
   ========================================================= */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  // Parallax for orbs
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = (i + 1) * 0.02;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
/* Make lightbox functions globally available */
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.handleFormSubmit = handleFormSubmit;