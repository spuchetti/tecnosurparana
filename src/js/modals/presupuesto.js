export class ModalPresupuesto {
    constructor() {
        this.modalId = 'modalPresupuesto';
        this.modalInstance = null;
        this.initialized = false;
        this.initModal();
    }

    async initModal() {
        if (this.initialized) return;

        // Esperar a que Bootstrap esté disponible
        if (typeof bootstrap === 'undefined') {
            await new Promise(resolve => {
                const checkBootstrap = setInterval(() => {
                    if (typeof bootstrap !== 'undefined') {
                        clearInterval(checkBootstrap);
                        resolve();
                    }
                }, 100);
            });
        }

        // Cargar template si no existe
        if (!document.getElementById(this.modalId)) {
            await this.loadModalTemplate();
        }

        this.setupEventListeners();
        this.initialized = true;
    }

    async loadModalTemplate() {
        try {
            const response = await fetch('src/partials/modal-presupuesto.html');
            if (!response.ok) throw new Error('Error al cargar el modal');
            const html = await response.text();

            // Insertar el modal al final del body
            const div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div.firstElementChild);
        } catch (error) {
            console.error('Error al cargar el modal:', error);
        }
    }

    setupEventListeners() {
        // Manejar todos los botones que deben abrir el modal
        ['btnPresupuesto', 'btnPresupuestoFooter'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showModal();
                });
            }
        });
    }

    showModal() {
        const modalElement = document.getElementById(this.modalId);
        if (!modalElement) {
            console.error('Modal element not found');
            return;
        }

        // Si ya existe una instancia, solo mostrarla
        if (this.modalInstance) {
            this.modalInstance.show();
            return;
        }

        // Crear nueva instancia
        this.modalInstance = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });

        // Configurar eventos de limpieza
        const cleanup = () => {
            this.cleanupModal();
        };

        modalElement.addEventListener('hidden.bs.modal', cleanup);

        modalElement.addEventListener('shown.bs.modal', () => {
            // Enfocar el primer campo al mostrar el modal
            const firstInput = modalElement.querySelector('input, textarea, select');
            if (firstInput) firstInput.focus();
        });

        this.modalInstance.show();
    }

    cleanupModal() {
        if (this.modalInstance) {
            // Limpiar eventos primero
            const modalElement = document.getElementById(this.modalId);
            if (modalElement) {
                modalElement.removeEventListener('hidden.bs.modal', this.cleanupModal);
                modalElement.removeEventListener('shown.bs.modal', this.cleanupModal);
            }

            // Eliminar la instancia
            this.modalInstance.dispose();
            this.modalInstance = null;
        }
    }

    hideModal() {
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }
}