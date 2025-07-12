// snow.js - Versión ultra optimizada
class Snowfall {
    constructor() {
        this.canvas = document.getElementById('snow-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.lastFrameTime = 0;
        this.frameRequestId = null;
        this.resizeObserver = null;

        // Usar transform CSS para mejor rendimiento
        this.canvas.style.transform = 'translateZ(0)';

        this.init();
    }

    init() {
        this.setupCanvasSize();
        this.createSnowflakes(30);
        this.setupEventListeners();
        this.startAnimation();
    }

    setupCanvasSize() {
        // Usar clientWidth/clientHeight que son más ligeros que offsetWidth/offsetHeight
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createSnowflakes(count) {
        const flakes = [];
        for (let i = 0; i < count; i++) {
            flakes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: 1.5 + Math.random() * 2.5,
                speed: 0.5 + Math.random() * 1.2,
                // Precalcular valores constantes
                sinFactor: 0.05 + Math.random() * 0.02
            });
        }
        this.snowflakes = flakes;
    }

    setupEventListeners() {
        // Usar ResizeObserver con debounce nativo
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                if (width !== this.width || height !== this.height) {
                    this.width = width;
                    this.height = height;
                    this.canvas.width = width;
                    this.canvas.height = height;
                }
            }
        });
        this.resizeObserver.observe(this.canvas);
    }

    updateSnowflakes() {
        const now = performance.now();
        const deltaTime = Math.min(now - this.lastFrameTime, 100) / 1000; // Normalizar delta time

        for (let flake of this.snowflakes) {
            flake.y += flake.speed * deltaTime * 60; // Ajustar por delta time
            flake.x += Math.sin(flake.y * flake.sinFactor) * 0.6;

            if (flake.y > this.height) {
                flake.x = Math.random() * this.width;
                flake.y = -5;
            }
        }

        this.lastFrameTime = now;
    }

    drawSnowflakes() {
        // Usar path único para mejor rendimiento
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "rgba(255,255,255,0.85)";
        this.ctx.beginPath();

        for (let flake of this.snowflakes) {
            this.ctx.moveTo(flake.x + flake.r, flake.y);
            this.ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        }

        this.ctx.fill();
    }

    animate(timestamp) {
        this.updateSnowflakes();
        this.drawSnowflakes();
        this.frameRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    startAnimation() {
        if (!this.frameRequestId) {
            this.lastFrameTime = performance.now();
            this.frameRequestId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    stopAnimation() {
        if (this.frameRequestId) {
            cancelAnimationFrame(this.frameRequestId);
            this.frameRequestId = null;
        }
    }

    destroy() {
        this.stopAnimation();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}

// Inicialización optimizada con IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const snowfall = new Snowfall();

    // Pausar animación cuando no es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                snowfall.startAnimation();
            } else {
                snowfall.stopAnimation();
            }
        });
    }, { threshold: 0.1 });

    if (snowfall.canvas) {
        observer.observe(snowfall.canvas);
    }

    // Limpiar al salir de la página
    window.addEventListener('beforeunload', () => {
        snowfall.destroy();
    });
});