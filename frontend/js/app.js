/**
 * ecomarket-ai - Aplicación Frontend
 * Radar Financiero Cognitivo
 * 
 * @author juanramonhernandezgomez-oss
 * @version 1.0.0
 */

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  
  // Inicializar componentes
  initWaitlistForm();
  initSmoothScroll();
  initAnalytics();
  
});

/**
 * Manejo del formulario de waitlist
 */
function initWaitlistForm() {
  const form = document.getElementById('waitlistForm');
  const successMessage = document.getElementById('successMessage');
  
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Validación básica
    if (!isValidEmail(email)) {
      showNotification('Por favor, introduce un email válido', 'error');
      return;
    }
    
    // Animación de carga
    button.textContent = '⏳ Procesando...';
    button.disabled = true;
    emailInput.disabled = true;
    
    try {
      // Aquí iría la llamada a tu backend o Formspree
      // Por ahora, simulamos éxito:
      
      // Guardar en localStorage para analytics básico
      const waitlistData = {
        email: email,
        date: new Date().toISOString(),
        source: 'landing_page',
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      };
      
      // Guardar localmente (después irá a tu BD)
      const existing = JSON.parse(localStorage.getItem('ecomarket_waitlist') || '[]');
      
      // Verificar si el email ya existe
      const emailExists = existing.some(entry => entry.email === email);
      
      if (emailExists) {
        showNotification('⚠️ Este email ya está registrado', 'warning');
        resetForm(button, emailInput, originalText);
        return;
      }
      
      existing.push(waitlistData);
      localStorage.setItem('ecomarket_waitlist', JSON.stringify(existing));
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar mensaje de éxito
      if (successMessage) {
        successMessage.classList.add('show');
        form.style.display = 'none';
      }
      
      // Analytics: evento personalizado
      if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_signup', {
          event_category: 'conversion',
          event_label: 'landing_page'
        });
      }
      
      console.log('✅ Nuevo registro en waitlist:', waitlistData);
      
    } catch (error) {
      console.error('❌ Error:', error);
      showNotification('❌ Error al registrar. Intenta de nuevo.', 'error');
      resetForm(button, emailInput, originalText);
    }
  });
}

/**
 * Validar email
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Resetear formulario
 */
function resetForm(button, input, originalText) {
  button.textContent = originalText;
  button.disabled = false;
  input.disabled = false;
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Estilos
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    backgroundColor: type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#10b981',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '1000',
    animation: 'slideIn 0.3s ease-out',
    cursor: 'pointer'
  });
  
  // Añadir al DOM
  document.body.appendChild(notification);
  
  // Click para cerrar
  notification.addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto-cerrar después de 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/**
 * Smooth scroll para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Inicializar analytics (placeholder)
 */
function initAnalytics() {
  // Aquí puedes integrar Plausible, Google Analytics, etc.
  console.log('📊 Analytics initialized');
}

/**
 * Utilidades adicionales
 */

// Detectar si es móvil
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Copiar al portapapeles
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('✅ Copiado al portapapeles', 'success');
    });
  } else {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('✅ Copiado al portapapeles', 'success');
  }
}

// Exportar funciones útiles
window.ecomarket = {
  copyToClipboard,
  isMobile,
  showNotification
};