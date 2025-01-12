$(document).ready(function(){
	
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    
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
    
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1.35,  
        spaceBetween: 20,

        breakpoints: {
            550: {
              slidesPerView: 1.7,  
              spaceBetween: 20   
            },
            1024: {
                slidesPerView: 2.7,  
                spaceBetween: 20   
            }
        },
        scrollbar: {
            el: '.swiper-scrollbar', 
            draggable: true, 
        },
    });


    let toggleButton = () => {
        const relativeContainer = $('.relative-container');
        const fixedContainer = $('.fixed-container');
        const containerTop = relativeContainer.offset().top;
        const containerBottom = containerTop + relativeContainer.outerHeight();
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + $(window).height();
        if (containerBottom > windowTop && containerTop < windowBottom) {
            fixedContainer.hide();
        } else {
            fixedContainer.show();
        }
    }

    $(window).on('scroll', function () {
        toggleButton()
    });

    toggleButton()

})    