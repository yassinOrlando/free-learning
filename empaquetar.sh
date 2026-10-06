#!/bin/sh
# Regenera descargar/free-learning.zip (lo que baja el botón "Descargar sitio").
# Ejecutar después de cualquier cambio en el sitio: ./empaquetar.sh
set -e
RAIZ="$(cd "$(dirname "$0")" && pwd)"
node "$RAIZ/verificar.js"  # si alguna lección está mal, no se genera el zip
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Copia limpia dentro de una carpeta "free-learning", sin herramientas de desarrollo.
rsync -a --exclude descargar --exclude .claude --exclude .git --exclude design-system --exclude graphify-out \
  --exclude .DS_Store "$RAIZ/" "$TMP/free-learning/"

mkdir -p "$RAIZ/descargar"
rm -f "$RAIZ/descargar/free-learning.zip"
(cd "$TMP" && zip -rq -X "$RAIZ/descargar/free-learning.zip" free-learning)
echo "Listo: descargar/free-learning.zip"
