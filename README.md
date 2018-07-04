# Judaical UI Webapp

This is the Web Application to allow Judaical staff (Judges & Panel Members) to access and work on cases.

## Cloning repo
```bash
git clone https://github.com/hmcts/jui-webapp.git
cd jui-webapp/
```

## Set Environmental Variables
```bash
export JUI_S2S_SECRET=
export IDAM_SECRET=
```

## Run Local with quick reload for angular
To Run the Angular code
```bash
yarn install
yarn start-dev-proxy
```
To Run the Node Code
```bash
yarn install
yarn start-dev-node
```

## Run Local like prod
```bash
yarn install
yarn build
yarn start
```

## Run Local with docker
To Run the Angular code with docker
```bash
yarn start-dev-docker-proxy;
```
To Run the Node Code with docker
```bash
yarn start-dev-docker-node;
```
spin up docker
```bash
./docker/buildrun-docker-base.sh
```
setup test idam users
```bash
./bin/idam/idam.sh
```
setup test ccd data (note you need to find your own ccd def file)
```bash
./bin/ccd/ccd.sh ~/Downloads/CCD_Definition.xlsx
```

## Run test...
WIP
