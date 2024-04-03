$(document).ready(function(){

if ($("input[name=phone]").length > 0) {
  $("input[name=phone]").mask('(000) 000-0000');
}

$("input[name=firstname]").val("")
$("input[name=lastname]").val("")
$("input[name=email]").val("")
$("input[name=phone]").val("")

$(".subscribe button").click(function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(".subscribe input").val())) {
    setTimeout(()=> {
      $(".subscribe .form , .subscribe .title , .subscribe .subtitle").css("opacity" , 0);
      $(".subscribe .form-success").css("opacity" , 1);
      $(".subscribe .bg").css("background", "var(--theme-secondary)");
    },500)
    setTimeout(()=> {
      $('.subscribe').fadeOut(300)
    },5000)
  } else {
    $(".subscribe input").focus()
    $(".subscribe button").addClass("btn-error")
    $(".subscribe .bg").css("background", "var(--theme-dunger)");

    $(".subscribe .title , .subscribe .subtitle").css("opacity" , 0);
    $(".subscribe .form-decline").css("opacity" , 1);
    setTimeout(()=> {
      $(".subscribe .title , .subscribe .subtitle").css("opacity" , 1);
      $(".subscribe .form-decline").css("opacity" , 0);
      $(".subscribe button").removeClass("btn-error")
      $(".subscribe .bg").css("background", "var(--theme-primary)");
    },2000)
  }
})
$(".subscribe input").on("input", function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(".subscribe input").val())) {}
})

if ($('.swiper').length > 0) {
  const swiper = new Swiper('.swiper', {
    spaceBetween: 40,
    navigation: {
      nextEl: '.navigation-btn-next',
      prevEl: '.navigation-btn-prev',
    },
    scrollbar: {
      el: '.navigation-scrollbar',
    },
  });
}

window.final_link = ""
window.final_link__no_params = ""

// question 1
$(".question--1 .submit").click(function(){});
$(".question--1").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");

$(".question--1 .submit button").click(function(){
  if (window.matchMedia("(max-width: 991px)").matches) {
    $(".intro[data-prepop=1]").addClass("bg-non");
  }

  $(".container-bullets").remove()
  $(this).closest(".question").fadeOut(0).next(".question").fadeIn(0)
});

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
$(".question--1 .submit").click(function(){
    window.final_link__no_params = $("#btf").attr("href");
})

$(".question--2 .submit").click(function(){
    emailValidation()
    lastNameValidation()
    firstNameValidation()
});

$(".question--2 .submit button").click(function(){
  $(this).closest(".question").fadeOut(0).next(".question").fadeIn(0)
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

    window.final_link = `${final_link__no_params}${final_link__no_params.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
    $("#btf").attr("href" , final_link)

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

$(".offer-link").click(function(e){
  e.preventDefault()
  $(this).css("display","none").css("visibility","hidden")

  // uncomment on prod
  const clickid = $("[name=click_id]").val();
  const uclick = $("[name=uclick]").val();

  // comment on prod
  // const clickid = "my-click-id";
  // const uclick = "my-uclick";

  const data = {
    "zip": "", 
    "firstname": $("[name=firstname]").val(), 
    "lastname": $("[name=lastname]").val(), 
    "email": $("[name=email]").val(), 
    "phone": $("[name=phone]").val(), 
    "offer_type": $("[name=offer_type]").val(), 
    "offer_url": window.location.href.split('?')[0], 
    "click_id": rtkClickID
  };
  console.log(data)

  // uncomment on prod
  fetch(`https://omniapostback.com/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
//   fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID}&payout=0&cnv_status=registration`, { mode: 'no-cors'})
    .then(r => {
      console.log("successfully registered: " + rtkClickID);
      fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => {
          console.log("successfully registered lead in Data API: " + rtkClickID)
          
          setTimeout(()=>{
              $(".offer-link").css("display","block").css("visibility","visible")
              window.location.href = $(".question--3 #btf").attr('href');
          },300)

        })
        .catch(ed => console.log("error during registration lead in Data API: " + ed));
    })
    .catch(e => console.log("error during registration lead: " + e));

})

setTimeout(()=>{

if (isFirstNameValid() && isLastNameValid() && isEmailValid()) {
  $(".question--2").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".question--2").find(".submit button").css("pointer-events" , "none").addClass("disabled");
}

if (isPhoneValid()) {
  $(".question--3").find(".submit a").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".question--3").find(".submit a").css("pointer-events" , "none").addClass("disabled");
}

console.log(isFirstNameValid() && isLastNameValid() && isEmailValid())
console.log(isPhoneValid())

final_link__no_params = $("#btf").attr("href");
final_link = `${final_link__no_params}${final_link__no_params.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&sub13=${$("[name=firstname]").val()}&sub14=${$("[name=lastname]").val()}&sub15=${$("[name=email]").val()}&sub16=${$("[name=phone]").val().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`
$("#btf").attr("href" , final_link)


}, 1500)

})
