#!/bin/bash

cd ../bricks-runner-arcade
npm run build

cd ..

mkdir ./demo/bricks-arcade-static
cp ./bricks-runner-arcade/temp/ui-dist/*.* ./demo/bricks-arcade-static
cp -r ./bricks-runner-arcade/temp/ui-dist/src ./demo/bricks-arcade-static
