// dashboard.js
// lógica específica de la página del dashboard

import { $id } from './utils.js';

export function initDashboardPage() {
    document.addEventListener('DOMContentLoaded', () => {
        // simula carga inicial para mejor UX
        setTimeout(() => {
            $id('loadingState').style.display = 'none';
            $id('dashboardContent').style.display = 'block';
        }, 1000);
    });
}