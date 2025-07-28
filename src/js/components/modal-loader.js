import { ModalPresupuesto } from './ModalPresupuesto.js';

let modalInstance = null;

export function initModalPresupuesto() {
    if (!modalInstance) {
        modalInstance = new ModalPresupuesto();
    }
    return modalInstance;
}

// Exportar función para cerrar el modal si es necesario
export function hideModalPresupuesto() {
    if (modalInstance) {
        modalInstance.hideModal();
    }
}