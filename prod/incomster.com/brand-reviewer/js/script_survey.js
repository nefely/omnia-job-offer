$(document).ready(function(){

const clickid = window.getURLParameter(window.location.href, 'clickid');
const uclick = window.getURLParameter(window.location.href, 'uclick');

const sub12 = window.getURLParameter(window.location.href, 'sub12');
const sub13 = window.getURLParameter(window.location.href, 'sub13');
const sub14 = window.getURLParameter(window.location.href, 'sub14');
const sub15 = window.getURLParameter(window.location.href, 'sub15');
const sub16 = window.getURLParameter(window.location.href, 'sub16');

const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

let offer_number = "";
let offer_name = "";

setTimeout(()=> {
    $("#intro .thx").fadeOut(300)
    $("#intro .quiz").delay(300).fadeIn(300)
    $("body").css("background" , "#F3F4F6");
}, 3000)


$('.quiz-dots .circle').removeClass("active")
$('.quiz-dots .circle:eq(0)').addClass("active")

form_final_link = () => {
    $(".quiz-block--5 a.yes[data-offer='offer_link__1']").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    $(".quiz-block--5 a.yes[data-offer='offer_link__2']").attr("href" ,`${window.offer_link_2}${window.offer_link_2.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    $(".quiz-block--5 a.yes[data-offer='offer_link__3']").attr("href" ,`${window.offer_link_3}${window.offer_link_3.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    $(".quiz-block--5 a.yes[data-offer='offer_link__4']").attr("href" ,`${window.offer_link_4}${window.offer_link_4.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
}
	
// quiz flow
$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(1)').addClass("active")
    $('.quiz-dots .circle:eq(0)').addClass("passed")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(2)').addClass("active")
    $('.quiz-dots .circle:eq(1)').addClass("passed")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--3 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(3)').addClass("active")
    $('.quiz-dots .circle:eq(2)').addClass("passed")
    $('.quiz-dots .circle:eq(1)').addClass("passed")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--4 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    // $(this).closest(".quiz-block").css("opacity" , '0')

    offer_number = $(this).attr("data-offer")
    offer_name = $(this).attr("data-offer-name")

    $(`.quiz-block--5 a.btn[data-offer="${offer_number}"]`).addClass("visible")
    $(`.quiz-block--5 .card img[data-offer="${offer_number}"]`).addClass("visible")
    $("strong.offer_name").text(offer_name)

    $(this).closest(".quiz-block").fadeOut(300)

    $('.quiz-dots .circle:eq(3)').addClass("passed")

    window.offer_link_1 = $('.quiz-block--5 a.yes[data-offer="offer_link__1"]').attr("href")
    window.offer_link_2 = $('.quiz-block--5 a.yes[data-offer="offer_link__2"]').attr("href")
    window.offer_link_3 = $('.quiz-block--5 a.yes[data-offer="offer_link__3"]').attr("href")
    window.offer_link_4 = $('.quiz-block--5 a.yes[data-offer="offer_link__4"]').attr("href")

    form_final_link()

    $('.quiz-dots .circle').removeClass("active")
    setTimeout(()=>{

        $('.quiz-loader').fadeIn(300)
        $('.loader-images').addClass("scroll")
        setTimeout(()=>{
            $('.quiz-dots .circle:eq(0)').addClass("active")
            setTimeout(()=>{
                $('.quiz-dots .circle:eq(1)').addClass("active")
                setTimeout(()=>{
                    $('.quiz-dots .circle:eq(2)').addClass("active")
                    setTimeout(()=>{
                        $('.quiz-dots .circle:eq(3)').addClass("active")
                        setTimeout(()=>{
                            $('.quiz-dots').fadeOut(300)
                            $('.quiz-loader').fadeOut(300)
                            setTimeout(()=>{
                                $(this).closest(".quiz-block").fadeOut(standart_time)
                                setTimeout(()=>{
                                    $(".quiz-block--5").fadeIn(standart_time)
                                }, standart_time)
                            },300)
                        },700)
                    },700)
                },700)
            },700)
        },500)

    },301)

})

let lastClickTime = 0;

$(".quiz-block--5 .quiz-block-answers a.yes").click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
    }
})


// back
$(".quiz-block .quiz-block-back button").click(function(){
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").prev(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})


$(".quiz-block--2 .quiz-block-back button").click(function(){
    $('.quiz-dots .circle').removeClass("active").removeClass("passed")
    $('.quiz-dots .circle:eq(0)').addClass("active")
})
$(".quiz-block--3 .quiz-block-back button").click(function(){
    $('.quiz-dots .circle').removeClass("active").removeClass("passed")
    $('.quiz-dots .circle:eq(0)').addClass("passed")
    $('.quiz-dots .circle:eq(1)').addClass("active")
})
$(".quiz-block--4 .quiz-block-back button").click(function(){
    $('.quiz-dots .circle').removeClass("active").removeClass("passed")
    $('.quiz-dots .circle:eq(0)').addClass("passed")
    $('.quiz-dots .circle:eq(1)').addClass("passed")
    $('.quiz-dots .circle:eq(2)').addClass("active")
})
$(".quiz-block--5 .quiz-block-back button").click(function(){
    $('.quiz-dots').fadeIn(300)
    $('.quiz-dots .circle').removeClass("active").removeClass("passed")
    $('.quiz-dots .circle:eq(0)').addClass("passed")
    $('.quiz-dots .circle:eq(1)').addClass("passed")
    $('.quiz-dots .circle:eq(2)').addClass("passed")
    $('.quiz-dots .circle:eq(3)').addClass("active")
})

// test
// $(".quiz-blocks .quiz-block").fadeOut()
// $(".quiz-blocks .quiz-loader").fadeIn()


})