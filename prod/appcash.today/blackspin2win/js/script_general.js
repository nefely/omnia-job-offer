$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".mailto").attr("href" , `mailto:contact@${domain}`)

var currentDate = moment();
var formattedDate = currentDate.format('D MMMM YYYY');
var formattedDayOfWeek = currentDate.format('dddd');
$('data').text(formattedDate);
$('.day_of_week').text(formattedDayOfWeek);


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
let canClick = true








































$('.boxes .box:not(.clicked)').click(function(){
    if (!$(this).hasClass("clicked") && tryCount > 0 && canClick) {
        tryCount--
        clickCount++
        $('.count').text(tryCount)
        $(this).addClass("clicked")
        if(clickCount < 3) {
            if (clickCount == 1) {
                // $(this).addClass("empty")
                setTimeout(()=>{
                    $(this).find("img").attr("src" , "img/empty.png")
                },200)

                canClick = false
                setTimeout(()=>{
                    $('.popup').fadeIn(300)
                },1000)
            }
            if (clickCount == 2) {
                // $(this).addClass("win")
                setTimeout(()=>{
                    $(this).find("img").attr("src" , "img/win.png")
                    $('video').each(function() {
                        this.play();
                    });
                },200)
                setTimeout(()=>{
                    $('.video').fadeOut(300);
                },7000);
                setTimeout(()=>{
                    $('.screen--comment').fadeOut(300)
                    LastSlideShow()
                },2000)
            }
        }
    }
})

$('.popup button').click(function(){
    $('.popup').fadeOut(300)
    canClick = true
})


$('.roulette-button button , .spin-button').click(function(){
	$('.roulette-button button , .spin-button').prop("disabled" , true);
	roll()
	$(".count").text("1")
})

roll = () => {
	$(".roulette-button button").removeClass("btn-animation");
	if (Number($(".spinner").attr("data-roll")) <= 2) {
		$(".spinner").attr("data-roll" , Number($(".spinner").attr("data-roll")) + 1);
		setTimeout(()=>{
			showPopup(Number($(".spinner").attr("data-roll")))
			if ($(".spinner").attr("data-roll") == 2) {
				console.log("win")
                setTimeout(()=>{
                    $('video').each(function() {
                        this.play();
                    });
                },200)
                setTimeout(()=>{
                    $('.video').fadeOut(300);
                },7000);
                setTimeout(()=>{
                    $('.screen--comment').fadeOut(300)
                    LastSlideShow()
                },2000)
			}
		},6000)
		console.log(Number($(".spinner").attr("data-roll")))
	}
}

let LastSlideShow = () => {
    $('.slide-1').css("position" , "absolute").fadeOut(300)
    $('.slide-2').css('position' , "relative").fadeIn(300)
    $(".logo img").attr("src" , "img/emoji.png").css("width" , "155px").css("margin-bottom" , "-25px")
    setTimeout(()=>{
        $('.content-1').fadeOut(300)
        $("header").fadeOut(300)
        setTimeout(()=>{
            $('.content-2').fadeIn(300)
        },300)
    },3000)
}



showPopup = (n) => {
	if (n <=1) {
		$(".popup").fadeIn(300)
		$(`.popup-container[data-popup='${n}']`).delay(300).fadeIn(300)
	}
}
hidePopup = () => {
	$(".popup").delay(300).fadeOut(300)
	$(`.popup-container`).fadeOut(300)
}

$('.popup button').click(function(){
	$(this).prop("disabled" , true);
	hidePopup()
	setTimeout(()=>{
		roll()
	},300)
})






// let LastSlideShow = () => {
//     $('.slide-1').css("position" , "absolute").fadeOut(300)
//     $('.slide-2').css('position' , "relative").fadeIn(300)
//     $(".logo img").attr("src" , "img/banner.png").css("width" , "155px").css("margin-bottom" , "-25px")
//     setTimeout(()=>{
//         $('.content-1').fadeOut(300)
//         $('.banner img').fadeOut(300)
//         setTimeout(()=>{
//             $('.content-2').fadeIn(300)
//         },300)
//     },3000)
// }

})