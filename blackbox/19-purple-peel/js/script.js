$(document).ready(function(){
    console.log("ready")

    window.domain = window.location.hostname;
    $(".domain").text(domain)
    
    $(".mailto").attr("href" , `mailto:contact@${domain}`)
    
    window.getURLParameter = (sUrl, sParam) => {
        let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    $(".question[data-question='question-1'] .btn").click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".image[data-image='image-1']").css("top", '-100px').fadeOut(300)
        $(".progress-inner .dot:eq(0)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(1)").addClass("passed")
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)

    })

    $(".question[data-question='question-2'] .btn").click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".progress-inner .dot:eq(0)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(1)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(2)").addClass("passed")
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $(".question[data-question='question-3'] .btn").click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".progress-inner .dot:eq(0)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(1)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(2)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(3)").addClass("passed")
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
    })

    $(".question[data-question='question-4'] .btn").click(function(){
        $(this).closest(".question").fadeOut(300)
        $(".title[data-title='title-1']").fadeOut(300)
        $(".progress-inner .dot:eq(0)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(1)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(2)").addClass("checked").removeClass("passed")
        $(".progress-inner .dot:eq(3)").addClass("checked").removeClass("passed")
        setTimeout(()=>{
            // $(".title[data-title='title-2']").fadeIn(300)
            $(".loader").fadeIn(300)
            $(".image[data-image='image-2']").fadeIn(300).css("top", '0px')
            $(this).closest(".question").next(".question").fadeIn(300)

            setTimeout(()=>{
                $(".progress-inner .dot:eq(0)").removeClass("checked").addClass("passed")
                setTimeout(()=>{
                    $(".progress-inner .dot-line:eq(0)").addClass("passed")
                    setTimeout(()=>{
                        $(".progress-inner .dot:eq(1)").removeClass("checked").addClass("passed")
                        setTimeout(()=>{
                            $(".progress-inner .dot-line:eq(1)").addClass("passed")
                            setTimeout(()=>{
                                $(".progress-inner .dot:eq(2)").removeClass("checked").addClass("passed")
                                setTimeout(()=>{
                                    $(".progress-inner .dot-line:eq(2)").addClass("passed")
                                    setTimeout(()=>{
                                        $(".progress-inner .dot:eq(3)").removeClass("checked").addClass("passed")
                                        setTimeout(()=>{
                                            $(".image[data-image='image-2']").fadeOut(300).css("top", '-100px')
                                            $(".progress").fadeOut(300)
                                            $(".loader").fadeOut(300)
                                            setTimeout(()=>{
                                                $(".title[data-title='title-2']").fadeIn(300)
                                                $(".image[data-image='image-3']").fadeIn(300).css("top", '0px')
                                                $(".congratulation").fadeIn(300)
                                            },300)
                                        },1200)
                                    },300)
                                },300)
                            },300)
                        },300)
                    },300)
                },300)

            },300)
        },300)
    })

})