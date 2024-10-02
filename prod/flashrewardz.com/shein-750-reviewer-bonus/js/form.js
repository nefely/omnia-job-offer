$(document).ready(function () {
    
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

    rtkcid = getURLParameter(window.location.href, 'rtkcid')
    rtkcmpid = getURLParameter(window.location.href, 'rtkcmpid')

    setTimeout(() => {
        window.offer_link = `${$("#subbtn").attr("href")}${$("#subbtn").attr("href").includes("?") ? "&" : "?"}clickid=${rtkcid}&rtkck=${rtkcmpid}`;
    }, 2000);

    isEmailValid = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            return true;
        } else {
            return false;
        }
    };
    emailValidation = () => {
        if (isEmailValid()) {
            $("input[name=email]").removeClass("error");
        } else {
            $("input[name=email]").focus();
            $("input[name=email]").addClass("error");
        }
    };
    

    $("input[name=email]").on("input", function () {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error");
        }
    });

    form_final_link = () => {
        console.log(window.offer_link);
        $("#subbtn").attr("href", `${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}sub15=${$("[name=email]").val()}`);
    };

    let debounceTimeout;

$("#subbtn").click(function (e) {
    e.preventDefault();

    if (debounceTimeout) {
        console.log("Please wait before clicking again.");
        return;
    }

    emailValidation();

    if (isEmailValid()) {
        debounceTimeout = setTimeout(() => {
            debounceTimeout = null; 
        }, 5000);

        fetch(`https://track.flashrewardz.com/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkcid);
            setTimeout(() => {
                window.location.href = $("#subbtn").attr("href");
            }, 500);
        })
        .catch(e => console.log("error during registration lead: " + e));
    } else {
        return;
    }
});

    $("input[name=email]").on("input", function () {
        form_final_link();
    });



    $("#s-btn").click(function(){
        $("#f-header").fadeOut(300)
        setTimeout(()=>{
            $("#cid-header , #cid-main-container").fadeIn(300)
        },300)
    })
    

    
});
