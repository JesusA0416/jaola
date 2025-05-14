document.addEventListener('DOMContentLoaded', function () {
  // Toggle menu
  window.toggleMenu = function () {
    const menu = document.getElementById('overlayMenu');
    menu.classList.toggle('show');
  };

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  faders.forEach(el => observer.observe(el));
});
