$(document).ready(function(){
    $(".info-pp-link-item").click(function () {
        console.log(1)
        window.open("policies/page/rzu_program_requirements_", "_blank");
    });

    $(".question-1 .question-answers button").click(function(){
        $(".question-1").fadeOut(300)
        $(".circle-1").removeClass("active")
        $(".circle-2").addClass("active")
        setTimeout(()=>{
            $(".question-2").fadeIn(300)
        },300)
    })
    $(".question-2 .question-answers button").click(function(){
        $(".question-2").fadeOut(300)
        $(".circle-2").removeClass("active")
        $(".circle-3").addClass("active")
        setTimeout(()=>{
            $(".question-3").fadeIn(300)
        },300)
    })
    $(".question-3 .question-answers button").click(function(){
        $('.quiz-block').fadeOut(300)
        $(".circle-3").removeClass("active")
        setTimeout(()=>{
            $(".form").fadeIn(300)
        },300)
    })



    setTimeout(()=>{
        window.offer_link = $('#to_offer').attr("href")
    },1000)

    form_final_link = () => {
        $("#to_offer").attr("href" ,`${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}sub15=${email}`)
    }

    $("input[name=email]").on("change input" , function(){
        email = $(this).val()
        form_final_link()

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error")
        }
    })

    let canClick = true; // Флаг для дебоунсу

    $("#to_offer").on("click", function(event) {
        let email = $("input[name=email]").val();
        let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email);

        if (!emailValid) {
            event.preventDefault(); 
            $("input[name=email]").addClass("error")
            return;
        }

        if (!canClick) {
            event.preventDefault(); 
            return;
        }

        event.preventDefault()
        fetch(`https://omniapostback.com/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },500)
        })
        .catch(e => console.log("error during registration lead: " + e));
        
        canClick = false;
        setTimeout(function() {
            canClick = true; 
        }, 5000);
    });

    $(".how-it-works .btn , .check .btn").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });


    $('.comment-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 10000,
        draggable: false,
        swipe: false,
        touchMove: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        accessibility: false
    })


})