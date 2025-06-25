$(document).ready(function(){
	
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
    
    $('.preloader').delay(200).fadeOut(200);

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    $("#btf").click(function(e){
        e.preventDefault()
        $(this).addClass("disabled")
        fetch(`https://track.earnoppcenter.net/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkcid);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },300)
        })
        .catch(e => console.log("error during registration lead: " + e) , $(this).removeClass("disabled"));
        
    })

})    