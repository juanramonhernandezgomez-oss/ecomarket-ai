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
 * Valida contraseña (mínimo 6 caracteres)
 * @param {string} password
 * @returns {boolean}
 */
export function isValidPassword(password) {
    return password && password.length >= 6;
}

/**
 * Muestra una notificación flotante en pantalla. Usa textContent para evitar XSS.
 * @param {string} message
 * @param {'info'|'error'|'success'|'warning'} [type='info']
 * @param {number} [duration=5000]
 */
export function showNotification(message, type = 'info', duration = 5000) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    document.body.appendChild(notification);

    const remove = () => {
        if (notification.parentNode) {
            notification.classList.add('slide-out');
            setTimeout(() => notification.remove(), 300);
        }
    };

    notification.addEventListener('click', remove);
    if (duration > 0) setTimeout(remove, duration);
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
        }
    } catch (e) {
        console.warn('⚠️ localStorage error:', e.message);
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

// ============= DOM HELPERS =============

/**
 * QuerySelector shortcut
 * @param {string} selector
 * @returns {Element|null}
 */
export const $ = selector => document.querySelector(selector);

/**
 * getElementById shortcut
 * @param {string} id
 * @returns {Element|null}
 */
export const $id = id => document.getElementById(id);

// ============= UI STATE HELPERS =============

/**
 * Cambia el estado de un botón para mostrar que hay un proceso en curso
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 * @param {string} [text='⏳ Procesando...']
 */
export function setButtonLoading(button, loading, text = '⏳ Procesando...') {
    if (!button) return;
    if (loading) {
        button.dataset.originalText = button.textContent;
        button.textContent = text;
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
    } else {
        if (button.dataset.originalText) button.textContent = button.dataset.originalText;
        button.disabled = false;
        button.setAttribute('aria-busy', 'false');
    }
}

/**
 * Deshabilita un grupo de inputs
 * @param {HTMLFormElement} form
 * @param {boolean} disabled
 */
export function setFormDisabled(form, disabled) {
    if (!form) return;
    const inputs = form.querySelectorAll('input, button, select, textarea');
    inputs.forEach(input => input.disabled = disabled);
}

// ============= ERROR HANDLING =============

/**
 * Extrae mensaje de error más legible
 * @param {any} error
 * @returns {string}
 */
export function getErrorMessage(error) {
    if (error.message?.includes('duplicate') || error.code === '23505') {
        return 'Este email ya está registrado';
    }
    if (error.message?.includes('network')) {
        return 'Error de conexión. Verifica tu internet';
    }
    if (error.message?.includes('Invalid')) {
        return 'Credenciales inválidas';
    }
    return error.message || 'Error desconocido. Intenta de nuevo';
}

// ============= LOGGING (PRODUCTION-SAFE) =============

/**
 * Log de errores, solo para reporting
 * @param {string} context
 * @param {any} error
 */
export function logError(context, error) {
    if (process.env.NODE_ENV === 'development') {
        console.error(`[${context}]`, error);
    }
}

