# 🚀 Habilitar GitHub Pages - 1 minuto

## Steps:

1. Ve a: https://github.com/juanramonhernandezgomez-oss/ecomarket-ai/settings/pages

2. Bajo "Build and deployment":
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `root`

3. Espera 2-3 minutos

4. Tu staging estará en: https://juanramonhernandezgomez-oss.github.io/ecomarket-ai/dev/

## Status Actual:

✅ Workflow `deploy-pages.yml` creado y activo
✅ Cada push a `refactor/frontend-utils` dispara: build → deploy a gh-pages
✅ Estructura `/dev` creada automáticamente

## Verificar Deploy:

```bash
# Una vez habilitado GitHub Pages:
curl -I https://juanramonhernandezgomez-oss.github.io/ecomarket-ai/dev/index.html
```

Expected: HTTP 200 ✅
