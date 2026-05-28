let reviewsSwiper = null;

function initReviewsSwiper() {
    const isMobile = window.innerWidth < 768;
    const $reviews = $('.reviews');

    if (isMobile) {
        if (reviewsSwiper) {
            reviewsSwiper.destroy(true, true);
            reviewsSwiper = null;
        }
        $reviews.addClass('collapsed');
        return;
    }

    $reviews.removeClass('collapsed');

    if (!reviewsSwiper) {
        reviewsSwiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            centeredSlides: false,
            navigation: {
                nextEl: '.reviews-next',
                prevEl: '.reviews-prev',
            },
        });
    }
}

document.addEventListener('DOMContentLoaded', initReviewsSwiper);


$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`)

window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}   

$('.dynamic-number > span').each(function () {
    const $el = $(this);
    const target = 14173628;

    $({ count: 0 }).animate(
        { 
            count: target 
        },
        {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
                $el.text(Math.floor(now).toLocaleString('en-US'));
            },
            complete: function () {
                $el.text(target.toLocaleString('en-US'));
            }
        }
    );
});


// timer
const startTimer = () => {
    const timerEl = $('.timer-clock');
    if (!timerEl) return;

    let remainingSeconds = 5 * 60;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    timerEl.text(formatTime(remainingSeconds));

    const interval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            timerEl.textContent = "00:00";
            timerEl.text("00:00");

            clearInterval(interval);
            return;
        }

        timerEl.text(formatTime(remainingSeconds));

    }, 1000);
};
startTimer()


$(".screen-1 .hero .btn").click(function(e){
    e.preventDefault();
    $("#agePopup").fadeIn(300);
});

function goToScreen2() {
    $("#agePopup").fadeOut(200, function(){
        $(".screen-1").fadeOut(300, function(){
            $(".screen-2").fadeIn(300);
        });
    });
}

$(".age-popup__over, .age-popup__under").on("click", function(){
    goToScreen2();
});

isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    fbq('track', 'PageView');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});

$('.preloader').delay(300).fadeOut(300);

$('.reviews-show-all').on('click', function() {
    $('.reviews').removeClass('collapsed');
});

// rotate activities every 7 seconds
(function() {
    const $container = $('.acitivities');
    if (!$container.length) return;
    const $items = $container.find('p');
    if ($items.length < 2) return;
    let current = 0;

    setInterval(function() {
        const $current = $items.eq(current);
        current = (current + 1) % $items.length;
        const $next = $items.eq(current);

        $current.fadeOut(400, function() {
            $next.fadeIn(400);
        });
    }, 7000);

    $items.hide();
    $items.eq(0).show();
})();

// test
// $(".screen-1").fadeOut(300, function(){
//     $(".screen-2").fadeIn(300);
// });

})