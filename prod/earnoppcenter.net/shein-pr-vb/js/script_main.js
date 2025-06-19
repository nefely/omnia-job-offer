$(document).ready(function(){

$("input[name=firstname]").val("")
$("input[name=lastname]").val("")
$("input[name=email]").val("")
$("input[name=phone]").val("")


if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
  $("input[name=zip]").mask('00000');
}

// validation

// .form-step--1
    isZipValid = () => {
        if ($("input[name=zip]").val().length == 5) {
            return true
        } else {
            return false
        }
    }
    zipValidation = () => {
        if (isZipValid()) {
            $("input[name=zip]").removeClass("error")
        } else {
            $("input[name=zip]").focus()
            $("input[name=zip]").addClass("error")
        }
    }
    $(".form-step--1 .submit-question").click(function(){
        zipValidation()
    });
    $(".form-step--1 input").on("input" , function(){
        if (isZipValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=zip]").on("input" , function(){
        if ($(this).val().length == 5) {
            $(this).removeClass("error")
        }
    })

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

    $(".form-step--3 .submit-question").click(function(){
        phoneValidation()
    });

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    $(".form-step--3 input").on("input" , function(){
        window.final_link = `${final_link__no_params}${final_link__no_params.includes("?") ? "&" : "?"}rtkcid=${rtkcid}&rtkcmpid=${rtkcmpid}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}&offer_type=${$("[name=offer_type]").val()}`
        // window.final_link = `${final_link__no_params}${final_link__no_params.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}&offer_type=${$("[name=offer_type]").val()}`
        $("#btf").attr("href" , final_link)

        if (isPhoneValid()) {
            $(this).closest(".form-step").find(".submit-question a").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question a").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=phone]").on("input" , function(){
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
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
window.final_link = ""
window.final_link__no_params = ""

// form flow
$(".form-step--1 .btn-next").click(function(e){
    window.final_link__no_params = $("#btf").attr("href");
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
    $(this).closest(".form-step").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)
})
$(".form-step--3 .btn-next").click(function(e){
    e.preventDefault();
    $(this).css("display","none").css("visibility","hidden")
    setTimeout(()=>{
        $(this).css("display","block").css("visibility","visible")
        window.location.href = $(".form-step--3 .btn-next").attr('href');
    }, standart_time)
});

setTimeout(()=>{

if (isZipValid()) {
  $(".form-step--1").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--1").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--2").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
}

if (isPhoneValid()) {
  $(".form-step--3").find(".submit-question a").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".form-step--3").find(".submit-question a").css("pointer-events" , "none").addClass("disabled");
}

}, 1500)


})