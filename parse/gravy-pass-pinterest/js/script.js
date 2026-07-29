$(document).ready(function() {
    // Handle question navigation
    $('[data-question="1"] button').click(function() {  
        $('[data-question="1"]').hide();
        $('[data-question="2"]').show();
    });

    window.domain = window.location.hostname;
    $(".domain").text(domain)

    isClicked = false;

    // $(".offer_link").click(function(e){
    //     e.preventDefault();

    //     if (isClicked) return;
    //     isClicked = true;

    //     pintrk('page');

    //     setTimeout(() => {
    //         window.location.href = $(this).attr("href");
    //     }, 6500);

    //     setTimeout(() => {
    //         isClicked = false;
    //     }, 5000);
    // });
});