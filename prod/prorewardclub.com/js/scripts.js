$(document).ready(function(){

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

const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

$(".offer_link").click(function(e){
    e.preventDefault()
    $(this).addClass("disabled")
    fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkClickID);
        setTimeout(()=>{
            window.location.href = $(this).attr("href")
        },300)
    })
    .catch(e => console.log("error during registration lead: " + e) , $(this).removeClass("disabled"));
})

})