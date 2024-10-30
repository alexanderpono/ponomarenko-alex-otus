# План аварийного восстановления инфраструктуры web-приложения

## 1. Предусловия
1.1. Установлен docker
1.2. Есть сетевой доступ к Docker hub (для возможности скачивания docker-образов, если врозникнет необходимость)

## 2. Настройка параметров конфигурации

2.1. Создать файл ./params/db_backup.sql с дампом базы данных проекта (см. пример [./params/db_backup.sql.example](./params/db_backup.sql.example))

2.2. Создать файл ./params/DB_USER_API_PASS для задания пароля пользователя "API-запись в базу" web-приложения, значение должно быть заключено в прямые одинарные кавычки (см. пример [./params/DB_USER_API_PASS.example](./params/DB_USER_API_PASS.example))

2.3. Создать файл ./params/DB_USER_LOCAL_READ_PASS для задания пароля пользователя "Локальное чтение из базы" web-приложения, значение должно быть заключено в прямые одинарные кавычки (см. пример [./params/DB_USER_LOCAL_READ_PASS.example](./params/DB_USER_LOCAL_READ_PASS.example))

2.4. Создать файл ./params/DB_USER_READ_PASS для задания пароля пользователя "Удаленное чтение из базы" web-приложения, значение должно быть заключено в прямые одинарные кавычки (см. пример [./params/DB_USER_READ_PASS.example](./params/DB_USER_READ_PASS.example))

2.5. Создать файл ./params/DB_USER_REPL_PASS для задания пароля пользователя "Репликация" web-приложения, значение должно быть заключено в прямые одинарные кавычки (см. пример [./params/DB_USER_REPL_PASS.example](./params/DB_USER_REPL_PASS.example))

2.6. Создать файл ./params/PROJECT_DB_SOURCE_IP для задания IP-адреса Source-узла БД приложения (см. пример [./params/PROJECT_DB_SOURCE_IP.example](./params/PROJECT_DB_SOURCE_IP.example)). IP-адрес необходим для работы актоматического копирования БД с Source-узла в Replica-узел БД.

2.7. Создать файл ./params/PROJECT_DB_REPLICA_IP для задания IP-адреса Replica-узла БД приложения (см. пример [./params/PROJECT_DB_SOURCE_IP.example](./params/PROJECT_DB_SOURCE_IP.example))

2.8. Создать файл ./params/mysql-root для задания пароля пользователя "root" MySQL-сервера, значение должно быть указано БЕЗ ОБРАМЛЯЮЩИХ КАВЫЧЕК (см. пример [./params/mysql-root.example](./params/mysql-root.example))

## 3. Сборка файлов конфигурации
3.1. Запустить скрипт для сборки файлов конфигурации web-приложения из шаблонов и значений, заданных в папке ./params.
```
bash ./buildConfigs.sh
```

В результате выполнения скрипта должны создаться файлы:
* ./project-db-source/mysql-init-db/init.sql
* ./project-db-source/mysql-secrets/mysql-root
* ./project-db-replica/mysql-secrets/mysql-root
* ./docker-compose.yml
* ./html/mysql-requisites.php


## 4. Запуск web-приложения
4.1. Запустить web-приложение

```
sudo docker-compose up
```
