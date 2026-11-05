// 이 경로 아래의 파일명과 확장자는 사용 중인 img 폴더와 일치해야 합니다.
const base = 'img/ChatGPT 이미지 2026년 11월 5일 오후 ';

// x, y: 지도 이미지 위 핑 시작 위치(%)
// vx, vy: 사진이 각 나라에서 퍼져 나가는 방사형 방향 (왼쪽/위 = 음수)
const desserts = [
  { country: 'USA · Nicaragua', name: 'Tres Leches', file: '03_46_10-2.png', x: 32, y: 56, vx: -1.15, vy: -0.10 },
  { country: 'Mexico', name: 'Churros', file: '03_46_11-3.png', x: 32, y: 62, vx: -1.05, vy: 0.18 },
  { country: 'Brazil', name: 'Brigadeiro', file: '03_46_13-4.png', x: 38, y: 70, vx: -0.82, vy: 0.85 },
  { country: 'Chile', name: 'Milhojas', file: '03_46_14-5.png', x: 38, y: 82, vx: -0.45, vy: 1.15 },
  { country: 'Canada', name: 'Butter Tart', file: '03_46_16-6.png', x: 33, y: 48, vx: -0.72, vy: -1.02 },
  { country: 'China', name: 'Mooncake', file: '03_46_18-7.png', x: 65, y: 55, vx: 1.02, vy: -0.18 },
  { country: 'Japan & Korea', name: 'Wagashi & Yakgwa', file: '03_46_19-8.png', x: 70, y: 59, vx: 1.22, vy: 0.28 }
];

const section = document.querySelector('#origin');
const pointLayer = document.querySelector('#originPoints');
const card = document.querySelector('#dessertCard');
const photo = document.querySelector('#dessertPhoto');
const country = document.querySelector('#dessertCountry');
const nameText = document.querySelector('#dessertName');
const progressFill = document.querySelector('#progressFill');
const progressText = document.querySelector('#progressText');

const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = (t) => t * t * (3 - 2 * t);
const range = (start, end, value) => smooth(clamp((value - start) / (end - start)));

// 처음부터 이미지 주소를 불러와 두면 스크롤 도중 사진 전환이 자연스럽습니다.
desserts.forEach(({ file }) => {
  const img = new Image();
  img.src = base + file;
});

// 1. 지도 위의 노란색 핑 생성
const markers = desserts.map((dessert, index) => {
  const point = document.createElement('span');
  point.className = 'map-point';
  point.style.left = `${dessert.x}%`;
  point.style.top = `${dessert.y}%`;
  point.style.setProperty('--delay', `${index * -0.3}s`);
  pointLayer.appendChild(point);
  return point;
});

let previousIndex = -1;
let ticking = false;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function render() {
  ticking = false;

  // 2. 지도 구간의 전체 스크롤 진행률: 0~1
  const rect = section.getBoundingClientRect();
  const distance = Math.max(1, section.offsetHeight - window.innerHeight);
  const progress = clamp(-rect.top / distance);

  // 3. 현재 등장할 국가 선택
  const scaled = progress * desserts.length;
  const index = Math.min(desserts.length - 1, Math.floor(scaled));
  const local = clamp(scaled - index);
  const item = desserts[index];

  if (index !== previousIndex) {
    photo.src = base + item.file;
    photo.alt = `${item.country} 대표 디저트 ${item.name}`;
    country.textContent = item.country;
    nameText.textContent = item.name;
    previousIndex = index;
  }

  markers.forEach((marker, i) => {
    marker.classList.toggle('active', i === index);
  });

  // 4. 사진이 지도 위 점에서 확대 → 잠시 표시 → 방사형으로 퇴장
  const intro = range(0.03, 0.22, local);
  const hold = range(0.18, 0.58, local);
  const outro = range(0.58, 1, local);
  const opacity = intro * (1 - range(0.76, 0.98, local));

  const introDistance = 110;
  const outroDistance = Math.max(window.innerWidth, window.innerHeight) * 0.92;
  const dx = item.vx * (introDistance * intro + outroDistance * outro);
  const dy = item.vy * (introDistance * intro + outroDistance * outro);
  const scale = 0.22 + intro * 0.82 + hold * 0.06;
  const rotation = item.vx * 5 + item.vy * 3;

  card.style.left = `${item.x}%`;
  card.style.top = `${item.y}%`;
  card.style.opacity = String(opacity);

  card.style.transform = reduceMotion.matches
    ? 'translate(-50%, -50%) scale(1)'
    : `translate(-50%, -50%) translate3d(${dx}px, ${dy}px, 0) rotate(${rotation * (intro + outro * 0.5)}deg) scale(${scale})`;

  card.setAttribute('aria-hidden', opacity <= 0.01 ? 'true' : 'false');
  progressFill.style.width = `${progress * 100}%`;
  progressText.textContent = `${String(progress === 0 ? 0 : index + 1).padStart(2, '0')} / 07`;
}

function requestRender() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(render);
}

window.addEventListener('scroll', requestRender, { passive: true });
window.addEventListener('resize', requestRender);
render();
