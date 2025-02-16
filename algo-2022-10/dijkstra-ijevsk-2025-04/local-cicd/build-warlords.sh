#!/bin/bash

cd ../warlords
npm run build

cd ..

mkdir ./demo/warlords-static
cp ./warlords/temp/ui-dist/*.* ./demo/warlords-static
# cp -r ./warlords/temp/ui-dist/src ./demo/warlords-static
