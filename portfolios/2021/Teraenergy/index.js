$(function(){
     /* ############## 팝업 오늘 하루 보지 않기 ############## */
     // 쿠키 가져오기
     var getCookie = function (cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
               var c = ca[i];
               while (c.charAt(0)==' ') c = c.substring(1);
               if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
          }
          return "";
     }

      // 24시간 기준 쿠키 설정
     var setCookie = function (cname, cvalue, exdays) {
          var todayDate = new Date();
          todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
          var expires = "expires=" + todayDate.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
     }

     var popupClose = function(){
          if($("input[type='checkbox']").is(":checked") == true){
               setCookie("close","Y",1);
              //기간( ex. 1은 하루, 7은 일주일)
          }
          $(".overlay").hide();
     }

     $(document).ready(function(){
          var cookiedata = document.cookie;
          if(cookiedata.indexOf("close=Y")<0){
               $(".overlay").show();
          }else{
               $(".overlay").hide();
          }
          $(".close").click(function(){
               popupClose();
               $('.overlay').hide();
          });
     });



     /* ############## scroll pagination ############## */
     window.addEventListener('scroll', function(){
          let scrollTop = $(window).scrollTop();
          let mainTop = $('#main').offset().top;
          
          // scroll 시 header 축소
          if (scrollTop > 10) {
               $('.header').addClass('on');
          } else {
               $('.header').removeClass('on');
          }

          // main section: to-top btn hide
          if (scrollTop > mainTop) {
               $('.to-top').stop().fadeIn();
          } else {
               $('.to-top').stop().fadeOut();
          }
     })



     // menu/btn click -> scroll
     $('.gnb li a, .arrow-down, .to-top, .nav li a').click(function (e) {
          e.preventDefault();
          
          $('html, body').animate({
               scrollTop: $($.attr(this, 'href')).offset().top
          }, 1000, 'easeInOutQuad');
     });



     // scroll -> nav style
     let lastScroll = 0;

     // page00
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll < 770){
               $("nav .nav_main").addClass("on");
          }
          else {
               $("nav .nav_main").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page01
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 770){
               $("nav .nav_page01").addClass("on");
               $("nav .nav_main").removeClass("on");
		  }
          else {
              $("nav .nav_page01").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page02
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 1540){
               $("nav .nav_page02").addClass("on");
               $("nav .nav_page01").removeClass("on");
		  }
          else {
			  $("nav .nav_page02").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page03
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 2740){
               $("nav .nav_page03").addClass("on");
               $("nav .nav_page02").removeClass("on");
		  }
          else {
			  $("nav .nav_page03").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page04
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 3950){
               $("nav .nav_page04").addClass("on");
               $("nav .nav_page03").removeClass("on");
		  }
          else {
			  $("nav .nav_page04").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page05
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 5160){
               $("nav .nav_page05").addClass("on");
               $("nav .nav_page04").removeClass("on");
		  }
          else {
			  $("nav .nav_page05").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page06
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 6246){
               $("nav .nav_page06").addClass("on");
               $("nav .nav_page05").removeClass("on");
		  }
          else {
			  $("nav .nav_page06").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page07
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 7320){
               $("nav .nav_page07").addClass("on");
               $("nav .nav_page06").removeClass("on");
		  }
          else {
			  $("nav .nav_page07").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page08
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 8400){
               $("nav .nav_page08").addClass("on");
               $("nav .nav_page07").removeClass("on");
		  }
          else {
			  $("nav .nav_page08").removeClass("on");
          }
          lastScroll = scroll;
     });

     // page09
     $(window).scroll(function(event){
          let scroll = $(this).scrollTop();
          if (scroll > 9480){
               $("nav .nav_page09").addClass("on");
               $("nav .nav_page08").removeClass("on");
		  }
          else {
			  $("nav .nav_page09").removeClass("on");
          }
          lastScroll = scroll;
     });





     /* ############## mobile ############## */

     // mobile header event
     let windowWidth = $(window).width();

     if(windowWidth < 1025) {

          // pc header scroll event 해제
          window.addEventListener('scroll', function(){
               let scrollTop = $(window).scrollTop();
               if (scrollTop > 0) {
                    $('.m-header').addClass('on');
               } else {
                    $('.m-header').removeClass('on');
               }
          })

          // mobile header click event
          $('.mobile-btn').click(function(){
               $('.header').toggleClass('m-on');
               $(this).toggleClass('on');
               $('.m-overlay').toggleClass('on');
          })
          $('.m-overlay, .gnb li a').click(function(){
               $('.header').removeClass('m-on');
               $('.m-overlay, .mobile-btn').removeClass('on');
          })
     }

})