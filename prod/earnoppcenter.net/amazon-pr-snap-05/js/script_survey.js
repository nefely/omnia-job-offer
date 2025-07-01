$(document).ready(function(){

const clickid = window.getURLParameter(window.location.href, 'clickid');
const uclick = window.getURLParameter(window.location.href, 'uclick');

const sub12 = window.getURLParameter(window.location.href, 'sub12');
const sub13 = window.getURLParameter(window.location.href, 'sub13');
const sub14 = window.getURLParameter(window.location.href, 'sub14');
const sub15 = window.getURLParameter(window.location.href, 'sub15');
const sub16 = window.getURLParameter(window.location.href, 'sub16');

const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

setTimeout(()=> {
    $("#intro .thx").fadeOut(300)
    $("#intro .quiz").delay(300).fadeIn(300)
}, 3000)


fetch(`https://track.earnoppcenter.net/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
.then(r => {
    console.log("successfully registered: " + rtkcid);
})
.catch(e => console.log("error during registration lead: " + e));

form_final_link = () => {
    $(".quiz-block--4 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}rtkcid=${rtkcid}&rtkcmpid=${rtkcmpid}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
}
	
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

//    $('.quiz-block--4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=1`)

    window.offer_link_1 = $('.quiz-block--4 a.yes').attr("href")

    form_final_link()

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