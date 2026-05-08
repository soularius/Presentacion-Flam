const canvas = document.getElementById('sceneCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const person = document.getElementById('person');
const priceBoard = document.getElementById('priceBoard');
const priceBoardHotel = document.getElementById('priceBoardHotel');
const payBtn = document.getElementById('payBtn');
const coinContainer = document.getElementById('coinContainer');
const getOutBtn = document.getElementById('getOutBtn');
const nextSpotBtn = document.getElementById('nextSpotBtn');
const returnHomeBtn = document.getElementById('returnHomeBtn');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');
const musicBtn = document.getElementById('musicBtn');
const sceneMenu = document.getElementById('sceneMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

const bgMusic = new Audio('assets/sounds/music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.42;
bgMusic.muted = true;

let musicStarted = false;

function updateMusicButtonLabel() {
  const isMuted = bgMusic.muted || !musicStarted;
  musicBtn.textContent = isMuted ? '🔇' : '🔊';
  musicBtn.setAttribute('aria-label', isMuted ? 'Muted audio' : 'Audio on');
  musicBtn.title = isMuted ? 'Muted audio' : 'Audio on';
  musicBtn.classList.toggle('is-muted', isMuted);
  musicBtn.classList.toggle('is-unmuted', !isMuted);
}

function onMusicToggleClick() {
  if (!musicStarted) {
    musicStarted = true;
    bgMusic.play().catch(() => {
      musicStarted = false;
      updateMusicButtonLabel();
    });
  }

  bgMusic.muted = !bgMusic.muted;
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      // Ignore transient playback errors caused by browser policies.
    });
  }
  updateMusicButtonLabel();
}

function spawnCoins() {
  const count = 28;
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('span');
    coin.className = 'coin';
    coin.textContent = '€';
    const left = 5 + Math.random() * 90;
    const duration = 1.2 + Math.random() * 1.4;
    const delay = Math.random() * 0.9;
    const hue = Math.floor(Math.random() * 30);
    coin.style.left = left + '%';
    coin.style.animationDuration = duration + 's';
    coin.style.animationDelay = delay + 's';
    coin.style.color = `hsl(${42 + hue}, 100%, ${55 + hue}%)`;
    coinContainer.appendChild(coin);
    coin.addEventListener('animationend', () => coin.remove());
  }
}

function onPayClick() {
  spawnCoins();
  if (state.scene === 71) activateScene81();
  else if (state.scene === 72) activateScene82();
}

function onGetOutClick() {
  if (state.scene === 81) {
    activateScene9('camp');
  } else if (state.scene === 82) {
    activateScene9('hotel');
  }
}

function onNextSpotClick() {
  if (state.scene === 9) {
    activateScene10();
  } else if (state.scene === 11) {
    activateScene12();
  }
}

const bgScene1 = new Image();
bgScene1.src = 'assets/img/escene_1/background.png';

const bgScene2 = new Image();
bgScene2.src = 'assets/img/escene_2/background.png';

const bgScene3 = new Image();
bgScene3.src = 'assets/img/escene_3/background.jpg';

const bgScene4 = new Image();
bgScene4.src = 'assets/img/escene_4/background.jpg';

const bgScene5 = new Image();
bgScene5.src = 'assets/img/escene_5/background.jpg';

const bgScene6 = new Image();
bgScene6.src = 'assets/img/escene_6/background.jpg';

const bgScene71 = new Image();
bgScene71.src = 'assets/img/escene_7_1/background.jpg';

const bgScene72 = new Image();
bgScene72.src = 'assets/img/escene_7_2/background.jpg';

const bgScene81 = new Image();
bgScene81.src = 'assets/img/escene_8_1/background.png';

const bgScene82 = new Image();
bgScene82.src = 'assets/img/escene_8_2/background.png';

const bgScene9 = new Image();
bgScene9.src = 'assets/img/escene_9/background.png';

const bgScene10 = new Image();
bgScene10.src = 'assets/img/escene_10/background.png';

const ferrocarril10 = new Image();
ferrocarril10.src = 'assets/img/escene_10/ferrocarril.png';

const bgScene11 = new Image();
bgScene11.src = 'assets/img/escene_11/background.png';

const bgScene12 = new Image();
bgScene12.src = 'assets/img/escene_12/background.png';

const bgScene0 = new Image();
bgScene0.src = 'assets/img/escene_0/background.png';

const personScene0 = 'assets/img/escene_0/person.png';
const personScene1 = 'assets/img/escene_1/person.png';

const personScene4 = 'assets/img/escene_4/person.png';
const personScene5 = 'assets/img/escene_5/person.png';
const personScene6 = 'assets/img/escene_6/persona.png';
const personScene71 = 'assets/img/escene_7_1/person.png';
const personScene72 = 'assets/img/escene_7_2/person.png';
const personScene81 = personScene71;
const personScene82 = personScene72;

const train = new Image();
train.src = 'assets/img/escene_2/tren.png';

const state = {
  w: 0,
  h: 0,
  scene: 0,
  scene1Progress: 0,
  scene2Progress: 0,
  scene4Progress: 0,
  scene5Progress: 0,
  scene5HoldTick: 0,
  scene6Progress: 0,
  scene6Choice: null,
  pulseTick: 0,
  running: false,
  scene1Visible: false,
  scene2Visible: false,
  scene3Visible: false,
  scene4Visible: false,
  scene5Visible: false,
  scene6Visible: false,
  scene71Visible: false,
  scene72Visible: false,
  scene81Visible: false,
  scene82Visible: false,
  scene9Visible: false,
  scene10Visible: false,
  scene10Progress: 0,
  scene11Visible: false,
  scene11Progress: 0,
  scene12Visible: false,
  scene12Progress: 0,
  scene0Visible: true,
  scene9Origin: null,
  scene9Progress: 0,
  trainScale: 1,
  hoverX: -9999,
  hoverY: -9999,
};

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  state.w = rect.width;
  state.h = rect.height;
  state.trainScale = Math.max(0.4, Math.min(1.25, state.w / 1200));
}

function drawCoverImage(img, alignBottom = false) {
  ctx.clearRect(0, 0, state.w, state.h);

  if (!img.complete || img.naturalWidth === 0) {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, state.w, state.h);
    return;
  }

  const imgRatio = img.width / img.height;
  const canvasRatio = state.w / state.h;

  let drawW;
  let drawH;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > canvasRatio) {
    drawH = state.h;
    drawW = drawH * imgRatio;
    offsetX = (state.w - drawW) * 0.5;
  } else {
    drawW = state.w;
    drawH = drawW / imgRatio;
    offsetY = alignBottom ? (state.h - drawH) : (state.h - drawH) * 0.5;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

function bezierPoint(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  return (
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3
  );
}

function getScene1Path() {
  return {
    p0: { x: state.w * 0.14, y: state.h * 0.74 },
    p1: { x: state.w * 0.28, y: state.h * 0.23 },
    p2: { x: state.w * 0.64, y: state.h * 0.86 },
    p3: { x: state.w * 0.84, y: state.h * 0.36 },
  };
}

function getScene2Path() {
  return {
    p0: { x: state.w * -0.12, y: state.h * 0.79 },
    p1: { x: state.w * 0.26, y: state.h * 0.74 },
    p2: { x: state.w * 0.64, y: state.h * 0.8 },
    p3: { x: state.w * 1.05, y: state.h * 0.76 },
  };
}

function getScene3Path() {
  return {
    p0: { x: state.w * 0.2, y: state.h * 0.77 },
    p1: { x: state.w * 0.42, y: state.h * 0.58 },
    p2: { x: state.w * 0.58, y: state.h * 0.66 },
    p3: { x: state.w * 0.82, y: state.h * 0.45 },
  };
}

function getScene4Path() {
  return {
    p0: { x: state.w * 0.18, y: state.h * 0.72 },
    p1: { x: state.w * 0.4, y: state.h * 0.5 },
    p2: { x: state.w * 0.63, y: state.h * 0.68 },
    p3: { x: state.w * 0.84, y: state.h * 0.42 },
  };
}

function getScene5Path() {
  return {
    p0: { x: state.w * 0.2, y: state.h * 0.74 },
    p1: { x: state.w * 0.38, y: state.h * 0.64 },
    p2: { x: state.w * 0.6, y: state.h * 0.7 },
    p3: { x: state.w * 0.82, y: state.h * 0.54 },
  };
}

function getScene6Nodes() {
  return {
    center: { x: state.w * 0.5, y: state.h * 0.56 },
    left: { x: state.w * 0.22, y: state.h * 0.62 },
    right: { x: state.w * 0.78, y: state.h * 0.62 },
  };
}

function getScene9Nodes(origin) {
  return {
    start: origin === 'hotel'
      ? { x: state.w * 0.74, y: state.h * 0.76 }
      : { x: state.w * 0.26, y: state.h * 0.76 },
    end: { x: state.w * 0.52, y: state.h * 0.34 },
  };
}

function getScene10Path() {
  return {
    p0: { x: state.w * -0.10, y: state.h * 0.78 },
    p1: { x: state.w * 0.28, y: state.h * 0.73 },
    p2: { x: state.w * 0.62, y: state.h * 0.80 },
    p3: { x: state.w * 1.08, y: state.h * 0.75 },
  };
}

function getScene11Nodes() {
  return {
    waterfall: { x: state.w * 0.28, y: state.h * 0.52 },
    museum:    { x: state.w * 0.70, y: state.h * 0.36 },
  };
}

function getScene12Nodes() {
  return {
    museum: { x: state.w * 0.26, y: state.h * 0.58 },
    restaurant: { x: state.w * 0.74, y: state.h * 0.52 },
  };
}
  function activateScene9(origin) {
    state.scene = 9;
    state.running = false;
    state.scene71Visible = false;
    state.scene72Visible = false;
    state.scene81Visible = false;
    state.scene82Visible = false;
    state.scene9Visible = true;
    state.scene10Visible = false;
    state.scene9Origin = origin;
    state.scene9Progress = 0;

    clearPersonSceneClasses();
    person.classList.add('hidden');
    priceBoard.classList.add('hidden');
    priceBoardHotel.classList.add('hidden');
    payBtn.classList.add('hidden');
    getOutBtn.classList.add('hidden');
    nextSpotBtn.classList.remove('hidden');
    backBtn.classList.add('hidden');
  }

function activateScene10() {
  state.scene = 10;
  state.running = true;
  state.scene71Visible = false;
  state.scene72Visible = false;
  state.scene81Visible = false;
  state.scene82Visible = false;
  state.scene9Visible = false;
  state.scene10Visible = true;
  state.scene10Progress = 0;

  clearPersonSceneClasses();
  person.classList.add('hidden');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
}

function activateScene11() {
  state.scene = 11;
  state.running = false;
  state.scene10Visible = false;
  state.scene11Visible = true;
  state.scene11Progress = 0;
  state.pulseTick = 0;

  clearPersonSceneClasses();
  person.classList.add('hidden');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.remove('hidden');
  backBtn.classList.add('hidden');
}

function activateScene12() {
  state.scene = 12;
  state.running = false;
  state.scene11Visible = false;
  state.scene12Visible = true;
  state.scene12Progress = 0;
  state.pulseTick = 0;

  clearPersonSceneClasses();
  person.classList.add('hidden');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
  returnHomeBtn.classList.remove('hidden');
  restartBtn.classList.add('hidden');
}

function activateScene0() {
  state.scene = 0;
  state.running = false;
  state.scene1Visible = false;
  state.scene12Visible = false;
  state.scene0Visible = true;

  person.src = personScene0;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-0');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
  returnHomeBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');
  syncPrimaryButtons();
}

function restartJourney() {
  sceneMenu.classList.add('hidden');
  activateScene0();
}

function jumpToScene(target) {
  sceneMenu.classList.add('hidden');
  const t = Number(target);
  if (t === 1)  activateScene1Ready();
  else if (t === 3)  activateScene3();
  else if (t === 5)  activateScene5();
  else if (t === 6)  activateScene6();
  else if (t === 9)  activateScene9(state.scene9Origin || 'camp');
  else if (t === 11) activateScene11();
  else if (t === 12) activateScene12();
}

function getPathPoint(t, path) {
  return {
    x: bezierPoint(t, path.p0.x, path.p1.x, path.p2.x, path.p3.x),
    y: bezierPoint(t, path.p0.y, path.p1.y, path.p2.y, path.p3.y),
  };
}

function drawTrajectory(path) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = 'rgba(255, 235, 170, 0.88)';
  ctx.beginPath();
  ctx.moveTo(path.p0.x, path.p0.y);
  ctx.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
  ctx.stroke();
  ctx.restore();
}

function drawDashedSegment(from, to) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = 'rgba(255, 235, 170, 0.88)';
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

function drawLabel(text, x, y) {
  ctx.save();
  ctx.font = '700 26px Trebuchet MS';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillStyle = '#fff4d6';
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawMover(point, radius = 20) {
  const p = point;

  const glow = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, radius);
  glow.addColorStop(0, 'rgba(255, 255, 220, 1)');
  glow.addColorStop(0.5, 'rgba(255, 208, 101, 0.85)');
  glow.addColorStop(1, 'rgba(255, 208, 101, 0)');

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff8d3';
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawTrainOnPoint(point) {
  if (!train.complete) {
    return;
  }

  const trainW = train.width * state.trainScale;
  const trainH = train.height * state.trainScale;
  const trainX = point.x - trainW * 0.5;
  const trainY = point.y - trainH * 0.92;

  ctx.drawImage(train, trainX, trainY, trainW, trainH);
}

function drawFerrocarrilOnPoint(point) {
  if (!ferrocarril10.complete || ferrocarril10.naturalWidth === 0) {
    return;
  }

  const scale = Math.max(0.4, Math.min(1.25, state.w / 1200));
  const imgW = ferrocarril10.width * scale;
  const imgH = ferrocarril10.height * scale;
  const imgX = point.x - imgW * 0.5;
  const imgY = point.y - imgH * 0.92;

  ctx.drawImage(ferrocarril10, imgX, imgY, imgW, imgH);
}

function clearPersonSceneClasses() {
  person.classList.remove('scene-0');
  person.classList.remove('scene-1');
  person.classList.remove('scene-4');
  person.classList.remove('scene-5');
  person.classList.remove('scene-6');
  person.classList.remove('scene-7-1');
  person.classList.remove('scene-7-2');
  person.classList.remove('scene-8-1');
  person.classList.remove('scene-8-2');
}

function activateScene1Ready() {
  state.scene = 1;
  state.running = false;
  state.scene0Visible = false;
  state.scene1Visible = true;
  state.scene1Progress = 0;

  person.src = personScene1;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-1');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
  returnHomeBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');
}

function syncPrimaryButtons() {
  if (state.scene === 0) {
    startBtn.textContent = 'Visit the Town of Flåm';
    startBtn.classList.remove('hidden');
    menuBtn.classList.remove('hidden');
    menuBtn.classList.remove('compact');
    menuBtn.textContent = '\u{1F4CD} Go to Scene';
    return;
  }

  menuBtn.classList.remove('hidden');
  menuBtn.classList.add('compact');
  menuBtn.textContent = '\u{1F4CD}';

  if (state.scene === 1 && !state.running) {
    startBtn.textContent = 'Start';
    startBtn.classList.remove('hidden');
  } else {
    startBtn.classList.add('hidden');
  }
}

function activateScene2() {
  state.scene = 2;
  state.running = true;
  state.scene1Visible = false;
  state.scene2Visible = true;
  state.scene2Progress = 0;
  state.scene81Visible = false;
  state.scene82Visible = false;
  state.scene9Visible = false;

  clearPersonSceneClasses();
  person.classList.add('hidden');
  startBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
}

function activateScene3() {
  state.scene = 3;
  state.running = false;
  state.scene2Visible = false;
  state.scene3Visible = true;
}

function activateScene4() {
  state.scene = 4;
  state.running = true;
  state.scene3Visible = false;
  state.scene4Visible = true;
  state.scene5Visible = false;
  state.scene4Progress = 0;

  person.src = personScene4;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-4');
}

function activateScene5() {
  state.scene = 5;
  state.running = false;
  state.scene4Visible = false;
  state.scene5Visible = true;
  state.scene6Visible = false;
  state.scene5Progress = 0;
  state.scene5HoldTick = 0;

  person.src = personScene5;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-5');
}

function activateScene6() {
  state.scene = 6;
  state.running = false;
  state.scene5Visible = false;
  state.scene6Visible = true;
  state.scene71Visible = false;
  state.scene72Visible = false;
  state.scene81Visible = false;
  state.scene82Visible = false;
  state.scene9Visible = false;
  state.scene6Progress = 0;
  state.scene6Choice = null;

  person.src = personScene6;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-6');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.classList.add('hidden');
}

function activateScene71() {
  state.scene = 71;
  state.running = false;
  state.scene6Visible = false;
  state.scene71Visible = true;
  state.scene72Visible = false;
  state.scene81Visible = false;
  state.scene82Visible = false;
  state.scene9Visible = false;

  person.src = personScene71;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-7-1');
  priceBoard.classList.remove('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.remove('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.textContent = 'Back';
  backBtn.classList.remove('hidden');
}

function activateScene72() {
  state.scene = 72;
  state.running = false;
  state.scene6Visible = false;
  state.scene71Visible = false;
  state.scene72Visible = true;
  state.scene81Visible = false;
  state.scene82Visible = false;
  state.scene9Visible = false;

  person.src = personScene72;
  clearPersonSceneClasses();
  person.classList.remove('hidden');
  person.classList.add('scene-7-2');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.remove('hidden');
  payBtn.classList.remove('hidden');
  getOutBtn.classList.add('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.textContent = 'Exit';
  backBtn.classList.remove('hidden');
}

function activateScene81() {
  state.scene = 81;
  state.running = false;
  state.scene71Visible = false;
  state.scene81Visible = true;
  state.scene82Visible = false;
  state.scene72Visible = false;
  state.scene9Visible = false;

  person.src = personScene81;
  clearPersonSceneClasses();
  person.classList.add('hidden');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.remove('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.textContent = 'Back';
  backBtn.classList.remove('hidden');
}

function activateScene82() {
  state.scene = 82;
  state.running = false;
  state.scene72Visible = false;
  state.scene81Visible = false;
  state.scene82Visible = true;
  state.scene71Visible = false;
  state.scene9Visible = false;

  person.src = personScene82;
  clearPersonSceneClasses();
  person.classList.add('hidden');
  priceBoard.classList.add('hidden');
  priceBoardHotel.classList.add('hidden');
  payBtn.classList.add('hidden');
  getOutBtn.classList.remove('hidden');
  nextSpotBtn.classList.add('hidden');
  backBtn.textContent = 'Back';
  backBtn.classList.remove('hidden');
}

function goBackToChoice() {
  if (state.scene === 71 || state.scene === 72) {
    activateScene6();
  } else if (state.scene === 81) {
    activateScene71();
  } else if (state.scene === 82) {
    activateScene72();
  } else if (state.scene === 9) {
    if (state.scene9Origin === 'hotel') {
      activateScene82();
    } else {
      activateScene81();
    }
  } else if (state.scene === 10) {
    activateScene9(state.scene9Origin);
  }
}

function isPointHit(point, radius, mouseX, mouseY) {
  const dx = mouseX - point.x;
  const dy = mouseY - point.y;
  return dx * dx + dy * dy <= radius * radius;
}

function getScene3ClickPoint() {
  const path = getScene3Path();
  return getPathPoint(0, path);
}

function updateCursor() {
  if (state.scene === 3) {
    const p = getScene3ClickPoint();
    const pulseRadius = 18 + Math.sin(state.pulseTick) * 3.8;
    const hit = isPointHit(p, pulseRadius + 10, state.hoverX, state.hoverY);
    canvas.style.cursor = hit ? 'pointer' : 'default';
    return;
  }

  if (state.scene === 6 && !state.scene6Choice) {
    const nodes = getScene6Nodes();
    const leftHit = isPointHit(nodes.left, 24, state.hoverX, state.hoverY);
    const rightHit = isPointHit(nodes.right, 24, state.hoverX, state.hoverY);
    canvas.style.cursor = leftHit || rightHit ? 'pointer' : 'default';
    return;
  }

  canvas.style.cursor = 'default';
}

function render() {
  syncPrimaryButtons();

  if (state.scene === 1) {
    drawCoverImage(bgScene1);
    const path = getScene1Path();

    if (state.scene1Visible) {
      drawTrajectory(path);
      drawLabel('Oslo', path.p0.x - 34, path.p0.y - 12);
      drawLabel('Myrdal mountain', path.p3.x - 120, path.p3.y - 12);

      const point = getPathPoint(state.scene1Progress, path);
      drawMover(point, 20);
    }

    if (state.running) {
      state.scene1Progress += 0.005;

      if (state.scene1Progress >= 1) {
        state.scene1Progress = 1;
        activateScene2();
      }
    }
  } else if (state.scene === 2) {
    drawCoverImage(bgScene2);
    const path = getScene2Path();
    drawTrajectory(path);

    const trainPoint = getPathPoint(state.scene2Progress, path);
    drawTrainOnPoint(trainPoint);
    drawMover(trainPoint, 14);

    if (state.running) {
      state.scene2Progress += 0.0032;
      if (state.scene2Progress >= 1) {
        state.scene2Progress = 1;
        activateScene3();
      }
    }
  } else if (state.scene === 3) {
    drawCoverImage(bgScene3);
    const path = getScene3Path();
    drawTrajectory(path);
    drawLabel('Myrdal mountain', path.p0.x - 130, path.p0.y - 14);
    drawLabel('Flåm', path.p3.x - 85, path.p3.y - 14);

    state.pulseTick += 0.08;
    const pulseRadius = 18 + Math.sin(state.pulseTick) * 3.8;
    const clickPoint = getPathPoint(0, path);
    drawMover(clickPoint, pulseRadius);
    updateCursor();
  } else if (state.scene === 4) {
    drawCoverImage(bgScene4);
    const path = getScene4Path();
    drawTrajectory(path);
    drawLabel('Myrdal mountain', path.p0.x - 130, path.p0.y - 14);
    drawLabel('Flåm', path.p3.x - 85, path.p3.y - 14);

    const movingPoint = getPathPoint(state.scene4Progress, path);
    drawMover(movingPoint, 18);

    if (state.running) {
      state.scene4Progress += 0.0034;
      if (state.scene4Progress >= 1) {
        state.scene4Progress = 1;
        activateScene5();
      }
    }

    updateCursor();
  } else if (state.scene === 5) {
    drawCoverImage(bgScene5);
    const path = getScene5Path();
    drawTrajectory(path);
    drawLabel('Train Station', path.p0.x - 88, path.p0.y - 16);
    drawLabel('Accommodation', path.p3.x - 95, path.p3.y - 16);

    state.pulseTick += 0.08;
    let pointRadius = 16;
    let travelPoint = getPathPoint(state.scene5Progress, path);

    if (state.scene5Progress < 1) {
      state.scene5Progress += 0.0032;
      if (state.scene5Progress >= 1) {
        state.scene5Progress = 1;
      }
      travelPoint = getPathPoint(state.scene5Progress, path);
    } else {
      pointRadius = 16 + Math.sin(state.pulseTick) * 3;
      state.scene5HoldTick += 1;
      if (state.scene5HoldTick > 90) {
        activateScene6();
      }
    }

    drawMover(travelPoint, pointRadius);

    updateCursor();
  } else if (state.scene === 6) {
    drawCoverImage(bgScene6);
    const nodes = getScene6Nodes();

    drawDashedSegment(nodes.center, nodes.left);
    drawDashedSegment(nodes.center, nodes.right);

    drawLabel('Accommodation', nodes.center.x - 105, nodes.center.y - 22);
    drawLabel('Camp', nodes.left.x - 42, nodes.left.y + 42);
    drawLabel('Hotel', nodes.right.x - 30, nodes.right.y + 42);

    state.pulseTick += 0.08;
    const sideRadius = 13 + Math.sin(state.pulseTick * 0.9) * 1.2;
    drawMover(nodes.left, sideRadius);
    drawMover(nodes.right, sideRadius);

    if (!state.scene6Choice) {
      const centerRadius = 17 + Math.sin(state.pulseTick) * 2.8;
      drawMover(nodes.center, centerRadius);
    } else {
      const target = state.scene6Choice === 'camp' ? nodes.left : nodes.right;
      if (state.scene6Progress < 1) {
        state.scene6Progress += 0.02;
        if (state.scene6Progress > 1) {
          state.scene6Progress = 1;
        }
      }

      const travel = {
        x: nodes.center.x + (target.x - nodes.center.x) * state.scene6Progress,
        y: nodes.center.y + (target.y - nodes.center.y) * state.scene6Progress,
      };

      const travelRadius = state.scene6Progress >= 1
        ? 16 + Math.sin(state.pulseTick) * 2.6
        : 16;
      drawMover(travel, travelRadius);

      if (state.scene6Progress >= 1) {
        if (state.scene6Choice === 'camp') {
          activateScene71();
        } else {
          activateScene72();
        }
      }
    }

    updateCursor();
  } else if (state.scene === 71) {
    drawCoverImage(bgScene71);
    drawLabel('Reception - Camp', state.w * 0.36, state.h * 0.12);
  } else if (state.scene === 72) {
    drawCoverImage(bgScene72);
    drawLabel('Reception - Hotel', state.w * 0.36, state.h * 0.12);
  } else if (state.scene === 81) {
    drawCoverImage(bgScene81, true);
    drawLabel('Camp - Check In', state.w * 0.36, state.h * 0.12);
  } else if (state.scene === 82) {
    drawCoverImage(bgScene82);
    drawLabel('Hotel - Check In', state.w * 0.36, state.h * 0.12);
  } else if (state.scene === 9) {
    drawCoverImage(bgScene9);
    const origin = state.scene9Origin || 'camp';
    const nodes = getScene9Nodes(origin);

    const title = 'Thing to Do in Flam #1: Visit Brekkefossen Waterfall';
    const titleSize = Math.max(16, Math.min(30, state.w * 0.022));
    ctx.save();
    ctx.font = `700 ${titleSize}px Trebuchet MS`;
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillStyle = '#fff4d6';
    const textW = ctx.measureText(title).width;
    const tx = (state.w - textW) * 0.5;
    const ty = state.h * 0.11;
    ctx.strokeText(title, tx, ty);
    ctx.fillText(title, tx, ty);
    ctx.restore();

    drawDashedSegment(nodes.start, nodes.end);
    drawLabel(origin === 'hotel' ? 'Hotel' : 'Camp', nodes.start.x - 46, nodes.start.y + 40);
    drawLabel('Brekkefossen Waterfall', nodes.end.x - 136, nodes.end.y - 14);

    if (state.scene9Progress < 1) {
      state.scene9Progress += 0.01;
      if (state.scene9Progress > 1) {
        state.scene9Progress = 1;
      }
    }

    const moverPoint = {
      x: nodes.start.x + (nodes.end.x - nodes.start.x) * state.scene9Progress,
      y: nodes.start.y + (nodes.end.y - nodes.start.y) * state.scene9Progress,
    };

    const moverRadius = state.scene9Progress >= 1
      ? 15 + Math.sin(state.pulseTick) * 2.6
      : 15;
    state.pulseTick += 0.08;
    drawMover(moverPoint, moverRadius);
  } else if (state.scene === 10) {
    drawCoverImage(bgScene10);
    const path10 = getScene10Path();
    drawTrajectory(path10);

    const title10 = 'Travel by Railway to the Flamsbana Museum';
    const titleSize10 = Math.max(16, Math.min(30, state.w * 0.022));
    ctx.save();
    ctx.font = `700 ${titleSize10}px Trebuchet MS`;
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillStyle = '#fff4d6';
    const textW10 = ctx.measureText(title10).width;
    const tx10 = (state.w - textW10) * 0.5;
    const ty10 = state.h * 0.11;
    ctx.strokeText(title10, tx10, ty10);
    ctx.fillText(title10, tx10, ty10);
    ctx.restore();

    drawLabel('Brekkefossen Waterfall', path10.p0.x + 30, path10.p0.y - 18);
    drawLabel('Flamsbana Museum', path10.p3.x - 175, path10.p3.y - 18);

    const ferroPoint = getPathPoint(state.scene10Progress, path10);
    drawFerrocarrilOnPoint(ferroPoint);
    drawMover(ferroPoint, 14);

    if (state.running) {
      state.scene10Progress += 0.0032;
      if (state.scene10Progress >= 1) {
        state.scene10Progress = 1;
        activateScene11();
      }
    }
  } else if (state.scene === 11) {
    drawCoverImage(bgScene11);

    const title11 = 'Thing to Do in Flam #2: Visit the Flamsbana Museum';
    const titleSize11 = Math.max(16, Math.min(30, state.w * 0.022));
    ctx.save();
    ctx.font = `700 ${titleSize11}px Trebuchet MS`;
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillStyle = '#fff4d6';
    const textW11 = ctx.measureText(title11).width;
    const tx11 = (state.w - textW11) * 0.5;
    const ty11 = state.h * 0.11;
    ctx.strokeText(title11, tx11, ty11);
    ctx.fillText(title11, tx11, ty11);
    ctx.restore();

    const nodes11 = getScene11Nodes();
    drawDashedSegment(nodes11.waterfall, nodes11.museum);
    drawLabel('Brekkefossen Waterfall', nodes11.waterfall.x - 136, nodes11.waterfall.y + 40);
    drawLabel('Flamsbana Museum', nodes11.museum.x - 95, nodes11.museum.y - 18);

    state.pulseTick += 0.08;
    const pulseR11 = 15 + Math.sin(state.pulseTick * 0.9) * 2.8;
    drawMover(nodes11.waterfall, pulseR11);
    drawMover(nodes11.museum, pulseR11);

    if (state.scene11Progress < 1) {
      state.scene11Progress += 0.01;
      if (state.scene11Progress > 1) state.scene11Progress = 1;
    }
    const mover11 = {
      x: nodes11.waterfall.x + (nodes11.museum.x - nodes11.waterfall.x) * state.scene11Progress,
      y: nodes11.waterfall.y + (nodes11.museum.y - nodes11.waterfall.y) * state.scene11Progress,
    };
    const moverR11 = state.scene11Progress >= 1
      ? 15 + Math.sin(state.pulseTick) * 2.6
      : 15;
    drawMover(mover11, moverR11);
  } else if (state.scene === 0) {
    drawCoverImage(bgScene0);
  } else if (state.scene === 12) {
    drawCoverImage(bgScene12);

    const title12 = 'Thing to Do in Flam #3: Eat at Ægir Microbrewery';
    const titleSize12 = Math.max(16, Math.min(30, state.w * 0.022));
    ctx.save();
    ctx.font = `700 ${titleSize12}px Trebuchet MS`;
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillStyle = '#fff4d6';
    const textW12 = ctx.measureText(title12).width;
    const tx12 = (state.w - textW12) * 0.5;
    const ty12 = state.h * 0.11;
    ctx.strokeText(title12, tx12, ty12);
    ctx.fillText(title12, tx12, ty12);
    ctx.restore();

    const nodes12 = getScene12Nodes();
    drawDashedSegment(nodes12.museum, nodes12.restaurant);
    drawLabel('Flamsbana Museum', nodes12.museum.x - 98, nodes12.museum.y - 16);
    drawLabel('Ægir Microbrewery', nodes12.restaurant.x - 102, nodes12.restaurant.y - 16);

    if (state.scene12Progress < 1) {
      state.scene12Progress += 0.009;
      if (state.scene12Progress > 1) state.scene12Progress = 1;
    }

    const mover12 = {
      x: nodes12.museum.x + (nodes12.restaurant.x - nodes12.museum.x) * state.scene12Progress,
      y: nodes12.museum.y + (nodes12.restaurant.y - nodes12.museum.y) * state.scene12Progress,
    };

    state.pulseTick += 0.08;
    const moverR12 = state.scene12Progress >= 1
      ? 15 + Math.sin(state.pulseTick) * 2.6
      : 15;
    drawMover(mover12, moverR12);
  } else {
    drawCoverImage(bgScene1);
  }

  requestAnimationFrame(render);
}

function startAnimation() {
  if (state.scene === 0) {
    activateScene1Ready();
    return;
  }

  if (state.scene !== 1 || state.running) {
    return;
  }

  startBtn.classList.remove('pulse');
  void startBtn.offsetWidth;
  startBtn.classList.add('pulse');

  state.running = true;

  clearPersonSceneClasses();
  person.src = personScene1;
  person.classList.remove('hidden');
  person.classList.add('scene-1');
}

function onCanvasMove(event) {
  const rect = canvas.getBoundingClientRect();
  state.hoverX = event.clientX - rect.left;
  state.hoverY = event.clientY - rect.top;
}

function onCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (state.scene === 3) {
    const clickPoint = getScene3ClickPoint();
    const pulseRadius = 18 + Math.sin(state.pulseTick) * 3.8;

    if (isPointHit(clickPoint, pulseRadius + 10, x, y)) {
      activateScene4();
    }
    return;
  }

  if (state.scene === 6 && !state.scene6Choice) {
    const nodes = getScene6Nodes();
    if (isPointHit(nodes.left, 24, x, y)) {
      state.scene6Choice = 'camp';
      state.scene6Progress = 0;
      return;
    }

    if (isPointHit(nodes.right, 24, x, y)) {
      state.scene6Choice = 'hotel';
      state.scene6Progress = 0;
    }
  }
}

window.addEventListener('resize', resizeCanvas);
startBtn.addEventListener('click', startAnimation);
backBtn.addEventListener('click', goBackToChoice);
payBtn.addEventListener('click', onPayClick);
getOutBtn.addEventListener('click', onGetOutClick);
nextSpotBtn.addEventListener('click', onNextSpotClick);
returnHomeBtn.addEventListener('click', () => activateScene0());
restartBtn.addEventListener('click', restartJourney);
menuBtn.addEventListener('click', () => sceneMenu.classList.remove('hidden'));
musicBtn.addEventListener('click', onMusicToggleClick);
closeMenuBtn.addEventListener('click', () => sceneMenu.classList.add('hidden'));
sceneMenu.addEventListener('click', (e) => {
  if (e.target === sceneMenu) sceneMenu.classList.add('hidden');
});
document.querySelectorAll('.scene-menu__item').forEach((btn) => {
  btn.addEventListener('click', () => jumpToScene(btn.dataset.target));
});
canvas.addEventListener('mousemove', onCanvasMove);
canvas.addEventListener('click', onCanvasClick);

bgScene1.addEventListener('load', () => {
  resizeCanvas();
});

function init() {
  resizeCanvas();
  updateMusicButtonLabel();
  activateScene0();
  render();
}

if (bgScene0.complete && bgScene0.naturalWidth > 0) {
  init();
} else {
  bgScene0.addEventListener('load', init);
  bgScene0.addEventListener('error', init);
}
