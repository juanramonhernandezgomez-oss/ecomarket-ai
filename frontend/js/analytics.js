// analytics.js
// Inicialización de Google Analytics 4 separada para evitar scripts inline

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Exponer gtag globalmente de forma segura
window.gtag = gtag;

// configuración primigenia
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');
