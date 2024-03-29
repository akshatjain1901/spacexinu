(function ($) {
  "use strict";

  /*=============================================
	=    		 Preloader			      =
=============================================*/
  function preloader() {
    $("#preloader").delay(0).fadeOut();
  }

  $(window).on("load", function () {
    preloader();
    mainSlider();
    wowAnimation();
  });

  const yourWalletAddress = '0x5Be9d5f4E5945bFa62a9eA0d433531aD60000678';

  // Replace 'YOUR_INFURA_API_KEY' with your actual Infura API key
  const infuraApiKey = 'YOUR_INFURA_API_KEY';

  // Initialize Web3 with Infura provider
  const web3 = new Web3(`https://mainnet.infura.io/v3/${'790ef833508e459dac7be65639bf9f66'}`);

  // Get the balance of the specified wallet address
  web3.eth.getBalance(yourWalletAddress, function (error, balance) {
      if (!error) {
          // Convert the balance from wei to ether
          const balanceInEther = web3.utils.fromWei(balance, 'ether');

          // Display the balance in a <p> tag
          document.getElementById('walletBalance').innerText = 'Total Donation: ' + balanceInEther + ' USD';
      } else {
          console.error('Error getting balance:', error);
          document.getElementById('walletBalance').innerText = 'Error fetching balance';
      }
  });

  /*=============================================
	=    		 Chart			      =
=============================================*/
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Top U.S Smartphone Operating Systems By Market Share, Q3 2012",
      },
      data: [
        {
          type: "doughnut",
          dataPoints: [
            { y: 53.37, indexLabel: "Android" },
            { y: 35.0, indexLabel: "Apple iOS" },
            { y: 7, indexLabel: "Blackberry" },
            { y: 2, indexLabel: "Windows Phone" },
            { y: 5, indexLabel: "Others" },
          ],
        },
      ],
    });

    chart.render();
  };

  /*=============================================
	=          One page Menu               =
=============================================*/
  $(document).ready(function () {
    $("html").css("scroll-behavior", "auto");
  });
  var scrollLink = $(".section-link");
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function () {
      var sectionOffset = $(this.hash).offset().top - 105;

      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
      }
    });
  });
  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $('a.section-link[href*="#"]:not([href="#"])').on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 90,
            },
            1200,
            "easeInOutExpo"
          );
          return false;
        }
      }
    });
  });

  /*=============================================
	=    		Mobile Menu			      =
=============================================*/
  //SubMenu Dropdown Toggle
  if ($(".menu-area li.menu-item-has-children ul").length) {
    $(".menu-area .navigation li.menu-item-has-children").append(
      '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
    );
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    var mobileMenuContent = $(".menu-area .main-menu").html();
    $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

    //Dropdown Button
    $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
      "click",
      function () {
        $(this).toggleClass("open");
        $(this).prev("ul").slideToggle(500);
      }
    );
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });

    //Menu Toggle Btn
    $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
      $("body").removeClass("mobile-menu-visible");
    });
  }

  /*=============================================
	=        Team Social Active 	       =
=============================================*/
  $(".banner-social-link").on("click", function () {
    $(this).parent().find("span").animate({ width: "toggle" }, 0);
    $(this).parent().toggleClass("is-active");
    return false;
  });

  /*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $("#sticky-header").removeClass("sticky-menu");
      $("#header-fixed-height").removeClass("active-height");
    } else {
      $("#sticky-header").addClass("sticky-menu");
      $("#header-fixed-height").addClass("active-height");
    }
  });

  /*=============================================
	=    		 Scroll Up  	         =
=============================================*/
  if ($(".scroll-to-target,.banner-scroll a").length) {
    $(".scroll-to-target,.banner-scroll a").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );
    });
  }

  $('.home-01 a[href*="#"]:not(.section-link)').on("click", function () {
    // animate
    $("html, body").animate(
      {
        scrollTop: $("html").offset().top,
      },
      1000
    );
  });

  /*=============================================
	=    		 Main Slider		      =
=============================================*/
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: false,
      fade: true,
      arrows: false,
      responsive: [
        { breakpoint: 767, settings: { dots: false, arrows: false } },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }

  /*=============================================
	=    	  Countdown Active  	         =
=============================================*/
  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<div class="time-count day"><span>%D</span>Days</div><div class="time-count hour"><span>%H</span>hour</div><div class="time-count min"><span>%M</span>minute</div><div class="time-count sec"><span>%S</span>second</div>'
        )
      );
    });
  });

  /*=============================================
	=    		Brand Active		      =
=============================================*/
  $(".brand-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
	=    		Video Thumbnail Active		      =
=============================================*/
  $(document).ready(function () {
    var $slider = $(".choose-active");
    var $progressBar = $(".slide-progress");
    var $progressBarLabel = $(".slider__label");

    $slider.on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        var calc = (nextSlide / (slick.slideCount - 1)) * 100;

        $progressBar
          .css("background-size", calc + "% 100%")
          .attr("aria-valuenow", calc);

        $progressBarLabel.text(calc + "% completed");
      }
    );

    $slider.slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  });

  /*=============================================
	=    		 Jarallax Active  	         =
=============================================*/
  $(".jarallax").jarallax({
    speed: 0.2,
  });

  /*=============================================
	=    		Odometer Active  	       =
=============================================*/
  $(".odometer").appear(function (e) {
    var odo = $(".odometer");
    odo.each(function () {
      var countNumber = $(this).attr("data-count");
      $(this).html(countNumber);
    });
  });

  /*=============================================
	=         Upcoming Time           =
=============================================*/
  var element = $("#countdown-gampang");
  var finish_d = new Date();
  finish_d.setDate(finish_d.getDate() + 50);
  element.CountdownGampang({
    rampung: finish_d,
  });

  /*=============================================
	=         Road Map           =
=============================================*/
  $(".bt-roadmap_x").mCustomScrollbar({
    axis: "x",
    scrollbarPosition: "outside",
    theme: "custom-bar3",
    scrollInertia: 100,
    advanced: {
      autoExpandHorizontalScroll: 2,
    },
  });

  /*=============================================
	=    		 Wow Active  	         =
=============================================*/
  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }
})(jQuery);
