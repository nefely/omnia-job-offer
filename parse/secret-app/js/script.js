$(document).ready(function(){
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`)

// init
$(".slide-1 .btn").click(function(){
    $(".slide-1").fadeOut()
    $(".timer").fadeIn(300)
    startTimer()
    $(".slide-2").fadeIn(300)
})

// quiz
let step = 1;
$(".question").not(".question-1").fadeOut(0);

function animatePercentage(el, from, to, duration = 300) {
    const start = performance.now();
    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(from + (to - from) * progress);
        $(".progress-percentage").text(`${value + "%"}`)
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

$(".question-1 .btn, .question-2 .btn, .question-3 .btn, .question-4 .btn").click(function () {
    step++;

    let newVal = (step - 1) * 25;
    let currentVal = parseInt($(".progress-percentage").text());

    animatePercentage(
        $(".progress-percentage"),
        currentVal,
        newVal,
        300
    );

    $(".progress-line").css("width", `${newVal}%`);
    $(".current-step").text(step);

    $(this).closest(".question").fadeOut(0);
    $(this).closest(".question").next(".question").fadeIn(300);

    if (step >= 5) {
        $(".quiz .step").fadeOut(0);
        $(".quiz .description").fadeOut(0);
        $(".timer").fadeOut(0);

        setTimeout(() => {
            $(".slide-2").fadeOut(0);
            $(".slide-3").fadeIn(300);
            setTimeout(()=>{
                runConfetti()
            },300)
        }, 2500);
    }
});



// timer
const startTimer = () => {
    const timerEl = document.querySelectorAll('.timer-clock')[0];
    if (!timerEl) return;

    let remainingSeconds = 5 * 60;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    timerEl.textContent = formatTime(remainingSeconds);

    const interval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            timerEl.textContent = "00:00";
            clearInterval(interval);
            return;
        }

        timerEl.textContent = formatTime(remainingSeconds);
    }, 1000);
};


function runConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const confettiCount = 120;
    const confetti = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: random(0, canvas.width),
            y: random(-canvas.height, 0),
            size: random(6, 10),
            speedY: random(1, 3),        
            speedX: random(-1, 1),        
            rotation: random(0, Math.PI * 2),
            rotationSpeed: random(-0.05, 0.05), 
            wobble: random(0.5, 2.5),    
            wobbleAngle: random(0, Math.PI * 2),
            color: `hsl(${random(0, 360)}, 100%, 60%)`
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {
            c.y += c.speedY;
            c.x += c.speedX;

            c.wobbleAngle += 0.1;
            c.x += Math.sin(c.wobbleAngle) * c.wobble;

            c.rotation += c.rotationSpeed;

            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
            ctx.restore();

            if (c.y > canvas.height + 20) {
                c.y = -10;
                c.x = random(0, canvas.width);
            }
        });

        requestAnimationFrame(render);
    }

    render();

    setTimeout(() => {
        $("#confettiCanvas").fadeOut(300);
    }, 3000);
}




// test
// startTimer()
// $(".slide-1").fadeOut(0)
// $(".slide-2").fadeOut(0)
// $(".slide-3").fadeIn(0)

})