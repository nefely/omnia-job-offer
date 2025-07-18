$(document).ready(function(){

const sub13 = window.getURLParameter(window.location.href, 'sub13');
const sub14 = window.getURLParameter(window.location.href, 'sub14');
const sub15 = window.getURLParameter(window.location.href, 'sub15');

const offer_link = `https://track.${window.location.host}/click`


// noredirect
// const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
// const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');
// if (rtkClickID__ && cachebuster__) {
//     if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
//         fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
//         .then(r => {
//             console.log("successfully registered: " + rtkClickID__);
//         })
//         .catch(e => console.log("error during registration lead: " + e));
//     }
// }
// $("#offer_link").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}`)

// redirect
const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');
if (rtkcid && rtkcid !== "undefined") {
    fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkcid);
    })
    .catch(e => console.log("error during registration lead: " + e));
}
$("#offer_link").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}sub13=${sub13}&sub14=${sub14}&sub15=${sub15}`)
	
setTimeout(()=> {
    $("#intro .thx").fadeOut(300)
    $("#intro .quiz").delay(300).fadeIn(300)
}, 3000)

// quiz flow
$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--3 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    $(this).closest(".quiz-block").css("opacity" , '0')

    console.log("hide")

    $('.quiz-dots ul li').removeClass("active")
    setTimeout(()=>{
        $('.quiz-dots ul li:eq(0)').addClass("green")
        setTimeout(()=>{
            $('.quiz-dots ul li:eq(1)').addClass("green")
            setTimeout(()=>{
                $('.quiz-dots ul li:eq(2)').addClass("green")
                setTimeout(()=>{
                    $('.quiz-dots').fadeOut(300)
                    setTimeout(()=>{
                        $(this).closest(".quiz-block").fadeOut(standart_time)
                        setTimeout(()=>{
                            $(this).closest(".quiz-block").css("opacity" , '1')
                            $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
                        }, standart_time)
                    },300)
                },500)
            },500)
        },500)
    },500)
    
  
})

let lastClickTime = 0;

$(".quiz-block--4 .quiz-block-answers a.yes").click(function(e){
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
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
})
$(".quiz-block--3 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
})
$(".quiz-block--4 .quiz-block-back button").click(function(){
    $('.quiz-dots').fadeIn(300)
    $('.quiz-dots ul li').removeClass("active").removeClass("green")
    $('.quiz-dots ul li:eq(2)').addClass("active")
})

})