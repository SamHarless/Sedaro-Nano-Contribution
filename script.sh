#!/bin/bash

echo "running my list of commands"
docker build -t sedaro-nano .
docker build -t api-image -f APIDockerfile . 
docker network create myNetwork
docker run -d --name api-container --network myNetwork -p 5000:5000 api-image
docker run -d --name web-container --network myNetwork -p 8080:3000 sedaro-nano