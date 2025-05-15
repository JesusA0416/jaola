document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');

  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('is-active');
    overlay.classList.toggle('show');

    // Lock body scroll
    document.body.style.overflow = overlay.classList.contains('show') ? 'hidden' : '';
  }

  // Open/close on hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close menu on link click
  document.querySelectorAll('.overlay-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

  // Close menu if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // === Fade-in Scroll Observer ===
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
});
// === FADE-IN LOGIC ===
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Automatically fade in all <section> tags
document.querySelectorAll('section').forEach(el => {
  el.classList.add('fade-in-section');
  observer.observe(el);
});

// Also apply to optional divs (like .info-card if you want them to animate)
document.querySelectorAll('.info-card').forEach(el => {
  el.classList.add('fade-in-section');
  observer.observe(el);
});
