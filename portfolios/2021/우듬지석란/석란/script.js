// JavaScript Document
$(function () {
  window.addEventListener("wheel", function (event) {
    event.preventDefault();
  }, { passive: false });//addEventListener

  //�먯깋
  var $pages = $(".page");
  var $html = $("html");
  var pageNum = 1;   //page
  var scrolling = false;
  var lastPage = $pages.length;


  pageNum = Math.round($(window).scrollTop() / $(window).height()) + 1;

  $html.animate({ "scrollTop": (pageNum - 1) * $(window).height() }, 100);

	
  // to-top 버튼 클릭 시,부드럽게 스크롤 이동
  $(".to-top").on("click", function (e) {
    e.preventDefault();
    const href = $(this).attr("href");
	pageNum = 1;
    $("html, body").animate({ scrollTop: $(href).offset().top }, 800);
    $('.mobile_btn span, .fixedIcon li, .line').css('background-color','#333');
    $('.circle').css('border-color','#333');
    $('.fixedIcon em, .link-txt').css('color','#333');
    $('.go-to-link .circle').css('background-color','#333');
    $('.fixedIcon > ul > li:first-child').addClass('fixedOn');
    $('.fixedIcon > ul > li:not(:first-child)').removeClass('fixedOn');
  });

	
  $(window).on("wheel", function (event) {
    if (scrolling) return;

    if (event.originalEvent.deltaY > 0) {
      if (pageNum == lastPage) return;
      pageNum++;
    } else {
      if (pageNum == 1) return;
      pageNum--;
    }

    scrollPage();

  });


  var $bullet = $(".fixedIcon > ul");
  var $item = $(".fixedIcon > ul > li");

  $item.find("a").on("click", function (e) {
    e.preventDefault();

    pageNum_aPos = $(this).attr("href");
    var pageNum_aPos_ln = pageNum_aPos.length;
    pageNum = parseInt(pageNum_aPos.substr(5, 1));

    if (pageNum_aPos_ln >= 7) {
      pageNum = parseInt(pageNum_aPos.substr(5, 2)); //10
    }

    scrollPage();

  });


  
  $bullet.children(":first").addClass("fixedOn");

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

    scrolling = true;

    $bullet.children().removeAttr("class").eq(pageNum - 1).addClass("fixedOn");
  
    var position = $(`#page${pageNum}`).offset();
  
    $html.animate({"scrollTop": position.top}, function() {
        scrolling = false;
    })

    $('.mobile_btn span, .fixedIcon li, .line').css('background-color','#555');
    $('.circle').css('border-color','#555');
    $('.fixedIcon em, .link-txt').css('color','#555');
    $('.go-to-link .circle').css('background-color','#555');
  }



  var chk = 0;

  $(".page4 .page4_img_wrap > li").on("click", function (event) {
    event.preventDefault();
	  
    if (chk == 0) {
      $(this).find(".page4_con_txt_next").css('display', "block");
      chk = 1;
    } else if (chk == 1) {
      $(this).find(".page4_con_txt_next").css('display', "none");
      chk = 0;
    }
  });


  var swiper = new Swiper('.page3 .swiper-container', {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      el: '.page3 .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.page3 .swiper-button-next',
      prevEl: '.page3 .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
      1400: {
        slidesPerView: 1,
        spaceBetween: 50,
      }
    }
  });



  var page = 1; //page
  var scrolling = false;

  page = Math.round($(window).scrollTop() / $(window).height()) + 1;

  var $scroll_top = $("#scroll_top");

  $scroll_top.click(function () {
    $("html").animate({ "scrollTop": 0 }, 300, function () {
      page = 1;
    });
    return false;
  });



  // culture : 클릭 시 카드 앞/뒷면 전환
  var chk = 0;

  $(".carousel-track > li").on("click", function (event) {
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



  // 갤러리 : Swiper 슬라이더
  var galleryGrid = new Swiper('.gallery .grid-gallery', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery .swiper-button-next',
      prevEl: '.gallery .swiper-button-prev',
    }
  });

  ;( function( $ ) {
    $( '.swipebox' ).swipebox();			
  } )( jQuery );
  

  window.onload = function(){
    document.querySelector('.home_btn').addEventListener('keyup', (e)=>{
      if (e.keyCode === 13) {
        // code for enter
        location.href="../../index.html";
      }
    });
  }




	
  // 모바일 메뉴
  $('.mobile_btn').click(function(){
    $(this).toggleClass('active');
    $('.fixedIcon, #home_btn').toggleClass('active');
  })

  // menu click -> menu hide
  $('.fixedIcon > ul > li a').click(function(){
    $('.fixedIcon, .mobile_btn').removeClass('active');
  })

  // mobile scrolling -> background color transition
  var windowWidth = $(window).width();
		
  if(windowWidth < 1601) {

    // 배경색 전환 애니메이션
    function bgChanger() {
      var nowHeight = Math.round(document.body.scrollHeight / 7);
      var pageNumMobile = Math.round(scrollY / nowHeight) + 1;
      if (pageNumMobile == 1) {
        $('.mobile_btn span').css('background-color','#ddd');
        $('#home_btn').css('filter','brightness(1)');
      } else {
        $('.mobile_btn span').css('background-color','#555');
        $('#home_btn').css('filter','brightness(0.3)');
      }
    }

    window.addEventListener('scroll', bgChanger);

  }


  // 오시는 길 : 반응형 이미지 맵
  $('img[usemap]').rwdImageMaps();


  // mobile, tablet: to-top bottom 위치 조정
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
