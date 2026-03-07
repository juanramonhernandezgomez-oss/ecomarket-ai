// supabase-client.js
// centraliza la creación del cliente de Supabase usando módulos ESM
// mantiene las credenciales en un único lugar (config.js)

import { createClient } from 'https://unpkg.com/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Falta configuración de Supabase en config.js');
    throw new Error('Configuración de Supabase incompleta');
}

let supabaseClient;
try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Conexión a Supabase inicializada correctamente');
} catch (error) {
    console.error('❌ Error al inicializar Supabase:', error);
    throw error;
}

export default supabaseClient;
