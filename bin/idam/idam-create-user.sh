#!/bin/sh
curl -s -H 'Content-Type: application/json' -d '{ "email":"'"${1}"'", "forename":"'"${4}"'","surname":"'"${5}"'","password":"'"${2}"'", "roles": ["ccd-import","caseworker","caseworker-sscs","caseworker-sscs-systemupdate"],"userGroup": {"code": "caseworker"}}' ${3}/testing-support/accounts
