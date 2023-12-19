$(document).ready(function(){

$("input[name=email]").val("")

$('.slider').slick({
	arrows: false,
	infinite: false,
	variableWidth: false,
	slidesToShow: 3,
	responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '40px',
      }
    }]
});

function checkWindowSize() {
    if ($(window).width() <= 991) {
        $('.container--slider').removeClass('container');
        $('.container--start').removeClass('container');
    } else {
        $('.container--slider').addClass('container');
        $('.container--start').addClass('container');
    }
}
checkWindowSize();
$(window).resize(checkWindowSize);
	
// validation

// .form-step--1
    $(".form-step--1 .submit-question").click(function(){});
    $(".form-step--1").closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");

// .form-step--2
    isEmailValid = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            return true
        } else {
            return false
        }
    }
    emailValidation = () => {
        if (isEmailValid()) {
            $("input[name=email]").removeClass("error")
        } else {
            $("input[name=email]").focus()
            $("input[name=email]").addClass("error")
        }
    }

    $(".form-step--2 .submit-question").click(function(){
        emailValidation()
    });

    $(".form-step--2 input").on("input" , function(){
        if (isEmailValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })

    $("input[name=email]").on("input" , function(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error")
        }
    })






// test
// $("#intro .form").fadeOut(0)
// $("section:not(#intro)").fadeOut(0)
// $("footer").fadeOut(0)
// $("#intro .thx").fadeOut(0)
// $("#intro .quiz").fadeIn(0)




// main flow



// form flow
$(".form-step--1 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    $("#intro .bullets").fadeOut(standart_time)
    if ($(window).innerWidth() < 991) {
        $("#intro .figure").fadeOut(standart_time)
    }
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)
})
$(".form-step--2 .btn-next").click(function(e){
    
    $(this).css("display","none").css("visibility","hidden")

    // uncommit on prod
    const clickid = $("[name=click_id]").val();
    const uclick = $("[name=uclick]").val();

    const data = {
        "zip": "", 
        "firstname": "", 
        "lastname": "", 
        "email": $("[name=email]").val(), 
        "phone": "", 
        "offer_type": $("[name=offer_type]").val(), 
        "offer_url": window.location.href.split('?')[0], 
        "click_id": clickid
    };

    // uncommit on prod
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&payout=0&cnv_status=registration`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + clickid);
        fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => {
            console.log("successfully registered lead in Data API: " + clickid)
            setTimeout(()=>{
                $(this).css("display","block").css("visibility","visible")
                window.location.href = `survey/?clickid=${clickid}&uclick=${uclick}&email=${data.email}`
            }, standart_time)
        })
        .catch(ed => console.log("error during registration lead in Data API: " + ed));})
    .catch(e => console.log("error during registration lead: " + e));
})

// conmit on prod
// const clickid = "my_click_id_here";
// const uclick = "my_uclick_here";

setTimeout(()=>{

if (isEmailValid()) {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

}, 1500)


})