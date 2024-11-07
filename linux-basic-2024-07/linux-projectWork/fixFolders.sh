#!/bin/bash

sudo chown 65534:65534 ./project-prometheus/data

sudo chmod 777 ./logstash/data

sudo chown 65534:65534 ./kibana/data 
sudo chmod 777 ./kibana/data

sudo chmod 777 ./project-api-balancer-filebeat/data

sudo chmod 777 ./es/data
