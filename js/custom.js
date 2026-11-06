$(function () {
  let i = 0;
  let total = $(".picture li").length;
  setInterval(function () {
    i++;
    if (i >= total) {
      i = 0;
    }
    $(".picture li img").fadeOut(500);
    $(".picture li img").eq(i).fadeIn(2000);
  }, 5000);
});
