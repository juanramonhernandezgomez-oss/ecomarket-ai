/**
 * supabase-client.js
 * Configuración centralizada de Supabase
 * Este archivo se importa en TODAS las páginas que necesiten BD
 * @version 1.0.0
 */

const SUPABASE_URL = 'https://huvnjjarkycddhxkwsna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dm5qamFya3ljZGRoeGt3c25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzEwNjYsImV4cCI6MjA4ODQwNzA2Nn0.LyTXYZgQ254aiQFaO5u1RnAqHkhrpI6Qjso0bH3rn8w';

// Verificar que la librería de Supabase haya cargado
if (typeof window.supabase === 'undefined') {
    console.error('❌ ERROR CRÍTICO: La librería de Supabase no se ha cargado en el HTML');
    console.error('👉 Asegúrate de incluir: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
}

// Instanciar cliente de Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exportar globalmente para que otros scripts puedan usarlo
window.supabaseClient = supabaseClient;

console.log('✅ Conexión a Supabase inicializada correctamente');
console.log('📍 URL:', SUPABASE_URL);