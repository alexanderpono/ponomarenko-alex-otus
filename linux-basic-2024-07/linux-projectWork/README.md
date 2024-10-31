# План аварийного восстановления инфраструктуры web-приложения

## 1. Предусловия
1.1. Установлен docker

1.2. Есть сетевой доступ к Docker hub (для возможности скачивания docker-образов)

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


## 4. Настройка Prometheus
Создать папку ./prometheus/data, установить к ней доступ на запись для всех:
```
mkdir ./prometheus/data
sudo chown 65534:65534 ./prometheus/data 
```

## 5. Запуск web-приложения
5.1. Запустить web-приложение

```
sudo docker-compose up
```

## 6. Настройка dashboard в Grafana
### 6.1. Проверка работоспособности Prometheus

В браузере открыть http://localhost:9090/

Должен открыться веб-интерфейс:
![Подтверждение, что Prometheus работает](./readme-data/01.png)
Подтверждение, что Prometheus работает

### 6.2. Проверка работоспособности Node-explorer

В браузере открыть http://localhost:9100/

Должен открыться веб-интерфейс:
![Подтверждение, что Node-explorer работает](./readme-data/02.png)
Подтверждение, что Node-explorer работает

### 6.3. Проверка, что Node-explorer возвращает данные

В браузере открыть http://localhost:9100/metrics

Должно открыться что-то вроде этого:
![Подтверждение, что Node-explorer возвращает данные](./readme-data/03.png)
Подтверждение, что Node-explorer возвращает данные

### 6.4. Проверка работоспособности Grafana

В браузере открыть http://localhost:9110/

Должен открыться веб-интерфейс:
![Подтверждение, что Grafana работает](./readme-data/04.png)
Подтверждение, что Grafana работает

Ввести реквизиты: 
```
login = admin 
password = admin
```
и задать собственный пароль


### 6.5. Настройка дашборда Grafana

На главном экране Grafana нажимаем на кнопку меню "Бутерброд":
![](./readme-data/05.png)

В открывшемся меню выбираем Источники данных "Connections":
![](./readme-data/06.png)

Вводим "Prome" в поле поиска "Search all":
![](./readme-data/07.png)

И видим, что появился баннер Prometheus. Нажимаем на этот баннер:
![](./readme-data/08.png)

На открывшейся странице нажимаем "Add new data source":
![](./readme-data/09.png)

Вводим Имя="Prometheus", "Prometheus server url"="http://prometheus:9090"
![](./readme-data/10.png)

Проматываем страницу вниз и нажимаем "Save & test":
![](./readme-data/11.png)

В главном меню "Бутерброд" выбираем "Dashboards":
![](./readme-data/12.png)

На открывшейся странице выбираем "New", "Import":
![](./readme-data/13.png)

На открывшейся странице можно перейти к каталогу дашбордов. Вводим ID дашборда = 1860, нажимаем "Load":
![](./readme-data/14.png)

Заполняем поле "Name", выбираем в списке источников - ранее добавленный источник "Prometheus" и нажимаем "Import":
![](./readme-data/15.png)

Должна открыться страница вида:
![](./readme-data/16.png)



# Использованные источники
* https://otus.ru/lessons/linux-basic/
* https://dockerhosting.ru/blog/zapusk-prometheus-v-docker/
