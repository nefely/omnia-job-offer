(function () {
  'use strict';
  let symbol = '$';
  const originals = new WeakMap();
  function format(text) { return String(text).replace(/[$£](?=\d)/g, symbol); }
  function apply(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script, style, textarea, input, code')) continue;
      if (!/[$£]\d/.test(node.data)) continue;
      let entry = originals.get(node);
      if (!entry || node.data !== entry.last) entry = { original: node.data, last: node.data };
      const translated = format(entry.original);
      if (translated !== node.data) node.data = translated;
      entry.last = translated;
      originals.set(node, entry);
    }
  }
  function setCountry(country) {
    symbol = country === 'GB' ? '£' : '$';
    apply();
  }
  window.EarnoraCurrency = { format, apply, setCountry };
})();
