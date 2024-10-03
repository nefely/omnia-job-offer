$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

    const now = new Date();
    window.currentYear = now.getFullYear();
    $(".year").text(currentYear)

    let clickAllowed = true;
    $("#offer").on("click", function(e) {
        if (!clickAllowed) {
            e.preventDefault(); 
            return;
        }
    
        e.preventDefault()
        fetch(`https://track.review-program.today/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}&sum=0`, { mode: 'no-cors'})
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