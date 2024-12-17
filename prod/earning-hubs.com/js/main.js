$(document).ready(function(){


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
            $("input[name=zip]").removeClass("is-invalid")
        } else {
            $("input[name=zip]").focus()
            $("input[name=zip]").addClass("is-invalid")
        }
    }
    $("input[name=zip]").on("input change" , function(){
        if (isZipValid()) {
            $("input[name=zip]").removeClass("is-invalid")
        }
    })
    $(".form .form-step[data-step=1] .btn[type=submit]").click(function(){
        zipValidation()
        if (isZipValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".form .form-step[data-step=1]").fadeOut(300)
            $('.hero .slug').fadeOut(300)

            if ($(window).width() < 992) {
                $('.hero .list').fadeOut(300)
                $('.hero .subtitle').css("margin-bottom" , "0")
            }
            setTimeout(()=>{
                $(".form .form-step[data-step=2]").fadeIn(300)
                $("input[name=firstname]").focus()
            },300)
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
            $("input[name=firstname]").removeClass("is-invalid")
        } else {
            $("input[name=firstname]").focus()
            $("input[name=firstname]").addClass("is-invalid")
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
            $("input[name=lastname]").removeClass("is-invalid")
        } else {
            $("input[name=lastname]").focus()
            $("input[name=lastname]").addClass("is-invalid")
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
            $("input[name=email]").removeClass("is-invalid")
        } else {
            $("input[name=email]").focus()
            $("input[name=email]").addClass("is-invalid")
        }
    }
    $("input[name=firstname]").on("input change" , function(){
        if (isFirstNameValid()) {
            $("input[name=firstname]").removeClass("is-invalid")
        }
    })
    $("input[name=lastname]").on("input change" , function(){
        if (isLastNameValid()) {
            $("input[name=lastname]").removeClass("is-invalid")
        }
    })
    $("input[name=email]").on("input change" , function(){
        if (isEmailValid()) {
            $("input[name=email]").removeClass("is-invalid")
        }
    })
    $(".form .form-step[data-step=2] .btn[type=submit]").click(function(){
        emailValidation()
        lastNameValidation()
        firstNameValidation()

        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".form .form-step[data-step=2]").fadeOut(300)
            setTimeout(()=>{
                $('.hero .slug').fadeIn(300)
                if ($(window).width() < 992) {
                    $('.hero .list').fadeIn(300)
                    $('.hero .subtitle').css("margin-bottom" , "1rem")
                }
                $(".form .form-step[data-step=3]").fadeIn(300)
                $("input[name=phone]").focus()
            },300)
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
            $("input[name=phone]").removeClass("is-invalid")
        } else {
            $("input[name=phone]").focus()
            $("input[name=phone]").addClass("is-invalid")
        }
    }

    $("input[name=phone]").on("input change" , function(){
        if (isPhoneValid()) {
            $("input[name=phone]").removeClass("is-invalid")
        }
    })

    let lastClickTime = 0;

    $(".form .form-step[data-step=3] .btn[type=submit]").click(function(e){
        const currentTime = new Date().getTime();
        e.preventDefault()
        phoneValidation()

        if (currentTime - lastClickTime < 5000) {
            return false;
        } else {
            if (isPhoneValid()) {
                $("html, body").animate({ scrollTop: 0 }, 300);
                // $(".form .form-step[data-step=3]").fadeOut(300)
                $("input[name=phone]").blur()

                const clickid = typeof rtkClickID !== 'undefined' ? rtkClickID : 'undefined';
                const rtkck = typeof cachebuster !== 'undefined' ? cachebuster : 'undefined';

                window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${clickid}&rtkck=${rtkck}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}&offer_type=Product Reviewer`;
            }
        }
        
    });

    $(".asked-question .question-title").click(function(){

        if (!$(this).closest(".question-item").hasClass("active")) {
            $(this).closest(".asked-question").find(".question-item").removeClass("active")
            $(this).closest(".question-item").addClass("active")
        } else {
            $(this).closest(".asked-question").find(".question-item").removeClass("active")
        }
    })

    $(".to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });

})