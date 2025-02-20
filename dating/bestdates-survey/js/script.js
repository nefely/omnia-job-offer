$(document).ready(function(){
    $(".intro .btn").click(function(){
        $(".intro").fadeOut(300)
        $("main").fadeIn(300)
        $(".question-1").fadeIn(300)
    })


    $(".question .btn[data-attr='next']").click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
        },300)
        if ($(this).closest(".question").next(".question").hasClass("question-2")) {
            $(".progress-line").css("width" , "40%")
        }
        if ($(this).closest(".question").next(".question").hasClass("question-3")) {
            $(".progress-line").css("width" , "60%")
        }
        if ($(this).closest(".question").next(".question").hasClass("question-4")) {
            $(".progress-line").css("width" , "80%")
        }
        if ($(this).closest(".question").next(".question").hasClass("question-5")) {
            $(".progress-line").css("width" , "100%")
        }
    })
})