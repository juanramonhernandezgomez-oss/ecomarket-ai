// dashboard.js
// lógica específica de la página del dashboard

export function initDashboardPage() {
    document.addEventListener('DOMContentLoaded', () => {
        // simula carga inicial para mejor UX
        setTimeout(() => {
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('dashboardContent').style.display = 'block';
        }, 1000);
    });
}