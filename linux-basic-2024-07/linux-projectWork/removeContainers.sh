#!/bin/bash

sudo docker rm logstash kibana filebeat es project-api-balancer grafana project-prometheus exporter project-api-1 project-api-2 project-db-replica project-db-source
sudo rm -r ./project-prometheus/data
mkdir ./project-prometheus/data
touch ./project-prometheus/data/.gitkeep

sudo rm -r ./grafana/data
mkdir ./grafana/data
touch ./grafana/data/.gitkeep

sudo rm -r ./logstash/data
mkdir ./logstash/data
touch ./logstash/data/.gitkeep

sudo rm -r ./kibana/data
mkdir ./kibana/data
touch ./kibana/data/.gitkeep

sudo rm -r ./project-api-balancer-filebeat/data
mkdir ./project-api-balancer-filebeat/data
touch ./project-api-balancer-filebeat/data/.gitkeep

sudo rm -r ./es/data
mkdir ./es/data
touch ./es/data/.gitkeep

