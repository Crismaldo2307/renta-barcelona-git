document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });
  }

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  const showError = (input, message) => {
    const errorEl = form.querySelector(`#error-${input.id}`);
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.setAttribute('aria-invalid', 'true');
  };

  const clearError = (input) => {
    const errorEl = form.querySelector(`#error-${input.id}`);
    if (errorEl) {
      errorEl.textContent = '';
    }
    input.removeAttribute('aria-invalid');
  };

  const validate = () => {
    let valid = true;

    if (nameInput && !nameInput.value.trim()) {
      showError(nameInput, 'Por favor, indica tu nombre.');
      valid = false;
    } else if (nameInput) {
      clearError(nameInput);
    }

    if (emailInput && !emailInput.value.trim()) {
      showError(emailInput, 'El correo electrónico es obligatorio.');
      valid = false;
    } else if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      showError(emailInput, 'Introduce un correo electrónico válido.');
      valid = false;
    } else if (emailInput) {
      clearError(emailInput);
    }

    if (messageInput && !messageInput.value.trim()) {
      showError(messageInput, 'Cuéntanos cómo podemos ayudarte.');
      valid = false;
    } else if (messageInput) {
      clearError(messageInput);
    }

    return valid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) {
      statusEl.textContent = 'Revisa los campos marcados para continuar.';
      return;
    }

    statusEl.textContent = 'Enviando…';

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      company: form.querySelector('#company')?.value || '',
      message: messageInput.value
    };

    const fallback = () => {
      const mailtoLink = `mailto:cmaldonadoa@student.eae.es?subject=${encodeURIComponent('Contacto desde Cristian y Alonso Data')}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company}\nMensaje: ${formData.message}`)}`;
      window.location.href = mailtoLink;
      statusEl.textContent = 'Tu cliente de correo se abrirá para completar el envío.';
    };

    if (typeof emailjs === 'undefined' || !emailjs.send) {
      fallback();
      return;
    }

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
      .then(() => {
        statusEl.textContent = '¡Mensaje enviado correctamente! Pronto nos pondremos en contacto.';
        form.reset();
      })
      .catch(() => {
        statusEl.textContent = 'No fue posible enviar el mensaje automáticamente. Te redirigiremos al correo.';
        fallback();
      });
  });
});
