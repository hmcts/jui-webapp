#!/bin/sh
clear;
./bin/fakeversion.sh
#yarn cache clean
yarn install --force
yarn build-universal
node server.js
# Then start node dev-server.js

