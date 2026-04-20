// Reveal-on-scroll for stat bars and elements with .reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.stat, .reveal').forEach((el) => io.observe(el));

// Animated head-to-head count-up
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const from = 0;

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.h2h__num').forEach((el) => countObserver.observe(el));

// Parallax tilt on the hero tennis ball
const ball = document.querySelector('.tennis-ball');
if (ball && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    ball.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Easter egg: tap the verdict crown for a tiny celebration
const crown = document.querySelector('.verdict__crown');
if (crown) {
  crown.style.cursor = 'pointer';
  crown.addEventListener('click', () => {
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('span');
      b.className = 'ball confetti';
      b.style.cssText = `
        position: fixed;
        left: ${50 + (Math.random() - 0.5) * 40}vw;
        top: ${50 + (Math.random() - 0.5) * 20}vh;
        width: ${8 + Math.random() * 10}px;
        height: ${8 + Math.random() * 10}px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #e7ff6a, #d9ff2a 60%, #a7d117);
        box-shadow: 0 0 12px rgba(217,255,42,0.7);
        pointer-events: none;
        z-index: 999;
        transition: transform 1.4s cubic-bezier(0.2,0.8,0.2,1), opacity 1.4s ease;
      `;
      document.body.appendChild(b);
      requestAnimationFrame(() => {
        b.style.transform = `translate(${(Math.random() - 0.5) * 600}px, ${-200 - Math.random() * 400}px) rotate(${Math.random() * 720}deg)`;
        b.style.opacity = '0';
      });
      setTimeout(() => b.remove(), 1500);
    }
  });
}
