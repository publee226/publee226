// JavaScript Document
$(function () {
  //怨좎젙��쓣 �대┃�섎㈃ �대떦 ��ぉ�� �섏씠吏�濡� �ㅽ겕濡ㅻ릺硫댁꽌 �대룞��
  window.addEventListener("wheel", function (event) {
    event.preventDefault();
  }, { passive: false });//addEventListener

  //�먯깋
  var $pages = $(".page");
  var $html = $("html");
  //�꾩옱 酉고룷�몄뿉 �쒖떆�섎뒗 �섏씠吏� 踰덊샇
  var pageNum = 1;   //page
  var scrolling = false;
  //留덉�留� �섏씠吏� 踰덊샇 => 4
  var lastPage = $pages.length;


  //�꾩옱 �섏씠吏� 踰덊샇 怨꾩궛  => 1
  pageNum = Math.round($(window).scrollTop() / $(window).height()) + 1;

  //怨꾩궛�� �섏씠吏��� 留욎떠 �ㅽ겕濡ㅽ븿
  $html.animate({ "scrollTop": (pageNum - 1) * $(window).height() }, 100);

  /* smooth scroll to top */
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

  //留덉슦�� �� 踰꾪듉 援대━硫�
  $(window).on("wheel", function (event) {
    if (scrolling) return;

    if (event.originalEvent.deltaY > 0) {
      if (pageNum == lastPage) return;

      pageNum++;//�ㅼ쓬 �섏씠吏�濡� �대룞
      
    } else {
      if (pageNum == 1) return;

      pageNum--; //�댁쟾 �섏씠吏�濡� �대룞
      
    }

    //scrollPage �⑥닔瑜� �댁슜�� 怨꾩궛�대넃�� page濡� �대룞
    scrollPage();

  });/* wheel �대깽�� */


  var $bullet = $(".fixedIcon > ul");
  var $item = $(".fixedIcon > ul > li");

  $item.find("a").on("click", function (e) {
    e.preventDefault(); //湲곕낯�대깽�� �쒓굅

    pageNum_aPos = $(this).attr("href");
    var pageNum_aPos_ln = pageNum_aPos.length;
    pageNum = parseInt(pageNum_aPos.substr(5, 1)); //�レ옄濡� 蹂���

    //留뚯빟 pagenum�� 紐뉕��� �댁긽�대㈃ if臾� �ㅽ뻾�� ��.
    if (pageNum_aPos_ln >= 7) {
      // alert("7湲��먯씠��"); 
      pageNum = parseInt(pageNum_aPos.substr(5, 2)); //10
    }

    //scrollPage �⑥닔瑜� �댁슜�� 怨꾩궛�대넃�� page濡� �대룞
    scrollPage();

  });/* a�대┃ �대깽�� */


  
  /* first bullet default */
  $bullet.children(":first").addClass("fixedOn");

  /* page1: hide to-top button */ 
  var page2 = document.getElementById("page2");
  var page2Top = page2.offsetTop;

  $( window ).scroll( function() {
    if ( $( this ).scrollTop() >= page2Top ) {
      $( '.to-top' ).addClass('on');
    } else {
      $( '.to-top' ).removeClass('on');
    }
  });

  /* scrollPage 함수 */
  function scrollPage() {

    //?�크�? ?�작?�시
    scrolling = true;

    //?�이�?�? ?�크�? ?? ?? ?�이�?�? ?��??�는 블릿?? 강조
    $bullet.children().removeAttr("class").eq(pageNum - 1).addClass("fixedOn");
  
    var position = $(`#page${pageNum}`).offset();
  
    //html?�소?? aniamte메서?��? ?�용?? 계산?? ?�치�? ?�크�?
    $html.animate({"scrollTop": position.top}, function() {
        //animate 메서?�로 ?�성?? ?�과�? ?�나�?, �? ?�크롤이 ?�나�? ?�크롤이 ?�났?�을 ?�시.
        scrolling = false;
    })

    $('.mobile_btn span, .fixedIcon li, .line').css('background-color','#555');
    $('.circle').css('border-color','#555');
    $('.fixedIcon em, .link-txt').css('color','#555');
    $('.go-to-link .circle').css('background-color','#555');
  }



  //�대떦 �ъ쭊 src 泥댄겕�섍린
  var chk = 0;

  $(".page4 .page4_img_wrap > li").on("click", function (event) {
    //湲곕낯 �대깽�� �쒓굅�섍린
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



  //scrollTop踰꾪듉�� �대┃�섎㈃ 泥ロ럹�댁�濡� �щ씪媛��꾨줉 留뚮뱺��.
  //�꾩옱 �붾㈃�� 蹂댁씠�� �섏씠吏��� 踰덊샇瑜� �섑��대뒗 蹂���
  var page = 1; //page
  var scrolling = false;

  page = Math.round($(window).scrollTop() / $(window).height()) + 1;

  var $scroll_top = $("#scroll_top");

  $scroll_top.click(function () {
    $("html").animate({ "scrollTop": 0 }, 300, function () {
      page = 1; //留⑥쐞濡� �щ씪媛�硫� page = 1 �� 泥섏쓬 媛믪쑝濡� 珥덇린�� �쒕떎.
    });
    return false;
  });

  //�곕벉吏� 臾명솕�됱궗 img �대┃�� �대�吏� 蹂�寃�



  /* culture : 클릭 시 카드 앞/뒷면 전환 */
  var chk = 0;

  $(".carousel-track > li").on("click", function (event) {
    //湲곕낯 �대깽�� �쒓굅�섍린
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



  // grid-gallery swiper + swipebox
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
  


  // tab으로 focus 후 enter하면 작동
  window.onload = function(){
    document.querySelector('.home_btn').addEventListener('keyup', (e)=>{
      if (e.keyCode === 13) {
        // code for enter
        location.href="../../index.html";
      }
    });
  }





  /* mobile menu */
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