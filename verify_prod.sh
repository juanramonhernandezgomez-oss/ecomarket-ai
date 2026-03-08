#!/bin/bash
echo "=== VERIFICACIÓN DE PRODUCCIÓN ===" 
echo ""
echo "Archivos sincronizados:"
for FILE in index.html js/supabase-client.js js/utils.js js/app.js js/auth.js; do
  PROD=$(curl -s https://www.ecomarket-ai.es/$FILE | shasum | cut -d' ' -f1)
  LOCAL=$(shasum public/$FILE | cut -d' ' -f1)
  if [ "$PROD" = "$LOCAL" ]; then
    echo "✅ $FILE"
  else
    echo "❌ $FILE (MISMATCH)"
  fi
done
