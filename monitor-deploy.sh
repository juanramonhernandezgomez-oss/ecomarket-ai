#!/bin/bash
# Monitor Render deployment status
# Checks https://www.ecomarket-ai.es every 10 seconds

PROD_URL="https://www.ecomarket-ai.es"
MAX_ATTEMPTS=60  # 10 min total
ATTEMPT=0

echo "🔄 Monitoring production deployment..."
echo "Target: $PROD_URL"
echo "Max attempts: $MAX_ATTEMPTS (60 seconds each = 10 minutes total)"
echo "---"

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  ATTEMPT=$((ATTEMPT + 1))
  
  # Try to fetch and check for esm.sh (indicator of new build)
  HTTP_CODE=$(curl -s -o /tmp/index.html -w "%{http_code}" "$PROD_URL/index.html")
  
  # Check if esm.sh is present (new code)
  if grep -q "esm.sh" /tmp/index.html 2>/dev/null; then
    echo "✅ [$(date '+%H:%M:%S')] Deploy SUCCESS!"
    echo "HTTP: $HTTP_CODE"
    echo "✨ New code is LIVE at $PROD_URL"
    break
  fi
  
  # Check if unpkg.com is still there (old code)
  if grep -q "unpkg.com" /tmp/index.html 2>/dev/null; then
    echo "⏳ [$(date '+%H:%M:%S')] Old code still active (HTTP $HTTP_CODE) - waiting..."
  elif [ "$HTTP_CODE" != "200" ]; then
    echo "⏳ [$(date '+%H:%M:%S')] Building... (HTTP $HTTP_CODE)"
  else
    echo "⏳ [$(date '+%H:%M:%S')] Checking deployment (HTTP $HTTP_CODE)..."
  fi
  
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    sleep 10  # Wait 10 seconds before next check
  fi
done

if [ $ATTEMPT -ge $MAX_ATTEMPTS ]; then
  echo ""
  echo "❌ Deploy timeout after $((MAX_ATTEMPTS * 10)) seconds"
  echo "Check Render dashboard manually: https://dashboard.render.com/services"
  exit 1
fi
