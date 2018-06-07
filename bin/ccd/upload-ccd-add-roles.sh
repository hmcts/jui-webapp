IDAM_USER_BASE_URL=http://localhost:4501
IDAM_S2S_BASE_URL=http://localhost:4502
DIR="$( cd "$( dirname "$0" )" && pwd )/"

CREATE_IDAM_USER="${DIR}/../idam/idam-create-user.sh"
GET_IDAM_USER_TOKEN="${DIR}/../idam/idam-get-user-token.sh"
GET_IDAM_S2S_TOKEN="${DIR}/../idam/idam-get-s2s-token.sh"

#echo "Authorization: Bearer $(${GET_IDAM_USER_TOKEN} test@TEST.COM 123 ${IDAM_USER_BASE_URL})"
#echo "ServiceAuthorization:$(${GET_IDAM_S2S_TOKEN} ccd_gw ${IDAM_S2S_BASE_URL})"

curl -XPUT \
-H "Authorization:Bearer $(${GET_IDAM_USER_TOKEN} test@TEST.COM 123 ${IDAM_USER_BASE_URL})" \
-H "ServiceAuthorization:$(${GET_IDAM_S2S_TOKEN} ccd_data ${IDAM_S2S_BASE_URL})" \
-H "Content-Type: application/json" \
-d '{"role":"caseworker-sscs"}' \
http://localhost:4451/api/user-role


#-H "ServiceAuthorization:$(${GET_IDAM_S2S_TOKEN} ccd_gw ${IDAM_S2S_BASE_URL})" \


