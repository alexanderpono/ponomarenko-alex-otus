#!/bin/bash
g++ -Wall -g --std=c++11 src/app.cpp -o output/app -lstdc++

if [ $? -eq 0 ]
then
    ./output/app
    ts-node --project tsconfig.json -r tsconfig-paths/register src/app.ts
else
    echo "Error compile file"
fi
