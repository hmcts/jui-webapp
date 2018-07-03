#!/bin/sh

#Import Scripts
DIR="$( cd "$( dirname "$0" )" && pwd )/"
CREATE_IDAM_USER="${DIR}/../idam/idam-create-user.sh"
GET_IDAM_USER_TOKEN="${DIR}/../idam/idam-get-user-token.sh"
GET_IDAM_S2S_TOKEN="${DIR}/../idam/idam-get-s2s-token.sh"
GET_CCD_CASE_TOKEN="${DIR}generate-ccd-case-token.sh"

#Set Constant Vars
IDAM_USER_BASE_URL=http://localhost:4501
IDAM_S2S_BASE_URL=http://localhost:4502
CCD_DATA_BASE_URL=http://localhost:4452

USER_ID=28
JURISDICTION=SSCS
CASE_TYPE=Benefit
EVENT_TYPE=appealCreated


IDAM_JWT=$(${GET_IDAM_USER_TOKEN} test@TEST.COM 123 ${IDAM_USER_BASE_URL})
S2S_JWT=$(${GET_IDAM_S2S_TOKEN} ccd_data ${IDAM_S2S_BASE_URL})

CCD_TOKEN=$(${GET_CCD_CASE_TOKEN} ${USER_ID} ${JURISDICTION} ${CASE_TYPE} ${EVENT_TYPE} ${CCD_DATA_BASE_URL})
CCD_PAYLOAD=$(printf '{
 "event_token": "'${CCD_TOKEN}'",
  "event" : {
   "id":"appealCreated",
   "summary":"xxx",
    "description":"xxxx"
   },
  "data" : {
  "caseReference":"1234",
  "appeal": {
     "appellant": {
        "name": {
         "firstName": "Bob",
         "lastName": "Bobby"
         }
      }
    }
  }
}')

curl -X POST \
-H "Authorization:Bearer ${IDAM_JWT}" \
-H "ServiceAuthorization:${S2S_JWT}" \
-H 'Content-Type:application/json' \
-d "${CCD_PAYLOAD}" ${CCD_DATA_BASE_URL}/caseworkers/${USER_ID}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases
