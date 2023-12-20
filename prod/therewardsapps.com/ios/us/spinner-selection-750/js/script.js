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
$(".domain").text(domain)

$(".popup ").fadeOut(0)

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(".congratulation .btn-submit").click(function() {
    if(checkValidity()) {
      const clickid = window.getURLParameter(window.location.href, 'clickid');
      const email = $("input[name='email']").val();

      fetch(`https://appsflyer.omniatrackroi.com/fb-leads`, {
	mode: 'no-cors',
	method: 'POST',
	body: JSON.stringify({clickid: clickid, email: email})
      })
      .catch((e) => console.log(`Failed to register facebook lead with clickid: ${clickid}. Reason: ${e.message}`));

      fetch(`https://track.therewardsapps.com/track.php?cnv_id=${clickid}`, {
	  mode: 'no-cors'
      })
      .then(() => { window.location.href = `https://track.therewardsapps.com/click.php?lp=1&email=${email}&to_offer=${offer_number}` })
      .catch((e) => console.log(`Failed to send Binom lead with clickid: ${clickid}. Reason: ${e.message}`));
    }
});


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

// window.spinner = new Audio('audio/spinner.wav');
// window.fail = new Audio('audio/fail.wav');
// window.bonus = new Audio('audio/bonus-spin.wav');
// window.win = new Audio('audio/win.wav');

// spinner.volume = 1
// fail.volume = 1
// bonus.volume = 1
// win.volume = 1

roll = () => {
	// spinner.pause();
	// spinner.currentTime = 0.85;
	// spinner.play();
	if (Number($(".spinner").attr("data-roll")) <= 3) {
		$(".spinner").attr("data-roll" , Number($(".spinner").attr("data-roll")) + 1);
		setTimeout(()=>{
			showPopup(Number($(".spinner").attr("data-roll")))
			if ($(".spinner").attr("data-roll") == 3) {
				console.log("win")

				setTimeout(()=>{
					$('.roulette-girl , .roulette-container').fadeOut(300)
					$(".congratulation").delay(300).fadeIn(300)
					confetti()
					// $(".main-top").addClass("min")
					setTimeout(()=>{
						$("#confetti").fadeOut(300)
					} , 5000)
				},750)
			}
		},6000)
		console.log(Number($(".spinner").attr("data-roll")))
	}
}

showPopup = (n) => {
	if (n <=2) {
		$(".popup").fadeIn(300)
		$(`.popup-container[data-popup='${n}']`).delay(300).fadeIn(300)
	}
	if (n == 1) {
		// setTimeout(()=>{
		// 	fail.pause();
		// 	fail.currentTime = 0;
		// 	fail.play();
		// }, 450)
	}
	if (n == 2) {
		// setTimeout(()=>{
		// 	bonus.pause();
		// 	bonus.currentTime = 0;
		// 	bonus.play();
		// }, 450)
	}
	if (n == 3) {
		// setTimeout(()=>{
		// 	win.pause();
		// 	win.currentTime = 0;
		// 	win.play();
		// }, 1450)
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
	console.log("open box")
	// $(".main-bottom .cards").css("margin-top" , "-50px")

	$(".main-top [data-step='1']").delay(1500).fadeOut(300)
	$(".main-top [data-step='2']").delay(1800).fadeIn(300)
	setTimeout(()=>{
		$(".main-top").addClass("min")
		$(".main-bottom").addClass("max")
		$(".main-bottom .image").addClass("max")
	},3800)
	$(".congratulation .button .btn-open").fadeOut(300)
	$(".main-bottom .image .box").addClass("hithere")
	$(".main-bottom .image .box").delay(1500).fadeOut(300);
	// $("#gift-box-top").css("transform" , "translateY(-50px)").fadeOut(200)
	setTimeout(()=> {
		$(".main-bottom .image .card").css("transform", "scale(1 , 1)")
	}, 1500)
	setTimeout(()=>{
		$(".congratulation .button .btn-choose").delay(300).fadeIn(300)
		$(".cards .card").css("transition" , "0.3s linear")
	},3800)
})

window.offer_number = 0
window.offer_name =""
$(".cards .card").click(function(){
	$(".cards .card").removeClass("active")
	$(this).addClass("active")
	offer_number = $(this).attr("data-offer")
	offer_name = $(this).attr("data-offer-name")
	$(".brand-card").text(offer_name)
	$(".button .btn-choose").attr("disabled" , false)
})

$(".button .btn-choose").click(function(){
	$(`.cards .card`).not($(`.cards .card[data-offer=${offer_number}]`)).css("opacity" , "0").css('pointer-events' , "none").prop("disabled" , true)
	$(this).fadeOut(300)

	if (offer_number == 1) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(50%), 100%)")
	}
	if (offer_number == 3) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(50%), 0)")
	}
	if (offer_number == 5) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(50%), -100%)")
	}
	if (offer_number == 2) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(-50%), 100%)")
	}
	if (offer_number == 4) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(-50%), 0)")
	}
	if (offer_number == 6) {
		$(`.cards .card[data-offer=${offer_number}]`).css("transform" , "scale(1, 1) translate(calc(-50%), -100%)")
	}

	setTimeout(()=>{
		$(`.cards .card[data-offer=${offer_number}]`).removeClass("active")
		$(`.cards .card[data-offer=${offer_number}] img`).css("width" , "240px")

		$(".main-top").removeClass("min")
		$(".main-bottom").removeClass("max")
		$(".main-bottom .image").removeClass("max")

		$(".main-top [data-step='2']").delay(600).fadeOut(300)
		$(".main-top [data-step='3']").delay(900).fadeIn(300)

		setTimeout(()=>{
			$(".main-top [data-step='3']").fadeOut(300)
			$(".main-top [data-step='4']").delay(600).fadeIn(300)
			$(".main-bottom [data-step='1'] .btn-claim").delay(600).fadeIn(300)
		},5000)
	},600)
})

$(".main-bottom [data-step='1'] .btn-claim").click(function(){
	$(".main-top [data-step='4']").fadeOut(300)
	$(".main-top [data-step='5']").delay(300).fadeIn(300)
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
})


// test

// $(".intro").fadeOut(0)
// $(".main").css("background",  "var(--theme-black)");
// $(".main").fadeIn(0).css("display" , "flex").css("opacity" , "1")

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
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
		$("input[name=email]").addClass("valid").removeClass("error")
		$(".congratulation .button .btn-submit").removeClass("btn-disabled")
		$(".congratulation .button .btn-submit")[0].removeEventListener('click', handleClick);
		return true
	} else {
		$("input[name=email]").removeClass("valid").addClass("error")
		$(".congratulation .button .btn-submit").addClass("btn-disabled")
		$(".congratulation .button .btn-submit")[0].addEventListener('click', handleClick);
		return false
	}
}

function handleClick(event) {
  if (!checkValidity()) {
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