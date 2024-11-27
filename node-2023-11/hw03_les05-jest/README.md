[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 3.  Тестирование приложения tree
# Домашнее задание 3.  Тестирование приложения tree

Тестирование приложения tree
## Цель:

Использование инструментов тестирования в Node.js

## Описание/Пошаговая инструкция выполнения домашнего задания:

Конфигурация проекта для тестирования утилиты tree из предыдущих заданий.
Добиться code coverage 95 %.
Можно использовать пакет для моков файловой системы.

    

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

## Выполнение д/з №3

1. Созданы тесты для утилиты командной строки tree.js из д/з №1. В процессе написания тестов провен частичный рефаторинг тестируемой программы.

2. Созданы файлы тестов к классам Graph, App, Logger, FsInput, AppParams

3. Результат запуска тестов:
```
$ npm test

> hw01-tree@1.0.0 test
> jest

 PASS  src/Graph.spec.js
 PASS  src/App.spec.js
 PASS  src/ports/FsInput.spec.js
 PASS  src/ports/AppParams.spec.js
 PASS  src/ports/Logger.spec.js
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |    90.9 |       98 |   95.83 |   90.44 |                   
 src            |   86.74 |    97.05 |     100 |   86.07 |                   
  App.js        |   94.11 |       75 |     100 |   94.11 | 19                
  Graph.js      |     100 |      100 |     100 |     100 |                   
  tree.js       |       0 |      100 |     100 |       0 | 1-12              
 src/ports      |   96.66 |      100 |    92.3 |   96.49 |                   
  AppParams.js  |     100 |      100 |     100 |     100 |                   
  AppProcess.js |       0 |      100 |       0 |       0 | 3-7               
  FsInput.js    |     100 |      100 |     100 |     100 |                   
  Logger.js     |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        3.399 s
Ran all test suites.

```
4. Подробный отчет о покрытии кода тестами доступен по ссылке https://alexanderpono.github.io/ponomarenko-alex-otus/node-2023-11/hw03/test-report/

### Запуск тестов
Предусловие: необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №03: 
Если д/з №03 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw03_les05-jest
cd ./node-2023-11/hhw03_les05-jest
```

Если д/з №03 уже в master, то:

```
cd ./ponomarenko-alex-otus/node-2023-11/hw03_les05-jest
```
 

3. установить зависимости:  
```
npm ci
```

4. Запустить тесты
```
npm test

```