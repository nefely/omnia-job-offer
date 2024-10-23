$(document).ready(function(){
    $('.preloader').delay(300).fadeOut(300);

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

    let clickAllowed = true;

    $("#offer").on("click", function(e) {
        e.preventDefault(); 

        if (!clickAllowed) {
            return;
        }

        fetch(`https://track.samplescenter.pro/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}&sum=0`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                window.location.href = $(this).attr('href');
            }, 500)
        })
        .catch(e => console.log("error during registration lead: " + e));
    
        clickAllowed = false;
        setTimeout(() => {
            clickAllowed = true; 
        }, 5000);
    });
})