#!/bin/sh
IDAM_USER_BASE_URL=http://localhost:4501
IDAM_S2S_BASE_URL=http://localhost:4502

DIR="$( cd "$( dirname "$0" )" && pwd )/"
CREATE_IDAM_USER="${DIR}/../idam/idam-create-user.sh"
GET_IDAM_USER_TOKEN="${DIR}/../idam/idam-get-user-token.sh"
GET_IDAM_S2S_TOKEN="${DIR}/../idam/idam-get-s2s-token.sh"

IDAM_JWT=$(${GET_IDAM_USER_TOKEN} test@TEST.COM 123 ${IDAM_USER_BASE_URL})
S2S_JWT=$(${GET_IDAM_S2S_TOKEN} ccd_data ${IDAM_S2S_BASE_URL})

echo $(curl -s \
-H "Authorization:Bearer ${IDAM_JWT}" \
-H "ServiceAuthorization:${S2S_JWT}" \
-H 'Content-Type:application/json' \
${5}/caseworkers/${1}/jurisdictions/${2}/case-types/${3}/event-triggers/${4}/token \
| jq -r '."token"')
