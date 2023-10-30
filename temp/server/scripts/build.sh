#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo -e "\n${green}[========================= Building Docker Image =========================]${reset}"
docker-compose build
docker-compose up -d


echo -e "${green}[========================= Executing  Migrations =========================]${reset}"
chars="."
end=$((SECONDS+40))

while [ $SECONDS -lt $end ]; do
    sleep 0.5
    echo -en "${chars:$i:1}"
done

docker exec node-1 npm run typeorm migration:run