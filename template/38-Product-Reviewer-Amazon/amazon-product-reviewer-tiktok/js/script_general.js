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

var standart_time = 300
var thx_time = 2500

window.standart_time = standart_time
window.thx_time = thx_time

$(".btn-to-forn").click(function(e){
    e.preventDefault();
    let full_url = "#intro";
    let parts = full_url.split("#");
    let trgt = parts[1];
    let target_offset = $("#"+trgt).offset();
    let target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500);
})

$('.preloader').delay(300).fadeOut(300);

$(".faq-block-title").click(function(){
    $(this).closest(".faq-block").toggleClass("active")
})
$(".to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});

})