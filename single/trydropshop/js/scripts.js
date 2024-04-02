$(document).ready(function(){
$('.slider-c').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1, 
  arrows: false, 
  dots: false,
  vertical: true,
  draggable: false, 
  swipeToSlide: false,
  swipe: false,
  responsive: [
	{
		breakpoint: 991,
		settings: {
			vertical: false,
  			swipe: true,
  			dots: true
		}
	}
  ]
});

var isClickable = true;
$(".dot___3c3SI").click(function() {
    if (!isClickable) {
        return;
    }
    
    $('.dot___3c3SI').removeClass("carousel__dot--selected");
    $(this).addClass("carousel__dot--selected");
    $('.slider-c').slick('slickGoTo', $(this).attr("data-slide"));
    
    isClickable = false;
    setTimeout(function() {
        isClickable = true;
    }, 500);
});

$("body").on("click" , ".read-more-btn" , function(){
	$(".readmore-box").removeClass("lg\:h-\[300px\]").addClass("h-auto");
	$(".show-more-custom").fadeOut(0)
	$(".show-less-custom").fadeIn(0)

})

$("body").on("click" , ".read-less-btn" , function(){
	$(".readmore-box").addClass("lg\:h-\[300px\]").removeClass("h-auto");
	$(".show-less-custom").fadeOut(0)
	$(".show-more-custom").fadeIn(0)
})

$('[data-popup="faq"] button.cursor-pointer').click(function(){
    let src = $(this).find("img.flex.self-start").attr("src");

    if (src.includes("expand.8fa5ee90.svg")) {
        console.log(src);
        src = src.replace("expand.8fa5ee90.svg", "close.6d701cbb.svg");
        console.log(src);
        $(this).find("img.flex.self-start").attr("src", src);
        $(this).next("div").removeClass("ease-out").removeClass("h-0").removeClass(" delay-50").removeClass("opacity-0").removeClass("translate-y-full")
    	$(this).next("div").addClass("ease-in").addClass("h-fit").addClass("opacity-100").addClass("duration-500").addClass("translate-y-0 ")
    } else {
        console.log(src);
        src = src.replace("close.6d701cbb.svg", "expand.8fa5ee90.svg");
        console.log(src);
        $(this).find("img.flex.self-start").attr("src", src);
        $(this).next("div").addClass("ease-out").addClass("h-0").addClass(" delay-50").addClass("opacity-0").addClass("translate-y-full")
    	$(this).next("div").removeClass("ease-in").removeClass("h-fit").removeClass("opacity-100").removeClass("duration-500").removeClass("translate-y-0 ")
    }
});

// disable-bg добавити клас до body коли активий попап

// $(".modal").fadeOut(0);
// $(".modal").find("section").removeClass("animate-slide-up")

$(".close-popup-button").click(function(e){
	e.preventDefault()
	hidepopup($(this).closest(".modal").attr("data-popup"))
})

// data-call-popup='howitworks'
// data-call-popup='about'
// data-call-popup='faq'
$('.modal').click(function(){
	hidepopup($(this).closest(".modal").attr("data-popup"))
})
$('.modal section').click(function(e){
	e.stopPropagation()
})
$("[data-call-popup]").click(function(e){
	e.preventDefault()
	showpopup($(this).attr("data-call-popup"))
})

showpopup = (name) => {
	$(`.modal[data-popup=${name}]`).removeClass("hidden")
}
hidepopup = (name) => {
	$(`.modal[data-popup=${name}] section`).removeClass("animate-slide-up")
	$(`.modal[data-popup=${name}] section`).addClass("animate-slide-down")
	
	setTimeout(()=>{
		$(`.modal[data-popup=${name}]`).addClass("hidden")
	},250)

	setTimeout(()=> {
		$(`.modal[data-popup=${name}] section`).addClass("animate-slide-up")
		$(`.modal[data-popup=${name}] section`).removeClass("animate-slide-down")
	},300)
}
    

})