#!/bin/bash
# build.sh - Script para preparar estructura de despliegue con /dev support

# Crear estructura de carpetas
mkdir -p public/dev
mkdir -p public/assets

# Copiar frontend root al public root
cp -r frontend/* public/

# Si estamos en rama refactor/frontend-utils, copiar también a /dev
if [[ $(git rev-parse --abbrev-ref HEAD) == "refactor/frontend-utils" ]]; then
  echo "building /dev version..."
  cp -r frontend/js public/dev/js
  cp -r frontend/css public/dev/css
  cp -r frontend/assets public/dev/assets
  cp frontend/*.html public/dev/
  echo "✅ /dev build complete"
else
  echo "⚠️  /dev build skipped (not on refactor/frontend-utils branch)"
fi

# Crear archivo de routing para servir ambas versiones
cat > public/_redirects << 'EOF'
# Redirect root domain
https://ecomarket-ai.es/* https://www.ecomarket-ai.es/:splat 301!

# SPA routing - /dev path
/dev/* /dev/index.html 200
/* /index.html 200
EOF

echo "✅ Build structure ready"
