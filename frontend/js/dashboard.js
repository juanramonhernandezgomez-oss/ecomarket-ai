// dashboard.js
// Lógica específica de la página del dashboard
// Gestiona la interfaz y estado del usuario después de login

import { $id, logError } from './utils.js';

export function initDashboardPage() {
    document.addEventListener('DOMContentLoaded', () => {
        // simula carga inicial para mejor UX
        setTimeout(() => {
            $id('loadingState').style.display = 'none';
            $id('dashboardContent').style.display = 'block';
        }, 1000);
    });
}