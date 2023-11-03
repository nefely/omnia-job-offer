$(document).ready(function(){

const clickid = window.getURLParameter(window.location.href, 'clickid');
const uclick = window.getURLParameter(window.location.href, 'uclick');

const email = window.getURLParameter(window.location.href, 'email');
const firstname = window.getURLParameter(window.location.href, 'firstname');
const lastname = window.getURLParameter(window.location.href, 'lastname');
const telephone = window.getURLParameter(window.location.href, 'telephone');
const zip = window.getURLParameter(window.location.href, 'zip');

setTimeout(()=> {
    $("#intro .thx").fadeOut(300)
    $("#intro .quiz").delay(300).fadeIn(300)
}, 3000)

form_final_link = () => {
    // console.log(window.offer_link)

    console.log(clickid)
    console.log(uclick)
    console.log(email)
    console.log(firstname)
    console.log(lastname)
    console.log(telephone)
    console.log(zip)


    $(".quiz-block--3 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )
    $(".quiz-block--4 a.yes").attr("href" ,`${window.offer_link_2}${window.offer_link_2.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )
    $(".quiz-block--5 a.yes").attr("href" ,`${window.offer_link_3}${window.offer_link_3.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )

    $(".quiz-block--3 a.no").attr("href" ,`` )
    $(".quiz-block--4 a.no").attr("href" ,`` )
    $(".quiz-block--5 a.no").attr("href" ,`${window.offer_link_no_3}${window.offer_link_no_3.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )
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

    $('.quiz-block--3 a.no').attr("href" , ``)
    $('.quiz-block--4 a.no').attr("href" , ``)
    $('.quiz-block--5 a.no').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=2`)

    $('.quiz-block--3 a.yes').attr("href" , `../1000-earning-opportunity/?uclick=${uclick}`)
    $('.quiz-block--4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=3`)
    $('.quiz-block--5 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=4`)

    window.offer_link_1 = $('.quiz-block--3 a.yes').attr("href")
    window.offer_link_2 = $('.quiz-block--4 a.yes').attr("href")
    window.offer_link_3 = $('.quiz-block--5 a.yes').attr("href")
    window.offer_link_no_3 = $('.quiz-block--5 a.no').attr("href")

    form_final_link()
})

let lastClickTime = 0;

$(".quiz-block--3 .quiz-block-answers a.yes").click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 3 yes")
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
    }
})
$(".quiz-block--3 .quiz-block-answers a.no").click(function(e){
    e.preventDefault()
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--4 .quiz-block-answers a.yes").click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 4 yes")
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
    }
})
$(".quiz-block--4 .quiz-block-answers a.no").click(function(e){
    e.preventDefault()
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--5 .quiz-block-answers a.yes").click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 5 yes")
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
    }
})
$(".quiz-block--5 .quiz-block-answers a.no").click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 5 no")
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
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

})