// Copos de nieve animados en el navbar
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let snowflakes = [];

function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < 30; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 1.5 + Math.random() * 2.5,
            d: 1 + Math.random() * 1.5,
            speed: 0.5 + Math.random() * 1.2
        });
    }
}
createSnowflakes();

function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnowflakes();
}

function moveSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        f.y += f.speed;
        f.x += Math.sin(f.y / 20) * 0.6;
        if (f.y > height) {
            f.x = Math.random() * width;
            f.y = -5;
        }
    }
}

function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
}
animateSnow();