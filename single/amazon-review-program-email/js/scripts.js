$(document).ready(function(){

    $("input[name=email]").val("")

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
    $("#step-5 .button-skin-default").click(function(){
        $("#step-5").addClass("hidden")
    })

    let offer_link = "";
    let final_link = "";

    setTimeout(() => {
        offer_link = $('.cvt-c1234tcwe-element-body').attr("href");
    }, 2000);

    $(".email").on("input", function() {
        final_link = `${offer_link}${offer_link.includes("?") ? "&" : "?"}sub15=${$("[name=email]").val()}`;
        $(".cvt-c1234tcwe-element-body").attr("href", final_link);
    });

    $("input[name=email]").on("input", function() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error");
        }
    });

    let clickAllowed = true;

    $(".cvt-c1234tcwe-element-body").on("click", function(e) {
        if (!clickAllowed) {
            e.preventDefault(); 
            return;
        }
    
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            e.preventDefault();
            $("input[name=email]").addClass("error");
            return;
        }
    
        clickAllowed = false;
        setTimeout(() => {
            clickAllowed = true; 
        }, 5000);
    });



    

})