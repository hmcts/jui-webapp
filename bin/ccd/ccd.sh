#!/bin/sh

DIR="$( cd "$( dirname "$0" )" && pwd )/"

UPLOAD_CCD_ROLE="${DIR}upload-ccd-roles.sh"
UPLOAD_CCD_DEF="${DIR}upload-ccd-def.sh"
UPLOAD_CCD_DATA="${DIR}upload-ccd-data.sh"

${UPLOAD_CCD_ROLE} caseworker-sscs PUBLIC http://localhost:4451
${UPLOAD_CCD_ROLE} caseworker-sscs-systemupdate PUBLIC http://localhost:4451
${UPLOAD_CCD_ROLE} caseworker-sscs-anonymouscitizen PUBLIC http://localhost:4451
${UPLOAD_CCD_ROLE} caseworker-sscs-callagent PUBLIC http://localhost:4451

${UPLOAD_CCD_DEF} ${1} http://localhost:4451


${UPLOAD_CCD_DATA} http://localhost:4452
