$(document).ready(function(){

$(".form-step--1 .btn-next").click(function(){
    $(".form-step--1").fadeOut(0);
    $(".main-title").fadeOut(0);
    $(".bullets").fadeOut(0);
    setTimeout(()=>{
        $(".quiz-container").fadeIn(300);
    },300)
})

$('.quiz-dots .circle').removeClass("active")
$('.quiz-dots .circle:eq(0)').addClass("active")

$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(1)').addClass("active")
    $('.quiz-dots .circle:eq(0)').addClass("passed")

    $(this).closest(".quiz-block").fadeOut(300)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(300)
    }, 300)
})

$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(2)').addClass("active")
    $('.quiz-dots .circle:eq(1)').addClass("passed")

    $(this).closest(".quiz-block").fadeOut(300)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(300)
    }, 300)
})

$(".quiz-block--3 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    $(this).closest(".quiz-block").css("opacity" , '0')

    $('.quiz-dots .circle:eq(2)').addClass("passed")

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
                        $(this).closest(".quiz-block").fadeOut(300)
                        setTimeout(()=>{
                            $(this).closest(".quiz-block").css("opacity" , '1')
                            $(this).closest(".quiz-block").next(".quiz-block").fadeIn(300)
                        }, 300)
                    },300)
                },500)
            },500)
        },500)
    },500)
})


// back
$(".quiz-block .quiz-block-back button").click(function(){
    $(this).closest(".quiz-block").fadeOut(300)
    setTimeout(()=>{
        $(this).closest(".quiz-block").prev(".quiz-block").fadeIn(300)
    }, 300)
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


isEmailValid = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
        return true
    } else {
        return false
    }
}
emailValidation = () => {
    if (isEmailValid()) {
        $("input[name=email]").removeClass("is-invalid")
    } else {
        $("input[name=email]").focus()
        $("input[name=email]").addClass("is-invalid")
    }
}
$("input[name=email]").on("input change" , function(){
    if (isEmailValid()) {
        $("input[name=email]").removeClass("is-invalid")
    }
})


// redirect
const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

let lastClickTime = 0;
const offer_link = `https://track.${window.location.host}/click`


$("#offer_link").click(function(e){
    const currentTime = new Date().getTime();
    e.preventDefault()
    emailValidation()
    $("html, body").animate({ scrollTop: 0 }, 300);
    if (currentTime - lastClickTime < 5000) {
        return false;
    } else {
        if (isEmailValid()) {

            lastClickTime = new Date().getTime();
            $("html, body").animate({ scrollTop: 0 }, 300);

            // noredirect
            // fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
            // .then(r => {
            //     console.log("successfully registered: " + rtkClickID);
            //     window.location.href = `${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub15=${$("[name=email]").val()}`
            // })
            // .catch(e => console.log("error during registration lead: " + e));
            

            // redirect
            fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkcid);
                window.location.href = `${offer_link}${offer_link.includes("?") ? "&" : "?"}sub15=${$("[name=email]").val()}`
            })
            .catch(e => console.log("error during registration lead: " + e));
        }
    }

});



})