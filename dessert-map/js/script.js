(() => {
  // ========================================
  // 01. 세계지도 HTML 요소
  // ========================================

  const section = document.querySelector("#origin");
  const frame = document.querySelector("#originFrame");
  const mapImage = frame?.querySelector(".origin-map");
  const pointLayer = document.querySelector("#originPoints");

  const card = document.querySelector("#dessertCard");
  const photo = document.querySelector("#dessertPhoto");
  const country = document.querySelector("#dessertCountry");
  const nameText = document.querySelector("#dessertName");

  const progressFill = document.querySelector("#progressFill");
  const progressText = document.querySelector("#progressText");

  if (
    !section ||
    !frame ||
    !mapImage ||
    !pointLayer ||
    !card ||
    !photo ||
    !country ||
    !nameText ||
    !progressFill ||
    !progressText
  ) {
    return;
  }

  // ========================================
  // 02. 이미지 경로
  // 실제 PNG 파일명과 일치하도록 수정
  // ========================================

  const scriptUrl = document.currentScript.src;

  // dessert-map/js/script.js 기준
  // dessert-map/img/ 폴더
  const imageFolder = new URL("../img/", scriptUrl);

  // 실제 이미지 파일명 공통 부분
  const imagePrefix = "ChatGPT 이미지 2026년 11월 5일 오후 ";

  function getImagePath(file) {
    return new URL(imagePrefix + file, imageFolder).href;
  }

  // ========================================
  // 03. 국가별 디저트 데이터
  // ========================================

  const desserts = [
    {
      country: "USA · Nicaragua",
      name: "Tres Leches",
      file: "03_46_10-2.png",
      x: 32,
      y: 56,
      vx: -1.15,
      vy: -0.1,
    },

    {
      country: "Mexico",
      name: "Churros",
      file: "03_46_11-3.png",
      x: 32,
      y: 62,
      vx: -1.05,
      vy: 0.18,
    },

    {
      country: "Brazil",
      name: "Brigadeiro",
      file: "03_46_13-4.png",
      x: 38,
      y: 70,
      vx: -0.82,
      vy: 0.85,
    },

    // ======================================
    // 칠레만 오른쪽 방향으로 변경
    // ======================================

    {
      country: "Chile",
      name: "Milhojas",
      file: "03_46_14-5.png",
      x: 38,
      y: 82,

      // 오른쪽으로 이동
      vx: 1.2,

      // 아래쪽 이동 제거
      vy: 0,
    },

    {
      country: "Canada",
      name: "Butter Tart",
      file: "03_46_16-6.png",
      x: 33,
      y: 48,
      vx: -0.72,
      vy: -1.02,

      cardOffsetX: 150,
      cardOffsetY: -130,
    },

    {
      country: "China",
      name: "Mooncake",
      file: "03_46_18-7.png",
      x: 65,
      y: 55,
      vx: 1.02,
      vy: -0.18,
    },

    {
      country: "Japan & Korea",
      name: "Wagashi & Yakgwa",
      file: "03_46_19-8.png",
      x: 70,
      y: 59,
      vx: 1.22,
      vy: 0.28,
    },
  ];

  // ========================================
  // 04. 계산 함수
  // ========================================

  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));

  const smooth = (t) => t * t * (3 - 2 * t);

  const range = (start, end, value) => smooth(clamp((value - start) / (end - start)));

  // ========================================
  // 05. 지도 배경색 추출
  // 기존 기능 유지
  // ========================================

  function applyMapBackgroundColor() {
    if (!mapImage.complete || !mapImage.naturalWidth || !mapImage.naturalHeight) {
      return;
    }

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const w = mapImage.naturalWidth;
    const h = mapImage.naturalHeight;

    canvas.width = w;
    canvas.height = h;

    try {
      ctx.drawImage(mapImage, 0, 0, w, h);

      const samplePoints = [
        [Math.floor(w * 0.03), Math.floor(h * 0.03)],
        [Math.floor(w * 0.1), Math.floor(h * 0.05)],
        [Math.floor(w * 0.97), Math.floor(h * 0.03)],
        [Math.floor(w * 0.9), Math.floor(h * 0.05)],

        [Math.floor(w * 0.03), Math.floor(h * 0.97)],
        [Math.floor(w * 0.1), Math.floor(h * 0.95)],
        [Math.floor(w * 0.97), Math.floor(h * 0.97)],
        [Math.floor(w * 0.9), Math.floor(h * 0.95)],
      ];

      let rTotal = 0;
      let gTotal = 0;
      let bTotal = 0;
      let count = 0;

      samplePoints.forEach(([x, y]) => {
        const data = ctx.getImageData(x, y, 1, 1).data;

        if (data[3] > 200) {
          rTotal += data[0];
          gTotal += data[1];
          bTotal += data[2];
          count++;
        }
      });

      if (!count) return;

      const r = Math.round(rTotal / count);
      const g = Math.round(gTotal / count);
      const b = Math.round(bTotal / count);

      section.style.setProperty("--origin-map-paper", `rgb(${r}, ${g}, ${b})`);
    } catch (error) {
      console.warn("세계지도 배경색 추출 실패:", error);
    }
  }

  if (mapImage.complete && mapImage.naturalWidth) {
    applyMapBackgroundColor();
  } else {
    mapImage.addEventListener("load", applyMapBackgroundColor, { once: true });
  }

  // ========================================
  // 06. 이미지 미리 불러오기
  // ========================================

  desserts.forEach(({ file }) => {
    const img = new Image();

    img.src = getImagePath(file);
  });

  // ========================================
  // 07. 국가별 노란색 핑
  // ========================================

  const markers = desserts.map((dessert, index) => {
    const point = document.createElement("span");

    point.className = "map-point";

    point.style.left = `${dessert.x}%`;
    point.style.top = `${dessert.y}%`;

    point.style.setProperty("--delay", `${index * -0.3}s`);

    pointLayer.appendChild(point);

    return point;
  });

  // ========================================
  // 08. 스크롤 상태
  // ========================================

  let previousIndex = -1;
  let ticking = false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ========================================
  // 09. 스크롤 애니메이션
  // ========================================

  function render() {
    ticking = false;

    const rect = section.getBoundingClientRect();

    const distance = Math.max(1, section.offsetHeight - window.innerHeight);

    const progress = clamp(-rect.top / distance);

    const scaled = progress * desserts.length;

    const index = Math.min(desserts.length - 1, Math.floor(scaled));

    const local = clamp(scaled - index);

    const item = desserts[index];

    // ======================================
    // 현재 디저트 사진 및 텍스트
    // ======================================

    if (index !== previousIndex) {
      photo.src = getImagePath(item.file);

      photo.alt = `${item.country} 대표 디저트 ${item.name}`;

      country.textContent = item.country;
      nameText.textContent = item.name;

      previousIndex = index;
    }

    // ======================================
    // 현재 국가 핑 활성화
    // ======================================

    markers.forEach((marker, i) => {
      marker.classList.toggle("active", i === index);
    });

    // ======================================
    // 카드 등장 및 퇴장
    // ======================================

    const intro = range(0.03, 0.22, local);

    const hold = range(0.18, 0.58, local);

    const outro = range(0.58, 1, local);

    const opacity = intro * (1 - range(0.76, 0.98, local));

    // ======================================
    // 화면 크기에 따른 이동거리
    // ======================================

    const frameWidth = frame.clientWidth;

    const frameScale = Math.min(1, frameWidth / 1200);

    const introDistance = 110 * frameScale;

    const outroDistance = Math.max(window.innerWidth, window.innerHeight) * 0.92;

    const offsetX = (item.cardOffsetX ?? 0) * frameScale;

    const offsetY = (item.cardOffsetY ?? 0) * frameScale;

    // ======================================
    // 카드 이동 방향
    // ======================================

    const dx = item.vx * (introDistance * intro + outroDistance * outro) + offsetX * intro;

    const dy = item.vy * (introDistance * intro + outroDistance * outro) + offsetY * intro;

    // ======================================
    // 확대 및 회전
    // ======================================

    const scale = 0.22 + intro * 0.82 + hold * 0.06;

    const rotation = item.vx * 5 + item.vy * 3;

    // ======================================
    // 카드 위치 적용
    // ======================================

    card.style.left = `${item.x}%`;
    card.style.top = `${item.y}%`;

    card.style.opacity = String(opacity);

    card.style.transform = reduceMotion.matches
      ? "translate(-50%, -50%) scale(1)"
      : `
          translate(-50%, -50%)
          translate3d(${dx}px, ${dy}px, 0)
          rotate(${rotation * (intro + outro * 0.5)}deg)
          scale(${scale})
        `;

    card.setAttribute("aria-hidden", opacity <= 0.01 ? "true" : "false");

    // ======================================
    // 진행도
    // ======================================

    progressFill.style.width = `${progress * 100}%`;

    progressText.textContent = `${String(progress === 0 ? 0 : index + 1).padStart(2, "0")} / 07`;
  }

  // ========================================
  // 10. 스크롤 최적화
  // ========================================

  function requestRender() {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(render);
  }

  // ========================================
  // 11. 이벤트
  // ========================================

  window.addEventListener("scroll", requestRender, { passive: true });

  window.addEventListener("resize", () => {
    applyMapBackgroundColor();
    requestRender();
  });

  reduceMotion.addEventListener("change", requestRender);

  // 최초 실행
  render();
})();
