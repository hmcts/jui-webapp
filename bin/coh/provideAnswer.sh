#!/usr/bin/env bash

if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "Provide the CASE ID and the ROUND NUMBER and optionally the env."
    exit 1
fi

CASE_ID=$1
THE_ROUND=$2
COH_HOST=$3

if [ -z "$COH_HOST" ]
then
    COH_HOST='http://coh-cor-aat.service.core-compute-aat.internal'
    echo "using the default target host $COH_HOST. Use http://coh-cor-demo.service.core-compute-demo.internal (third argument) for DEMO"
fi

echo "PROVIDING ANSWERS FOR CASE $CASE_ID (round $THE_ROUND, against $COH_HOST)"

HEARING_ID=$(curl -s -H 'Content-Type: application/json' "$COH_HOST/continuous-online-hearings?case_id=$CASE_ID" | jq -r '."online_hearings"[0].online_hearing_id')
QUESTION_RESPONSES=$(curl -s -H 'Content-Type: application/json' "$COH_HOST/continuous-online-hearings/$HEARING_ID/questions")
NUMBER_OF_QUESTIONS=$(echo $QUESTION_RESPONSES | jq -r '.questions | length')

echo "Number of questions: $NUMBER_OF_QUESTIONS"

ROUND_SENT='false'
for row in $(echo "${QUESTION_RESPONSES}" | jq -r '.questions[] | @base64'); do
    _jq() {
        echo ${row} | base64 --decode | jq -r ${1}
    }
    ROUND=$(echo $(_jq '.question_round'))

    if [ $THE_ROUND == $ROUND ]
    then
        STATE=$(echo $(_jq '.current_question_state.state_name'))

        Q_ID=$(echo $(_jq '.question_id'))
        echo "QUESTION $Q_ID, ROUND $ROUND, STATE $STATE"

        if [ $STATE == 'question_drafted' ] && [ ROUND_SENT == 'false' ]
        then
            ROUND_SENT='true'
            echo "ROUND $ROUND SENT TO APPELLANT"
            curl -X PUT -s -H 'Content-Type: application/json' -d '{"state_name": "question_issued"}' "$COH_HOST/continuous-online-hearings/$HEARING_ID/questionrounds/$ROUND"
        fi
        curl -s -H 'Content-Type: application/json' -d '{"answer_text": "The answer provided!", "answer_state": "answer_submitted"}' "$COH_HOST/continuous-online-hearings/$HEARING_ID/questions/$Q_ID/answers"

        echo "ANSWER SUBMITTED"
    fi
done
