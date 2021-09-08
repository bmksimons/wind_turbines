/*This file contains all javascript code which enables the canvas picture to be drawn and contain user interaction*/

//global variables 
let turbine_circle;
let circleColour = "#CDDFF4";
let canvas  = document.getElementById("canvas");
let ctx;

if (canvas.getContext) {   
    ctx = canvas.getContext("2d");
} else {   
    console.log('Connection with the canvas API was failed'); 
}

function drawTriangle(x0, y0, x1, y1, x2, y2, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.fill();
}

function drawCircle(x_center, y_center, radius, color) {
    let circle = new Path2D();
    circle.arc(x_center, y_center, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill(circle);
    return circle;
}
 
function drawTurbine(x_center_cloud) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //cloud
    drawCircle(-115 + x_center_cloud, 250, 45, "white");
    drawCircle(-115 + x_center_cloud, 300, 45, "white");
    drawCircle(-55 + x_center_cloud, 310, 45, "white");
    drawCircle(-45 + x_center_cloud, 250, 45, "white");

    //gradient for the sea
    let gradient = ctx.createLinearGradient(0, 800, 1000, 750);
    gradient.addColorStop("0", "#99ccff");
    gradient.addColorStop("0.5" ,"#6699ff");
    gradient.addColorStop("1.0", "#3366ff");

    //the sea
    ctx.fillStyle = gradient
    ctx.beginPath();
    ctx.moveTo(582, 790);
    ctx.quadraticCurveTo(82, 790, 82, 740);
    ctx.quadraticCurveTo(82, 690, 582, 690);
    ctx.quadraticCurveTo(1082, 690, 1082, 740);
    ctx.quadraticCurveTo(1082, 790, 582, 790);
    ctx.fill(); 

    //the turbine stand
    drawTriangle(522, 690, 643, 690, 582, 300, "#3D4273");

    //left wing
    drawTriangle(552, 290, 566, 304, 442, 420, "#3D4273");

    //top wing
    drawTriangle(572, 250, 592, 250, 582, 100, "#3D4273");

    //right wing
    drawTriangle(612, 290, 598, 304, 732, 420, "#3D4273");

    //center of turbine
    turbine_circle = drawCircle(582, 280, 22, circleColour);

    //border around canvas
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.stroke();
}

//Event listener who makes the color of the center of the turbine change when it's clicked.
canvas.addEventListener('mousedown', function(event) {
    if (ctx.isPointInPath(turbine_circle, event.offsetX, event.offsetY)) {
        if (circleColour === "#CDDFF4") {
            circleColour = "#3D4273";
        } else if (circleColour === "#3D4273") {
            circleColour = "#CDDFF4";
        }
    }}, false);

let x = 0;

//Function that draw's the canvas over and over again
const draw = () => {
    ctx = canvas.getContext("2d");
    drawTurbine(x);
    //checks if the cloud has reached the end of the canvas. If so, the animation starts over. 
    if ((x - 155) > canvas.width) {
        x = 0;
    } else {
        x += 1;
    }
    requestAnimationFrame(draw);
} 
draw();