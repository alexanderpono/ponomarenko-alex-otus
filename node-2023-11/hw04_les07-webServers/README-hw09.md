[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 9.  Проект Best Courses Ever - Шаг 4 - Мигрируйте приложение на TypeScript
# Домашнее задание 9.  Проект Best Courses Ever - Шаг 4 - Мигрируйте приложение на TypeScript

Шаг 4 - Мигрируйте приложение на TypeScript
## Цель:
  * Мигририровать JavaScript приложения на TypeScript
  * Писать на языке TypeScript



## Описание/Пошаговая инструкция выполнения домашнего задания:

Перенос приложения на TypeScript (включая тесты, модели mongoose и т. д.)

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

## Выполнение д/з №9
Выполнены первые шаги по переводу проекта на Typescript:

1. В зависимости проекта добавлен Typescript, ts-node, определения типов и т.д.

2. Проведено переименование файлов .js в .ts

3. Проведена первичная адаптация тестов к Typescript.

4. Проведен перевод моделей на Typescript.

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw09-ts/node-2023-11/hw04_les07-webServers

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers


### Пояснительная записка к д/з №9 проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw09-ts/node-2023-11/hw04_les07-webServers/README-hw09.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers/README-hw09.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №09: 
Если д/з №09 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw09-ts
cd ./node-2023-11/hw04_les07-webServers
```

Если д/з №09 уже в master, то:

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

