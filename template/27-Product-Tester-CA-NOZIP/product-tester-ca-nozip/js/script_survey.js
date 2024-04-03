$(document).ready(function(){

const clickid = window.getURLParameter(window.location.href, 'clickid');
const uclick = window.getURLParameter(window.location.href, 'uclick');

// const email = window.getURLParameter(window.location.href, 'email');
// const firstname = window.getURLParameter(window.location.href, 'firstname');
// const lastname = window.getURLParameter(window.location.href, 'lastname');
// const telephone = window.getURLParameter(window.location.href, 'telephone');
// const zip = window.getURLParameter(window.location.href, 'zip');

const sub13 = window.getURLParameter(window.location.href, 'sub13');
const sub14 = window.getURLParameter(window.location.href, 'sub14');
const sub15 = window.getURLParameter(window.location.href, 'sub15');
const sub16 = window.getURLParameter(window.location.href, 'sub16');

const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

$(".question--4").delay(3600).fadeOut(300)
$(".question--5").delay(3900).fadeIn(300)

form_final_link = () => {

//   console.log(clickid)
//   console.log(uclick)
//   console.log(email)
//   console.log(firstname)
//   console.log(lastname)
//   console.log(telephone)
//   console.log(zip)

  $(".answers-container-3 a.yes").attr("href" ,`${window.offer_link_1}${window.offer_link_1.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
  $(".answers-container-4 a.yes").attr("href" ,`${window.offer_link_2}${window.offer_link_2.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
  $(".answers-container-5 a.yes").attr("href" ,`${window.offer_link_3}${window.offer_link_3.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )

  $(".answers-container-3 a.no").attr("href" ,`` )
  $(".answers-container-4 a.no").attr("href" ,`` )
  $(".answers-container-5 a.no").attr("href" ,`${window.offer_link_no_3}${window.offer_link_no_3.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
}

$(".answers-container-1 .btn.next").click(function(){
  $(".dot-item-1").removeClass("active")
  $(".dot-item-2").addClass("active")
  $(".title-item-1").fadeOut(0)
  $(".title-item-2").fadeIn(300)
  $(".answers-container-1").fadeOut(0)
  $(".answers-container-2").fadeIn(300)
})

$(".answers-container-2 .btn.next").click(function(){
  $(".dot-item-2").removeClass("active")
  $(".dot-item-3").addClass("active")
  $(".title-item-2").fadeOut(0)
  $(".title-item-3").fadeIn(300)
  $(".answers-container-2").fadeOut(0)
  $(".answers-container-3").fadeIn(300)

	$('.answers-container-3 a.no').attr("href" , ``)
	$('.answers-container-4 a.no').attr("href" , ``)
	$('.answers-container-5 a.no').attr("href" , `https://omniapostback.com/click?to_offer=2`)

	$('.answers-container-3 a.yes').attr("href" , `../1000-earning-opportunity/`)
	$('.answers-container-4 a.yes').attr("href" , `https://omniapostback.com/click?to_offer=3`)
	$('.answers-container-5 a.yes').attr("href" , `https://omniapostback.com/click?to_offer=4`)

	window.offer_link_1 = $('.answers-container-3 a.yes').attr("href")
	window.offer_link_2 = $('.answers-container-4 a.yes').attr("href")
	window.offer_link_3 = $('.answers-container-5 a.yes').attr("href")
	window.offer_link_no_3 = $('.answers-container-5 a.no').attr("href")

	form_final_link()
})

$(".answers-container-2 .btn.back").click(function(){
  $(".dot-item-2").removeClass("active")
  $(".dot-item-1").addClass("active")
  $(".title-item-2").fadeOut(0)
  $(".title-item-1").fadeIn(300)
  $(".answers-container-2").fadeOut(0)
  $(".answers-container-1").fadeIn(300)
})
$(".answers-container-3 .btn.back").click(function(){
  $(".dot-item-3").removeClass("active")
  $(".dot-item-2").addClass("active")
  $(".title-item-3").fadeOut(0)
  $(".title-item-2").fadeIn(300)
  $(".answers-container-3").fadeOut(0)
  $(".answers-container-2").fadeIn(300)
})
$(".answers-container-4 .btn.back").click(function(){
  $(".title-item-4").fadeOut(0)
  $(".title-item-3").fadeIn(300)
  $(".answers-container-4").fadeOut(0)
  $(".answers-container-3").fadeIn(300)
})
$(".answers-container-5 .btn.back").click(function(){
  $(".title-item-5").fadeOut(0)
  $(".title-item-4").fadeIn(300)
  $(".answers-container-5").fadeOut(0)
  $(".answers-container-4").fadeIn(300)
})

let lastClickTime = 0;

$('.answers-container-3 a.no').click(function(e){
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
	 	// fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event9=1&cnv_status=q3no`, { mode: 'no-cors'});
});

$('.answers-container-3 a.yes').click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
    	console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
            fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
		    // fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event8=1&cnv_status=q3yes`, { mode: 'no-cors'});
    }
});

$('.answers-container-4 a.no').click(function(e){
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
		// fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event6=1&cnv_status=q4no`, { mode: 'no-cors'});
});

$('.answers-container-4 a.yes').click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
    	console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
        // fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event5=1&cnv_status=q4yes`, { mode: 'no-cors'});
    }
});

$('.answers-container-5 a.no').click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
      console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
        // fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event10=1&cnv_status=q5no`, { mode: 'no-cors'});
    }
});

$('.answers-container-5 a.yes').click(function(e){
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 5000) {
    	console.log("Too soon! Wait for 5 seconds between clicks.");
        e.preventDefault();
        return false;
    } else {
        lastClickTime = currentTime;
        fetch(`https://omniatrackroi.com/track.php?cnv_id=${rtkClickID__}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
        // fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&event7=1&cnv_status=q5yes`, { mode: 'no-cors'});
    }
});


$('.answers-container-3 a.no').click(function(e){
  e.preventDefault()
  $(".title-item-3").fadeOut(0)
  $(".title-item-4").fadeIn(300)
  $(".answers-container-3").fadeOut(0)
  $(".answers-container-4").fadeIn(300)
});
$('.answers-container-4 a.no').click(function(e){
  e.preventDefault()
  $(".title-item-4").fadeOut(0)
  $(".title-item-5").fadeIn(300)
  $(".answers-container-4").fadeOut(0)
  $(".answers-container-5").fadeIn(300)
});

})
