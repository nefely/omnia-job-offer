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
window.addEventListener('resize', initReviewsSwiper);


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

$(".screen-1 .hero .btn").click(function(e){
    e.preventDefault();
     $(".screen-1").fadeOut(0);
     $(".screen-2").fadeIn(300);
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


// spinner
(function () {
    let spinCount = 0;
    let isSpinning = false;
    let currentRotation = 0;

    // [rotations * 360 + extra_degrees] per spin — predetermined outcome
    const SPIN_DATA = [
        { extra: 5 * 360 + 105  },   // spin 1 → lose
        { extra: 6 * 360 + 150 },   // spin 2 → lose
        { extra: 5 * 360 + 415 },   // spin 3 → win
    ];

    const $wheel       = $('.spinner-wheel img');
    const $button      = $('.spinner-button');
    const $spinNowBtn  = $('#spinNowBtn');

    function updateChancesDisplay() {
        $('.remainingChances').text(3 - spinCount);
    }

    function lockBtn() {
        $spinNowBtn.prop('disabled', true).addClass('disabled');
    }

    function unlockBtn() {
        $spinNowBtn.prop('disabled', false).removeClass('disabled');
    }

    $button.on('click', function () {
        if (isSpinning || spinCount >= 3) return;

        isSpinning = true;
        lockBtn();
        $spinNowBtn.remove();
        $button.removeClass('btn-blink').css('pointer-events', 'none');

        const idx  = spinCount;
        spinCount++;
        const isWin = spinCount === 3;

        currentRotation += SPIN_DATA[idx].extra;

        $wheel.css({
            transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
            transform:  'rotate(' + currentRotation + 'deg)',
        });

        setTimeout(function () {
            isSpinning = false;
            updateChancesDisplay();

            if (isWin) {
                $('#winPopup').delay(500).fadeIn(300);
            } else {
                unlockBtn();
                $('#losePopup').delay(500).fadeIn(300);
            }
        }, 4300);
    });

    // "Try again" closes lose popup and immediately spins
    $('#losePopup .popup__over').on('click', function () {
        $('#losePopup').fadeOut(300, function () {
            $button.css('pointer-events', '');
            $button.trigger('click');
        });
    });

    updateChancesDisplay();
})();

})