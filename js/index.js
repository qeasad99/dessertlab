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
    // ul01 : PC 위쪽 / 모바일 왼쪽 이동
    function slideUp() {

        if ($(window).width() <= 768) {

            // 모바일
            $(".ul01").animate({
                marginLeft: "-=215px"
            }, 1500, "linear", function () {

                $(".ul01 li:first").appendTo(".ul01");

                $(this).css("marginLeft", "0px");

                slideUp();

            });

        } else {

            // PC
            $(".ul01").animate({
                marginTop: "-=270px"
            }, 1500, function () {

                $(".ul01 li:first").appendTo(".ul01");

                $(this).css("marginTop", "0px");

                slideUp();

            });

        }
    }
    // // ul01 : 위로 이동
    // function slideUp() {

    //     $(".ul01").animate({
    //         marginTop: "-=270px"
    //     }, 1500, function () {

    //         $(".ul01 li:first").appendTo(".ul01");

    //         $(this).css("marginTop", "0px");

    //         slideUp();

    //     });

    // }


    // ul02 : 아래로 이동
    function slideDown() {

        $(".ul02").animate({
            marginTop: "+=270px"
        }, 1500, function () {

            $(".ul02 li:last").prependTo(".ul02");

            $(this).css("marginTop", "-270px");

            slideDown();

        });

    }

    slideUp();
    slideDown();




});