document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const pixelRatio = window.devicePixelRatio || 1;
    let animationFrameId = null;

    function init() {
        // Esperar un frame para asegurar que el navbar esté renderizado
        requestAnimationFrame(() => {
            resizeCanvas();
            createSnowflakes();
            animate();
            
            // Forzar redibujado inicial
            drawSnowflakes();
        });
    }

    function resizeCanvas() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Obtener dimensiones exactas del navbar
        const width = navbar.offsetWidth;
        const height = navbar.offsetHeight;
        
        // Ajustar canvas para alta densidad de píxeles
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        // Escalar el contexto para evitar distorsión
        ctx.scale(pixelRatio, pixelRatio);
    }

    function createSnowflakes() {
        const width = canvas.width / pixelRatio;
        const height = canvas.height / pixelRatio;
        
        snowflakes = Array.from({ length: 30 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 1.5 + Math.random() * 2.5,
            speed: 0.5 + Math.random() * 1.2,
            opacity: 0.8
        }));
    }

    function drawSnowflakes() {
        // Limpiar solo el área del navbar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();
        });
    }

    function moveSnowflakes() {
        const width = canvas.width / pixelRatio;
        const height = canvas.height / pixelRatio;
        
        snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += Math.sin(flake.y / 20) * 0.6;
            
            if (flake.y > height) {
                flake.x = Math.random() * width;
                flake.y = -10;
            }
        });
    }

    function animate() {
        moveSnowflakes();
        drawSnowflakes();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Manejar redimensionamiento con debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            createSnowflakes();
            drawSnowflakes();
        }, 100);
    });

    // Observar cambios en el navbar (para menú hamburguesa)
    const navbarObserver = new MutationObserver(() => {
        resizeCanvas();
        drawSnowflakes();
    });
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbarObserver.observe(navbar, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }

    // Inicialización mejorada
    document.fonts.ready.then(init).catch(init);
    
    // Limpieza al desmontar
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        navbarObserver.disconnect();
    };
});