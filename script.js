const canvas = document.getElementById('sceneCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const person = document.getElementById('person');

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

const personScene4 = 'assets/img/escene_4/person.png';
const personScene5 = 'assets/img/escene_5/person.png';
const personScene6 = 'assets/img/escene_6/persona.png';

const train = new Image();
train.src = 'assets/img/escene_2/tren.png';

const state = {
  w: 0,
  h: 0,
  scene: 1,
  scene1Progress: 0,
  scene2Progress: 0,
  scene4Progress: 0,
  scene5Progress: 0,
  scene5HoldTick: 0,
  scene6Progress: 0,
  scene6Choice: null,
  pulseTick: 0,
  running: false,
  scene1Visible: true,
  scene2Visible: false,
  scene3Visible: false,
  scene4Visible: false,
  scene5Visible: false,
  scene6Visible: false,
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

function activateScene2() {
  state.scene = 2;
  state.running = true;
  state.scene1Visible = false;
  state.scene2Visible = true;
  state.scene2Progress = 0;

  person.classList.remove('scene-4');
  person.classList.remove('scene-5');
  person.classList.remove('scene-6');
  person.classList.add('hidden');
  startBtn.classList.add('hidden');
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
  person.classList.remove('scene-5');
  person.classList.remove('scene-6');
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
  person.classList.remove('scene-4');
  person.classList.remove('scene-6');
  person.classList.remove('hidden');
  person.classList.add('scene-5');
}

function activateScene6() {
  state.scene = 6;
  state.running = false;
  state.scene5Visible = false;
  state.scene6Visible = true;
  state.scene6Progress = 0;
  state.scene6Choice = null;

  person.src = personScene6;
  person.classList.remove('scene-4');
  person.classList.remove('scene-5');
  person.classList.remove('hidden');
  person.classList.add('scene-6');
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
  if (state.scene === 1) {
    drawCoverImage(bgScene1);
    const path = getScene1Path();

    if (state.scene1Visible) {
      drawTrajectory(path);
      drawLabel('Start', path.p0.x - 34, path.p0.y - 12);
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
  } else {
    drawCoverImage(bgScene6);
    const nodes = getScene6Nodes();

    drawDashedSegment(nodes.center, nodes.left);
    drawDashedSegment(nodes.center, nodes.right);

    drawLabel('Accommodation', nodes.center.x - 105, nodes.center.y - 22);
    drawLabel('Campground', nodes.left.x - 70, nodes.left.y + 42);
    drawLabel('Hotel', nodes.right.x - 30, nodes.right.y + 42);

    state.pulseTick += 0.08;
    const sideRadius = 13 + Math.sin(state.pulseTick * 0.9) * 1.2;
    drawMover(nodes.left, sideRadius);
    drawMover(nodes.right, sideRadius);

    if (!state.scene6Choice) {
      const centerRadius = 17 + Math.sin(state.pulseTick) * 2.8;
      drawMover(nodes.center, centerRadius);
    } else {
      const target = state.scene6Choice === 'campground' ? nodes.left : nodes.right;
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
    }

    updateCursor();
  }

  requestAnimationFrame(render);
}

function startAnimation() {
  startBtn.classList.remove('pulse');
  void startBtn.offsetWidth;
  startBtn.classList.add('pulse');

  state.scene1Progress = 0;
  state.scene1Visible = true;
  state.running = true;
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
      state.scene6Choice = 'campground';
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
canvas.addEventListener('mousemove', onCanvasMove);
canvas.addEventListener('click', onCanvasClick);

bgScene1.addEventListener('load', () => {
  resizeCanvas();
});

resizeCanvas();
render();
