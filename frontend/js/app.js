// app.js
// módulo principal que inicializa la aplicación de landing
// ahora reutiliza utilidades y consume supabase-client como módulo

import supabaseClient from './supabase-client.js';
import {
    isValidEmail,
    showNotification,
    saveToLocalStorage,
    initSmoothScroll,
    checkAuthStatus,
    $id,
    setButtonLoading
} from './utils.js';


document.addEventListener('DOMContentLoaded', () => {
    // inicialización básica
    if (!supabaseClient) {
        console.error('No hay cliente de Supabase');
        return;
    }

    initWaitlistForm();
    initSmoothScroll();
    checkAuthStatus();
});

function initWaitlistForm() {
    const form = $id('waitlistForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const button = form.querySelector('button');
        const successMessage = $id('successMessage');

        if (!email || !isValidEmail(email)) {
            showNotification('Por favor, introduce un email válido', 'error');
            return;
        }

        setButtonLoading(button, true);
        emailInput.disabled = true;

        try {
            const waitlistData = {
                email: email,
                source: 'landing_page',
                user_agent: navigator.userAgent,
                ip_hash: 'anonymous_' + Date.now(),
                status: 'pending'
            };


            const { data, error } = await supabaseClient
                .from('waitlist')
                .insert([waitlistData])
                .select();

            if (error) throw error;

            saveToLocalStorage(email, waitlistData);

            if (successMessage) {
                successMessage.classList.add('show');
                form.style.display = 'none';
            } else {
                showNotification('✅ ¡Bienvenido a bordo! Te hemos añadido a la lista de espera.', 'success');
            }

            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    event_category: 'conversion',
                    event_label: 'landing_page',
                    value: 1
                });
            }
        } catch (error) {
            let message = 'Error al registrar. Intenta de nuevo.';
            if (error.code === '23505' || error.message?.includes('duplicate')) {
                message = '⚠️ Este email ya está registrado';
            } else if (error.message?.includes('network')) {
                message = '❌ Error de conexión. Verifica tu internet.';
            } else if (error.message) {
                message = '❌ ' + error.message;
            }
            showNotification(message, 'error');
        } finally {
            // pequeño delay para evitar envíos múltiples
            setTimeout(() => setButtonLoading(button, false), 500);
            emailInput.disabled = false;
        }
    });
}
