#!/bin/bash

# node files/dist/bak -w files/work -b files/backup -d files/diff -s print -k .git node_modules

# node /d/www/files/dist/bak -w files -b /d/Backups/files -d /d/Backups/diff -s backup -k .git node_modules coverage backup diff work
cd ../app-dev
npm run build

cd ..

mkdir ./demo/app-static
cp ./app-dev/temp/ui-dist/*.* ./demo/app-static
cp -r ./app-dev/temp/ui-dist/src ./demo/app-static
