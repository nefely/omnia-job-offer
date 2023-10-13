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
  window.offer_link = $(".offer-link").attr("href")
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
  console.log(window.offer_link)

  let phoneNumber = $("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "");
  let phonecode = phoneNumber.substring(0, 3);
  let phoneprefix = phoneNumber.substring(3, 6);
  let phonesuffix = phoneNumber.substring(6); 

  $(".offer-link").attr("href" ,`${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}zippost=${$("[name=zip]").val()}&email=${$("[name=email]").val()}&firstname=${$("[name=firstname]").val()}&lastname=${$("[name=lastname]").val()}&phonecode=${phonecode}&phoneprefix=${phoneprefix}&phonesuffix=${phonesuffix}` )
}

$('.container-form input[name=phone]').on("input" , function(){
  form_final_link()
})



if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}
if ($("input[name=zip]").length > 0) {
  $("input[name=zip]").mask('00000');
}

})