let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.offer_start_link = "";
window.offer_final_link = "";

$(document).ready(function(){

$('.question-1 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(0)').addClass("passed")
$('.circles .circle:eq(1)').addClass("active")
})

$('.question-2 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(1)').addClass("passed")
$('.circles .circle:eq(2)').addClass("active")
})

$('.question-3 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(2)').addClass("passed")
$('.circles .circle:eq(3)').addClass("active")
})

$('.question-4 .btn').click(function(){
$(this).closest(".question").fadeOut(0);
$(this).closest(".question").next(".question").fadeIn(0);
$('.circles .circle:eq(3)').addClass("passed")
$('.circles .circle:eq(4)').addClass("active")
})

$('.question-5 .btn').click(function(){

$('.circles .circle:eq(4)').addClass("passed")

$('.step-1 .title > *').css("opacity" , "0");
$('.step-1 .title .analyzing , .step-1 .title .analyzing > *').css("opacity" , "1");
$(".quiz , .card-image").fadeOut(0);
$(".whitebox-1").addClass("transparentbox");

setTimeout(()=>{
    $('.circles .circle:eq(0)').addClass("checked")
},400)
setTimeout(()=>{
    $('.circles .circle:eq(1)').addClass("checked")
},800)
setTimeout(()=>{
    $('.circles .circle:eq(2)').addClass("checked")
},1200)
setTimeout(()=>{
    $('.circles .circle:eq(3)').addClass("checked")
},1600)
setTimeout(()=>{
    $('.circles .circle:eq(4)').addClass("checked")
},2000)

setTimeout(()=>{
    
    $(".step-1").fadeOut(300)
    $(".circles").fadeOut(300);
    $(".whitebox-1").addClass("nopaddingbox")

    setTimeout(()=>{
        $(".step-2").fadeIn(300)
        $(".bg").css("opacity" , "1")
        setTimeout(()=>{
            $('.list-item').removeClass("active")
            $('.list-item:eq(0)').addClass("active")
        },400)
        setTimeout(()=>{
            $('.list-item').removeClass("active")
            $('.list-item:eq(1)').addClass("active")
        },800)
        setTimeout(()=>{
            $('.list-item').removeClass("active")
            $('.list-item:eq(2)').addClass("active")
        },1200)
        setTimeout(()=>{
            $('.list-item').removeClass("active")
            $('.list-item:eq(3)').addClass("active")
        },1600)
        setTimeout(()=>{
            $('.list-item').removeClass("active")
            $('.link a').addClass("active")
        },2000)
        setTimeout(()=>{
            $('.link a').removeClass("active")
            $('.link a').addClass("blink")
        },2400)
    },300)

    window.offer_start_link = $("#btf").attr("href")

},2400)

})

$(".step-2 .btn").click(function(){
    $(".step-2").fadeOut(300)
    setTimeout(()=>{
        $(".step-3").fadeIn(300)
        $(".question-6").fadeIn(300)
    },300)
})



if ($("input[name=phone]").length > 0) {
    $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
    $("input[name=zip]").mask('00000');
}

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
        $("input[name=zip]").removeClass("error")
    } else {
        $("input[name=zip]").focus()
        $("input[name=zip]").addClass("error")
    }
}
$("input[name=zip]").on("input change" , function(){
    if (isZipValid()) {
        $("input[name=zip]").removeClass("error")
    }
})

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
$("input[name=firstname]").on("input change" , function(){
    if (isFirstNameValid()) {
        $("input[name=firstname]").removeClass("error")
    }
})
$("input[name=lastname]").on("input change" , function(){
    if (isLastNameValid()) {
        $("input[name=lastname]").removeClass("error")
    }
})
$("input[name=email]").on("input change" , function(){
    if (isEmailValid()) {
        $("input[name=email]").removeClass("error")
    }
})

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
        $("input[name=phone]").removeClass("error")
    } else {
        $("input[name=phone]").focus()
        $("input[name=phone]").addClass("error")
    }
}

$("input[name=phone]").on("input change" , function(){
    if (isPhoneValid()) {
        $("input[name=phone]").removeClass("error")
    }
})


$('.question-6 .btn').click(function(){
    zipValidation()
    if (isZipValid()) {
        $(this).closest(".question").fadeOut(0);
        $(this).closest(".question").next(".question").fadeIn(0);
        $("input[name=zip]").blur()
        setTimeout(()=>{
            $("input[name=firstname]").focus()
        },300)
    }
})

$('.question-7 .btn').click(function(){
    emailValidation()
    lastNameValidation()
    firstNameValidation()

    if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
        $(this).closest(".question").fadeOut(0);
        $(this).closest(".question").next(".question").fadeIn(0);
        $("input[name=firstname]").blur()
        $("input[name=lastname]").blur()
        $("input[name=email]").blur()

        setTimeout(()=>{
            $("input[name=phone]").focus()
        },300)
    }
})

let lastClickTime = 0;

$('.question-8 .btn').click(function(e){
    e.preventDefault();
    phoneValidation()

    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < 5000) {
        return false;
    } else {
        lastClickTime = currentTime;
        if (isPhoneValid()) {
            const data = {
                "zip": $("[name=zip]").val(), 
                "firstname": $("[name=firstname]").val(), 
                "lastname": $("[name=lastname]").val(), 
                "email": $("[name=email]").val(), 
                "phone": $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", ""), 
                "offer_type": "Product Reviewer", 
                "offer_url": window.location.href, 
                "click_id": rtkClickID
            };

            fetch(`https://track.review-program.pro/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID);
                fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
                .then(rr => {
                    console.log("successfully registered lead in Data API: " + rtkClickID)
                    setTimeout(()=>{
                        window.location.href = `${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}sub12=${$("[name=zip]").val()}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
                    },500)
                })
                .catch(ed => {});
            })
            .catch(e => console.log("error during registration lead: " + e));
        }
    }

});





});