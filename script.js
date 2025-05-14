document.addEventListener('DOMContentLoaded', function () {
  // Menu toggle
  window.toggleMenu = function () {
    const menu = document.getElementById('overlayMenu');
    menu.classList.toggle('show');
  };

  // Fade-in observer
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  faders.forEach(el => observer.observe(el));
});
