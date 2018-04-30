#!/bin/sh
clear;
./bin/fakeversion.sh
yarn install
yarn setup-dev
yarn start
