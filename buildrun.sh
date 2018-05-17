#!/bin/sh

#JUI_MICROSERVICE
DM_STORE_URI = http://localhost:4603
S2S_URI = http://localhost:4502
NODE_ENV = alectronic
PORT = 3000


clear;
./bin/fakeversion.sh
yarn cache clean
yarn install --force
yarn build-universal
yarn start

