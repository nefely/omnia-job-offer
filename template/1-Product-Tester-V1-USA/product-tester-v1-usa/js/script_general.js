$(document).ready(function(){


$(".header-nav a , .footer-general a").click(function(event){
    event.preventDefault();
    var l_url = $(this).attr("href");
    var target_offset = $("."+l_url).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500, 'linear');
});

const now = new Date();
window.currentYear = now.getFullYear();
$(".year").text(currentYear)

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


$('.preloader').delay(300).fadeOut(300);


// window.clickid = "my_click"
// window.uclick = "my_uclick"
// snaptr = () => {
// 	console.log("sign fake")
// }

});