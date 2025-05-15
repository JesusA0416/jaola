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
const c = document.getElementById('heartCanvas');
const a = c.getContext('2d');
let e = [], h = [];
let O = c.width;
let Q = c.height;

let v = 32, M = Math, R = M.random, C = M.cos, Y = 6.3;
for (let i = 0; i < Y; i += .2) {
  h.push([
    O / 2 + 180 * M.pow(M.sin(i), 3),
    Q / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
  ]);
}

for (let i = 0; i < v; i++) {
  let f = [], x = R() * O, y = R() * Q, H = i / v * 80 + 280, S = R() * 40 + 60, B = R() * 60 + 20;
  for (let k = 0; k < v; k++) {
    f[k] = {
      x: x, y: y, X: 0, Y: 0,
      R: (1 - k / v) * 4 + 2,
      S: R() + 1,
      q: ~~(R() * v),
      D: i % 2 * 2 - 1,
      F: R() * .2 + .7,
      f: `hsla(${~~H},${~~S}%,${~~B}%,.1)`
    };
  }
  e[i] = f;
}

function render(p) {
  a.fillStyle = p.f;
  a.beginPath();
  a.arc(p.x, p.y, p.R, 0, Y, 1);
  a.closePath();
  a.fill();
}

function loop() {
  a.fillStyle = "rgba(0,0,0,.2)";
  a.fillRect(0, 0, O, Q);

  for (let i = v; i--;) {
    let f = e[i], u = f[0], q = h[u.q], D = u.x - q[0], E = u.y - q[1];
    let G = M.sqrt(D * D + E * E);

    if (G < 10) {
      if (R() > .95) u.q = ~~(R() * v);
      else {
        if (R() > .99) u.D *= -1;
        u.q = (u.q + u.D + v) % v;
      }
    }

    u.X += -D / G * u.S;
    u.Y += -E / G * u.S;
    u.x += u.X;
    u.y += u.Y;
    u.X *= u.F;
    u.Y *= u.F;

    render(u);
    for (let k = 0; k < v - 1; k++) {
      let T = f[k], N = f[k + 1];
      N.x -= (N.x - T.x) * .7;
      N.y -= (N.y - T.y) * .7;
      render(N);
    }
  }

  requestAnimationFrame(loop);
}

loop();
