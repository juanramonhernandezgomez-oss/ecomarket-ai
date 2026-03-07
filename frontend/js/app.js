// app.js
// módulo principal que inicializa la aplicación de landing
// ahora reutiliza utilidades y consume supabase-client como módulo

import supabaseClient from './supabase-client.js';
import {
    isValidEmail,
    showNotification,
    saveToLocalStorage,
    initSmoothScroll,
    checkAuthStatus
} from './utils.js';


document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ ecomarket-ai app loaded');

    if (!supabaseClient) {
        console.error('❌ No hay conexión a BD disponible. Revisa supabase-client.js');
        return;
    }

    console.log('📍 Supabase conectado:', supabaseClient);

    initWaitlistForm();
    initSmoothScroll();
    checkAuthStatus();
});

function initWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    if (!form) {
        console.log('⚠️ No se encontró el formulario waitlistForm');
        return;
    }

    console.log('✅ Formulario waitlist encontrado');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const successMessage = document.getElementById('successMessage');

        console.log('📧 Email a registrar:', email);

        if (!email || !isValidEmail(email)) {
            showNotification('Por favor, introduce un email válido', 'error');
            return;
        }

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

            const { data, error } = await supabaseClient
                .from('waitlist')
                .insert([waitlistData])
                .select();

            if (error) {
                console.error('❌ Error de Supabase:', error);
                throw error;
            }

            console.log('✅ Registrado correctamente:', data);

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
            button.textContent = originalText;
            button.disabled = false;
            emailInput.disabled = false;
        }
    });
}
