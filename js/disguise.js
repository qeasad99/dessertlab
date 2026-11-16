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
  /*con3 drag*/
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  $("#con3 ul").on("mousedown", function (e) {
    if (e.button !== 0) return;

    isDragging = true;
    startX = e.pageX;
    scrollLeft = $(this).scrollLeft();

    $(this).addClass("dragging");
  });

  $(document).on("mousemove", function (e) {
    if (!isDragging) return;

    e.preventDefault();

    let moveX = (e.pageX - startX) * 0.5;

    $("#con3 ul").scrollLeft(scrollLeft - moveX);
  });

  $(document).on("mouseup", function () {
    isDragging = false;
    $("#con3 ul").removeClass("dragging");
  });

  /*con3 click*/
  $(".over").on("click", function () {
    $(this).find(".second").toggleClass("on");
  });
  /*scroll */
  $(window).on("scroll", function () {
    let pos = $(this).scrollTop();
    let con1 = $("#con1").offset().top;
    let con3 = $("#con3").offset().top;
    let con4 = $("#con4").offset().top;
    let con5 = $("#con5").offset().top;

    if (pos > con1 - 700) {
      $("#con1 .left").addClass("on");
      $("#con1 h3").addClass("on");
      $("#con1 .first").addClass("on");
      $("#con1 .second").addClass("on");
    } else {
      $("#con1 .left").removeClass("on");
      $("#con1 h3").removeClass("on");
      $("#con1 .first").removeClass("on");
      $("#con1 .second").removeClass("on");
    }
    if (pos > con3 - 700) {
      $("#con3 h3").addClass("on");
      $("#con3 h5").addClass("on");
    } else {
      $("#con3 h3").removeClass("on");
      $("#con3 h5").removeClass("on");
    }
    if (pos > con4 - 700) {
      $("#con4 div").addClass("on");
      $("#con4 h3").addClass("on");
      $("#con4 p").addClass("on");
    } else {
      $("#con4 div").removeClass("on");
      $("#con4 h3").removeClass("on");
      $("#con4 p").removeClass("on");
    }
    if (pos > con5 - 700) {
      $("#con5 h3").addClass("on");
    } else {
      $("#con5 h3").removeClass("on");
    }
  });
});
