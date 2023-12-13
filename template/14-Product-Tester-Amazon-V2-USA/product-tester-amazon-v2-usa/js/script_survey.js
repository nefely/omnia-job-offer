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

$(".firstname").text(firstname)

form_final_link = () => {
    // console.log(window.offer_link)

    console.log(clickid)
    console.log(uclick)
    console.log(email)
    console.log(firstname)
    console.log(lastname)
    console.log(telephone)
    console.log(zip)

    // $(".quiz-block--7 a").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )
    $(".quiz-block--8 a").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}zippost=${zip}&email=${email}&firstname=${firstname}&lastname=${lastname}&telephone=${telephone}` )
}
	
// quiz flow
$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)

    // $('.quiz-block--7 a').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=1`)
    $('.quiz-block--8 a').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=1`)
    // window.offer_link_1 = $('.quiz-block--7 a').attr("href")
    window.offer_link_1 = $('.quiz-block--8 a').attr("href")
    form_final_link()

})

$(".quiz-block--3 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")
    $('.quiz-dots ul li:eq(3)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--4 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")
    $('.quiz-dots ul li:eq(3)').addClass("active")
    $('.quiz-dots ul li:eq(4)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--5 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)

    setTimeout(()=>{
        $('.quiz-dots ul li:eq(0)').addClass("green")
        setTimeout(()=>{
            $('.quiz-dots ul li:eq(1)').addClass("green")
            setTimeout(()=>{
                $('.quiz-dots ul li:eq(2)').addClass("green")
                setTimeout(()=>{
                    $('.quiz-dots ul li:eq(3)').addClass("green")
                    setTimeout(()=>{
                        $('.quiz-dots ul li:eq(4)').addClass("green")
                        setTimeout(()=>{
                            $(".quiz-dots").fadeOut(standart_time)
                            $(this).closest(".quiz-block").next(".quiz-block").fadeOut(standart_time)
                            setTimeout(()=>{
                                $(this).closest(".quiz-block").next(".quiz-block").next(".quiz-block").fadeIn(standart_time)
                                startTimer()
                            }, standart_time)
                        },standart_time)
                    },standart_time)
                },standart_time)
            },standart_time)
        },standart_time)
    },standart_time)
})

$(".quiz-block--7 .btn-box a").click(function(e){
    e.preventDefault()

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})


var timer;

$(document).ready(function () {
  $('#startButton').on('click', function () {
    startTimer();
  });
});

function startTimer() {
  var timeInSeconds = 600;
  displayTime(timeInSeconds);
  timer = setInterval(function() {
    timeInSeconds--;
    displayTime(timeInSeconds);
    if (timeInSeconds <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}
function displayTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  $(".timer .min").text(pad(minutes))
  $(".timer .sec").text(pad(remainingSeconds))
}
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}


let lastClickTime = 0;

$(".quiz-block--8 a").click(function(e){
    e.preventDefault()
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
        console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        console.log("click 8q")
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q8click`, { mode: 'no-cors'});

        $(".popup").fadeIn(300)
        $(".popup .first-text").addClass("active")
        setTimeout(() => {
            $(".popup .first-text").fadeOut(300)
            setTimeout(()=>{
                $(".popup .second-text").fadeIn(300)
                $(".popup").addClass("second")
                setTimeout(()=>{
                    $(".popup .second-text").addClass("active")
                    setTimeout(()=>{
                        window.location.href = $(".quiz-block--8 a").attr("href")
                    },1000)
                },600)
            },300)
        }, 3000);

    }
})

// $(".quiz-block--3 .quiz-block-answers a.yes").click(function(e){
//     const currentTime = new Date().getTime();
//     if (currentTime - lastClickTime < 5000) {
//         console.log("Too soon! Wait for 5 seconds between clicks.");
//         e.preventDefault();
//         return false;
//     } else {
//         lastClickTime = currentTime;
//         console.log("click 3 yes")
//         fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
//     }
// })
// $(".quiz-block--3 .quiz-block-answers a.no").click(function(e){
//     e.preventDefault()
//     fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
//     $(this).closest(".quiz-block").fadeOut(standart_time)
//     setTimeout(()=>{
//         $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
//     }, standart_time)
// })
// $(".quiz-block--4 .quiz-block-answers a.yes").click(function(e){
//     const currentTime = new Date().getTime();
//     if (currentTime - lastClickTime < 5000) {
//         console.log("Too soon! Wait for 5 seconds between clicks.");
//         e.preventDefault();
//         return false;
//     } else {
//         lastClickTime = currentTime;
//         console.log("click 4 yes")
//         fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
//     }
// })
// $(".quiz-block--4 .quiz-block-answers a.no").click(function(e){
//     e.preventDefault()
//     fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
//     $(this).closest(".quiz-block").fadeOut(standart_time)
//     setTimeout(()=>{
//         $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
//     }, standart_time)
// })
// $(".quiz-block--5 .quiz-block-answers a.yes").click(function(e){
//     const currentTime = new Date().getTime();
//     if (currentTime - lastClickTime < 5000) {
//         console.log("Too soon! Wait for 5 seconds between clicks.");
//         e.preventDefault();
//         return false;
//     } else {
//         lastClickTime = currentTime;
//         console.log("click 5 yes")
//         fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
//     }
// })
// $(".quiz-block--5 .quiz-block-answers a.no").click(function(e){
//     const currentTime = new Date().getTime();
//     if (currentTime - lastClickTime < 5000) {
//         console.log("Too soon! Wait for 5 seconds between clicks.");
//         e.preventDefault();
//         return false;
//     } else {
//         lastClickTime = currentTime;
//         console.log("click 5 no")
//         fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
//     }
// })

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
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
})
$(".quiz-block--4 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")
})
$(".quiz-block--5 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")
    $('.quiz-dots ul li:eq(3)').addClass("active")
})

})