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

    setTimeout(()=>{
        $(".welcome").fadeOut(300)
        setTimeout(()=>{
            $('header').css("opacity" , "1")
            $('.progress').css("opacity" , "1")
            $('.quiz').fadeIn(300)
            $("body").css("background-color" , "#fff")
        },300)
    },3000)
    
    $(".question[data-question='1'] .answers .btn").click(function(){
        $(".progress .line-container:eq(0)").addClass("active")
        $(".question[data-question='1']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(1)").addClass("active")
            $(".question[data-question='2']").fadeIn(300)
        },300)
    })
    
    $(".question[data-question='2'] .answers .btn").click(function(){
        $(".progress .line-container:eq(1)").addClass("active")
        $(".question[data-question='2']").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(2)").addClass("active")
            $(".question[data-question='3']").fadeIn(300)
        },300)
    })

    $(".question[data-question='3'] .answers .btn").click(function(){
        $(".question[data-question='3']").fadeOut(300)
        $('.quiz').fadeOut(300)
        setTimeout(()=>{
            $('.analizer').fadeIn(300)
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
                                    $(".progress").css("opacity" , "0")
                                    $(".analizer").fadeOut(300)
                                    $(".quiz").fadeOut(300)
                                    setTimeout(()=>{
                                        $(".progress").css("margin-bottom", "0")
                                        $(".congratulation").fadeIn(300)
                                    },300)
                                },1500)
                            },300)
                        },300)
                    },300)
                },300)
            },300)
        },300)
    })

    $(".congratulation .btn").click(function(){
        $(".congratulation").fadeOut(300)
        $(".progress").fadeOut(300)

        setTimeout(()=>{
            $(".form").fadeIn(300)
            $(".filler").fadeIn(300)
            $(".form .question[data-question='1']").fadeIn(300)
        },300)
    })

    const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
    const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

    if (rtkClickID__ && cachebuster__) {
        if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
            fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID__);
            })
            .catch(e => console.log("error during registration lead: " + e));
        }
    }
    
    // form question 1
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
    $(".form [data-question='1'] .btn").click(function(){
        emailValidation()
        lastNameValidation()
        firstNameValidation()

        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".form [data-question='1']").fadeOut(300)
            setTimeout(()=>{
                $(".form [data-question='2']").fadeIn(300)
                $("input[name=phone]").focus()
            },300)
        }
    });



    // form question 2
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


    $("input[name=phone]").on("input change" , function(){
        if (isPhoneValid()) {
            $("input[name=phone]").removeClass("is-invalid")
        }
    })

    $("input[name=zip]").on("input change" , function(){
        if (isZipValid()) {
            $("input[name=zip]").removeClass("is-invalid")
        }
    })

    let offer_start_link = `https://track.${window.location.host}/click`

    $(".form [data-question='2'] .btn").click(function(e){
        e.preventDefault()
        zipValidation()
        phoneValidation()

        if (isPhoneValid() && isZipValid()) {

            $(".btn-group-offer").fadeOut(0)
            $(".btn-group-loader").fadeIn(0)

            $("html, body").animate({ scrollTop: 0 }, 300);

            let data = {
                "zip": $("[name=zip]").val(), 
                "firstname": $("[name=firstname]").val(), 
                "lastname": $("[name=lastname]").val(), 
                "email": $("[name=email]").val(), 
                "phone": $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", ""), 
                "offer_type": "Product Reviewer", 
                "offer_url": window.location.href.split('?')[0].replace("/survey/" , "").replace("/survey" , ""), 
                "click_id": rtkClickID__
            };

            if (rtkClickID__ && cachebuster__) {
                if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
                    fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
                    .then(rr => {
                        console.log("successfully registered lead in Data API: " + rtkClickID__)
                        console.log(`${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`)
                        window.location.href = `${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
                    })
                    .catch(ed => {
                        $(".btn-group-offer").fadeIn(0)
                        $(".btn-group-loader").fadeOut(0)
                    });
                }
            }

            $("input[name=phone]").blur()
            $("input[name=zip]").blur()
            
        }
    })

})