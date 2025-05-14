document.addEventListener('DOMContentLoaded', function () {
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
