document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonios-track');
    
    // Array de testimonios
    const testimonios = [
        {
            nombre: "Carlos G.",
            texto: "Excelente servicio, llegaron rápido y solucionaron el problema de mi aire acondicionado en menos de una hora. Muy profesionales!",
            estrellas: 5,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            nombre: "María L.",
            texto: "Repararon mi heladera el mismo día que llamé. El técnico fue muy amable y explicó todo claramente. Recomendable!",
            estrellas: 4,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            nombre: "Juan P.",
            texto: "El mejor servicio técnico de Paraná. Hace años que confío en ellos para el mantenimiento de todos mis equipos.",
            estrellas: 5,
            avatar: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            nombre: "Ana S.",
            texto: "Instalaron mi aire acondicionado nuevo con mucha prolijidad y cuidado. Precio justo y buena atención.",
            estrellas: 5,
            avatar: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
            nombre: "Roberto M.",
            texto: "Urgencia atendida a las 2 de la mañana. Salvó todos los alimentos de mi negocio. Gracias TecnoSur!",
            estrellas: 5,
            avatar: "https://randomuser.me/api/portraits/men/81.jpg"
        }
    ];
    
    // Limpiar cualquier contenido existente
    track.innerHTML = '';
    
    // Duplica los testimonios para efecto infinito suave
    const duplicatedTestimonios = [...testimonios, ...testimonios, ...testimonios];
    
    // Configuración CSS inicial
    track.style.width = 'auto';
    track.style.animation = 'none';
    track.style.opacity = '1';
    
    // Crear y agregar las cards de testimonios
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
    });
    
    // Calcular el ancho total necesario basado en el tamaño de pantalla
    const calculateTrackWidth = () => {
        const isMobile = window.innerWidth < 576;
        const cardCount = duplicatedTestimonios.length;
        const cardWidth = isMobile ? window.innerWidth * 0.75 : 300;
        const gap = isMobile ? 10 : 15;
        
        return `${cardCount * (cardWidth + gap)}px`;
    };
    
    // Aplicar el ancho calculado
    track.style.width = calculateTrackWidth();
    
    // Iniciar animación después de un breve retraso
    setTimeout(() => {
        const isMobile = window.innerWidth < 576;
        track.style.animation = `scroll ${isMobile ? '60s' : '90s'} linear infinite`;
        track.style.willChange = 'transform';
    }, 50);
    
    // Recalcular en redimensionamiento de pantalla
    window.addEventListener('resize', () => {
        track.style.width = calculateTrackWidth();
    });
    
    // Control de animación al interactuar
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Para dispositivos táctiles
    track.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    });
});