#!/bin/sh
export http_proxy=http://proxyout.reform.hmcts.net:8080
export https_proxy=$http_proxy
curl -s -H 'Content-Type: application/json' -d '{ "email":"'"${1}"'", "forename":"test@TEST.COM","surname":"test@TEST.COM","password":"1234567", "roles": ["caseworker","caseworker-sscs", "judge-sscs"], "userGroup":"caseworker"}' https://preprod-idamapi.reform.hmcts.net:3511/testing-support/accounts
