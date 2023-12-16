[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 2.  Работа с потоками в NodeJS
# Домашнее задание 2.  Работа с потоками в NodeJS

Работа с потоками в NodeJS
## Цель:

Работать с потоками Node.js

## Описание/Пошаговая инструкция выполнения домашнего задания:

Используйте модуль streams для программы простой индексации текста.
Она должна:


    * Читать текстовый файл переданный в аргументах к скрипту
    * Разделять входные данные на отдельные слова, разделенные разделителем (пробел, символ новой строки)
    * Фильтровать не-текстовые символы (например, ',')
    / Индексировать текст в вектор - массив чисел. Позиция в массиве представляет порядок всех входных слов, отсортированных в алфавитном порядке. Значение - это количество появлений определенного слова в тексте.
    * Вывести результирующий вектор в файл.
    Примеры:
    * a c b b -> потенциальное промежуточное представление { a: 1, b: 2, c: 1 } -> [1, 2, 1]
    * ab cb bss b -> [1, 1, 1, 1]
    * ab, cb, bss, cb, b, cb -> [1, 1, 1, 3]
    * alex, alex, juan, dima -> [2, 1, 1]
    Желательно использовать потоки для всех шагов программы.


    

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
+3 балл -- использован наиболее оптимальный способ достижения результата
4. Скорость выполнения ДЗ
+1 балл - работа сдана под конец курса
+2 балла - работа сдана с отставанием
+3 балла - дедлайн соблюден
Статус "Принято" ставится при наборе 5 баллов
```

## Выполнение д/з №2

1. Создана утилита командной строки index.js, которая принимает 2 обязательных параметра: <имя входного файла>, <имя выходного файла>

2. Утилита проводит проверку количества переданных параметров: их должно быть не менее 2

3. В случае, если параметров недостаточно, - выдается текст вида:
```

hw02_les04-streams | index a file | 1.0.0

FATAL: not enough parameters

Usage: index <inputFile> <outputFile>
Example: index ./data/1.txt ./data/1-out.txt
```
4. Утилита:
    * Читает входной текстовый файл, переданный в аргументе №1 к скрипту
    * Разделяет входные данные на отдельные слова, разделенные разделителем (пробел, символ новой строки)
    * Фильтрует не-текстовые символы (например, ',')
    * Индексирует текст в вектор - массив чисел. Позиция в массиве представляет порядок всех входных слов, отсортированных в алфавитном порядке. Значение - это количество появлений определенного слова в тексте.
    * Результирующий вектор выводится в выходной файл, имя которого указано в аргументе №2 скрипта.

5. Стартовый файл программы - src/index.js

6. Вспомогательные файлы - src/AppParams.js, src/AppProcess.js, src/Logger.js

7. Ниже приведены примеры запуска программы:

```
$ node src/index ./data/1.txt ./data/1-out.txt

hw02_les04-streams | index a file | 1.0.0
./data/1-out.txt open
tokenize in: a b
b
c d
b c
d


tokenize out: [
  'a', 'b', 'b',
  'c', 'd', 'b',
  'c', 'd'
]
calcStats in: a
calcStats in: b
calcStats in: b
calcStats in: c
calcStats in: d
calcStats in: b
calcStats in: c
calcStats in: d
./data/1.txt read
calcStats: out: {"a":1,"b":3,"c":2,"d":2}
formatStats in: {"a":1,"b":3,"c":2,"d":2}
formatStats entries: [ [ 'a', 1 ], [ 'b', 3 ], [ 'c', 2 ], [ 'd', 2 ] ]
formatStats values: [ 1, 3, 2, 2 ]
formatStats out: 1,3,2,2

```

```
$ node src/index ./data/2.txt ./data/2-out.txt

hw02_les04-streams | index a file | 1.0.0
./data/2-out.txt open
tokenize in: a 
c 
b b
tokenize out: [ 'a', 'c', 'b', 'b' ]
calcStats in: a
calcStats in: c
calcStats in: b
calcStats in: b
./data/2.txt read
calcStats: out: {"a":1,"c":1,"b":2}
formatStats in: {"a":1,"c":1,"b":2}
formatStats entries: [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 1 ] ]
formatStats values: [ 1, 2, 1 ]
formatStats out: 1,2,1

```

```
$ node src/index ./data/3.txt ./data/3-out.txt


hw02_les04-streams | index a file | 1.0.0
./data/3-out.txt open
tokenize in: ab cb bss b

tokenize out: [ 'ab', 'cb', 'bss', 'b' ]
calcStats in: ab
calcStats in: cb
calcStats in: bss
calcStats in: b
./data/3.txt read
calcStats: out: {"ab":1,"cb":1,"bss":1,"b":1}
formatStats in: {"ab":1,"cb":1,"bss":1,"b":1}
formatStats entries: [ [ 'ab', 1 ], [ 'b', 1 ], [ 'bss', 1 ], [ 'cb', 1 ] ]
formatStats values: [ 1, 1, 1, 1 ]
formatStats out: 1,1,1,1
```

```
$ node src/index ./data/4.txt ./data/4-out.txt


hw02_les04-streams | index a file | 1.0.0
./data/4-out.txt open
tokenize in: ab, cb, bss, cb, b, cb
tokenize out: [ 'ab', 'cb', 'bss', 'cb', 'b', 'cb' ]
calcStats in: ab
calcStats in: cb
calcStats in: bss
calcStats in: cb
calcStats in: b
calcStats in: cb
./data/4.txt read
calcStats: out: {"ab":1,"cb":3,"bss":1,"b":1}
formatStats in: {"ab":1,"cb":3,"bss":1,"b":1}
formatStats entries: [ [ 'ab', 1 ], [ 'b', 1 ], [ 'bss', 1 ], [ 'cb', 3 ] ]
formatStats values: [ 1, 1, 1, 3 ]
formatStats out: 1,1,1,3
```

```
$ node src/index ./data/5.txt ./data/5-out.txt


hw02_les04-streams | index a file | 1.0.0
./data/5-out.txt open
tokenize in: alex, alex, juan, dima
tokenize out: [ 'alex', 'alex', 'juan', 'dima' ]
calcStats in: alex
calcStats in: alex
calcStats in: juan
calcStats in: dima
./data/5.txt read
calcStats: out: {"alex":2,"juan":1,"dima":1}
formatStats in: {"alex":2,"juan":1,"dima":1}
formatStats entries: [ [ 'alex', 2 ], [ 'dima', 1 ], [ 'juan', 1 ] ]
formatStats values: [ 2, 1, 1 ]
formatStats out: 2,1,1
```

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/node-2023-11-hw02-streams/node-2023-11/hw02_les04-streams

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw02_les04-streams


### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/node-2023-11-hw02-streams/node-2023-11/hw02_les04-streams#readme

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw02_les04-streams#readme


### Запуск программы
Предусловие: необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №02: 
Если д/з №02 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git node-2023-11-hw02-streams
cd ./node-2023-11/hw02_les04-streams
```

Если д/з №02 уже в master, то:

```
cd ./ponomarenko-alex-otus/node-2023-11/hw02_les04-streams
```
 

3. установить зависимости:  
```
npm ci
```

4. Запустить программу
```
$ node src/index ./data/1.txt ./data/1-out.txt
$ node src/index ./data/2.txt ./data/2-out.txt
$ node src/index ./data/3.txt ./data/3-out.txt
$ node src/index ./data/4.txt ./data/4-out.txt
$ node src/index ./data/5.txt ./data/5-out.txt

```