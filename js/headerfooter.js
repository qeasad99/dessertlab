$(function () {
  /*마우스*/
  $(document).on("mousemove", function (e) {
    $(".cursor").css({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    });
  });
  // headerfooter start
  // 메뉴바
  $(".menu_bar").on("click", function () {
    $(".menu_open").addClass("on");
    // 바 없애기
    $(".menu_openbar").show();
  });
  $(".menu_openbar").on("click", function () {
    $(".menu_open").removeClass("on");
    $(".menu_openbar").hide();
  });
  //  headerfooter end
});
