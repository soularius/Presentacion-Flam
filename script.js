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
const menuBoard = document.getElementById('menuBoard');
const playVideoBtn  = document.getElementById('playVideoBtn');
const videoOverlay  = document.getElementById('videoOverlay');
const sceneVideo    = document.getElementById('sceneVideo');
const closeVideoBtn = document.getElementById('closeVideoBtn');

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
  if (state.scene === 71) activateScene(81);
  else if (state.scene === 72) activateScene(82);
}

function onGetOutClick() {
  if (state.scene === 81) {
    state.scene9Origin = 'camp';
    activateScene(9);
  } else if (state.scene === 82) {
    state.scene9Origin = 'hotel';
    activateScene(9);
  }
}

function onNextSpotClick() {
  if (state.scene === 9) activateScene(10);
  else if (state.scene === 11) activateScene(12);
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
bgScene72.src = 'assets/img/escene_7_2/background.png';

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

const imgScene1Fjords    = new Image();
imgScene1Fjords.src      = 'assets/img/escene_1/fjords.png';
const imgScene1Mountains = new Image();
imgScene1Mountains.src   = 'assets/img/escene_1/montains.png';
const imgScene1Trees     = new Image();
imgScene1Trees.src       = 'assets/img/escene_1/trees.png';
const imgScene1Trees2    = new Image();
imgScene1Trees2.src      = 'assets/img/escene_1/trees_2.png';

const PIE_SLICES = [
  { label: 'Fjords',    img: imgScene1Fjords,    color: '#1d5f8a', hover: '#2e7ab0' },
  { label: 'Mountains', img: imgScene1Mountains, color: '#4a3870', hover: '#6a509a' },
  { label: 'Trees',     img: imgScene1Trees,  img2: imgScene1Trees2, color: '#1e5e2a', hover: '#2e8040' },
];

const ANIM = {
  SPEED_S1:      0.005,
  SPEED_TRAIN:   0.0032,
  SPEED_FLAM:    0.0034,
  SPEED_CHOICE:  0.02,
  SPEED_WALK:    0.01,
  SPEED_BREWERY: 0.009,
  PULSE_TICK:    0.08,
  PULSE_CLICK:   { base: 18, amp: 3.8 },
  PULSE_HOLD5:   { base: 16, amp: 3.0 },
  PULSE_SIDE6:   { base: 13, amp: 1.2 },
  PULSE_CENTER6: { base: 17, amp: 2.8 },
  PULSE_REST:    { base: 15, amp: 2.6 },
  PULSE_NODE11:  { base: 15, amp: 2.8 },
  PIE_SPEED:     0.07,
};

const state = {
  // --- Canvas dimensions ---
  w: 0,
  h: 0,
  trainScale: 1,

  // --- Scene and animation ---
  scene: 0,
  running: false,
  scene1Progress: 0,
  scene2Progress: 0,
  scene4Progress: 0,
  scene5Progress: 0,
  scene5HoldTick: 0,
  scene6Progress: 0,
  scene6Choice: null,
  scene9Origin: null,
  scene9Progress: 0,
  scene10Progress: 0,
  scene11Progress: 0,
  scene12Progress: 0,
  scene1TapOpen:    false,
  scene1TapRadius:  0,
  scene1ActiveSlice: null,
  scene1ImageAlpha: 0,
  scene1TreesVariant: 0,
  scene1CartelDotX: -9999,
  scene1CartelDotY: -9999,
  pulseTick: 0,
  dashOffset: 0,
  prevBg: null,
  fadeAlpha: 1,
  labelAlpha: 0,

  // --- Visibility flags ---
  scene0Visible: true,
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
  scene11Visible: false,
  scene12Visible: false,

  // --- UI hover ---
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

function drawBgImage(img, alignBottom = false) {
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

function drawCoverImage(img, alignBottom = false) {
  ctx.clearRect(0, 0, state.w, state.h);
  if (state.prevBg && state.fadeAlpha < 1) {
    drawBgImage(state.prevBg);
    ctx.save();
    ctx.globalAlpha = state.fadeAlpha;
    drawBgImage(img, alignBottom);
    ctx.restore();
    state.fadeAlpha = Math.min(1, state.fadeAlpha + 0.045);
    if (state.fadeAlpha >= 1) state.prevBg = null;
    return;
  }
  drawBgImage(img, alignBottom);
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

const SCENE_PATHS = {
  1:  { type: 'bezier',  p: [[0.14,0.74],[0.28,0.23],[0.64,0.86],[0.84,0.36]] },
  2:  { type: 'bezier',  p: [[-0.12,0.79],[0.26,0.74],[0.64,0.8],[1.05,0.76]] },
  3:  { type: 'bezier',  p: [[0.2,0.77],[0.42,0.58],[0.58,0.66],[0.82,0.45]] },
  4:  { type: 'bezier',  p: [[0.18,0.72],[0.4,0.5],[0.63,0.68],[0.84,0.42]] },
  5:  { type: 'bezier',  p: [[0.2,0.74],[0.38,0.64],[0.6,0.7],[0.82,0.54]] },
  10: { type: 'bezier',  p: [[-0.1,0.78],[0.28,0.73],[0.62,0.80],[1.08,0.75]] },
  6:  { type: 'nodes',   center:[0.5,0.56], left:[0.22,0.62], right:[0.78,0.62] },
  9:  { type: 'bezier_origin',
        camp:  { p: [[0.26,0.76],[0.20,0.54],[0.44,0.38],[0.52,0.34]] },
        hotel: { p: [[0.74,0.76],[0.80,0.54],[0.60,0.38],[0.52,0.34]] } },
  11: { type: 'bezier',  p: [[0.28,0.65],[0.22,0.52],[0.56,0.44],[0.70,0.56]] },
  12: { type: 'bezier',  p: [[0.40,0.44],[0.52,0.20],[0.74,0.20],[0.86,0.38]] },
};

function resolvePath(id) {
  const d = SCENE_PATHS[id];
  const s = (rx, ry) => ({ x: state.w * rx, y: state.h * ry });
  if (d.type === 'bezier') {
    const [p0, p1, p2, p3] = d.p;
    return { p0: s(...p0), p1: s(...p1), p2: s(...p2), p3: s(...p3) };
  }
  if (d.type === 'nodes') {
    const out = {};
    for (const k of Object.keys(d)) { if (k !== 'type') out[k] = s(...d[k]); }
    return out;
  }
  // type === 'bezier_origin'
  const origin = state.scene9Origin || 'camp';
  const [p0, p1, p2, p3] = d[origin].p;
  return { p0: s(...p0), p1: s(...p1), p2: s(...p2), p3: s(...p3) };
}

const SCENE_BG = {
  0: bgScene0, 1: bgScene1, 2: bgScene2,  3: bgScene3,
  4: bgScene4, 5: bgScene5, 6: bgScene6,
  71: bgScene71, 72: bgScene72, 81: bgScene81, 82: bgScene82,
  9: bgScene9, 10: bgScene10, 11: bgScene11, 12: bgScene12,
};

const SCENE_CONFIG = {
  0: {
    running: false, show: ['scene0'], hide: ['scene1', 'scene12'],
    person: { src: personScene0, cls: 'scene-0' },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 'h', returnHomeBtn: 'h', restartBtn: 'h' },
    afterActivate: () => syncPrimaryButtons(),
  },
  1: {
    running: false, show: ['scene1'], hide: ['scene0'],
    resetProgress: ['scene1Progress', 'scene1TapRadius', 'scene1ImageAlpha', 'scene1TreesVariant'],
    resetNull: ['scene1TapOpen', 'scene1ActiveSlice'],
    person: { src: personScene1, cls: 'scene-1' },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 'h', returnHomeBtn: 'h', restartBtn: 'h' },
  },
  2: {
    running: true, show: ['scene2'], hide: ['scene1', 'scene81', 'scene82', 'scene9'],
    resetProgress: ['scene2Progress'],
    person: { hidden: true },
    buttons: { menuBoard: 'h', backBtn: 'h', getOutBtn: 'h', nextSpotBtn: 'h' },
  },
  3: {
    running: false, show: ['scene3'], hide: ['scene2'],
    buttons: { menuBoard: 'h' },
  },
  4: {
    running: true, show: ['scene4'], hide: ['scene3', 'scene5'],
    resetProgress: ['scene4Progress'],
    person: { src: personScene4, cls: 'scene-4' },
    buttons: { menuBoard: 'h' },
  },
  5: {
    running: false, show: ['scene5'], hide: ['scene4', 'scene6'],
    resetProgress: ['scene5Progress', 'scene5HoldTick'],
    person: { src: personScene5, cls: 'scene-5' },
    buttons: { menuBoard: 'h' },
  },
  6: {
    running: false, show: ['scene6'], hide: ['scene5', 'scene71', 'scene72', 'scene81', 'scene82', 'scene9'],
    resetProgress: ['scene6Progress'], resetNull: ['scene6Choice'],
    person: { src: personScene6, cls: 'scene-6' },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 'h' },
  },
  71: {
    running: false, show: ['scene71'], hide: ['scene6', 'scene72', 'scene81', 'scene82', 'scene9'],
    person: { src: personScene71, cls: 'scene-7-1' },
    buttons: { menuBoard: 'h', priceBoard: 's', priceBoardHotel: 'h', payBtn: 's', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 's', backBtnText: 'Back' },
  },
  72: {
    running: false, show: ['scene72'], hide: ['scene6', 'scene71', 'scene81', 'scene82', 'scene9'],
    person: { src: personScene72, cls: 'scene-7-2' },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 's', payBtn: 's', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 's', backBtnText: 'Exit' },
  },
  81: {
    running: false, show: ['scene81'], hide: ['scene71', 'scene82', 'scene72', 'scene9'],
    person: { src: personScene81, hidden: true },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 's',
               nextSpotBtn: 'h', backBtn: 's', backBtnText: 'Back' },
  },
  82: {
    running: false, show: ['scene82'], hide: ['scene72', 'scene81', 'scene71', 'scene9'],
    person: { src: personScene82, hidden: true },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 's',
               nextSpotBtn: 'h', backBtn: 's', backBtnText: 'Back' },
  },
  9: {
    running: false, show: ['scene9'], hide: ['scene71', 'scene72', 'scene81', 'scene82', 'scene10'],
    resetProgress: ['scene9Progress'],
    person: { hidden: true },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 's', backBtn: 'h' },
  },
  10: {
    running: true, show: ['scene10'], hide: ['scene71', 'scene72', 'scene81', 'scene82', 'scene9'],
    resetProgress: ['scene10Progress'],
    person: { hidden: true },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 'h' },
  },
  11: {
    running: false, show: ['scene11'], hide: ['scene10'],
    resetProgress: ['scene11Progress'], resetPulseTick: true,
    person: { hidden: true },
    buttons: { menuBoard: 'h', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 's', backBtn: 'h' },
  },
  12: {
    running: false, show: ['scene12'], hide: ['scene11'],
    resetProgress: ['scene12Progress'], resetPulseTick: true,
    person: { hidden: true },
    buttons: { menuBoard: 's', priceBoard: 'h', priceBoardHotel: 'h', payBtn: 'h', getOutBtn: 'h',
               nextSpotBtn: 'h', backBtn: 'h', returnHomeBtn: 's', restartBtn: 'h' },
  },
};

const BTN_MAP = { menuBoard, priceBoard, priceBoardHotel, payBtn, getOutBtn,
                  nextSpotBtn, backBtn, returnHomeBtn, restartBtn };

function setBtn(el, action, text) {
  if (!el) return;
  el.classList.toggle('hidden', action === 'h');
  if (text !== undefined) el.textContent = text;
}

function swapPerson(cfg) {
  if (!cfg) return;
  const wasVisible = !person.classList.contains('hidden');
  const srcChanges = cfg.src && !person.src.endsWith(cfg.src);

  const apply = () => {
    clearPersonSceneClasses();
    if (cfg.src) person.src = cfg.src;
    if (cfg.hidden) {
      person.classList.add('hidden');
    } else {
      person.classList.remove('hidden');
      if (cfg.cls) person.classList.add(cfg.cls);
    }
  };

  if (wasVisible && srcChanges) {
    person.classList.add('hidden');
    const onEnd = (e) => {
      if (e.propertyName !== 'opacity') return;
      person.removeEventListener('transitionend', onEnd);
      apply();
    };
    person.addEventListener('transitionend', onEnd);
  } else {
    apply();
  }
}

function closeVideo() {
  videoOverlay.classList.add('hidden');
  sceneVideo.pause();
  sceneVideo.currentTime = 0;
}

function activateScene(id) {
  const cfg = SCENE_CONFIG[id];
  if (!cfg) return;

  closeVideo();

  if (SCENE_BG[state.scene]) {
    state.prevBg   = SCENE_BG[state.scene];
    state.fadeAlpha = 0;
  }
  state.scene = id;
  state.running = cfg.running;
  (cfg.show || []).forEach(k => { state[k + 'Visible'] = true; });
  (cfg.hide || []).forEach(k => { state[k + 'Visible'] = false; });
  (cfg.resetProgress || []).forEach(k => { state[k] = 0; });
  (cfg.resetNull     || []).forEach(k => { state[k] = null; });
  if (cfg.resetPulseTick) state.pulseTick = 0;
  state.dashOffset = 0;
  state.labelAlpha = 0;

  swapPerson(cfg.person);

  const btns = cfg.buttons || {};
  for (const [name, action] of Object.entries(btns)) {
    if (name === 'backBtnText') continue;
    setBtn(BTN_MAP[name], action, name === 'backBtn' ? btns.backBtnText : undefined);
  }

  if (cfg.afterActivate) cfg.afterActivate();
}

function restartJourney() {
  sceneMenu.classList.add('hidden');
  activateScene(0);
}

function jumpToScene(target) {
  sceneMenu.classList.add('hidden');
  const t = Number(target);
  if (t === 9) state.scene9Origin = state.scene9Origin || 'camp';
  activateScene(t);
}

function getPathPoint(t, path) {
  return {
    x: bezierPoint(t, path.p0.x, path.p1.x, path.p2.x, path.p3.x),
    y: bezierPoint(t, path.p0.y, path.p1.y, path.p2.y, path.p3.y),
  };
}

function drawTrajectory(path, alpha = 1) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -state.dashOffset;
  ctx.strokeStyle = `rgba(255, 235, 170, ${(0.88 * alpha).toFixed(2)})`;
  ctx.beginPath();
  ctx.moveTo(path.p0.x, path.p0.y);
  ctx.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
  ctx.stroke();
  ctx.restore();
}

function drawTrajectoryProgress(path, t) {
  if (t <= 0) return;
  const N = 60;
  const count = Math.ceil(t * N);
  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -state.dashOffset;
  ctx.strokeStyle = 'rgba(255, 235, 170, 0.88)';
  ctx.beginPath();
  ctx.moveTo(path.p0.x, path.p0.y);
  for (let i = 1; i <= count; i++) {
    const pt = getPathPoint(Math.min(i / N, t), path);
    ctx.lineTo(pt.x, pt.y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawDashedSegment(from, to) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -state.dashOffset;
  ctx.strokeStyle = 'rgba(255, 235, 170, 0.88)';
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

function drawCenteredTitle(text) {
  const size = Math.max(16, Math.min(30, state.w * 0.022));
  ctx.save();
  ctx.globalAlpha = state.labelAlpha;
  ctx.font = `700 ${size}px Trebuchet MS`;
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillStyle = '#fff4d6';
  const w = ctx.measureText(text).width;
  ctx.strokeText(text, (state.w - w) * 0.5, state.h * 0.11);
  ctx.fillText(text,   (state.w - w) * 0.5, state.h * 0.11);
  ctx.restore();
}

function drawLabel(text, x, y) {
  ctx.save();
  ctx.globalAlpha = state.labelAlpha;
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


function syncPrimaryButtons() {
  if (state.scene === 0) {
    startBtn.textContent = 'Visit the Town of Flåm';
    startBtn.classList.remove('hidden');
    playVideoBtn.classList.remove('hidden');
    menuBtn.classList.remove('hidden');
    menuBtn.classList.remove('compact');
    menuBtn.textContent = '\u{1F4CD} Go to Scene';
    return;
  }

  playVideoBtn.classList.add('hidden');
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


function goBackToChoice() {
  if (state.scene === 71 || state.scene === 72) {
    activateScene(6);
  } else if (state.scene === 81) {
    activateScene(71);
  } else if (state.scene === 82) {
    activateScene(72);
  } else if (state.scene === 9) {
    activateScene(state.scene9Origin === 'hotel' ? 82 : 81);
  } else if (state.scene === 10) {
    activateScene(9);
  }
}

function isPointHit(point, radius, mouseX, mouseY) {
  const dx = mouseX - point.x;
  const dy = mouseY - point.y;
  return dx * dx + dy * dy <= radius * radius;
}

function getScene3ClickPoint() {
  return getPathPoint(0, resolvePath(3));
}

function getScene1SliceAtPoint(x, y) {
  const cx = state.w * 0.17, cy = state.h * 0.68;
  const maxR = Math.min(state.w, state.h) * 0.19;
  const dx = x - cx, dy = y - cy;
  if (dx * dx + dy * dy > maxR * maxR || dx * dx + dy * dy < 64) return -1;
  let angle = (Math.atan2(dy, dx) + Math.PI * 2.5) % (Math.PI * 2);
  return Math.floor(angle / (Math.PI * 2 / 3));
}

function drawScene1TapDot() {
  const cx = state.w * 0.17, cy = state.h * 0.68;
  state.pulseTick += ANIM.PULSE_TICK;
  const r = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;

  ctx.save();
  ctx.strokeStyle = `rgba(255,235,170,${0.28 + 0.18 * Math.sin(state.pulseTick * 0.7)})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(cx, cy, r + 18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  drawMover({ x: cx, y: cy }, r);
}

function drawScene1Pie(hoverSlice) {
  if (state.scene1TapRadius < 1) state.scene1TapRadius += ANIM.PIE_SPEED;
  const cx   = state.w * 0.17, cy = state.h * 0.68;
  const maxR = Math.min(state.w, state.h) * 0.19;
  const r    = maxR * Math.min(1, state.scene1TapRadius);
  const base = -Math.PI / 2;
  const arc  = (Math.PI * 2) / 3;

  PIE_SLICES.forEach((slice, i) => {
    const a0     = base + i * arc;
    const a1     = a0 + arc;
    const hot    = hoverSlice === i;
    const sliceR = hot ? r * 1.07 : r;

    // Image fill clipped to slice shape
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, sliceR, a0, a1);
    ctx.closePath();
    ctx.clip();

    if (slice.img.complete && slice.img.naturalWidth > 0) {
      // Cover-fill the slice area with the image
      const imgScale = Math.max(sliceR * 2.2 / slice.img.width, sliceR * 2.2 / slice.img.height);
      const dW = slice.img.width  * imgScale;
      const dH = slice.img.height * imgScale;
      ctx.filter = 'blur(6px)';
      ctx.drawImage(slice.img, cx - dW / 2, cy - dH / 2, dW, dH);
      ctx.filter = 'none';
      // Color tint overlay — lighter on hover
      ctx.globalAlpha = hot ? 0.18 : 0.38;
      ctx.fillStyle   = slice.color;
      ctx.fillRect(cx - sliceR - 2, cy - sliceR - 2, sliceR * 2 + 4, sliceR * 2 + 4);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = hot ? slice.hover : slice.color;
      ctx.fillRect(cx - sliceR - 2, cy - sliceR - 2, sliceR * 2 + 4, sliceR * 2 + 4);
    }
    ctx.restore();

    // Stroke border (drawn outside clip so it isn't masked)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, sliceR, a0, a1);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,235,170,0.55)';
    ctx.lineWidth   = 2;
    ctx.stroke();
    ctx.restore();

    if (r > 28) {
      const mid       = a0 + arc / 2;
      const lx        = cx + Math.cos(mid) * r * 0.62;
      const ly        = cy + Math.sin(mid) * r * 0.62;
      const textAlpha = Math.min(1, (r - 28) / 28);
      ctx.save();
      ctx.globalAlpha  = textAlpha;
      ctx.font         = `700 ${Math.max(11, Math.min(15, state.w * 0.012))}px Trebuchet MS`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle  = 'rgba(0,0,0,0.75)';
      ctx.lineWidth    = 4;
      ctx.strokeText(slice.label, lx, ly);
      ctx.fillStyle    = '#fff';
      ctx.fillText(slice.label, lx, ly);
      ctx.restore();
    }
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fillStyle   = '#111';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,235,170,0.7)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
}

function drawScene1Cartel(sliceIndex) {
  const slice      = PIE_SLICES[sliceIndex];
  const currentImg = (sliceIndex === 2 && state.scene1TreesVariant === 1 && slice.img2)
    ? slice.img2 : slice.img;

  state.scene1ImageAlpha = Math.min(1, state.scene1ImageAlpha + 0.05);
  const alpha = state.scene1ImageAlpha;

  ctx.save();
  ctx.globalAlpha = alpha * 0.68;
  ctx.fillStyle   = '#000';
  ctx.fillRect(0, 0, state.w, state.h);
  ctx.restore();

  if (!currentImg.complete || currentImg.naturalWidth === 0) return;

  const pad    = 22;
  const maxW   = state.w * 0.64;
  const maxH   = state.h * 0.56;
  const ratio  = currentImg.width / currentImg.height;
  let dW = maxW, dH = maxW / ratio;
  if (dH > maxH) { dH = maxH; dW = dH * ratio; }
  const imgX   = (state.w - dW) / 2;
  const imgY   = state.h * 0.09;
  const titleH = 50;

  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.fillStyle   = '#2e1606';
  ctx.strokeStyle = '#c49028';
  ctx.lineWidth   = 5;
  ctx.beginPath();
  ctx.roundRect(imgX - pad, imgY - pad, dW + pad * 2, dH + pad * 2 + titleH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.drawImage(currentImg, imgX, imgY, dW, dH);

  const fs = Math.max(14, Math.min(22, state.w * 0.018));
  ctx.font         = `700 ${fs}px Trebuchet MS`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle  = 'rgba(0,0,0,0.55)';
  ctx.lineWidth    = 3;
  ctx.fillStyle    = '#ffe5a0';
  const ty = imgY + dH + pad * 0.5 + titleH * 0.5;
  ctx.strokeText(slice.label, state.w / 2, ty);
  ctx.fillText(slice.label,   state.w / 2, ty);

  ctx.font      = `400 ${Math.max(10, Math.min(13, state.w * 0.01))}px Trebuchet MS`;
  ctx.fillStyle = 'rgba(255,235,170,0.5)';
  ctx.lineWidth = 0;
  ctx.fillText('click anywhere to close', state.w / 2, state.h * 0.95);

  ctx.restore();

  // Navigation dot — only on the Trees slice (has two images)
  if (sliceIndex === 2) {
    const dotX = imgX + dW - 26;
    const dotY = imgY + dH - 26;
    state.scene1CartelDotX = dotX;
    state.scene1CartelDotY = dotY;

    state.pulseTick += ANIM.PULSE_TICK;
    const pr = 11 + Math.sin(state.pulseTick * 1.1) * 2.5;

    // Ripple ring
    ctx.save();
    ctx.globalAlpha = alpha * (0.28 + 0.2 * Math.sin(state.pulseTick * 0.7));
    ctx.strokeStyle = 'rgba(160,255,160,0.85)';
    ctx.lineWidth   = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(dotX, dotY, pr + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Glow body
    ctx.save();
    ctx.globalAlpha = alpha;
    const glow = ctx.createRadialGradient(dotX, dotY, 2, dotX, dotY, pr);
    glow.addColorStop(0,   'rgba(220,255,220,1)');
    glow.addColorStop(0.5, 'rgba(120,240,120,0.85)');
    glow.addColorStop(1,   'rgba(60,180,60,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(dotX, dotY, pr, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e8ffe8';
    ctx.beginPath();
    ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function updateCursor() {
  if (state.scene === 1 && !state.running) {
    if (state.scene1ActiveSlice !== null) {
      canvas.style.cursor = 'pointer';
      return;
    }
    if (state.scene1TapOpen) {
      canvas.style.cursor = getScene1SliceAtPoint(state.hoverX, state.hoverY) >= 0
        ? 'pointer' : 'default';
      return;
    }
    const cx = state.w * 0.17, cy = state.h * 0.68;
    const r  = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;
    canvas.style.cursor = isPointHit({ x: cx, y: cy }, r + 18, state.hoverX, state.hoverY)
      ? 'pointer' : 'default';
    return;
  }

  if (state.scene === 3) {
    const p = getScene3ClickPoint();
    const pulseRadius = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;
    const hit = isPointHit(p, pulseRadius + 10, state.hoverX, state.hoverY);
    canvas.style.cursor = hit ? 'pointer' : 'default';
    return;
  }

  if (state.scene === 6 && !state.scene6Choice) {
    const nodes = resolvePath(6);
    const leftHit = isPointHit(nodes.left, 24, state.hoverX, state.hoverY);
    const rightHit = isPointHit(nodes.right, 24, state.hoverX, state.hoverY);
    canvas.style.cursor = leftHit || rightHit ? 'pointer' : 'default';
    return;
  }

  canvas.style.cursor = 'default';
}

function renderScene0() {
  drawCoverImage(bgScene0);
}

function renderScene1() {
  drawCoverImage(bgScene1);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(1);

  if (state.scene1Visible) {
    state.dashOffset += 0.3;
    drawTrajectory(path, 0.22);
    drawTrajectoryProgress(path, state.scene1Progress);
    drawLabel('Oslo', path.p0.x - 34, path.p0.y - 12);
    drawLabel('Myrdal mountain', path.p3.x - 120, path.p3.y - 12);
    drawMover(getPathPoint(state.scene1Progress, path), 20);
  }

  if (!state.running) {
    const hover = getScene1SliceAtPoint(state.hoverX, state.hoverY);
    if (state.scene1ActiveSlice !== null) {
      drawScene1Cartel(state.scene1ActiveSlice);
    } else if (state.scene1TapOpen) {
      drawScene1Pie(hover);
    } else {
      drawScene1TapDot();
    }
    updateCursor();
  }

  if (state.running) {
    state.scene1Progress += ANIM.SPEED_S1;
    if (state.scene1Progress >= 1) {
      state.scene1Progress = 1;
      activateScene(2);
    }
  }
}

function renderScene2() {
  drawCoverImage(bgScene2);
  const path = resolvePath(2);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene2Progress);

  const trainPoint = getPathPoint(state.scene2Progress, path);
  drawTrainOnPoint(trainPoint);
  drawMover(trainPoint, 14);

  if (state.running) {
    state.scene2Progress += ANIM.SPEED_TRAIN;
    if (state.scene2Progress >= 1) {
      state.scene2Progress = 1;
      activateScene(3);
    }
  }
}

function renderScene3() {
  drawCoverImage(bgScene3);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(3);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.45);
  drawLabel('Myrdal mountain', path.p0.x - 130, path.p0.y - 14);
  drawLabel('Flåm', path.p3.x - 85, path.p3.y - 14);

  state.pulseTick += ANIM.PULSE_TICK;
  const pulseRadius = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;
  drawMover(getPathPoint(0, path), pulseRadius);
  updateCursor();
}

function renderScene4() {
  drawCoverImage(bgScene4);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(4);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene4Progress);
  drawLabel('Myrdal mountain', path.p0.x - 130, path.p0.y - 14);
  drawLabel('Flåm', path.p3.x - 85, path.p3.y - 14);

  drawMover(getPathPoint(state.scene4Progress, path), 18);

  if (state.running) {
    state.scene4Progress += ANIM.SPEED_FLAM;
    if (state.scene4Progress >= 1) {
      state.scene4Progress = 1;
      activateScene(5);
    }
  }
  updateCursor();
}

function renderScene5() {
  drawCoverImage(bgScene5);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(5);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene5Progress);
  drawLabel('Train Station', path.p0.x - 88, path.p0.y - 16);
  drawLabel('Accommodation', path.p3.x - 95, path.p3.y - 16);

  state.pulseTick += ANIM.PULSE_TICK;
  let pointRadius = ANIM.PULSE_REST.base;
  let travelPoint = getPathPoint(state.scene5Progress, path);

  if (state.scene5Progress < 1) {
    state.scene5Progress += ANIM.SPEED_TRAIN;
    if (state.scene5Progress >= 1) state.scene5Progress = 1;
    travelPoint = getPathPoint(state.scene5Progress, path);
  } else {
    pointRadius = ANIM.PULSE_HOLD5.base + Math.sin(state.pulseTick) * ANIM.PULSE_HOLD5.amp;
    state.scene5HoldTick += 1;
    if (state.scene5HoldTick > 90) activateScene(6);
  }

  drawMover(travelPoint, pointRadius);
  updateCursor();
}

function renderScene6() {
  drawCoverImage(bgScene6);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const nodes = resolvePath(6);

  state.dashOffset += 0.3;
  drawDashedSegment(nodes.center, nodes.left);
  drawDashedSegment(nodes.center, nodes.right);
  drawLabel('Accommodation', nodes.center.x - 105, nodes.center.y - 22);
  drawLabel('Camp', nodes.left.x - 42, nodes.left.y + 42);
  drawLabel('Hotel', nodes.right.x - 30, nodes.right.y + 42);

  state.pulseTick += ANIM.PULSE_TICK;
  const sideRadius = ANIM.PULSE_SIDE6.base + Math.sin(state.pulseTick * 0.9) * ANIM.PULSE_SIDE6.amp;
  drawMover(nodes.left, sideRadius);
  drawMover(nodes.right, sideRadius);

  if (!state.scene6Choice) {
    const centerRadius = ANIM.PULSE_CENTER6.base + Math.sin(state.pulseTick) * ANIM.PULSE_CENTER6.amp;
    drawMover(nodes.center, centerRadius);
  } else {
    const target = state.scene6Choice === 'camp' ? nodes.left : nodes.right;
    if (state.scene6Progress < 1) {
      state.scene6Progress += ANIM.SPEED_CHOICE;
      if (state.scene6Progress > 1) state.scene6Progress = 1;
    }
    const travel = {
      x: nodes.center.x + (target.x - nodes.center.x) * state.scene6Progress,
      y: nodes.center.y + (target.y - nodes.center.y) * state.scene6Progress,
    };
    const travelRadius = state.scene6Progress >= 1
      ? ANIM.PULSE_REST.base + Math.sin(state.pulseTick) * ANIM.PULSE_REST.amp
      : ANIM.PULSE_REST.base;
    drawMover(travel, travelRadius);
    if (state.scene6Progress >= 1) {
      if (state.scene6Choice === 'camp') activateScene(71);
      else activateScene(72);
    }
  }
  updateCursor();
}

function renderScene71() {
  drawCoverImage(bgScene71);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawLabel('Reception - Camp', state.w * 0.36, state.h * 0.12);
}

function renderScene72() {
  drawCoverImage(bgScene72);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawLabel('Reception - Hotel', state.w * 0.36, state.h * 0.12);
}

function renderScene81() {
  drawCoverImage(bgScene81, true);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawLabel('Camp - Check In', state.w * 0.36, state.h * 0.12);
}

function renderScene82() {
  drawCoverImage(bgScene82);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawLabel('Hotel - Check In', state.w * 0.36, state.h * 0.12);
}

function renderScene9() {
  drawCoverImage(bgScene9);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(9);

  drawCenteredTitle('Thing to Do in Flam #1: Visit Brekkefossen Waterfall');
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene9Progress);
  drawLabel(state.scene9Origin === 'hotel' ? 'Hotel' : 'Camp', path.p0.x - 46, path.p0.y + 40);
  drawLabel('Brekkefossen Waterfall', path.p3.x - 136, path.p3.y - 14);

  if (state.scene9Progress < 1) {
    state.scene9Progress += ANIM.SPEED_WALK;
    if (state.scene9Progress > 1) state.scene9Progress = 1;
  }
  const moverPoint = getPathPoint(state.scene9Progress, path);
  const moverRadius = state.scene9Progress >= 1
    ? ANIM.PULSE_REST.base + Math.sin(state.pulseTick) * ANIM.PULSE_REST.amp
    : ANIM.PULSE_REST.base;
  state.pulseTick += ANIM.PULSE_TICK;
  drawMover(moverPoint, moverRadius);
}

function renderScene10() {
  drawCoverImage(bgScene10);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  const path = resolvePath(10);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene10Progress);

  drawCenteredTitle('Travel by Railway to the Flamsbana Museum');
  drawLabel('Brekkefossen Waterfall', path.p0.x + 30, path.p0.y - 18);
  drawLabel('Flamsbana Museum', path.p3.x - 175, path.p3.y - 18);

  const ferroPoint = getPathPoint(state.scene10Progress, path);
  drawFerrocarrilOnPoint(ferroPoint);
  drawMover(ferroPoint, 14);

  if (state.running) {
    state.scene10Progress += ANIM.SPEED_TRAIN;
    if (state.scene10Progress >= 1) {
      state.scene10Progress = 1;
      activateScene(11);
    }
  }
}

function renderScene11() {
  drawCoverImage(bgScene11);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawCenteredTitle('Thing to Do in Flam #2: Visit the Flamsbana Museum');

  const path = resolvePath(11);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene11Progress);
  drawLabel('Brekkefossen Waterfall', path.p0.x - 136, path.p0.y + 40);
  drawLabel('Flamsbana Museum', path.p3.x - 95, path.p3.y - 18);

  state.pulseTick += ANIM.PULSE_TICK;
  const pulseR = ANIM.PULSE_NODE11.base + Math.sin(state.pulseTick * 0.9) * ANIM.PULSE_NODE11.amp;
  drawMover(path.p0, pulseR);
  drawMover(path.p3, pulseR);

  if (state.scene11Progress < 1) {
    state.scene11Progress += ANIM.SPEED_WALK;
    if (state.scene11Progress > 1) state.scene11Progress = 1;
  }
  const mover = getPathPoint(state.scene11Progress, path);
  const moverR = state.scene11Progress >= 1
    ? ANIM.PULSE_REST.base + Math.sin(state.pulseTick) * ANIM.PULSE_REST.amp
    : ANIM.PULSE_REST.base;
  drawMover(mover, moverR);
}

function renderScene12() {
  drawCoverImage(bgScene12);
  state.labelAlpha = Math.min(1, state.labelAlpha + 0.04);
  drawCenteredTitle('Thing to Do in Flam #3: Eat at Ægir Microbrewery');

  const path = resolvePath(12);
  state.dashOffset += 0.3;
  drawTrajectory(path, 0.22);
  drawTrajectoryProgress(path, state.scene12Progress);
  drawLabel('Flamsbana Museum', path.p0.x - 98, path.p0.y - 16);
  drawLabel('Ægir Microbrewery', path.p3.x - 102, path.p3.y - 16);

  if (state.scene12Progress < 1) {
    state.scene12Progress += ANIM.SPEED_BREWERY;
    if (state.scene12Progress > 1) state.scene12Progress = 1;
  }
  const mover = getPathPoint(state.scene12Progress, path);
  state.pulseTick += ANIM.PULSE_TICK;
  const moverR = state.scene12Progress >= 1
    ? ANIM.PULSE_REST.base + Math.sin(state.pulseTick) * ANIM.PULSE_REST.amp
    : ANIM.PULSE_REST.base;
  drawMover(mover, moverR);
}

const SCENE_RENDERERS = {
  0: renderScene0, 1: renderScene1, 2: renderScene2, 3: renderScene3,
  4: renderScene4, 5: renderScene5, 6: renderScene6,
  71: renderScene71, 72: renderScene72, 81: renderScene81, 82: renderScene82,
  9: renderScene9, 10: renderScene10, 11: renderScene11, 12: renderScene12,
};

function render() {
  syncPrimaryButtons();
  (SCENE_RENDERERS[state.scene] || (() => drawCoverImage(bgScene1)))();
  requestAnimationFrame(render);
}

function startAnimation() {
  if (state.scene === 0) {
    activateScene(1);
    return;
  }

  if (state.scene !== 1 || state.running) {
    return;
  }

  startBtn.classList.remove('pulse');
  void startBtn.offsetWidth;
  startBtn.classList.add('pulse');

  state.running = true;
  swapPerson({ src: personScene1, cls: 'scene-1' });
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

  if (state.scene === 1 && !state.running) {
    if (state.scene1ActiveSlice !== null) {
      // Trees navigation dot — toggle between image 1 and 2
      if (state.scene1ActiveSlice === 2) {
        const dx = x - state.scene1CartelDotX;
        const dy = y - state.scene1CartelDotY;
        if (dx * dx + dy * dy <= 22 * 22) {
          state.scene1TreesVariant = state.scene1TreesVariant === 0 ? 1 : 0;
          state.scene1ImageAlpha   = 0;
          return;
        }
      }
      // Any other click closes the cartel
      state.scene1ActiveSlice = null;
      state.scene1ImageAlpha  = 0;
      return;
    }
    if (state.scene1TapOpen) {
      const s = getScene1SliceAtPoint(x, y);
      if (s >= 0) {
        state.scene1ActiveSlice = s;
        state.scene1ImageAlpha  = 0;
      } else {
        state.scene1TapOpen   = false;
        state.scene1TapRadius = 0;
      }
      return;
    }
    const cx = state.w * 0.17, cy = state.h * 0.68;
    const r  = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;
    if (isPointHit({ x: cx, y: cy }, r + 18, x, y)) {
      state.scene1TapOpen   = true;
      state.scene1TapRadius = 0;
    }
    return;
  }

  if (state.scene === 3) {
    const clickPoint = getScene3ClickPoint();
    const pulseRadius = ANIM.PULSE_CLICK.base + Math.sin(state.pulseTick) * ANIM.PULSE_CLICK.amp;

    if (isPointHit(clickPoint, pulseRadius + 10, x, y)) {
      activateScene(4);
    }
    return;
  }

  if (state.scene === 6 && !state.scene6Choice) {
    const nodes = resolvePath(6);
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
returnHomeBtn.addEventListener('click', () => activateScene(0));
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
playVideoBtn.addEventListener('click', () => {
  videoOverlay.classList.remove('hidden');
  sceneVideo.play();
});
closeVideoBtn.addEventListener('click', closeVideo);
videoOverlay.addEventListener('click', (e) => { if (e.target === videoOverlay) closeVideo(); });

bgScene1.addEventListener('load', () => {
  resizeCanvas();
});

function init() {
  resizeCanvas();
  updateMusicButtonLabel();
  activateScene(0);
  render();
}

if (bgScene0.complete && bgScene0.naturalWidth > 0) {
  init();
} else {
  bgScene0.addEventListener('load', init);
  bgScene0.addEventListener('error', init);
}
