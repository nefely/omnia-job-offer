$(document).ready(function(){
    $(".answers a").click(function(e){
        e.preventDefault();

    })

    $('.preloader').delay(300).fadeOut(300);

    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)


    let clickAllowed = true;

    $(".offer").on("click", function(e) {
        if (!clickAllowed) {
            e.preventDefault(); 
            return;
        }
        clickAllowed = false;

        $(".ProgressBar--progressBar--mHTf2").css("width" , "25%")
        $(".ProgressBar--progressBarWithPercentage--sXqX2 h4").css("left" , "25%").text("25%")
        fetch(`https://track.quick-surance.com/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}&sum=0`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                window.location.href = $(this).attr('href');
            }, 1000)
        })
        .catch(e => console.log("error during registration lead: " + e));
        setTimeout(() => {
            clickAllowed = true; 
        }, 5000);
    });
})