$(document).ready(function(){
    $(".accordion-toggle").click(function(){
        $(this).toggleClass("collapsed")
        $(this).next(".panel-collapse").toggleClass("show")
    })

    $(".sub-menu a").click(function(e){
        e.preventDefault()

        if ($(this).attr("data-rank") == 1) {
            console.log(1)
            scrollToAnchor('block_1');
        }
        if ($(this).attr("data-rank") == 2) {
            scrollToAnchor('block_2');
        }
        if ($(this).attr("data-rank") == 3) {
            scrollToAnchor('block_3');
        }
        if ($(this).attr("data-rank") == 4) {
            scrollToAnchor('block_4');
        }
    })

    function scrollToAnchor(aid){
        var aTag = $(`#${aid}`);
        $('html,body').animate({scrollTop: aTag.offset().top - 40},'slow');
    }
    
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