$(function () {
    /* section02 scroll */

    $(window).on("scroll", function () {
        let sc = $(this).scrollTop();
        let pos = $(".section02").offset().top;

        if (sc >= pos - 600) {
            $(".section02").addClass("on");
        } else {
            $(".section02").removeClass("on");
        }
    });
    /* section03 scroll */

    $(window).on("scroll", function () {
        let sc = $(this).scrollTop();
        let pos = $(".section03").offset().top;

        if (sc >= pos - 600) {
            $(".section03").addClass("on");
        } else {
            $(".section03").removeClass("on");
        }
    });

    /*section03 이미지 슬라이드*/
    $(function () {

        let track = $(".section03 .all .right .track");

        function slideLeft() {

            let width = track.find("ul:first").outerWidth(true);

            track.animate({
                marginLeft: -width
            }, 9000, "linear", function () {

                track.find("ul:first").appendTo(track);

                track.css("marginLeft", "0");

                slideLeft();

            });

        }

        slideLeft();

    });
    /*section03 이미지 마우스 올려두었을 때 상세내용*/
    $(".section03 .all .right li").on("mouseenter", function () {

        $(".section03 .all .right li .txt").removeClass("on");

        $(this).find(".txt").addClass("on");

    });

    $(".section03 .all .right li").on("mouseleave", function () {

        $(this).find(".txt").removeClass("on");

    });
    /* section04 scroll */

    $(window).on("scroll", function () {
        let sc = $(this).scrollTop();
        let pos = $(".section04").offset().top;

        if (sc >= pos - 600) {
            $(".section04").addClass("on");
        } else {
            $(".section04").removeClass("on");
        }
    });

    /* section04 글씨 및 이미지 효과 */

    let tl04 = gsap.timeline({
        scrollTrigger: {
            trigger: ".section04",
            start: "top 40%",
            toggleActions: "play none none none"
        }
    });

    // 프레즐 등장
    tl04.fromTo(".section04 .pretzel",
        {
            autoAlpha: 0,
            scale: 0.15
        },
        {
            autoAlpha: 1,
            scale: 0.15,
            duration: 1.5,
            ease: "power2.out"
        }
    );

    // 도넛 등장
    tl04.fromTo(".section04 .donuts",
        {
            autoAlpha: 0,
            scale: 0.1
        },
        {
            autoAlpha: 1,
            scale: 0.1,
            duration: 1.6,
            ease: "power2.out"
        }
    );

    // 크로와상 등장
    tl04.fromTo(".section04 .croissant",
        {
            autoAlpha: 0,
            scale: 0.1
        },
        {
            autoAlpha: 1,
            scale: 0.1,
            duration: 1.7,
            ease: "power2.out"
        }
    );

    // 이미지 둥둥 떠다니기

    gsap.to(".section04 .pretzel", {
        y: -30,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5
    });

    gsap.to(".section04 .donuts", {
        y: 30,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5
    });

    gsap.to(".section04 .croissant", {
        y: -25,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5
    });


    /* section05 scroll */

    $(window).on("scroll", function () {
        let sc = $(this).scrollTop();
        let pos = $(".section05").offset().top;

        if (sc >= pos - 600) {
            $(".section05").addClass("on");
        } else {
            $(".section05").removeClass("on");
        }
    });
    /*section05 모달창*/

    // More 클릭
    $(".section05 .bg1 ul li .more").click(function () {

        let i = $(this).closest("li").index();

        $(".section05 .bg2 ul li").removeClass("on");
        $(".section05 .bg2 ul li").eq(i).addClass("on");

        $(".section05 .bg2").fadeIn();

    });

    // X 버튼 클릭
    $(".section05 .bg2 ul li .button").click(function () {

        $(".section05 .bg2").fadeOut();

        $(".section05 .bg2 ul li").removeClass("on");

    });
    /* section06 scroll */

    $(window).on("scroll", function () {
        let sc = $(this).scrollTop();
        let pos = $(".section06").offset().top;

        if (sc >= pos - 600) {
            $(".section06").addClass("on");
        } else {
            $(".section06").removeClass("on");
        }
    });

    /* section06 페이드 */
    let i = 0;
    let total = $(".section06 .panel li").length;
    let stop;

    active();
    start();

    function active() {
        $(".section06 .panel li").stop().fadeOut().removeClass("on");
        $(".section06 .panel li").eq(i).stop().fadeIn().addClass("on");
    }

    function start() {
        clearInterval(stop);

        stop = setInterval(function () {

            if (i == total - 1) {
                i = 0;
            } else {
                i++;
            }

            active();

        }, 2000);
    }

    // 하단 이미지에 마우스를 올렸을 때
    $(".section06 .panel2 li").mouseenter(function () {

        i = $(this).index();

        clearInterval(stop);

        active();

    });

    // 마우스를 벗어났을 때
    $(".section06 .panel2 li").mouseleave(function () {

        start();

    });

})



