[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/hmcts/rpa-jui-webapp.svg?branch=master)](https://travis-ci.org/hmcts/rpa-jui-webapp)
[![codecov](https://codecov.io/gh/hmcts/rpa-jui-webapp/branch/master/graph/badge.svg)](https://codecov.io/gh/hmcts/rpa-jui-webapp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fbdfcfc51d514d7f8f405d5cb509cb5a)](https://www.codacy.com/app/HMCTS/rpa-jui-webapp)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/fbdfcfc51d514d7f8f405d5cb509cb5a)](https://www.codacy.com/app/HMCTS/rpa-jui-webapp)
[![Known Vulnerabilities](https://snyk.io/test/github/hmcts/rpa-jui-webapp/badge.svg)](https://snyk.io/test/github/hmcts/rpa-jui-webapp)

[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=bugs)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=coverage)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=ncloc)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=alert_status)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=security_rating)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=sqale_index)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)
[![sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=rpa-jui-webapp&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=rpa-jui-webapp)


# Judaical UI Webapp
This is the Web Application to allow Judaical staff (Judges & Panel Members) to access and work on cases.

## Cloning repo
```bash
git clone https://github.com/hmcts/rpa-jui-webapp.git
cd rpa-jui-webapp/
```

## Set Environmental Variables
```bash
export S2S_SECRET=
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
npm run watch-dev-node
# or if you have nodemon
nodemon dev-server.js
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

## Run test
### lint
```bash
 yarn test;
 open ./reports/lint/node/index.html;
 xdg-open ./reports/lint/node/index.html;
 open ./reports/lint/ng/index.html;
 xdg-open ./reports/lint/ng/index.html;
```
#### lint (ng Only)
```bash
 yarn test:ng;
 open ./reports/lint/ng/index.html;
 xdg-open ./reports/lint/ng/index.html;
```
#### lint (Node Only)
```bash
 yarn test:node;
 open ./reports/lint/node/index.html;
 xdg-open ./reports/lint/node/index.html;
```
### Unit test
```bash
 yarn test;
 open ./reports/tests/unit/node/index.html;
 xdg-open ./reports/tests/unit/node/index.html;
 open ./reports/tests/unit/ng/index.html;
 xdg-open ./reports/tests/unit/ng/index.html;
```
#### Unit test (ng Only)
```bash
 yarn test:ng;
 open ./reports/tests/unit/ng/index.html;
 xdg-open ./reports/tests/unit/ng/index.html;
```
#### Unit test (Node Only)
```bash
 yarn test:node;
 open ./reports/tests/unit/node/index.html;
 xdg-open ./reports/tests/unit/node/index.html;
```
### Unit test + coverage
```bash
 yarn test:coverage;
 open ./reports/tests/coverage/node/index.html;
 xdg-open ./reports/tests/coverage/node/index.html;
 open ./reports/tests/coverage/ng/index.html;
 xdg-open ./reports/tests/coverage/ng/index.html;
```
#### Unit test + coverage (ng Only)
```bash
 yarn test:coverage:ng;
 open ./reports/tests/coverage/ng/index.html;
 xdg-open ./reports/tests/coverage/ng/index.html;
```
#### Unit test + coverage (Node Only)
```bash
 yarn test:coverage:node;
 open ./reports/tests/coverage/node/index.html;
 xdg-open ./reports/tests/coverage/node/index.html;
```
### Functional test
```bash
export TEST_EMAIL=;
export TEST_PASSWORD=;
yarn test:functional:local 
open ./reports/tests/functional/index.html;
xdg-open ./reports/tests/functional/index.html;
```


##Run Mock Server for CCD data for Development

Install JSON Server


```bash
npm install -g json-server
```

Set the environment variable :

Mac :
 ```
 export JUI_ENV=mock;
 ```
 Windows: 
 
 ```
 set JUI_ENV=mock
 echo %JUI_ENV%
 ```
 

Run the mock Server

```
yarn install
yarn start-json-server
```
This will run a mock server (json-server) on port 3004 and sets the JUI_ENV as ```mock```.

Now, run the below in the terminal and then start running the api (node)
 ```bash
export JUI_ENV=mock; 
yarn build; 
yarn start
```

Note : Here is the git repo for json-server : https://github.com/typicode/json-server

