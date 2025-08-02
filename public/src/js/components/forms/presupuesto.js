// presupuesto.js
export function initFormPresupuesto() {
  const checkModalExists = setInterval(() => {
    const form = document.getElementById('formPresupuesto');
    if (form) {
      clearInterval(checkModalExists);
      setupFormPresupuesto();
    }
  }, 100);

  function setupFormPresupuesto() {
    const form = document.getElementById('formPresupuesto');
    if (!form) return;

    const formAlert = document.getElementById('formAlert');
    const submitBtn = form.querySelector('button[type="submit"]');
    const spinner = submitBtn.querySelector('.spinner-border');

    function mostrarMensaje(tipo, mensaje) {
      formAlert.className = `alert alert-${tipo} mt-2`;
      formAlert.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="bi ${tipo === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>
          <span>${mensaje}</span>
        </div>
      `;
      formAlert.classList.remove('d-none');
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (tipo === 'success') {
        setTimeout(() => {
          formAlert.classList.add('d-none');
          // Usar la función exportada para cerrar el modal
          import('./components/modal-loader.js').then(({ hideModalPresupuesto }) => {
            hideModalPresupuesto();
          });
        }, 3000);
      } else {
        setTimeout(() => formAlert.classList.add('d-none'), 5000);
      }
    }

    // Validación en tiempo real
    form.addEventListener('input', function (e) {
      if (e.target.id === 'email' && e.target.value.trim() !== '') {
        if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          e.target.classList.add('is-invalid');
        } else {
          e.target.classList.remove('is-invalid');
        }
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Mostrar spinner y deshabilitar botón
      spinner.classList.remove('d-none');
      submitBtn.disabled = true;

      const nombre = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const email = document.getElementById('email').value.trim();
      const detalle = document.getElementById('detalle').value.trim();

      // Validación adicional
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mostrarMensaje('danger', '❌ El correo ingresado no es válido. Por favor, revisalo.');
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
        return;
      }

      const templateParams = {
        nombre,
        telefono,
        email,
        detalle,
        fecha: new Date().toLocaleString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      emailjs.send('service_8au336r', 'template_presupuesto', templateParams)
        .then(() => {
          mostrarMensaje('success', '✅ ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');
          form.reset();

          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              'event_category': 'contact',
              'event_label': 'presupuesto_form'
            });
          }
        })
        .catch((error) => {
          console.error('Error al enviar:', error);
          mostrarMensaje('danger', '❌ Hubo un error al enviar tu solicitud. Por favor, intentá nuevamente o contactanos por teléfono.');
        })
        .finally(() => {
          spinner.classList.add('d-none');
          submitBtn.disabled = false;
        });
    });

    // Resetear formulario cuando se cierra el modal
    document.getElementById('modalPresupuesto')?.addEventListener('hidden.bs.modal', function () {
      form.reset();
      formAlert.classList.add('d-none');
    });
  }
}

// Para mantener compatibilidad con la carga tradicional
if (typeof window !== 'undefined' && !window.isModuleEnvironment) {
  document.addEventListener('DOMContentLoaded', initFormPresupuesto);
}