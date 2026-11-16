# Dessert Lab 서브페이지 | 경량화 V12

- 팀 메인 index.html / headerfooter.css / 팀 JS는 수정하지 않았습니다.
- 파일 수 축소: JS 7개 → js/app.js 한 개, CSS css/style.css 한 개.
- jQuery 의존성 제거: TOP 버튼도 바닐라 JS로 구현.
- 이미지: 실제 참조되는 고화질 WebP와 SVG만 포함.
- 페이지: Hero / 콘1(2페이지, 카드 뒤집기) / 콘2(비행기) / 콘3(드래그) / 콘4(단일 초록 물결).
- 스크롤: 컨테이너 요소가 아래에서 올라오는 한 번만의 reveal + TOP 버튼 부드러운 맨 위 이동.
- 반응형: <=768 / 769-1199 / >=1200 구간 적용.

필수 외부 팀 공용 경로: ../css/headerfooter.css, ../img/header.png,
../img/footer.png, ../img/cur_2.png. 이 파일들은 기존 lastdance 루트에 있어야 합니다.

주의: 덮어쓰기는 이전에 잘못 복사된 js/assets, js/css, js/js 등 불필요한
폴더를 삭제하지 않습니다. 깔끔하게 교체하려면 기존 dessert-subpage 전체를
lastdance 밖의 Archive 백업 폴더로 이동한 후 이 ZIP의 dessert-subpage를
lastdance 루트에 넣으세요. 팀 루트 index.html은 변경하지 마세요.
