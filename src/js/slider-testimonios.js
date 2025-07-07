import { testimonios } from './testimonios.js';

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonios-track');

    // Duplica los testimonios para efecto infinito
    const duplicatedTestimonios = [...testimonios, ...testimonios];

    duplicatedTestimonios.forEach((testimonio) => {
        const card = document.createElement('div');
        card.className = 'testimonio-card card shadow-sm h-100 bg-white border-0';
        card.innerHTML = `
            <div class="card-body d-flex flex-column">
                <div class="mb-2 text-warning">
                    ${'<i class="bi bi-star-fill"></i>'.repeat(testimonio.estrellas)}
                </div>
                <p class="card-text">
                    <i class="bi bi-quote fs-3 text-primary me-2"></i>
                    ${testimonio.texto}
                </p>
                <div class="d-flex align-items-center mt-auto pt-1">
                    <img src="${testimonio.avatar}" alt="${testimonio.nombre}" 
                         class="rounded-circle me-2" style="width:48px; height:48px; object-fit:cover;">
                    <span class="fw-bold">${testimonio.nombre}</span>
                </div>
            </div>
        `;
        track.appendChild(card);
    });
});