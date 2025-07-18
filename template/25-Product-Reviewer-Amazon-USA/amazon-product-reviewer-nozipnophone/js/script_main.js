$(document).ready(function(){

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

    // redirect
    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    $(".form-step--2 .submit-question a").click(function(e){ 
        e.preventDefault()

        emailValidation()
        lastNameValidation()
        firstNameValidation()

        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            // noredirect
            // window.location.href = `${'survey/'}${'survey/'.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`
            // redirect
            window.location.href = `${'survey/'}${'survey/'.includes("?") ? "&" : "?"}rtkcid=${rtkcid}&rtkcmpid=${rtkcmpid}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`
        }
    });

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





// test
// $("#intro .form").fadeOut(0)
// $("section:not(#intro)").fadeOut(0)
// $("footer").fadeOut(0)
// $("#intro .thx").fadeOut(0)
// $("#intro .quiz").fadeIn(0)




// form flow
$(".form-step--1 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    $("#intro .bullets").fadeOut(standart_time)
    $("#intro .main-title > p").fadeOut(standart_time)
    if ($(window).innerWidth() < 991) {
        $("#intro .figure").fadeOut(standart_time)
    }
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)
})

})