$(document).ready(function() {
	$('.main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		speed: 300,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000, 
		focusOnSelect: true
	});
	$(".btn").fancybox({   

	})
	$(".questions__title").on("click", function () {
		$(this).parent('.questions__item').siblings().removeClass("active");
		$(this).parent('.questions__item').siblings().children('.questions__ans').slideUp();
		$(this).siblings('.questions__ans').slideToggle();
		$(this).parent('.questions__item').toggleClass("active");
	})
	$(".number-wrap").viewportChecker({
		callbackFunction: function(){
			$("#number1").animateNumber({
				number: 3300
			}, 2800);
			$("#number2").animateNumber({
				number: 510
			}, 1800);
			$("#number3").animateNumber({
				number: 40
			}, 1000);
		}
	})
	
	$(".header__burger button").on("click", function () {
		$(".side-bar").slideToggle();
	})

	$('.up-btn button').click(function() {

		$('body,html').animate({scrollTop:0},800);

	});
})

