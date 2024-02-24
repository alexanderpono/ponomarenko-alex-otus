[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 10.  CLI в Node.js
# Домашнее задание 10.  CLI в Node.js 

Шаг 5 - Написать CLI для администрирования приложения
## Цель:
  * Создавать CLI приложения на Node.js


## Описание/Пошаговая инструкция выполнения домашнего задания:
```
CLI должен уметь авторизоваться, содержать команды для просмотра списка, получения и обновления элементов системы.
Можно использовать любой CLI фреймворк на выбор
```

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

## Выполнение д/з №10
1. Реализован CLI-интерфейс для web-приложения (src/cli.ts)
2. Реализованы автоматические тесты для web-приложения (src/cli-tests/cli.spec.ts)
```
> node ./temp/build/cli.js
Usage: courses_cli [options]

Options:
  -V, --version              output the version number
  -l, --login <login>        user login
  -p, --password <password>  user password
  -c, --command <command>    command
  -p1, --param1 <param1>     parameter 1
  -p2, --param2 <param2>     parameter 2
  -pr, --pretty              pretty output
  -h, --help                 display help for command
```

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw10-cli/node-2023-11/hw10_les20-cli 

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw10_les20-cli


### Пояснительная записка к д/з №8 доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw10-cli/node-2023-11/hw10_les20-cli/README.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw10_les20-cli/README.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Переключиться на ветку с д/з: 
Если д/з №10 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw10-cli
```

Если д/з №10 уже в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout master
```

3. Зайти в основную папку приложения
```
cd ./node-2023-11/hw04_les07-webServers
```

4. установить зависимости:  
```
npm ci
```

5. Запустить сервер
```
npm run watch
```

6. Запустить API-тесты (должны проходить)
```
npm run test
```
 
7. Перейти в папку CLI-интерфейса приложения
```
cd ../hw10_les20-cli
```

8. установить зависимости:  
```
npm ci
```

9. Выполнить сборку CLI-интерфейса (windows)
```
npm run build-w
```

Выполнить сборку CLI-интерфейса (linux, mac)
```
npm run build-l
```

10. Запустить тесты CLI-интерфейса (должны проходить)
```
npm run test
```

11. Примеры команд см. src/cli-tests/cli.spec.ts. Ниже перечислены некоторые команды:
```
> node ./temp/build/cli.js -c admin-get-users -l nick -p p -pr

> node ./temp/build/cli.js -c get-users-byid -l tom -p p -p1 000000000000000000000001

> node ./temp/build/cli.js -c get-users-byid -l tom -p p -p1 000000000000000000000001 -pr

> node ./temp/build/cli.js -c get-courses -l tom -p p -pr

> node ./temp/build/cli.js -c admin-get-files -l nick -p p -pr

> node ./temp/build/cli.js -c get-files-byid -p1 000000000000000000000201 -p2 ./001.png -l tom -p p
(должен появиться файл 001.png в текущей папке)

> node ./temp/build/cli.js -c post-files -p1 ./src/cli-tests/2.png -l tom -p p -pr

> node ./temp/build/cli.js -c admin-get-files -l nick -p p -pr

```

