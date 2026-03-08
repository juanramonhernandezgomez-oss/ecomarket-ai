# 🏗️ Arquitectura - ecomarket-ai Frontend

## 📊 Estructura General

```
frontend/
├── index.html          # Landing page (waitlist)
├── login.html          # Página de login
├── register.html       # Página de registro
├── dashboard.html      # Panel de usuario (post-auth)
├── css/
│   └── styles.css      # Estilos globales (sin estilos inline)
├── js/
│   ├── config.js       # Configuración (⚠️ Credenciales públicas → TODO: .env)
│   ├── supabase-client.js  # Cliente Supabase centralizado
│   ├── utils.js        # Funciones compartidas + helpers DOM
│   ├── app.js          # Landing page logic (waitlist)
│   ├── auth.js         # Autenticación (login/register/logout)
│   ├── dashboard.js    # Dashboard logic (skeleton)
│   └── analytics.js    # Google Analytics (GA4)
└── assets/             # Imágenes estáticas
```

## 🔌 Stack Tecnológico

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Backend**: Supabase (Auth + PostgreSQL)
- **CDN**: esm.sh (Supabase JS library)
- **Analytics**: Google Analytics 4
- **Security**: CSP, XSS prevention, HTTPS only

## 🏭 Módulos Funcionales

### 1. **config.js**
```javascript
export const SUPABASE_URL = '...';
export const SUPABASE_ANON_KEY = '...';
```
⚠️ **CRÍTICO**: Estas credenciales están públicamente visibles. Debería usar:
- Variables de entorno inyectadas en build
- Endpoint backend seguro para obtener token
- O servicios keyless (Server-side Rendering)

### 2. **supabase-client.js**
```javascript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
- Centraliza cliente Supabase
- Se importa en `auth.js` y `app.js`
- Expone métodos `.auth.*` y `.from('table').*`

### 3. **utils.js** (Refactored)
Helpers compartidos divididos en 4 categorías:

**Validaciones:**
- `isValidEmail(email)` - Regex simple
- `isValidPassword(password)` - Mínimo 6 caracteres
- `getErrorMessage(error)` - Traduce errores Supabase

**UI Helpers:**
- `$(selector)` - Alias para `querySelector`
- `$id(id)` - Alias para `getElementById`
- `setButtonLoading(button, loading, text)` - Gestiona estado botones
- `setFormDisabled(form, disabled)` - Deshabilita inputs

**Notificaciones:**
- `showNotification(msg, type, duration)` - Toast con autorremove

**Flujo:**
- `initSmoothScroll()` - Smooth scroll en links internos
- `checkAuthStatus()` - Redirección según token
- `saveToLocalStorage()` - Persistencia local

**Storage:**
- Waitlist en `localStorage['ecomarket_waitlist']`
- Token en `localStorage['ecomarket_token']`
- User en `localStorage['ecomarket_user']`

### 4. **auth.js**
Maneja autenticación completa:
- `initLoginForm()` - Login con Supabase Auth
- `initRegisterForm()` - Registro + metadata (full_name, experience_level)
- `initLogout()` - Cierre de sesión
- `loadUserProfile()` - Carga perfil desde localStorage

**Flujo:**
1. User completa form → valida (email, password, etc)
2. Desactiva inputs (prevent double-submit)
3. Llama `supabaseClient.auth.signUp/signInWithPassword()`
4. Guarda token + user en localStorage
5. Redirige a dashboard/login

### 5. **app.js**
Landing page (INDEX):
- `initWaitlistForm()` - Captura de emails
  - Inserta en tabla `waitlist` de Supabase
  - Guarda backup en localStorage
  - Trigger Google Analytics event
- `initSmoothScroll()` - Enlaces suave
- `checkAuthStatus()` - Si user tiene token → redirige a dashboard

### 6. **dashboard.js** (Skeleton)
Panel post-auth (placeholder):
- Simula carga inicial (loading → content)
- TODO: Integrar datos de user, correlaciones, alertas, etc.

### 7. **analytics.js**
Google Analytics 4:
```javascript
window.gtag = function() { dataLayer.push(arguments); };
```
- Se dispara `waitlist_signup` event desde `app.js`
- TODO: Agregar eventos de login/register

## 🔐 Seguridad

### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net https://esm.sh https://www.googletagmanager.com;
  style-src 'self' https://fonts.googleapis.com;
  connect-src 'self' http://localhost:8000 https://esm.sh https://huvnjjarkycddhxkwsna.supabase.co;
  ...
">
```
- ✅ Sin scripts inline
- ✅ XSS mitigation (textContent vs innerHTML)
- ✅ Permite esm.sh, Supabase, GA
- ✅ Permite localhost:8000 para desarrollo

### Authentication
- JWT en localStorage (⚠️ vulnerable → TODO: HttpOnly cookies)
- Token expiry tracking en `ecomarket_token_expires`
- Redirección automática si token no existe

## 🔄 Flujos Principales

### 1. **Registro (Register.html)**
```
User input → Validar → setButtonLoading(true)
→ signUp() → Save token + user
→ Redirección login después 1.5s
→ Email verification requerido
```

### 2. **Login (Login.html)**
```
User input → Validar → setButtonLoading(true)
→ signInWithPassword() → Save token + user
→ Redirección dashboard después 0.8s
```

### 3. **Waitlist (Index.html)**
```
Email input → isValidEmail() → setButtonLoading(true)
→ insert into 'waitlist' table
→ Save localStorage backup
→ GA event (waitlist_signup)
→ Show success message
```

### 4. **Logout**
```
Click logout → signOut()
→ Clear localStorage (token, user, expires)
→ Redirección index.html
```

## 🧪 Testing Checklist

- [ ] **Syntax**: `node --check frontend/js/*.js` ✅
- [ ] **CDN**: esm.sh accesible ✅
- [ ] **Supabase**: Health endpoint OK ✅
- [ ] **CSP**: No bloqueos en console ✅
- [ ] **Signup**: Email validation, duplicate check, rate limit
- [ ] **Login**: Credenciales válidas, token guardado, redirect
- [ ] **Logout**: localStorage cleared, redirect OK
- [ ] **Smooth scroll**: Links internos funcionan
- [ ] **Analytics**: GA event disparado
- [ ] **localStorage**: Datos persisten tras refresh

## 🚀 Deployment

### Local Dev
```bash
cd frontend
python3 -m http.server 8000
# Abre http://localhost:8000
```

### Production (Render)
- Servir desde `frontend/` folder
- Inyectar vars de entorno en build time
- HTTPS obligatorio
- CSP en origin actual (no localhost)

## ⚠️ TODO (Prioridad)

1. **CRÍTICO**: Mover `config.js` credenciales a `.env` o backend
2. **ALTO**: HTTPS + HttpOnly cookies para tokens
3. **ALTO**: Refresh token flow (actual token_expires es solo lectura)
4. **MEDIO**: Unit tests (validadores, formatters)
5. **MEDIO**: Integration tests (auth flows)
6. **BAJO**: E2E tests (Cypress/Playwright)
7. **BAJO**: Documentación API backend (cuando exista)
8. **BAJO**: Error tracking (Sentry)

## 📚 Referencias

- [Supabase JS Client Docs](https://supabase.com/docs/reference/javascript)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Última actualización**: 8 de marzo de 2026  
**Versión**: 1.0 (Refactor Phase 1)
