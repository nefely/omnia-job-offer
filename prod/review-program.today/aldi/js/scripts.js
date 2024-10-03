$(document).ready(function(){
    $('.preloader').delay(300).fadeOut(300);

    $("input[name=email]").val("")

    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

    const now = new Date();
    window.currentYear = now.getFullYear();
    $(".year").text(currentYear)

    // quiz
    $(".question-1 .btn").click(function(){
        $(".question-1").fadeOut(300)
        setTimeout(()=>{
            $(".question-2").fadeIn(300)
        },300)
    })
    $(".question-2 .btn").click(function(){
        $(".question-2").fadeOut(300)
        setTimeout(()=>{
            $(".question-3").fadeIn(300)
        },300)
    })
    $(".question-3 .btn").click(function(){
        $(".question-3").fadeOut(300)
        setTimeout(()=>{
            $(".question-4").fadeIn(300)
        },300)
    })
    $(".question-4 .btn").click(function(){
        $(".quiz").fadeOut(300)
        setTimeout(()=>{
            $(".spinner").fadeIn(300)
            $(".container").addClass("bg")
        },300)
    })

    // spinner
    $(".spinner .btn").on("click" , function(){
        $(".spinner").fadeOut(300)
        setTimeout(function(){
            $(".form").fadeIn(300)
            $(".container").removeClass("bg")
        },300)
    })

    // form
    let offer_link = "";
    let final_link = "";

    setTimeout(() => {
        offer_link = $('#offer').attr("href");
    }, 2000);

    $(".email").on("input", function() {
        final_link = `${offer_link}${offer_link.includes("?") ? "&" : "?"}sub15=${$("[name=email]").val()}`;
        $("#offer").attr("href", final_link);
    });

    $("input[name=email]").on("input", function() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error");
        }
    });

    let clickAllowed = true;

    $("#offer").on("click", function(e) {
        if (!clickAllowed) {
            e.preventDefault(); 
            return;
        }
    
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            e.preventDefault();
            $("input[name=email]").addClass("error");
            return;
        } else {
            e.preventDefault()
            fetch(`https://track.review-program.today/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}&sum=0`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID);
                setTimeout(()=>{
                    window.location.href = $(this).attr('href');
                }, 500)
            })
            .catch(e => console.log("error during registration lead: " + e));
        }
    
        clickAllowed = false;
        setTimeout(() => {
            clickAllowed = true; 
        }, 5000);
    });


// test
// $(".quiz").fadeOut(0)
// $(".spinner").fadeOut(0)
// $(".form").fadeIn(0)
// test



    

})