/**
 * app-convert-flow-v2 — vanilla JS only (no jQuery / Swiper)
 */
(function () {
  "use strict";

  var TIMER_START = 5 * 60;
  var ANALYSIS_DURATION_MS = 6300;
  var URGENT_THRESHOLD = 90;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function initHeroEarnings() {
    var number = $("#hero-earnings");
    if (!number || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    number.textContent = "1";
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / 2500, 1);
      number.textContent = String(1 + Math.floor(progress * 40));
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function setDomainText() {
    var host = location.hostname.replace(/^www\./i, "");
    $all(".domain").forEach(function (el) {
      el.textContent = host;
    });
    var email = "contact@" + host;
    $all("[data-contact-link]").forEach(function (link) {
      link.href = "mailto:" + email;
      link.title = email;
    });
  }

  /* ---- Timers (all .timer-clock share same countdown) ---- */
  var timerInterval = null;
  var remainingSeconds = TIMER_START;

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function updateTimerUrgent() {
    var urgent = remainingSeconds <= URGENT_THRESHOLD && remainingSeconds > 0;
    var bar = $(".timer-bar");
    if (bar) bar.classList.toggle("urgent", urgent);
    $all(".timer-final-wrap").forEach(function (el) {
      el.classList.toggle("urgent", urgent);
    });
  }

  function tickTimers() {
    var label = formatTime(Math.max(0, remainingSeconds));
    $all(".timer-clock").forEach(function (el) {
      el.textContent = label;
    });
    updateTimerUrgent();

    if (remainingSeconds <= 0) {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startGlobalTimer() {
    if (timerInterval) return;
    remainingSeconds = TIMER_START;
    tickTimers();
    timerInterval = setInterval(function () {
      remainingSeconds--;
      tickTimers();
    }, 1000);
  }

  /* ---- Stats counter (IntersectionObserver) — skips if unreplaced [PLACEHOLDERS] ---- */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function initStatCountersFixed() {
    var cards = $all(".stat-num[data-count-type]");
    if (!cards.length || !("IntersectionObserver" in window)) return;
    if (/\[[A-Z_][A-Z_0-9]+\]/.test(cards[0].textContent)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.dataset.animated) return;
          el.dataset.animated = "1";
          var type = el.getAttribute("data-count-type");

          if (type === "users") {
            runNumberAnim(el, 0, 60, 1500, function (v) {
              el.textContent = Math.round(v) + "M+";
            });
          } else if (type === "money") {
            runNumberAnim(el, 0, 67, 1500, function (v) {
              el.textContent = "$" + Math.round(v) + "M+";
            });
          } else if (type === "rating") {
            runNumberAnim(el, 0, 4.6, 1200, function (v) {
              el.textContent = v.toFixed(1) + " / 5";
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach(function (c) {
      io.observe(c);
    });
  }

  function runNumberAnim(el, from, to, dur, format) {
    var start = performance.now();
    function frame(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = easeOutCubic(t);
      var v = from + (to - from) * eased;
      format(v);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---- Reviews carousels (landing + final): prev/next + scroll state ---- */
  function initReviewsNav() {
    var wraps = $all(".landing-reviews, .final-reviews");
    if (!wraps.length) return;

    var updaters = [];

    wraps.forEach(function (wrap) {
      var scroller = $(".reviews-scroller", wrap);
      var prev = $(".reviews-prev", wrap);
      var next = $(".reviews-next", wrap);
      if (!scroller || !prev || !next) return;

      function updateDisabled() {
        var overflow = scroller.scrollWidth - scroller.clientWidth;
        if (overflow <= 1) {
          prev.disabled = true;
          next.disabled = true;
          return;
        }
        var max = overflow;
        prev.disabled = scroller.scrollLeft <= 2;
        next.disabled = scroller.scrollLeft >= max - 2;
      }

      updaters.push(updateDisabled);

      scroller.addEventListener(
        "scroll",
        function () {
          requestAnimationFrame(updateDisabled);
        },
        { passive: true }
      );

      prev.addEventListener("click", function () {
        scroller.scrollBy({ left: -scroller.clientWidth * 0.85, behavior: "smooth" });
      });
      next.addEventListener("click", function () {
        scroller.scrollBy({ left: scroller.clientWidth * 0.85, behavior: "smooth" });
      });

      if (typeof ResizeObserver !== "undefined") {
        var ro = new ResizeObserver(function () {
          requestAnimationFrame(updateDisabled);
        });
        ro.observe(scroller);
        ro.observe(wrap);
      }

      requestAnimationFrame(updateDisabled);
    });

    if (updaters.length) {
      window.addEventListener(
        "resize",
        function () {
          updaters.forEach(function (fn) {
            requestAnimationFrame(fn);
          });
        },
        { passive: true }
      );
    }
  }

  /* ---- Modals ---- */
  function initModals() {
    $all(".open-modal").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = btn.getAttribute("data-target");
        var modal = id && document.getElementById(id);
        if (modal) {
          modal.classList.add("is-open");
          document.body.classList.add("quiz-lock");
        }
      });
    });

    function closeModal(modal) {
      modal.classList.remove("is-open");
      if (!$all(".modal-overlay.is-open").length) {
        document.body.classList.remove("quiz-lock");
      }
    }

    $all(".modal-close").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = btn.closest(".modal-overlay");
        if (modal) closeModal(modal);
      });
    });

    $all(".modal-overlay").forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal(overlay);
      });
    });
  }

  /* ---- Notifications (6 templates) ---- */
  function initNotifications() {
    var textEl = $("#activity-text");
    if (!textEl) return;
    // Illustrative payout records with fictional first names, identified by the visible strip label.
    var names = ["Ryan", "Marcus", "Nicole", "Hannah", "Sarah", "Mike", "Lauren", "Chris", "Emily", "Josh"];
    var examples = ["💰 {name} — a $43 payout to PayPal", "🎮 {name} — a $25 game milestone reward", "💸 {name} — a $52 payout to a bank account"];
    var index = 0;
    var previousName = -1;
    function renderExample() {
      var nameIndex = Math.floor(Math.random() * names.length);
      if (nameIndex === previousName) nameIndex = (nameIndex + 1) % names.length;
      previousName = nameIndex;
      var message = examples[index].replace("{name}", names[nameIndex]);
      textEl.textContent = window.EarnoraCurrency ? window.EarnoraCurrency.format(message) : message;
    }
    renderExample();
    setInterval(function () {
      textEl.style.opacity = "0";
      setTimeout(function () {
        index = (index + 1) % examples.length;
        renderExample();
        textEl.style.opacity = "1";
      }, 220);
    }, 6500);
  }

  /* ---- Gentle synthesized feedback for the two quiz milestones ---- */
  var soundContext = null;
  var soundMaster = null;
  var soundMuted = false;

  function unlockSound() {
    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!soundContext) {
        soundContext = new AudioContextClass();
        soundMaster = soundContext.createGain();
        soundMaster.gain.value = soundMuted ? 0 : 1;
        soundMaster.connect(soundContext.destination);
      }
      if (soundContext.state === "suspended") soundContext.resume().catch(function () {});
    } catch (_) {
      soundContext = null;
    }
  }

  function playTone(frequency, delay, duration, volume, type) {
    if (!soundContext || soundContext.state !== "running") return;
    var start = soundContext.currentTime + delay;
    var oscillator = soundContext.createOscillator();
    var envelope = soundContext.createGain();
    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(volume, start + 0.018);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope);
    envelope.connect(soundMaster || soundContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
    oscillator.onended = function () {
      oscillator.disconnect();
      envelope.disconnect();
    };
  }

  function playProcessingSound() {
    if (!soundContext || soundContext.state !== "running" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = soundContext;
    var start = ctx.currentTime;
    var timeScale = ANALYSIS_DURATION_MS / 4300;
    var destination = soundMaster || ctx.destination;
    var nodes = [];
    function connectEnvelope(source, gain, time, duration, level) {
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(level, time + Math.min(0.06, duration * 0.2));
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      source.connect(gain); gain.connect(destination);
      nodes.push(source, gain);
      source.start(time); source.stop(time + duration + 0.02);
    }

    // Soft pulsing undercurrent: a low carrier with slow frequency modulation.
    var carrier = ctx.createOscillator();
    var carrierGain = ctx.createGain();
    var modulator = ctx.createOscillator();
    var modulationDepth = ctx.createGain();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(190, start);
    carrier.frequency.exponentialRampToValueAtTime(290, start + 3.8 * timeScale);
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(5, start);
    modulator.frequency.linearRampToValueAtTime(9, start + 3.8 * timeScale);
    modulationDepth.gain.value = 22;
    modulator.connect(modulationDepth); modulationDepth.connect(carrier.frequency);
    modulator.start(start); modulator.stop(start + 4.05 * timeScale);
    nodes.push(modulator, modulationDepth);
    connectEnvelope(carrier, carrierGain, start, 4.05 * timeScale, 0.022);

    // Airy band-limited scan texture, with no sharp broadband hiss.
    var length = Math.ceil(ctx.sampleRate * 4.1 * timeScale);
    var buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    var noise = ctx.createBufferSource(); noise.buffer = buffer;
    var filter = ctx.createBiquadFilter(); filter.type = "bandpass"; filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(420, start);
    filter.frequency.exponentialRampToValueAtTime(1700, start + 2.2 * timeScale);
    filter.frequency.exponentialRampToValueAtTime(650, start + 4.05 * timeScale);
    var airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.0001, start);
    airGain.gain.exponentialRampToValueAtTime(0.018, start + 0.35 * timeScale);
    airGain.gain.exponentialRampToValueAtTime(0.0001, start + 4.05 * timeScale);
    noise.connect(filter); filter.connect(airGain); airGain.connect(destination);
    noise.start(start); noise.stop(start + 4.1 * timeScale); nodes.push(noise, filter, airGain);

    // Radar-like chirps get closer together as matching approaches completion.
    [0.18, 0.82, 1.47, 2.05, 2.58, 3.04, 3.43, 3.78].forEach(function (delay, index) {
      delay *= timeScale;
      var time = start + delay;
      var chirp = ctx.createOscillator(); var gain = ctx.createGain();
      chirp.type = "sine";
      chirp.frequency.setValueAtTime(980 + index * 65, time);
      chirp.frequency.exponentialRampToValueAtTime(550 + index * 40, time + 0.15);
      connectEnvelope(chirp, gain, time, 0.21, 0.028);
      // A tiny high-frequency tick gives each scan pass a crisp digital edge.
      playTone(1900 + index * 90, delay + 0.025, 0.035, 0.005, "sine");
    });

    // A short, calm lock-on confirmation, aligned with the 100% reveal.
    playTone(880, 4.1 * timeScale, 0.19, 0.025, "sine");
    playTone(1320, 4.18 * timeScale, 0.19, 0.018, "sine");
    noise.onended = function () { nodes.forEach(function (node) { try { node.disconnect(); } catch (_) {} }); };
  }

  function initSoundControl() {
    var button = $("#scan-audio");
    if (!button) return;
    button.addEventListener("click", function () {
      soundMuted = !soundMuted;
      button.setAttribute("aria-pressed", soundMuted ? "true" : "false");
      button.setAttribute("aria-label", soundMuted ? "Enable scanning sound" : "Mute scanning sound");
      button.textContent = soundMuted ? "♫ Sound off" : "♫ Sound on";
      if (soundMaster && soundContext) soundMaster.gain.setValueAtTime(soundMuted ? 0 : 1, soundContext.currentTime);
    });
  }

  function playConfettiSound() {
    [523, 659, 784, 1047].forEach(function (note, index) {
      playTone(note, index * 0.105, 0.31, 0.028, "triangle");
    });
    playTone(1047, 0.43, 0.52, 0.018, "sine");
  }

  /* ---- Quiz flow ---- */
  function initQuiz() {
    var landing = $("#landing");
    var overlay = $("#quiz-overlay");
    var finalSec = $(".final-section");
    var hero = $(".hero-section");
    var how = $(".how-it-works");
    var trust = $(".trust-section");
    var invite = $(".quiz-invite");
    if (!landing || !overlay) return;

    var progressFill = $(".progress-fill");
    var progressLabel = $(".progress-step-label");
    var panels = $all(".quiz-panel");
    var questionCount = panels.length - 1;
    var totalLabel = $(".progress-total");
    if (totalLabel) totalLabel.textContent = String(questionCount);
    var questionLocked = false;
    var procAnimToken = 0;
    var procTimeoutIds = [];
    var procRingCirc = 301.59;

    function clearProcTimeouts() {
      procTimeoutIds.forEach(function (id) {
        clearTimeout(id);
      });
      procTimeoutIds = [];
    }

    function resetProcessingVisuals() {
      var arc = $("#proc-ring-arc");
      var pctEl = $("#proc-percentage");
      if (arc) arc.style.strokeDashoffset = String(procRingCirc);
      if (pctEl) pctEl.textContent = "0%";
      $all(".processing-line").forEach(function (l) {
        l.classList.remove("is-visible", "is-done");
      });
    }

    function setProgress(pct, labelNum) {
      if (progressFill) progressFill.style.width = pct + "%";
      if (progressLabel) progressLabel.textContent = String(labelNum);
    }

    function showPanel(index) {
      questionLocked = false;
      var isProcessing = index === questionCount;
      panels.forEach(function (p, i) {
        p.classList.toggle("is-active", i === index);
      });
      var preview = $(".quiz-app-preview");
      if (preview) {
        preview.classList.toggle("quiz-app-preview--hidden", isProcessing);
      }
      var intro = $("#quiz-intro");
      if (intro) {
        intro.classList.toggle("quiz-intro--hidden", isProcessing);
        intro.setAttribute("aria-hidden", isProcessing ? "true" : "false");
      }
      var progressEl = $("#quiz-progress");
      if (progressEl) {
        progressEl.classList.toggle("quiz-progress--hidden", isProcessing);
        progressEl.setAttribute("aria-hidden", isProcessing ? "true" : "false");
      }
      var inner = $("#quiz-inner");
      if (inner) {
        inner.classList.toggle("quiz-inner--processing", isProcessing);
      }
    }

    function openQuiz() {
      procAnimToken++;
      clearProcTimeouts();
      resetProcessingVisuals();
      landing.classList.add("landing-hidden");
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("quiz-lock");
      setProgress(0, 1);
      showPanel(0);
      var pw = $(".processing-wrap");
      if (pw) pw.style.display = "";
      var pr = $(".proc-result");
      if (pr) pr.classList.remove("is-visible");
      $all(".quiz-panel .opt-btn").forEach(function (b) {
        b.classList.remove("is-selected");
      });
      window.scrollTo(0, 0);
    }

    $all(".start-quiz").forEach(function (btn) {
      btn.addEventListener("click", function () {
        unlockSound();
        openQuiz();
      });
    });

    function goNextFromQuestion(qIndex) {
      if (qIndex >= questionCount - 1) {
        runProcessing();
        return;
      }
      setProgress((qIndex + 1) * 100 / questionCount, qIndex + 2);
      showPanel(qIndex + 1);
    }

    function bindQuestion(qIndex) {
      var panel = panels[qIndex];
      if (!panel) return;
      $all(".opt-btn", panel).forEach(function (btn) {
        btn.addEventListener("click", function () {
          unlockSound();
          if (questionLocked || btn.classList.contains("is-selected")) return;
          questionLocked = true;
          $all(".opt-btn", panel).forEach(function (b) {
            b.classList.remove("is-selected");
          });
          btn.classList.add("is-selected");
          setTimeout(function () {
            goNextFromQuestion(qIndex);
          }, 450);
        });
      });
    }

    for (var questionIndex = 0; questionIndex < questionCount; questionIndex++) bindQuestion(questionIndex);

    function runProcessing() {
      procAnimToken++;
      clearProcTimeouts();
      var myToken = procAnimToken;
      var pw = $(".processing-wrap");
      var pr = $(".proc-result");
      if (pw) pw.style.display = "";
      if (pr) pr.classList.remove("is-visible");
      resetProcessingVisuals();
      setProgress(100, questionCount);
      showPanel(questionCount);
      playProcessingSound();

      var arc = $("#proc-ring-arc");
      if (arc) {
        var dash = arc.getAttribute("stroke-dasharray");
        if (dash) procRingCirc = parseFloat(dash) || procRingCirc;
      }

      var start = performance.now();
      var duration = ANALYSIS_DURATION_MS;
      function tickRing(now) {
        if (myToken !== procAnimToken) return;
        var elapsed = now - start;
        var t = Math.min(elapsed / duration, 1);
        var pct = Math.round(t * 100);
        var pctEl = $("#proc-percentage");
        if (pctEl) pctEl.textContent = pct + "%";
        if (arc) arc.style.strokeDashoffset = String(procRingCirc * (1 - t));
        if (t < 1) requestAnimationFrame(tickRing);
      }
      requestAnimationFrame(tickRing);

      var lines = $all(".processing-line");
      procTimeoutIds.push(
        setTimeout(function () {
          if (myToken !== procAnimToken) return;
          lines[0] && lines[0].classList.add("is-visible");
        }, 200)
      );
      procTimeoutIds.push(
        setTimeout(function () {
          if (myToken !== procAnimToken) return;
          lines[0] && lines[0].classList.add("is-done");
          lines[1] && lines[1].classList.add("is-visible");
        }, 1900)
      );
      procTimeoutIds.push(
        setTimeout(function () {
          if (myToken !== procAnimToken) return;
          lines[1] && lines[1].classList.add("is-done");
          lines[2] && lines[2].classList.add("is-visible");
        }, 4000)
      );
      procTimeoutIds.push(
        setTimeout(function () {
          if (myToken !== procAnimToken) return;
          lines[2] && lines[2].classList.add("is-done");
        }, 6100)
      );

      procTimeoutIds.push(setTimeout(function () {
        if (myToken !== procAnimToken) return;
        showFinalScreen();
      }, duration));
    }

    function showFinalScreen() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("quiz-lock");
      landing.classList.remove("landing-hidden");
      window.scrollTo(0, 0);

      if (hero) hero.style.display = "none";
      if (how) how.style.display = "none";
      if (trust) trust.style.display = "none";
      if (invite) invite.style.display = "none";
      var landingReviews = $(".landing-reviews");
      if (landingReviews) landingReviews.style.display = "none";
      var activityStrip = $("#activity-strip");
      if (activityStrip) activityStrip.style.display = "none";

      if (window.renderEarnoraResults) window.renderEarnoraResults();
      if (finalSec) finalSec.style.display = "block";
      if (window.playEarnoraResultsIntro) window.playEarnoraResultsIntro();
      playConfettiSound();

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          window.dispatchEvent(new Event("resize"));
        });
      });
    }
  }

  /* ---- Confetti (lightweight, auto-stop) ---- */
  function runConfetti() {
    var canvas = $("#confettiCanvas");
    if (!canvas) return;
    canvas.classList.remove("landing-hidden");
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    var N = 52;
    var pieces = [];
    var colors = ["#24d071", "#f5c518", "#4ade80", "#22d3ee", "#a78bfa"];

    function rnd(a, b) {
      return a + Math.random() * (b - a);
    }

    for (var i = 0; i < N; i++) {
      pieces.push({
        x: rnd(0, w),
        y: rnd(-h, 0),
        s: rnd(5, 9),
        vy: rnd(1.2, 2.8),
        vx: rnd(-0.8, 0.8),
        rot: rnd(0, Math.PI * 2),
        vr: rnd(-0.06, 0.06),
        c: colors[(Math.random() * colors.length) | 0]
      });
    }

    var start = performance.now();
    var maxMs = 2600;

    function loop(now) {
      if (now - start > maxMs) {
        canvas.classList.add("landing-hidden");
        return;
      }
      ctx.clearRect(0, 0, w, h);
      pieces.forEach(function (p) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(now * 0.002 + p.s) * 0.3;
        p.rot += p.vr;
        if (p.y > h + 12) {
          p.y = -10;
          p.x = rnd(0, w);
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        ctx.restore();
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---- Game cards (quiz overlay) ---- */
  function initGameCards() {
    var cards = $all(".quiz-game-item");
    var modal = $("#game-info-modal");
    var modalImg = $("#game-modal-img");
    var modalEarnAmt = $("#game-modal-earn-amt");
    var modalClose = $("#game-modal-close");
    var modalCta = $("#game-modal-cta");
    if (!cards.length || !modal) return;

    function openGameModal(card) {
      var thumb = $(".quiz-game-thumb", card);
      if (modalImg) {
        modalImg.src = thumb ? thumb.src : "";
        modalImg.alt = thumb ? thumb.alt : "";
      }
      if (modalEarnAmt) modalEarnAmt.textContent = card.getAttribute("data-earn");
      modal.classList.add("is-open");
    }

    function closeGameModal() {
      modal.classList.remove("is-open");
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function () { openGameModal(card); });
    });

    if (modalClose) modalClose.addEventListener("click", closeGameModal);
    if (modalCta) modalCta.addEventListener("click", closeGameModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeGameModal();
    });
  }

  onReady(function () {

    setDomainText();
    startGlobalTimer();


    initReviewsNav();
    initModals();
    initNotifications();

    initSoundControl();
    initQuiz();
    initGameCards();
  });
})();
