#!/bin/bash

function create_humm {
  printf '\n> Uploading audio\n'
  local id=$(curl -XPOST -F file=@humm.aac http://localhost:8080/upload 2> /dev/null)
  echo "ID: $id"
  printf '\n> Creating humm\n'
  cat humm-create.json | sed "s/REPLACED_ID/$id/g" > /tmp/humm-create.json
  curl -XPOST --data "@/tmp/humm-create.json" http://localhost:8080/api/humms

  printf '\n> Retrieving humm\n'
  curl -XGET http://localhost:8080/api/humms/$id
}

create_humm
create_humm

printf '\n> Retrieving user by facebook id\n'
curl -XGET http://localhost:8080/api/user-by-facebook-id/100618010415530

printf '\n> Create facebook user\n'
facebookId=$(date +%s)
cat create-facebook-user.json | sed "s/REPLACED_ID/$facebookId/g" > /tmp/create-facebook-user.json
userId=$(curl -XPOST --data "@/tmp/create-facebook-user.json" http://localhost:8080/api/create-facebook-user 2> /dev/null | jq --raw-output .id)

printf '\n> Retrieving next humm\n'
curl -XGET http://localhost:8080/api/nexthumm/$userId

printf '\n> Retrieving next humm\n'
curl -XGET http://localhost:8080/api/nexthumm/$userId
