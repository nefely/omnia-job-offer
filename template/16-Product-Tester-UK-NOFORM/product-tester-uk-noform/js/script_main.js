$(document).ready(function(){

$("input[name=email]").val("")

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
});

$(".question--2 .submit button").click(function(){});

$(".question--2 input").on("input" , function(){
  if (isEmailValid()) {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");
  } else {
    $(this).closest(".question").find(".submit button").css("pointer-events" , "none").addClass("disabled");
  }
})

$("input[name=email]").on("input" , function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
    $("input[name=email]").closest(".field-content").removeClass("error")
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
    "firstname": "", 
    "lastname": "", 
    "email": $("[name=email]").val(), 
    "phone": "", 
    "offer_type": $("[name=offer_type]").val(), 
    "offer_url": window.location.href.split('?')[0], 
    "click_id": clickid
  };
  console.log(data)

  // uncomment on prod
  fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&payout=0&cnv_status=registration`, { mode: 'no-cors'})
    .then(r => {
      console.log("successfully registered: " + clickid);
      fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => {
          console.log("successfully registered lead in Data API: " + clickid)
          
          setTimeout(()=>{
              $(".offer-link").css("display","block").css("visibility","visible")
              window.location.href = `survey/?clickid=${clickid}&uclick=${uclick}&email=${data.email}`
          },300)

        })
        .catch(ed => console.log("error during registration lead in Data API: " + ed));
    })
    .catch(e => console.log("error during registration lead: " + e));

})

setTimeout(()=>{

if (isEmailValid()) {
  $(".question--2").find(".submit button").css("pointer-events" , "initial").removeClass("disabled");
} else {
  $(".question--2").find(".submit button").css("pointer-events" , "none").addClass("disabled");
}

console.log(isEmailValid())

}, 1500)


})
