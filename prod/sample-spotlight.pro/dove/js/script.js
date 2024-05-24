let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function(){
// graybox-progress
// checked green

$('.question-1 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.graybox-progress [data-question="question-1"]').addClass("checked")
})

$('.question-2 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.graybox-progress [data-question="question-2"]').addClass("checked")
})

$('.question-3 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.graybox-progress [data-question="question-3"]').addClass("checked")
})

$('.question-4 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.graybox-progress [data-question="question-4"]').addClass("checked")
})

$('.question-5 .btn').click(function(){
// $(this).closest(".question").fadeOut(0);
// $(this).closest(".question").next(".question").fadeIn(0);

$('.graybox-progress [data-question="question-5"]').addClass("checked")

$('.graybox-bottom').css("opacity" , "0")
$('.step-1').fadeOut(0);
$('.step-2').fadeIn(300);

setTimeout(()=>{
$('.graybox-progress [data-question="question-1"]').addClass("green")
},400)
setTimeout(()=>{
$('.graybox-progress [data-question="question-2"]').addClass("green")
},800)
setTimeout(()=>{
$('.graybox-progress [data-question="question-3"]').addClass("green")
},1200)
setTimeout(()=>{
$('.graybox-progress [data-question="question-4"]').addClass("green")
},1600)
setTimeout(()=>{
$('.graybox-progress [data-question="question-5"]').addClass("green")
},2000)

setTimeout(()=>{
$('.graybox-bottom , .graybox-progress').fadeOut(0);
$('.step-2').fadeOut(0);
$('.step-3').fadeIn(300);
},2400)



})

});