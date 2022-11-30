"use strict";

const canvas = document.body.querySelector("canvas");
console.log(canvas);

const ctx = canvas.getContext("2d");

// //rectangles
// ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
// ctx.fillRect(100, 100, 100, 100);

// ctx.fillStyle = "rgba(255, 45, 5, 0.5)";
// ctx.fillRect(200, 200, 150, 150);

// ctx.fillStyle = "rgba(255, 69, 89, 0.5)";
// ctx.fillRect(300, 300, 200, 200);

// ctx.fillStyle = "rgba(69, 69, 69, 0.5)";
// ctx.fillRect(400, 400, 250, 250);

// //lines
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.strokeStyle = "#f233a3";
// ctx.lineTo(300, 100);

// ctx.strokeStyle = "#ba33a3";
// ctx.lineTo(400, 200);

// ctx.strokeStyle = "#dd33a3";
// ctx.lineTo(500, 300);
// ctx.stroke();

// //arc/circle
// ctx.beginPath();
// ctx.arc(600, 100, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// function createCircles(x) {
//   for (let i = 0; i < x; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     let randomColor = ((Math.random() * 0xffffff) << 0).toString(16);
//     ctx.strokeStyle = #${randomColor};
//     ctx.stroke();
//   }
// }

// createCircles(500);
// console.log((Math.random() * 0xffffff) << 0);

//circle obj
///animating
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
let mouse = {
  x: undefined,
  y: undefined,
};
let maxRadius = 40;
let minRadius = 2;

let clrArr = ["#014040", "#02735E", "#03A678", "#F27405", "#731702"];

let circleArr = [];
function init() {
  circleArr = [];
  for (let i = 0; i < 900; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 0.8;
    let dy = (Math.random() - 0.5) * 0.8;
    circleArr.push(new Circle(x, y, dx, dy, radius));
  }
}

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.randomFill = clrArr[Math.floor(Math.random() * clrArr.length)];
  let randomColor = ((Math.random() * 0xffffff) << 0).toString(16);

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = `#${randomColor}`;
    ctx.fillStyle = this.randomFill;
    ctx.fill();
    ctx.stroke();
  };
  this.update = function () {
    //if going offscreen
    if (this.x + radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + radius > innerWidth || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    //speed
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

//console.log(circleArr);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}
animate();
