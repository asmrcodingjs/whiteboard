const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let currentColor = "black";
updateBgColor(currentColor);
let drawingHistory = [];

canvas.width = 900;
canvas.height = 600;

function startDrawing(event) {
  isDrawing = true;
  ctx.strokeStyle = currentColor;
  // update bg value (color)

  draw(event);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
  drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineWidth = 5;

  ctx.lineCap = "round";

  ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function changeColorEvent(event) {
  changeColor(event.style.backgroundColor);
}

function changeColor(color) {
  currentColor = color;
  ctx.strokeStyle = currentColor;
  updateActivebutton(currentColor);
  updateBgColor(currentColor);
}

function updateActivebutton(color) {}

function updateBgColor(color) {
  document.getElementById("bg").style.background = color;
}

function undoHandling() {
  if (drawingHistory.length > 1) {
    ctx.putImageData(drawingHistory[drawingHistory.length - 2], 0, 0);
    drawingHistory.pop();
  } else {
    clearBoard();
  }
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingHistory = [];
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
document
  .getElementById("customColorInput")
  .addEventListener("input", function () {
    const color = this.value;
    changeColor(color);
  });

document.getElementById("undo").addEventListener("click", undoHandling);
document.getElementById("clear").addEventListener("click", clearBoard);
