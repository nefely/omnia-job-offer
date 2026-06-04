$(document).ready(function() {
    $(".slide-1 .btn").click(function() {
        $(".slide-1").fadeOut(300);
        $(".slide-2").delay(300).fadeIn(300);
    });

    $(".slide-2 .question-1 .btn").click(function() {
        $(".slide-2 .question-1").fadeOut(300);
        $(".slide-2 .question-2").delay(300).fadeIn(300);
    });

    $(".slide-2 .question-2 .btn").click(function() {
        $(".slide-2 .question-2").fadeOut(300);
        $(".slide-2 .question-3").delay(300).fadeIn(300);
    });

    $(".slide-2 .question-3 .btn").click(function() {
        $(".slide-2 .quiz").fadeOut(300);
        $(".slide-2 .loading").delay(300).fadeIn(300);

        setTimeout(function() {
            $(".slide-2 .loading").fadeOut(300);
            $(".slide-2 .result").delay(300).fadeIn(300);
            $(".slide-2 .steps").delay(300).fadeIn(300);
        }, 3600);
    });

    let isClicked = false;

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
});