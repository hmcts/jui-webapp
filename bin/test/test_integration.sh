#!/bin/sh
TEST_URL=http://localhost:3608

yarn install
yarn setup

docker-compose down

yarn test:functional

docker-compose -f ./docker/compose/docker-compose-dm.yml \
-f ./docker/compose/docker-compose-dm-ports.yml \
-f ./docker/compose/docker-compose-em.yml \
-f ./docker/compose/docker-compose-em-ports.yml \
-f ./docker/compose/docker-compose-idam.yml \
-f ./docker/compose/docker-compose-idam-ports.yml \
down

docker-compose -f ./docker/compose/docker-compose-dm.yml \
-f ./docker/compose/docker-compose-dm-ports.yml \
-f ./docker/compose/docker-compose-em.yml \
-f ./docker/compose/docker-compose-em-ports.yml \
-f ./docker/compose/docker-compose-idam.yml \
-f ./docker/compose/docker-compose-idam-ports.yml \
pull

docker-compose -f ./docker/compose/docker-compose-dm.yml \
-f ./docker/compose/docker-compose-dm-ports.yml \
-f ./docker/compose/docker-compose-em.yml \
-f ./docker/compose/docker-compose-em-ports.yml \
-f ./docker/compose/docker-compose-idam.yml \
-f ./docker/compose/docker-compose-idam-ports.yml \
up -d --build

echo "Waiting for the docker to warm up"
sleep 60s
wget --retry-connrefused --tries=120 --waitretry=1 -O /dev/null ${TEST_URL}/health

./bin/idam/idam.sh

#####################
# SMOKE TEST ########
#####################
yarn test:smoke

#xdg-open smokeTests/build/reports/tests/smoke/index.html
#open smokeTests/build/reports/tests/smoke/index.html

#####################
# INTERGATION TEST ##
#####################
yarn test:functional

#xdg-open functionalTests/build/reports/tests/functional/index.html
#open functionalTests/build/reports/tests/functional/index.html

docker-compose down
