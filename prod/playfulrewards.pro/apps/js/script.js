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


let lastClickTime = 0; // Store the last click timestamp for debounce

$(".offer_link").click(function(e) {
    e.preventDefault();
    
    const currentTime = new Date().getTime();
    
    // Prevent multiple clicks within 5 seconds
    if (currentTime - lastClickTime < 5000) {
        console.log("Click too fast! Please wait 5 seconds.");
        return false;
    }
    
    lastClickTime = currentTime; // Update last click time

    // Validate rtkClickID and cachebuster before making the request
    if (typeof rtkClickID !== "undefined" && typeof cachebuster !== "undefined" && rtkClickID && cachebuster) {
        fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors' })
        .then(r => {
            console.log("Successfully registered: " + rtkClickID);
            setTimeout(() => {
                window.location.href = $(this).attr("href"); // Redirect after 2 seconds
            }, 200);
        })
        .catch(e => console.log("Error during registration: " + e));
    } else {
        console.log("rtkClickID or cachebuster is undefined!");
    }
});

});

