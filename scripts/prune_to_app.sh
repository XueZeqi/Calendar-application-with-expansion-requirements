#!/usr/bin/env bash
# Safe prune script: 列出并可移动非必要文件到 archive/
# 用法:
#   bash scripts/prune_to_app.sh       # 仅列出将被移动的文件
#   bash scripts/prune_to_app.sh --run # 真正执行移动

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ARCHIVE_DIR="$ROOT/archive"

KEEP=(
  "index.html"
  "package.json"
  "package-lock.json"
  "yarn.lock"
  "src"
  "public"
  "capacitor.config.json"
  "README_MOBILE.md"
  "README.md"
  ".git"
)

echo "Repository root: $ROOT"
echo "Files/dirs that will be KEPT:"
for k in "${KEEP[@]}"; do
  echo "  - $k"
done

to_move=()
while IFS= read -r -d $'\0' p; do
  name="$(basename "$p")"
  # skip keep list
  keep=false
  for k in "${KEEP[@]}"; do
    if [[ "$p" == "$ROOT/$k" || "$name" == "$k" ]]; then
      keep=true
      break
    fi
  done
  if [ "$keep" = false ]; then
    to_move+=("$p")
  fi
done < <(find "$ROOT" -maxdepth 1 -mindepth 1 -print0)

if [ ${#to_move[@]} -eq 0 ]; then
  echo "No files to move. Nothing to do."
  exit 0
fi

echo "The following items would be moved to $ARCHIVE_DIR:"
for item in "${to_move[@]}"; do
  echo "  - $(basename "$item")"
done

if [ "${1:-}" != "--run" ]; then
  echo "\nRun with --run to actually move the files."
  exit 0
fi

mkdir -p "$ARCHIVE_DIR"
for item in "${to_move[@]}"; do
  mv "$item" "$ARCHIVE_DIR/"
done

echo "Moved ${#to_move[@]} items to $ARCHIVE_DIR"
