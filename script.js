document.addEventListener('DOMContentLoaded', function () {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active');
    overlay.classList.toggle('show');
    document.body.style.overflow = overlay.classList.contains('show') ? 'hidden' : '';
  });
// === FIX: Force visible if already in viewport on load ===
document.querySelectorAll('.fade-in-section').forEach(section => {
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    section.classList.add('is-visible');
  }
});

  // Close overlay when link is clicked
  document.querySelectorAll('.overlay-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

 // === SCROLL FADE-IN ANIMATION (UPGRADED) ===
const fadeInObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // stop observing once it's shown
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Apply to all .fade-in-section elements — including sections and info cards
document.querySelectorAll('.fade-in-section').forEach(element => {
  fadeInObserver.observe(element);
});

// Fallback: reveal all after 5 seconds if not triggered
setTimeout(() => {
  document.querySelectorAll('.fade-in-section').forEach(section => {
    if (!section.classList.contains('is-visible')) {
      section.classList.add('is-visible');
    }
  });
}, 5000);
});
// === FIX: Instantly show any .fade-in-section already visible on load ===
document.querySelectorAll('.fade-in-section').forEach(section => {
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    section.classList.add('is-visible');
  }
});

function initHeartCanvas() {
  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, trails = [], heartPath = [];
  const v = 32;
  const M = Math, R = M.random, C = M.cos, Y = 6.3;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    width = canvas.width;
    height = canvas.height
    trails = [];
    heartPath = [];

    for (let i = 0; i < Y; i += 0.2) {
      heartPath.push([
        width / 2 + 180 * M.pow(M.sin(i), 3) * (width / 1000),
        height / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))) * (height / 600)
      ]);
    }

    for (let i = 0; i < v; i++) {
      const x = R() * width;
      const y = R() * height;
      const H = i / v * 80 + 280;
      const S = R() * 40 + 60;
      const B = R() * 60 + 20;
      const f = [];

      for (let k = 0; k < v; k++) {
        f[k] = {
          x, y,
          X: 0, Y: 0,
          R: (1 - k / v) + 1,
          S: R() + 1,
          q: ~~(R() * v),
          D: i % 2 * 2 - 1,
          F: R() * 0.2 + 0.7,
          f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`
        };
      }
      trails[i] = f;
    }
  }

  function render(p) {
    ctx.fillStyle = p.f;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.R, 0, Y);
    ctx.fill();
  }

  function loop() {
    ctx.fillStyle = "rgba(0,0,0,.2)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < v; i++) {
      const f = trails[i];
      const u = f[0];
      const q = heartPath[u.q];
      const dx = u.x - q[0], dy = u.y - q[1];
      const dist = M.sqrt(dx * dx + dy * dy);

      if (dist < 10) {
        if (R() > 0.95) {
          u.q = ~~(R() * v);
        } else {
          if (R() > 0.99) u.D *= -1;
          u.q = (u.q + u.D + v) % v;
        }
      }

      u.X += -dx / dist * u.S;
      u.Y += -dy / dist * u.S;
      u.x += u.X;
      u.y += u.Y;
      render(u);
      u.X *= u.F;
      u.Y *= u.F;

      for (let k = 1; k < v; k++) {
        const T = f[k - 1];
        const N = f[k];
        N.x -= (N.x - T.x) * 0.7;
        N.y -= (N.y - T.y) * 0.7;
        render(N);
      }
    }

    requestAnimationFrame(loop);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  loop();
}

// Run once, after page fully loads
document.addEventListener('DOMContentLoaded', () => {
  initHeartCanvas();
});
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
          includeHTML(); // run again for nested includes
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

includeHTML(); // call it when the page loads
