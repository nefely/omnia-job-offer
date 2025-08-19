$(function() {
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
    { img: "1.webp", name: "Anna, 29",   location: "Austin, TX" },
    { img: "2.webp", name: "Mei, 27",    location: "San Francisco, CA" },
    { img: "3.webp", name: "Lily, 35",   location: "Seattle, WA" },
    { img: "4.webp", name: "Hana, 32",   location: "New York, NY" },
    { img: "5.webp", name: "Yumi, 45",   location: "San Diego, CA" },
    { img: "6.webp", name: "Suki, 28",   location: "Houston, TX" },
    { img: "7.webp", name: "Emi, 31",    location: "Miami, FL" },
    { img: "8.webp", name: "Aya, 27",    location: "Boston, MA" },
    { img: "9.webp", name: "Naomi, 29",  location: "Portland, OR" },
    { img: "10.webp",name: "Lin, 26",    location: "Las Vegas, NV" },
    { img: "11.webp",name: "Keiko, 30",  location: "Austin, TX" },
    { img: "12.webp",name: "Aria, 54",   location: "Denver, CO" },
    { img: "13.webp",name: "Mika, 27",   location: "Honolulu, HI" },
    { img: "14.webp",name: "Hanae, 61",  location: "San Jose, CA" },
    { img: "15.webp",name: "Sakura, 28", location: "Sacramento, CA" }
  ];

  // вставка текстів з textArray
  $("[data-text]").each(function() {
    const key = $(this).data("text");
    if (textArray[key]) $(this).text(textArray[key]);
  });

  // елементи
  const $colContent   = $(".col-content");
  const $finalBlock   = $(".col-content:last .final");
  const $finalbuttonsBlock   = $(".col-content:last .final .buttons-container");
  const $deskTitle    = $(".col-content:last .title.desk");
  const $infoBlock    = $(".col-content:last .info");
  const $buttonsBlock = $(".col-content:last .buttons-container");
  const $progressWrap = $(".progress");
  const $progressLine = $(".progress-line");
  const $imgEl        = $(".img-container img");
  const $nameEl       = $(".info .name[data-text='name'], .info .name").first();
  const $locationEl   = $(".info .location-name[data-text='location'], .info .location-name").first();
  const $btnYes       = $(".btn-yes");
  const $btnNo        = $(".btn-no");

  $finalBlock.hide();

  let currentIndex = 0;
  let likes = 0;
  let swipeEnabled = false;

  function showCard(index) {
    if (index >= cardsData.length) {
      showFinal();
      return;
    }
    const c = cardsData[index];
    $imgEl.attr("src", "img/cards/" + c.img);
    $nameEl.text(c.name);
    $locationEl.text(c.location);

    $progressLine.css("width", ((index + 1) / cardsData.length * 100) + "%");
  }

  function nextCard(liked) {
    if (liked) likes++;
    currentIndex++;
    if (likes >= 3 || currentIndex >= cardsData.length) {
      showFinal();
    } else {
      showCard(currentIndex);
    }
  }

  function showFinal() {
    $imgEl.off(); // зняти всі свайп-ліснери
    $imgEl.attr("src", "img/final.jpg").css({opacity:1, transform:""});
    $progressWrap.hide();
    $deskTitle.hide();
    $infoBlock.hide();
    $buttonsBlock.not($finalbuttonsBlock).hide();
    $colContent.css("flex-grow" , '1');
    $finalBlock.show().css("display" , 'flex');
    swipeEnabled = false;

    // ✅ перевірка на ширину < 991
    if (window.innerWidth < 991) {
        $(".col-content.mob").hide();
        $(".col-img").hide();
    }
  }

  $btnYes.on("click", () => nextCard(true));
  $btnNo.on("click", () => nextCard(false));

  // ✅ swipe тільки якщо ширина < 991
  if (window.innerWidth < 991) {
    enableSwipe($imgEl);
  }

  function enableSwipe($targetImg) {
    swipeEnabled = true;
    let startX=0,startY=0,dx=0,dy=0,dragging=false,lastX=0,lastT=0,vx=0;
    const $wrap = $(".img-container");
    const W = $wrap.width() || 320;
    const DIST_THRESHOLD = Math.max(60, Math.round(W * 0.22));
    const VELOCITY_THRESHOLD = 0.6;
    const MIN_DRAG = 3;


    $targetImg.on("touchstart", function(e){
      if (!swipeEnabled) return;
      dragging = true;
      const t = e.originalEvent.touches[0];
      startX = t.clientX; startY = t.clientY;
      lastX = startX; lastT = performance.now(); vx=0;
    });

    $targetImg.on("touchmove", function(e){
      if (!dragging || !swipeEnabled) return;
      const t = e.originalEvent.touches[0];
      const now = performance.now();
      dx = t.clientX - startX; dy = t.clientY - startY;
      if (Math.abs(dx) < MIN_DRAG && Math.abs(dy) < MIN_DRAG) return;

      vx = (t.clientX - lastX) / Math.max(1, (now - lastT));
      lastX = t.clientX; lastT = now;

      const rot = (dx / W) * 12;
      $targetImg.css("transition","").css("transform",`translate(${dx}px,${dy}px) rotate(${rot}deg)`);

      const p = Math.min(1, Math.abs(dx) / (DIST_THRESHOLD*0.9));
    });

    $targetImg.on("touchend touchcancel", function(){
      if (!dragging || !swipeEnabled) return;
      dragging = false;
      if (Math.abs(dx) > DIST_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD) {
        const liked = dx > 0;
        const off = $(window).width() * 0.9;
        $targetImg.css({
          transition: "transform .32s ease, opacity .32s ease",
          transform: `translate(${(liked?+1:-1)*off}px, ${dy}px) rotate(${(liked?+1:-1)*18}deg)`,
          opacity:0
        });
        setTimeout(() => {
          $targetImg.css({transition:"", transform:"", opacity:""});
          nextCard(liked);
        },300);
      } else {
        $targetImg.css({transition:"transform .2s ease", transform:""});
        setTimeout(()=> $targetImg.css("transition",""),200);
      }
    });
  }

  showCard(currentIndex);
  $(".preloader").fadeOut(300);
});
