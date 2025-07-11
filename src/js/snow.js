// snow.js optimizado
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let width = 0, height = 0;
let snowflakes = [];
let lastResizeTime = 0;
let lastFrameTime = performance.now();
const resizeThrottle = 200; // ms

// Función optimizada para manejar redimensionamiento
function handleResize() {
    const now = Date.now();
    if (now - lastResizeTime < resizeThrottle) return;
    
    lastResizeTime = now;
    const newWidth = canvas.offsetWidth;
    const newHeight = canvas.offsetHeight;
    
    // Solo actualizar si el tamaño realmente cambió
    if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        canvas.width = width;
        canvas.height = height;
        createSnowflakes();
    }
}

// Observador de mutaciones para cambios de tamaño más eficientes
const resizeObserver = new ResizeObserver(handleResize);
resizeObserver.observe(canvas);

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

function drawSnowflakes(timestamp) {
    // Control de FPS (limitar a ~60fps)
    const deltaTime = timestamp - lastFrameTime;
    if (deltaTime < 16) { // ~60fps
        requestAnimationFrame(drawSnowflakes);
        return;
    }
    lastFrameTime = timestamp;
    
    // Limpiar canvas de forma eficiente
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar todos los copos en una sola operación
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    
    for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }
    
    ctx.fill();
    moveSnowflakes();
    requestAnimationFrame(drawSnowflakes);
}

function moveSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];
        f.y += f.speed;
        f.x += Math.sin(f.y / 20) * 0.6;
        
        if (f.y > height) {
            f.x = Math.random() * width;
            f.y = -5;
        }
    }
}

// Inicialización optimizada
function initSnow() {
    handleResize(); // Tamaño inicial
    createSnowflakes();
    requestAnimationFrame(drawSnowflakes);
}

// Esperar a que el DOM esté listo
if (document.readyState === 'complete') {
    initSnow();
} else {
    window.addEventListener('load', initSnow);
}