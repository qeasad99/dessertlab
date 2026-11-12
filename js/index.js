
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
    function slideup() {

        if ($(window).width() <= 768) {

            // 모바일 : transform으로 가로 이동
            $(".ul01").animate({
                dummy: 1
            }, {
                duration: 12000,
                easing: "linear",

                step: function (now) {
                    $(this).css(
                        "transform",
                        "translate3d(" + (-1075 * now) + "px, 0, 0)"
                    );
                },

                complete: function () {

                    $(this).css("transform", "translate3d(0, 0, 0)");

                    if ($(window).width() <= 768) {
                        slideup();
                    }
                }
            });

        } else {

            // PC + 태블릿 : 위로 이동
            $(".ul01").animate({
                top: "-=1350px"
            }, 20000, "linear", function () {

                // 처음 위치로 돌아가기
                $(this).css("top", "-100px");

                if ($(window).width() > 768) {
                    slideup();
                }
            });
        }
    }


    /* ul02 : PC / 태블릿 아래쪽 이동 */
    function slideDown() {

        if ($(window).width() > 768) {

            $(".ul02").animate({
                top: "0px"
            }, 20000, "linear", function () {

                $(this).css("top", "-1350px");

                if ($(window).width() > 768) {
                    slideDown();
                }
            });
        }
    }


    /* 처음 위치 설정 */
    $(".ul01").css({
        position: "relative",
        left: "0px",
        top: $(window).width() > 768 ? "-100px" : "0px",
        transform: "translate3d(0, 0, 0)"
    });

    $(".ul02").css({
        position: "relative",
        top: "-1350px"
    });


    /* 처음 실행 */
    slideup();
    slideDown();


    /* 화면 크기 변경 시 슬라이드 재시작 */
    let resizeTimer;

    $(window).on("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            // 기존 애니메이션 정지
            $(".ul01, .ul02").stop(true, false);

            // ul01 위치 초기화
            $(".ul01").css({
                left: "0px",
                top: $(window).width() > 768 ? "-100px" : "0px",
                transform: "translate3d(0, 0, 0)"
            });

            // ul02 위치 초기화
            $(".ul02").css("top", "-1350px");

            // 다시 실행
            slideup();
            slideDown();

        }, 200);
    });



    /* 팀원 코드 : con02 GSAP 스크롤 애니메이션 */
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#con02",
            start: "top 82px",
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


    // 중앙 텍스트박스 효과
    tl.fromTo(
        "#con02 .txtbox",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
    );


    // 이미지 순서대로 밝아지는 효과
    tl.to("#con02 .imgbox li:nth-child(1) img", {
        filter: "brightness(1)",
    })
        .to("#con02 .imgbox li:nth-child(2) img", {
            filter: "brightness(1)",
        })
        .to("#con02 .imgbox li:nth-child(3) img", {
            filter: "brightness(1)",
        })
        .to("#con02 .imgbox li:nth-child(4) img", {
            filter: "brightness(1)",
        })
        .to("#con02 .imgbox .li-txt", {
            opacity: 1,
            y: -20,
            stagger: 0.5,
        });

});