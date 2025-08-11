$(document).ready(function(){

    function detectBrowser(ua) {
        if (/FBAN|FBAV/.test(ua)) return "Facebook External";
        if (/Instagram/.test(ua)) return "Instagram External";
        if (/SamsungBrowser/.test(ua)) return "Samsung Browser External";
        if (/Silk\//.test(ua)) return "Kindle-Silk External";
        if (/Edg\//.test(ua)) return "Edge External";
        if (/Chrome/.test(ua) && !/Edg|OPR/.test(ua)) return "Chrome External";
        if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "Safari External";
        if (/Firefox/.test(ua)) return "Firefox External";
        if (/Opera|OPR\//.test(ua)) return "Opera External";
        if (/GoogleMobile/.test(ua)) return "GoogleMobile External";
        if (/YandexBrowser/.test(ua)) return "Yandex.Browser External";
        if (/bot|crawler|spider/i.test(ua)) return "Unknown Crawler External";
        return "Unknown";
    }

    function detectDevice(ua) {
        if (/Mobile|Android|iPhone|iPad|Silk/.test(ua)) return "Mobile";
        return "Desktop";
    }

    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);

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

    let link = `https://track.${window.location.host}/click`

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    let formLink = `${link}${link.includes("?") ? "&" : "?"}clickid=${rtkcid}&sub18=${browser}`

    $('.offer_link').attr('href' , formLink)
    
    
})