#!/bin/bash

cd ../bricks-runner
npm run build

cd ..

mkdir ./demo/bricks-static
cp ./bricks-runner/temp/bricks/*.* ./demo/bricks-static
cp -r ./bricks-runner/temp/bricks/src ./demo/bricks-static
