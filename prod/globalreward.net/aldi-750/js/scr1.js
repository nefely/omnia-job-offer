$(document).ready(function() {
    setTimeout(function() {
        $("#comment1").fadeIn()
    }, 1e4), setTimeout(function() {
        $("#comment2").fadeIn()
    }, 12e3), setTimeout(function() {
        $("#comment3").fadeIn()
    }, 13e3), setTimeout(function() {
        $("#comment4").fadeIn()
    }, 18e3), setTimeout(function() {
        $("#comment5").fadeIn()
    }, 2e4), setTimeout(function() {
        $("#comment6").fadeIn()
    }, 22e3), $(".bq1").click(function() {
        $("#q1").fadeOut(0), $("#q2").fadeIn(100)
    }), $(".bq2").click(function() {
        $("#q2").fadeOut(0), $("#q3").fadeIn(100)
    }), $(".bq3").click(function() {
        $("#q3").fadeOut(0), $("#q4").fadeIn(100)
    }), $(".bq4").click(function() {
        window.scrollTo(0, 0);
        $("#content1").fadeOut(0), $("#content2").fadeIn(), setTimeout(function() {
        $("#result1").fadeIn(1e3)
        }, 3e3), setTimeout(function() {
        $("#result2").fadeIn(1e3)
        }, 4100), setTimeout(function() {
        $("#result3").fadeIn(1e3)
        }, 6e3), setTimeout(function() {
        $("#content2").fadeOut()
        }, 7100), setTimeout(function() {
        $("#content3").fadeIn()
        }, 7100)
    })

})