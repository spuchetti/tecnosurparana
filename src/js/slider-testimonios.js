import { testimonios } from './testimonios.js';

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonios-track');
    
    // Limpiar cualquier contenido existente
    track.innerHTML = '';
    
    // Duplica los testimonios para efecto infinito suave
    const duplicatedTestimonios = [...testimonios, ...testimonios, ...testimonios];
    
    // Configuración CSS inicial para asegurar animación inmediata
    track.style.animation = 'none';
    track.style.opacity = '1';
    
    duplicatedTestimonios.forEach((testimonio, index) => {
        const card = document.createElement('div');
        card.className = 'testimonio-card';
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
        
        // Forzar renderizado inmediato
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Iniciar animación después de un breve retraso para asegurar que el DOM esté listo
    setTimeout(() => {
        track.style.animation = 'scroll 60s linear infinite';
        track.style.willChange = 'transform';
    }, 50);
    
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});