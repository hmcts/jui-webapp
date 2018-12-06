#!/bin/sh
export http_proxy=http://proxyout.reform.hmcts.net:8080
export https_proxy=$http_proxy
curl -X DELETE "https://preprod-idamapi.reform.hmcts.net:3511/testing-support/accounts/${1}"
