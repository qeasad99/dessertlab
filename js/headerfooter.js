$(function () {
  /*마우스*/
  $(document).on("mousemove", function (e) {
    $(".cursor").css({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    });
  });
  // headerfooter start
  // 메뉴 열기
  $(".menu_bar").on("click", function () {
    $(".menu_open").addClass("on");
    $(".menu_bar").hide();
    $(".menu_openbar").show();
  });

  // 메뉴 닫기
  $(".menu_openbar").on("click", function () {
    $(".menu_open").removeClass("on");
    $(".menu_openbar").hide();
    $(".menu_bar").show();
  });
  //  headerfooter end
});
