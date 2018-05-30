#!/bin/sh
curl -s -H 'Content-Type: application/json' -d '{ "email":"'"${1}"'", "forename":"'"${4}"'","surname":"'"${5}"'","password":"'"${2}"'"}' ${3}/testing-support/accounts
