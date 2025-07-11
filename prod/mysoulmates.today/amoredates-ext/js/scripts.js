$(document).ready(function(){


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

    function detectDevice(ua) {
        if (/Mobile|Android|iPhone|iPad|Silk/.test(ua)) return "Mobile";
        return "Desktop";
    }

    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);

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

    let formLink = `${link}${link.includes("?") ? "&" : "?"}clickid=${rtkcid}&sub20=${browser}`

    $('.offer_link').attr('href' , formLink)



    

})