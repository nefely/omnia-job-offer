$(document).ready(function () {
    $("#feature-inner").click(function () {
        $("#feature-wrapper").addClass("on");
        $("#feature").css("opacity", "1");
    });

    $("#exit_icon").click(function (e) {
        e.stopPropagation();
        $("#feature-wrapper").removeClass("on");
        $("#feature-inner").removeClass("showme")
    });

    $("#feature-inner .pr-info-btn").click(function (e) {
        e.stopPropagation();
        $("#feature-wrapper").removeClass("on");
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    $("#ex-lightbox-btn").click(function () {
        $("body").addClass("extra-shown");
    });

    $("#ex-exit , #ex-inner .ex-close-btn").click(function () {
        $("body").removeClass("extra-shown");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let options = { month: "long", day: "numeric" };
    let formattedDate = today.toLocaleDateString("en-US", options);
    let elements = document.querySelectorAll(".dd_line");
    elements.forEach(function (element) {
        element.textContent = formattedDate;
    });
});

$(document).ready(function () {
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

        setTimeout(() => {
            $("#q4 , #cid-disclaimer , #head-step2 , #head-step3 ").fadeOut(0);
            $("#q5").fadeIn(300);

            $("#cid-global").addClass("eligible done");
            $("#lg-global-embrace").fadeOut(0);
            $("#feature-wrapper").removeClass("on");
            $("#blk_mask").fadeOut(300);
            $("#cid-header-container").addClass("header-container-desktop head-info-position");
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $("#cid-reward img").css("margin-bottom", "0")
            setTimeout(() => {
                $("#feature-wrapper").addClass("hidden");
            }, 1000);
        }, 4000);
    });


    setTimeout(function() {
        if(window.outerWidth < 868) {
            $("html, body").animate({ scrollTop: $("#head-step2").offset().top }, 300);
        }       
    }, 1800);

});

