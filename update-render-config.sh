#!/bin/bash
# Script para actualizar configuración en Render via API
# Uso: RENDER_API_TOKEN=tu_token SERVICE_ID=tu_service_id bash update-render-config.sh

if [ -z "$RENDER_API_TOKEN" ]; then
  echo "❌ Error: RENDER_API_TOKEN no configurado"
  echo "Obtén tu token en: https://dashboard.render.com/account/tokens"
  exit 1
fi

if [ -z "$SERVICE_ID" ]; then
  echo "❌ Error: SERVICE_ID no configurado"
  echo "Obtén el ID en: https://dashboard.render.com/services"
  exit 1
fi

echo "🔄 Actualizando configuración en Render..."

curl -X PATCH "https://api.render.com/v1/services/$SERVICE_ID" \
  -H "Authorization: Bearer $RENDER_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "buildCommand": "bash build.sh",
    "publishPath": "./public"
  }' | jq .

echo "✅ Configuración actualizada"
echo "⏳ El siguiente deploy usará render.yaml automáticamente"
