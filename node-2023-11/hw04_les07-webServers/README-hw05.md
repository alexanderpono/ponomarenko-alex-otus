[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 5.  Проект Best Courses Ever - Шаг 2 - Подключите БД
# Домашнее задание 5.  Проект Best Courses Ever - Шаг 2 - Подключите БД

Шаг 2 - Подключите БД
## Цель:
    * Работать с MongoDB
    * Использовать MongoDB ORM - Mongoose в Node.js приложениях



## Описание/Пошаговая инструкция выполнения домашнего задания:

Спроектируйте и создайте структуру БД с помощью MongoDB, Mongoose

БД должно хранить задачи, пользователей и другие ресурсы приложения

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

## Выполнение д/з №5
1. Проведено подключение приложения к СУБД MongoDB (см. файл service/mongoose.js)
2. Для работы с БД использован ORM Mongoose (см. файл service/mongoose.js)
3. Пример работы с БД см. файл (routes/apiReset.js)


### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw05-mongo/node-2023-11/hw04_les07-webServers

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers


### Пояснительная записка к д/з №5 проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw05-mongo/node-2023-11/hw04_les07-webServers/README-hw05.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers/README-hw05.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №05: 
Если д/з №05 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw05-mongo
cd ./node-2023-11/hw04_les07-webServers
```

Если д/з №05 уже в master, то:

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

5. В IDE зайти в папку api-tests/http, открыть файл reset.http
Запустить URL
```
POST http://localhost:3000/api/reset

```

ожидаемый ответ

```
{
  "result": "post reset"
}
```

6. Подключиться при помощи MongoDB Compass к БД "courses"

Должны присутствовать коллекции:
* courses
* files
* users

