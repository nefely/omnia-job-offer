$(document).ready(function(){
    setTimeout(()=>{
        final_link__no_params = $(".form-step--1 a").attr("href")
        $(".form-step--1 a").attr("href" , `${final_link__no_params}${final_link__no_params.includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}&offer_type=${$("[name=offer_type]").val()}`)
    },1000)
})