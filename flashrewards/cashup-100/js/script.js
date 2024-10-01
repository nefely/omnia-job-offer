$(document).ready(function(){
    $("#feature-inner").click(function(){
        $("#feature-wrapper").addClass("on")
        $("#feature").css("opacity" , "1");
    })

    $("#exit_icon").click(function(e){
        e.stopPropagation();
        $("#feature-wrapper").removeClass("on")
    })

})