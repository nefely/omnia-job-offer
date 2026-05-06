$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`)



$('.btn-popup').on('click', function() {
    $('.popup').fadeIn(300);
});

$(document).on('click', function(e) {
    if (!$(e.target).closest('.popup-container').length && !$(e.target).closest('.btn-popup').length) {
        $('.popup').fadeOut(300);
    }
});


// timer
const startTimer = () => {
    const timerEl = $('.clock');
    if (!timerEl) return;

    let remainingSeconds = 15 * 60;

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


isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    snaptr('track', 'VIEW_CONTENT');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});

$('.preloader').delay(300).fadeOut(300);

// test
// $(".screen-1").fadeOut(300, function(){
//     $(".screen-2").fadeIn(300);
// });

})