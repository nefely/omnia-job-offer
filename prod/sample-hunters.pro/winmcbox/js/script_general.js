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

$('.preloader').delay(300).fadeOut(300);

let clickCount = 0;
let tryCount = 2;

$('.boxes .box:not(.clicked)').click(function(){
    if (!$(this).hasClass("clicked") && tryCount > 0) {
        tryCount--
        clickCount++
        $('.count').text(tryCount)
        $(this).addClass("clicked")
        if(clickCount < 3) {
            if (clickCount == 1) {
                $(this).addClass("empty")
            }
            if (clickCount == 2) {

                $(this).addClass("win")
                $('video').each(function() {
                    this.play();
                });
                setTimeout(()=>{
                    $('.video').fadeOut(300);
                },7000);
                setTimeout(()=>{
                    LastSlideShow()
                },1500)
            }
        }
    }
})


let LastSlideShow = () => {

    $("body .logo").fadeOut(300)
    $('.slide-1').css("position" , "absolute").fadeOut(300)
    $('.slide-2').css('position' , "relative").fadeIn(300)
    // confetti()
    setTimeout(()=>{
        $(".figures").addClass("active")
    },300)

}

// let confetti = () => {

//     const svg = document.querySelector("#confetti");
//     const svgStyles = getComputedStyle(svg);
//     const w = Number(svgStyles.width.split("px")[0]);
//     const h = Number(svgStyles.height.split("px")[0]);

//     const randRange = (min, max) => Math.random() * (max - min) + min;

//     for (i = 0; i < (w + h) / 5; i++) {
//         const circle = document.createElementNS(
//             "http://www.w3.org/2000/svg",
//             "circle"
//         );

//         const r = randRange(40, 80);

//         circle.setAttribute("r", r);
//         circle.setAttribute("cx", Math.round(Math.random() * w));
//         circle.setAttribute("cy", Math.round(Math.random() * h));

//         const fill = "none";
//         circle.setAttribute("fill", fill);

//         const stroke = `hsl(${randRange(0, 360)}deg 40% 80%)`;
//         circle.setAttribute("stroke", stroke);

//         const strokeWidth = r / 10;
//         circle.setAttribute("stroke-width", strokeWidth);

//         circle.setAttribute(
//             "style",
//             `stroke-dasharray: ${r * 0.5}, ${r * Math.PI * 2 - r * 0.5};
//             stroke-dashoffset: ${r * Math.PI * 2};
//             --radius: ${r};
//             --duration: ${randRange(3, 5)}s;
//             --delay: ${randRange(-1, 1)}s; 
//             --direction: ${i % 2 === 0 ? "reverse" : "normal"}`
//         );
//         svg.appendChild(circle);
//     }
// }


// test
// $("body .logo").fadeOut(300)
// $('.slide-1').css("position" , "absolute").fadeOut(300)
// $('.slide-2').css('position' , "relative").fadeIn(300)
// setTimeout(()=>{
//     $(".figures").addClass("active")
// },300)




})