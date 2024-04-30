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

$(".popup").fadeOut(0)

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var currentDate = moment();
var formattedDate = currentDate.format('D MMMM YYYY');
var formattedDayOfWeek = currentDate.format('dddd');
$('data').text(formattedDate);
$('.day_of_week').text(formattedDayOfWeek);

// spinner

$('.roulette-button button , .spin-button').click(function(){
	$('.roulette-button button , .spin-button').prop("disabled" , true);
	roll()
	$(".count").text("1")
})

roll = () => {
	$(".roulette-button button").removeClass("btn-animation");
	if (Number($(".spinner").attr("data-roll")) <= 2) {
		$(".spinner").attr("data-roll" , Number($(".spinner").attr("data-roll")) + 1);
		setTimeout(()=>{
			showPopup(Number($(".spinner").attr("data-roll")))
			if ($(".spinner").attr("data-roll") == 2) {
				console.log("win")
				setTimeout(()=>{
					$('.content , .roulette-container , .comments , header').fadeOut(300)
					$(".congratulation").addClass("active")
					setTimeout(()=>{
						$(".congratulation").addClass("black")
						confetti()
					},300)
					setTimeout(()=>{
						$("#confetti").fadeOut(300)
						$(".congratulation").fadeOut(300)
						$(".screen").addClass("screen--black")
						setTimeout(()=>{
							$("header").fadeIn(300)
							$(".final").addClass("active")
							setTimeout(()=>{
								$(".final-bottom").addClass("visible") 
							},300)
							setTimeout(()=>{
								$(".final-bottom").addClass("active") 
							},600)
						},300)
					} , 2300)
				},750)
			}
		},6000)
		console.log(Number($(".spinner").attr("data-roll")))
	}
}

showPopup = (n) => {
	if (n <=1) {
		$(".popup").fadeIn(300)
		$(`.popup-container[data-popup='${n}']`).delay(300).fadeIn(300)
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
	$(".main-bottom .image .card").css("margin-top" , "0px")
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

	window.offer_link = $(".congratulation .btn-submit").attr("href");
})


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
		$("input[name='email']").removeClass("valid").addClass("error")
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

