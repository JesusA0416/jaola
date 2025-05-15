document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');

  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle('is-active');
    overlay.classList.toggle('show');
    
    // Prevent scrolling when menu is open
    if (overlay.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking on menu links
  document.querySelectorAll('.overlay-menu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
  
  // Close menu when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && overlay.classList.contains('show')) {
      toggleMenu();
    }
  });
});