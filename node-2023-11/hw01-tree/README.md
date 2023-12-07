[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 1.  Введение в Node и NPM
# Домашнее задание 1.  Введение в Node и NPM

Создание NPM пакета для показа дерева
## Цель:

Написать функцию для показа древовидной структуры. Выполнить одну из двух предложенных примеров задач.

## Описание/Пошаговая инструкция выполнения домашнего задания:

Написать функцию для показа древовидной структуры.
Можно выполнять одну из двух предложенных примеров задач.


    Пример данных:
    {
    "name": 1,
    "items": [{
    "name": 2,
    "items": [{ "name": 3 }, { "name": 4 }]
    }, {
    "name": 5,
    "items": [{ "name": 6 }]
    }]
    }
    Пример запуска программы:
    npm start
    1
    ├── 2
    │ └── 3
    │ └── 4
    └── 5
    └── 6



Написать утилиту tree для удобного показа структуры файлов директории.
Утилита должна принимать на вход обязательный аргумент — путь до директории для показа ее структуры. Также она должна понимать опцию глубину показа --depth, -d с числом в качестве значения.

Пример


```    


    tree Node.js -d 2
    Node.js
    ├── cluster
    │ └── index.js
    ├── domain
    │ ├── error.js
    │ ├── flow.js
    │ └── run.js
    ├── errors
    │ ├── counter.js
    │ └── try-catch.js
    └── worker
    └── index.js
    4 directories, 7 files

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

## Выполнение д/з №1

1. Создана утилита командной строки tree.js, которая принимает 3 обязательных параметра: <имя папки>, -d, <глубина вложенности папок>

2. Утилита проводит проверку количества переданных параметров: их долэно быть не менее 3

3. Второй параметр должен быть равен строке "-d"

4. Третий параметр должен быть целым числом

5. В случае, если параметров недостаточно, - выдается текст вида:
```
hw01-tree | shows file tree | 1.0.0

FATAL: not enough parameters

Usage: tree <dirName> -d <depth>
Example: tree ./data -d 2
```

6. Стартовый файл программы - tree.js, в корне проекта
7. Вспомогательные файлы - Graph.js, ports/AppParams.js, ports/AppProcess.js, ports/FsInput.js, ports/Logger.js


Ниже приведены примеры запуска программы:

```
$ node tree ./data -d 0


hw01-tree | shows file tree | 1.0.0
./data
```

```
$ node tree ./data -d 1


hw01-tree | shows file tree | 1.0.0
./data
  ├──1.txt
  ├──dir1
  └──dir2
```
```
$ node tree ./data -d 2


hw01-tree | shows file tree | 1.0.0
./data
  ├──1.txt
  ├─┬dir1
  │ ├──2.txt
  │ ├──3.txt
  │ └──dir1_1
  └─┬dir2
    └──4.txt
```

```
$ node tree ./data -d 3


hw01-tree | shows file tree | 1.0.0
./data
  ├──1.txt
  ├─┬dir1
  │ ├──2.txt
  │ ├──3.txt
  │ └─┬dir1_1
  │   └──5.txt
  └─┬dir2
    └──4.txt
```

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/node-2023-11-hw01-tree/node-2023-11/hw01-tree

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw01-tree


### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/node-2023-11-hw01-tree/node-2023-11/hw01-tree#readme

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw01-tree#readme


### Запуск программы
Предусловие: необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №01: 
Если д/з №01 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout node-2023-11-hw01-tree
cd ./node-2023-11/hw01-tree
```

Если д/з №01 уже в master, то:

```
cd ./ponomarenko-alex-otus/node-2023-11/hw01-tree
```
 

3. установить зависимости:  
```
npm ci
```

4. Запустить программу
```
node tree ./data -d 0
node tree ./data -d 1
node tree ./data -d 2
node tree ./data -d 3

```