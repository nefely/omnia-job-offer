$(document).ready(function(){

const t = window.standart_time || 300
const LEAVE_TIME = 250   // must match .is-leaving animation duration in main.css
const STAGGER = 80       // delay between elements of the entering block, ms

const $quiz = $("#intro .quiz")
const $blocks = $(".quiz-blocks")
const $questions = $(".quiz-block--1, .quiz-block--2, .quiz-block--3")
let busy = false

const setDot = (index) => {
    $('.quiz-dots ul li').removeClass("active")
    $(`.quiz-dots ul li:eq(${index})`).addClass("active")
}

// Animate a block in: title first, then each answer one by one.
const enter = ($block) => {
    $block.find(".tags, .quiz-block-question > *, .quiz-block-answers > *, .quiz-block-back")
        .each(function(i){ this.style.setProperty("--i", i) })
    $block.show().addClass("is-entering")
    setTimeout(() => $block.removeClass("is-entering"), 1200)
}

// Switch from one block to another. dir: "fwd" | "back"
const goTo = ($from, $to, dir = "fwd") => {
    busy = true
    $quiz.toggleClass("dir-back", dir === "back")
    $from.removeClass("is-entering").addClass("is-leaving")
    setTimeout(() => {
        $from.removeClass("is-leaving").hide()
        enter($to)
        busy = false
    }, LEAVE_TIME)
}

// Questions 1-3 have different heights; reserve the height of the tallest one
// so the progress dots and question title stay in place between steps.
const fixQuestionsHeight = () => {
    if ($blocks.data("offer")) return
    let max = 0
    $questions.each(function(){
        const prev = this.style.cssText
        $(this).css({ display: "block", visibility: "hidden", position: "absolute", left: 0, right: 0 })
        max = Math.max(max, $(this).outerHeight())
        this.style.cssText = prev
    })
    $blocks.css("min-height", max)
}
$(window).on("resize", fixQuestionsHeight)

// "Offer expires <last day of current month>"
const now = new Date()
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
$(".offer-expires").text(`Offer expires ${months[now.getMonth()]} ${lastDay} at 11:59pm EST`)

// Start Now -> first question
$(".form-step--1 .btn-next").click(function(e){
    e.preventDefault()
    $("#intro .form").fadeOut(t)
    $("#intro .figure").fadeOut(t)
    setTimeout(() => {
        $("#intro").addClass("quiz-mode")
        $(".quiz-block--1").hide()
        $quiz.show().addClass("is-shown")
        fixQuestionsHeight()
        enter($(".quiz-block--1"))
    }, t)
})

// question 1 -> 2
$(".quiz-block--1 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    if (busy) return
    setDot(1)
    const $block = $(this).closest(".quiz-block")
    goTo($block, $block.next(".quiz-block"))
})

// question 2 -> 3
$(".quiz-block--2 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    if (busy) return
    setDot(2)
    const $block = $(this).closest(".quiz-block")
    goTo($block, $block.next(".quiz-block"))
})

// question 3 -> offer (dots turn green one by one)
$(".quiz-block--3 .quiz-block-answers a").click(function(e){
    e.preventDefault()
    if (busy) return
    busy = true
    const $block = $(this).closest(".quiz-block")
    $quiz.removeClass("dir-back")
    $block.removeClass("is-entering").addClass("is-leaving")
    $('.quiz-dots ul li').removeClass("active")

    setTimeout(() => $('.quiz-dots ul li:eq(0)').addClass("green"), 400)
    setTimeout(() => $('.quiz-dots ul li:eq(1)').addClass("green"), 800)
    setTimeout(() => $('.quiz-dots ul li:eq(2)').addClass("green"), 1200)
    setTimeout(() => {
        $('.quiz-dots').fadeOut(t)
        setTimeout(() => {
            $block.removeClass("is-leaving").hide()
            $blocks.data("offer", true).css("min-height", "")
            enter($block.next(".quiz-block"))
            busy = false
        }, t)
    }, 1700)
})

// back
$(".quiz-block--2 .quiz-block-back button").click(function(){
    if (busy) return
    setDot(0)
    const $block = $(this).closest(".quiz-block")
    goTo($block, $block.prev(".quiz-block"), "back")
})
$(".quiz-block--3 .quiz-block-back button").click(function(){
    if (busy) return
    setDot(1)
    const $block = $(this).closest(".quiz-block")
    goTo($block, $block.prev(".quiz-block"), "back")
})

})
