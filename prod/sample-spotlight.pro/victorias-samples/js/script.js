let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function(){
// graybox-progress
// checked green

$('.question-1 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(0)').addClass("passed")
$('.circles .circle:eq(1)').addClass("active")
})

$('.question-2 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(1)').addClass("passed")
$('.circles .circle:eq(2)').addClass("active")
})

$('.question-3 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(2)').addClass("passed")
$('.circles .circle:eq(3)').addClass("active")
})

$('.question-4 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(3)').addClass("passed")
$('.circles .circle:eq(4)').addClass("active")
})

$('.question-5 .btn').click(function(){

// $(this).closest(".question").fadeOut(0);
// $(this).closest(".question").next(".question").fadeIn(0);

$('.circles .circle:eq(4)').addClass("passed")

// $('.graybox-bottom').css("opacity" , "0")
$('.step-1 .title > *').css("opacity" , "0");
$('.step-1 .title .analyzing , .step-1 .title .analyzing > *').css("opacity" , "1");
$(".quiz , .card-image").fadeOut(0);
$(".circles").fadeOut(0);

setTimeout(()=>{
    
$(".step-1").fadeOut(300)
setTimeout(()=>{
    $(".step-2").fadeIn(300)
    $(".bg").css("opacity" , "1")
    setTimeout(()=>{
        $('.list-item').removeClass("active")
        $('.list-item:eq(0)').addClass("active")
    },400)
    setTimeout(()=>{
        $('.list-item').removeClass("active")
        $('.list-item:eq(1)').addClass("active")
    },800)
    setTimeout(()=>{
        $('.list-item').removeClass("active")
        $('.list-item:eq(2)').addClass("active")
    },1200)
    setTimeout(()=>{
        $('.list-item').removeClass("active")
        $('.link a').addClass("active")
    },1600)
    setTimeout(()=>{
        $('.link a').removeClass("active")
        $('.link a').addClass("blink")
    },2000)
},300)

},2400)

})


// test
// $(".quiz , .card-image, .title > *, .circles").css("opacity" , "0")
// $(".analyzing , .analyzing > *").css("opacity" , "1")




});