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
        // Esperar a que los estilos estén calculados
        setTimeout(() => {
            this.setCanvasSize();
            this.setupEventListeners();
            this.setupMenuObserver();
            this.initialized = true;
            
            // Forzar redibujado inicial
            this.forceRedraw();
        }, 100);
    }

    setCanvasSize() {
        const navbarHeight = this.navbar.offsetHeight;
        const navbarWidth = this.navbar.offsetWidth;
        const pixelRatio = window.devicePixelRatio || 1;
        
        this.snowCanvas.width = navbarWidth * pixelRatio;
        this.snowCanvas.height = navbarHeight * pixelRatio;
        this.snowCanvas.style.width = `${navbarWidth}px`;
        this.snowCanvas.style.height = `${navbarHeight}px`;
        
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    }

    forceRedraw() {
        // Disparar un evento personalizado para que snow.js redibuje
        const event = new CustomEvent('forceRedraw');
        window.dispatchEvent(event);
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
                mutations.forEach(() => {
                    this.setCanvasSize();
                    this.forceRedraw();
                });
            }).observe(navbarCollapse, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }

    handleResize() {
        if (this.initialized) {
            this.setCanvasSize();
            this.forceRedraw();
        }
    }

    handleMenuToggle() {
        setTimeout(() => {
            this.setCanvasSize();
            this.forceRedraw();
        }, 300); // Mayor retraso para animación de Bootstrap
    }
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que los recursos críticos estén listos
    if (document.readyState === 'complete') {
        new NavbarSnow();
    } else {
        window.addEventListener('load', () => new NavbarSnow());
    }
});