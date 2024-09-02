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

setTimeout(()=>{
    $('.circles .circle:eq(0)').addClass("checked")
},400)
setTimeout(()=>{
    $('.circles .circle:eq(1)').addClass("checked")
},800)
setTimeout(()=>{
    $('.circles .circle:eq(2)').addClass("checked")
},1200)
setTimeout(()=>{
    $('.circles .circle:eq(3)').addClass("checked")
},1600)
setTimeout(()=>{
    $('.circles .circle:eq(4)').addClass("checked")
},2000)

setTimeout(()=>{
    
$(".step-1").fadeOut(300)
$(".circles").fadeOut(30);
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
        $('.list-item:eq(3)').addClass("active")
    },1600)
    setTimeout(()=>{
        $('.list-item').removeClass("active")
        $('.link .btn').addClass("active")
    },2000)
    setTimeout(()=>{
        $('.link .btn').removeClass("active")
        $('.link .btn').addClass("blink")
    },2400)
},300)

},2400)

})


$(".step-2 button").click(function(){
    $(".step-2").fadeOut(300)
    setTimeout(()=>{
        $(".step-3").fadeIn(300)
        $(".step-3 .card").fadeIn(300)
    },300)
})


let offer_link = "";
let final_link = "";

setTimeout(() => {
    offer_link = $('#offer_link').attr("href");
}, 2000);

$(".email").on("input", function() {
    final_link = `${offer_link}${offer_link.includes("?") ? "&" : "?"}sub15=${$("[name=email]").val()}`;
    $("#offer_link").attr("href", final_link);
});

$("input[name=email]").on("input", function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
        $("input[name=email]").removeClass("error");
    }
});

let clickAllowed = true;

$("#offer_link").on("click", function(e) {
    if (!clickAllowed) {
        e.preventDefault(); 
        return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
        e.preventDefault();
        $("input[name=email]").addClass("error");
        return;
    }

    clickAllowed = false;
    setTimeout(() => {
        clickAllowed = true; 
    }, 5000);
});


// test
// $(".step-1").fadeOut(0)
// $(".step-2").fadeIn(0)
// $(".quiz , .card-image , .circles").fadeOut(0);

$(".step-2").fadeOut(0)
$(".step-1").fadeOut(0)
$(".card-image").fadeOut(0)
$(".step-3 .card").fadeIn(0)
$(".quiz").fadeOut(0)
$(".circles").fadeOut(0)
$(".step-3").fadeIn(0)




});