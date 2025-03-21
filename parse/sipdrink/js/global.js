$(document).ready(function(){
    let today = new Date();
    let twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 7);
    let day = String(twoDaysAgo.getDate()).padStart(2, '0');
    let month = String(twoDaysAgo.getMonth() + 1).padStart(2, '0');
    let year = twoDaysAgo.getFullYear();
    $("data").text(`${day}.${month}.${year}`);


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

    $('.preloader').delay(200).fadeOut(200);
})    