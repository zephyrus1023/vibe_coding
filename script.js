// 메뉴 토글
const menuBtn = document.getElementById('menu-btn');
const overlay = document.getElementById('nav-overlay');
const toggleMenu = (force) => {
  const open = overlay.classList.toggle('open', force);
  menuBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn.addEventListener('click', () => toggleMenu());
overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// 헤더 스크롤 배경
const header = document.querySelector('.header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });

// 등장 애니메이션
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  io.observe(el);
});

// 숫자 카운터
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / 1500, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// 데스크톱: 마우스에 따라 인물 사진 살짝 움직이기
const portrait = document.querySelector('.portrait');
if (matchMedia('(min-width: 769px)').matches) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / innerWidth - 0.5) * 16;
    portrait.style.transform = `translateX(calc(-50% + ${x}px))`;
  });
}
