// JavaScript Document
$(function() {
	window.addEventListener("wheel", function(event) {
			event.preventDefault();
	}, { passive: false });

	var $pages = $(".page");
	var $html = $("html");
	var pageNum = 1;
	var scrolling = false;
	var lastPage = $pages.length;	

	pageNum = Math.round($(window).scrollTop() / $(window).height()) + 1;

	if (pageNum > 2 && pageNum < 5) {
		$("body").css({ backgroundColor: "white" });
		$('.mobile_btn span').css('background-color','#000');
	}

	// 스크롤 시, 계산된 pageNum에 맞춰서 섹션 이동
	$html.animate({"scrollTop":(pageNum-1) * $(window).height() }, 100);
	
	// to-top버튼 클릭 시 부드럽게 스크롤 이동
	$(".to-top").on("click", function (e) {
		e.preventDefault();
		const href = $(this).attr("href");
		pageNum = 1;
		$("html, body").animate({ scrollTop: $(href).offset().top }, 800);
		$('.mobile_btn span, .fixedIcon li, .line').css('background-color','#fff');
		$('.circle').css('border-color','#fff');
		$('.fixedIcon em, .link-txt').css('color','#fff');
		$('.go-to-link .circle').css('background-color','#fff');
		$('.fixedIcon > ul > li:first-child').addClass('fixedOn');
		$('.fixedIcon > ul > li:not(:first-child)').removeClass('fixedOn');
	});
	
	// 마우스 휠(스크롤)에 따라 pageNum + 또는 -
	$(window).on("wheel", function(event) {
		if(scrolling) return;

		if (event.originalEvent.deltaY > 0) {
			if(pageNum == lastPage) return;
			pageNum++;
		} else {
			if (pageNum == 1) return;
			pageNum--;
		}

		scrollPage();
	});

	var $bullet = $(".fixedIcon > ul");
	var $item = $(".fixedIcon > ul > li");

	$item.find("a").on("click", function(e) {
		e.preventDefault();

		pageNum_aPos = $(this).attr("href");
		var pageNum_aPos_ln = pageNum_aPos.length;
		pageNum = parseInt(pageNum_aPos.substr(5, 1)); //전체 글자 수에서 맨 뒤 한글자만 추출
		
		if(pageNum_aPos_ln >= 7) {
			pageNum = parseInt(pageNum_aPos.substr(5, 2)); //10페이지 이상부터
		}

		scrollPage();
	});


	// first bullet default
	$bullet.children(":first").addClass("fixedOn");

	// page1: hide to-top button
	var page2 = document.getElementById("page2");
	var page2Top = page2.offsetTop;

	$( window ).scroll( function() {
		if ( $( this ).scrollTop() >= page2Top ) {
			$( '.to-top' ).addClass('on');
		} else {
			$( '.to-top' ).removeClass('on');
		}
	});

	function scrollPage() {
	
		// page backgound color change
		if (pageNum > 2 && pageNum < 6) {
			$("body").animate({ backgroundColor: "white" }, 800);
			$('.mobile_btn span, .fixedIcon li, .line').css('background-color','#000');
			$('.circle').css('border-color','#000');
			$('.fixedIcon em, .link-txt').css('color','#000');
			$('.go-to-link .circle').css('background-color','#000');
			$('.to-top').css('border-color','#000');
			$('.to-top img').css('filter','brightness(0)');
		} else {
			$("body").animate({ backgroundColor: "black" }, 500);
			$('.mobile_btn span, .fixedIcon li, .line').css('background-color','#fff');
			$('.circle').css('border-color','#fff');
			$('.fixedIcon em, .link-txt').css('color','#fff');
			$('.go-to-link .circle').css('background-color','#fff');
			$('.to-top').css('border-color','#fff');
			$('.to-top img').css('filter','brightness(3)');
		}

		scrolling = true;

		$bullet.children().removeAttr("class").eq(pageNum - 1).addClass("fixedOn");
	
		var position = $(`#page${pageNum}`).offset();
	
		$html.animate({"scrollTop": position.top}, function() {
			scrolling = false;
		})

	}



	//culture : 클릭 시 카드 앞/뒷면 전환
	var chk = 0;

	$(".carousel-track > li").on("click", function(event) {
		event.preventDefault();
		if (chk == 0) {
			$(this).find(".page4_con_txt_next").css({'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'});
			chk = 1;
		} else if (chk == 1) {
			$(this).find(".page4_con_txt_next").css('display', "none");
			chk = 0;
		}
	});
	
	//culture : prev, next 버튼 클릭 시 카드 슬라이드
	const track = document.querySelector('.carousel-track');
	const slides = Array.from(track.children);
	const nextButton = document.querySelector('.carousel-btn-right');
	const prevButton = document.querySelector('.carousel-btn-left');
	const dotsNav = document.querySelector('.carousel-nav');
	const dots = Array.from(dotsNav.children);

	const slideWidth = slides[0].getBoundingClientRect().width;

	// arrange the slides next to one another
	const setSlidePosition = (slide, index) => {
		slide.style.left = slideWidth * index + 'px';
	};
	slides.forEach(setSlidePosition);

	const moveToSlide = (track, currentSlide, targetSlide) => {
		track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current-slide');
		targetSlide.classList.add('current-slide');
	}

	const updateDots = (currentDot, targetDot) => {
		currentDot.classList.remove('current-slide');
		targetDot.classList.add('current-slide');
	}

	const arrowsOpacity = (slides, prevButton, nextButton, targetIndex) => {
		if (targetIndex === 0) {
			prevButton.classList.add('is-last');
			nextButton.classList.remove('is-last');
		} else if (targetIndex === slides.length - 1) {
			prevButton.classList.remove('is-last');
			nextButton.classList.add('is-last');
		} else {
			prevButton.classList.remove('is-last');
			nextButton.classList.remove('is-last');
		};
	}

	// click prev
	prevButton.addEventListener('click', e => {
		const currentSlide = track.querySelector('.current-slide');
		const prevSlide = currentSlide.previousElementSibling;
		const currentDot = dotsNav.querySelector('.current-slide');
		const prevDot = currentDot.previousElementSibling;
		const prevIndex = slides.findIndex(slide => slide === prevSlide);

		moveToSlide(track, currentSlide, prevSlide);
		updateDots(currentDot, prevDot);
		arrowsOpacity(slides, prevButton, nextButton, prevIndex);
	});

	// click next
	nextButton.addEventListener('click', e => {
		const currentSlide = track.querySelector('.current-slide');
		const nextSlide = currentSlide.nextElementSibling;
		const currentDot = dotsNav.querySelector('.current-slide');
		const nextDot = currentDot.nextElementSibling;
		const nextIndex = slides.findIndex(slide => slide === nextSlide);
		
		moveToSlide(track, currentSlide, nextSlide);
		updateDots(currentDot, nextDot);
		arrowsOpacity(slides, prevButton, nextButton, nextIndex);
	})

	// click dots
	dotsNav.addEventListener('click', e => {
		const targetDot = e.target.closest('button');

		if (!targetDot) return;

		const currentSlide = track.querySelector('.current-slide');
		const currentDot = dotsNav.querySelector('.current-slide');
		const targetIndex = dots.findIndex(dot => dot === targetDot);
		const targetSlide = slides[targetIndex];

		moveToSlide(track, currentSlide, targetSlide);
		updateDots(currentDot, targetDot);
		arrowsOpacity(slides, prevButton, nextButton, targetIndex);
	})
	
	

	var page = 1; //page
	var scrolling = false;

	page = Math.round($(window).scrollTop() / $(window).height()) + 1;

	
	
	// 갤러리 : Swiper 슬라이더
	var $gallery_show = $('#page5 .gallery-top .swiper-wrapper .swiper-slide a');
	var $gallery_item = $('#page5 .gallery-thumbs .swiper-wrapper .swiper-slide a');
	
	$gallery_item.click(function(event){
		event.preventDefault();
	});
	$gallery_show.click(function(event){
		event.preventDefault();
	});

	// 갤러리 영역 썸네일
	var galleryThumbs = new Swiper('#page5 .gallery-thumbs', {
			spaceBetween: 10,
			slidesPerView: 5,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			breakpoints: {
				360: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 60,
				},
				1024: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				1280: {
					slidesPerView: 5,
					spaceBetween: 20,
				}
			}
		});

	var galleryTop = new Swiper('#page5 .gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '#page5 .swiper-button-next',
			prevEl: '#page5 .swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs
		},
		pagination: {
			el: '#page5 .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			360: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 100,
			},
			1280: {
				slidesPerView: 1,
				spaceBetween: 50,
			}
		}
	});

	var $gallery_show = $('#page7 .gallery-top .swiper-wrapper .swiper-slide a');
	var $gallery_item = $('#page7 .gallery-thumbs .swiper-wrapper .swiper-slide a');
	
	$gallery_item.click(function(event){
		event.preventDefault();
	});
	$gallery_show.click(function(event){
		event.preventDefault();
	});

	var galleryGrid = new Swiper('#page7 .grid-gallery', {
		spaceBetween: 10,
		navigation: {
			nextEl: '#page7 .swiper-button-next',
			prevEl: '#page7 .swiper-button-prev',
		}
	});

	;( function( $ ) {
		$( '.swipebox' ).swipebox();			
	} )( jQuery );



	// tab으로 focus 후 enter하면 작동
	window.onload = function(){
		document.querySelector('.home_btn').addEventListener('keyup', (e)=>{
			if (e.keyCode === 13) {
				// code for enter
				location.href="../../index.html";
			}
		});
	}

		
		

	/* ############## responsive ############## */
	// mobile menu
	$('.mobile_btn').click(function(){
		$(this).toggleClass('active');
		$('.fixedIcon, #home_btn').toggleClass('active');
	})

	// menu click -> menu hide
  	$('.fixedIcon > ul > li a').click(function(){
    	  $('.fixedIcon, .mobile_btn').removeClass('active');
	})

	// 스크롤 시 배경, 모바일 버튼 색상 전환 애니메이션
	var windowWidth = $(window).width();
	
	if(windowWidth < 1601) {
		function bgChanger() {
			var nowHeight = Math.round(document.body.scrollHeight / 8);
			var pageNumMobile = Math.round(scrollY / nowHeight) + 1;
			if (pageNumMobile > 2 && pageNumMobile < 5) {
				$("body").css('background-color','#fff');
				$('.mobile_btn span').css('background-color','#000');
				$('#home_btn').css('filter','brightness(0.3)');
			} else {
				$("body").css('background-color','#000');
				$('.mobile_btn span').css('background-color','#fff');
				$('#home_btn').css('filter','none');
			}
		}
		window.addEventListener('scroll', bgChanger);
	}

	// 오시는 길 : 반응형 이미지 맵
	$('img[usemap]').rwdImageMaps();


	/* mobile, tablet: to-top bottom 위치 조정 */ 
	if(windowWidth <= 1024) {
		var jidoTop = $('.jido').offset().top;

		$( window ).scroll( function() {
			if ( $( this ).scrollTop() >= jidoTop ) {
				$( '.to-top' ).css('bottom','12%');
			} else {
				$( '.to-top' ).css('bottom','4%');
			}
		});
	}
	
});
