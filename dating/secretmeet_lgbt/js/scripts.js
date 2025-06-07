$(document).ready(function(){
    function shuffleSlides() {
        const wrapper = document.querySelector('.swiper-wrapper');
        const slides = Array.from(wrapper.children);

        for (let i = slides.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            wrapper.appendChild(slides[j]);
            slides.splice(j, 1);
        }
    }
    shuffleSlides();


    const swiper = new Swiper('.swiper', {
        loop: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        initialSlide: Math.floor(document.querySelectorAll('.swiper-slide').length / 2),
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        // allowTouchMove: false, 
        pagination: false,
        navigation: false, 
        speed: 750
    });

})