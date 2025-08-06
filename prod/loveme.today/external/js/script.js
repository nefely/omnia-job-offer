$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

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