$(document).ready(function(){

if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
  $("input[name=zip]").mask('00000');
}

window.domain = window.location.hostname;
$(".domain").text(domain)

$(".mailto").attr("href" , `mailto:contact@${domain}`)

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

$('.slider').slick({
	arrows: false,
	infinite: false,
	variableWidth: false,
	slidesToShow: 3,
	responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '40px',
      }
    }]
});


$("header a").click(function(e){
    e.preventDefault();
    var full_url = this.href;
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500);
});

$(".start-subscribe a").click(function(e){
    e.preventDefault();
    var full_url = this.href;
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500);
})


function checkWindowSize() {
    if ($(window).width() <= 991) {
        $('.container--slider').removeClass('container');
        $('.container--start').removeClass('container');
    } else {
        $('.container--slider').addClass('container');
        $('.container--start').addClass('container');
    }
}
checkWindowSize();
$(window).resize(checkWindowSize);
	
// validation

// .form-step--1
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
    $(".form-step--1 .submit-question").click(function(){
        zipValidation()
    });
    $(".form-step--1 input").on("input" , function(){
        if (isZipValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=zip]").on("input" , function(){
        if ($(this).val().length == 5) {
            $(this).removeClass("error")
        }
    })

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

    $(".form-step--2 .submit-question").click(function(){
        emailValidation()
        lastNameValidation()
        firstNameValidation()
    });

    $(".form-step--2 input").on("input" , function(){
        if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })

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

// .form-step--3
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

    $(".form-step--3 .submit-question").click(function(){
        phoneValidation()
    });

    $(".form-step--3 input").on("input" , function(){
        if (isPhoneValid()) {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "initial").removeClass("disabled");
        } else {
            $(this).closest(".form-step").find(".submit-question button").css("pointer-events" , "none").addClass("disabled");
        }
    })
    $("input[name=phone]").on("input" , function(){
        if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
            $(this).removeClass("error")
        }
    })




// test
// $("#intro .form").fadeOut(0)
// $("section:not(#intro)").fadeOut(0)
// $("footer").fadeOut(0)
// $("#intro .thx").fadeOut(0)
// $("#intro .quiz").fadeIn(0)




// main flow
var standart_time = 300
var thx_time = 2500


// form flow
$(".form-step--1 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    $("#intro .bullets").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)
})
$(".form-step--2 .btn-next").click(function(e){
    $(this).closest(".form-step").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".form-step").next(".form-step").fadeIn(standart_time)
    }, standart_time)

    window.offer_link_1 = $('.quiz-block--3 a.yes').attr("href")
    window.offer_link_2 = $('.quiz-block--4 a.yes').attr("href")
    window.offer_link_3 = $('.quiz-block--5 a.yes').attr("href")
    window.offer_link_no_3 = $('.quiz-block--5 a.no').attr("href")
})
$(".form-step--3 .btn-next").click(function(e){
    
    $(this).css("display","none").css("visibility","hidden")
    $(this).closest(".form-step").fadeOut(standart_time)

    $("#intro .form , section:not(#intro) , footer").fadeOut(standart_time)


    const clickid = $("[name=click_id]").val();

    const data = {
        "zip": $("[name=zip]").val(), 
        "firstname": $("[name=firstname]").val(), 
        "lastname": $("[name=lastname]").val(), 
        "email": $("[name=email]").val(), 
        "phone": $("[name=phone]").val(), 
        "offer_type": $("[name=offer_type]").val(), 
        "offer_url": window.location.href.split('?')[0], 
        "click_id": clickid
    };

    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&payout=0&cnv_status=registration`, { mode: 'no-cors'}).then(r => {console.log("successfully registered: " + clickid);
    fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) }).then(rr => console.log("successfully registered lead in Data API: " + clickid)).catch(ed => console.log("error during registration lead in Data API: " + ed));}).catch(e => console.log("error during registration lead: " + e));
    // fbq('track', 'CompleteRegistration');
    console.log("CompleteRegistration")
    ttq.track('CompleteRegistration');

    setTimeout(()=>{
        $("#intro .thx").fadeIn(standart_time)
        setTimeout(()=>{
            $("#intro .thx").fadeOut(standart_time)
            setTimeout(()=>{
                $("#intro .quiz").fadeIn(standart_time)
            }, standart_time)
        }, thx_time)
    }, standart_time)
})

// quiz flow
$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()

    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(2)').addClass("active")

    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--3 .quiz-block-answers a.yes").click(function(e){
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
})
$(".quiz-block--3 .quiz-block-answers a.no").click(function(e){
    e.preventDefault()
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--4 .quiz-block-answers a.yes").click(function(e){
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
})
$(".quiz-block--4 .quiz-block-answers a.no").click(function(e){
    e.preventDefault()
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})
$(".quiz-block--5 .quiz-block-answers a.yes").click(function(e){
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
})
$(".quiz-block--5 .quiz-block-answers a.no").click(function(e){
    fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
})


form_final_link = () => {
    // console.log(window.offer_link)

    const clickid = $("[name=click_id]").val();
    const uclick = $("[name=uclick]").val();

    let phoneNumber = $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "");
    let phonecode = phoneNumber.substring(0, 3);
    let phoneprefix = phoneNumber.substring(3, 6);
    let phonesuffix = phoneNumber.substring(6); 

    $(".quiz-block--3 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}uclick=${uclick}&zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
    $(".quiz-block--3 a.no").attr("href" ,`` )

    $(".quiz-block--4 a.yes").attr("href" ,`${window.offer_link_2}${window.offer_link_2.includes("?") ? "&" : "?"}uclick=${uclick}&zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
    $(".quiz-block--4 a.no").attr("href" ,`` )

    $(".quiz-block--5 a.yes").attr("href" ,`${window.offer_link_3}${window.offer_link_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
    $(".quiz-block--5 a.no").attr("href" ,`${window.offer_link_no_3}${window.offer_link_no_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
}
$('input[name=phone]').on("input" , function(){
    form_final_link()
})




$('.quiz-block--3 a.no').attr("href" , ``);
$('.quiz-block--4 a.no').attr("href" , ``);
$('.quiz-block--5 a.no').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=2`);
    
$('.quiz-block--3 a.yes').attr("href" , `land`)
$('.quiz-block--4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=3`);
$('.quiz-block--5 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=4`);



// const clickid = "12313clickid1313123"
// const uclick = "111111uclick111111";
// $('.quiz-block--3 a.no').attr("href" , ``)
// $('.quiz-block--4 a.no').attr("href" , ``)
// $('.quiz-block--5 a.no').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=2`)
// $('.quiz-block--3 a.yes').attr("href" , `land?uclick=${uclick}`)
// $('.quiz-block--4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=3`)
// $('.quiz-block--5 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=4`)

// back
$(".quiz-block .quiz-block-back button").click(function(){
    $(this).closest(".quiz-block").fadeOut(standart_time)
    setTimeout(()=>{
        $(this).closest(".quiz-block").prev(".quiz-block").fadeIn(standart_time)
    }, standart_time)
})

$(".quiz-block--2 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(0)').addClass("active")
})
$(".quiz-block--3 .quiz-block-back button").click(function(){
    $('.quiz-dots ul li').removeClass("active")
    $('.quiz-dots ul li:eq(1)').addClass("active")
})

$('.preloader').delay(300).fadeOut(300);

})