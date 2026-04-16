#!/bin/bash
export EXPO_TOKEN=CLI7vVDei1EdEWY-Q6WeXvZGBaGCsDroQrQLcedx
BUILD_ID="912cd23b-774e-4317-a3c1-1363d993dde7"

echo "🔍 监控 EAS Build 状态"
echo "构建ID: $BUILD_ID"
echo "日志: https://expo.dev/accounts/huangziyins-organization/projects/mindflow/builds/$BUILD_ID"
echo ""

while true; do
    echo "=== $(date) ==="
    npx eas-cli build:view $BUILD_ID 2>&1 | grep -E "status:|message:|progress:|duration:|finished" || echo "状态: 等待中..."
    echo ""
    
    # 检查是否完成
    STATUS=$(npx eas-cli build:list --limit 1 2>&1 | grep "Status" | awk '{print $2}')
    if [[ "$STATUS" == "finished" ]] || [[ "$STATUS" == "errored" ]] || [[ "$STATUS" == "canceled" ]]; then
        echo "🚨 构建状态: $STATUS"
        npx eas-cli build:list --limit 1 2>&1 | grep -A5 "Build Artifacts URL"
        break
    fi
    
    sleep 60  # 每分钟检查一次
done