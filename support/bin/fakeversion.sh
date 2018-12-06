#!/bin/sh
echo "version: $(node -pe 'require("./package.json").version')" > version
echo "number: ${BUILD_NUMBER:-local}" >> version
echo "commit: $(git rev-parse --short HEAD)" >> version
echo "date: $(date)" >> version
