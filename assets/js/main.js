/* ─────────────────────────────────────────────
   Sheety KLEIDO — main.js
   Slide viewer reads from window.KLEIDO_DIMS
   which is injected by index.njk from dimensions.json
   ───────────────────────────────────────────── */

(function () {
  const DIMS = window.KLEIDO_DIMS || [];

  let current = 0;
  let auto;

  const track  = document.getElementById('slideTrack');
  const letter = document.getElementById('slideLetter');
  const name_  = document.getElementById('slideName');
  const desc   = document.getElementById('slideDesc');
  const poles  = document.getElementById('slidePoles');
  const dots   = document.querySelectorAll('.slide-dot');

  if (!track) return; // not on a page with the viewer

  function goSlide(i) {
    current = i;
    const d = DIMS[i];

    track.style.transform = `translateX(-${i * 260}px)`;

    letter.textContent = d.key;
    letter.style.color = d.color;

    name_.textContent  = d.name;
    name_.style.color  = d.color;

    desc.textContent   = d.description;
    poles.textContent  = d.poles.low + '  \u2194  ' + d.poles.high;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === i);
      dot.style.background = idx === i ? d.color : '#fff';
      dot.style.opacity    = idx === i ? '1' : '0.18';
    });

    resetAuto();
  }

  function nextSlide() {
    goSlide((current + 1) % DIMS.length);
  }

  function resetAuto() {
    clearInterval(auto);
    auto = setInterval(nextSlide, 3500);
  }

  // Expose to inline onclick handlers in the template
  window.nextSlide = nextSlide;
  window.goSlide   = goSlide;

  // Init
  goSlide(0);

  /* ─── Scroll reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('visible'));
  }

})();
