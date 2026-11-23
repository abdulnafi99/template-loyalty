#!/usr/bin/env bash
# Bina ZIP untuk pembeli. Jalankan dari folder utama repo:  bash jualan/bina-zip.sh
# Folder jualan/ dan README.md (nota pembangun) TIDAK dimasukkan.
set -euo pipefail
VER=$(grep -m1 -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' CHANGELOG.md)
NAME="template-loyalti-kafe"
OUT="jualan/${NAME}-${VER}.zip"
TMP=$(mktemp -d)
mkdir -p "$TMP/$NAME"
cp index.html admin.html menu.js manifest.webmanifest sw.js vercel.json PANDUAN.md LESEN.md CHANGELOG.md "$TMP/$NAME/"
cp -r icons "$TMP/$NAME/"
rm -f "$OUT"
(cd "$TMP" && zip -qr -X "$OLDPWD/$OUT" "$NAME")
rm -rf "$TMP"
echo "Siap: $OUT"
