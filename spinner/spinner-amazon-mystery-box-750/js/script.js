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

window.domain = window.location.hostname;
// window.offer_link = `https://track.${window.location.host}/click`

$(".domain").text(domain)

let isSubmitting = false;

$(".congratulation .btn-submit").click(function () {
    if (isSubmitting) return; 

    if (checkValidity()) {
        if (rtkClickID && cachebuster && rtkClickID !== "undefined" && cachebuster !== "undefined") {

            isSubmitting = true;
            $(".congratulation .btn-submit").prop("disabled", true);

            fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors' })
                .then(r => {
                    console.log("successfully registered: " + rtkClickID);
                    window.location.href = `https://track.${window.location.host}/click?clickid=${rtkClickID}&rtkck=${cachebuster}&sub15=${$("[name=email]").val()}`
                })
                .catch(e => console.log("error during registration lead: " + e));

            setTimeout(() => {
                isSubmitting = false;
                $(".congratulation .btn-submit").prop("disabled", false);
            }, 5000);
        }
    }

    // console.log(`https://track.${window.location.host}/click?clickid=${rtkClickID}&rtkck=${cachebuster}&sub15=${$("[name=email]").val()}`)
});



$(".popup").fadeOut(0)

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// intro
$(".intro-button .btn-start").click(function(){
	$(".intro-slides").css("transform", `translateX(${-25 * Number($(this).attr("data-slide"))}%)`)
	
	$(".intro-indicator .indicator").removeClass("indicator--active")
	$(`.intro-indicator .indicator[data-slide='${Number($(this).attr("data-slide")) + 1}']`).addClass("indicator--active")
	
	if ( Number($(this).attr("data-slide")) == 3) {
		$('.intro-indicator').css("opacity", "0");
		$(".intro-button .btn-start").fadeOut(0);
		$(".intro-button .btn-finish").fadeIn(0);
	}

	$(this).attr("data-slide" , Number($(this).attr("data-slide")) + 1)
});
$(".intro-button .btn-finish").click(function(){
	$(".intro").fadeOut(300);
	setTimeout(()=>{
		$(".main").addClass("active");
	}, 300)
	setTimeout(()=>{
		$(".main").css("opacity" , "1");
	}, 600)
})


// spinner

$('.roulette-button button , .spin-button').click(function(){
	$('.roulette-button button , .spin-button').prop("disabled" , true);
	roll()
	$(".count").text("1")
})

roll = () => {
	if (Number($(".spinner").attr("data-roll")) <= 3) {
		$(".spinner").attr("data-roll" , Number($(".spinner").attr("data-roll")) + 1);
		setTimeout(()=>{
			showPopup(Number($(".spinner").attr("data-roll")))
			if ($(".spinner").attr("data-roll") == 3) {
				// console.log("win")
				setTimeout(()=>{
					$('.roulette-girl , .roulette-container').fadeOut(300)
					$(".congratulation").delay(300).fadeIn(300)
					confetti()
					setTimeout(()=>{
						$("#confetti").fadeOut(300)
					} , 5000)
				},750)
			}
		},6000)
		// console.log(Number($(".spinner").attr("data-roll")))
	}
}

showPopup = (n) => {
	if (n <=2) {
		$(".popup").fadeIn(300)
		$(`.popup-container[data-popup='${n}']`).delay(300).fadeIn(300)
	}
	if (n == 1) {
		// $(".count").text("0")
	}
}
hidePopup = () => {
	$(".popup").delay(300).fadeOut(300)
	$(`.popup-container`).fadeOut(300)
}

$('.popup-button button').click(function(){
	$(this).prop("disabled" , true);
	hidePopup()
	setTimeout(()=>{
		roll()
	},300)

	if ($(this).closest(".popup-container").attr("data-popup") == 1) {
		$(".count").text("0")
		setTimeout(()=>{
			$(".count").text("1")
		}, 6600)
	}

	if ($(this).closest(".popup-container").attr("data-popup") == 2) {
		$(".count").text("0")
	}
})


confetti = () => {

	const svg = document.querySelector("#confetti");
	const svgStyles = getComputedStyle(svg);
	const w = Number(svgStyles.width.split("px")[0]);
	const h = Number(svgStyles.height.split("px")[0]);

	const randRange = (min, max) => Math.random() * (max - min) + min;

	for (i = 0; i < (w + h) / 5; i++) {
		const circle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);

		const r = randRange(40, 80);

		circle.setAttribute("r", r);
		circle.setAttribute("cx", Math.round(Math.random() * w));
		circle.setAttribute("cy", Math.round(Math.random() * h));

		const fill = "none";
		circle.setAttribute("fill", fill);

		const stroke = `hsl(${randRange(0, 360)}deg 40% 80%)`;
		circle.setAttribute("stroke", stroke);

		const strokeWidth = r / 10;
		circle.setAttribute("stroke-width", strokeWidth);

		circle.setAttribute(
			"style",
			`stroke-dasharray: ${r * 0.5}, ${r * Math.PI * 2 - r * 0.5};
			stroke-dashoffset: ${r * Math.PI * 2};
			--radius: ${r};
			--duration: ${randRange(3, 5)}s;
			--delay: ${randRange(-1, 1)}s; 
			--direction: ${i % 2 === 0 ? "reverse" : "normal"}`
		);
		svg.appendChild(circle);
	}
}


$(".main-bottom [data-step='1'] .btn-open").click(function(){
	$(".main-top [data-step='1']").delay(2500).fadeOut(300)
	$(".main-top [data-step='2']").delay(2800).fadeIn(300)
	$(".congratulation .button .btn-open").fadeOut(300)
	$(".main-bottom .image .card").css("margin-top" , "40px")
	$(".main-bottom .image .box").delay(3000).fadeOut(300);
	$("#gift-box-top").delay(0).fadeOut(300)
	
	// setTimeout(()=>{
	// 	$("#gift-box-bottom").delay(13000).fadeOut(300)
	// },1000)

	setTimeout(()=> {
		$(".main-bottom .image .card").css("transform", "scale(1 , 1)").addClass("active")
	}, 3000)
	
	setTimeout(()=>{
		$(".main-top [data-step='2']").fadeOut(300)
		$(".main-top [data-step='3']").delay(300).fadeIn(300)
		$(".congratulation .button .btn-claim").delay(300).fadeIn(300)
	},7000)
})

$(".main-bottom [data-step='1'] .btn-claim").click(function(){
	$(".main-top [data-step='3']").fadeOut(300)
	$(".main-top [data-step='4']").delay(300).fadeIn(300)
	$(".congratulation .button .btn-claim").fadeOut(300)
	$(".main-bottom .image .card").removeClass("active");
	setTimeout(()=>{
		$(".main-bottom .image").css("height", "142px").css("margin-top" , "-70px");
		setTimeout(()=> {
			$(".congratulation .input").fadeIn(300)
			$(".congratulation .rules").fadeIn(300)
			$(".congratulation .button .btn-submit").fadeIn(300)
		},600)
	},600)

	// window.offer_link = $(".congratulation .btn-submit").attr("href");
})


// test
// $('.roulette-girl , .roulette-container').fadeOut(0)
// $(".congratulation").fadeIn(0)
// confetti()
// setTimeout(()=>{
// 	$("#confetti").fadeOut(300)
// } , 5000)


$("input[name='email']").on("input", function(){
	checkValidity()
});

checkValidity = () => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name='email']").val())) {
		$("input[name='email']").addClass("valid").removeClass("error")
		$(".congratulation .button .btn-submit").removeClass("btn-disabled")
		$(".congratulation .button .btn-submit")[0].removeEventListener('click', handleClick);
		return true
	} else {
		// $("input[name='email']").removeClass("valid").addClass("error")
		$(".congratulation .button .btn-submit").addClass("btn-disabled")
		$(".congratulation .button .btn-submit")[0].addEventListener('click', handleClick);
		return false
	}
}

function handleClick(event) {
  if (!checkValidity()) {
    $("input[name='email']").removeClass("valid").addClass("error").focus()
    event.preventDefault();
  } else {
    $(".congratulation .button .btn-submit")[0].removeEventListener('click', handleClick);
  }
}

if ($(".congratulation .button .btn-submit").length > 0) {
	$(".congratulation .button .btn-submit")[0].addEventListener('click', handleClick);
}

$('.preloader').delay(300).fadeOut(300);

});

