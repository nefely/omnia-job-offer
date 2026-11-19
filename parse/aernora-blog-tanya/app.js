(function () {
  'use strict';

  // Pass the RedTrack click ID (?rtkcid=...) through to every offer link
  const cid = new URLSearchParams(location.search).get('rtkcid');
  if (!cid) return;

  document.querySelectorAll('[data-offer]').forEach(a => {
    const u = new URL(a.href);
    u.searchParams.set('clickid', cid);
    a.href = u.href;
  });
})();
