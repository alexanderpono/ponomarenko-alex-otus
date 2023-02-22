#!/bin/bash
g++ -Wall -g --std=c++11 src/GCD.cpp -o output/GCD -lstdc++

if [ $? -eq 0 ]
then
    sleep .1
    npm start
    ./output/GCD
else
    echo "Error compile file"
fi
