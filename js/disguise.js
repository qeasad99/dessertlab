$(function () {
  let w = $(".frame").width();
  let i = 0;
  setInterval(() => {
    if (i == 3) {
      i = 0;
    } else {
      i++;
    }
    $(".image li").removeClass("on");
    $(".image li").eq(i).addClass("on");
  }, 2000);

  $(".btn .next").on("click", function () {
    $(".slide")
      .stop()
      .animate({ "margin-left": `${-w}px` }, function () {
        $(".slide li:first-child").appendTo(".slide");
        $(".slide").css({
          "margin-left": "0px",
        });
      });
  });

  $(".btn .prev").on("click", function () {
    $(".slide li:last-child").prependTo(".slide");
    $(".slide").css({
      "margin-left": `${-w}px`,
    });
    $(".slide").stop().animate({ "margin-left": "0" });
  });

  $("#con5 .slide .fir").on("click", function () {
    $("#con5 .modal").addClass("on");
    $("#con5 .modalimg li").hide();
    $("#con5 .modalimg .fir").show(2000);
  });

  $("#con5 .slide .sec").on("click", function () {
    $("#con5 .modal").addClass("on");
    $("#con5 .modalimg li").hide();
    $("#con5 .modalimg .sec").show(2000);
  });

  $("#con5 .slide .thi").on("click", function () {
    $("#con5 .modal").addClass("on");
    $("#con5 .modalimg li").hide();
    $("#con5 .modalimg .thi").show(2000);
  });

  $("#con5 .slide .fou").on("click", function () {
    $("#con5 .modal").addClass("on");
    $("#con5 .modalimg li").hide();
    $("#con5 .modalimg .fou").show(2000);
  });

  $("#con5 .modal").on("click", function () {
    $(this).removeClass("on");
  });
});
