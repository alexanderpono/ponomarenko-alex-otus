#!/bin/bash

SOURCE=${BASH_SOURCE[0]}
dirName=`dirname $SOURCE`
fullDirName=`readlink -f $dirName`


function getParam {
    paramName=$1
   
    returnedVal=`cat "$fullDirName/params/$paramName"`
}

targetCompose=$dirName/docker-compose.yml
echo "targetCompose=$targetCompose"
cp "$dirName/templates/docker-compose-template.yml" $targetCompose

usersInitSql=$dirName/project-db-source/mysql-init-db/users-init.sql
getParam 'DB_USER_REPL_PASS'
DB_USER_REPL_PASS=$returnedVal
# echo "DB_USER_REPL_PASS=$DB_USER_REPL_PASS"

getParam 'DB_USER_READ_PASS'
DB_USER_READ_PASS=$returnedVal
# echo "DB_USER_READ_PASS=$DB_USER_READ_PASS"

getParam 'DB_USER_LOCAL_READ_PASS'
DB_USER_LOCAL_READ_PASS=$returnedVal
# echo "DB_USER_LOCAL_READ_PASS=$DB_USER_LOCAL_READ_PASS"

getParam 'DB_USER_API_PASS'
DB_USER_API_PASS=$returnedVal
# echo "DB_USER_API_PASS=$DB_USER_API_PASS"

cp "$dirName/templates/init.sql.template" $usersInitSql
sed -i "s/{DB_USER_REPL_PASS}/$DB_USER_REPL_PASS/g" $usersInitSql
sed -i "s/{DB_USER_READ_PASS}/$DB_USER_READ_PASS/g" $usersInitSql
sed -i "s/{DB_USER_API_PASS}/$DB_USER_API_PASS/g" $usersInitSql
sed -i "s/{DB_USER_LOCAL_READ_PASS}/$DB_USER_LOCAL_READ_PASS/g" $usersInitSql

targetInitSql=$dirName/project-db-source/mysql-init-db/init.sql
echo "targetInitSql=$targetInitSql"
cat $usersInitSql "$dirName/params/db_backup.sql" > $targetInitSql
unlink $usersInitSql

dbReplicaSecret=$dirName/project-db-replica/mysql-secrets/mysql-root
echo "dbReplicaSecret=$dbReplicaSecret"
cp "$dirName/params/mysql-root" $dbReplicaSecret

dbSourceSecret=$dirName/project-db-source/mysql-secrets/mysql-root
echo "dbSourceSecret=$dbSourceSecret"
cp "$dirName/params/mysql-root" $dbSourceSecret

phpApiConfig=$dirName/html/mysql-requisites.php
echo "phpApiConfig=$phpApiConfig"
cp "$dirName/templates/mysql-requisites-template.php" $phpApiConfig
sed -i "s/{DB_USER_API_PASS}/$DB_USER_API_PASS/g" $phpApiConfig
sed -i "s/{DB_USER_READ_PASS}/$DB_USER_READ_PASS/g" $phpApiConfig
