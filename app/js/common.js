$(".header-hint").on("click", function () {
	$('html, body').animate({
		scrollTop: $("#adventages").offset().top
	}, 1000);
})
$(".fancybox-link").fancybox({
	wrapCSS: "box"
})
$(document).ready( function () {
	// var menuHeight = $(".header--page").height();
	// var footerHeight = $(".footer").height();
	// var contentHeight = $(window).height() - (menuHeight + footerHeight)
	// $(".page-content").height(contentHeight);
	var call = $( ".header__mob-call" ).clone();
	var calldesc = $( ".header__desc-call" ).clone();
	$(window).resize( function () {
		if ($(window).width()<991) {
			$( ".header__top__burger" ).show();
			$( ".header__top__mobile-wrap" ).hide();
			$( ".header__mob-call" ).replaceWith( $(".header-top__call") );
			
		}
		else{
			if ($(window).width()>991) {
				$( ".header__top__burger" ).hide();
				$( ".header__top__mobile-wrap" ).show();
				$( ".header__desc-call" ).replaceWith( $(".header-top__call") );
			}
		}
	})
	if ($(window).width()<991) {
			$(".connect-wrap").prepend($(".connect-wrap__info .title-block"));
			$(".replenishment-wrap").prepend($(".replenishment-wrap__form .title-block"));
			$(".new-rates-wrap__info-list").before($(".new-rates-wrap__left"));
			$( ".header__top-burger" ).show();
			$( ".header__top-mobile-wrap" ).hide();
			$( ".header__mob-call" ).replaceWith( $(".header-top__call") );
			
		}
		else{
			if ($(window).width()>991) {
				$( ".header__top-burger" ).hide();
				$( ".header__top-mobile-wrap" ).show();
				$( ".header__desc-call" ).replaceWith( $(".header-top__call") );
			}
		}
	
	function tabInit(){ 
		$('.tabs__content').not('.tabs__content_active').hide(); 
		$('.tabs-list__item button').click(function(){ 
			$('.tabs-list__item').not($(this).parent()).removeClass('tabs-list__item_active'); 
			$(this).parent().addClass('tabs-list__item_active'); 
			$('.tabs__content').not('#'+$(this).attr('data-content')).removeClass('tabs__content_active').hide(); 
			$('#'+$(this).attr('data-content')).addClass('tabs__content_active').fadeIn(); 
		}); 
	};  
	tabInit();
	$(".adventages-slider").slick({ 
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: false,
		slidesToShow: 1,
		slidesToScroll: 1
	})
	$(".shop-slider").slick({
		arrows: true,
		dots: false,
		autoplay: false,
		autoplaySpeed: 3000,
		pauseOnHover: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
		responsive: [
		{
			breakpoint: 100,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint:768,
			settings: {
				slidesToShow: 1
			}
		},

		]

	})
	$(window).mousemove(function(e) {
		var coordX = e.pageX,
		coordY = e.pageY,
		top = $('.adventages-decorate--1').offset().top,
		left = $('.adventages-decorate--1').offset().left;

		var parallaxTop = - (coordY * 0.01),
		parallaxRight = - (coordX * 0.01);

		$('.adventages-decorate--1').css({
			'transform': 'translate('+parallaxRight+'px'+', '+parallaxTop+'px'+')',
		})
	})
	$(window).mousemove(function(e) {
		var coordX = e.pageX,
		coordY = e.pageY,
		top = $('.adventages-decorate--2').offset().top,
		left = $('.adventages-decorate--2').offset().left;

		var parallaxTop = - (coordY * 0.05),
		parallaxRight = - (coordX * -0.05);

		$('.adventages-decorate--2').css({
			'transform': 'translate('+parallaxRight+'px'+', '+parallaxTop+'px'+')',
		})
	})
	$(window).mousemove(function(e) {
		var coordX = e.pageX,
		coordY = e.pageY,
		top = $('.rates-decoration').offset().top,
		left = $('.rates-decoration').offset().left;

		var parallaxTop = - (coordY * -0.05),
		parallaxRight = - (coordX * 0.01);

		$('.rates-decoration').css({
			'transform': 'translate('+parallaxRight+'px'+', '+parallaxTop+'px'+')',
		})
	})
	$(".questions-wrap__item-title").on("click", function () {
		$(this).parent('.questions-wrap__item').siblings().removeClass("active");
		$(this).parent('.questions-wrap__item').siblings().children('.questions-wrap__item-body').slideUp();
		$(this).siblings('.questions-wrap__item-body').slideToggle();
		$(this).parent('.questions-wrap__item').toggleClass("active");
	})
	$(".replenishment-wrap__form-phone, .modal-form__input modal-form__input--phone").mask("+7 999 99 99 99");
	$(".header-top__menu, .footer-top__menu").on("click","a", function (event) {
		event.preventDefault(); 
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
	$(".header-top__burger button").on("click", function () {
		$(".header-top").toggleClass("overlay");
		$(".header-top__mobile-wrap").toggle( "slide", {direction: 'right'}, 1000 );
	})
	$(".speedometr").viewportChecker({
		callbackFunction: function(){
			$(".speedometr__arrow").css({'transform': 'rotate(-60deg)', });
			$(".speedometr__speed-number span").animateNumber({
				number: 90
			}, 2000);
			$(".speedometr__chart").easyPieChart({
				size:145,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				rotate: '228',
				trackColor: 'transparent',
				easing: 'jswing',
				lineWidth: 15,
				barColor: function(percent) {
					var ctx = this.renderer.getCtx();
					var canvas = this.renderer.getCanvas();
					var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
					gradient.addColorStop(0, "#f3aa06");
					gradient.addColorStop(1, "#face28");
					return gradient;
				}
			});
		}
	});
})

