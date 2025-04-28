$(document).ready(function(){

const clickid = window.getURLParameter(window.location.href, 'clickid');
const uclick = window.getURLParameter(window.location.href, 'uclick');

const sub13 = window.getURLParameter(window.location.href, 'sub13');
const sub14 = window.getURLParameter(window.location.href, 'sub14');
const sub15 = window.getURLParameter(window.location.href, 'sub15');
const sub16 = window.getURLParameter(window.location.href, 'sub16');

const offer_type = window.getURLParameter(window.location.href, 'offer_type');

const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');


const data = {
    "zip": "", 
    "firstname": sub13, 
    "lastname": sub14, 
    "email": sub15, 
    "phone": sub16, 
    "offer_type": offer_type, 
    "offer_url": window.location.href.split('?')[0].replace("/survey/" , "").replace("/survey" , ""), 
    "click_id": rtkClickID__
};
console.log(data)
// uncommit on prod
fetch(`https://track.rewardycenter.pro/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
.then(r => {
    console.log("successfully registered: " + rtkClickID__);
    fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
    .then(rr => {
        console.log("successfully registered lead in Data API: " + rtkClickID__)
    })
    .catch(ed => {});
})
.catch(e => console.log("error during registration lead: " + e));

setTimeout(()=> {
    $("#intro .thx").fadeOut(300)
    $("#intro .quiz").delay(300).fadeIn(300)
    $("body").css("background" , "#F3F4F6");
}, 3000)


$('.quiz-dots .circle').removeClass("active")
$('.quiz-dots .circle:eq(0)').addClass("active")

form_final_link = () => {
    $(".quiz-block--4 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
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
    $(this).closest(".quiz-block").css("opacity" , '0')

    $('.quiz-dots .circle:eq(2)').addClass("passed")

//    $('.quiz-block--4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=1`)

    window.offer_link_1 = $('.quiz-block--4 a.yes').attr("href")

    form_final_link()

    console.log("hide")

     $('.quiz-dots .circle').removeClass("active")
    setTimeout(()=>{
        $('.quiz-dots .circle:eq(0)').addClass("active")
        setTimeout(()=>{
            $('.quiz-dots .circle:eq(1)').addClass("active")
            setTimeout(()=>{
                $('.quiz-dots .circle:eq(2)').addClass("active")
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
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 3 yes")
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
    $('.quiz-dots').fadeIn(300)
    $('.quiz-dots .circle').removeClass("active").removeClass("passed")
    $('.quiz-dots .circle:eq(0)').addClass("passed")
    $('.quiz-dots .circle:eq(1)').addClass("passed")
    $('.quiz-dots .circle:eq(2)').addClass("active")
})

})