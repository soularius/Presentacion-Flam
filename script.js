const canvas = document.getElementById('sceneCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const person = document.getElementById('person');

const bgScene1 = new Image();
bgScene1.src = 'assets/img/escene_1/background.png';

const bgScene2 = new Image();
bgScene2.src = 'assets/img/escene_2/background.png';

const train = new Image();
train.src = 'assets/img/escene_2/tren.png';

const state = {
  w: 0,
  h: 0,
  scene: 1,
  progress: 0,
  running: false,
  pathVisible: false,
  trainX: -240,
  trainSpeed: 4,
  trainScale: 1,
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

function drawCoverImage(img) {
  if (!img.complete) {
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
    offsetY = (state.h - drawH) * 0.5;
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

function getPathPoint(t) {
  const p0 = { x: state.w * 0.14, y: state.h * 0.74 };
  const p1 = { x: state.w * 0.28, y: state.h * 0.23 };
  const p2 = { x: state.w * 0.64, y: state.h * 0.86 };
  const p3 = { x: state.w * 0.84, y: state.h * 0.36 };

  return {
    x: bezierPoint(t, p0.x, p1.x, p2.x, p3.x),
    y: bezierPoint(t, p0.y, p1.y, p2.y, p3.y),
  };
}

function drawTrajectory() {
  const p0 = { x: state.w * 0.14, y: state.h * 0.74 };
  const p1 = { x: state.w * 0.28, y: state.h * 0.23 };
  const p2 = { x: state.w * 0.64, y: state.h * 0.86 };
  const p3 = { x: state.w * 0.84, y: state.h * 0.36 };

  ctx.save();
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = 'rgba(255, 235, 170, 0.88)';
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  ctx.stroke();
  ctx.restore();
}

function drawMover() {
  const p = getPathPoint(state.progress);

  const glow = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, 20);
  glow.addColorStop(0, 'rgba(255, 255, 220, 1)');
  glow.addColorStop(0.5, 'rgba(255, 208, 101, 0.85)');
  glow.addColorStop(1, 'rgba(255, 208, 101, 0)');

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff8d3';
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawTrain() {
  if (!train.complete) {
    return;
  }

  const trainW = train.width * state.trainScale;
  const trainH = train.height * state.trainScale;
  const railY = state.h * 0.78;
  const trainY = railY - trainH;

  ctx.drawImage(train, state.trainX, trainY, trainW, trainH);

  state.trainX += state.trainSpeed;
  if (state.trainX > state.w + trainW) {
    state.trainX = -trainW;
  }
}

function activateScene2() {
  state.scene = 2;
  state.running = false;
  state.pathVisible = false;

  person.classList.add('hidden');
  startBtn.classList.add('hidden');

  const trainW = (train.width || 320) * state.trainScale;
  state.trainX = -trainW;
}

function render() {
  if (state.scene === 1) {
    drawCoverImage(bgScene1);

    if (state.pathVisible) {
      drawTrajectory();
      drawMover();
    }

    if (state.running) {
      state.progress += 0.005;

      if (state.progress >= 1) {
        state.progress = 1;
        activateScene2();
      }
    }
  } else {
    drawCoverImage(bgScene2);
    drawTrain();
  }

  requestAnimationFrame(render);
}

function startAnimation() {
  startBtn.classList.remove('pulse');
  void startBtn.offsetWidth;
  startBtn.classList.add('pulse');

  state.progress = 0;
  state.pathVisible = true;
  state.running = true;
}

window.addEventListener('resize', resizeCanvas);
startBtn.addEventListener('click', startAnimation);
bgScene1.addEventListener('load', () => {
  resizeCanvas();
});

resizeCanvas();
render();
