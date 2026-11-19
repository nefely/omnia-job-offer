(function () {
  'use strict';
  // Share exactly the URL the visitor is currently on: same domain, path and query params.
  const entryUrl = window.location.href;
  const input = document.querySelector('#invite-url');
  const status = document.querySelector('#invite-status');
  const copyButton = document.querySelector('#copy-invite');
  const shareButton = document.querySelector('#share-invite');
  input.value = entryUrl;
  let busy = false;
  async function copyLink() {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard-unavailable');
      await navigator.clipboard.writeText(entryUrl);
    } catch (_) {
      input.focus();
      input.select();
      input.setSelectionRange(0, input.value.length);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) {}
      if (!copied) {
        status.textContent = 'Link selected. Press and hold to copy, or use Ctrl/Cmd+C.';
        return;
      }
    }
    status.textContent = 'Link copied! Send it to a friend.';
  }
  // Meta Pixel custom event: fired once per click on the copy / share buttons.
  function trackReferral(method) {
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', 'Referral', { method: method }); } catch (_) {}
  }
  copyButton.addEventListener('click', () => { trackReferral('copy'); copyLink(); });
  input.addEventListener('click', () => input.select());
  shareButton.addEventListener('click', async () => {
    if (busy) return;
    trackReferral('share');
    busy = true;
    try {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: 'Earnora — Discover your gaming rewards', url: entryUrl });
          status.textContent = 'Thanks for sharing Earnora!';
          return;
        } catch (error) {
          if (error.name === 'AbortError') return;
        }
      }
      await copyLink();
    } finally { busy = false; }
  });
})();
