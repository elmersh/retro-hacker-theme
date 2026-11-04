#!/usr/bin/env bash
# Bash — deploy de ejemplo
set -euo pipefail

readonly APP="facxi"
SERVER="${DEPLOY_HOST:-deploy@10.0.0.5}"
declare -a SERVICES=(web queue scheduler)

log() { printf '\e[32m[%s]\e[0m %s\n' "$(date +%T)" "$*"; }

deploy() {
  local branch=${1:-main}
  log "Desplegando $APP ($branch) en $SERVER"
  for svc in "${SERVICES[@]}"; do
    if [[ "$svc" == "queue" ]]; then
      ssh "$SERVER" "sudo systemctl restart ${APP}-${svc}" || log "falló $svc"
    fi
  done
  case "$branch" in
    main|master) echo "producción" ;;
    *) echo "staging" ;;
  esac
}

trap 'log "abortado"; exit 130' INT
deploy "$@" | tee -a /tmp/deploy.log 2>&1
