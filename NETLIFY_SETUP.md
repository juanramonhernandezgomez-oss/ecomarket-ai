## 🚀 Deploy a Netlify - 2 minutos

### Pasos:

1. Ve a: https://app.netlify.com
2. **Add new site** → **Import an existing project**
3. Conecta GitHub: Selecciona repo `ecomarket-ai`
4. Configuración:
   - **Branch to deploy**: `refactor/frontend-utils`
   - **Build command**: `bash build.sh`
   - **Publish directory**: `public`
5. **Deploy site** ✅

### Qué pasará:

- Cada push a `refactor/frontend-utils` = auto-deploy
- URL permanente: `https://tu-site.netlify.app` (o custom domain)
- `/dev` path: `/dev/index.html` (automático desde build.sh)
- Deploy previews para cada PR

### Verificar Deploy:

```bash
# Después de conectar Netlify:
curl -I https://tu-site.netlify.app/dev/index.html
# Expected: HTTP 200 ✅
```

### Alternativa: Dame el control

Si quieres que lo haga sin acceso manual:
```bash
export NETLIFY_SITE_ID=tu_site_id
export NETLIFY_AUTH_TOKEN=tu_token
bash deploy-to-netlify.sh
```

(Los tokens se generan en: https://app.netlify.com/user/applications#personal-access-tokens)
