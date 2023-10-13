$(document).ready(function(){

$("input[name=firstname]").val("")
$("input[name=lastname]").val("")
$("input[name=email]").val("")
$("input[name=phone]").val("")


if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}

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

    

    $(".form-step--1 .submit-question").click(function(){
        lastNameValidation()
        firstNameValidation()
    });

    $(".form-step--1 input").on("input" , function(){
        if (isFirstNameValid() && isLastNameValid()) {
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

    isRulesValid = () => {
        if ($("input[name=rules]").is(":checked")) {
            return true
        } else {
            return false
        }
    }
    rulesValidation = () => {
        if (isRulesValid()) {
            $("input[name=rules]").removeClass("error")
        } else {
            $("input[name=rules]").addClass("error")
        }
    }

    isPhoneValid = () => {
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
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

    $(".form-step--2 .submit-question").click(function(){
        phoneValidation()
        emailValidation()
        rulesValidation()
    });

    $(".form-step--2 input").on("input" , function(){
        if (isEmailValid() && isPhoneValid() && isRulesValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=phone]").on("input" , function(){
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
            $(this).removeClass("error")
        }
    })
    $("input[name=email]").on("input" , function(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error")
        }
    })
    $("input[name=rules]").change(function(){
        if ($("input[name=rules]").is(":checked")) {
            $("input[name=rules]").removeClass("error")
        }
    })


// form flow
$(".form-step--1 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    $("#intro .figure--mobile").fadeOut(standart_time)
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
        "firstname": $("[name=firstname]").val(), 
        "lastname": $("[name=lastname]").val(), 
        "email": $("[name=email]").val(), 
        "phone": $("[name=phone]").val(), 
        "offer_type": $("[name=offer_type]").val(), 
        "offer_url": window.location.href.split('?')[0], 
        "click_id": clickid,
        "zip": ""
    };

    // uncommit on prod
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&payout=0&cnv_status=registration`, { mode: 'no-cors'})
    .then(r => {console.log("successfully registered: " + clickid);
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

if (isFirstNameValid() && isLastNameValid() ) {
  $(".form-step--1").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--1").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

if (isPhoneValid() && isEmailValid() && isRulesValid()) {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

console.log(isFirstNameValid() && isLastNameValid())
console.log(isPhoneValid() && isEmailValid() && isRulesValid())

}, 1500)


});