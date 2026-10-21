#!/bin/zsh
# usage: shot.sh spec.json out.png [wait]
S=/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad
C=$(xcrun simctl get_app_container booted local.test.glass data)/Documents; mkdir -p $C
ID=$(python3 -c "import json,sys;print(json.load(open('$1'))['id'])")
rm -f $C/ack.txt; cp "$1" $C/spec.json
for i in $(seq 1 100); do [[ -f $C/ack.txt && "$(cat $C/ack.txt)" == "$ID" ]] && break; sleep 0.05; done
sleep ${3:-1.2}
xcrun simctl io booted screenshot --type=png "$2" >/dev/null 2>&1
