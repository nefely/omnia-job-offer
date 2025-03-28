$(document).ready(function(){
    $(".faq .item .visible").click(function(){
        $(this).closest(".item").toggleClass("active")
    })
    $(".to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });
    $(".form [data-question='1'] .btn").click(function(e){
        e.preventDefault()
        window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${rtkClickID}&rtkck=${cachebuster}`
    })
})