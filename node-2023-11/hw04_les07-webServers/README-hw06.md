[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 6.  Проект Best Courses Ever - Шаг 3 - Разработать RESTful API
# Домашнее задание 6.  Проект Best Courses Ever - Шаг 3 - Разработать RESTful API

Шаг 3 - Разработать RESTful API
## Цель:
  * Разработка web приложения на Node.js
  * Описание и технический дизайн REST API backend приложения



## Описание/Пошаговая инструкция выполнения домашнего задания:

API должен позволить создавать, просматривать, обновлять и удалять информацию о курсах и пользователях. Тесты из прошлого шага должны проходить.
Определите endpoints API, коды ответов, типы данных и примеры с использованием https://editor.swagger.io,импортируйте и сохраните файл с техническим описанием (см примеры https://www.udemy.com/developers/affiliate/, https://developer.github.com/v3/users/, https://docs.gitlab.com/ee/api/issues.html)

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

## Выполнение д/з №6
1. Проведен технический дизайн части API web-приложения
2. Реализована чать API web-приложения:
```
/api/courses
/api/users
/api/files
/admin/users
/admin/files

/api/reset - подготавливает БД (заливает фикстуры) для API-тестов
```
3. Разработаны тесты API - см. файл (api-tests/api.spec.js)
4. При помощи редактора https://editor.swagger.io/ подготовлен [yaml-файл](./doc/api.yaml) с описанием реализованной части API 
5. При помощи редактора https://editor.swagger.io/ сгенерирована [html-документация](./doc/html2-client-generated/index.html) с описанием API

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw05-mongo/node-2023-11/hw04_les07-webServers

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers


### Пояснительная записка к д/з №6 проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw05-mongo/node-2023-11/hw04_les07-webServers/README-hw06.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers/README-hw06.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №06 (совмещена с д/з №5): 
Если д/з №06 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw05-mongo
cd ./node-2023-11/hw04_les07-webServers
```

Если д/з №05 / №06 уже в master, то:

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