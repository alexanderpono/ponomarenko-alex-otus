[< А.Пономаренко. Домашние задания к курсам OTUS / Алгоритмы и структуры данных-2022-10 ](../README.md) / Домашнее задание 26. Программа сжатия файлов на основе алгоритма RLE

# Домашнее задание 26. Программа сжатия файлов на основе алгоритма RLE

Создать программу сжатия файлов на основе алгоритма RLE

## Цель:

1. Написать функцию сжатия массива по алгоритму RLE - 2 байта
2. Написать программу для сжатия файлов - 2 байта
3. Написать программу для распаковки файлов - 2 байта.
При запуске программы без параметров она должна выводить краткую инструкцию, как её запускать для сжатия/распаковки файлов.
4. Реализовать улучшенный алгоритм RLE: сжатие и распаковку - 2 байта
5. Сравнить работу программы с разными типами файлов: текст, фото, аудио, zip-архив. 1 байт
6. Составить отчёт сравнения результата работы двух версий алгоритма с разными файлами. 1 байт




## Описание/Пошаговая инструкция выполнения домашнего задания:

```
В отчёте необходимо указать:

1. Список пунктов д/з, которые выполнены.
2. Выбранный язык программирования.
3. Время выполнения задания в часах.
4. Ссылка на репозиторий.
5. Ссылка на документ со сравнением работы.

```

## Выполнение д/з №26
1. Реализован класс PackRLE (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw26-compressRLE/src/PackRLE.ts)

2. Основные методы класса packRLE() и unpackRLE() покрыты unit-тестами (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw26-compressRLE/src/PackRLE.spec.ts)

3. На основе класса PackRLE создана программа с интерфейсом командной строки, которая позволяет запаковывать и распаковывать файлы методом RLE. Основной файл программы - см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw26-compressRLE/src/app.ts

Программа написана на языке JS/Typescript. Предусмотрена возможность компиляции программы из Typesrpipt в обычный Javascript, который позволяет впоследствии использовать программу как утилиту командной строки и запускать ее при помощи node.js.

При запуске без параметров программа отображает следую информацию:
```
$ node ./rle
Usage: rle [options]

Домашнее задание 26. Программа сжатия файлов на основе алгоритма RLE

Options:
  -V, --version              output the version number
  -s, --scenario <scenario>  scenario name
  -i, --input <input>        input file
  -o, --output <output>      output file
  -v, --verbose              show debug information
  -h, --help                 display help for command


```

### Выполнены пукнты д/з:
1. Написать функцию сжатия массива по алгоритму RLE - 2 байта
2. Написать программу для сжатия файлов - 2 байта
3. Написать программу для распаковки файлов - 2 байта. 
Итого 6 байт.

### Язык программы: Javascript/Typescript

### Затраты времени:
Время выполнения задания - 4 часа.

### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/algo-2022-10/hw26-compressRLE

### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/algo-2022-10/hw26-compressRLE#readme

### Примеры вывода программы (тестовые файлы находятся в папке ./dist проекта):

```
$ node ./rle -s pack -i AAAABBCDDDD.txt -o AAAABBCDDDD.rle
pack-RLE version 1.0.0
pack using RLE 'AAAABBCDDDD.txt' -> 'AAAABBCDDDD.rle' OK 72%

$ node ./rle -s unpack -i AAAABBCDDDD.rle -o AAAABBCDDDD-unpacked.txt
pack-RLE version 1.0.0
unpack using RLE 'AAAABBCDDDD.rle' -> 'AAAABBCDDDD-unpacked.txt' OK

$ node ./rle -s pack -i README.md -o README.rle
pack-RLE version 1.0.0
pack using RLE 'README.md' -> 'README.rle' OK 192%

$ node ./rle -s pack -i scheme.bmp -o scheme.rle
pack-RLE version 1.0.0
pack using RLE 'scheme.bmp' -> 'scheme.rle' OK 6%

```

### Сборка и запуск программы
Предусловие: необходима установленная версия node.js 12.22.12 или 14.x
- https://nodejs.org/download/release/v12.22.12/
- https://nodejs.org/download/release/v14.21.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №26: 
```
cd ./ponomarenko-alex-otus/algo-2022-10/hw26-compressRLE 
```

3. установить зависимости:  
```
npm i
```

4. Запустить unit-тесты
```
npm test
```

5. Откомпилировать программу
```
npm run build
```
В результате в папке ./dist должен появиться файл rle.js

6. Управлять программой при помощи интерфейса CLI

```
cd ./dist
```

7. Сжатие и распаковка тестового файла AAAABBCDDDD.txt
```
$ node ./rle -s pack -i AAAABBCDDDD.txt -o AAAABBCDDDD.rle
$ node ./rle -s unpack -i AAAABBCDDDD.rle -o AAAABBCDDDD-unpacked.txt
```

8. Сжатие и распаковка тестового файла README.md
```
$ node ./rle -s pack -i README.md -o README.rle
$ node ./rle -s unpack -i README.rle -o README-unpacked.md
```

9. Сжатие и распаковка тестового файла scheme.bmp
(время выполнения - несколько десятков секунд)
```
$ node ./rle -s pack -i scheme.bmp -o scheme.rle
$ node ./rle -s unpack -i scheme.rle -o scheme-unpacked.bmp
```

