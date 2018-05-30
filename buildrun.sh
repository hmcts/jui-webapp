#!/bin/sh
clear;
./bin/fakeversion.sh
yarn cache clean
yarn install --force
yarn build-universal
yarn start-dev-proxy

# Then start node dev-server.js
