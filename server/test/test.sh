#!/bin/bash

port=${PORT:-8080}
host=${HOST:-http://localhost}
url="$host:$port"
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function create_humm {
  printf '\n> Uploading audio\n'
  local id=$(curl -XPOST -F file=@$dir/humm.aac $url/upload 2> /dev/null)

  printf '\n> Creating humm\n'
  cat $dir/humm-create.json | sed "s/REPLACED_ID/$id/g" > /tmp/humm-create.json
  curl -XPOST --data "@/tmp/humm-create.json" $url/api/humms

  printf '\n> Retrieving humm\n'
  curl -XGET $url/api/humms/$id
}

printf '\n> Create facebook user\n'
facebookId=$(date +%s)
cat $dir/create-facebook-user.json | sed "s/REPLACED_ID/$facebookId/g" > /tmp/create-facebook-user.json
userId=$(curl -XPOST --data "@/tmp/create-facebook-user.json" $url/api/create-facebook-user 2> /dev/null | jq --raw-output .id)

printf '\n> Retrieving user by facebook id\n'
curl -XGET $url/api/user-by-facebook-id/$facebookId

printf '\n> Retrieving next humm when no humms are available\n'
curl -XGET $url/api/nexthumm/$userId

create_humm
create_humm

printf '\n> Retrieving next humm\n'
curl -XGET $url/api/nexthumm/$userId

printf '\n> Retrieving next humm\n'
curl -XGET $url/api/nexthumm/$userId
