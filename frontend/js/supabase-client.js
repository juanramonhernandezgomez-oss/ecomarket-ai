// supabase-client.js
// centraliza la creación del cliente de Supabase usando módulos ESM
// mantiene las credenciales en un único lugar (config.js)

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/module/supabase.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Falta configuración de Supabase en config.js');
}

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabaseClient;

console.log('✅ Conexión a Supabase inicializada correctamente');
console.log('📍 URL:', SUPABASE_URL);
