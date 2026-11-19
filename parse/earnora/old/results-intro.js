(function () {
  'use strict';
  let stopPrevious = null;
  window.playEarnoraResultsIntro = function () {
    if (stopPrevious) stopPrevious();
    const section = document.querySelector('#final-screen');
    if (!section) return;
    const heading = section.querySelector('h2');
    const root = document.documentElement;
    const originalBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const headerHeight = document.querySelector('#top-timer')?.getBoundingClientRect().height || 0;
    const target = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight - 12);
    const focusHeading = () => { if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: target, behavior: 'instant' });
      root.style.scrollBehavior = originalBehavior;
      focusHeading();
      return;
    }
    const bottom = section.getBoundingClientRect().bottom + window.scrollY;
    const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    const start = Math.max(target, Math.min(maxScroll, bottom - window.innerHeight + 20));
    if (start - target < 80) {
      window.scrollTo({ top: target, behavior: 'instant' });
      root.style.scrollBehavior = originalBehavior;
      focusHeading();
      return;
    }
    let stopped = false;
    let frameId = 0;
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    function cleanup() {
      cancelAnimationFrame(frameId);
      events.forEach(type => window.removeEventListener(type, onInput, true));
      document.removeEventListener('visibilitychange', onVisibility);
      root.style.scrollBehavior = originalBehavior;
      stopPrevious = null;
    }
    function stop() { if (!stopped) { stopped = true; cleanup(); } }
    function onInput(event) {
      if (event.type === 'keydown' && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab', 'Escape'].includes(event.key)) return;
      stop();
    }
    function onVisibility() { if (document.hidden) stop(); }
    stopPrevious = stop;
    events.forEach(type => window.addEventListener(type, onInput, { capture: true, passive: true }));
    document.addEventListener('visibilitychange', onVisibility);
    window.scrollTo({ top: start, behavior: 'instant' });
    const duration = Math.min(6500, Math.max(3400, (start - target) * 2.4));
    let startedAt = null;
    function animate(now) {
      if (stopped) return;
      if (startedAt === null) startedAt = now + 400;
      const t = Math.max(0, Math.min(1, (now - startedAt) / duration));
      // Gentle acceleration/deceleration while retaining a readable tour speed.
      const eased = t * t * (3 - 2 * t);
      window.scrollTo({ top: start + (target - start) * eased, behavior: 'instant' });
      if (t < 1) frameId = requestAnimationFrame(animate);
      else { stopped = true; cleanup(); focusHeading(); }
    }
    frameId = requestAnimationFrame(animate);
  };
})();
