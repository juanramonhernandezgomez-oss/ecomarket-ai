# 🧠 ecomarket-ai

> Tu Radar Financiero Cognitivo

## 📌 Descripción

IA que combina análisis de mercados con psicología del inversor. 
Entiende qué pasa, por qué pasa, y cómo encaja con tu forma de decidir.

## 🚀 Estado del Proyecto

- [x] Landing Page (Coming Soon)
- [ ] Sistema de autenticación
- [ ] Perfil cognitivo IA
- [ ] Motor de correlaciones
- [ ] Simulador What-If
- [ ] Dashboard principal

## 🛠️ Stack Tecnológico

- **Frontend:** HTML, CSS, JavaScript (modular ES Modules, seguridad reforzada)
  - Archivos separados bajo `frontend/js` (`app.js`, `auth.js`, `utils.js`, etc.)
  - Configuración sensible en `frontend/js/config.js` (planificar inyección en build/CI)
  - CSP meta tags y sin scripts inline para mitigar XSS
  - Uso de `type=module` y dependencias CDN importadas en módulos
  - Notificaciones, validaciones y utilidades definidos en `utils.js` para fácil testeo
- **Backend:** Python, FastAPI (próximamente)
- **Base de Datos:** PostgreSQL (próximamente, a través de Supabase)
- **Hosting:** Render + GitHub
- **Dominio:** ecomarket-ai.es

## 📧 Lista de Espera

Únete en: [https://ecomarket-ai.es](https://ecomarket-ai.es)

## 📄 Licencia

Todos los derechos reservados © 2026 ecomarket-ai