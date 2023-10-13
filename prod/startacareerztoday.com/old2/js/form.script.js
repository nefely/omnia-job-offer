$(document).ready(function(){


// question 1
isZipValid = () => {
  if ($("input[name=zip]").val().length == 5) {
    return true
  } else {
    return false
  }
}
zipValidation = () => {
  if (isZipValid()) {
    $("input[name=zip]").closest(".field-content").removeClass("error")
  } else {
    $("input[name=zip]").focus()
    $("input[name=zip]").closest(".field-content").addClass("error")
  }
}

$(".question--1 .submit").click(function(){
  zipValidation()
});

$(".question--1 .submit button").click(function(){
  if (window.matchMedia("(max-width: 991px)").matches) {
    $(".intro[data-prepop=1]").addClass("bg-non");
  }


  $(".container-bullets").remove()
  $(this).closest(".question").fadeOut(0).next(".question").fadeIn(0)
});

$(".question--1 input").on("input" , function(){
  if (isZipValid()) {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");
  } else {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "none").addClass("disabled");
  }
})

$("input[name=zip]").on("input" , function(){
  if ($(this).val().length == 5) {
    $(this).closest(".field-content").removeClass("error")
  }
})

// question 2
isFirstNameValid = () => {
  if ($("input[name=firstname]").val().length >= 2) {
    return true
  } else {
    return false
  }
}
firstNameValidation = () => {
  if (isFirstNameValid()) {
    $("input[name=firstname]").closest(".field-content").removeClass("error")
  } else {
    $("input[name=firstname]").focus()
    $("input[name=firstname]").closest(".field-content").addClass("error")
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
    $("input[name=lastname]").closest(".field-content").removeClass("error")
  } else {
    $("input[name=lastname]").focus()
    $("input[name=lastname]").closest(".field-content").addClass("error")
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
    $("input[name=email]").closest(".field-content").removeClass("error")
  } else {
    $("input[name=email]").focus()
    $("input[name=email]").closest(".field-content").addClass("error")
  }
}

$(".question--2 .submit").click(function(){
  emailValidation()
  lastNameValidation()
  firstNameValidation()
});

$(".question--2 .submit button").click(function(){
  $(this).closest(".question").fadeOut(0).next(".question").fadeIn(0)
  // window.offer_link = $(".offer-link").attr("href")
  window.offer_link_1 = $('.answers-container-3 a.yes').attr("href")
  window.offer_link_2 = $('.answers-container-4 a.yes').attr("href")
  window.offer_link_3 = $('.answers-container-5 a.yes').attr("href")
  window.offer_link_no_1 = $('.answers-container-3 a.no').attr("href")
  window.offer_link_no_2 = $('.answers-container-4 a.no').attr("href")
  window.offer_link_no_3 = $('.answers-container-5 a.no').attr("href")
  window.offer_link_popunder_1 = $('.answers-container-3 a.offer_3').attr("href")
  window.offer_link_popunder_2 = $('.answers-container-4 a.offer_4').attr("href")
  window.offer_link_popunder_3 = $('.answers-container-5 a.offer_5').attr("href")
});

$(".question--2 input").on("input" , function(){
  if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");
  } else {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "none").addClass("disabled");
  }
})

$("input[name=firstname]").on("input" , function(){
  if ($(this).val().length >= 2) {
    $(this).closest(".field-content").removeClass("error")
  }
})
$("input[name=lastname]").on("input" , function(){
  if ($(this).val().length >= 2) {
    $(this).closest(".field-content").removeClass("error")
  }
})
$("input[name=email]").on("input" , function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
    $("input[name=email]").closest(".field-content").removeClass("error")
  }
})

// question 3
isPhoneValid = () => {
  if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
    return true
  } else {
    return false
  }
}
phoneValidation = () => {
  if (isPhoneValid()) {
    $("input[name=phone]").closest(".field-content").removeClass("error")
  } else {
    $("input[name=phone]").focus()
    $("input[name=phone]").closest(".field-content").addClass("error")
  }
}

$(".question--3 .submit").click(function(){
  phoneValidation()
});

$(".question--3 input").on("input" , function(){
  if (isPhoneValid()) {
    $(this).closest(".question").find(".submit a").css("pointer-events" , "initial").removeClass("disabled");
  } else {
    $(this).closest(".question").find(".submit a").css("pointer-events" , "none").addClass("disabled");
  }
})
$("input[name=phone]").on("input" , function(){
  if ($("input[name=phone]").val().replaceAll("(" , "").replaceAll(")" , "").replaceAll("-" , "").replaceAll(" " , "").length == 10) {
    $(this).closest(".field-content").removeClass("error")
  }
})



form_final_link = () => {
  // console.log(window.offer_link)

  let phoneNumber = $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "");
  let phonecode = phoneNumber.substring(0, 3);
  let phoneprefix = phoneNumber.substring(3, 6);
  let phonesuffix = phoneNumber.substring(6); 

  // $(".offer-link").attr("href" ,`${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  $(".answers-container-3 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  $(".answers-container-3 a.no").attr("href" ,`` )
  $(".answers-container-3 a.offer_3").attr("href" ,`${window.offer_link_popunder_1}${window.offer_link_popunder_1.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )

  $(".answers-container-4 a.yes").attr("href" ,`${window.offer_link_2}${window.offer_link_2.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  $(".answers-container-4 a.no").attr("href" ,`` )
  $(".answers-container-4 a.offer_4").attr("href" ,`${window.offer_link_popunder_2}${window.offer_link_popunder_2.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )

  $(".answers-container-5 a.yes").attr("href" ,`${window.offer_link_3}${window.offer_link_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  $(".answers-container-5 a.no").attr("href" ,`${window.offer_link_no_3}${window.offer_link_no_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  $(".answers-container-5 a.offer_5").attr("href" ,`${window.offer_link_popunder_3}${window.offer_link_popunder_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )

  // $(".answers-container-4 a.no").attr("href" ,`${window.offer_link_no_2}${window.offer_link_no_2.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
  // $(".answers-container-5 a.no").attr("href" ,`${window.offer_link_no_3}${window.offer_link_no_3.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
}

$(".offer-link").click(function(e){
  e.preventDefault()
  $(".intro-content").fadeOut(300)
  $(this).closest(".question").fadeOut(300)
  $(".intro .container").addClass("psevdo-hide")
  $("section:not(main section), footer").fadeOut(300)
  setTimeout(()=>{

    // fbq('track', 'CompleteRegistration');
    // ttq.track('CompleteRegistration');
    // pintrk('track', 'signup');

    snaptr('track', 'SIGN_UP');
    
    $(".quiz-bg").addClass("active")
    $(".intro .container-form").addClass("wide")
    $(".intro .container").addClass("fccc")
    setTimeout(()=>{
      $(this).closest(".question").next(".question").fadeIn(300)
      setTimeout(()=>{
        $(".question--4").fadeOut(100)
        setTimeout(()=>{
          $(".question--5").fadeIn(1300)
        },300)
      },2300)
    },300)
  },300)
})

$('.container-form input[name=phone]').on("input" , function(){
  form_final_link()
})

/*test*/
// $(".question , .intro-content").fadeOut(0)
// $(".intro .container").addClass("fccc psevdo-hide")
// $(".intro .container-form").addClass("wide")
// $(".quiz-bg").addClass("active")
// $(".question--5").fadeIn(300)





$(".answers-container-1 .btn.next").click(function(){
  $(".dot-item-1").removeClass("active")
  $(".dot-item-2").addClass("active")
  $(".title-item-1").fadeOut(0)
  $(".title-item-2").fadeIn(300)
  $(".answers-container-1").fadeOut(0)
  $(".answers-container-2").fadeIn(300)
})

$(".answers-container-2 .btn.next").click(function(){
  $(".dot-item-2").removeClass("active")
  $(".dot-item-3").addClass("active")
  $(".title-item-2").fadeOut(0)
  $(".title-item-3").fadeIn(300)
  $(".answers-container-2").fadeOut(0)
  $(".answers-container-3").fadeIn(300)
})

$(".answers-container-2 .btn.back").click(function(){
  $(".dot-item-2").removeClass("active")
  $(".dot-item-1").addClass("active")
  $(".title-item-2").fadeOut(0)
  $(".title-item-1").fadeIn(300)
  $(".answers-container-2").fadeOut(0)
  $(".answers-container-1").fadeIn(300)
})
$(".answers-container-3 .btn.back").click(function(){
  $(".dot-item-3").removeClass("active")
  $(".dot-item-2").addClass("active")
  $(".title-item-3").fadeOut(0)
  $(".title-item-2").fadeIn(300)
  $(".answers-container-3").fadeOut(0)
  $(".answers-container-2").fadeIn(300)
})
$(".answers-container-4 .btn.back").click(function(){
  $(".title-item-4").fadeOut(0)
  $(".title-item-3").fadeIn(300)
  $(".answers-container-4").fadeOut(0)
  $(".answers-container-3").fadeIn(300)
})
$(".answers-container-5 .btn.back").click(function(){
  $(".title-item-5").fadeOut(0)
  $(".title-item-4").fadeIn(300)
  $(".answers-container-5").fadeOut(0)
  $(".answers-container-4").fadeIn(300)
})



if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
  $("input[name=zip]").mask('00000');
}

$('.preloader').delay(300).fadeOut(300);

onClickApiLoad(() => {
	const clickid = $("[name=click_id]").val();
	const uclick = $("[name=uclick]").val();

  $('.answers-container-3 a.no').attr("href" , ``)
  $('.answers-container-4 a.no').attr("href" , ``)
	$('.answers-container-5 a.no').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=2`)

  $('.answers-container-3 a.yes').attr("href" , `land?uclick=${uclick}`)
  $('.answers-container-4 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=3`)
	$('.answers-container-5 a.yes').attr("href" , `https://track.${domain}/track.php?lp=1&uclick=${uclick}&to_offer=4`)

	$('.answers-container-3 a.offer_3').attr("href" , `https://jbsmnion.com/?TTT=xzzIZcNRrGrXf%2frfI0fKrnQMhLfPMsjQvQJDRoz7h5U%3d&s1=funnnel-popunder&s2=${clickid}`)
  $('.answers-container-4 a.offer_4').attr("href" , `https://jbsmnion.com/?TTT=xzzIZcNRrGrXf%2frfI0fKrnQMhLfPMsjQvQJDRoz7h5U%3d&s1=funnnel-popunder&s2=${clickid}`)  
  $('.answers-container-5 a.offer_5').attr("href" , `https://jbsmnion.com/?TTT=xzzIZcNRrGrXf%2frfI0fKrnQMhLfPMsjQvQJDRoz7h5U%3d&s1=funnnel-popunder&s2=${clickid}`)  
});

$('.answers-container-3 a.no').click(function(){
 	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
});

$('.answers-container-3 a.yes').click(function(){
	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
});

$('.answers-container-4 a.no').click(function(){
	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
});

$('.answers-container-4 a.yes').click(function(){
	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
});

$('.answers-container-5 a.no').click(function(){
	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
});

$('.answers-container-5 a.yes').click(function(){
	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
});

/*$('.answers-container-3 a.yes').click(function(){
  setTimeout(()=>{
    // тут добавити ще гет параметри з даними 
    window.location.href = $('.answers-container-3 a.offer_3').attr("href")
  },10000)
})

$('.answers-container-4 a.yes').click(function(){
  setTimeout(()=>{
    // тут добавити ще гет параметри з даними 
    window.location.href = $('.answers-container-4 a.offer_4').attr("href")
  },10000)
})

$('.answers-container-5 a.yes').click(function(){
  setTimeout(()=>{
    // тут добавити ще гет параметри з даними 
    window.location.href = $('.answers-container-5 a.offer5').attr("href")
  },10000)
})*/



$('.answers-container-3 a.no').click(function(e){
  e.preventDefault()
  $(".title-item-3").fadeOut(0)
  $(".title-item-4").fadeIn(300)
  $(".answers-container-3").fadeOut(0)
  $(".answers-container-4").fadeIn(300)
});
$('.answers-container-4 a.no').click(function(e){
  e.preventDefault()
  $(".title-item-4").fadeOut(0)
  $(".title-item-5").fadeIn(300)
  $(".answers-container-4").fadeOut(0)
  $(".answers-container-5").fadeIn(300)
});

// $("#intro-slot input").on('blur', function() {
//   $('html, body').animate({ scrollTop: 0 }, 300);
//   return false;
// });

})