$(function () {
  const textArray = {
    head_title: "Find a genuine connection",
    under_head_title: "Like who you fancy - we'll match the rest",
    under_head_final_title: "Meet someone special",
    title_final: "Congratulations! We've found your perfect match",
    under_title_final: "Based on your preferences, we've matched you with Katie. Her interests are just like yours!",
    final_up_button_text: "Click button to start chat in 2 minute",
    final_under_button_text: "Real people. Real stories. Real love.",
  };

  // Inject texts by data-text
  $("[data-text]").each(function () {
    const key = $(this).data("text");
    if (textArray[key]) $(this).text(textArray[key]);
  });

  // ---- Card data
  const cardsData = [
    { img: "15.webp", name: "Sakura, 28", location: "Sacramento, CA" },
    { img: "14.webp", name: "Hanae, 61",  location: "San Jose, CA" },
    { img: "13.webp", name: "Mika, 27",   location: "Honolulu, HI" },
    { img: "12.webp", name: "Aria, 54",   location: "Denver, CO" },
    { img: "11.webp", name: "Keiko, 30",  location: "Austin, TX" },
    { img: "10.webp", name: "Lin, 26",    location: "Las Vegas, NV" },
    { img: "9.webp",  name: "Naomi, 29",  location: "Portland, OR" },
    { img: "8.webp",  name: "Aya, 27",    location: "Boston, MA" },
    { img: "7.webp",  name: "Emi, 31",    location: "Miami, FL" },
    { img: "6.webp",  name: "Suki, 28",   location: "Houston, TX" },
    { img: "5.webp",  name: "Yumi, 45",   location: "San Diego, CA" },
    { img: "4.webp",  name: "Hana, 32",   location: "New York, NY" },
    { img: "3.webp",  name: "Lily, 35",   location: "Seattle, WA" },
    { img: "2.webp",  name: "Mei, 27",    location: "San Francisco, CA" },
    { img: "1.webp",  name: "Anna, 29",   location: "Austin, TX" },
  ];

  // ---- Elements
  const $colContent   = $(".col-content");
  const $finalBlock   = $(".col-content:last .final");
  const $finalBtns    = $(".col-content:last .final .buttons-container");
  const $deskTitle    = $(".col-content:last .title.desk");
  const $infoBlock    = $(".col-content:last .info");
  const $buttons      = $(".col-content:last .buttons-container").not($finalBtns);
  const $progress     = $(".progress");
  const $progressLine = $(".progress-line");
  const $imgWrap      = $(".img-container");
  const $btnYes       = $(".btn-yes");
  const $btnNo        = $(".btn-no");
  const $nameEl       = $(".info .name[data-text='name'], .info .name").first();
  const $locEl        = $(".info .location-name[data-text='location'], .info .location-name").first();

  // All geo-related display targets (add more selectors if needed)
  const $geoTargets = $("#result_city, #city1, #city2, .info .location-name");

  $finalBlock.hide();

  // IMPORTANT: top card in the DOM is the LAST array element,
  // so we start from the last index.
  let currentIndex = cardsData.length - 1; // <-- start from top-most data item
  let likes = 0;
  let swipeEnabled = false;

  // Indicates if geo requests finished (either success or failure)
  let geoResolved = false;

  // Helper: show/hide all location visuals while geo is pending
  function setLocationVisibility(show) {
    if (show) {
      $geoTargets.show();
    } else {
      $geoTargets.hide();
    }
  }

  // Initially hide locations until geo completes
  setLocationVisibility(false);

  // -------- Stack generation --------
  function buildStack() {
    $imgWrap.empty().css({ position: "relative" });

    // Bottom -> top, last DOM child becomes visually on top
    cardsData.forEach((c, i) => {
      const $card = $(`<img class="swipe-card" src="img/cards/${c.img}" alt="">`);
      $card.css({
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
        willChange: "transform, opacity",
        touchAction: "none"
      });
      $card.attr("data-idx", i);
      $imgWrap.append($card);
    });

    // Ensure index points to the current top item after rebuilds
    currentIndex = getCards().length - 1; // <-- sync with DOM count

    arrangeDepth();
    updateTopInfo();   // Will not reveal location text if geo not resolved
    updateProgress();

    if (window.innerWidth < 991) enableSwipe();
  }

  function getCards() {
    return $imgWrap.children(".swipe-card");
  }

  function topCard() {
    return getCards().last();
  }

  // Stack effect: scale/opacity/zIndex
  function arrangeDepth() {
    const $cards = getCards();
    const n = $cards.length;
    $cards.each(function (i) {
      const $c = $(this);
      const fromTop = n - 1 - i; // 0 — topmost
      const s = 1 - fromTop * 0.02;
      const opacity = 1 - fromTop * 0.08;
      $c.css({
        transform: `scale(${s})`,
        zIndex: 100 + i,
        opacity
      });
    });
  }

  function updateTopInfo() {
    if (currentIndex < 0 || currentIndex >= cardsData.length) return; // <-- guard for empty stack
    const c = cardsData[currentIndex];

    // Always update name
    $nameEl.text(c.name);

    // Update location text only if geo has resolved (otherwise keep hidden)
    if (geoResolved) {
      $locEl.text(c.location || "");
    }
  }

  function updateProgress() {
    // Progress = how many cards processed out of total
    const processed = cardsData.length - (currentIndex + 1); // <-- from 0 to N
    const pct = (processed / cardsData.length) * 100;
    $progressLine.css("width", pct + "%"); // <--
  }

  // -------- Single transition point to next card --------
  function advance($card, liked) {
    if (liked) likes++;
    if ($card && $card.length) $card.remove(); // remove exactly one card

    currentIndex--; // <-- move to the previous array item (next top)

    if (likes >= 3 || currentIndex < 0) { // <-- finish when no cards left
      showFinal();
    } else {
      arrangeDepth();
      updateTopInfo();
      updateProgress();
    }
  }

  function showFinal() {
    disableSwipe();

    $imgWrap.empty().append(
      $('<img src="img/final.jpg" alt="">').css({
        position: "relative",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px"
      })
    );

    $progress.hide();
    $deskTitle.hide();
    $infoBlock.hide();
    $buttons.hide();

    $colContent.css("flex-grow", "1");
    $finalBlock.show().css("display", "flex");

    if (window.innerWidth < 991) {
      $(".col-content.mob").hide();
      $(".col-img").hide();
    }
  }

  // -------- Buttons --------
  $btnYes.on("click", () => flingTop(+1));
  $btnNo.on("click",  () => flingTop(-1));

  function flingTop(dir) {
    const $top = topCard();
    if (!$top.length) return;

    const off = $(window).width() * 0.9;
    const rotate = (dir > 0 ? +18 : -18);
    $top.css({
      transition: "transform .32s ease, opacity .32s ease",
      transform: `translate(${dir * off}px, 0px) rotate(${rotate}deg)`,
      opacity: 0
    });

    setTimeout(() => {
      advance($top, dir > 0);
    }, 300);
  }

  // -------- Swipe (mobile) --------
  let touchBound = false;

  function enableSwipe() {
    if (touchBound) return;
    touchBound = true;
    swipeEnabled = true;

    let startX=0, startY=0, dx=0, dy=0, dragging=false, lastX=0, lastT=0, vx=0;
    const W = $imgWrap.width() || 320;
    const DIST_THRESHOLD = Math.max(60, Math.round(W * 0.22));
    const VELOCITY_THRESHOLD = 0.6;
    const MIN_DRAG = 3;

    $imgWrap.on("touchstart.swipe", ".swipe-card:last-child", function(e){
      if (!swipeEnabled) return;
      dragging = true;
      const t = e.originalEvent.touches[0];
      startX = t.clientX; startY = t.clientY;
      lastX = startX; lastT = performance.now(); vx = 0;
      $(this).css("transition", "");
    });

    $imgWrap.on("touchmove.swipe", ".swipe-card:last-child", function(e){
      if (!dragging || !swipeEnabled) return;
      const t = e.originalEvent.touches[0];
      const now = performance.now();

      dx = t.clientX - startX;
      dy = t.clientY - startY;

      // Ignore vertical gestures
      if (Math.abs(dx) < MIN_DRAG || Math.abs(dx) < Math.abs(dy)) return;

      vx = (t.clientX - lastX) / Math.max(1, (now - lastT));
      lastX = t.clientX; lastT = now;

      const rot = (dx / W) * 12;
      $(this).css("transform", `translate(${dx}px, 0px) rotate(${rot}deg)`);
    });

    $imgWrap.on("touchend.swipe touchcancel.swipe", ".swipe-card:last-child", function(){
      if (!dragging || !swipeEnabled) return;
      dragging = false;

      const $top = $(this);
      if (Math.abs(dx) > DIST_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD) {
        const liked = dx > 0;
        const off = $(window).width() * 0.9;
        $top.css({
          transition: "transform .32s ease, opacity .32s ease",
          transform: `translate(${(liked?+1:-1)*off}px, 0px) rotate(${(liked?+1:-1)*18}deg)`,
          opacity: 0
        });
        setTimeout(() => {
          advance($top, liked);
        }, 300);
      } else {
        $top.css({ transition: "transform .2s ease", transform: "" });
        setTimeout(() => $top.css("transition",""), 200);
      }

      dx = 0; dy = 0; vx = 0;
    });
  }

  function disableSwipe() {
    swipeEnabled = false;
    if (touchBound) {
      $imgWrap.off(".swipe");
      touchBound = false;
    }
  }

  // === GEO → cardsData.location ===

  // Update all cards' location and optionally visible placeholders
  function applyGeoToCards(locationStr) {
    if (locationStr) {
      for (let i = 0; i < cardsData.length; i++) {
        cardsData[i].location = locationStr;
      }
      // Update standalone placeholders too
      $("#result_city").text(locationStr);
      $("#city1").text(locationStr);
      $("#city2").text(locationStr);
    }
    // Mark geo resolved (even if empty) and reveal locations
    geoResolved = true;
    updateTopInfo();          // now writes location text for the current card
    setLocationVisibility(true);
  }

  // Normalize API response to "City, Region" or "City"
  function fmtLocation(city, region) {
    const c = (city || "").trim();
    const r = (region || "").trim();
    if (c && r) return `${c}, ${r}`;
    if (c) return c;
    return ""; // empty means "no override"
  }

  // Resolve city: ipinfo → fallback ipapi.is
  (function resolveCityAndApply() {
    fetch("https://ipinfo.io/json?token=c99eab9ac96553")
      .then((r) => {
        if (!r.ok) throw new Error("ipinfo not ok");
        return r.json();
      })
      .then((data) => {
        const loc = fmtLocation(data.city, data.region); // ipinfo: city, region
        applyGeoToCards(loc);
      })
      .catch(() => {
        fetch("https://api.ipapi.is?key=ee1386e7141cfced")
          .then((r) => {
            if (!r.ok) throw new Error("ipapi not ok");
            return r.json();
          })
          .then((data) => {
            // ipapi.is: location.city, location.region/state
            const loc = fmtLocation(
              data?.location?.city,
              data?.location?.region || data?.location?.state
            );
            applyGeoToCards(loc);
          })
          .catch((e) => {
            console.error("Geo fetch failed:", e);
            // Even on final failure we resolve and show default locations
            applyGeoToCards(""); // keep original cardsData locations
          });
      });
  })();

  // Start
  buildStack();
  $(".preloader").fadeOut(300);
});
