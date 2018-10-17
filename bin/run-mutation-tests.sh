#!/bin/bash

echo "start: $(date)"

for file in ./test/mutation/mutation_components.conf.js ; do
  echo "file: $file";
  yarn test:stryker $file ;
done

echo "end: $(date)"
