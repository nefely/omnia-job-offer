$(document).ready(function(){



$('[data-page="index"] #tosurvey').click(function(){
    $('[data-page="index"]').fadeOut(0)
    $('[data-page="survey"]').fadeIn(0)
    $('[data-el="survey-question-1"]').fadeIn(300)
    startTimer()
})

$('[data-el="survey-question-1"] button').click(function(){
    $('[data-el="survey-question-1"]').fadeOut(0)
    $('[data-el="survey-question-2"]').fadeIn(300)
    $('[data-el="survey-progress"]').fadeIn(300)
    setProgress(0 , 33)
})

$('[data-el="survey-question-2"] button').click(function(){
    $('[data-el="survey-question-2"]').fadeOut(0)
    $('[data-el="survey-question-3"]').fadeIn(300)
    setProgress(33 , 66)
})

$('[data-el="survey-question-3"] button').click(function(){
    $('[data-el="survey-question-3"]').fadeOut(0)
    $('[data-el="survey-loader"]').fadeIn(300)
    setProgress(66 , 100)

    setTimeout(()=>{
        $('[data-el="survey-loader"]').fadeOut(0)
        $('[data-el="progress-requirements"]').fadeOut(0)
        $('[data-el="survey-final"]').fadeIn(300)
    },5300)
})

// new
$('[data-el="survey-final"] button').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 300);
    $('[data-el="survey-final"]').fadeOut(0)
    $('[data-el="survey-progress"]').fadeOut(0)
    $('[data-el="survey-form"]').fadeIn(300)
})

// form
window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
setTimeout(()=>{
    $("input[name=firstname]").val("")
    $("input[name=lastname]").val("")
    $("input[name=email]").val("")
},500)

isFirstNameValid = () => {
    if ($("input[name=firstname]").val().length >= 2 && /^[A-Za-z]{2,}$/.test($("input[name=firstname]").val())) {
        return true
    } else {
        return false
    }
}
firstNameValidation = () => {
    if (isFirstNameValid()) {
        $("input[name=firstname]").closest(".form-group").removeClass("is-invalid")
        $(".firstname_error").text("")
    } else {
        $("input[name=firstname]").focus()
        $("input[name=firstname]").closest(".form-group").addClass("is-invalid")

        if (!/^[A-Za-z]$/.test($("input[name=firstname]").val())) {
            $(".firstname_error").text("Field value must contain only letter")
        }
        if ($("input[name=firstname]").val().length < 2) {
            $(".firstname_error").text("Field value too short")
        }
        if ($("input[name=firstname]").val().length == 0) {
            $(".firstname_error").text("Field value is required")
        }
    }
}
isLastNameValid = () => {
    if ($("input[name=lastname]").val().length >= 2 && /^[A-Za-z]{2,}$/.test($("input[name=lastname]").val())) {
        return true
    } else {
        return false
    }
}
lastNameValidation = () => {
    if (isLastNameValid()) {
        $("input[name=lastname]").closest(".form-group").removeClass("is-invalid")
        $(".lastname_error").text("")
    } else {
        $("input[name=lastname]").focus()
        $("input[name=lastname]").closest(".form-group").addClass("is-invalid")

        if (!/^[A-Za-z]$/.test($("input[name=lastname]").val())) {
            $(".lastname_error").text("Field value must contain only letter")
        }
        if ($("input[name=lastname]").val().length < 2) {
            $(".lastname_error").text("Field value too short")
        }
        if ($("input[name=lastname]").val().length == 0) {
            $(".lastname_error").text("Field value is required")
        }
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
        $(".email_error").text("")
    } else {
        $("input[name=email]").focus()
        $("input[name=email]").closest(".form-group").addClass("is-invalid")

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $(".email_error").text("Enter a valid email address")
        }
        if ($("input[name=email]").val().length == 0) {
            $(".email_error").text("Field value is required")
        }
    }
}

$("input[name=firstname]").on("input change" , function(){
    if (isFirstNameValid()) {
        $("input[name=firstname]").closest(".form-group").removeClass("is-invalid")
    }
    $(".firstname_error").text("")
    makeOfferLinkActive()
})
$("input[name=lastname]").on("input change" , function(){
    if (isLastNameValid()) {
        $("input[name=lastname]").closest(".form-group").removeClass("is-invalid")
    }
    $(".lastname_error").text("")
    makeOfferLinkActive()
})
$("input[name=email]").on("input change" , function(){
    if (isEmailValid()) {
        $("input[name=email]").closest(".form-group").removeClass("is-invalid")
    }
    $(".email_error").text("")
    makeOfferLinkActive()
})

makeOfferLinkActive = () => {
    if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
        $("#offer_link").removeClass("disabled")
    } else {
        $("#offer_link").addClass("disabled")
    }
}


// redirect
const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

let lastClickTime = 0;

$("#offer_link").click(function(e){
    e.preventDefault()
    $("html, body").animate({ scrollTop: 0 }, 300);

    const currentTime = new Date().getTime();

    emailValidation()
    lastNameValidation()
    firstNameValidation()

    if (currentTime - lastClickTime < 5000) {
        return false;
    } else {
        lastClickTime = currentTime;
        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            // redirect
            if (rtkcid && rtkcid !== "undefined") {
                fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
                .then(r => {
                    console.log("successfully registered: " + rtkcid);
                    window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}`
                })
                .catch(e => console.log("error during registration lead: " + e));
            }
        }
    }
});



const setProgress = (oldValue, newValue) => {
    const container = document.querySelector('[data-el="survey-progress"]');
    if (!container) return;

    container.style.display = 'block';

    const percentageText = container.querySelector('.flex.justify-between span:last-child');
    const bar = container.querySelector('div.bg-gray-200 > div');

    const duration = 2000; 
    const frameRate = 60; 
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const step = (newValue - oldValue) / totalFrames;

    let current = oldValue;
    let frame = 0;

    const animate = () => {
        current += step;
        frame++;

        const currentValue = Math.round(current);
        const clamped = Math.max(0, Math.min(100, currentValue));
        percentageText.textContent = `${clamped}%`;
        bar.style.width = `${clamped}%`;

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    };

    animate();
};

const startTimer = () => {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;

    let remainingSeconds = 15 * 60;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    timerEl.textContent = formatTime(remainingSeconds);

    const interval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            timerEl.textContent = "00:00";
            clearInterval(interval);
            return;
        }

        timerEl.textContent = formatTime(remainingSeconds);
    }, 1000);
};

// test
// $('[data-page="index"]').fadeOut(0)
// $('[data-page="survey"]').fadeIn(0)
// $('[data-el="survey-final"]').fadeOut(0)
// $('[data-el="survey-form"]').fadeIn(300)
// startTimer()

})