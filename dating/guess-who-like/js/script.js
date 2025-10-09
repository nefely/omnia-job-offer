$(function () {

    const totalYoung = 10; 
    const totalOld = 10;  
    const countPerGroup = 2; 

    const makeRange = n => Array.from({ length: n }, (_, i) => i + 1);
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const youngNumbers = shuffle(makeRange(totalYoung)).slice(0, countPerGroup);
    const oldNumbers = shuffle(makeRange(totalOld)).slice(0, countPerGroup);

    const selectedImages = [
        ...youngNumbers.map(n => `img/model_young/${n}.webp`),
        ...oldNumbers.map(n => `img/model_old/${n}.webp`)
    ];

    shuffle(selectedImages);

    $(".step-1 .item img").each(function(index) {
        $(this).attr("src", selectedImages[index]);
    });

    let click = 1;
    let isPopupActive = false;

    $(".step .item").not(".visisble").on("click", function() {
        if (isPopupActive || $(this).hasClass('visible')) return;

        if (click === 1) {
            isPopupActive = true;
            $(this).addClass("fail visible");
            $('.roll span').text(2);
            setTimeout(() => {
                $(".popup-1").fadeIn(300);
                setTimeout(() => {
                    $(".popup-1").fadeOut(300);
                    click++;
                    isPopupActive = false;
                }, 2500);
            }, 1200);
        }

        if (click === 2) {
            let imgSrc = $(this).find("img").attr("src");
            $(".img-match").attr("src", imgSrc);

            isPopupActive = true;
            $('.roll span').text(1);
            $(this).addClass("success visible");

            const duration = 2000,
                animationEnd = Date.now() + duration,
                defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);

            setTimeout(() => {
                $(".popup-2").fadeIn(300);
                click++;
                // setTimeout(() => {
                //     window.location.href = $("#offer_link").attr("href");
                // }, 7000);
            }, 1200);
        }
    });

    $('.preloader').delay(300).fadeOut(300);
});
