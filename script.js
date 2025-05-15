document.addEventListener('DOMContentLoaded', function () {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlayMenu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active');
    overlay.classList.toggle('show');
    document.body.style.overflow = overlay.classList.contains('show') ? 'hidden' : '';
  });

  // Close overlay when link is clicked
  document.querySelectorAll('.overlay-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

  // === SCROLL FADE-IN ANIMATION ===
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Automatically apply fade-in to all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });

  // Optional: animate info-cards individually
  document.querySelectorAll('.info-card').forEach(card => {
    card.classList.add('fade-in-section');
    observer.observe(card);
  });
});
const canvas = document.getElementById('heartCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const O = canvas.width;
  const Q = canvas.height;
  const M = Math;
  const R = M.random;
  const C = M.cos;
  const Y = 6.3;
  const v = 32;

  let h = [], e = [];

  for (let i = 0; i < Y; i += 0.2) {
    h.push([
      O / 2 + 180 * M.pow(M.sin(i), 3),
      Q / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
    ]);
  }

  for (let i = 0; i < v; i++) {
    let x = R() * O;
    let y = R() * Q;
    let H = i / v * 80 + 280;
    let S = R() * 40 + 60;
    let B = R() * 60 + 20;
    let f = [];

    for (let k = 0; k < v; k++) {
      f[k] = {
        x: x,
        y: y,
        X: 0,
        Y: 0,
        R: (1 - k / v) + 1,
        S: R() + 1,
        q: ~~(R() * v),
        D: i % 2 * 2 - 1,
        F: R() * .2 + .7,
        f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`
      };
    }
    e[i] = f;
  }

  function render(_) {
    ctx.fillStyle = _.f;
    ctx.beginPath();
    ctx.arc(_.x, _.y, _.R, 0, Y, 1);
    ctx.closePath();
    ctx.fill();
  }

  function loop() {
    ctx.fillStyle = "rgba(0,0,0,.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < v; i++) {
      const f = e[i];
      const u = f[0];
      const q = h[u.q];
      const D = u.x - q[0];
      const E = u.y - q[1];
      const G = M.sqrt(D * D + E * E);

      if (G < 10) {
        if (R() > .95) {
          u.q = ~~(R() * v);
        } else {
          if (R() > .99) u.D *= -1;
          u.q += u.D;
          u.q %= v;
          if (u.q < 0) u.q += v;
        }
      }

      u.X += -D / G * u.S;
      u.Y += -E / G * u.S;
      u.x += u.X;
      u.y += u.Y;
      render(u);
      u.X *= u.F;
      u.Y *= u.F;

      for (let k = 0; k < v - 1; k++) {
        const T = f[k];
        const N = f[k + 1];
        N.x -= (N.x - T.x) * .7;
        N.y -= (N.y - T.y) * .7;
        render(N);
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}
