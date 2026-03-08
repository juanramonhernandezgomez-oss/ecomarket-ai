# Deploy de /dev

## Setup: Desplegar rama `refactor/frontend-utils` en `/dev`

### Opción 1: Render (recomendado - actual)

**Pasos:**

1. **En Render Dashboard:**
   - Ve a tu servicio `ecomarket-ai`
   - Settings → Build & Deploy
   - Verifica que `build.sh` está configurado como comando de build
   - `public` está seteado como publish directory

2. **Sistema automático:**
   - Cualquier push a `refactor/frontend-utils` → build se ejecuta
   - `build.sh` detecta la rama
   - Si es refactor → crea `/dev` con esos archivos
   - Si es main → solo crea root `/`
   - Deploy automático

3. **Acceso:**
   ```
   https://www.ecomarket-ai.es/          → main (index.html)
   https://www.ecomarket-ai.es/dev/      → refactor (dev/index.html)
   ```

4. **Nota:** Los assets están compartidos (`/css`, `/js`, `/assets`) porque usan rutas relativas. Si necesitan diferencias, actualizar `build.sh`.

---

### Opción 2: Netlify (alternativa + Deploy Previews)

Si quieres deploy previews automáticos por rama:

1. **Conectar repo a Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify init
   ```

2. **Configurar:**
   - Build command: (vacío - estático)
   - Publish directory: `frontend`
   - Deploy branch: `main` (for production)
   - Deploy contexts: Enable branch deploys

3. **Resultado:**
   ```
   https://ecomarket-ai.netlify.app/           → main
   https://refactor-frontend-utils--ecomarket-ai.netlify.app/  → rama (preview)
   ```

4. **Manejo de dominio:**
   - Actualizar DNS apuntar a Netlify
   - O usar Netlify subdomain + Alias personalizado

---

### Opción 3: GitHub Pages (Gratis + Automático)

1. **Workflow GitHub Actions:**
   - Ya existe en `.github/workflows/deploy-dev.yml`
   - Detecta push a `refactor/frontend-utils`
   - Despliega en rama `gh-pages`

2. **Acceso:**
   ```
   https://ecomarket-ai.es/dev/    (si configuras dominio personalizado)
   ```

---

## ✅ Status Actual (Render)

- ✅ `render.yaml` → usa `build.sh`
- ✅ `build.sh` → detecta rama, builds `/` y/o `/dev`
- ✅ `netlify.toml` → respaldo (Netlify ready)
- ✅ `.github/workflows/deploy-dev.yml` → respaldo (GitHub Pages ready)

## 🚀 Despliegue Recomendado

**Simple + Automático:**
1. Push a `refactor/frontend-utils`
2. Render ejecuta `build.sh`
3. Detecta rama → builds `/dev`
4. Deploy automático
5. Acceso: `https://www.ecomarket-ai.es/dev/`

**Sin cambios en main:**
- Main sigue en `/`
- Branch-specific en `/dev`
- Separación limpia

---

## 🔧 Troubleshooting

### "No funciona el /dev"
```bash
# Verificar que build.sh tiene permisos
chmod +x build.sh

# Verificar branch
git branch -a

# Test local
bash build.sh
ls -la public/dev/
```

### "Assets duplicados / no cargan"
- Los archivos (`css/`, `js/`, `assets/`) están en `/public/` (root)
- `/dev/` rehace solo los HTML
- Si necesitas assets separados, actualizar `build.sh` con `cp` separado

### "Quiero volver a publicar desde frontend/"
```bash
# Editar render.yaml
rootDir: frontend
publishPath: ./
buildCommand: ""
```

---

## Próximos Pasos

- [ ] Testear deployment en Render
- [ ] Verificar https://www.ecomarket-ai.es/dev/ accesible
- [ ] Verificar assets cargan correctamente
- [ ] Si OK → hacer PR de refactor a main
- [ ] Merge a main (deploy en raíz)
