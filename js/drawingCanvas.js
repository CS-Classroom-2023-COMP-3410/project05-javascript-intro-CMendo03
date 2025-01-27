const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const brushColorInput = document.getElementById('brush-color');
const brushSizeInput = document.getElementById('brush-size');
const canvasColorInput = document.getElementById('canvas-color');
const undoButton = document.getElementById('undo-button');
const clearButton = document.getElementById('clear-button');
const saveButton = document.getElementById('save-button');

// Set canvas dimensions to fit the available space
function resizeCanvas() {
    const canvasContainer = canvas.parentElement;
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = 500; // Fixed height for consistency
    redrawCanvas();
}

// Variables to track drawing state
let isDrawing = false;
let brushColor = brushColorInput.value;
let brushSize = brushSizeInput.value;
let strokes = [];
let currentStroke = [];

// Helper function to get the cursor position relative to the canvas
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    return { x, y };
}

// Start drawing
function startDrawing(event) {
    isDrawing = true;
    currentStroke = [];
}

// Draw on the canvas
function draw(event) {
    if (!isDrawing) return;

    const { x, y } = getCursorPosition(event);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    if (currentStroke.length === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        const [prevX, prevY] = currentStroke[currentStroke.length - 1];
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    currentStroke.push([x, y]);
}

// Stop drawing
function stopDrawing() {
    if (isDrawing) {
        strokes.push(currentStroke);
        isDrawing = false;
    }
}

// Undo the last stroke
function undoLastStroke() {
    strokes.pop();
    redrawCanvas();
}

// Clear the canvas
function clearCanvas() {
    strokes = [];
    redrawCanvas();
}

// Redraw the canvas, including all strokes
function redrawCanvas() {
    ctx.fillStyle = canvasColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokes.forEach(stroke => {
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;

        stroke.forEach(([x, y], index) => {
            if (index === 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        });
    });
}

// Save the canvas as an image
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

brushColorInput.addEventListener('input', () => (brushColor = brushColorInput.value));
brushSizeInput.addEventListener('input', () => (brushSize = brushSizeInput.value));
canvasColorInput.addEventListener('input', redrawCanvas);
undoButton.addEventListener('click', undoLastStroke);
clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveCanvas);

// Resize canvas on window resize and initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
