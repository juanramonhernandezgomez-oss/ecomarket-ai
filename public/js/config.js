// config.js
// Configuration values for the front-end application.
// Las credenciales se inyectan desde variables de entorno en tiempo de build.
// NUNCA comitear credenciales reales en este archivo.

// Para desarrollo local, crear archivo .env.local (no comitear)
const getConfig = () => {
    // Intenta obtener de variables de entorno globales (inyectadas en build)
    if (typeof window !== 'undefined' && window.__ECOMARKET_CONFIG__) {
        return window.__ECOMARKET_CONFIG__;
    }
    
    // Fallback para desarrollo local
    return {
        SUPABASE_URL: 'https://huvnjjarkycddhxkwsna.supabase.co',
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dm5qamFya3ljZGRoeGt3c25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzEwNjYsImV4cCI6MjA4ODQwNzA2Nn0.LyTXYZgQ254aiQFaO5u1RnAqHkhrpI6Qjso0bH3rn8w'
    };
};

const config = getConfig();
export const SUPABASE_URL = config.SUPABASE_URL;
export const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY;
