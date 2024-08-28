$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)


    $("#step-1 .button-skin-default").click(function(){
        $("#step-1").addClass("hidden")
    })
    $("#step-2 .button-skin-default").click(function(){
        $("#step-2").addClass("hidden")
    })
    $("#step-3 .button-skin-default").click(function(){
        $("#step-3").addClass("hidden")
    })
    $("#step-4 .button-skin-default").click(function(){
        $("#step-4").addClass("hidden")
    })
})