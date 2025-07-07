/**
 * Controla la animación de nieve y su comportamiento con el menú hamburguesa
 * @file navbar-snow.js
 */

class NavbarSnow {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.snowCanvas = document.getElementById('snow-canvas');
        this.navbarToggler = document.querySelector('.navbar-toggler');
        this.initialized = false;
        
        if (this.snowCanvas && this.navbar) {
            this.init();
        }
    }

    init() {
        this.setCanvasSize();
        this.setupEventListeners();
        this.setupMenuObserver();
        this.initialized = true;
    }

    setCanvasSize() {
        const navbarHeight = this.navbar.offsetHeight;
        this.snowCanvas.style.height = `${navbarHeight}px`;
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
        
        // Asegurar proporción correcta de los copos
        const navbarWidth = this.navbar.offsetWidth;
        this.snowCanvas.width = navbarWidth * window.devicePixelRatio;
        this.snowCanvas.height = navbarHeight * window.devicePixelRatio;
        this.snowCanvas.style.width = `${navbarWidth}px`;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        if (this.navbarToggler) {
            this.navbarToggler.addEventListener('click', () => this.handleMenuToggle());
        }
    }

    setupMenuObserver() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            new MutationObserver((mutations) => {
                mutations.forEach(() => this.setCanvasSize());
            }).observe(navbarCollapse, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }

    handleResize() {
        if (this.initialized) {
            this.setCanvasSize();
        }
    }

    handleMenuToggle() {
        setTimeout(() => {
            this.setCanvasSize();
        }, 50); // Pequeño retraso para permitir la animación de Bootstrap
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new NavbarSnow();
});