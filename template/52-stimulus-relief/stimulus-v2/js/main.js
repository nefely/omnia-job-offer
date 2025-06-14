$(document).ready(function(){
    $('.question[data-question=1] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".program-description[data-description=1]").fadeOut(300)
        $(".list[data-list=1]").fadeOut(300)
        $(".join").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $('.question[data-question=2] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $('.question[data-question=3] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $('.question[data-question=4] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".title[data-title=1]").fadeOut(300)
        $(".stars").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)

            setTimeout(()=>{
                $(".progress .circle-container:eq(0)").addClass("checked")
                setTimeout(()=>{
                    $(".progress .line-container:eq(0)").addClass("checked")
                    setTimeout(()=>{
                        $(".progress .circle-container:eq(1)").addClass("checked")
                        setTimeout(()=>{
                            $(".progress .line-container:eq(1)").addClass("checked")
                            setTimeout(()=>{
                                $(".progress .circle-container:eq(2)").addClass("checked")
                                setTimeout(()=>{
                                    $(".progress").fadeOut(300)
                                    $(".quiz").fadeOut(300)
                                    setTimeout(()=>{
                                        $(".progress").css("margin-bottom", "0")
                                        $(".title[data-title=2]").fadeIn(300)
                                        $(".question[data-question=5]").fadeIn(300)
                                    },300)
                                },1500)
                            },300)
                        },300)
                    },300)
                },300)
            },300)

        },300)

    })

    $('.question[data-question=5] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".title[data-title=2]").fadeOut(300)

        setTimeout(()=>{
            $(".title[data-title=3]").fadeIn(300)
            $(".program-description[data-description=2]").fadeIn(300)
            $(".list[data-list=2]").fadeIn(300)
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $('.question[data-question=6] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".title[data-title=3]").fadeOut(300)
        $(".program-description[data-description=2]").fadeOut(300)
        $(".list[data-list=2]").fadeOut(300)

        setTimeout(()=>{
            $(".title[data-title=4]").fadeIn(300)
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    // form
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


    // 1
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
    $(".question[data-question='7'] .btn").click(function(){
        zipValidation()
        if (isZipValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".question[data-question='7']").fadeOut(300)
            setTimeout(()=>{
                $(".question[data-question='8']").fadeIn(300)
                $("input[name=firstname]").focus()
            },300)
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
    $("input[name=phone]").on("input change" , function(){
        if (isPhoneValid()) {
            $("input[name=phone]").removeClass("is-invalid")
        }
    })



    $(".form [data-question='8'] .btn").click(function(e){
        e.preventDefault()

        $(".form [data-question='8'] .btn").addClass("disabled")

        phoneValidation()
        emailValidation()
        lastNameValidation()
        firstNameValidation()

        if (isFirstNameValid() && isLastNameValid() && isEmailValid() && isPhoneValid()) {

            let offer_start_link = `https://track.${window.location.host}/click`
            let offer_final_link = `${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
            
            console.log(offer_final_link)
            
            // fbq('track', 'CompleteRegistration')
            // ttq.track('CompleteRegistration');
            // pintrk('track', 'signup');
            // snaptr('track', 'SIGN_UP'); 

            $("html, body").animate({ scrollTop: 0 }, 300);
            fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID);

                setTimeout(()=>{
                    $(".form [data-question='8'] .btn").removeClass("disabled")
                    window.location;href = offer_final_link;
                },500)
            })
            .catch(e => console.log("error during registration lead: " + e) , $(".form [data-question='8'] .btn").removeClass("disabled"));

        } else {
            $(".form [data-question='8'] .btn").removeClass("disabled")
        }
        
    });
    


    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    $(".data-1").text(formatDate(today))
    $(".data-2").text(formatDate(yesterday))
    $(".data-3").text(formatDate(threeDaysAgo))

    // test
    // $(".stars").fadeOut(0)
    // $(".join").fadeOut(0)
    // $(".title[data-title=1]").fadeOut(0)
    // $(".list[data-list=1]").fadeOut(0)
    // $(".program-description[data-description=1]").fadeOut(0)
    // $(".question[data-question='1']").fadeOut(0)
    // $(".title[data-title=4]").fadeIn(300)
    // $(".question[data-question='8']").fadeIn(300)
})