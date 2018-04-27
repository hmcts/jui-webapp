#!/bin/bash

supportedBrowsers=`sed '/\/\//d' crossbrowser/supportedBrowsers.js | sed '/: {/!d' | sed "s/[\'\:\{ ]//g"`
browsersArray=(${supportedBrowsers//$'\n'/ })

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
    SAUCELABS_BROWSER=$i TUNNEL_IDENTIFIER=test-saucelabs yarn crossbrowser-e2e
done
