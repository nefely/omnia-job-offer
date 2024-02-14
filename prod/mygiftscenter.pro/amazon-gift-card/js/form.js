$(document).ready(function () {
  $("#q3 .cid-btns").click(function () {
    window.offer_link = $("#subbtn").attr("href");
  });

  isEmailValid = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(
        $("input[name=email]").val()
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  emailValidation = () => {
    if (isEmailValid()) {
      $("input[name=email]").removeClass("error");
    } else {
      $("input[name=email]").focus();
      $("input[name=email]").addClass("error");
    }
  };

  $("#subbtn_div").click(function () {
    emailValidation();
  });

  $("input[name=email]").on("input", function () {
    if (isEmailValid()) {
      $("#subbtn").css("pointer-events", "initial").removeClass("disabled");
    } else {
      $("#subbtn").css("pointer-events", "none").addClass("disabled");
    }
  });

  $("input[name=email]").on("input", function () {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(
        $("input[name=email]").val()
      )
    ) {
      $("input[name=email]").removeClass("error");
    }
  });

  form_final_link = () => {
    console.log(window.offer_link);
    $("#subbtn").attr(
      "href",
      `${window.offer_link}${
        window.offer_link.includes("?") ? "&" : "?"
      }email=${$("[name=email]").val()}`
    );
  };

  $("#subbtn").click(function (e) {
    e.preventDefault();
    localStorage.setItem("offer_link", $(this).attr("href"));
    console.log(localStorage.getItem("offer_link"));
    setTimeout(() => {
      document.location.href = window.location.href.split("?")[0] + "thank-you/"
    }, 200);
  });

  $("input[name=email]").on("input", function () {
    form_final_link();
  });
});
