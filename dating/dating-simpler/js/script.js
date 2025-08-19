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

  const cardsData = [
    { img: "1.webp",  name: "Anna, 29",   location: "Austin, TX" },
    { img: "2.webp",  name: "Mei, 27",    location: "San Francisco, CA" },
    { img: "3.webp",  name: "Lily, 35",   location: "Seattle, WA" },
    { img: "4.webp",  name: "Hana, 32",   location: "New York, NY" },
    { img: "5.webp",  name: "Yumi, 45",   location: "San Diego, CA" },
    { img: "6.webp",  name: "Suki, 28",   location: "Houston, TX" },
    { img: "7.webp",  name: "Emi, 31",    location: "Miami, FL" },
    { img: "8.webp",  name: "Aya, 27",    location: "Boston, MA" },
    { img: "9.webp",  name: "Naomi, 29",  location: "Portland, OR" },
    { img: "10.webp", name: "Lin, 26",    location: "Las Vegas, NV" },
    { img: "11.webp", name: "Keiko, 30",  location: "Austin, TX" },
    { img: "12.webp", name: "Aria, 54",   location: "Denver, CO" },
    { img: "13.webp", name: "Mika, 27",   location: "Honolulu, HI" },
    { img: "14.webp", name: "Hanae, 61",  location: "San Jose, CA" },
    { img: "15.webp", name: "Sakura, 28", location: "Sacramento, CA" }
  ];

  // Підставляємо тексти по data-text
  $("[data-text]").each(function () {
    const key = $(this).data("text");
    if (textArray[key]) $(this).text(textArray[key]);
  });

  // Елементи
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

  $finalBlock.hide();

  let currentIndex = 0;   // індекс верхньої картки (за даними)
  let likes = 0;
  let swipeEnabled = false;

  // -------- ГЕНЕРАЦІЯ СТОПКИ КАРТОК --------
  function buildStack() {
    $imgWrap.empty().css({ position: "relative" });

    // Знизу -> догори, останній DOM-елемент буде верхнім
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

    arrangeDepth();
    updateTopInfo();
    updateProgress();

    if (window.innerWidth < 991) enableSwipe();
  }

  function getCards() {
    return $imgWrap.children(".swipe-card");
  }

  function topCard() {
    return getCards().last();
  }

  // Стек-ефект: масштаб/прозорість/шари
  function arrangeDepth() {
    const $cards = getCards();
    const n = $cards.length;
    $cards.each(function (i) {
      const $c = $(this);
      const fromTop = n - 1 - i; // 0 — верхня
      const s = 1 - fromTop * 0.02;
      const opacity = 1 - fromTop * 0.08;
      $c.css({
        transform: `scale(${s})`,
        zIndex: 100 + i,
        opacity: opacity
      });
    });
  }

  function updateTopInfo() {
    if (currentIndex >= cardsData.length) return;
    const c = cardsData[currentIndex];
    $nameEl.text(c.name);
    $locEl.text(c.location);
  }

  function updateProgress() {
    const value = Math.min(currentIndex + 1, cardsData.length);
    $progressLine.css("width", (value / cardsData.length * 100) + "%");
  }

  // -------- ЄДИНА ТОЧКА ПЕРЕХОДУ ДО НАСТУПНОЇ КАРТКИ --------
  function advance($card, liked) {
    if (liked) likes++;

    if ($card && $card.length) $card.remove(); // видаляємо РІВНО одну картку

    currentIndex++;

    if (likes >= 3 || currentIndex >= cardsData.length) {
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

  // -------- КНОПКИ --------
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

    // Ніяких remove тут - лише після анімації
    setTimeout(() => {
      advance($top, dir > 0);
    }, 300);
  }

  // -------- СВАЙП (моб) --------
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

      // Ігноруємо вертикальні жести
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

      // скидаємо дельти
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

  // Старт
  buildStack();
  $(".preloader").fadeOut(300);
});
