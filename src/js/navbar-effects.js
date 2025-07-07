// Configuración inicial de la nieve
function setupSnowCanvas() {
    const navbar = document.querySelector('.navbar');
    const snowCanvas = document.getElementById('snow-canvas');
    
    if (!navbar || !snowCanvas) return;

    // Actualizar altura del canvas
    const updateCanvasHeight = () => {
        const navbarHeight = navbar.offsetHeight + 'px';
        document.documentElement.style.setProperty('--navbar-height', navbarHeight);
        snowCanvas.style.height = navbarHeight;
    };

    // Observar cambios en el menú hamburguesa
    const setupMenuObserver = () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            new MutationObserver(updateCanvasHeight)
                .observe(navbarCollapse, { 
                    attributes: true, 
                    attributeFilter: ['class'] 
                });
        }
    };

    // Event listeners
    window.addEventListener('load', updateCanvasHeight);
    window.addEventListener('resize', updateCanvasHeight);
    setupMenuObserver();
}

// Inicialización
document.addEventListener('DOMContentLoaded', setupSnowCanvas);