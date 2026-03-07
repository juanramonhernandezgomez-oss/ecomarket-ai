/**
 * app.js
 * Lógica general de la aplicación ecomarket-ai
 * Usa la conexión centralizada desde supabase-client.js
 * @version 1.2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ ecomarket-ai app loaded');
    
    // Verificar que la conexión esté disponible
    if (!window.supabaseClient) {
        console.error('❌ No hay conexión a BD disponible. Revisa supabase-client.js');
        return;
    }
    
    initWaitlistForm();
    initSmoothScroll();
    checkAuthStatus();
});

/**
 * Manejo del formulario de waitlist
 */
function initWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    if (!form) {
        console.log('⚠️ No se encontró el formulario waitlistForm');
        return;
    }
    
    console.log('✅ Formulario waitlist encontrado');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const successMessage = document.getElementById('successMessage');
        
        console.log('📧 Email a registrar:', email);
        
        // Validación básica de email
        if (!email || !isValidEmail(email)) {
            showNotification('Por favor, introduce un email válido', 'error');
            return;
        }
        
        // Animación de carga
        button.textContent = '⏳ Procesando...';
        button.disabled = true;
        emailInput.disabled = true;
        
        try {
            const waitlistData = {
                email: email,
                source: 'landing_page',
                user_agent: navigator.userAgent,
                ip_hash: 'anonymous_' + Date.now(),
                status: 'pending'
            };
            
            console.log('📤 Enviando a Supabase:', waitlistData);
            
            // USAR window.supabaseClient (conexión centralizada)
            const { data, error } = await window.supabaseClient
                .from('waitlist')
                .insert([waitlistData])
                .select();
            
            if (error) {
                console.error('❌ Error de Supabase:', error);
                throw error;
            }
            
            console.log('✅ Registrado correctamente:', data);
            
            // Guardar en localStorage como backup
            saveToLocalStorage(email, waitlistData);
            
            // Mostrar mensaje de éxito
            if (successMessage) {
                successMessage.classList.add('show');
                form.style.display = 'none';
            } else {
                showNotification('✅ ¡Bienvenido a bordo! Te hemos añadido a la lista de espera.', 'success');
            }
            
            // Event para analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    event_category: 'conversion',
                    event_label: 'landing_page',
                    value: 1
                });
            }
            
        } catch (error) {
            console.error('❌ Error completo:', error);
            
            let message = 'Error al registrar. Intenta de nuevo.';
            
            if (error.code === '23505' || error.message?.includes('duplicate')) {
                message = '⚠️ Este email ya está registrado';
            } else if (error.message?.includes('network')) {
                message = '❌ Error de conexión. Verifica tu internet.';
            } else if (error.message) {
                message = '❌ ' + error.message;
            }
            
            showNotification(message, 'error');
            
            // Resetear botón
            button.textContent = originalText;
            button.disabled = false;
            emailInput.disabled = false;
        }
    });
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Guardar en localStorage como backup
 */
function saveToLocalStorage(email, data) {
    try {
        const existing = JSON.parse(localStorage.getItem('ecomarket_waitlist') || '[]');
        const emailExists = existing.some(entry => entry.email === email);
        if (!emailExists) {
            existing.push({ ...data, date: new Date().toISOString() });
            localStorage.setItem('ecomarket_waitlist', JSON.stringify(existing));
            console.log('💾 Guardado en localStorage');
        }
    } catch (e) {
        console.warn('⚠️ No se pudo guardar en localStorage:', e);
    }
}

/**
 * Mostrar notificación flotante
 */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        backgroundColor: type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.9rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        cursor: 'pointer',
        maxWidth: '350px'
    });
    
    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } } @keyframes slideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100px); } }`;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
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
 * Verificar estado de autenticación
 */
function checkAuthStatus() {
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

/**
 * Utilidades exportadas
 */
window.ecomarket = {
    supabase: window.supabaseClient,
    showNotification,
    isValidEmail
};