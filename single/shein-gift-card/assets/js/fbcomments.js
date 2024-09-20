var visible = 5;

const comments = [
	{
		order: 1,
		likes: 1,
		avatar: `../assets/images/1.jpg`,
		name: `James Williams`,
		text: `My wardrobe’s got some new life. Loving the new clothes, thanks to the whole Savvy Deals Program team:`,
		image: `../assets/images/test7.jpg`,
		age: `a week ago`,
		comments: []
	},
	{
		order: 2,
		likes: 1,
		avatar: `../assets/images/2.jpg`,
		name: `Patricia Dortha`,
		text: `No luck this time, but I’m definitely eyeing some new pieces from SHEIN`,
		image: null,
		age: `a week ago`,
		comments: []
	},
	{
		order: 3,
		likes: 3,
		avatar: `../assets/images/3.jpg`,
		name: `Angel Elizabeth`,
		text: `This gift card was a fashion blessing. My closet is now full of trendy pieces I adore`,
		image: `../assets/images/test1.jpg`,
		age: `a week ago`,
		comments: [
			{
				likes: 16,
				avatar: `../assets/images/brand.jpg`,
				name: `Savvy Deals Program`,
				text: `We're thrilled you're loving your new wardrobe! Best wishes, Elizabeth!`,
				age: `a week ago`,
			},
			{
				likes: 3,
				avatar: `../assets/images/3.jpg`,
				name: `Angel Elizabeth`,
				text: `Thank you so much!`,
				age: `a week ago`,
			}
		]
	},
	{
		order: 4,
		likes: 7,
		avatar: `../assets/images/4.jpg`,
		name: `Maria Neumann`,
		text: `Even my husband was happy when I was accepted, he knows that for at least a month we won't spend money on shopping haha`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 5,
		likes: 7,
		avatar: `../assets/images/5.jpg`,
		name: `David Harvey`,
		text: `I can't believe how many products I managed to get, I really didn't know that they have such good prices`,
		image: `../assets/images/test6.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 25,
				avatar: `../assets/images/brand.jpg`,
				name: `Savvy Deals Program`,
				text: `That’s awesome to hear! Glad you’re discovering great deals. Enjoy your finds, David!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 6,
		likes: 8,
		avatar: `../assets/images/10.jpg`,
		name: `Susan Lakeweood`,
		text: `I wasn't accepted, but it would've helped because I order from SHEIN at least twice a month`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 7,
		likes: 3,
		avatar: `../assets/images/11.jpg`,
		name: `Lisa Nguyen`,
		text: `Got some really standout pieces, thank you guys!`,
		image: `../assets/images/test2.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 56,
				avatar: `../assets/images/brand.jpg`,
				name: `Savvy Deals Program`,
				text: `Thank you for participating and we hope to hear from you again!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 8,
		likes: 12,
		avatar: `../assets/images/12.jpg`,
		name: `Thomas Lucas`,
		text: `Now I understand why everyone is talking about them, I don't think I've seen such a range of products anywhere else`,
		image: `../assets/images/test5.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 9,
		likes: 3,
		avatar: `../assets/images/13.jpg`,
		name: `Donna Wright`,
		text: `The SHEIN gift card turned my closet into a treasure chest. Who knew affordable fashion could look this slick?`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 10,
		likes: 1,
		avatar: `../assets/images/14.jpg`,
		name: `Anthony Clark`,
		text: `I've managed to score some cool products I didn’t even expect. Much appreciation`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 11,
		likes: 1,
		avatar: `../assets/images/15.jpg`,
		name: `Alex Sandra`,
		text: `OMG!! They are so nicee`,
		image: `../assets/images/test3.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 13,
		likes: 6,
		avatar: `../assets/images/20.jpg`,
		name: `Paul Matthew`,
		text: `My girlfriend also did some shopping.. in fact, she used up the entire gift card:`,
		image: `../assets/images/test4.jpg`,
		age: `two weeks ago`,
		comments: []
	}
];

const obj_comment = `
<div class="comment sort-coms start-coms" data-order="{{ORDER}}" data-likes="{{LIKES}}">
	<span class="comment-user-img"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></span>
	<span class="comment-user-name"><span> {{USERNAME}} </span></span>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	{{COMMENT_IMG}}
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
	{{SUB_COMMENTS}}
</div>
`;

const obj_sub_comment = `
<div class="comment">
	<span class="comment-user-img"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></span>
	<span class="comment-user-name"><span> {{USERNAME}} </span></span>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
</div>
`;

const renderComments = () => {
	let html = ``;

	for (var comment of comments) {
		let sub_comments = ``;

		for (var scomment of comment.comments) {
			sub_comments += obj_sub_comment
				.replace (new RegExp ('{{PROFILE_URL}}', 'g'), scomment.profile)
				.replace (new RegExp ('{{AVATAR}}', 'g'), scomment.avatar)
				.replace (new RegExp ('{{USERNAME}}', 'g'), scomment.name)
				.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), scomment.text)
				.replace (new RegExp ('{{LIKES}}', 'g'), scomment.likes)
				.replace (new RegExp ('{{TIMEAGO}}', 'g'), scomment.age);
		};

		let img_html = comment.image
			? `<img class="fb-img" src="${comment.image}" width="210" alt="${comment.name}"/>`
			: ``;

		html += obj_comment
			.replace (new RegExp ('{{PROFILE_URL}}', 'g'), comment.profile)
			.replace (new RegExp ('{{AVATAR}}', 'g'), comment.avatar)
			.replace (new RegExp ('{{USERNAME}}', 'g'), comment.name)
			.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), comment.text)
			.replace (new RegExp ('{{COMMENT_IMG}}', 'g'), img_html)
			.replace (new RegExp ('{{LIKES}}', 'g'), comment.likes)
			.replace (new RegExp ('{{ORDER}}', 'g'), comment.order)
			.replace (new RegExp ('{{TIMEAGO}}', 'g'), comment.age)
			.replace (new RegExp ('{{SUB_COMMENTS}}', 'g'), sub_comments);
	};

	return html;
};

jQuery.fn.orderBy = function (keySelector, order) {
	return this.sort(function(a,b) {
		a = keySelector.apply(a);
		b = keySelector.apply(b);
		if(order == "newest") {
			if (a > b)
				return 1;
			if (a < b)
				return -1;
			return 0;
		} else if(order == "oldest" || order == "top") {
			if (a < b)
				return 1;
			if (a > b)
				return -1;
			return 0;
		}
	});
};

$(document).ready(function() {
	const html_comms = renderComments ();

	$(".main-comments").html (html_comms);

	setTimeout(function() {
		$(".sorting-box > p").html("130 comments");
		$(".start-coms").removeClass("start-coms");
	}, 250);

	$(document).on('click', 'textarea', function() {
		$(".add-comment").addClass("active");
	});

	$(".comment-button-left [type=checkbox]").on('change', function() {
		if($(this).is(":checked") && text_remaining > 0) {
			$(".comment-button-left p").show();
			$(".comment-button-right button").addClass("disabled").prop("disabled", true);
		} else {
			$(".comment-button-left p").hide();
			$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		}
	});

	$(document).on('click', '.sort > button', function() {
		var $this = $(this);
		$this.next().is(":visible") ? $this.next().hide() : $this.next().show();
	});

	$(document).on('click', '.dropdown-sort button', function() {
		var $this = $(this);
		var sort_by = $this.data("sort") == "top" ? "likes" : "order";
		$this.parent().hide();
		$this.parent().find(".selected").removeClass("selected");
		$this.addClass("selected");
		$(".sort > button span").html($this.find("span").html());
		$(".sort-coms").orderBy(function() {return +$(this).data(sort_by);}, $this.data("sort")).appendTo(".main-comments");
		$(".inner-sorting-box > svg").css({display: "inline-block"});
		setTimeout(function() { $(".inner-sorting-box > svg").hide(); }, 200);
		$(".sort-coms").hide();
		for(var i = 0;i<visible;i++) {
			$(".main-comments > :hidden:first").show();
		}
	});

	$(document).on('click', '.load-more', function() {
		var elem = $(".main-comments > :hidden").length < 5 ? $(".main-comments > :hidden").length : 5;
		for(var i = 0;i<elem;i++) {
			$(".main-comments > :hidden:first").show();
		}
		visible = visible + elem;
		if(visible == $(".sort-coms").length) {
			$(this).addClass("end-coms").prop("disabled", true).find("span").html("Loading...");
		}
	});

	$("textarea").keyup(function() {
		var text_length = $(this).val().length;
		text_length <= 0 ? $(".comment-button-right button").addClass("disabled").prop("disabled", true) : $(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		text_remaining = 6 - text_length;
		$(".comment-button-left p").html("Write "+text_remaining+" more characters to post to Facebook");
		if($(".comment-button-left [type=checkbox]").is(":checked")) {
			if(text_remaining <= 0) {
				$(".comment-button-left p").hide();
				$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
			} else {
				$(".comment-button-left p").show();
				$(".comment-button-right button").addClass("disabled").prop("disabled", true);
			}
		}
	});

	$(".comment-button-right button").on('click', function() {
		alert("Comments are disabled by the author.")
	});

	$(".comment-meta button").on('click', function() {
		alert("Action prohibited. You are not authenticated.");
	});
});