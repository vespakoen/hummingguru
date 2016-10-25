#!/bin/bash

curl -XPOST -F file=@humm.aac http://localhost:8080/upload
curl -XPOST --data "@humm-create.json" http://localhost:8080/api/humms
