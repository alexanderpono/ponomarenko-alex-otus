#!/bin/bash
g++ -Wall -g --std=c++11 src/app.cpp -o output/app -lstdc++

if [ $? -eq 0 ]
then
    sleep .1
    ./output/app
else
    echo "Error compile file"
fi
