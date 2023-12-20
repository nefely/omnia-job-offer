$(document).ready(function(){

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

let url_track_key = getURLParameter(window.location.href , "t3")

let track_domain_object = {
    "id6449675159" : "track.rewardme.pro",
    "id6450370320" : "track.shop-shop.today",
    "id6449974950" : "track.shopup.digital",
    "id6448254133" : "track.uplevelshopping.online",
}

window.chousen_track_domain = track_domain_object[url_track_key]

})