$(document).ready(function(){
    $('.reviews').slick({
        fade: true,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 7500,
        prevArrow: "<button class='arrow prev'><i class='fa-solid fa-arrow-left-long'></i></button>",
        nextArrow: "<button class='arrow next'><i class='fa-solid fa-arrow-right-long'></i></button>",
        appendArrows: ".slider-nav",
        appendDots: ".slider-nav"
    })

    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 1750,
            disableOnInteraction: false,
        },
        allowTouchMove: false, 
        pagination: false,
        navigation: false, 
        speed: 750
    });
    
})