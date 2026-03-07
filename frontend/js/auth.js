// auth.js
// módulo que controla la autenticación de usuarios
// ahora consume utilidades y el cliente Supabase como módulos

import supabaseClient from './supabase-client.js';
import { showNotification } from './utils.js';


document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initRegisterForm();
    initLogout();
    loadUserProfile();
});

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const button = loginForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        if (!email || !password) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        button.textContent = '⏳ Iniciando sesión...';
        button.disabled = true;

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

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } catch (error) {
            console.error('❌ Error de login:', error);
            showNotification('❌ ' + (error.message || 'Error al iniciar sesión'), 'error');
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const name = document.getElementById('registerName')?.value.trim() || '';
        const experience = document.getElementById('registerExperience')?.value || 'beginner';
        const button = registerForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        if (!email || !password) {
            showNotification('Por favor, completa email y contraseña', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        button.textContent = '⏳ Creando cuenta...';
        button.disabled = true;

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

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            console.error('❌ Error de registro:', error);
            let message = error.message || 'Error al crear cuenta';
            if (error.message?.includes('User already registered')) {
                message = '⚠️ Este email ya está registrado';
            }
            showNotification('❌ ' + message, 'error');
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        try {
            await supabaseClient.auth.signOut();
            localStorage.removeItem('ecomarket_token');
            localStorage.removeItem('ecomarket_user');

            showNotification('✅ Sesión cerrada correctamente', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            console.error('❌ Error al cerrar sesión:', error);
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
