document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const pixelRatio = window.devicePixelRatio || 1;

    function init() {
        resizeCanvas();
        createSnowflakes();
        animate();
    }

    function resizeCanvas() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const width = navbar.offsetWidth;
        const height = navbar.offsetHeight;
        
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(pixelRatio, pixelRatio);
    }

    function createSnowflakes() {
        const width = canvas.width / pixelRatio;
        const height = canvas.height / pixelRatio;
        
        snowflakes = Array.from({ length: 30 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 1.5 + Math.random() * 2.5,
            speed: 0.5 + Math.random() * 1.2
        }));
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
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
        requestAnimationFrame(animate);
    }

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
        resizeCanvas();
        createSnowflakes();
    });

    init();
});