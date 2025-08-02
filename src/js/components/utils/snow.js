// snow.js - Versión optimizada y simplificada
class Snowfall {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.lastFrameTime = 0;
        this.frameRequestId = null;
        this.resizeObserver = null;

        this.canvas.style.transform = 'translateZ(0)';
        this.canvas.style.opacity = '0.9';

        this.init();
    }

    init() {
        this.setupCanvasSize();
        this.createSnowflakes(40);
        this.setupEventListeners();
        this.startAnimation();
    }

    setupCanvasSize() {
        this.width = Math.max(this.canvas.clientWidth, 10);
        this.height = Math.max(this.canvas.clientHeight, 10);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createSnowflakes(count) {
        this.snowflakes = Array.from({ length: count }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * -this.height,
            r: 1.5 + Math.random() * 2.5,
            speed: 0.5 + Math.random() * 1.5,
            sinFactor: 0.05 + Math.random() * 0.05,
            opacity: 0.7 + Math.random() * 0.3
        }));
    }

    setupEventListeners() {
        this.resizeObserver = new ResizeObserver(() => {
            this.setupCanvasSize();
            this.createSnowflakes(40);
        });
        this.resizeObserver.observe(this.canvas);
    }

    updateSnowflakes() {
        const now = performance.now();
        const deltaTime = Math.min(now - this.lastFrameTime, 100) / 1000;

        this.snowflakes.forEach(flake => {
            flake.y += flake.speed * deltaTime * 60;
            flake.x += Math.sin(flake.y * flake.sinFactor) * 0.8;

            if (flake.y > this.height) {
                flake.x = Math.random() * this.width;
                flake.y = -10;
            }
        });

        this.lastFrameTime = now;
    }

    drawSnowflakes() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.snowflakes.forEach(flake => {
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
            this.ctx.fill();
        });
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

// Función para inicializar la nieve con observación del DOM
function initSnowfallWithObserver() {
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY = 300;
    let attempts = 0;

    const tryInit = () => {
        const canvas = document.getElementById('snow-canvas');
        if (canvas) {
            new Snowfall(canvas);
            return true;
        }
        
        if (attempts < MAX_ATTEMPTS) {
            attempts++;
            setTimeout(tryInit, RETRY_DELAY);
            return false;
        }
        
        console.warn('No se encontró el canvas para el efecto de nieve después de varios intentos');
        return false;
    };

    // Observador de mutaciones como respaldo
    const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('snow-canvas')) {
            tryInit();
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Intento inicial
    tryInit();
}

// Exportar la función de inicialización
export function initializeSnowfall() {
    initSnowfallWithObserver();
}