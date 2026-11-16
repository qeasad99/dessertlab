/* script-preview.js */
/* Subpage-only offset for the team's fixed header. */
(() => {
  'use strict';
  function syncHeaderHeight() {
    const header = document.querySelector('body.dessert-subpage > header');
    if (!header) return;
    document.documentElement.style.setProperty('--subpage-header-height',
      `${Math.ceil(header.getBoundingClientRect().height)}px`);
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);
})();

/* HERO V3 — individual country controls, artwork and description. */
(function () {
  'use strict';
  const hero = document.querySelector('body.dessert-subpage #hero.hero-origin');
  if (!hero) return;

  const countries = [
    { key:'usa', region:'USA · NICARAGUA', title:'Tres Leches', image:'tres-leches.webp', alt:'트레스 레체스 케이크', description:'세 가지 우유로 촉촉하게 적신 부드러운 스펀지 케이크.' },
    { key:'canada', region:'CANADA', title:'Butter Tart', image:'butter-tart.webp', alt:'버터 타르트', description:'버터와 설탕의 진한 풍미를 담은 캐나다식 타르트.' },
    { key:'mexico', region:'MEXICO', title:'Churros', image:'churros.webp', alt:'초콜릿 소스를 곁들인 츄러스', description:'바삭한 계피 설탕 츄러스와 부드러운 초콜릿 소스.' },
    { key:'brazil', region:'BRAZIL', title:'Brigadeiro', image:'brigadeiro.webp', alt:'초콜릿 브리가데이루', description:'연유와 코코아로 만든 브라질의 작은 초콜릿 디저트.' },
    { key:'chile', region:'CHILE', title:'Milhojas', image:'milhojas.webp', alt:'밀오하스 레이어 페이스트리', description:'얇은 페이스트리와 달콤한 둘세 데 레체를 겹겹이 쌓은 디저트.' },
    { key:'china', region:'CHINA', title:'Mooncake', image:'mooncake.webp', alt:'월병', description:'문양이 새겨진 반죽 속에 달콤한 소를 채운 월병.' },
    { key:'japan-korea', region:'JAPAN · KOREA', title:'Wagashi & Yakgwa', image:'wagashi-yakgwa.webp', alt:'화과자와 약과', description:'꽃처럼 빚은 화과자와 향긋한 꿀 약과의 만남.' },
  ];

  const controls = Array.from(hero.querySelectorAll('[data-origin]'));
  const photo = hero.querySelector('#originFeaturePhoto');
  const title = hero.querySelector('#originFeatureTitle');
  const region = hero.querySelector('#originFeatureRegion');
  const description = hero.querySelector('#originFeatureDescription');
  const counter = hero.querySelector('#originFeatureCount');
  const card = hero.querySelector('#originFeature');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let changeTimer = null;
  let autoTimer = null;
  let resumeTimer = null;
  let imageRequest = 0;

  // Preload the 7 card thumbnails so timed transitions are immediate.
  countries.forEach(({image}) => { const img = new Image(); img.src = 'assets/hero/' + image; });

  function activate(index, { userAction=false } = {}) {
    if (!Number.isInteger(index) || index<0 || index>=countries.length) return;
    if (changeTimer) clearTimeout(changeTimer);
    const data=countries[index];
    activeIndex=index;
    controls.forEach(button => {
      const selected=button.dataset.origin===data.key;
      button.classList.toggle('is-active',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
    const request=++imageRequest;
    const update=() => {
      if (request!==imageRequest) return;
      photo.src='assets/hero/'+data.image;
      photo.alt=data.alt;
      region.textContent=data.region;
      title.textContent=data.title;
      description.textContent=data.description;
      counter.textContent=String(index+1).padStart(2,'0');
      card.classList.remove('is-changing');
    };
    if (reducedMotion.matches) update();
    else { card.classList.add('is-changing'); changeTimer=setTimeout(update,190); }
    if (userAction) {
      stopAuto();
      clearTimeout(resumeTimer);
      resumeTimer=setTimeout(() => { resumeTimer=null; startAuto(); },8500);
    }
  }
  function stopAuto() { clearInterval(autoTimer); autoTimer=null; }
  function startAuto() {
    stopAuto();
    if (reducedMotion.matches || document.hidden) return;
    autoTimer=setInterval(() => activate((activeIndex+1)%countries.length), 4400);
  }
  controls.forEach(button => {
    button.addEventListener('click', () => {
      const index=countries.findIndex(item => item.key===button.dataset.origin);
      activate(index,{userAction:true});
    });
  });
  hero.addEventListener('mouseenter', stopAuto);
  hero.addEventListener('mouseleave', () => {
    if (resumeTimer) return;
    startAuto();
  });
  hero.addEventListener('focusin',stopAuto);
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget) && !resumeTimer) startAuto();
  });
  document.addEventListener('visibilitychange',() => { if (document.hidden) stopAuto(); else startAuto(); });
  reducedMotion.addEventListener?.('change', () => { if(reducedMotion.matches) stopAuto(); else startAuto(); });
  startAuto();
})();

/* collection.js */
/* CON01 – two-page 2×2 dessert collection. No modal is used here. */
(() => {
  'use strict';
  const section = document.querySelector('body.dessert-subpage #collection.collection-editorial');
  if (!section) return;
  const grid = section.querySelector('#collectionGrid');
  const nav = [...section.querySelectorAll('[data-collection-page]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const H = 'assets/hero/';
  const C = 'assets/collection/';
  const pages = [
    {title:'THE AMERICAS', items:[
      ['USA · NICARAGUA','Tres Leches','A MILK-SOAKED CLASSIC','촉촉한 우유 케이크','세 종류의 우유를 머금은 스펀지 케이크. 라틴아메리카 전역에서 사랑받는 풍부하고 부드러운 디저트입니다.','우유 · 생크림 · 바닐라',H+'tres-leches.webp'],
      ['MEXICO','Churros','A GOLDEN CRUNCH','시나몬의 달콤한 향','바삭하게 튀긴 반죽에 계피 설탕을 입혀 즐기는 간식. 따뜻한 초콜릿 소스와 곁들이면 더욱 풍성해집니다.','밀가루 · 계피 · 초콜릿',H+'churros.webp'],
      ['BRAZIL','Brigadeiro','CHOCOLATE IN ONE BITE','작은 초콜릿의 즐거움','연유와 코코아를 졸여 둥글게 빚고 초콜릿 스프링클을 묻힌 디저트. 브라질의 파티에서 빠지지 않는 달콤한 간식입니다.','연유 · 코코아 · 초콜릿',H+'brigadeiro.webp'],
      ['CHILE','Milhojas','LAYERS OF SWEETNESS','겹겹이 쌓은 달콤함','바삭한 페이스트리 사이에 둘세 데 레체를 채운 레이어 케이크. 섬세한 결의 식감과 카라멜 풍미가 매력적입니다.','페이스트리 · 둘세 데 레체',H+'milhojas.webp'],
    ]},
    {title:'ASIA & CANADA',items:[
      ['CANADA','Butter Tart','A CANADIAN FAVORITE','버터가 전하는 진한 풍미','바삭한 타르트 셸 속을 버터와 갈색 설탕의 달콤한 필링으로 채웁니다. 지역과 가정마다 건포도나 견과류를 더하기도 합니다.','버터 · 설탕 · 파이 반죽',H+'butter-tart.webp'],
      ['CHINA','Mooncake','A FESTIVAL TRADITION','달빛 아래 나누는 마음','중추절에 나누어 먹는 전통 과자. 무늬가 새겨진 반죽 안에 연꽃씨 소나 다양한 재료를 채워 만듭니다.','연꽃씨 소 · 밀가루 · 달걀',H+'mooncake.webp'],
      ['JAPAN','Wagashi','SEASONS IN A SWEET','계절을 빚은 작은 예술','꽃과 계절의 풍경을 정교한 형태와 색으로 표현하는 일본 전통 화과자. 차와 함께 맛과 모양을 천천히 음미합니다.','쌀가루 · 팥앙금 · 설탕',C+'wagashi.webp'],
      ['KOREA','Yakgwa','HONEYED HERITAGE','꿀 향이 머무는 다과','밀가루 반죽을 기름에 튀긴 뒤 조청이나 꿀 시럽에 적셔 만드는 한국 전통 약과. 은은한 생강 향을 더하기도 합니다.','밀가루 · 조청 · 참기름',C+'yakgwa.webp'],
    ]},

  ];
  let pageIndex=0;
  let transitionTimer=null;
  let lastPageChange=0;
  const escape = (v) => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(index) {
    const data=pages[index];
    grid.innerHTML=data.items.map((row,i)=>{
      const [country,dish,subtitle,short,story,ingredients,image]=row;
      const number=index*4+i+1;
      return `<button class="collection-editorial__card" type="button" aria-pressed="false" aria-label="${escape(country)} ${escape(dish)}: 카드 뒤집어 소개 보기">
        <span class="collection-editorial__card-inner">
          <span class="collection-editorial__face collection-editorial__front">
            <span class="collection-editorial__front-copy">
              <span class="collection-editorial__number">${String(number).padStart(2,'0')}</span>
              <span class="collection-editorial__country">${escape(country)}</span>
              <span class="collection-editorial__dish">${escape(dish)}</span>
              <span class="collection-editorial__short">${escape(short)}</span>
              <span class="collection-editorial__flipcue">FLIP FOR THE STORY &nbsp; ↗</span>
            </span>
            <span class="collection-editorial__photo-wrap"><img src="${escape(image)}" alt="${escape(dish)} 디저트 사진" loading="lazy" draggable="false"><span class="collection-editorial__photo-seal" aria-hidden="true">+</span></span>
          </span>
          <span class="collection-editorial__face collection-editorial__back">
            <span class="collection-editorial__back-top"><span>${escape(country)}</span><span>✳ &nbsp; ${String(number).padStart(2,'0')} / 08</span></span>
            <h3>${escape(dish)}</h3><p>${escape(story)}</p>
            <span class="collection-editorial__ingredients"><span><b>KEY INGREDIENTS</b>${escape(ingredients)}</span><span class="collection-editorial__back-arrow" aria-hidden="true">↶</span></span>
          </span>
        </span>
      </button>`;
    }).join('');
    nav.forEach((button,i)=>{
      const active=i===index;
      button.classList.toggle('is-current',active);
      if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
    });
  }
  function goTo(index) {
    if(index<0||index>=pages.length||index===pageIndex)return;
    if(transitionTimer)clearTimeout(transitionTimer);
    const direction=index>pageIndex?'next':'prev';
    grid.classList.remove('is-entering-next','is-entering-prev','is-exiting-next','is-exiting-prev');
    if(!reduced.matches)grid.classList.add('is-exiting-'+direction);
    const apply=()=>{
      pageIndex=index;render(index);
      grid.classList.remove('is-exiting-next','is-exiting-prev');
      if(!reduced.matches){grid.classList.add('is-entering-'+direction);transitionTimer=setTimeout(()=>grid.classList.remove('is-entering-next','is-entering-prev'),450);}
      else transitionTimer=null;
    };
    transitionTimer=setTimeout(apply,reduced.matches?0:205);
  }
  nav.forEach(button=>button.addEventListener('click',()=>goTo(Number(button.dataset.collectionPage))));
  section.querySelectorAll('[data-collection-direction]').forEach(button=>button.addEventListener('click',()=>goTo((pageIndex+Number(button.dataset.collectionDirection)+pages.length)%pages.length)));
  grid.addEventListener('click',event=>{
    const card=event.target.closest('.collection-editorial__card');
    if(!card||!grid.contains(card))return;
    const flipped=card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed',String(flipped));
    card.setAttribute('aria-label', flipped?'카드 앞면으로 돌아가기':'카드 뒤집어 소개 보기');
  });
  render(0);
})();

/* world-flight.js */
/* CON02 · interactive World Desserts radial flight map (no auto popup). */
(() => {
  'use strict';
  const root = document.querySelector('body.dessert-subpage #world.world-desserts');
  if (!root) return;
  const svgPath = root.querySelector('#worldActiveRoute');
  const plane = root.querySelector('#worldFlightPlane');
  const card = root.querySelector('#worldDessertCard');
  const photo = root.querySelector('#worldDessertPhoto');
  const region = root.querySelector('#worldDessertRegion');
  const title = root.querySelector('#worldDessertTitle');
  const description = root.querySelector('#worldDessertDescription');
  const status = root.querySelector('#worldTravelStatusText');
  const buttons = [...root.querySelectorAll('[data-world-country]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CX = 1309, CY = 378, WIDTH = 2240, HEIGHT = 843;
  const A = 'assets/hero/';
  const places = {
    usa: { name:'USA · NICARAGUA', title:'Tres Leches', desc:'세 가지 우유로 적신 촉촉한 케이크. 부드러운 크림과 달콤한 우유의 풍미가 어우러집니다.', img:A+'tres-leches.webp', x:936,y:170,cardX:43,cardY:68 },
    canada: { name:'CANADA', title:'Butter Tart', desc:'바삭한 타르트 안에 버터와 설탕의 달콤한 필링을 채운 캐나다의 전통 디저트.', img:A+'butter-tart.webp',x:1309,y:109,cardX:76,cardY:50 },
    mexico: { name:'MEXICO', title:'Churros', desc:'계피 설탕을 뿌린 바삭한 츄러스와 따뜻한 초콜릿 소스가 어울리는 간식.',img:A+'churros.webp',x:869,y:375,cardX:42,cardY:74 },
    brazil: { name:'BRAZIL', title:'Brigadeiro', desc:'연유와 코코아를 졸여 만든 진한 초콜릿 한 입. 브라질 축하 자리의 단골 간식.',img:A+'brigadeiro.webp',x:1058,y:584,cardX:39,cardY:44 },
    chile: { name:'CHILE', title:'Milhojas', desc:'얇은 페이스트리와 달콤한 둘세 데 레체를 겹겹이 쌓은 칠레의 레이어 디저트.',img:A+'milhojas.webp',x:1308,y:640,cardX:79,cardY:51 },
    china: { name:'CHINA', title:'Mooncake', desc:'중추절에 나누는 월병. 정교한 겉면 무늬 안에 연꽃씨나 다양한 소를 담습니다.',img:A+'mooncake.webp',x:1720,y:214,cardX:78,cardY:60 },
    'japan-korea': { name:'JAPAN · KOREA', title:'Wagashi & Yakgwa', desc:'계절을 빚은 일본 화과자와 꿀 향을 머금은 한국 약과. 두 나라의 다과 문화를 만나보세요.',img:A+'wagashi-yakgwa.webp',x:1618,y:587,cardX:75,cardY:44 }
  };
  let raf = 0;
  let token = 0;
  let animationStarted = 0;
  const precache = Object.values(places).map(place => { const i = new Image(); i.src=place.img; return i; });
  function curve(target) {
    const dx=target.x-CX,dy=target.y-CY;
    const distance=Math.hypot(dx,dy);
    const ux=dx/distance,uy=dy/distance;
    const sx=CX+ux*103,sy=CY+uy*103;
    const bend=Math.max(9,distance*.065);
    const qx=(sx+target.x)/2-uy*bend;
    const qy=(sy+target.y)/2+ux*bend;
    return `M${sx.toFixed(2)} ${sy.toFixed(2)} Q${qx.toFixed(2)} ${qy.toFixed(2)} ${target.x} ${target.y}`;
  }
  function showCard(data, id) {
    if (id!==token) return;
    region.textContent=data.name;
    title.textContent=data.title;
    description.textContent=data.desc;
    photo.src=data.img;
    photo.alt=`${data.title} 디저트 사진`;
    card.style.setProperty('--card-x',data.cardX+'%');
    card.style.setProperty('--card-y',data.cardY+'%');
    plane.classList.remove('is-flying');
    plane.style.display='';
    status.textContent=`ARRIVED · ${data.name}`;
    card.hidden=false;
    void card.offsetWidth; // Commit the invisible state so the arrival reveal animates.
    // Ensure the browser paints the initial position before revealing the card.
    requestAnimationFrame(() => { if (id===token) card.classList.add('is-visible'); });
  }
  function select(id) {
    const data=places[id];
    if (!data) return;
    token++;
    const myToken=token;
    cancelAnimationFrame(raf);
    card.classList.remove('is-visible');
    card.hidden=true;
    svgPath.classList.remove('is-visible');
    svgPath.setAttribute('d',curve(data));
    const length=svgPath.getTotalLength();
    svgPath.style.strokeDasharray=String(length);
    svgPath.style.strokeDashoffset=String(length);
    buttons.forEach(btn => {
      const active=btn.dataset.worldCountry===id;
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
    status.textContent=`FLYING TO ${data.name}`;
    const duration=reduceMotion.matches ? 0 : Math.min(1500,1050+Math.hypot(data.x-CX,data.y-CY)*.6);
    function putPlane(t) {
      const p=svgPath.getPointAtLength(length*t);
      const near=svgPath.getPointAtLength(Math.min(length,length*t+Math.max(1,length*.005)));
      const far=svgPath.getPointAtLength(Math.max(0,length*t-Math.max(1,length*.005)));
      const degrees=Math.atan2(near.y-far.y,near.x-far.x)*180/Math.PI+90;
      plane.style.left=`${p.x/WIDTH*100}%`;
      plane.style.top=`${p.y/HEIGHT*100}%`;
      plane.style.transform=`translate(-50%,-50%) rotate(${degrees}deg)`;
    }
    svgPath.classList.add('is-visible');
    if (duration===0) {
      svgPath.style.strokeDashoffset='0';
      showCard(data,myToken);
      return;
    }
    plane.classList.add('is-flying');
    animationStarted=performance.now();
    function step(now) {
      if (token!==myToken) return;
      const progress=Math.min(1,Math.max(0,(now-animationStarted)/duration));
      const eased=progress<.5 ? 4*progress**3 : 1-Math.pow(-2*progress+2,3)/2;
      svgPath.style.strokeDashoffset=String(length*(1-eased));
      putPlane(eased);
      if(progress<1) raf=requestAnimationFrame(step);
      else showCard(data,myToken);
    }
    raf=requestAnimationFrame(step);
  }
  buttons.forEach(button => button.addEventListener('click',()=>select(button.dataset.worldCountry)));
  root.querySelector('[data-world-start]')?.addEventListener('click',()=>select('mexico'));
  document.addEventListener('visibilitychange', () => { if(document.hidden && plane.classList.contains('is-flying')) {
    // Finish interrupted animation cleanly when tab changes.
    cancelAnimationFrame(raf);
    const selected=buttons.find(btn=>btn.classList.contains('is-active'))?.dataset.worldCountry;
    if(selected) {svgPath.style.strokeDashoffset='0';showCard(places[selected],token);}
  }});
})();

/* gallery-carousel.js */
/* CON03 / manual carousel: click side cards, arrows, pagination, drag/swipe. */
(()=>{
  'use strict';
  const root=document.querySelector('body.dessert-subpage #gallery.layer-showcase');
  if(!root) return;
  const cards=[...root.querySelectorAll('[data-gallery-card]')];
  const stage=root.querySelector('#galleryStage');
  const count=root.querySelector('#galleryCurrent');
  const caption=root.querySelector('#galleryCaption');
  const descriptions=[
    '일본과 한국의 고운 다과, 섬세하게 빚어낸 계절의 맛.',
    '과일의 산뜻함과 바삭한 크럼블이 겹겹이 만나는 디저트.',
    '촉촉한 케이크와 부드러운 크림, 딸기의 조화.',
    '바삭한 페이스트리와 진한 캐러멜 풍미의 달콤한 만남.',
    '초콜릿의 깊은 풍미를 한 입에 담은 브라질 디저트.'
  ];
  let active=2;let startX=null,startY=null,dragged=false,ignoreClickUntil=0;
  const wrap=n=>(n+cards.length)%cards.length;
  function activate(i){
    active=wrap(i);
    cards.forEach((card,j)=>{
      const raw=j-active;
      // Five photos always remain around the focal one, two on each side.
      const offset=((raw+cards.length+Math.floor(cards.length/2))%cards.length)-Math.floor(cards.length/2);
      card.dataset.position=String(offset);
      card.classList.toggle('is-current',offset===0);
      card.setAttribute('aria-current',offset===0?'true':'false');
      card.setAttribute('aria-label',card.querySelector('.layer-showcase__card-name').textContent+(offset===0?' 선택됨':', 가운데로 이동'));
    });
    count.textContent=String(active+1).padStart(2,'0');
    caption.textContent=descriptions[active];
  }
  root.querySelector('[data-gallery-prev]').addEventListener('click',()=>activate(active-1));
  root.querySelector('[data-gallery-next]').addEventListener('click',()=>activate(active+1));
  cards.forEach((card,i)=>card.addEventListener('click',()=>{
    if(Date.now()<ignoreClickUntil) return;
    activate(i===active ? active+1 : i);
  }));
  stage.addEventListener('keydown',e=>{
    if(e.target!==stage) return;
    if(e.key==='ArrowRight'){e.preventDefault();activate(active+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();activate(active-1);}
  });
  stage.addEventListener('pointerdown',e=>{
    if(e.button!==0 && e.pointerType==='mouse') return;
    startX=e.clientX;startY=e.clientY;dragged=false;
  });
  stage.addEventListener('pointermove',e=>{
    if(startX===null) return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(Math.abs(dx)>15 && Math.abs(dx)>Math.abs(dy)*1.1){dragged=true;stage.classList.add('is-dragging');}
  });
  function finish(e){
    if(startX===null)return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(dragged && Math.abs(dx)>48 && Math.abs(dx)>Math.abs(dy)*1.1){
      activate(active+(dx<0?1:-1));
      ignoreClickUntil=Date.now()+300;
      e.preventDefault();
    }
    startX=null;startY=null;dragged=false;stage.classList.remove('is-dragging');
  }
  stage.addEventListener('pointerup',finish);
  stage.addEventListener('pointercancel',()=>{startX=null;startY=null;dragged=false;stage.classList.remove('is-dragging');});
  window.addEventListener('blur',()=>{startX=null;startY=null;dragged=false;stage.classList.remove('is-dragging');});
  activate(2);
})();

/* fork-cursor.js */
/* Fork cursor: scoped to Dessert Lab subpage, never the team homepage. */
(() => {
  'use strict';
  const root=document.body;
  if (!root.classList.contains('dessert-subpage')) return;
  const fine=window.matchMedia('(pointer: fine) and (hover: hover)');
  const cursor=root.querySelector(':scope > .cursor');
  const image=cursor?.querySelector('img');
  if (!cursor || !image) return;
  let loaded=false;
  let pending=0;
  let x=-150, y=-150;
  function ready(){
    if (!fine.matches || !loaded) {
      root.classList.remove('has-fork-cursor');
      cursor.classList.remove('is-active');
      return;
    }
    root.classList.add('has-fork-cursor');
  }
  function show(){if(loaded && fine.matches) cursor.classList.add('is-active');}
  function hide(){cursor.classList.remove('is-active');}
  image.addEventListener('load',()=>{loaded=image.naturalWidth>0;ready();},{once:true});
  image.addEventListener('error',()=>{loaded=false;ready();},{once:true});
  if (image.complete) {loaded=image.naturalWidth>0;ready();}
  document.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse' || !loaded || !fine.matches) return;
    x=e.clientX;y=e.clientY;
    if(!pending) pending=requestAnimationFrame(()=>{
      cursor.style.left=x+'px';cursor.style.top=y+'px';pending=0;show();
    });
  },{passive:true});
  document.addEventListener('pointerout', e=>{if(!e.relatedTarget) hide();});
  window.addEventListener('blur',hide);
  fine.addEventListener?.('change',ready);
})();

/* Subpage-only TOP button + scroll-triggered reveal (no jQuery). */
(() => {
  'use strict';
  if (!document.body.classList.contains('dessert-subpage')) return;
  const topButton = document.querySelector('body.dessert-subpage > .top1');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (topButton) {
    const updateTopButton = () => {
      const show = window.scrollY > 360;
      topButton.classList.toggle('is-visible', show);
      topButton.setAttribute('aria-hidden', String(!show));
      topButton.tabIndex = show ? 0 : -1;
    };
    let scrollFrame = 0;
    window.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateTopButton();
      });
    }, {passive:true});
    window.addEventListener('resize', updateTopButton);
    topButton.addEventListener('click', () => {
      window.scrollTo({top:0,behavior:reduceMotion.matches?'instant':'smooth'});
    });
    updateTopButton();
  }

  // One-shot upward reveal per section, without affecting card transforms.
  const selectors = [
    '#collection .collection-editorial__heading',
    '#collection .collection-editorial__viewport',
    '#world .world-desserts__copy',
    '#gallery .layer-showcase__heading',
    '#gallery .layer-showcase__viewport',
    '#dispatch .sweet-dispatch__inner'
  ];
  const targets = selectors.map(selector => document.querySelector(selector)).filter(Boolean);
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  }, {rootMargin:'0px 0px -7% 0px', threshold:0.06});
  targets.forEach(target => {
    // Elements above the fold should never flash or disappear.
    const bounds = target.getBoundingClientRect();
    if (bounds.top >= window.innerHeight * 0.97) {
      target.classList.add('reveal-pending');
      observer.observe(target);
    }
  });
})();
