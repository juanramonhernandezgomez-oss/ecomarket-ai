// auth.js
// módulo que controla la autenticación de usuarios
// ahora consume utilidades y el cliente Supabase como módulos

import supabaseClient from './supabase-client.js';
import { showNotification, $id, setButtonLoading } from './utils.js';


document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initRegisterForm();
    initLogout();
    loadUserProfile();
});

function initLoginForm() {
    const loginForm = $id('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = $id('loginEmail').value.trim();
        const password = $id('loginPassword').value;
        const button = loginForm.querySelector('button[type="submit"]');

        if (!email || !password) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        setButtonLoading(button, true, '⏳ Iniciando sesión...');

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            console.log('✅ Login exitoso:', data.user.email);

            localStorage.setItem('ecomarket_token', data.session.access_token);
            localStorage.setItem('ecomarket_user', JSON.stringify(data.user));

            showNotification('✅ ¡Bienvenido de nuevo!', 'success');

            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        } catch (error) {
            showNotification('❌ ' + (error.message || 'Error al iniciar sesión'), 'error');
        } finally {
            // pequeño delay para evitar envíos múltiples
            setTimeout(() => setButtonLoading(button, false), 500);
        }
    });
}

function initRegisterForm() {
    const registerForm = $id('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = $id('registerEmail').value.trim();
        const password = $id('registerPassword').value;
        const name = $id('registerName')?.value.trim() || '';
        const experience = $id('registerExperience')?.value || 'beginner';
        const button = registerForm.querySelector('button[type="submit"]');

        if (!email || !password) {
            showNotification('Por favor, completa email y contraseña', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        setButtonLoading(button, true, '⏳ Creando cuenta...');

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        experience_level: experience
                    }
                }
            });

            if (error) throw error;

            console.log('✅ Registro exitoso:', data.user.email);

            showNotification('✅ ¡Cuenta creada! Revisa tu email para verificar.', 'success');
            setTimeout(() => window.location.href = 'login.html', 2000);
        } catch (error) {
            let message = error.message || 'Error al crear cuenta';
            if (error.message?.includes('User already registered')) {
                message = '⚠️ Este email ya está registrado';
            }
            showNotification('❌ ' + message, 'error');
        } finally {
            // pequeño delay para evitar envíos múltiples
            setTimeout(() => setButtonLoading(button, false), 500);
        }
    });
}

function initLogout() {
    const logoutBtn = $id('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        try {
            await supabaseClient.auth.signOut();
            localStorage.removeItem('ecomarket_token');
            localStorage.removeItem('ecomarket_user');

            showNotification('✅ Sesión cerrada correctamente', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } catch (error) {
            showNotification('Error al cerrar sesión', 'error');
        }
    });
}

function loadUserProfile() {
    const welcomeName = document.getElementById('welcomeName');
    const experienceLevel = document.getElementById('experienceLevel');

    if (!welcomeName && !experienceLevel) return;

    const user = JSON.parse(localStorage.getItem('ecomarket_user') || '{}');

    if (user.email) {
        if (welcomeName) welcomeName.textContent = user.email.split('@')[0];
        if (experienceLevel && user.user_metadata?.experience_level) {
            experienceLevel.textContent = user.user_metadata.experience_level;
        }
    }
}
