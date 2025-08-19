const textArray = {
        head_title: "Find a genuine connection",
        under_head_title: "Like who you fancy - we'll match the rest",
        under_head_final_title: "Meet someone special",
        title_final: "Congratulations! We've found your perfect match",
        under_title_final: "Based on your preferences, we've matched you with Katie. Her interests are just like yours!",
        final_up_button_text: "Click button to start chat in 2 minute",
        final_under_button_text: "Real people. Real stories. Real love.",
    }


document.addEventListener("DOMContentLoaded", () => {
  // ---- дані карток (ти можеш підхоплювати їх з іншого файлу; тут – приклад) ----
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

  // ---- 1) підставляємо всі тексти з textArray у data-text елементи ----
  // очікуємо, що textArray був оголошений до цього скрипту або прямо тут
  if (typeof textArray === "object" && textArray) {
    document.querySelectorAll("[data-text]").forEach(el => {
      const key = el.getAttribute("data-text");
      if (key in textArray) {
        el.textContent = textArray[key];
      }
    });
  }

  // ---- селектори ----
  const rowBlock     = document.querySelector(".row");       // обгортка двох колонок
  const finalBlock   = document.querySelector(".final");     // готовий фінальний блок з твого ленда
  const imgEl        = document.querySelector(".img-container img");
  const nameEl       = document.querySelector('.info .name[data-text="name"]') || document.querySelector(".info .name");
  const locationEl   = document.querySelector('.info .location-name[data-text="location"]') || document.querySelector(".info .location-name");
  const btnYes       = document.querySelector(".btn-yes");
  const btnNo        = document.querySelector(".btn-no");
  const progressLine = document.querySelector(".progress-line");
  const mediaTouch   = window.matchMedia("(hover: none), (pointer: coarse)"); // мобілка/тач

  // спочатку приховати фінал
  if (finalBlock) finalBlock.style.display = "none";

  let currentIndex = 0;
  let likes = 0;

  // ---- показ однієї картки ----
  function showCard(index) {
    if (index >= cardsData.length) {
      showFinal();
      return;
    }
    const c = cardsData[index];
    if (imgEl)  imgEl.src = `img/cards/${c.img}`;
    if (nameEl) nameEl.textContent = c.name;
    if (locationEl) locationEl.textContent = c.location;

    if (progressLine) {
      progressLine.style.width = `${((index + 1) / cardsData.length) * 100}%`;
    }
  }

  // ---- після взаємодії ----
  function nextCard(liked) {
    if (liked) likes++;
    currentIndex++;
    if (likes >= 3) {
      showFinal();
    } else {
      showCard(currentIndex);
    }
  }

  // ---- фінальний екран (використовуємо твій .final) ----
  function showFinal() {
    if (rowBlock) rowBlock.style.display = "none";
    if (finalBlock) finalBlock.style.display = "block";
  }

  // ---- кнопки: десктоп + мобілка ----
  btnYes?.addEventListener("click", () => nextCard(true));
  btnNo?.addEventListener("click", () => nextCard(false));

  // ---- 2) свайп з анімацією з 1-го ленда (тільки на мобілці) ----
  if (mediaTouch.matches && imgEl) {
    // створимо бейджі LIKE/NOPE поверх зображення (опційно; прибери якщо не треба)
    const likeBadge = document.createElement("div");
    const nopeBadge = document.createElement("div");
    likeBadge.className = "badge like";
    nopeBadge.className = "badge nope";
    likeBadge.textContent = "LIKE";
    nopeBadge.textContent = "NOPE";
    // позиціонування спирається на відносність .img-container
    const imgWrap = document.querySelector(".img-container");
    imgWrap.style.position = imgWrap.style.position || "relative";
    Object.assign(likeBadge.style,  {position:"absolute", top:"12px", left:"12px",  opacity:"0", transition:"opacity .12s"});
    Object.assign(nopeBadge.style,  {position:"absolute", top:"12px", right:"12px", opacity:"0", transition:"opacity .12s"});
    imgWrap.append(likeBadge, nopeBadge);

    let startX=0,startY=0,dx=0,dy=0,dragging=false;
    let lastX=0,lastT=0,vx=0;

    const W = imgWrap.clientWidth || 320;
    const DIST_THRESHOLD = Math.max(60, Math.round(W * 0.22)); // ~22% ширини
    const VELOCITY_THRESHOLD = 0.6; // px/ms
    const MIN_DRAG = 3;

    const onDown = (e) => {
      dragging = true;
      const t = e.touches ? e.touches[0] : e;
      startX = t.clientX; startY = t.clientY;
      lastX = startX; lastT = performance.now(); vx = 0;
      likeBadge.style.opacity = 0; nopeBadge.style.opacity = 0;
      // вимкнути нативний drag/select
      e.preventDefault?.();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const t = e.touches ? e.touches[0] : e;
      const now = performance.now();
      dx = t.clientX - startX;
      dy = t.clientY - startY;
      if (Math.abs(dx) < MIN_DRAG && Math.abs(dy) < MIN_DRAG) return;

      vx = (t.clientX - lastX) / Math.max(1, (now - lastT));
      lastX = t.clientX; lastT = now;

      const rot = (dx / W) * 12; // градуси
      // Анімація застосовується до КАРТИНКИ (можеш замінити на контейнер)
      imgEl.style.transition = ""; // забрати інерцію
      imgEl.style.transform  = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      // бейджі
      const p = Math.min(1, Math.abs(dx) / (DIST_THRESHOLD * 0.9));
      if (dx > 0) { likeBadge.style.opacity = p; nopeBadge.style.opacity = 0; }
      else        { nopeBadge.style.opacity = p; likeBadge.style.opacity = 0; }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;

      if (Math.abs(dx) > DIST_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD) {
        // флітамо за межі екрана
        fling(dx > 0 ? +1 : -1, dy);
      } else {
        // повернення на місце
        imgEl.style.transition = "transform .2s ease";
        imgEl.style.transform  = "";
        likeBadge.style.opacity = 0; nopeBadge.style.opacity = 0;
        setTimeout(() => (imgEl.style.transition = ""), 200);
      }
    };

    function fling(dir, dyVal) {
      const off = Math.max(window.innerWidth, document.documentElement.clientWidth) * 0.9;
      imgEl.style.transition = "transform .32s ease, opacity .32s ease";
      imgEl.style.transform  = `translate(${dir * off}px, ${dyVal}px) rotate(${dir * 18}deg)`;
      imgEl.style.opacity    = 0;

      // після анімації – перейти до наступної картки
      setTimeout(() => {
        // скинути стилі
        imgEl.style.transition = "";
        imgEl.style.transform  = "";
        imgEl.style.opacity    = "";
        likeBadge.style.opacity = 0; nopeBadge.style.opacity = 0;
        nextCard(dir === +1);
      }, 300);
    }

    // touch events (свайп тільки на мобілці)
    imgEl.addEventListener("touchstart", onDown, {passive:false});
    imgEl.addEventListener("touchmove",  onMove,  {passive:false});
    imgEl.addEventListener("touchend",   onUp);
    imgEl.addEventListener("touchcancel",onUp);
  }

  // старт
  showCard(currentIndex);

  // дрібний UX: приховати прелоадер, якщо є
  const preloader = document.querySelector(".preloader");
  if (preloader) setTimeout(() => preloader.style.display = "none", 300);
});
