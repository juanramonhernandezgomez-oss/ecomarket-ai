// app.js
// Módulo principal que inicializa la aplicación de landing
// Reutiliza utilidades y consume el cliente Supabase como módulo

import supabaseClient from './supabase-client.js';
import {
    isValidEmail,
    showNotification,
    saveToLocalStorage,
    initSmoothScroll,
    checkAuthStatus,
    $id,
    setButtonLoading,
    getErrorMessage,
    logError
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!supabaseClient) {
        logError('app.main', new Error('No hay cliente de Supabase disponible'));
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
            showNotification('Por favor, introduce un email válido', 'warning');
            return;
        }

        setButtonLoading(button, true);
        emailInput.disabled = true;

        try {
            const waitlistData = {
                email,
                source: 'landing_page',
                user_agent: navigator.userAgent,
                ip_hash: 'anonymous_' + Date.now(),
                status: 'pending'
            };

            const { error } = await supabaseClient
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
            logError('waitlistForm', error);
            showNotification('❌ ' + getErrorMessage(error), 'error');
        } finally {
            setTimeout(() => {
                setButtonLoading(button, false);
                emailInput.disabled = false;
            }, 500);
        }
    });
}
