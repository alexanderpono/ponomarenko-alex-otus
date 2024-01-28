[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 7.  Проект Best Courses Ever - Шаг 4 - Авторизация
# Домашнее задание 7.  Проект Best Courses Ever - Шаг 4 - Авторизация

Шаг 4 - Авторизация
## Цель:
  * Понимать и реализовывать паттерны авторизации в Web backend приложении



## Описание/Пошаговая инструкция выполнения домашнего задания:

Выберите и реализуйте стратегию авторизации, а также регистрации новых пользователей.

## Критерии оценки:

```
1.Факт свершения действия - ДЗ отправлена на проверку
+1 балл
2. Степень выполнения ДЗ
+1 балл – результат скорее не достигнут, чем достигнут
+2 баллов – результат скорее достигнут, чем не достигнут
+3 балла – результат достигнут полностью
3. Способ выполнения ДЗ
+1 балл – использован неоптимальный способ достижения результата
+2 балл – оптимальный способ достижения результата использован частично
+3 балл – использован наиболее оптимальный способ достижения результата
4. Скорость выполнения ДЗ
+1 балл – работа сдана под конец курса
+2 балла – работа сдана с отставанием
+3 балла – дедлайн соблюден
Статус "Принято" ставится при наборе 5 баллов
```

## Выполнение д/з №7
1. В приложение добавлена поддержка аутентификации пользователя. 

   В качестве метода аутентификации выбран HTTP Basic.

2. Для контроля доступа к функциям API использован механизм, в которой необходима успешная аутентификации пользователя, а также наличие у пользователя соответствующей привилегии, которая необходима для доступа к данной функции API. 

   В схему User добавлено поле "privileges" со списком привилегий пользователя.

3. Планирую, что новые пользователи будут добавляться в систему администратором, поэтому сценарий "самостоятельная регистрация пользователя" не предусмотрен.

4. Добавлена поддержка аутентификации и авторизации для API:
```
/api/courses
/api/users
/api/files
/admin/users
/admin/files
```
5. Доработаны тесты API с учетом проверки контроля доступа к функциям API - см. файл (api-tests/api.spec.js)

6. Доработано описание API. См.: 
* doc/api.yaml
* https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw07-auth/node-2023-11/hw04_les07-webServers/doc/api.yaml

7. Добавлена валидация входных данных (adminUsers.js, apiCourses.js, apiFiles.js). Валидация реализована  с использованием библиотеки yup.

8. Проведен рефакторинг структуры директорий с учетом примера https://github.com/geshan/expressjs-structure: добавлены папки models, controllers, services.


7. Добавлена валидация входных данных (adminUsers.js, apiCourses.js, apiFiles.js). Валидация реализована  с использованием библиотеки yup.

8. Проведен рефакторинг структуры директорий с учетом примера https://github.com/geshan/expressjs-structure: добавлены папки models, controllers, services.


### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw07-auth/node-2023-11/hw04_les07-webServers

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers


### Пояснительная записка к д/з №7 проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw07-auth/node-2023-11/hw04_les07-webServers/README-hw07.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers/README-hw07.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №07 (совмещена с д/з №5, №6): 
Если д/з №07 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw07-auth
cd ./node-2023-11/hw04_les07-webServers
```

Если д/з №07 уже в master, то:

```
cd ./ponomarenko-alex-otus/node-2023-11/hw04_les07-webServers
```
 

3. установить зависимости:  
```
npm ci
```

4. Запустить сервер
```
npm run watch
```

5. Запустить API-тесты (должны проходить)
```
npm run test
```

6. Можно сделать ручные запросы к API при помощи файлов REST:
* reset.http
* api-tests/http/admin.http
* api-tests/http/apiCourses.http
* api-tests/http/apiFiles.http
* api-tests/http/apiUsers.http
