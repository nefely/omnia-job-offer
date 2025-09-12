// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Dynamic counter animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = "$" + current.toFixed(2);
    }, 16);
}

// Animate payout amounts on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const amounts = entry.target.querySelectorAll(".proof-amount");
            amounts.forEach((amount) => {
                const value = parseFloat(amount.textContent.replace("$", ""));
                amount.textContent = "$0.00";
                animateValue(amount, 0, value, 1000);
            });
            observer.unobserve(entry.target);
        }
    });
});

const proofSection = document.querySelector(".proof-grid");
if (proofSection) observer.observe(proofSection);

window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf("?") + 1));
    let sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};

$(document).ready(function () {

const root = document.querySelector('.proof-grid');
const slidesCount = root.querySelectorAll('.swiper-slide').length; // 15 (не чіпаємо)
const totalBullets = 5; // фіксовано 5 булетів

// --- Масштабування ---
function applyScales(sw) {
  sw.slides.forEach((slide) => {
    const p = Math.abs(slide.progress);
    let scale = 0.9;
    if (p < 0.5) scale = 1.0;       // активний
    else if (p < 1.5) scale = 0.95; // сусіди
    slide.style.transform = `scale(${scale})`;
    slide.style.zIndex = String(100 - Math.round(p * 10));
  });
}

// --- Булети як слайдер ---
function renderBullets(sw) {
  const active = sw.realIndex % totalBullets; // 0..4
  let html = '';
  for (let i = 0; i < totalBullets; i++) {
    const isActive = i === active;
    html += `<span class="swiper-pagination-bullet${isActive ? ' swiper-pagination-bullet-active' : ''}" data-index="${i}"></span>`;
  }
  return `<div class="bullets-track">${html}</div>`;
}

function attachBulletClick(sw) {
  const el = sw.pagination.el;
  el.addEventListener('click', (e) => {
    const b = e.target.closest('.swiper-pagination-bullet');
    if (!b) return;
    const idx = parseInt(b.dataset.index, 10);
    sw.slideToLoop(idx, 500);
  });
}

// --- Swiper ---
const swiper = new Swiper('.proof-grid', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.8,
  spaceBetween: 12,
  speed: 500,
  autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false },

  loopedSlides: slidesCount,
  loopAdditionalSlides: 2,
  watchSlidesProgress: true,
  roundLengths: true,

  pagination: {
    el: '.proof-grid .swiper-pagination',
    clickable: true,
    type: 'custom',
    renderCustom: (sw) => renderBullets(sw),
  },

  breakpoints: {
    768:  { slidesPerView: 2.6, spaceBetween: 12 },
    1024: { slidesPerView: 3.6, spaceBetween: 12 },
    1280: { slidesPerView: 5,   spaceBetween: 12 }
  },

  on: {
    init(sw) {
      sw.pagination.render();
      attachBulletClick(sw);
      applyScales(sw);
    },
    slideChange(sw) { sw.pagination.render(); },
    setTranslate(sw) { applyScales(sw); },
    progress(sw) { applyScales(sw); },
    resize(sw) { sw.update(); applyScales(sw); }
  }
});




    
});
