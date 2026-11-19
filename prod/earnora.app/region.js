(function () {
  'use strict';
  const badge = document.querySelector('#visitor-region');
  if (!badge) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  fetch('/api/region', { signal: controller.signal, cache: 'no-store' })
    .then(response => { if (!response.ok) throw new Error('region-unavailable'); return response.json(); })
    .then(({ country }) => {
      if (!country || !/^[A-Z]{2}$/.test(country)) return;
      const name = typeof Intl.DisplayNames === 'function'
        ? new Intl.DisplayNames(['en'], { type: 'region' }).of(country)
        : country;
      if (name) badge.textContent = name.toUpperCase();
      if (window.EarnoraCurrency) window.EarnoraCurrency.setCountry(country);
    })
    .catch(() => { /* Keep the neutral label; do not guess from device language. */ })
    .finally(() => clearTimeout(timeout));
})();
