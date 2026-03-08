// auth.js
// Módulo que controla la autenticación de usuarios
// Consume utilidades y el cliente Supabase como módulos

import supabaseClient from './supabase-client.js';
import {
    showNotification,
    $id,
    setButtonLoading,
    setFormDisabled,
    getErrorMessage,
    isValidEmail,
    isValidPassword,
    logError
} from './utils.js';

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

        // Validaciones
        if (!email || !password) {
            showNotification('Por favor, completa todos los campos', 'warning');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Email inválido', 'warning');
            return;
        }

        setButtonLoading(button, true, '⏳ Iniciando sesión...');
        setFormDisabled(loginForm, true);

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            localStorage.setItem('ecomarket_token', data.session.access_token);
            localStorage.setItem('ecomarket_user', JSON.stringify(data.user));
            localStorage.setItem('ecomarket_token_expires', new Date(data.session.expires_at * 1000).toISOString());

            showNotification('✅ ¡Bienvenido de nuevo!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        } catch (error) {
            logError('loginForm', error);
            showNotification('❌ ' + getErrorMessage(error), 'error');
        } finally {
            setTimeout(() => {
                setButtonLoading(button, false);
                setFormDisabled(loginForm, false);
            }, 500);
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

        // Validaciones
        if (!email || !password) {
            showNotification('Por favor, completa email y contraseña', 'warning');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Email inválido', 'warning');
            return;
        }

        if (!isValidPassword(password)) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'warning');
            return;
        }

        setButtonLoading(button, true, '⏳ Creando cuenta...');
        setFormDisabled(registerForm, true);

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        experience_level: experience
                    }
                }
            });

            if (error) throw error;

            showNotification('✅ ¡Cuenta creada! Revisa tu email para verificar.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } catch (error) {
            logError('registerForm', error);
            showNotification('❌ ' + getErrorMessage(error), 'error');
        } finally {
            setTimeout(() => {
                setButtonLoading(button, false);
                setFormDisabled(registerForm, false);
            }, 500);
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
            localStorage.removeItem('ecomarket_token_expires');

            showNotification('✅ Sesión cerrada correctamente', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        } catch (error) {
            logError('logout', error);
            showNotification('Error al cerrar sesión', 'error');
        }
    });
}

function loadUserProfile() {
    const welcomeName = $id('welcomeName');
    const experienceLevel = $id('experienceLevel');

    if (!welcomeName && !experienceLevel) return;

    try {
        const user = JSON.parse(localStorage.getItem('ecomarket_user') || '{}');
        if (user.email) {
            if (welcomeName) {
                welcomeName.textContent = user.user_metadata?.full_name || user.email.split('@')[0];
            }
            if (experienceLevel && user.user_metadata?.experience_level) {
                experienceLevel.textContent = user.user_metadata.experience_level;
            }
        }
    } catch (e) {
        logError('loadUserProfile', e);
    }
}
