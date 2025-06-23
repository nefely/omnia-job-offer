$(document).ready(function(){

    setTimeout(()=>{
        $(".welcome").fadeOut(300)
        setTimeout(()=>{
            $('.progress').css("opacity" , "1")
            $('.quiz').fadeIn(300)
        },300)
    },3000)
    
    $(".quiz-block-1 .answers .btn").click(function(){
        $(".progress .line-container:eq(0)").addClass("active")
        $(".quiz-block-1").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(1)").addClass("active")
            $(".quiz-block-2").fadeIn(300)
        },300)
    })
    
    $(".quiz-block-2 .answers .btn").click(function(){
        $(".progress .line-container:eq(1)").addClass("active")
        $(".quiz-block-2").fadeOut(300)
        setTimeout(()=>{
            $(".progress .circle-container:eq(2)").addClass("active")
            $(".quiz-block-3").fadeIn(300)
        },300)
    })
    
    $(".quiz-block-3 .answers .btn").click(function(){
        $(".quiz-block-3").fadeOut(300)
        $('.quiz').fadeOut(300)
        setTimeout(()=>{
            $('.analizer').fadeIn(300)
    
            setTimeout(()=>{
                $(".progress .circle-container:eq(0)").addClass("checked")
                $(".analizer .analizer-list li:eq(0)").fadeIn(300)
                setTimeout(()=>{
                    $(".progress .line-container:eq(0)").addClass("checked")
                    setTimeout(()=>{
                        $(".progress .circle-container:eq(1)").addClass("checked")
                        $(".analizer .analizer-list li:eq(1)").fadeIn(300)
                        setTimeout(()=>{
                            $(".progress .line-container:eq(1)").addClass("checked")
                            setTimeout(()=>{
                                $(".progress .circle-container:eq(2)").addClass("checked")
                                $(".analizer .analizer-list li:eq(2)").fadeIn(300)
                                setTimeout(()=>{
                                    $(".progress").css("opacity" , "0")
                                    $(".analizer").fadeOut(300)
                                    setTimeout(()=>{
                                        $(".final").fadeIn(300)
                                    },300)
                                },1500)
                            },300)
                        },300)
                    },300)
                },300)
            },300)
    
        },300)
    })
    
    const sub12 = window.getURLParameter(window.location.href, 'sub12');
    const sub13 = window.getURLParameter(window.location.href, 'sub13');
    const sub14 = window.getURLParameter(window.location.href, 'sub14');
    const sub15 = window.getURLParameter(window.location.href, 'sub15');
    const sub16 = window.getURLParameter(window.location.href, 'sub16');
    
    const offer_type = window.getURLParameter(window.location.href, 'offer_type');
    
    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');
    
    if (rtkcid) {
        fetch(`https://track.rewardsplace.net/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkcid);
        })
        .catch(e => console.log("error during registration lead: " + e));
    }
    
    let offer_link = $('#offer_link').attr("href")
    $("#offer_link").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    
    
    })