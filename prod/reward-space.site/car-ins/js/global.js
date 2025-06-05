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

    $(".offer").click(function(e){
        e.preventDefault();
        ttq.track('CompleteRegistration');
        fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },500)
        })
        .catch(e => console.log("error during registration lead: " + e));
    })
    
})    