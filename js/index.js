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

t1.fromTo(
  "#con02 .txtbox",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 1 },
);

// 1단계: 첫 번째 li 밝아짐
tl.to("#con02 .imgbox li:nth-child(1) img", { filter: "brightness(1)" })
  // 2단계: 두 번째 li 밝아짐
  .to("#con02 .imgbox li:nth-child(2) img", { filter: "brightness(1)" })
  // 3단계: 세 번째 li 밝아짐
  .to("#con02 .imgbox li:nth-child(3) img", { filter: "brightness(1)" })
  // 4단계: 네 번째 li 밝아짐
  .to("#con02 .imgbox li:nth-child(4) img", { filter: "brightness(1)" })
  // 5단계: li 안의 텍스트(.li-txt) 등장
  .to("#con02 .imgbox .li-txt", {
    opacity: 1,
    y: -20, // translateY(20px)인 상태에서 원래 자리(0)로 이동하게 수정
    stagger: 0.5,
  });
