/* =====================================================================
   FreeCash static app — vanilla JS. No build step.
   Data lives in data.js (window.DATA) and is meant to be edited directly.
   This file only renders that data and handles navigation / modals.
   ===================================================================== */
(function () {
  "use strict";
  var D = window.DATA;

  /* ---------------- currency / locale ---------------- */
  function applyGender() { var g = D.genders && D.genders[state.gender]; if (g && D.profile) { D.profile.name = g.name; D.profile.avatar = g.avatar; } }
  function LOC() { return (D.locales && D.locales[state.locale]) || (D.locales && D.locales.us) || { currency: "$", rate: 1, name: "English", flag: "" }; }
  function fmtNum(n) {
    var v = Math.round((+n) * 100) / 100;
    var str = (Math.abs(v % 1) < 1e-9) ? String(Math.round(v)) : v.toFixed(2);
    var p = str.split("."); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return p.join(".");
  }
  function money(usd) { var l = LOC(); return l.currency + " " + fmtNum((+usd) * l.rate); }
  function cur(str) {
    var l = LOC();
    return String(str).replace(/\$\s*([\d,]+(?:\.\d+)?)/g, function (_, num) {
      return l.currency + " " + fmtNum(parseFloat(num.replace(/,/g, "")) * l.rate);
    });
  }

  /* ---------------- tiny helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function el(id) { return document.getElementById(id); }

  /* ---------------- inline SVG icons ---------------- */
  var I = {
    apple: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1.1 1-2.1 1-2.2-.1 0-2-.7-2-2.7zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v1.5a1.5 1.5 0 000 3V16a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5a1.5 1.5 0 000-3V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    chevDown: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    hourglass: '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M9.08128 1H2.91872C2.68747 1 2.5 1.18747 2.5 1.41872C2.5 2.75134 3.02938 4.02938 3.97169 4.97169L4.58128 5.58128C4.64181 5.64182 4.67208 5.67208 4.69375 5.70115C4.82594 5.87846 4.82594 6.12154 4.69375 6.29885C4.67208 6.32792 4.64181 6.35819 4.58128 6.41872L3.97169 7.02831C3.02938 7.97062 2.5 9.24866 2.5 10.5813C2.5 10.8125 2.68747 11 2.91872 11H9.08128C9.31253 11 9.5 10.8125 9.5 10.5813C9.5 9.24866 8.97062 7.97062 8.02831 7.02831L7.41872 6.41872C7.35819 6.35819 7.32792 6.32792 7.30625 6.29885C7.17406 6.12154 7.17406 5.87846 7.30625 5.70115C7.32792 5.67208 7.35819 5.64182 7.41872 5.58128L8.02831 4.97169C8.97062 4.02938 9.5 2.75134 9.5 1.41872C9.5 1.18747 9.31253 1 9.08128 1Z" stroke="currentColor" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.20943 2.25H7.78779C7.89609 2.25 7.97478 2.35058 7.9438 2.45434C7.86956 2.70293 7.72174 3.13466 7.5 3.5C7.05636 4.23094 6.33806 4.76771 6.08866 4.94054C6.03502 4.97772 5.96511 4.97735 5.91177 4.93975C5.66542 4.76607 4.95826 4.22983 4.5 3.5C4.27173 3.13647 4.12544 2.70137 4.05338 2.45218C4.02354 2.349 4.10202 2.25 4.20943 2.25Z" fill="currentColor"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12.5l3.5 3.5L18 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    dollarChip: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6v12M15 9a3 2.2 0 00-3-2c-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2a3 2.2 0 01-3-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    gear: '<svg viewBox="0 0 18 16" fill="none" aria-hidden="true"><path d="M15.7428 5.66826C14.2352 5.66826 13.6189 4.59469 14.3685 3.27788C14.8016 2.51464 14.5434 1.54172 13.7854 1.10558L12.3445 0.275238C11.6865 -0.118964 10.8369 0.11588 10.4454 0.778474L10.3538 0.937833C9.60419 2.25463 8.37147 2.25463 7.61352 0.937833L7.5219 0.778474C7.14709 0.11588 6.29751 -0.118964 5.63951 0.275238L4.19856 1.10558C3.44061 1.54172 3.1824 2.52303 3.61552 3.28627C4.37347 4.59469 3.75711 5.66826 2.24953 5.66826C1.3833 5.66826 0.666992 6.38117 0.666992 7.26184V8.738C0.666992 9.61028 1.37497 10.3316 2.24953 10.3316C3.75711 10.3316 4.37347 11.4052 3.61552 12.722C3.1824 13.4852 3.44061 14.4581 4.19856 14.8943L5.63951 15.7246C6.29751 16.1188 7.14709 15.884 7.53856 15.2214L7.63018 15.062C8.3798 13.7452 9.61252 13.7452 10.3705 15.062L10.4621 15.2214C10.8536 15.884 11.7031 16.1188 12.3611 15.7246L13.8021 14.8943C14.56 14.4581 14.8182 13.4768 14.3851 12.722C13.6272 11.4052 14.2435 10.3316 15.7511 10.3316C16.6174 10.3316 17.3337 9.61866 17.3337 8.738V7.26184C17.3253 6.38956 16.6174 5.66826 15.7428 5.66826ZM8.99616 10.7258C7.50524 10.7258 6.28918 9.50124 6.28918 7.99992C6.28918 6.4986 7.50524 5.27405 8.99616 5.27405C10.4871 5.27405 11.7031 6.4986 11.7031 7.99992C11.7031 9.50124 10.4871 10.7258 8.99616 10.7258Z" fill="currentColor"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" stroke-width="1.8"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    verified: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 1.8 3-.3 1 2.8 2.6 1.5-.9 2.9.9 2.9-2.6 1.5-1 2.8-3-.3L12 22l-2.4-1.8-3 .3-1-2.8L3 16.2l.9-2.9L3 10.4l2.6-1.5 1-2.8 3 .3L12 2z"/><path d="M8.5 12l2.2 2.2L15.5 9.5" stroke="#0d1117" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bell: '<svg viewBox="0 0 19 21" fill="none"><path d="M8.42088 1.6217C11.633 1.6217 14.3632 3.96864 14.8455 7.14437L15.3473 10.4495C15.3845 10.6942 15.4546 10.9327 15.5556 11.1587L15.7374 11.5653C16.6454 13.5967 17.0995 14.6124 16.6903 15.3693C16.6462 15.4509 16.5956 15.5287 16.5392 15.6023C16.0151 16.2848 14.9026 16.2848 12.6775 16.2848H4.16411C1.93917 16.2848 0.826668 16.2848 0.302609 15.6024C0.246106 15.5288 0.195508 15.4508 0.151396 15.3692C-0.257711 14.6123 0.196303 13.5966 1.10439 11.5654L1.28626 11.1587C1.38729 10.9327 1.45737 10.6941 1.49453 10.4493L1.99639 7.14437C2.47863 3.96865 5.20877 1.62172 8.42088 1.6217Z" fill="currentColor"/><path opacity="0.6" d="M11.5635 17.6818C11.5635 19.2243 10.313 20.4747 8.77051 20.4747H8.07227C6.52975 20.4747 5.2793 19.2243 5.2793 17.6818H11.5635Z" fill="currentColor"/></svg>',
    howLink: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 13a4 4 0 005.7 0l2.3-2.3A4 4 0 1012.3 5L11 6.3M14 11a4 4 0 00-5.7 0L6 13.3A4 4 0 1011.7 19L13 17.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    howWallet: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" stroke-width="1.7"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.7"/></svg>',
    howStar: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4l2.3 4.7 5.2.8-3.75 3.6.9 5.1L12 15.9 7.35 18.2l.9-5.1L4.5 9.5l5.2-.8L12 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8a2 2 0 012-2h13v3M3 8v9a2 2 0 002 2h14a1 1 0 001-1v-5a1 1 0 00-1-1H5a2 2 0 110-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16.5" cy="13.5" r="1.3" fill="currentColor"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    userCheck: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="8" r="3.4" stroke="currentColor" stroke-width="1.7"/><path d="M4 20c0-3.3 2.7-5.6 6-5.6 1.2 0 2.3.3 3.2.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16 17.5l1.6 1.6 3-3.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star2: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4l2.3 4.7 5.2.8-3.75 3.6.9 5.1L12 15.9 7.35 18.2l.9-5.1L4.5 9.5l5.2-.8L12 4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
  };

  var NAV = {
    earn: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="12" height="12" rx="3" fill="currentColor" opacity="0.35"/><rect x="8" y="8" width="12" height="12" rx="3" fill="currentColor"/></svg>',
    myoffers: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    cashout: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/><path d="M12 13.5v2M10.5 13.5h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    rewards: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l6 3v5c0 4-2.6 6.7-6 8-3.4-1.3-6-4-6-8V6l6-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------------- UI state ---------------- */
  var state = {
    locale: localStorage.getItem("fc_locale") || "us",
    gender: localStorage.getItem("fc_gender") || "female",
    mo: { tab: "started", selStarted: 0, selCompleted: 0, sub: "rewards", showAll: false, moreInfo: true },
    rw: { tab: "quests", bonus: "streak", lotTab: "prizes" },
    modal: null,
    offer: { id: null, tab: "rewards", showAll: false },
    lot: { tab: "prizes" },
    ps: { pub: D.profile.profilePublic, promo: D.profile.promoOffers },
    wdDetail: null,
    wdPage: 1
  };
  var WD_PER_PAGE = 8;

  /* offer lookup index (featured + moreOffers) */
  var offerIndex = {};
  D.featured.concat(D.moreOffers).forEach(function (o) { offerIndex[o.id] = o; });

  /* ---------------- countdown ---------------- */
  function fmtCountdown(remaining) {
    if (remaining < 0) remaining = 0;
    var d = Math.floor(remaining / 86400),
      h = Math.floor((remaining % 86400) / 3600),
      m = Math.floor((remaining % 3600) / 60),
      s = remaining % 60,
      p = function (n) { return String(n).padStart(2, "0"); };
    return d + "d " + p(h) + "h " + p(m) + "m " + p(s) + "s";
  }
  setInterval(function () {
    document.querySelectorAll("[data-deadline]").forEach(function (node) {
      var rem = Math.round((+node.getAttribute("data-deadline") - Date.now()) / 1000);
      node.textContent = fmtCountdown(rem);
    });
  }, 1000);
  function timerAttr() {
    return 'data-deadline="' + (Date.now() + D.lottery.countdownSeconds * 1000) + '"';
  }

  /* ================= shared card renderers ================= */
  function appleBadge(cls) { return '<span class="' + cls + '">' + I.apple + "</span>"; }

  function offerCard(o) {
    return '<button class="offer-card" data-act="offer" data-id="' + o.id + '">' +
      '<div class="offer-thumb"><img src="' + o.img + '" alt="' + esc(o.title) + '" loading="lazy">' +
      '<span class="offer-badge">' + I.apple + "</span></div>" +
      '<div class="offer-title">' + esc(o.title) + "</div>" +
      '<div class="offer-reward">' + money(o.reward) + "</div></button>";
  }
  function featuredCard(o) {
    return '<article class="featured-card" data-act="offer" data-id="' + o.id + '">' +
      '<div class="featured-media"><img class="featured-backdrop" src="' + o.img + '" alt="" aria-hidden="true">' +
      '<img class="featured-thumb" src="' + o.img + '" alt="' + esc(o.title) + '"></div>' +
      '<div class="featured-row"><h3 class="featured-title">' + esc(o.title) + "</h3>" +
      '<span class="featured-badge">' + I.apple + "</span></div>" +
      '<button class="featured-cta">Play and Earn ' + money(o.reward) + "</button></article>";
  }
  function surveyCard(s) {
    return '<button class="survey-card"><div class="survey-media" style="background:' + s.grad + '">' +
      '<span class="survey-rocket">' + s.icon + "</span>" +
      '<span class="survey-rating">' + s.rating.toFixed(1) + ' <span class="survey-star">★</span></span></div>' +
      '<div class="survey-body"><div class="survey-label">' + esc(s.label) + "</div>" +
      '<div class="survey-mins">' + s.minutes + ' mins</div>' +
      '<div class="survey-reward">' + money(s.reward) + "</div></div></button>";
  }
  function partnerCard(p) {
    return '<button class="partner-card">' +
      (p.bonus ? '<span class="partner-bonus">+' + p.bonus + "%</span>" : "") +
      '<div class="partner-logo"><img src="' + p.logo + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
      '<span class="partner-rating">' + p.rating + ' <span class="partner-star">★</span></span>' +
      '<div class="partner-name">' + esc(p.name) + "</div></button>";
  }
  function sectionHeader(icon, title, viewAll) {
    return '<div class="section-header"><h2 class="section-title"><span class="section-icon">' + icon + "</span>" + esc(title) + "</h2>" +
      (viewAll ? '<button class="section-viewall">View all ' + I.chevRight + "</button>" : "") + "</div>";
  }
  function rewardRow(step) {
    var right = "";
    if (step.status === "active" && step.time)
      right = '<span class="reward-time' + (step.urgent ? " reward-time--urgent" : "") + '">' + I.hourglass + step.time + "</span>";
    else if (step.status === "completed")
      right = '<span class="reward-icon reward-icon--done">' + I.check + "</span>";
    else if (step.status === "expired")
      right = '<span class="reward-icon reward-icon--expired">' + I.cross + "</span>";
    return '<div class="reward-row reward-row--' + step.status + '">' +
      '<span class="reward-amount">' + cur(step.reward) + "</span>" +
      '<span class="reward-label">' + esc(step.label) + "</span>" + right + "</div>";
  }

  /* ================= chrome (top bar + nav) ================= */
  function topBar() {
    var w = D.wallet;
    return '<header class="topbar">' +
      '<button class="tb-avatar" data-act="profile" aria-label="Profile"><img src="' + D.profile.avatar + '" alt="" width="44" height="44"></button>' +
      '<div class="tb-pills">' +
      '<button class="tb-pill tb-pill--streak" data-act="streak"><span class="tb-ico">🔥</span>' + w.streak + "</button>" +
      '<button class="tb-pill tb-pill--balance" data-act="nav-cashout"><span class="tb-dollar">' + LOC().currency + '</span>' + fmtNum(w.balance * LOC().rate) + "</button>" +
      '<button class="tb-pill tb-pill--tickets" data-act="lottery"><span class="tb-ico">🎟️</span>' + w.tickets + "</button>" +
      "</div>" +
      '<button class="tb-bell" data-act="notifs" aria-label="Notifications">' + I.bell + '<span class="tb-bell-dot"></span></button>' +
      "</header>";
  }
  var TABS = [
    { key: "earn", route: "earn", label: "Earn" },
    { key: "myoffers", route: "my-offers", label: "My Offers" },
    { key: "cashout", route: "cashout", label: "Cashout" },
    { key: "rewards", route: "rewards", label: "Rewards" }
  ];
  function bottomNav(active) {
    return '<nav class="bottom-nav">' + TABS.map(function (t) {
      var on = t.route === active || (active === "withdrawals" && t.key === "cashout") || (active === "profile" && false);
      return '<a class="nav-item' + (on ? " nav-item--active" : "") + '" href="#/' + t.route + '">' +
        '<span class="nav-icon">' + NAV[t.key] + "</span><span class=\"nav-label\">" + t.label + "</span></a>";
    }).join("") + "</nav>";
  }

  /* ================= screens ================= */
  function screenEarn() {
    var w = D.wallet, pct = Math.min(100, (w.cashoutCurrent / w.cashoutGoal) * 100);
    return '<div class="earn">' +
      '<section class="cashout-block"><h2 class="cashout-title">Next cashout</h2>' +
      '<div class="cashout-bar"><div class="cashout-fill" style="width:' + pct + '%"></div>' +
      '<span class="cashout-text">' + money(w.cashoutCurrent) + " / " + money(w.cashoutGoal) + "</span></div></section>" +
      sectionHeader("🏆", "Best for You", false) +
      '<div class="hscroll hscroll--featured">' + D.featured.map(featuredCard).join("") + "</div>" +
      sectionHeader("🎁", "More Offers", true) +
      '<div class="offer-grid">' + D.moreOffers.map(offerCard).join("") + "</div>" +
      sectionHeader("📋", "Surveys", false) +
      '<div class="hscroll">' + D.surveys.map(surveyCard).join("") + "</div>" +
      sectionHeader("🌐", "Offer Partners", true) +
      '<div class="offer-grid offer-grid--partners">' + D.partners.map(partnerCard).join("") + "</div>" +
      "</div>";
  }

  function moThumb(o, size) {
    var inner = o.img ? '<img src="' + o.img + '" alt="">' : '<span class="mo-thumb-emoji">' + o.emoji + "</span>";
    return '<div class="mo-thumb" style="background:' + o.grad + ";width:" + size + "px;height:" + size + 'px">' + inner + "</div>";
  }
  function screenMyOffers() {
    var st = state.mo;
    var list = st.tab === "started" ? D.startedOffers : D.completedOffers;
    var selIdx = st.tab === "started" ? st.selStarted : st.selCompleted;
    if (selIdx >= list.length) selIdx = 0;
    var sel = list[selIdx];
    var html = '<div class="my-offers">';
    html += '<div class="mo-toggle">' +
      '<button class="mo-toggle-btn' + (st.tab === "started" ? " is-active" : "") + '" data-act="mo-tab" data-v="started">Started</button>' +
      '<button class="mo-toggle-btn' + (st.tab === "completed" ? " is-active" : "") + '" data-act="mo-tab" data-v="completed">Completed</button></div>';
    if (st.tab === "completed")
      html += '<div class="mo-info-line"><span class="mo-info-ico">' + I.info + "</span>You have completed all reward steps or hit max completion days for these offers.</div>";
    html += '<div class="mo-strip">' + list.map(function (o, i) {
      return '<button class="mo-strip-item' + (i === selIdx ? " is-selected" : "") + '" data-act="mo-sel" data-v="' + i + '">' +
        moThumb(o, 74) + '<span class="mo-strip-name">' + esc(o.title) + "</span></button>";
    }).join("") + "</div>";
    if (st.tab === "completed")
      html += '<div class="mo-promo"><div class="mo-promo-text"><h3>Earn up to ' + cur("$1,000") + ' More</h3><p>by playing a new game for 5 minutes</p>' +
        '<button class="mo-promo-link">Play and earn more →</button></div><div class="mo-promo-coins" aria-hidden="true">🪙💰🪙</div></div>';
    if (sel) {
      html += '<div class="mo-header">' + moThumb(sel, 51) +
        '<div class="mo-header-info"><div class="mo-header-title">' + esc(sel.title) + "</div>" +
        '<div class="mo-header-balance">' + cur(sel.balance) + "</div></div>" +
        '<button class="mo-play" aria-label="Play">' + I.play + "</button></div>";
      html += '<div class="mo-subtabs">' +
        '<button class="mo-subtab' + (st.sub === "rewards" ? " is-active" : "") + '" data-act="mo-sub" data-v="rewards">Rewards</button>' +
        '<button class="mo-subtab' + (st.sub === "details" ? " is-active" : "") + '" data-act="mo-sub" data-v="details">Details</button></div>';
      if (st.sub === "details") {
        html += moDetails(sel);
      } else {
        if (sel.lottery)
          html += '<section class="mo-section"><div class="mo-section-head"><h2><span class="mo-sec-ico mo-sec-ico--lottery">' + I.ticket + '</span>Lottery Rewards</h2><span class="mo-sec-info">' + I.info + "</span></div>" +
            '<div class="mo-lottery"><span class="mo-lottery-amount">' + cur(sel.lottery.amount) + "</span>" +
            '<span class="mo-lottery-label">' + esc(sel.lottery.label) + "</span>" +
            '<span class="mo-lottery-tickets">' + sel.lottery.tickets + " " + I.ticket + "</span>" +
            '<button class="mo-lottery-view">View</button></div></section>';
        if (sel.main && sel.main.length)
          html += '<section class="mo-section"><div class="mo-section-head"><h2><span class="mo-sec-ico mo-sec-ico--main">📈</span>Main Rewards</h2><span class="mo-sec-info">' + I.info + "</span></div>" +
            '<div class="mo-rows">' + sel.main.map(rewardRow).join("") + "</div></section>";
        if (sel.done && sel.done.length) {
          var doneVisible = (st.showAll || st.tab === "started") ? sel.done : sel.done.slice(0, 3);
          html += '<section class="mo-section"><h2 class="mo-plain-head">Completed or Expired</h2>' +
            '<div class="mo-rows">' + doneVisible.map(rewardRow).join("") + "</div>";
          if (st.tab === "completed" && sel.done.length > 3)
            html += '<button class="mo-toggle-rewards" data-act="mo-showall">' + (st.showAll ? "Hide rewards" : "More rewards") + "</button>";
          html += "</section>";
        }
      }
    }
    html += "</div>";
    return html;
  }
  function pips(value) {
    var out = "";
    for (var i = 0; i < 5; i++) {
      var fill = Math.max(0, Math.min(1, value - i));
      var cid = "pipc_" + i + "_" + Math.floor(Math.random() * 1e6);
      out += '<svg viewBox="0 0 28 30" class="mo-pip" aria-hidden="true">' +
        '<defs><clipPath id="' + cid + '"><rect x="0" y="0" width="' + (28 * fill) + '" height="30"/></clipPath></defs>' +
        '<path class="mo-pip-bg" d="M14 1l11 6.3v13.4L14 29 3 20.7V7.3L14 1z"/>' +
        '<path class="mo-pip-fill" d="M14 1l11 6.3v13.4L14 29 3 20.7V7.3L14 1z" clip-path="url(#' + cid + ')"/></svg>';
    }
    return '<div class="mo-pips">' + out + "</div>";
  }
  function moDetails(sel) {
    var d = sel.details;
    var html = '<div class="mo-details-card">' +
      '<div class="mo-detail"><div class="mo-detail-head"><span class="mo-detail-ico">' + I.star2 + "</span>Your Reward Multiplier</div>" + pips(d.multiplier) + "</div>";
    if (d.flexibleOrder)
      html += '<div class="mo-detail"><div class="mo-detail-head"><span class="mo-detail-ico">' + I.swap + "</span>Task Order Flexibility</div>" +
        "<p class=\"mo-detail-text\">You don't need to complete the steps in any particular order.</p></div>";
    if (d.newUsersOnly)
      html += '<div class="mo-detail"><div class="mo-detail-head"><span class="mo-detail-ico">' + I.userCheck + "</span>New Users Only</div>" +
        '<p class="mo-detail-text">Only new users who haven\'t installed "' + esc(sel.title) + '" on their device before are eligible to earn points.</p></div>';
    html += "</div>";
    // Description + steps
    html += '<div class="mo-desc-card"><h2 class="mo-desc-title">Description</h2>' +
      '<p class="mo-desc-text">' + esc(d.description) + "</p>" +
      '<button class="mo-moreinfo" data-act="mo-moreinfo">More Info <span class="mo-moreinfo-chev" style="transform:' + (state.mo.moreInfo ? "rotate(180deg)" : "none") + '">' + I.chevDown + "</span></button>";
    if (state.mo.moreInfo) {
      html += '<div class="mo-meta">' +
        '<div class="mo-meta-col"><span class="mo-meta-val mo-meta-val--status">' + esc(d.status) + '</span><span class="mo-meta-key">Status</span></div>' +
        '<div class="mo-meta-col mo-meta-col--mid"><span class="mo-meta-val mo-meta-val--cat">' + esc(d.category) + '</span><span class="mo-meta-key">Category</span></div>' +
        '<div class="mo-meta-col"><span class="mo-meta-val mo-meta-provider">' +
        (d.provider.logo ? '<img class="mo-provider-logo" src="' + d.provider.logo + '" alt="">' : '<span class="mo-provider-badge">' + esc(d.provider.name[0]) + "</span>") +
        esc(d.provider.name) + '</span><span class="mo-meta-key">Provider</span></div></div>' +
        '<h3 class="mo-steps-title">Steps</h3><p class="mo-steps-text">' + esc(d.steps) + "</p>";
    }
    html += "</div>";
    html += '<h2 class="mo-faqs-title">FAQs</h2><div class="mo-faqs">' + D.offerFaqs.map(function (f) {
      return '<button class="mo-faq"><div class="mo-faq-text"><div class="mo-faq-q">' + esc(f.q) + '</div><div class="mo-faq-a">' + esc(f.a) + "</div></div><span class=\"mo-faq-chev\">" + I.chevRight + "</span></button>";
    }).join("") + "</div>";
    return html;
  }

  function paymentCard(t) {
    var w = D.wallet, affordable = t.required === null || w.balance >= t.required;
    var brand = PAY_BRAND[t.brand];
    return '<div class="payment-card" data-act="withdraw" data-id="' + t.id + '"><div class="pc-amount">' + cur(t.amount) + "</div>" +
      '<div class="pc-media pc-media--' + t.brand + '"><img class="pc-logo' + (brand.solid ? " pc-logo--solid" : "") + '" src="' + brand.logo + '" alt="' + brand.label + '">' +
      (t.lowerFees ? '<span class="pc-lowerfees">Lower fees</span>' : "") + "</div>" +
      '<div class="pc-footer">' + (affordable
        ? '<span class="pc-withdraw">Withdraw now</span>'
        : '<span class="pc-progress">' + money(w.balance) + " / " + money(t.required) + "</span>") + "</div></div>";
  }
  var PAY_BRAND = {
    paypal: { logo: "assets/pay/paypal.png", label: "PayPal" },
    visa: { logo: "assets/pay/visa.png", label: "Visa" },
    bitcoin: { logo: "assets/pay/bitcoin.png", label: "Bitcoin" },
    litecoin: { logo: "assets/pay/litecoin.png", label: "Litecoin" },
    solana: { logo: "assets/pay/solana-logo.png", label: "Solana", solid: true },
    dogecoin: { logo: "assets/pay/dogecoin.png", label: "Dogecoin" },
    stake: { logo: "assets/pay/stake.png", label: "Stake" }
  };
  function screenCashout() {
    var w = D.wallet;
    var html = '<div class="cashout"><div class="co-head"><h1 class="co-title">Cashout</h1>' +
      '<button class="co-withdrawals" data-act="nav-withdrawals">My withdrawals</button></div>' +
      '<p class="co-desc">Redeem your Freecash earnings directly to PayPal, Amazon, Bitcoin and more! Withdraw to your crypto wallet starting at just ' + cur("$0.50") + ', and to Stake starting at ' + cur("$0.25") + '!</p>' +
      '<div class="co-balance"><span class="co-balance-ico">' + I.wallet + "</span>" +
      '<div><div class="co-balance-label">Balance</div><div class="co-balance-amount">' + money(w.balance) + "</div></div></div>";
    D.cashoutSections.forEach(function (sec) {
      html += '<section class="co-section"><div class="co-section-head"><h2>' + esc(sec.title) + "</h2>" +
        (sec.bonus ? '<span class="co-bonus">' + esc(sec.bonus) + "</span>" : "") + "</div>" +
        '<div class="co-row' + (sec.wide ? " co-row--wide" : "") + '">' + sec.tiers.map(paymentCard).join("") + "</div></section>";
    });
    html += '<div class="co-disclaimer">' + D.cashoutDisclaimer.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></div>";
    return html;
  }

  function screenWithdrawals() {
    var pages = Math.max(1, Math.ceil(D.withdrawals.length / WD_PER_PAGE));
    if (state.wdPage > pages) state.wdPage = 1;
    var start = (state.wdPage - 1) * WD_PER_PAGE;
    var pageItems = D.withdrawals.slice(start, start + WD_PER_PAGE);
    var html = '<div class="mw"><div class="mw-head"><button class="mw-back" data-act="back" aria-label="Back">' + I.back + "</button>" +
      '<h1 class="mw-title">Withdrawals</h1></div>' +
      '<div class="mw-cols"><span>Type</span><span>Rewards</span></div><div class="mw-list">';
    pageItems.forEach(function (w) {
      html += '<button class="mw-row" data-act="wd" data-id="' + w.id + '">' +
        '<span class="mw-logo mw-logo--' + w.brand + '"><img src="' + PAY_BRAND[w.brand].logo + '" alt=""></span>' +
        '<span class="mw-type">' + esc(w.type) + "</span>" +
        '<span class="mw-reward">' + cur(w.reward) + "</span>" +
        '<span class="mw-chev">' + I.chevRight + "</span></button>";
    });
    html += '</div><div class="mw-pager">';
    for (var i = 1; i <= pages; i++) {
      html += '<button class="mw-page' + (i === state.wdPage ? " is-active" : "") + '" data-act="wd-page" data-v="' + i + '">' + i + "</button>";
    }
    html += "</div></div>";
    return html;
  }

  function screenRewards() {
    var st = state.rw, html = '<div class="rw">';
    html += '<div class="rw-tabs">' + [["quests", "Quests"], ["bonuses", "Bonuses"], ["invite", "Invite Friends"]].map(function (t) {
      return '<button class="rw-tab' + (st.tab === t[0] ? " is-active" : "") + '" data-act="rw-tab" data-v="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    if (st.tab === "quests") {
      html += '<div class="rw-body"><div class="rw-banner rw-banner--quests"><div class="rw-banner-text">Quests just<br>for you!</div><div class="rw-banner-art" aria-hidden="true">🎩💰</div></div>' +
        '<h2 class="rw-h2"><span class="rw-h2-ico">〜</span> Quests</h2><div class="rw-quests">' +
        D.quests.map(function (q) {
          return '<button class="rw-quest"><span class="rw-quest-reward">' + cur(q.reward) + "</span>" +
            '<span class="rw-quest-label">' + esc(q.label) + '</span><span class="rw-quest-arrow">' + I.arrowRight + "</span></button>";
        }).join("") + "</div></div>";
    } else if (st.tab === "bonuses") {
      html += '<div class="rw-body"><div class="rw-bonus-tabs">' +
        rwTile("streak", "🔥", "Daily<br>Streak") + rwTile("lottery", "🎟️", "Weekly<br>Lottery") + rwTile("codes", "🏷️", "Bonus<br>Codes") + "</div>";
      if (st.bonus === "streak") html += streakCard();
      else if (st.bonus === "lottery") html += lotteryBlock();
      else html += codesCard();
      html += "</div>";
    } else {
      html += '<div class="rw-body">' + inviteBlock() + "</div>";
    }
    html += "</div>";
    return html;
  }
  function rwTile(key, ico, label) {
    return '<button class="rw-btile' + (state.rw.bonus === key ? " is-active" : "") + '" data-act="rw-bonus" data-v="' + key + '">' +
      '<span class="rw-btile-ico">' + ico + "</span>" + label + "</button>";
  }
  function streakTrack(prefix) {
    var s = D.streak, out = "";
    for (var i = 0; i < s.total; i++) {
      var cls = "rw-node", inner = I.dollarChip;
      if (i < s.current) { cls += " rw-node--done"; inner = LOC().currency + Math.round(s.perStep * LOC().rate); }
      else if (i === s.current) cls += " rw-node--current";
      out += '<span class="' + cls.replace(/rw-/g, prefix) + '">' + inner + "</span>";
    }
    out += '<span class="' + prefix + 'node ' + prefix + 'node--gem"></span>';
    return out;
  }
  function streakCard() {
    var s = D.streak;
    return '<div class="rw-card"><div class="rw-card-head"><h3>🔥 Streak Reward</h3>' +
      '<span class="rw-streak-count">' + s.current + " / " + s.total + " ❄️</span></div>" +
      '<p class="rw-streak-desc">Win up to <b class="rw-amber">5,000 tickets</b> per day, and up to <b class="rw-amber">50,000 tickets</b> every 7 days.</p>' +
      '<div class="rw-streak-claimrow"><span>Claim your ' + money(s.claimAmount) + ' reward</span><span class="rw-streak-info">' + I.info + "</span></div>" +
      '<div class="rw-streak-track">' + streakTrack("rw-") + "</div>" +
      '<button class="rw-claim rw-claim--ready">Claim ' + money(s.claimAmount) + "</button></div>";
  }
  function lotteryBlock() {
    var l = D.lottery, st = state.rw;
    var html = '<div class="rw-lot"><div class="rw-lot-top"><span class="rw-lot-no">Lottery #' + l.number + ' -</span>' +
      '<span class="rw-lot-timer" ' + timerAttr() + ">" + fmtCountdown(l.countdownSeconds) + "</span></div>" +
      '<div class="rw-lot-hero"><div class="rw-lot-tickets-bg" aria-hidden="true">🎟️🎟️</div>' +
      '<div class="rw-lot-pool">' + cur(l.pool) + '</div><div class="rw-lot-winners">' + l.winners + "<br>WINNERS</div></div>" +
      '<div class="rw-lot-balance">Ticket Balance: ' + l.tickets + " 🎟️</div>" +
      '<button class="rw-lot-hiw"><span class="rw-lot-hiw-l">' + I.info + ' How it Works</span><span class="rw-lot-hiw-chev">⌄</span></button>' +
      '<div class="rw-lot-subtabs">' +
      '<button class="rw-lot-subtab' + (st.lotTab === "prizes" ? " is-active" : "") + '" data-act="rw-lottab" data-v="prizes">Prizes</button>' +
      '<button class="rw-lot-subtab' + (st.lotTab === "winners" ? " is-active" : "") + '" data-act="rw-lottab" data-v="winners">Previous Winners</button></div>';
    if (st.lotTab === "prizes") html += prizesCard("rw-");
    else html += '<div class="rw-card rw-winners-empty"><p>Previous winners will appear here after each draw.</p></div>';
    html += "</div>";
    return html;
  }
  function prizesCard(prefix) {
    var pod = D.lotteryPodium;
    var html = '<div class="' + prefix + 'card ' + prefix + 'prizes"><div class="' + prefix + 'podium">' +
      podCol(prefix, "2nd", "🎖️", pod.second, "2") +
      podCol(prefix, "1st", "🏆", pod.first, "1") +
      podCol(prefix, "3rd", "🏅", pod.third, "3") + "</div>" +
      '<div class="' + prefix + 'prize-rows">' + D.lotteryPrizes.map(function (p) {
        return '<div class="' + prefix + 'prize-row"><span class="' + prefix + 'prize-place">' + esc(p.place) + '</span><span class="' + prefix + 'prize-amt">' + cur(p.prize) + "</span></div>";
      }).join("") + "</div></div>";
    return html;
  }
  function podCol(prefix, badge, ico, prize, n) {
    return '<div class="' + prefix + 'pod"><span class="' + prefix + "pod-badge" + (n !== "2" ? " " + prefix + "pod-badge--" + n : "") + '">' + badge + "</span>" +
      '<span class="' + prefix + "pod-ico" + (n === "1" ? " " + prefix + "pod-ico--1" : "") + '">' + ico + "</span>" +
      '<span class="' + prefix + "pod-prize " + prefix + "pod-prize--" + n + '">' + cur(prize) + "</span></div>";
  }
  function codesCard() {
    return '<div class="rw-card rw-codes"><h3 class="rw-codes-title">Have a Bonus Code?</h3>' +
      '<p class="rw-codes-desc">Follow our socials to get notified when we drop new bonus codes.</p>' +
      '<div class="rw-socials"><span class="rw-social rw-social--fb">f</span><span class="rw-social rw-social--ig">◉</span><span class="rw-social rw-social--x">𝕏</span></div>' +
      '<div class="rw-code-input"><input placeholder="Bonus code"><button class="rw-code-apply">Apply</button></div></div>';
  }
  function inviteBlock() {
    var HOW = { link: I.howLink, wallet: I.howWallet, star: I.howStar };
    var html = '<div class="rw-banner rw-banner--invite"><div class="rw-banner-text">Earn up to <span class="rw-green">' + cur("$12.50") + '</span> for each friend you invite!</div>' +
      '<div class="rw-banner-art" aria-hidden="true">🪙🎁</div></div>' +
      '<div class="rw-reflink"><span class="rw-reflink-url">' + esc(D.referral.link) + "<b>" + esc(D.referral.code) + "</b></span><button class=\"rw-reflink-edit\">Edit</button></div>" +
      '<button class="rw-share"><span class="rw-share-ico">🔗</span> Share link</button>' +
      '<div class="rw-earnings"><div><div class="rw-earnings-label">Referral Earnings ' + I.info + '</div><div class="rw-earnings-amount">' + cur("$ 0") + '</div></div>' +
      '<div class="rw-pending"><div>Pending Earnings</div><div class="rw-pending-amount">' + cur("$ 0") + '</div></div></div>' +
      '<div class="rw-hiw"><h3 class="rw-hiw-title">How it works</h3>';
    D.howItWorks.forEach(function (h) {
      html += '<div class="rw-hiw-item"><div class="rw-hiw-head"><span class="rw-hiw-ico">' + HOW[h.icon] + "</span>" + esc(h.title) + "</div>" +
        '<p class="rw-hiw-text">' + cur(h.text).replace(new RegExp('('+LOC().currency.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s?[\\d.,]+)','g'), '<b class="rw-green">$1</b>') + "</p></div>";
    });
    html += '<button class="rw-terms">↗ Full Terms</button></div><h3 class="rw-h2 rw-friends-title">Friends joined</h3>';
    return html;
  }

  function screenProfile() {
    var p = D.profile;
    var html = '<div class="pf"><div class="pf-head"><h1 class="pf-title">My Profile</h1>' +
      '<button class="pf-gear" data-act="settings" aria-label="Settings">' + I.gear + "</button></div>" +
      '<div class="pf-user"><img class="pf-avatar" src="' + p.avatar + '" alt="">' +
      '<div class="pf-user-info"><div class="pf-name">' + esc(p.name) + "</div>" +
      '<div class="pf-stats"><div><div class="pf-stat-val">' + cur(p.totalEarnings) + '</div><div class="pf-stat-key">Total Earnings</div></div>' +
      '<div><div class="pf-stat-val">' + p.offersCompleted + '</div><div class="pf-stat-key">Offers Completed</div></div></div></div></div>' +
      '<div class="pf-level-row"><span class="pf-level">Level <span class="pf-medal">🎖️</span><b>' + p.level + "</b></span>" +
      '<span class="pf-level-hint">' + p.coinsToLevelUp + ' coins to level up</span></div>' +
      '<div class="pf-level-bar"><div class="pf-level-fill" style="width:' + p.levelProgress + '%"></div></div>' +
      '<button class="pf-link pf-earnings"><span class="pf-link-l"><span class="pf-link-ico">💰</span> Earnings</span>' + I.arrowRight + "</button>" +
      '<div class="pf-section-head"><h2>Started offers <span class="pf-info">' + I.info + '</span></h2><button class="pf-viewall" data-act="nav-myoffers">View all <span class="pf-viewall-chev">›</span></button></div>' +
      '<div class="pf-offers">' + D.startedOffers.map(function (o) {
        return '<div class="pf-offer"><div class="pf-offer-thumb" style="background:' + o.grad + '">' +
          (o.img ? '<img src="' + o.img + '" alt="">' : "<span>" + o.emoji + "</span>") + "</div>" +
          '<div class="pf-offer-title">' + esc(o.title) + '</div><div class="pf-offer-cat">Other</div><div class="pf-offer-bal">' + cur(o.balance) + "</div></div>";
      }).join("") + "</div>" +
      '<button class="pf-row" data-act="nav-withdrawals"><span class="pf-row-l"><img class="pf-row-ico" src="assets/ui/my-profile-wallet.svg" alt=""> Withdrawals</span>' + I.arrowRight + "</button>" +
      '<button class="pf-row"><span class="pf-row-l"><span class="pf-row-ico pf-row-ico--chat">💬</span> Support</span>' + I.arrowRight + "</button>";
    // footer
    html += '<footer class="pf-footer"><img class="pf-fc-logo" src="assets/ui/Freecash.png" alt="Freecash">' +
      '<p class="pf-about">' + esc(D.freecashAbout) + "</p>" +
      '<img class="pf-appstore" src="assets/ui/apple-store.svg" alt="Download on the App Store">' +
      '<div class="pf-trust"><span class="pf-trust-word">Excellent</span><img src="assets/ui/128x24.png" alt="4.5 stars"><img class="pf-trust-logo" src="assets/ui/trustpilotLogo.svg" alt="Trustpilot"></div>' +
      '<div class="pf-foot-accordions">' + D.footerSections.map(function (s) { return '<button class="pf-acc">' + esc(s) + " " + I.chevDown + "</button>"; }).join("") + "</div>" +
      '<div class="pf-copyright">© Freecash 2026 · ' + D.footerLinks.join(" · ") + "</div>" +
      '<button class="pf-lang" data-act="lang">' + LOC().flag + ' ' + LOC().name + " ⌄</button>" +
      '<div class="pf-socials">' + D.footerSocials.map(function (s) { return '<span class="pf-social">' + s + "</span>"; }).join("") + "</div></footer>";
    html += "</div>";
    return html;
  }

  /* ================= modals ================= */
  function langSheet() {
    var rows = Object.keys(D.locales).map(function (k) {
      var l = D.locales[k], on = k === state.locale;
      return '<button class="lang-item' + (on ? " is-active" : "") + '" data-act="set-lang" data-v="' + k + '">' +
        '<span class="lang-flag">' + l.flag + '</span><span class="lang-name">' + l.name + '</span>' +
        (on ? '<span class="lang-check">' + I.check + '</span>' : '') + '</button>';
    }).join("");
    return '<div class="lang-backdrop" data-act="close-modal"><div class="lang-sheet">' +
      '<div class="lang-head"><h2>Select your language</h2>' +
      '<button class="lang-close" data-act="close-modal" aria-label="Close">' + I.close + '</button></div>' +
      '<div class="lang-list">' + rows + '</div></div></div>';
  }

  function openModal(html) { el("modal").innerHTML = html; }
  function closeModal() { el("modal").innerHTML = ""; state.modal = null; }

  function streakSheet() {
    var s = D.streak;
    return '<div class="ss-backdrop" data-act="close-modal"><div class="ss-panel">' +
      '<div class="ss-head"><h3>🔥 Streak Reward</h3><span class="ss-count">' + s.current + " / " + s.total + " ❄️</span></div>" +
      '<p class="ss-desc">Win up to <b class="ss-amber">5,000 tickets</b> per day, and up to <b class="ss-amber">50,000 tickets</b> every 7 days.</p>' +
      '<div class="ss-claimrow"><span>Claim your ' + money(s.claimAmount) + ' reward</span><span class="ss-info">' + I.info + "</span></div>" +
      '<div class="ss-track">' + streakTrack("ss-") + "</div>" +
      '<button class="ss-claim ss-claim--ready">Claim ' + money(s.claimAmount) + "</button></div></div>";
  }
  function lotterySheet() {
    var l = D.lottery, st = state.lot;
    var html = '<div class="ls-backdrop" data-act="close-modal"><div class="ls-sheet">' +
      '<div class="ls-top"><span class="ls-no">Lottery #' + l.number + ' -</span>' +
      '<span class="ls-timer" ' + timerAttr() + ">" + fmtCountdown(l.countdownSeconds) + "</span>" +
      '<button class="ls-close" data-act="close-modal" aria-label="Close">' + I.close + "</button></div>" +
      '<div class="ls-hero"><div class="ls-tickets-bg" aria-hidden="true">🎟️🎟️</div>' +
      '<div class="ls-pool">' + cur(l.pool) + '</div><div class="ls-winners">' + l.winners + "<br>WINNERS</div></div>" +
      '<div class="ls-balance">Ticket Balance: ' + l.tickets + " 🎟️</div>" +
      '<button class="ls-hiw"><span class="ls-hiw-l">' + I.info + ' How it Works</span><span class="ls-hiw-chev">' + I.chevDown + "</span></button>" +
      '<div class="ls-subtabs">' +
      '<button class="ls-subtab' + (st.tab === "prizes" ? " is-active" : "") + '" data-act="ls-tab" data-v="prizes">Prizes</button>' +
      '<button class="ls-subtab' + (st.tab === "winners" ? " is-active" : "") + '" data-act="ls-tab" data-v="winners">Previous Winners</button></div>';
    if (st.tab === "prizes") html += prizesCard("ls-");
    else html += '<div class="ls-card ls-empty">Previous winners will appear here after each draw.</div>';
    html += "</div></div>";
    return html;
  }
  function notificationsSheet() {
    var html = '<div class="nt-backdrop" data-act="close-modal"><div class="nt-sheet">' +
      '<div class="nt-head"><h2>Notifications</h2><button class="nt-close" data-act="close-modal" aria-label="Close">' + I.close + "</button></div>" +
      '<button class="nt-markall">Mark all as read</button><div class="nt-list">';
    D.notifications.forEach(function (n) {
      html += '<div class="nt-card">' +
        ((n.img || n.emoji) ? '<div class="nt-thumb"' + (n.grad ? ' style="background:' + n.grad + '"' : "") + ">" + (n.img ? '<img src="' + n.img + '" alt="">' : "<span>" + n.emoji + "</span>") + "</div>" : "") +
        '<div class="nt-body"><div class="nt-title">' + esc(n.title) + '</div><div class="nt-date">' + esc(n.date) + "</div>" +
        '<div class="nt-text">' + esc(n.text) + (n.readMore ? '<a class="nt-more">Read More</a>' : "") + "</div></div></div>";
    });
    html += "</div></div></div>";
    return html;
  }
  var WD_LOGO = PAY_BRAND, WD_TICKER = { bitcoin: "BTC", litecoin: "LTC", solana: "SOL", dogecoin: "DOGE" };
  var WD_RATE = { bitcoin: "$ 61,607.56", litecoin: "$ 84.20", solana: "$ 172.34", dogecoin: "$ 0.16" };
  function withdrawSheet(tier) {
    var kind = tier.brand === "stake" ? "stake" : (tier.brand === "paypal" || tier.brand === "visa" ? "fiat" : "crypto");
    var name = { paypal: "PayPal", visa: "Visa Prepaid", bitcoin: "Bitcoin", litecoin: "Litecoin", solana: "Solana", dogecoin: "Dogecoin", stake: "Stake" }[tier.brand];
    var body;
    if (kind === "crypto") body = wsCrypto(tier, name);
    else if (kind === "fiat") body = wsFiat(name);
    else body = wsStake();
    return '<div class="ws-backdrop" data-act="close-modal"><div class="ws-sheet">' +
      '<button class="ws-close" data-act="close-modal" aria-label="Close">' + I.close + "</button>" +
      '<div class="ws-head"><span class="ws-badge ws-badge--' + tier.brand + '"><img src="' + PAY_BRAND[tier.brand].logo + '" alt=""></span>' +
      '<h2 class="ws-title">' + (kind === "stake" ? "Confirm Withdrawal" : name) + "</h2></div>" + cur(body) + "</div></div>";
  }
  function wsRow(k, v, opt) {
    opt = opt || {};
    return '<div class="ws-row"><span class="ws-row-k' + (opt.bold ? " ws-row-k--bold" : "") + '">' + esc(k) +
      (opt.info ? '<span class="ws-row-info">' + I.info + "</span>" : "") + "</span>" +
      '<span class="ws-row-v' + (opt.green ? " ws-row-v--green" : "") + (opt.bold ? " ws-row-v--bold" : "") + '">' + esc(v) + "</span></div>";
  }
  function wsCrypto(tier, name) {
    var ticker = WD_TICKER[tier.brand] || name.slice(0, 3).toUpperCase();
    return '<div class="ws-radios">' +
      '<label class="ws-radio is-checked"><span class="ws-dot"></span>' + name + " Address</label>" +
      '<label class="ws-radio"><span class="ws-dot"></span>Stake.us <span class="ws-flag">🇺🇸</span><span class="ws-bonus-text">30% Bonus</span></label>' +
      '<label class="ws-radio"><span class="ws-dot"></span>Stake.com <span class="ws-flag">🌐</span><span class="ws-bonus-text">15% Bonus</span></label></div>' +
      '<label class="ws-label">' + name + ' Address</label><input class="ws-input" placeholder="Enter ' + name + ' Address..."/>' +
      '<p class="ws-hint">The ' + name + " Address for your " + name + ' Wallet.</p>' +
      '<label class="ws-label ws-label--mt">Amount in USD</label>' +
      '<div class="ws-amount"><span class="ws-amount-dollar">' + LOC().currency + '</span><span class="ws-amount-val">0</span><button class="ws-max">Max amount</button></div>' +
      '<p class="ws-min">Minimum $ 5</p>' +
      '<div class="ws-summary">' + wsRow(ticker + " exchange rate", WD_RATE[tier.brand] || "$ 0") +
      wsRow("Crypto Fee", "$ 0.28", { info: true }) + wsRow("Withdrawal Fee", "$ 0", { green: true }) + wsRow("Amount", "$ 0", { bold: true }) + "</div>" +
      '<div class="ws-receive"><span>You\'ll receive (' + ticker + ')</span><strong class="ws-receive-crypto">0</strong></div>' +
      '<button class="ws-submit ws-submit--disabled" disabled>Withdraw</button>';
  }
  function wsFiat(name) {
    return '<div class="ws-note"><div>Currency: <strong>USD</strong></div><div><strong>Note:</strong> This item is only available for UA residents</div></div>' +
      '<label class="ws-label">' + name + ' account*</label><input class="ws-input" placeholder="Input your ' + name + ' account email"/>' +
      '<div class="ws-callout">Your reward will be sent to this address. Make sure this email is linked to your ' + name + ' account.</div>' +
      '<div class="ws-summary ws-summary--mt">' + wsRow("Withdrawal Fee", "$ 5 (5%)") + wsRow(name + " consumer fee", "Free", { green: true }) + wsRow("Amount", "$100", { bold: true }) + "</div>" +
      '<div class="ws-receive"><span>You\'ll receive</span><strong>$ 95</strong></div>' +
      '<label class="ws-check"><span class="ws-checkbox"></span>I understand my order is non-refundable</label>' +
      '<button class="ws-submit ws-submit--disabled" disabled>Withdraw</button>';
  }
  function wsStake() {
    return '<div class="ws-callout ws-callout--top">Minimum cashout to Stake.us is $ 0.10. We recommend you withdraw to a verified account.</div>' +
      '<label class="ws-label">Stake.us Username</label><input class="ws-input" placeholder="Stake.us Username"/>' +
      '<p class="ws-hint">No Stake Account? <a class="ws-link">Create Stake Account</a></p>' +
      '<label class="ws-label ws-label--mt">Amount in USD</label>' +
      '<div class="ws-amount"><span class="ws-amount-dollar">' + LOC().currency + '</span><span class="ws-amount-val">0</span><button class="ws-max">Max amount</button></div>' +
      '<p class="ws-min"><span class="ws-min-ico">' + I.info + '</span>Minimum $ 0.10</p>' +
      '<div class="ws-summary">' + wsRow("Withdrawal Fee", "Free", { green: true }) +
      '<div class="ws-row"><span class="ws-row-k">Bonus <span class="ws-bonus-pill">+30% BONUS</span></span><span class="ws-row-v ws-row-v--bold">$ 0</span></div>' +
      wsRow("Amount", "$ 0", { bold: true }) + "</div>" +
      '<div class="ws-receive"><span>You\'ll receive (Stake Cash)</span><strong class="ws-receive-stake">ⓢ 0</strong></div>' +
      '<button class="ws-submit ws-submit--go">Withdraw</button>';
  }
  function offerSheet() {
    var o = offerIndex[state.offer.id];
    if (!o) return "";
    var rewards = D.rewardsFor(o.title), st = state.offer;
    var visible = st.showAll ? rewards : rewards.slice(0, 5);
    var body;
    if (st.tab === "rewards") {
      body = '<div class="os-section-head"><h3><span class="os-sec-ico os-sec-ico--lottery">' + I.ticket + '</span>Lottery Rewards</h3><span class="os-sec-info">' + I.info + "</span></div>" +
        '<div class="os-lottery"><span class="os-lottery-amount">' + cur("$50,000") + '</span><span class="os-lottery-label">Weekly Lottery</span>' +
        '<span class="os-lottery-tickets">0 ' + I.ticket + '</span><button class="os-lottery-view">View</button></div>' +
        '<div class="os-section-head"><h3><span class="os-sec-ico os-sec-ico--main">📈</span>Main Rewards</h3><span class="os-sec-info">' + I.info + "</span></div>" +
        '<div class="os-rows">' + visible.map(rewardRow).join("") + "</div>" +
        (rewards.length > 5 ? '<button class="os-more" data-act="os-showall">' + (st.showAll ? "↑ Hide Rewards" : "↓ More Rewards") + "</button>" : "");
    } else {
      body = '<p class="os-details">Play ' + esc(o.title) + " and complete the milestones to earn rewards. Rewards are credited to your balance automatically. New users only.</p>";
    }
    return '<div class="os-backdrop" data-act="close-modal"><div class="os-sheet">' +
      '<div class="os-hero"><img class="os-hero-bg" src="' + o.img + '" alt="" aria-hidden="true"><img class="os-hero-thumb" src="' + o.img + '" alt="' + esc(o.title) + '">' +
      '<button class="os-close" data-act="close-modal" aria-label="Close">' + I.close + "</button></div>" +
      '<div class="os-titlerow"><h2 class="os-title">' + esc(o.title) + '</h2><span class="os-badge">' + I.apple + "</span></div>" +
      '<button class="os-cta">Play and Earn ' + money(o.reward) + "</button>" +
      '<div class="os-tabs"><button class="os-tab' + (st.tab === "rewards" ? " is-active" : "") + '" data-act="os-tab" data-v="rewards">Rewards</button>' +
      '<button class="os-tab' + (st.tab === "details" ? " is-active" : "") + '" data-act="os-tab" data-v="details">Details</button></div>' +
      body + "</div></div>";
  }
  function profileSettings() {
    var p = D.profile, ps = state.ps;
    return '<div class="ps-backdrop" data-act="close-modal"><div class="ps-sheet">' +
      '<button class="ps-close" data-act="close-modal" aria-label="Close">' + I.close + "</button>" +
      '<div class="ps-head"><img class="ps-avatar" src="' + p.avatar + '" alt=""><div><div class="ps-name">' + esc(p.name) + '<span class="ps-edit">' + I.edit + "</span></div></div></div>" +
      '<div class="ps-card"><h3 class="ps-card-title">Information</h3>' +
      '<div class="ps-row"><span class="ps-k">Freecash ID</span><span class="ps-v ps-v--id">' + esc(p.freecashId) + '<span class="ps-copy">' + I.copy + "</span></span></div>" +
      '<div class="ps-row"><span class="ps-k">Referrer</span><span class="ps-v">' + esc(p.referrer) + "</span></div>" +
      '<div class="ps-row"><span class="ps-k">Referral earnings</span><span class="ps-v">' + esc(p.referralEarnings) + "</span></div>" +
      '<div class="ps-row ps-row--last"><span class="ps-k">Date joined</span><span class="ps-v">' + esc(p.dateJoined) + "</span></div></div>" +
      '<div class="ps-card"><h3 class="ps-card-title">Settings</h3>' +
      '<div class="ps-row"><span class="ps-k">Gender</span><span class="ps-toggle-wrap"><span class="' + (state.gender === "female" ? "ps-toggle-active" : "") + '">Female</span>' +
      '<button class="ps-toggle' + (state.gender === "male" ? " is-on" : "") + '" data-act="ps-gender"><span class="ps-knob"></span></button>' +
      '<span class="' + (state.gender === "male" ? "ps-toggle-active" : "") + '">Male</span></span></div>' +
      '<div class="ps-row"><span class="ps-k">Language</span><button class="ps-lang" data-act="lang">' + LOC().flag + ' ' + LOC().name + " ⌄</button></div>" +
      '<div class="ps-row"><span class="ps-k">Profile</span><span class="ps-toggle-wrap"><span class="' + (!ps.pub ? "ps-toggle-active" : "") + '">Private</span>' +
      '<button class="ps-toggle' + (ps.pub ? " is-on" : "") + '" data-act="ps-pub"><span class="ps-knob"></span></button>' +
      '<span class="' + (ps.pub ? "ps-toggle-active" : "") + '">Public</span></span></div>' +
      '<div class="ps-emailblock"><div class="ps-k">Email</div><div class="ps-email">' + esc(p.email) + (p.emailVerified ? '<span class="ps-verified">' + I.verified + "</span>" : "") + "</div></div>" +
      '<div class="ps-row ps-row--last"><span class="ps-k">Receive promotional offers</span>' +
      '<button class="ps-toggle' + (ps.promo ? " is-on" : "") + '" data-act="ps-promo"><span class="ps-knob"></span></button></div></div>' +
      '<button class="ps-logout">Logout</button><button class="ps-delete">Delete account</button></div></div>';
  }

  /* ================= router / render ================= */
  function currentRoute() {
    var h = location.hash.replace(/^#\/?/, "");
    return h || "earn";
  }
  var SCREENS = {
    earn: screenEarn, "my-offers": screenMyOffers, cashout: screenCashout,
    rewards: screenRewards, profile: screenProfile, withdrawals: screenWithdrawals
  };
  function renderRoute() {
    var r = currentRoute();
    var fn = SCREENS[r] || screenEarn;
    el("screen").innerHTML = fn();
    el("chrome-nav").innerHTML = bottomNav(r);
    el("chrome-top").innerHTML = topBar();
    el("screen").scrollTop = 0;
  }
  function buildShell() {
    el("app").innerHTML =
      '<div class="app-shell"><div class="app-viewport">' +
      '<div id="chrome-top"></div>' +
      '<main class="app-content" id="screen"></main>' +
      '<div id="chrome-nav"></div>' +
      '<div id="modal"></div>' +
      "</div></div>";
    el("chrome-top").innerHTML = topBar();
  }

  /* ================= events ================= */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act"), v = t.getAttribute("data-v"), id = t.getAttribute("data-id");
    switch (act) {
      case "profile": location.hash = "#/profile"; break;
      case "nav-cashout": location.hash = "#/cashout"; break;
      case "nav-withdrawals": location.hash = "#/withdrawals"; break;
      case "nav-myoffers": location.hash = "#/my-offers"; break;
      case "back": history.back(); break;
      case "streak": openModal(streakSheet()); break;
      case "lottery": state.lot.tab = "prizes"; openModal(lotterySheet()); break;
      case "notifs": openModal(notificationsSheet()); break;
      case "settings": openModal(profileSettings()); break;
      case "close-modal":
        // close on a direct backdrop click, or on a close button (*-close)
        if ((t === e.target && /backdrop/.test(t.className)) || /-close/.test(t.className))
          closeModal();
        break;
      case "offer": state.offer = { id: id, tab: "rewards", showAll: false }; openModal(offerSheet()); break;
      case "os-tab": state.offer.tab = v; openModal(offerSheet()); break;
      case "os-showall": state.offer.showAll = !state.offer.showAll; openModal(offerSheet()); break;
      case "withdraw":
        var tier = null;
        D.cashoutSections.forEach(function (s) { s.tiers.forEach(function (x) { if (x.id === id) tier = x; }); });
        if (tier) openModal(withdrawSheet(tier));
        break;
      case "wd":
        var wd = D.withdrawals.filter(function (x) { return x.id === id; })[0];
        if (wd) openModal(wdDetailSheet(wd));
        break;
      case "ls-tab": state.lot.tab = v; openModal(lotterySheet()); break;
      case "ps-pub": state.ps.pub = !state.ps.pub; openModal(profileSettings()); break;
      case "ps-gender":
        state.gender = state.gender === "female" ? "male" : "female";
        localStorage.setItem("fc_gender", state.gender);
        applyGender(); openModal(profileSettings()); renderRoute(); break;
      case "ps-promo": state.ps.promo = !state.ps.promo; openModal(profileSettings()); break;
      case "mo-tab": state.mo.tab = v; state.mo.showAll = false; renderRoute(); break;
      case "mo-sel":
        if (state.mo.tab === "started") state.mo.selStarted = +v; else state.mo.selCompleted = +v;
        state.mo.showAll = false; renderRoute(); break;
      case "mo-sub": state.mo.sub = v; renderRoute(); break;
      case "mo-showall": state.mo.showAll = !state.mo.showAll; renderRoute(); break;
      case "mo-moreinfo": state.mo.moreInfo = !state.mo.moreInfo; renderRoute(); break;
      case "rw-tab": state.rw.tab = v; renderRoute(); break;
      case "rw-bonus": state.rw.bonus = v; renderRoute(); break;
      case "rw-lottab": state.rw.lotTab = v; renderRoute(); break;
      case "wd-page": state.wdPage = +v; renderRoute(); break;
      case "lang": openModal(langSheet()); break;
      case "set-lang":
        state.locale = v; localStorage.setItem("fc_locale", v);
        if (D.profile) D.profile.language = LOC().name;
        closeModal(); renderRoute(); break;
    }
  });

  function wdDetailSheet(w) {
    var name = { paypal: "PayPal", visa: "Visa Prepaid", bitcoin: "Bitcoin", litecoin: "Litecoin", solana: "Solana", dogecoin: "Dogecoin", stake: "Stake" }[w.brand];
    function row(k, v, cls) { return '<div class="mw-drow"><span class="mw-dk">' + esc(k) + '</span><span class="mw-dv ' + (cls || "") + '">' + esc(v) + "</span></div>"; }
    return '<div class="mw-backdrop" data-act="close-modal"><div class="mw-sheet">' +
      '<div class="mw-sheet-head"><span class="mw-logo mw-logo--lg mw-logo--' + w.brand + '"><img src="' + PAY_BRAND[w.brand].logo + '" alt=""></span>' +
      "<h2>" + name + '</h2><button class="mw-close" data-act="close-modal" aria-label="Close">' + I.close + "</button></div>" +
      row("Reward", cur(w.reward)) + row("Email/Address", w.email) + row("Transaction ID", w.txId || " ") +
      row("Date", w.date) + row("Status", w.status, "mw-status--" + w.status.toLowerCase()) + "</div></div>";
  }

  window.addEventListener("hashchange", function () { state.wdPage = 1; closeModal(); renderRoute(); });
  applyGender();
  buildShell();
  renderRoute();
})();
