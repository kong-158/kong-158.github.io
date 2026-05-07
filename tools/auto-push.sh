#!/usr/bin/env bash

BRANCH="${1:-draft}"

git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH"
git push -u origin "$BRANCH" 2>/dev/null || true

echo "Auto push started on branch: $BRANCH"
echo "Press Ctrl+C to stop."

while true; do
  # 刷新 Git 对文件状态的判断，但不改工作区文件
  git update-index -q --refresh

  # 如果有未提交修改，才提交并推送
  if [[ -n "$(git status --porcelain)" ]]; then
    git add -A
    git commit -m "autosave: $(date '+%Y-%m-%d %H:%M:%S')" || true
    git push origin "$BRANCH" || true
    echo "Pushed at $(date '+%H:%M:%S')"
  fi

  # 间隔改长一点，避免一直打扰 VS Code
  sleep 180
done