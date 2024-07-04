$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".mailto").attr("href" , `mailto:contact@${domain}`)

var currentDate = moment();
var formattedDate = currentDate.format('D MMMM YYYY');
var formattedDayOfWeek = currentDate.format('dddd');
$('data').text(formattedDate);
$('.day_of_week').text(formattedDayOfWeek);
const currentYear = new Date().getFullYear();
$('.year').text(currentYear);

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

let clickCount = 0;
let tryCount = 2;

let canClick_1_roll = true
let canClick_2_popup = true

$(".slide-1 .btn").click(function(){
    if (canClick_1_roll) {   
        canClick_1_roll = false
        console.log(1)
        $(this).addClass("disabled").removeClass("btn-hand btn-blink");
        
        tryCount--
        clickCount++
        $('.count').text(tryCount)

        setTimeout(()=>{
            $(".popup-2").fadeIn(300)
        }, 6500)

        $("footer").fadeOut(0)
    }
})

$(".popup-2 .btn").click(function(){
    if (canClick_2_popup) {
        canClick_2_popup = false 
        console.log(2)
        $(this).addClass("disabled")
        $(".popup-2").fadeOut(300)

        $('.lottie-1').fadeOut(0)
        $('.lottie-2').fadeIn(0)

        setTimeout(()=>{
            tryCount--
            clickCount++
            $('.count').text(tryCount)
            $('lottie-player').get(1).play();

            setTimeout(()=>{
                $('video').each(function() {
                    this.play();
                });
                setTimeout(()=>{
                    $('.video').fadeOut(300);
                },7000);
                setTimeout(()=>{
                    $('.slide-1').css("position" , "absolute").fadeOut(300).css("top" , "48px")
                    $('.slide-2').css('position' , "relative").fadeIn(300)
                },2000)
            }, 5200)
        }, 300)
    }
})

$('.slide-1 .btn').click(function(){
    $('lottie-player').get(0).play();
});

$('.popup button').click(function(){
    $('.popup').fadeOut(300)
})

})


$('.popup-1 .btn').click(function(){
    $(".screen > *").fadeIn(300)
    $(".screen > .start").fadeOut(300)  
})