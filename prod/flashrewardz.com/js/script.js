$(document).ready(function(){
    $("#feature-inner").click(function(){
        $("#feature-wrapper").addClass("on")
        $("#feature").css("opacity" , "1");
    })

    $("#exit_icon").click(function (e) {
        e.stopPropagation();
        $("#feature-wrapper").removeClass("on");
        $("#feature-inner").removeClass("showme")
    });

    $("#feature-inner .pr-info-btn").click(function(e){
        e.stopPropagation();
        $("#feature-wrapper").removeClass("on")
        $("html, body").animate({ scrollTop: 0 }, 500);
    })

})