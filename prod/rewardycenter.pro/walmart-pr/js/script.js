$(document).ready(function(){

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


    $(".slide-1 .btn").click(function(){
        emailValidation()
        lastNameValidation()
        firstNameValidation()


        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            $("html, body").animate({ scrollTop: 0 }, 300);
            $(".slide-1").fadeOut(300)
            setTimeout(()=>{
                $(".slide-2").fadeIn(300)
                $("input[name=phone]").focus()
            },300)

            let start_offer_link = `https://track.${window.location.host}/click`
            let offer_final_link = `${start_offer_link}${start_offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`

            console.log(offer_final_link)
            
            $("#offer_link").attr("href" , offer_final_link)
        }
    });

    let isDebounced = false;

    $("#offer_link").click(function(e) {
        e.preventDefault();

        if (isDebounced) return; 
        isDebounced = true;

        setTimeout(() => {
            isDebounced = false;
        }, 5000);

        fbq('track', 'CompleteRegistration');

        if (rtkClickID && cachebuster) {
            if (rtkClickID !== "undefined" && cachebuster !== "undefined") {
                fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors' })
                    .then(r => {
                        console.log("successfully registered: " + rtkClickID);
                        setTimeout(() => {
                            window.location.href = $(e.currentTarget).attr("href");
                        }, 500);
                    })
                    .catch(e => console.log("error during registration lead: " + e));
            }
        }
    });


})