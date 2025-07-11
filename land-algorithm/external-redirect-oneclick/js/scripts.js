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

    function detectBrowser(ua) {
        if (/FBAN|FBAV/.test(ua)) return "Facebook";
        if (/Instagram/.test(ua)) return "Instagram";
        if (/SamsungBrowser/.test(ua)) return "Samsung Browser";
        if (/Silk\//.test(ua)) return "Kindle-Silk";
        if (/Edg\//.test(ua)) return "Edge";
        if (/Chrome/.test(ua) && !/Edg|OPR/.test(ua)) return "Chrome";
        if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "Safari";
        if (/Firefox/.test(ua)) return "Firefox";
        if (/Opera|OPR\//.test(ua)) return "Opera";
        if (/GoogleMobile/.test(ua)) return "GoogleMobile";
        if (/YandexBrowser/.test(ua)) return "Yandex.Browser";
        if (/bot|crawler|spider/i.test(ua)) return "Unknown Crawler";
        return "Unknown";
    }

    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);

    $("a").each(function(){
        let link = $(this).attr("href")
        let formLink = `${link}${link.includes("?") ? "&" : "?"}clickid=${getURLParameter(window.location.href , "rtkcid")}&sub20=${browser}`

        if (link.includes("track.")) {
            $(this).attr("href" , formLink)
        }
    })



    
})