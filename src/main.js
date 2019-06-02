import Paint from './modules/paint'

const container = document.querySelector('.container');

const instancePaint = new Paint();

const domChild = instancePaint.render();

container.appendChild(domChild);


/*
const canvas = document.querySelector('#id-canvas');
const context = canvas.getContext('2d');
let canvasPos;

const startBtn = document.querySelector('#id-start');
const clearBtn = document.querySelector('#id-clear');
const inputDisplay = document.querySelector('#input-display');    

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseout', onMouseOut);

startBtn.addEventListener('click', onStartClick);
clearBtn.addEventListener('click', onClearClick);

var downloadImage = function(data, filename) {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
};

function onStartClick() {
    console.log('ffffffffffffff');
    var downloadMime = 'image/octet-stream';
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    //document.location.href=image;
    downloadImage(image, 'image.bmp');

}
function onClearClick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function drawLine({posX, posY}) {
    context.fillStyle = '#AF5200'; // меняем цвет клеток
    context.beginPath();
    context.moveTo(startPointX, startPointY); // Начало линии 
    context.lineTo(posX, posY); // Узел линии  
    //context.closePath();
    context.stroke();
    startPointX = posX;
    startPointY = posY;
}

let startPointX = null;
let startPointY = null;
let isMouseDown = false;

function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    //console.log(box);
    return {
        left: Math.round(box.left),
        top: Math.round(box.top),
    }
}

function onMouseDown(event) {
    isMouseDown = true;
    canvasPos = getCoords(canvas);
    startPointX = event.clientX - canvasPos.left;
    startPointY = event.clientY - canvasPos.top;
}
function onMouseUp() {
    isMouseDown = false;
    startPointX = null;
    startPointY = null;
}
function onMouseOut() {
    isMouseDown = false;
}
function onMouseMove(event) {
    
    if (isMouseDown) {
        canvasPos = getCoords(canvas);
        inputDisplay.value = `${event.clientX} : ${event.clientY} / ${canvasPos.left} : ${canvasPos.top}`;
        const posX = event.clientX - canvasPos.left;
        const posY = event.clientY - canvasPos.top;
        drawLine({posX, posY});
    }
}
*/
