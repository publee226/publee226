$(function(){
  /* 스크롤 시 헤더 불투명도 조절 */
  document.addEventListener('scroll', function(){
    var scTop = document.querySelector('html').scrollTop;

    if(scTop >= 100) {
      $('header').addClass('on');
    } else if (scTop < 100) {
      $('header').removeClass('on');
    }
  })
  

  /* 매뉴얼 팝업 */
  $('.manual').click(function(){
    $('#manual, .layer').show();
  })

  /* 매뉴얼 팝업 - 닫기 버튼 */
  $('.mn-close').click(function(){
    $('#manual, .layer').hide();
  })

  /* 매뉴얼 팝업 - 커스텀 스크롤 */
  $('#manual').mCustomScrollbar();
  $('#manual nav a').click(function(e){
    e.preventDefault();

    var mnTop = $($(this).attr('href')).position().top;
    $('#manual').mCustomScrollbar("scrollTo", mnTop);
  })

  /* 매뉴얼 팝업 - 목차 토글 버튼 */
  $('.nav-btn').click(function(){
    $(this).toggleClass('on');
    $('#manual nav').toggleClass('on');
    $('#manual .header h2').toggleClass('hide');
  })

  if($('#manual nav').hasClass('on') === true){
    $('.nav-btn').animate({'transform': 'translateX(-50px)'}, 300);
  }

  /* 매뉴얼 팝업 - 리스트 */
  $('#manual nav li').click(function(){
    $(this).addClass('on').siblings().removeClass('on');
  })

  /* 매뉴얼 팝업 - 오토 슬라이드 */
  var popupSlider = new Swiper('.popup_swiper', {
    effect: 'fade',
    fadeEffect: {crossFade: true},
    autoplay: {delay: 1000,},
    speed: 500,
    // 팝업창에서도 작동하게
    observer: true,
    observeParents: true,
  })


  /* 클릭 시 해당 섹션으로 스크롤 */
  $('.gnb li a, .visual .start_btn').click(function(e){
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1500, 'easeInOutExpo');
  })


  /* to-top 버튼 */
  $('.to-top, header .logo, .f_logo').click(function(){
    $('html, body').animate({
      scrollTop: $('#home').offset().top
    }, 1500, 'easeInOutExpo');
  })


  /* 텍스트 애니메이션 */
  // Splitting.js
  Splitting();

  $('.animate').scrolla({
    mobile: true,
    once: false //스크롤 애니메이션 한 번만 진행
  });


  /* 비주얼 애니메이션 */
  gsap.to('.visual_bg', {
    marginLeft:0, width:'100%', delay: 1,
  })


  /* 제품 경쟁력 - 박스 슬라이드 */
  var featuresSwiper = new Swiper('.features_swiper', {
    slidesPerView: 4.06,
    spaceBetween: 24,
    centeredSlides: true,
    navigation: {
      nextEl: '.features .next-btn',
      prevEl: '.features .prev-btn',
    },
    breakpoints: {
      1024: {
        slidesPerView: 3.5,
      },
      768: {
        slidesPerView: 2.5,
      },
      650: {
        slidesPerView: 1.18,
      },
      380: {
        slidesPerView: 1.25,
      }
    }
  })

  
  /* 제품 기능 - 슬라이더 (모바일 전용) */
  var windowWidth = $(window).width();
  var functionSwiper = undefined;

  function mobileSwiper(){
    if (windowWidth <= 768 && functionSwiper == undefined) {
      // 제품 기능 1
      functionSwiper = new Swiper('.led_func_swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: true,
        navigation: {
          nextEl: '.led_function.func1 .next-btn',
          prevEl: '.led_function.func1 .prev-btn',
        },
      }),
      // 제품 기능 2
      functionSwiper2 = new Swiper('.led_func_swiper.swiper2', {
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: true,
        navigation: {
          nextEl: '.led_function.func2 .next-btn',
          prevEl: '.led_function.func2 .prev-btn',
        },
      })
    } else if (windowWidth >= 769 && functionSwiper != undefined) {
      functionSwiper.destroy();
    }
  }

  mobileSwiper();

  /* 제품 기능 - 토글 버튼 */
  $('.led_function.func1 .dark-btn').click(function(){
    $('.led_function.func1 .box2').addClass('dark');
  })
  $('.led_function.func1 .light-btn').click(function(){
    $('.led_function.func1 .box2').removeClass('dark');
  })

  
  /* 서포트 - 슬라이더 (태블릿(1024px)부터 적용) */
  var interfaceSwiper = undefined;

  function tabletSwiper(){
    if (windowWidth <= 1280  && interfaceSwiper == undefined) {
      // 인터페이스
      interfaceSwiper = new Swiper('.interface_swiper', {
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: {
          nextEl: '.interfaces .next-btn',
          prevEl: '.interfaces .prev-btn',
        },
        breakpoints: {
          1280: {
            slidesPerView: 4.5,
          },
          650: {
            slidesPerView: 3.5,
          },
          520: {
            slidesPerView: 2.5,
          }
        }
      })
    } else if (windowWidth >= 1025 && interfaceSwiper != undefined) {
      interfaceSwiper.destroy();
    }
  }

  tabletSwiper();

})