#!/bin/bash

supportedBrowsers=`sed '/\/\//d' /crossbrowser/supportedBrowsers.js | sed '/: {/!d' | sed "s/[\'\:\{ ]//g"`
browsersArray=(${supportedBrowsers//$'\n'/ })
finalExitStatus=0

echo
echo "*****************************************"
echo "* The following browsers will be tested *"
echo "*****************************************"
echo  "$supportedBrowsers"
echo "****************************************"
echo

for i in "${browsersArray[@]}"
do
    echo "*** Testing $i ***"
    SAUCELABS_BROWSER=$i TUNNEL_IDENTIFIER=saucelabs-overnight-tunnel yarn crossbrowser-e2e --reporter mochawesome --reporter-options reportFilename="${i}_report",reportDir=/crossbrowser/reports

    exitStatus=$?
    if [ $exitStatus -ne 0 ]; then
        finalExitStatus=$exitStatus
    fi
done

exit $finalExitStatus
