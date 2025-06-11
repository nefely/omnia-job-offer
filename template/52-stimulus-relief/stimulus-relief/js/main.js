$(document).ready(function(){

    $(".faq .item .visible").click(function(){
        $(this).closest(".item").toggleClass("active")
    })


    if ($("input[name=phone]").length > 0) {
        $("input[name=phone]").mask('(000) 000-0000');
    }

    setTimeout(()=>{
        $("input[name=firstname]").val("")
        $("input[name=lastname]").val("")
        $("input[name=email]").val("")
        $("input[name=phone]").val("")
    },500)


    // 1
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
    $("input[name=email]").on("input change" , function(){
        if (isEmailValid()) {
            $("input[name=email]").removeClass("is-invalid")
        }
    })

    $(".form [data-question='1'] .btn").click(function(){
        emailValidation()
        if (isEmailValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".form [data-question='1']").fadeOut(0)
            setTimeout(()=>{
                $(".form [data-question='2']").fadeIn(0)
                $("input[name=firstname]").focus()
            },0)
        }
    });

    // 2
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
    $(".form [data-question='2'] .btn").click(function(){
        lastNameValidation()
        firstNameValidation()


        if (isFirstNameValid() && isLastNameValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".form [data-question='2']").fadeOut(0)
            setTimeout(()=>{
                $(".form [data-question='3']").fadeIn(0)
                $("input[name=phone]").focus()
            },0)
        }
    });


    // 3
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


    $(".form [data-question='3'] .btn").click(function(e){
        phoneValidation()

        if (isPhoneValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $("input[name=phone]").blur()
            $(".form [data-question='3']").fadeOut(0)
            setTimeout(()=>{
                $(".form [data-question='4']").fadeIn(0)
            },0)
        }
    });

    $(".form [data-question='4'] .btn").click(function(e){
        $("html, body").animate({ scrollTop: 0 }, 300);
        $(".form [data-question='4']").fadeOut(0)
        setTimeout(()=>{
            $(".form [data-question='5']").fadeIn(0)
        },0)
    })

    $(".form [data-question='5'] .btn").click(function(e){
        $("html, body").animate({ scrollTop: 0 }, 300);
        $(".form [data-question='5']").fadeOut(0)
        setTimeout(()=>{
            $(".form [data-question='6']").fadeIn(0)
        },0)
    })

    $(".form [data-question='6'] .btn").click(function(e){
        $("html, body").animate({ scrollTop: 0 }, 300);
        $(".form [data-question='6']").fadeOut(0)
        setTimeout(()=>{
            $(".form [data-question='7']").fadeIn(0)
        },0)
    })

    $(".form [data-question='7'] .btn").click(function(e){
        e.preventDefault()
        $("html, body").animate({ scrollTop: 0 }, 300);

        console.log("offer_link clicked")

        $(".form [data-question='7'] .btn").addClass("disabled")

        let email = $("input[name=email]").val()
        let firstname = $("input[name=firstname]").val()
        let lastname = $("input[name=lastname]").val()
        let phone = $("input[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")

        // fbq('track', 'CompleteRegistration')
        // ttq.track('CompleteRegistration');
        // pintrk('track', 'signup');
        // snaptr('track', 'SIGN_UP'); 

        if (rtkClickID && cachebuster) {
            if (rtkClickID !== "undefined" && cachebuster !== "undefined") {
                fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
                .then(r => {
                    console.log("successfully registered: " + rtkClickID);

                    window.offer_link = `https://track.${window.location.host}/click`
                    window.offer_final_link = `${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${firstname}&sub14=${lastname}&sub15=${email}&sub16=${phone}`
                    
                    setTimeout(()=>{
                        $(".form [data-question='7'] .btn").removeClass("disabled")
                        window.location.href = offer_final_link
                    },500)
                })
                .catch(e => console.log("error during registration lead: " + e));
            }
        }

    })



})