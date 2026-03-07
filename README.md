# 🧠 ecomarket-ai - Refactorizado a Next.js

> Tu Radar Financiero Cognitivo

## 📌 Descripción

IA que combina análisis de mercados con psicología del inversor. 
Entiende qué pasa, por qué pasa, y cómo encaja con tu forma única de decidir.

## 🚀 Stack Tecnológico (Refactorizado)

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Backend:** Supabase (Authentication + Database)
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel (Next.js native)
- **Package Manager:** npm/yarn/pnpm
- **Development:** Vite-like HMR, TypeScript strict mode

## 📁 Estructura del Proyecto

```
ecomarket-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   ├── register/
│   │   │   └── page.tsx        # Register page
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard layout
│   │       └── page.tsx        # Dashboard page (protected)
│   ├── components/             # React Components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── WaitlistForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useAuth.ts
│   │   └── useSupabase.ts
│   ├── lib/                    # Utilities & Constants
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # Helper functions
│   └── styles/
│       └── globals.css         # Global styles + Tailwind
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── render.yaml                 # Render deployment config
```

## 🎯 Características Principales

### ✅ Completadas en esta refactorización:
- [x] Landing page con Hero y Features
- [x] Sistema de autenticación (Login/Register)
- [x] Dashboard básico para usuarios autenticados
- [x] Formulario de waitlist funcional
- [x] Componentes React reutilizables
- [x] TypeScript type-safe en todo el proyecto
- [x] Tailwind CSS para estilos modernos
- [x] Hooks personalizados para lógica compartida

### 🔄 En progreso:
- [ ] Perfil cognitivo IA (cuestionario)
- [ ] Conexión de portafolio
- [ ] Motor de correlaciones
- [ ] Simulador What-If
- [ ] Sistema de alertas inteligentes
- [ ] Centro de educación

## 🛠️ Instalación y Desarrollo

### Prerequisites
- Node.js 18+ (npm, yarn, o pnpm)
- Supabase account con credenciales configuradas

### Instalación

```bash
# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### Variables de Entorno

Copia `.env.example` a `.env.local` y actualiza con tus credenciales:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## 🔐 Seguridad

### Mejoras de seguridad incluidas:

1. **TypeScript Strict Mode** - Detección de errores en tiempo de desarrollo
2. **HTTPS Headers** - Protección contra ataques comunes (X-Frame-Options, X-XSS-Protection)
3. **Environment Variables** - Credenciales en variables seguras
4. **Supabase RLS** - Row Level Security en la base de datos
5. **Token Management** - Manejo seguro de sesiones

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.0.0",
  "@supabase/supabase-js": "^2.38.0",
  "tailwindcss": "^3.3.0"
}
```

## 🚀 Deployment

### En Vercel (Recomendado para Next.js):

1. Conecta tu repositorio GitHub
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### En Render (Como backup):

Actualiza `render.yaml` con la nueva estructura de Next.js.

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Hooks](https://react.dev/reference/react)

## 🔗 Links Importantes

- **Sitio:** [ecomarket-ai.es](https://ecomarket-ai.es)
- **GitHub:** [repositorio]
- **Supabase:** Dashboard privado

## 📧 Contacto

Para dudas o contribuciones, abre un issue o pull request.

## 📄 Licencia

Todos los derechos reservados © 2026 ecomarket-ai