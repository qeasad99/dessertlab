

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
    let ul01Timer;

    function slideup() {

        let mobile = $(window).width() <= 768;
        let move = 0;

        clearInterval(ul01Timer);

        ul01Timer = setInterval(function () {

            if (mobile) {

                // 모바일 : 왼쪽 이동
                move -= 1;

                $(".ul01").css("left", move + "px");

                if (move <= -1075) {
                    move = 0;
                    $(".ul01").css("left", "0px");
                }

            } else {

                // PC : 위쪽 이동
                move -= 1;

                $(".ul01").css("top", (-100 + move) + "px");

                if (move <= -1350) {
                    move = 0;
                    $(".ul01").css("top", "-100px");
                }
            }

        }, 16);
    }


    /* ul02 : PC / 태블릿 아래쪽 이동 */
    let ul02Timer;
    let move2 = 0;

    function slideDown() {

        clearInterval(ul02Timer);

        if ($(window).width() > 768) {

            move2 = -1350;

            ul02Timer = setInterval(function () {

                move2 += 1;

                $(".ul02").css("top", move2 + "px");

                if (move2 >= 0) {
                    move2 = -1350;
                    $(".ul02").css("top", "-1350px");
                }

            }, 16);
        }
    }


    /* 처음 위치 설정 */
    $(".ul01").css({
        position: "relative",
        left: "0px",
        top: $(window).width() > 768 ? "-100px" : "0px"
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
            clearInterval(ul01Timer);
            clearInterval(ul02Timer);

            // ul01 위치 초기화
            $(".ul01").css({
                left: "0px",
                top: $(window).width() > 768 ? "-100px" : "0px"
            });

            // ul02 위치 초기화
            $(".ul02").css("top", "-1350px");

            // 다시 실행
            slideup();
            slideDown();

        }, 200);
    });

    // 팀원 코드 : con02 GSAP 스크롤 애니메이션
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
        { opacity: 1, y: 0, duration: 1 },
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
    /*마우스*/
    $(document).on("mousemove", function (e) {
        $(".cursor").css({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
        });
    });



});
