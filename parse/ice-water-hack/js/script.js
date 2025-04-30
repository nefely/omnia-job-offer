$(document).ready(function(){
    $("a[data-op-action='popoverlay']").click(function(e){
        e.preventDefault()
        e.stopPropagation()
        $("#op3-element-SJFD9MNm").removeClass("op3-popoverlay-hide").addClass("op3-popoverlay-show").css("display" , "block")
    })

    $("#op3-element-rQLA2nAS").click(function(e){
        e.stopPropagation()
    })

    $(".op3-popoverlay-close , body").click(function(){
        $("#op3-element-SJFD9MNm").addClass("op3-popoverlay-hide").removeClass("op3-popoverlay-show").css("display" , "none")
    })

    window.domain = window.location.hostname;
    $(".domain").text(domain)
    
    $(".mailto").attr("href" , `mailto:contact@${domain}`)
    
})