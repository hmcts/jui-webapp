#!/bin/sh
IDAM_USER_BASE_URL=http://localhost:4501
IDAM_S2S_BASE_URL=http://localhost:4502
DIR="$( cd "$( dirname "$0" )" && pwd )/"

CREATE_IDAM_USER="${DIR}/idam-create-user.sh"
GET_IDAM_USER_TOKEN="${DIR}/idam-get-user-token.sh"
GET_IDAM_S2S_TOKEN="${DIR}/idam-get-s2s-token.sh"

#curl -H "Authorization:Bearer $(${GET_IDAM_USER_TOKEN} test@TEST.COM 123 ${IDAM_USER_BASE_URL})" "http://localhost:4501/details"

curl -H "Authorization:Bearer $(${GET_IDAM_S2S_TOKEN} em_gw ${IDAM_S2S_BASE_URL})" "http://localhost:4502/details"
