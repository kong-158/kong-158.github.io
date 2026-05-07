#!/usr/bin/env bash

BRANCH="${1:-draft}"

git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH"
git push -u origin "$BRANCH" 2>/dev/null || true

echo "Auto push started on branch: $BRANCH"
echo "Press Ctrl+C to stop."

while true; do
  if [[ -n "$(git status --porcelain)" ]]; then
    git add -A
    git commit -m "autosave: $(date '+%Y-%m-%d %H:%M:%S')" || true
    git pull --rebase origin "$BRANCH" || true
    git push origin "$BRANCH"
    echo "Pushed at $(date '+%H:%M:%S')"
  fi

  sleep 60
done