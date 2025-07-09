$(document).ready(function(){
    const sub12 = window.getURLParameter(window.location.href, 'sub12');
    const sub13 = window.getURLParameter(window.location.href, 'sub13');
    const sub14 = window.getURLParameter(window.location.href, 'sub14');
    const sub15 = window.getURLParameter(window.location.href, 'sub15');
    const sub16 = window.getURLParameter(window.location.href, 'sub16');

    const offer_type = window.getURLParameter(window.location.href, 'offer_type');

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkcid);
    })
    .catch(e => console.log("error during registration lead: " + e));

    setTimeout(()=> {
        $(".hero-section .thx").fadeOut(300)
        $(".hero-section .quiz").delay(300).fadeIn(300)
    }, 3000)

    $('.progress-block .round').removeClass("active")
    $('.progress-block .round:eq(0)').addClass("active")

    let offer_link = `https://track.${window.location.host}/click`
    $("#offer_link").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )

    // quiz flow
    $(".quiz-step--1 .answers .btn").click(function(e){
        e.preventDefault()

        $('.progress-block .round').removeClass("active")
        $('.progress-block .round:eq(1)').addClass("active")
        $('.progress-block .round:eq(0)').addClass("passed")

        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
        }, 300)
    })
    $(".quiz-step--2 .answers .btn").click(function(e){
        e.preventDefault()

        $('.progress-block .round').removeClass("active")
        $('.progress-block .round:eq(2)').addClass("active")
        $('.progress-block .round:eq(1)').addClass("passed")

        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
        }, 300)
    })
    $(".quiz-step--3 .answers .btn").click(function(e){
        e.preventDefault()
        $(this).closest(".quiz-step").css("opacity" , '0')

        $('.progress-block .round:eq(2)').addClass("passed")

        $('.progress-block .round').removeClass("active")
        setTimeout(()=>{
            $('.progress-block .round:eq(0)').addClass("checked")
            setTimeout(()=>{
                $('.progress-block .arrow:eq(0)').addClass("checked")
                $('.progress-block .round:eq(1)').addClass("checked")
                setTimeout(()=>{
                    $('.progress-block .arrow:eq(1)').addClass("checked")
                    $('.progress-block .round:eq(2)').addClass("checked")
                    setTimeout(()=>{
                        $('.progress-block').css("opacity" , "0")
                        setTimeout(()=>{
                            $(this).closest(".quiz-step").fadeOut(300)
                            setTimeout(()=>{
                                $(this).closest(".quiz-step").css("opacity" , '1')
                                $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
                                setTimeout(()=>{
                                    $(this).closest(".quiz-step").next(".quiz-step").addClass("active")
                                },300)
                            }, 300)
                        },300)
                    },500)
                },500)
            },500)
        },500)
        
    })

    let lastClickTime = 0;

    $(".quiz-step--4 .answers .btn").click(function(e){
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 5000) {
            e.preventDefault();
            return false;
        } else {
            lastClickTime = currentTime;
        }
    })


    // back
    $(".quiz-step .quiz-step-back button").click(function(){
        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").prev(".quiz-step").fadeIn(300)
        }, 300)
    })


    $(".quiz-step--2 .quiz-step-back button").click(function(){
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("active")
    })
    $(".quiz-step--3 .quiz-step-back button").click(function(){
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("passed")
        $('.progress-block .round:eq(1)').addClass("active")
    })
    $(".quiz-step--4 .quiz-step-back button").click(function(){
        $('.progress-block').fadeIn(300)
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("passed")
        $('.progress-block .round:eq(1)').addClass("passed")
        $('.progress-block .round:eq(2)').addClass("active")
    })

})