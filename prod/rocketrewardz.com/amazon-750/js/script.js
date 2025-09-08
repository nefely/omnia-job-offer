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
$(".whitebox-1").addClass("transparentbox");

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
$(".circles").fadeOut(300);
$(".whitebox-1").addClass("nopaddingbox")

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
        $('.link a').addClass("active")
    },2000)
    setTimeout(()=>{
        $('.link a').removeClass("active")
        $('.link a').addClass("blink")
    },2400)
},300)

},2400)

})

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

const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

$("#offer_link").click(function(e){
    e.preventDefault()
    $(this).addClass("disabled")
    fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkcid);
        setTimeout(()=>{
            window.location.href = $(this).attr("href")
        },300)
    })
    .catch(e => console.log("error during registration lead: " + e) , $(this).removeClass("disabled"));
})


// test
// $(".step-1").fadeOut(0)
// $(".step-2").fadeIn(0)
// $(".quiz , .card-image , .circles").fadeOut(0);



});