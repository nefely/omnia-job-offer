$(document).ready(function(){

    let progressStep = 20
    let setProgress = (step) => {
        $('[data-el="progress-1"] .line').css("width" , `${Number(progressStep) * Number(step)}%`)
    }
    let setLoading = () => {
        $('[data-el="progress-2"] .line').css("width" , `100%`)
    }
    setProgress(1)
    
    $('[data-el="question-1"] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
            setProgress(2)
        },300)
    })

    $('[data-el="question-2"] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
            setProgress(3)
        },300)
    })

    $('[data-el="question-3"] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
            setProgress(4)
        },300)
    })

    $('[data-el="question-4"] .btn').click(function(){
        $(this).closest(".question").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".question").next(".question").fadeIn(300)
            setProgress(5)
        },300)
    })

    $('[data-el="question-5"] .btn').click(function(){
        $(this).closest(".quiz").fadeOut(300)
        $('[data-el="title-1"]').fadeOut(300)
        $('[data-el="progress-1"]').css("opacity" , "0")
        setTimeout(()=>{
            $(".analizing").fadeIn(300)
            setLoading()
            setTimeout(()=>{
                $(".analizing").fadeOut(300)
                $("header").fadeOut(300)
                $('[data-el="progress-1"]').fadeOut(300)
                setTimeout(()=>{
                    $("main").addClass("article-active")
                    $(".article").fadeIn(300)
                },300)
            },4300)
        },300)
    })

})