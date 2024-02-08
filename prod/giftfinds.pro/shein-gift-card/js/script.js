$(document).ready(function () {
  var iconIndex = 1;
  var totalIcons = $(".t-icon").length;
  var aniTime = 3500;

  $(document).ready(function ($) {
    totalIcons = $(".t-icon").length;
    runAnim();

    $("#s-btn, .info-btn").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(".deals-scrollto-btn").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#ft-offers-container-p").offset().top - 10,
        },
        500
      );
    });

    $(window).scroll(function () {
      $(".ft-tsection").each(function () {
        var top_of_element = $(this).offset().top + 250;
        var bottom_of_element =
          $(this).offset().top + 250 + $(this).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        var top_of_screen = $(window).scrollTop();

        if (
          bottom_of_screen > top_of_element &&
          top_of_screen < bottom_of_element
        ) {
          $(this).addClass("active");
        }
      });
    });
  });

  function runAnim() {
    setTimeout(function () {
      $(".t-icon").eq(iconIndex).addClass("active");

      $(".t-icon")
        .eq(iconIndex - 1)
        .removeClass("active");

      iconIndex++;

      if (iconIndex == totalIcons) {
        iconIndex = 0;
      }
      runAnim();
    }, aniTime);
  }

  $("#feature-wrapper").click(function () {
    $(this).addClass("on");
    $(this).find("#feature").css("opacity", "1");
    $("#blk_mask").fadeIn(300);
  });
  $("#exit_icon").click(function (e) {
    e.stopPropagation();
    // scroll to quiz
    $("#feature-wrapper").removeClass("on");
    $("#blk_mask").fadeOut(300);
    setTimeout(() => {
      $("#feature-wrapper").addClass("hidden");
    }, 1000);
    $("html,body").animate(
      { scrollTop: $("#cid-header").offset().top },
      "slow"
    );
  });
  $("#feature-wrapper .pr-info-btn").click(function (e) {
    e.stopPropagation();
    // scroll to quiz
    $("#blk_mask").fadeOut(300);
    $("#feature-wrapper").removeClass("on");
    setTimeout(() => {
      $("#feature-wrapper").addClass("hidden");
    }, 1000);
    $("html,body").animate(
      { scrollTop: $("#cid-header").offset().top },
      "slow"
    );
  });

  $("#lg-getstarted ").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("html,body").animate(
      { scrollTop: $("#cid-header").offset().top },
      "slow"
    );
  });

  $(".get-start ").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("html,body").animate(
      { scrollTop: $("#cid-header").offset().top },
      "slow"
    );
  });

  $("#q1 .cid-btns").click(function () {
    $(this).closest(".cid-questions").fadeOut(0);
    $("#q2").fadeIn(300);
  });
  $("#q2 .cid-btns").click(function () {
    $(this).closest(".cid-questions").fadeOut(0);
    $("#q3").fadeIn(300);
  });
  $("#q3 .cid-btns").click(function () {
    $(this).closest(".cid-questions").fadeOut(0);
    $("#q4").fadeIn(300);
  });
  $("#q4 .cid-btns").click(function () {
    $(this).closest(".cid-questions").fadeOut(0);
    $("#q5").fadeIn(300);

    setTimeout(() => {
      $("#cid-global").addClass("eligible done");
      $("#lg-global-embrace").fadeOut(0);
      $("#q5").fadeOut(0);
      $("#q6").fadeIn(300);
      $("#feature-wrapper").removeClass("on");
      $("#cid-reward-container").removeClass("off");
      $("#blk_mask").fadeOut(300);
      $(".lvl-rewards-logo").fadeOut(0);
      $(".top-cid-container").fadeOut(300);
      $("#cid-header-container").addClass(
        "header-container-desktop head-info-position"
      );
      setTimeout(() => {
        $("#feature-wrapper").addClass("hidden");
      }, 1000);
      setTimeout(() => {
        $("#cid-header-container").fadeOut(300);
      }, 6000);
    }, 2000);
  });

  window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf("?") + 1));
    let sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++) {
      let sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function addComments() {
    let count = document.querySelector("#comment_count");
    let countNumber = Number(count.textContent);
    let coms = 12;
    for (let i = 1; i < 6; i++) {
      let elem = document.querySelector("#comment" + coms);
      coms++;
      countNumber++;
      count.textContent = countNumber;
      console.log(elem);
      elem.classList.add("question-animation");
      elem.style.display = "block";
      await sleep(i * 4000);
    }
  }

  async function addReviews() {
    const reviews = document.querySelectorAll(
      ".review-item-container.hidden-review"
    );
    for (let i = 1; i <= reviews.length; i++) {
      $(`#${i}-hidden-review`).fadeIn(600);
      await sleep(i * 4000);
    }

    return false;
  }

  addReviews();

  const now = new Date();
  window.currentYear = now.getFullYear();
  window.currentMonth = now.toLocaleString("en-US", {
    month: "long",
  });
  window.currentDate = now.getDate();
  $(".year").text(currentYear);
  $(".date").text(`${currentDate} ${currentMonth}, ${currentYear}`);

  window.domain = window.location.hostname;
  $(".domain").text(domain);

  $("a").each(function () {
    if ($(this).attr("id") == "subbtn") {
    } else {
      if ($(this).attr("href").includes("_domain_")) {
        $(this).attr(
          "href",
          $(this).attr("href").replaceAll("_domain_", domain)
        );
      }
    }
  });

  $("#subbtn").attr("href", `https://track.${domain}/track.php?lp=1`);

  $(".preloader").delay(300).fadeOut(300);
});
