#!/bin/sh

yarn test:coverage

xdg-open test/coverage/index.html
open test/coverage/index.html

# if java gradle
#./gradlew jacocoTestReport --info

#xdg-open build/reports/jacoco/test/html/index.html
#open build/reports/jacoco/test/html/index.html

#./gradlew sonarqube -Dsonar.host.url=$SONARQUBE_URL
