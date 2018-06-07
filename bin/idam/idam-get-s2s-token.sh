#!/bin/sh
#echo $('{"microservice":"'${1}'", "oneTimePassword":"'${2}'"}' ${3}/lease)
#echo $(curl -s -H "Content-Type: application/json" -d  '{"microservice":"'${1}'", "oneTimePassword":"'${2}'"}' ${3}/lease)
echo $(curl -s -H "Content-Type: application/json" -d  '{"microservice":"'${1}'"}' ${2}/testing-support/lease)
