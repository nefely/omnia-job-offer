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

window.domain = window.location.hostname;

$(".row-ranking").find(".block.review").each(function(){
	$(this).clone().appendTo(".slider-review")
})

$(".domain").text(domain)

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$('.preloader').delay(300).fadeOut(300);

$('.slider-review').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    appendDots: ".custom-dots",
    customPaging: function(slider, i) {
      return '<button></button>';
    },
    autoplay: false,
    adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: true,
			}
		}
	]
});

$(".about-content .more").click(function(e){
    e.preventDefault()
    $(this).fadeOut(0)
    $(".about-content > .container > p").css("display", "block");
})

$(".btn-down").click(function(){
    $('html,body').animate({scrollTop: $(".reviews").offset().top},'slow');
})

});

