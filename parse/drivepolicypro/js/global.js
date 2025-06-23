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
        setTimeout(()=>{
            window.location.href = $(this).attr("href")
        },500)
    })

	let result_city = "America"
    fetch("https://ipinfo.io/json?token=c99eab9ac96553")
        .then((response) => {
            if (!response.ok) {
            	throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
        	result_city = data.city
        	$("#result_city").text(result_city)
            result_city ? $("#result_city").text(result_city) : $("#result_city").text("America")
        })
        .catch((error) => {
			fetch("https://api.ipapi.is?key=ee1386e7141cfced")
			    .then((response) => {
			        if (!response.ok) {
			            throw new Error("Network response was not ok");
			        }
			        return response.json();
			    })
			    .then((data) => {
			    	result_city = data.location.city
        			result_city ? $("#result_city").text(result_city) : $("#result_city").text("America")
			    })
			    .catch((error) => {
			        console.error("There has been a problem with your fetch operation:", error);
                	$("#result_city").text("America")
			    });
		})
    
})    