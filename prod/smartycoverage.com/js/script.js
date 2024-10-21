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
        
        setTimeout(()=>{
            window.location.href = $(this).attr('href');
        }, 1000)
        setTimeout(() => {
            clickAllowed = true; 
        }, 5000);
    });
})