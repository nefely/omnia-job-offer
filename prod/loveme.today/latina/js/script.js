$(document).ready(function(){

    const swiper1 = new Swiper('.top-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        allowTouchMove: false, 
        pagination: false,
        navigation: false, 
        speed: 500
    });

    const swiper2 = new Swiper('.review-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 500,

        navigation: {
            nextEl: '.review-next',
            prevEl: '.review-prev',
        },
        pagination: {
            el: '.review-pagination',
            clickable: true,
        },

        grabCursor: true,
        a11y: {
            enabled: true,
            prevSlideMessage: 'Previous review',
            nextSlideMessage: 'Next review',
        },
    });

})