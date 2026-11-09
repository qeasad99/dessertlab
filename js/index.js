
$(function () {

  /* con01 scroll */
  $(window).on("scroll", function () {

    let sc = $(this).scrollTop();
    let pos = $("#con01").offset().top;

    if (sc >= pos - 600) {
      $("#con01").addClass("on");
    } else {
      $("#con01").removeClass("on");
    }

  });


  /* ul01 : PC 위쪽 / 모바일 왼쪽 이동 */
  function slideUp() {

    if ($(window).width() <= 768) {

      // 모바일 : 가로 이동
      $(".ul01").animate({
        marginLeft: "-=215px"
      }, 1500, "linear", function () {

        $(".ul01 li:first").appendTo(".ul01");

        $(this).css("marginLeft", "0px");

        slideUp();

      });

    } else {

      // PC / 태블릿 : 위쪽 이동
      $(".ul01").animate({
        marginTop: "-=270px"
      }, 1500, "linear", function () {

        $(".ul01 li:first").appendTo(".ul01");

        $(this).css("marginTop", "0px");

        slideUp();

      });

    }

  }


  // /* ul02 : PC / 태블릿 아래쪽 이동 */
  // function slideDown() {

  //   if ($(window).width() > 768) {

  //     $(".ul02").animate({
  //       marginTop: "+=270px"
  //     }, 1500, function () {

  //       $(".ul02 li:last").prependTo(".ul02");

  //       $(this).css("marginTop", "-270px");

  //       slideDown();

  //     });

  //   }
  /* ul02 : PC / 태블릿 아래쪽 이동 */
  function slideDown() {

    if ($(window).width() > 768) {

      $(".ul02").animate({
        marginTop: "0px"
      }, 1500, "linear", function () {

        $(".ul02 li:last").prependTo(".ul02");

        $(this).css("marginTop", "-270px");

        slideDown();

      });

    }

  }


  /* 화면 크기 변경 */
  $(window).on("resize", function () {

    if ($(window).width() > 768) {

      $(".ul02").stop(true);

      $(".ul02").css("marginTop", "-270px");

      slideDown();

    } else {

      $(".ul02").stop(true);

    }



  });


  /* 슬라이드 실행 */
  slideUp();
  slideDown();


});


// 팀원 코드 : con02 GSAP 스크롤 애니메이션
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#con02",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 1,
    snap: {
      snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
      duration: 0.5,
      delay: 0.1,
    },
  },
});

// 이미지 순서대로 밝아지는 효과
tl.to("#con02 .imgbox li:nth-child(1) img", {
  filter: "brightness(1)"
})
  .to("#con02 .imgbox li:nth-child(2) img", {
    filter: "brightness(1)"
  })
  .to("#con02 .imgbox li:nth-child(3) img", {
    filter: "brightness(1)"
  })
  .to("#con02 .imgbox li:nth-child(4) img", {
    filter: "brightness(1)"
  })
  .to("#con02 .imgbox .li-txt", {
    opacity: 1,
    y: -20,
    stagger: 0.5,
  });
