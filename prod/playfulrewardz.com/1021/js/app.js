(function () {
  'use strict';

  // === CONFIGURATION ===
  // Offer / tracker URL lives in index.html, in the href of <a id="offerCtaBtn">
  var TIMER_DURATION_SEC = 300; // 05:00
  var EARNINGS_MIN = 27.40;
  var EARNINGS_MAX = 94.80;

  // Update footer year automatically
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Final CTA: preventDefault -> fire Pixel PageView -> redirect to the CTA's own href
  // after 500ms (double-click guarded for 5s). The href is static in index.html and
  // is NOT modified by this script (tracker may rewrite it).
  var offerCta = document.getElementById('offerCtaBtn');
  if (offerCta) {
    var isClicked = false;
    offerCta.addEventListener('click', function (e) {
      e.preventDefault();

      if (isClicked) return;
      isClicked = true;

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }

      // Read href at click time so any tracker rewrite is picked up
      var href = offerCta.getAttribute('href');
      setTimeout(function () {
        window.location.href = href;
      }, 500);

      setTimeout(function () {
        isClicked = false;
      }, 5000);
    });
  }

  // === SYNCED COUNTDOWN TIMER (sessionStorage timestamp) ===
  var timerEls = document.querySelectorAll('.js-countdown');
  function initSyncedTimer() {
    if (!timerEls.length) return;
    var key = 'pr_offer_timer_end';
    var now = Date.now();
    var endTs = parseInt(sessionStorage.getItem(key) || '0', 10);

    if (!endTs || endTs <= now) {
      endTs = now + TIMER_DURATION_SEC * 1000;
      sessionStorage.setItem(key, String(endTs));
    }

    function renderTimer() {
      var remaining = Math.max(0, Math.ceil((endTs - Date.now()) / 1000));
      var mins = String(Math.floor(remaining / 60)).padStart(2, '0');
      var secs = String(remaining % 60).padStart(2, '0');
      var formatted = mins + ':' + secs;
      timerEls.forEach(function (el) {
        el.textContent = formatted;
      });
    }

    renderTimer();
    setInterval(renderTimer, 1000);
  }
  initSyncedTimer();

  // === SAFE NUMBER ANIMATION (cancels previous RAF to avoid race bugs) ===
  var rafRegistry = new WeakMap();
  function animateNumber(el, from, to, duration, formatter, onDone) {
    if (rafRegistry.has(el)) {
      cancelAnimationFrame(rafRegistry.get(el));
    }
    var start = performance.now();
    function step(now) {
      var progress = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = from + (to - from) * eased;
      el.textContent = formatter(current);
      if (progress < 1) {
        rafRegistry.set(el, requestAnimationFrame(step));
      } else {
        el.textContent = formatter(to);
        rafRegistry.delete(el);
        if (typeof onDone === 'function') onDone();
      }
    }
    rafRegistry.set(el, requestAnimationFrame(step));
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }

  // === PAGE 1 LOGIC ===
  var earningsEl = document.getElementById('earningsAmount');
  var earningsBox = document.getElementById('earningsBox');
  var earningsDeltaEl = document.getElementById('earningsDelta');
  var usersValEl = document.getElementById('usersVal');
  var usersCardEl = document.getElementById('usersCard');
  var usersDeltaEl = document.getElementById('usersDelta');
  var offerValEl = document.getElementById('offerVal');
  var offerCardEl = document.getElementById('offerCard');
  var offerDeltaEl = document.getElementById('offerDelta');

  var livePaused = false; // true while loader / Step 2 is visible
  var currentEarnings = randFloat(52.00, 84.50);

  function flashDirection(valEl, cardEl, badgeEl, isUp, badgeText) {
    var dirClass = isUp ? 'is-up' : 'is-down';
    var oppClass = isUp ? 'is-down' : 'is-up';
    var flashClass = isUp ? 'flash-up' : 'flash-down';
    var oppFlash = isUp ? 'flash-down' : 'flash-up';

    valEl.classList.remove(oppClass);
    valEl.classList.add(dirClass);

    if (cardEl) {
      cardEl.classList.remove(oppFlash);
      cardEl.classList.add(flashClass);
    }

    if (badgeEl) {
      badgeEl.textContent = badgeText;
      badgeEl.classList.remove(oppClass);
      badgeEl.classList.add(dirClass, 'show');
    }

    setTimeout(function () {
      valEl.classList.remove(dirClass);
      if (cardEl) cardEl.classList.remove(flashClass);
    }, 1100);
  }

  if (earningsEl && usersValEl && offerValEl) {
    // Initial ±10 randomized values on each visit
    var currentUsers = 27 + randInt(-10, 10);   // 17 .. 37
    var currentOffer = 358 + randInt(-10, 10);  // 348 .. 368

    // 1. Reveal Main Earnings after 650ms shimmer
    setTimeout(function () {
      earningsEl.className = 'earnings-amount';
      animateNumber(earningsEl, 0, currentEarnings, 850, function (v) {
        return '$' + v.toFixed(2);
      });

      // Periodic live updates every 2.8s ($27.40 - $94.80)
      setInterval(function () {
        if (livePaused) return;
        var next = randFloat(EARNINGS_MIN, EARNINGS_MAX);
        if (Math.abs(next - currentEarnings) < 1.2) {
          next = currentEarnings > 60 ? currentEarnings - 4.35 : currentEarnings + 5.20;
        }
        next = Math.max(EARNINGS_MIN, Math.min(EARNINGS_MAX, Math.round(next * 100) / 100));
        var diff = next - currentEarnings;
        var isUp = diff >= 0;
        var sign = isUp ? '▲ +$' : '▼ -$';
        flashDirection(earningsEl, earningsBox, earningsDeltaEl, isUp, sign + Math.abs(diff).toFixed(2));
        animateNumber(earningsEl, currentEarnings, next, 650, function (v) {
          return '$' + v.toFixed(2);
        });
        currentEarnings = next;
      }, 2800);
    }, 650);

    // 2. Reveal Users Online after 820ms shimmer
    setTimeout(function () {
      usersValEl.className = 'metric-val';
      animateNumber(usersValEl, 0, currentUsers, 750, function (v) {
        return Math.round(v) + 'K+';
      });

      setInterval(function () {
        if (livePaused) return;
        var step = randInt(-3, 3);
        if (step === 0) step = 1;
        var next = Math.max(17, Math.min(37, currentUsers + step));
        if (next === currentUsers) next = currentUsers > 27 ? currentUsers - 2 : currentUsers + 2;
        var diff = next - currentUsers;
        var isUp = diff > 0;
        flashDirection(usersValEl, usersCardEl, usersDeltaEl, isUp, (isUp ? '▲ +' : '▼ -') + Math.abs(diff) + 'K');
        animateNumber(usersValEl, currentUsers, next, 550, function (v) {
          return Math.round(v) + 'K+';
        });
        currentUsers = next;
      }, 3400);
    }, 820);

    // 3. Reveal Per Offer after 1050ms shimmer
    setTimeout(function () {
      offerValEl.className = 'metric-val';
      animateNumber(offerValEl, 300, currentOffer, 750, function (v) {
        return '$' + Math.round(v) + '+';
      });

      setInterval(function () {
        if (livePaused) return;
        var step = randInt(-5, 5);
        if (step === 0) step = 2;
        var next = Math.max(348, Math.min(368, currentOffer + step));
        if (next === currentOffer) next = currentOffer > 358 ? currentOffer - 3 : currentOffer + 3;
        var diff = next - currentOffer;
        var isUp = diff > 0;
        flashDirection(offerValEl, offerCardEl, offerDeltaEl, isUp, (isUp ? '▲ +$' : '▼ -$') + Math.abs(diff));
        animateNumber(offerValEl, currentOffer, next, 550, function (v) {
          return '$' + Math.round(v) + '+';
        });
        currentOffer = next;
      }, 4100);
    }, 1050);
  }

  // === STEP VISIBILITY (one-page flow: Step 1 <-> Step 2) ===
  var step1El = document.getElementById('step1');
  var step2El = document.getElementById('step2');
  var livePillEl = document.getElementById('livePill');
  var backBtnEl = document.getElementById('backBtn');
  var brandTagEl = document.getElementById('brandTag');

  function showStep(n) {
    var isStep2 = n === 2;
    if (step1El) step1El.hidden = isStep2;
    if (step2El) step2El.hidden = !isStep2;
    if (livePillEl) livePillEl.hidden = isStep2;
    if (backBtnEl) backBtnEl.hidden = !isStep2;
    if (brandTagEl) brandTagEl.textContent = isStep2 ? 'Bonus Reserved' : 'Official Testing Program';
    livePaused = isStep2;
    window.scrollTo(0, 0);
  }

  // === 2.5s LOADER TRANSITION (Step 1 -> Step 2) ===
  var startBtn = document.getElementById('startPage1Btn');
  var loaderOverlay = document.getElementById('loaderOverlay');
  var loaderRingFg = document.getElementById('loaderRingFg');
  var loaderPercent = document.getElementById('loaderPercent');
  var loaderBar = document.getElementById('loaderBar');
  var loaderEstimate = document.getElementById('loaderEstimate');
  var isLoading = false;

  function setStepState(stepId, state) {
    var el = document.getElementById(stepId);
    if (!el) return;
    // Called every animation frame — skip if state unchanged, otherwise re-inserting
    // the spinner each frame restarts its CSS animation and it looks frozen
    if (el.getAttribute('data-state') === state) return;
    el.setAttribute('data-state', state);
    var icon = el.querySelector('.loader-icon');
    el.classList.remove('active', 'done');
    if (state === 'active') {
      el.classList.add('active');
      icon.innerHTML = '<span class="spinner-sm"></span>';
    } else if (state === 'done') {
      el.classList.add('done');
      icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    }
  }

  if (startBtn && loaderOverlay) {
    startBtn.addEventListener('click', function () {
      if (isLoading) return;
      isLoading = true;

      // Pause background live updates for smooth 60fps loader
      livePaused = true;

      if (loaderEstimate) {
        loaderEstimate.textContent = 'Est. $' + currentEarnings.toFixed(2) + '/day';
      }

      loaderOverlay.classList.add('active');
      loaderOverlay.setAttribute('aria-hidden', 'false');
      setStepState('lStep1', 'active');

      var totalMs = 2500;
      var startTime = performance.now();
      var circumference = 289;

      function tickLoader(now) {
        var elapsed = now - startTime;
        var pct = Math.min(100, (elapsed / totalMs) * 100);
        if (loaderRingFg) {
          loaderRingFg.style.strokeDashoffset = String(circumference - (circumference * pct) / 100);
        }
        if (loaderPercent) loaderPercent.textContent = Math.round(pct) + '%';
        if (loaderBar) loaderBar.style.width = pct.toFixed(1) + '%';

        if (elapsed >= 750 && elapsed < 1600) {
          setStepState('lStep1', 'done');
          setStepState('lStep2', 'active');
        } else if (elapsed >= 1600 && elapsed < 2350) {
          setStepState('lStep1', 'done');
          setStepState('lStep2', 'done');
          setStepState('lStep3', 'active');
        } else if (elapsed >= 2350) {
          setStepState('lStep1', 'done');
          setStepState('lStep2', 'done');
          setStepState('lStep3', 'done');
        }

        if (elapsed < totalMs) {
          requestAnimationFrame(tickLoader);
        } else {
          finishLoader();
        }
      }

      requestAnimationFrame(tickLoader);
    });
  }

  var LOADER_HOLD_MS = 900;  // pause on fully-filled 100% state so the user sees it's done
  var LOADER_FADE_MS = 250;  // matches .loader-overlay opacity transition
  var loaderTitle = loaderOverlay ? loaderOverlay.querySelector('.loader-title') : null;
  var loaderTitleDefault = loaderTitle ? loaderTitle.textContent : '';

  // Lock everything to 100%, hold, switch block under the overlay, then fade out
  function finishLoader() {
    if (loaderRingFg) loaderRingFg.style.strokeDashoffset = '0';
    if (loaderPercent) loaderPercent.textContent = '100%';
    if (loaderBar) loaderBar.style.width = '100%';
    setStepState('lStep1', 'done');
    setStepState('lStep2', 'done');
    setStepState('lStep3', 'done');
    if (loaderTitle) loaderTitle.textContent = 'Rewards Unlocked!';

    setTimeout(function () {
      showStep(2);
      loaderOverlay.classList.remove('active');
      loaderOverlay.setAttribute('aria-hidden', 'true');
      setTimeout(resetLoader, LOADER_FADE_MS);
    }, LOADER_HOLD_MS);
  }

  function resetLoader() {
    if (!loaderOverlay) return;
    loaderOverlay.classList.remove('active');
    loaderOverlay.setAttribute('aria-hidden', 'true');
    if (loaderTitle) loaderTitle.textContent = loaderTitleDefault;
    ['lStep1', 'lStep2', 'lStep3'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('active', 'done');
      el.removeAttribute('data-state');
      var icon = el.querySelector('.loader-icon');
      if (icon) icon.innerHTML = '';
    });
    if (loaderRingFg) loaderRingFg.style.strokeDashoffset = '';
    if (loaderPercent) loaderPercent.textContent = '0%';
    if (loaderBar) loaderBar.style.width = '0%';
    isLoading = false;
  }

  if (backBtnEl) {
    backBtnEl.addEventListener('click', function (e) {
      e.preventDefault();
      showStep(1);
    });
  }

  // === COMMENTS INTERACTIVITY (XSS-SAFE) ===
  var commentsList = document.getElementById('commentsList');
  var commentForm = document.getElementById('commentForm');
  var commentCountEl = document.getElementById('commentCount');

  if (commentsList) {
    commentsList.addEventListener('click', function (e) {
      var btn = e.target.closest('.helpful-btn');
      if (!btn) return;
      var countSpan = btn.querySelector('.helpful-num');
      var count = parseInt(countSpan.textContent, 10) || 0;
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        countSpan.textContent = String(Math.max(0, count - 1));
      } else {
        btn.classList.add('active');
        countSpan.textContent = String(count + 1);
      }
    });
  }

  if (commentForm && commentsList) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = document.getElementById('commentName');
      var textInput = document.getElementById('commentText');
      var name = (nameInput.value || '').trim();
      var text = (textInput.value || '').trim();
      if (!name || !text) return;

      var initials = name
        .split(/\s+/)
        .slice(0, 2)
        .map(function (w) { return w.charAt(0).toUpperCase(); })
        .join('');

      var item = document.createElement('div');
      item.className = 'comment-item';

      var avatar = document.createElement('div');
      avatar.className = 'comment-avatar';
      avatar.textContent = initials || 'U';

      var body = document.createElement('div');
      body.className = 'comment-body';

      var top = document.createElement('div');
      top.className = 'comment-top';

      var authorEl = document.createElement('span');
      authorEl.className = 'comment-author';
      authorEl.textContent = name;

      var payoutEl = document.createElement('span');
      payoutEl.className = 'comment-payout';
      payoutEl.textContent = 'Verified Tester';

      top.appendChild(authorEl);
      top.appendChild(payoutEl);

      var p = document.createElement('p');
      p.className = 'comment-text';
      p.textContent = text;

      var footer = document.createElement('div');
      footer.className = 'comment-footer';

      var timeSpan = document.createElement('span');
      timeSpan.textContent = 'Just now';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'helpful-btn';
      btn.innerHTML = '👍 Helpful (<span class="helpful-num">1</span>)';

      footer.appendChild(timeSpan);
      footer.appendChild(btn);

      body.appendChild(top);
      body.appendChild(p);
      body.appendChild(footer);

      item.appendChild(avatar);
      item.appendChild(body);

      commentsList.insertBefore(item, commentsList.firstChild);

      if (commentCountEl) {
        var cur = parseInt(commentCountEl.textContent, 10) || 3;
        commentCountEl.textContent = String(cur + 1) + ' verified';
      }

      nameInput.value = '';
      textInput.value = '';
    });
  }
})();
