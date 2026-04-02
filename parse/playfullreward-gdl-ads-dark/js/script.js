$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`)


let startDynamic = () => {
$('.dynamic-number > span').each(function () {
    const $el = $(this);
    const target = Math.floor(Math.random() * (74 - 68 + 1)) + 68;

    $({ count: 0 }).animate(
        { 
            count: target 
        },
        {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $el.text(Math.floor(now));
            },
            complete: function () {
                $el.text(target);
            }
        }
    );
});
}


$(".screen-1 .hero .btn" ).click(function(e){
    e.preventDefault();
    $(".screen-1").fadeOut(300, function(){
        $(".screen-2").fadeIn(300);
        startDynamic();
    });
})

isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    fbq('track', 'PageView');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});

$('.preloader').delay(300).fadeOut(300);

// test
// $(".screen-1").fadeOut(300, function(){
//     $(".screen-2").fadeIn(300);
// });

})