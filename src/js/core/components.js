// components.js - Versión modificada
export class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
    }

    async loadComponent(componentName, targetElement = 'body', position = 'afterbegin') {
        if (this.loadedComponents.has(componentName)) return;

        try {
            // Corregimos la ruta para que funcione desde src/pages/index.html
            const response = await fetch(`../partials/${componentName}.html`);
            if (!response.ok) throw new Error(`Error loading ${componentName}`);
            const html = await response.text();
            
            const target = document.querySelector(targetElement);
            if (target) {
                target.insertAdjacentHTML(position, html);
                this.loadedComponents.add(componentName);
                console.log(`${componentName} loaded successfully`);
                return true;
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
            return false;
        }
    }

    async loadAllComponents() {
        try {
            await Promise.all([
                this.loadComponent('navbar', '#navbar-container'),
                this.loadComponent('footer', '#footer-container'),
                this.loadComponent('modal-presupuesto', 'body', 'beforeend')
            ]);
            
            // Solo inicializar el navbar (el modal se autoinicializa)
            this.initNavbar();
            return true;
        } catch (error) {
            console.error('Error loading components:', error);
            return false;
        }
    }

    initNavbar() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', () => {
                document.querySelector('.navbar-collapse').classList.toggle('show');
            });
        }
    }
}