$(document).ready(function(){
  $('.faq-section .item-visible').click(function(){
    $(this).closest(".item").toggleClass("active")
  })  


  $(".form").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    adaptiveHeight: true,
    infinity: false,
    accessibility: false,
    draggable: false,
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
  })

if ($("input[name=phone]").length > 0) {
    $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
    $("input[name=zip]").mask('00000');
}
setTimeout(()=>{
    $("input[name=zip]").val("")
    $("input[name=firstname]").val("")
    $("input[name=lastname]").val("")
    $("input[name=email]").val("")
    $("input[name=phone]").val("")
    $('.form').slick('slickGoTo', 0);
},500)


// form question 1
isZipValid = () => {
    if ($("input[name=zip]").val().length == 5) {
        return true
    } else {
        return false
    }
}
zipValidation = () => {
    if (isZipValid()) {
        $("input[name=zip]").closest(".form-element-container").removeClass("error")
    } else {
        $("input[name=zip]").focus()
        $("input[name=zip]").closest(".form-element-container").addClass("error")
    }
}
$("input[name=zip]").on("input change" , function(){
    if (isZipValid()) {
        $("input[name=zip]").closest(".form-element-container").removeClass("error")
    }
})
$(".form .question-1 .submit-question button").click(function(){
    zipValidation()
    if (isZipValid()) {
        $("input[name=firstname]").focus()
        $('.form').slick('slickGoTo', 1);
        if ($(window).width() <= 991 ) {
            $('.bullet-items').slideUp(300)
        }
        // setTimeout(()=>{
        //     $('html, body').animate({
        //         scrollTop: $('.hero-form').offset().top - (window.innerHeight - $('.hero-form').outerHeight()) + 20
        //     }, 1000);
        // },500)
    }
});


// form question 2
isFirstNameValid = () => {
    if ($("input[name=firstname]").val().length >= 2) {
        return true
    } else {
        return false
    }
}
firstNameValidation = () => {
    if (isFirstNameValid()) {
        $("input[name=firstname]").closest(".form-element-container").removeClass("error")
    } else {
        $("input[name=firstname]").focus()
        $("input[name=firstname]").closest(".form-element-container").addClass("error")
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
        $("input[name=lastname]").closest(".form-element-container").removeClass("error")
    } else {
        $("input[name=lastname]").focus()
        $("input[name=lastname]").closest(".form-element-container").addClass("error")
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
        $("input[name=email]").closest(".form-element-container").removeClass("error")
    } else {
        $("input[name=email]").focus()
        $("input[name=email]").closest(".form-element-container").addClass("error")
    }
}
$("input[name=firstname]").on("input change" , function(){
    if (isFirstNameValid()) {
        $("input[name=firstname]").closest(".form-element-container").removeClass("error")
    }
})
$("input[name=lastname]").on("input change" , function(){
    if (isLastNameValid()) {
        $("input[name=lastname]").closest(".form-element-container").removeClass("error")
    }
})
$("input[name=email]").on("input change" , function(){
    if (isEmailValid()) {
        $("input[name=email]").closest(".form-element-container").removeClass("error")
    }
})
$(".form .question-2 .submit-question button").click(function(){
    emailValidation()
    lastNameValidation()
    firstNameValidation()

    if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
        $("input[name=phone]").focus()
        $('.form').slick('slickGoTo', 2);
    }
});

// form question 3
isPhoneValid = () => {
    if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
        return true
    } else {
        return false
    }
}
phoneValidation = () => {
    if (isPhoneValid()) {
        $("input[name=phone]").closest(".form-element-container").removeClass("error")
    } else {
        $("input[name=phone]").focus()
        $("input[name=phone]").closest(".form-element-container").addClass("error")
    }
}

$("input[name=phone]").on("input change" , function(){
    if (isPhoneValid()) {
        $("input[name=phone]").closest(".form-element-container").removeClass("error")
    }
})

$(".form .question-3 .submit-question a").click(function(e){
    e.preventDefault()
    phoneValidation()
    if (isPhoneValid()) {
        $("input[name=phone]").blur()
        window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}&offer_type=Product Reviewer`
    }
});





})