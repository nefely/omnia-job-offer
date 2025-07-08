$(document).ready(function(){
    $(".faq .card .title").click(function(){
        $(this).closest(".card").toggleClass("active")
    })
    $(".to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });


    setTimeout(()=>{
        $("input[name=firstname]").val("")
        $("input[name=lastname]").val("")
        $("input[name=email]").val("")
    },500)


    $(".intro-form .form-step-1 .btn[type=submit]").click(function(){
        $("html, body").animate({ scrollTop: 0 }, 300);
        $(".intro-form .form-step-1").fadeOut(300)
        $('.intro .intro-list').fadeOut(300)
        setTimeout(()=>{
            $(".intro-form .form-step-2").fadeIn(300)
            $("input[name=firstname]").focus()
        },300)
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

    // redirect
    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    let lastClickTime = 0;

    $(".intro-form .form-step-2 .btn[type=submit]").click(function(e){
        const currentTime = new Date().getTime();

        e.preventDefault()

        emailValidation()
        lastNameValidation()
        firstNameValidation()

        $("html, body").animate({ scrollTop: 0 }, 300);

        if (currentTime - lastClickTime < 5000) {
            return false;
        } else {
            if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
                $("html, body").animate({ scrollTop: 0 }, 300);
                // noredirect
                // window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`;
                // redirect
                window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}rtkcid=${rtkcid}&rtkcmpid=${rtkcmpid}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`
            }
        }

    });

})