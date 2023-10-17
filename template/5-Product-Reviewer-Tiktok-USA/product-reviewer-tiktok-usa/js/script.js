$(document).ready(function(){

window.domain = window.location.hostname;
window.standart_time = 300
window.thx_time = 2500

$(".domain").text(domain)

var year = new Date().getFullYear()
$(".year").text(year)


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

$("header a").click(function(e){
    e.preventDefault();
    var full_url = this.href;
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500);
});

$(".start-subscribe a").click(function(e){
    e.preventDefault();
    var full_url = this.href;
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500);
})

// back
$(".quiz-block .quiz-block-back button").click(function(){
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").prev(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--2 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
})
$(".quiz-block--3 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
})

$('.preloader').delay(300).fadeOut(300);

})