const image = document.getElementById("base-image");
const canvas = document.getElementById("draw-layer");
const context = canvas.getContext("2d");

let drawing = false;
let lastPoint = { x: 0, y: 0 };

function configureCanvasSize() {
  const dpr = window.devicePixelRatio || 1;
  const width = image.clientWidth;
  const height = image.clientHeight;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.lineWidth = 4;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#ff3b30";
}

function toCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function onPointerDown(event) {
  drawing = true;
  lastPoint = toCanvasPoint(event);
  canvas.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!drawing) {
    return;
  }

  const point = toCanvasPoint(event);
  context.beginPath();
  context.moveTo(lastPoint.x, lastPoint.y);
  context.lineTo(point.x, point.y);
  context.stroke();
  lastPoint = point;
}

function onPointerUp(event) {
  drawing = false;
  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
}

canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);
canvas.addEventListener("pointercancel", onPointerUp);

if (image.complete) {
  configureCanvasSize();
} else {
  image.addEventListener("load", configureCanvasSize, { once: true });
}

window.addEventListener("resize", configureCanvasSize);
