#!/bin/zsh
# «Фитнес» в симуляторе iOS 27 крутится в бесконечном цикле обновления данных (ошибка Apple, ~1 ядро даже в фоне).
# open   — открыть (или разморозить и вывести на экран);  freeze — заморозить: 0% процессора, экран и данные сохраняются;
# close  — закрыть совсем;  status — показать, запущен ли и сколько ест.
P=$(pgrep -f "Fitness.app/Fitness$" | head -1)
case "$1" in
  open)   [[ -n $P ]] && kill -CONT $P; xcrun simctl launch booted com.apple.Fitness >/dev/null && echo "Фитнес открыт" ;;
  freeze) [[ -n $P ]] && kill -STOP $P && echo "Фитнес заморожен" || echo "Фитнес не запущен" ;;
  close)  [[ -n $P ]] && kill -CONT $P; xcrun simctl terminate booted com.apple.Fitness 2>/dev/null; echo "Фитнес закрыт" ;;
  *)      [[ -z $P ]] && echo "Фитнес не запущен" || { S=$(ps -o stat= -p $P); [[ $S == T* ]] && echo "Фитнес заморожен (0%)" || echo "Фитнес работает: $(ps -o %cpu= -p $P)% процессора"; } ;;
esac
