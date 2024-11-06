#!/bin/bash

mkdir ./project-prometheus/data
sudo chown 65534:65534 ./project-prometheus/data

mkdir ./logstash/data
sudo chmod 777 ./logstash/data

mkdir ./kibana/data
sudo chown 65534:65534 ./kibana/data 
sudo chmod 777 ./kibana/data

mkdir ./project-api-balancer-filebeat/data
sudo chmod 777 ./project-api-balancer-filebeat/data

mkdir ./es
mkdir ./es/data
sudo chmod 777 ./es/data
