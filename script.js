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
      const mobileNav = document.getElementById('mobile-nav');
      const hamburgerIcon = document.getElementById('hamburger-menu');
      const body = document.body;
      mobileNav.classList.toggle('active');
      hamburgerIcon.classList.toggle('is-active');
      body.classList.toggle('no-scroll', mobileNav.classList.contains('active'));
    }

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobile-nav').classList.remove('active');
        document.getElementById('hamburger-menu').classList.remove('is-active');
        document.body.classList.remove('no-scroll');
      });
    });

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
>>>>>>> 8a2d8e0efcb384ca7423cbeea4c5559f11b30a16
