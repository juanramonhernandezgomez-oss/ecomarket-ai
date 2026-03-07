// utils.js
// Funciones compartidas/utilitarias de la aplicación
// Exportan funciones puras para facilitar pruebas y mantenimiento

/**
 * Comprueba formato de correo electrónico válido
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Muestra una notificación flotante en pantalla. Usa textContent para evitar XSS.
 * @param {string} message
 * @param {'info'|'error'|'success'} [type]
 */
export function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // cerrar al hacer clic o tras 5s, con animación CSS
    notification.addEventListener('click', () => remove());

    // desaparecer automáticamente
    const remove = () => {
        notification.classList.add('slide-out');
        setTimeout(() => notification.remove(), 300);
    };

    setTimeout(remove, 5000);
}

/**
 * Guarda un objeto en localStorage bajo una clave prefijada
 * @param {string} email
 * @param {any} data
 */
export function saveToLocalStorage(email, data) {
    try {
        const existing = JSON.parse(localStorage.getItem('ecomarket_waitlist') || '[]');
        const emailExists = existing.some(entry => entry.email === email);
        if (!emailExists) {
            existing.push({ ...data, date: new Date().toISOString() });
            localStorage.setItem('ecomarket_waitlist', JSON.stringify(existing));
            console.debug('💾 Guardado en localStorage');
        }
    } catch (e) {
        console.warn('⚠️ No se pudo guardar en localStorage:', e);
    }
}

/**
 * Habilita desplazamiento suave para enlaces internos
 */
export function initSmoothScroll() {
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
 * Comprueba token y redirige si el usuario no está autorizado para la página actual
 */
export function checkAuthStatus() {
    const token = localStorage.getItem('ecomarket_token');
    const currentPage = window.location.pathname;

    if (currentPage.includes('dashboard.html') && !token) {
        window.location.href = 'login.html';
        return;
    }

    if ((currentPage.includes('login.html') || currentPage.includes('register.html')) && token) {
        window.location.href = 'dashboard.html';
        return;
    }
}

/// utilitarios DOM
export const $ = selector => document.querySelector(selector);
export const $id = id => document.getElementById(id);

/**
 * Cambia el estado de un botón para mostrar que hay un proceso en curso
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 * @param {string=} textTexto opcional para el estado de carga
 */
export function setButtonLoading(button, loading, text) {
    if (!button) return;
    if (loading) {
        button.dataset._orig = button.textContent;
        button.textContent = text || '⏳ Procesando...';
        button.disabled = true;
    } else {
        if (button.dataset._orig) button.textContent = button.dataset._orig;
        button.disabled = false;
    }
}
