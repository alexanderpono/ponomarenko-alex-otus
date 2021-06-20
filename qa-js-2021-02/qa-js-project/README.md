# ponomarenko-alex-otus qa-js-2021-02 qa-js-project
Проектная работа по курсу "Javascript QA Engineer"

<h2>Развертывание приложения</h2>


1. скачать репозиторий
```
$ git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```
2. зайти в папку ponomarenko-alex-otus
```
$ cd ponomarenko-alex-otus
```
3. установить зависимости
```
$ npm i
```
4. запустить сервер mongodb локально

5. проинициализировать БД
```
$ mongoimport --collection=user --db=courses db-init/user.json
```
6. запустить API
```
$ npm run apidev
```
API должна быть доступна по адресу
http://localhost:3000/


Запуск тестов
```
npx jest
```