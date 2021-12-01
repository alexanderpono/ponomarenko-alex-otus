[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 6

# Домашнее задание 6. Основы функционального программирования

## Цель:

* Трансформируем данные в нужный формат чистыми функция и иммутабельностью

## ДЗ

Заготовки и тесты находятся в репозитории, смотрите ПР
[https://github.com/nickovchinnikov/react-js-tutorial/pull/25/files](https://github.com/nickovchinnikov/react-js-tutorial/pull/25/files)

Фикс тестов [https://github.com/nickovchinnikov/react-js-tutorial/pull/107](https://github.com/nickovchinnikov/react-js-tutorial/pull/107)

### Чистые функции

Используя чистые функции массивов map/reduce, объектов Objeсt.keys, строк string.split и т.д. получить нужный результат

1. Лучшая команда (наибольшее кол-во очков), выводим имя

2. Querystring из объекта

3. Объект из querystring

### Иммутабельность

Получить из A -> B не мутируя оригинальный объект

1. Поменять объект

2. Поменять массив

3. Поменять глубокий объект

### Бонус: используем ramda с заданиями про чистые функции

Бонусное задание: требует прочтения первых 5 глав книги https://github.com/MostlyAdequate/mostly-adequate-guide-ru

Главы на самом деле небольшие

И документации https://ramdajs.com

1. Напишем compose для поиска имени с наибольшим количеством очков. Вывести нужно только имя!

2. Напишем compose для создания query string и наоборот - query string -> object

Разработку ведем по TDD, всегда тестируем весь наш код!


### Супер бонусное задание

Написать свой compose


## Критерии оценки:

 * решены задачи
 * супер-бонусная задача


# Выполнение д/з №6

1. Сделаны части д/з:
* Чистые функции
* Иммутабельность
* Бонус: используем ramda с заданиями про чистые функции

2. [Кодовая база hw06](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw6)

3. Опубликованные результаты:
* [Пояснительная записка к д/з](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw06/)
* [Отчет о тестировании](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw06/test-report/testResult.html)

4. Покрытие кода тестами:


```

 PASS  src/ramdaPureFunctions.test.ts
 PASS  src/immutability.test.ts
 PASS  src/pureFunctions.test.ts
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |      100 |     100 |     100 |                   
 immutability.ts       |     100 |      100 |     100 |     100 |                   
 pureFunctions.ts      |     100 |      100 |     100 |     100 |                   
 ramdaPureFunctions.ts |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.189 s
Ran all test suites.


```

