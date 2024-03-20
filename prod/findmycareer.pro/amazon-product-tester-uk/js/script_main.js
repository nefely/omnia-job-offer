$(document).ready(function(){

$("input[name=firstname]").val("")
$("input[name=lastname]").val("")
$("input[name=email]").val("")
$("input[name=phone]").val("")


if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('00000000000');
}

// validation

// .form-step--1
$(".form-step--1").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");

// .form-step--2
    isFirstNameValid = () => {
        if ($("input[name=firstname]").val().length >= 2) {
            return true
        } else {
            return false
        }
    }
    firstNameValidation = () => {
        if (isFirstNameValid()) {
            $("input[name=firstname]").removeClass("error")
        } else {
            $("input[name=firstname]").focus()
            $("input[name=firstname]").addClass("error")
        }
    }

    isLastNameValid = () => {
        if ($("input[name=lastname]").val().length >= 2) {
            return true
        } else {
            return false
        }
    }
    lastNameValidation = () => {
        if (isLastNameValid()) {
            $("input[name=lastname]").removeClass("error")
        } else {
            $("input[name=lastname]").focus()
            $("input[name=lastname]").addClass("error")
        }
    }

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
        lastNameValidation()
        firstNameValidation()
    });

    $(".form-step--2 input").on("input" , function(){
        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })

    $("input[name=firstname]").on("input" , function(){
        if ($(this).val().length >= 2) {
            $(this).removeClass("error")
        }
    })
    $("input[name=lastname]").on("input" , function(){
        if ($(this).val().length >= 2) {
            $(this).removeClass("error")
        }
    })
    $("input[name=email]").on("input" , function(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error")
        }
    })

// .form-step--3
    isPhoneValid = () => {
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10 || $("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 11) {
            return true
        } else {
            return false
        }
    }
    phoneValidation = () => {
        if (isPhoneValid()) {
            $("input[name=phone]").removeClass("error")
        } else {
            $("input[name=phone]").focus()
            $("input[name=phone]").addClass("error")
        }
    }

    $(".form-step--3 .submit-question").click(function(){
        phoneValidation()
    });

    $(".form-step--3 input").on("input" , function(){
        if (isPhoneValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=phone]").on("input" , function(){
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10 || $("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 11) {
            $(this).removeClass("error")
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
    $('#intro .form').removeClass("pt")
    if ($(window).innerWidth() < 991) {
        $("#intro .figure").fadeOut(standart_time)
    }
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)
})
$(".form-step--2 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)

    window.offer_link_1 = $('.quiz-block--3 a.yes').attr("href")
    window.offer_link_2 = $('.quiz-block--4 a.yes').attr("href")
    window.offer_link_3 = $('.quiz-block--5 a.yes').attr("href")
    window.offer_link_no_3 = $('.quiz-block--5 a.no').attr("href")
})
$(".form-step--3 .btn-next").click(function(e){
    
    $(this).css("display","none").css("visibility","hidden")

    // uncommit on prod
    const clickid = $("[name=click_id]").val();
    const uclick = $("[name=uclick]").val();

    const data = {
        "zip": "", 
        "firstname": $("[name=firstname]").val(), 
        "lastname": $("[name=lastname]").val(), 
        "email": $("[name=email]").val(), 
        "phone": $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "").replaceAll("+", ""), 
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
                window.location.href = `survey/?clickid=${clickid}&uclick=${uclick}&firstname=${data.firstname}&lastname=${data.lastname}&email=${data.email}&telephone=${data.phone.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
            }, standart_time)
        })
        .catch(ed => console.log("error during registration lead in Data API: " + ed));})
    .catch(e => console.log("error during registration lead: " + e));
})

// conmit on prod
// const clickid = "my_click_id_here";
// const uclick = "my_uclick_here";

setTimeout(()=>{

if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

if (isPhoneValid()) {
  $(".form-step--3").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--3").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

}, 1500)


})