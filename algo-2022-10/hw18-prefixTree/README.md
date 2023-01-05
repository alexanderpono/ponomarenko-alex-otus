[< А.Пономаренко. Домашние задания к курсам OTUS / Алгоритмы и структуры данных-2022-10 ](../README.md) / Домашнее задание 18. Создание префиксного дерева

# Домашнее задание 18. Создание префиксного дерева

## Цель:

Создать класс Trie с основными операциями над ассоциативным массивом.


## Описание/Пошаговая инструкция выполнения домашнего задания:

```

УРОВЕНЬ JUNIOR.
+5 байт. Решить задачу: https://leetcode.com/problems/implement-trie-prefix-tree/
УРОВЕНЬ MIDDLE.
+5 байт. Реализовать ассоциативный массив на основе Префиксного дерева.
УРОВЕНЬ SENIOR.
+5 байт. Сравнить эффективность добавления/поиска/удаления элементов в хэш-таблицу и в префиксное дерево.


```

## Выполнение д/з №18
### УРОВЕНЬ MIDDLE. Реализовать ассоциативный массив на основе Префиксного дерева.
1. Реализован класс TrieMap (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/TrieMap.ts)
а также базовый класс Trie (https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/Trie.ts)
и TreeNode (https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/TreeNode.ts)

2. Классы TrieMap, Trie, TreeNode частично покрыты unit-тестами:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/TrieMap.spec.ts
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/Trie.spec.ts
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/TreeNode.spec.ts

3. В классе TrieMap реализованы методы set(), get(), delete().
Реализация метода delete() - упрощенная, не освобождает память

### УРОВЕНЬ SENIOR. Сравнить эффективность добавления/поиска/удаления элементов в хэш-таблицу и в префиксное дерево.

4. Создан класс Program, который вызывает методы set(), get(), delete() для
классов TrieMap и Map, который является частью языка JavaScript.ES6.
(см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/Program.ts)


Сравнение проводилось для длины ключей 4 символа и 10 символов. Ниже привожу вывод программы:

```
===== word length = 4 =====
TrieMap: set 10000 pairs elapsed ms= 68
hit= ";dmb"
hit= "c%N0"
hit= "$kKi"
hit= "W:$b"
hitCount= 4
TrieMap: get 20000 pairs elapsed ms= 24
TrieMap: delete 20000 pairs elapsed ms= 10
JS.Map: insert 10000 pairs elapsed ms= 4
hit= "YsPR"
hit= "`^ry"
hit= "=)p\"
hit= "h fQ"
hitCount= 4
JS.Map: search 10000 pairs elapsed ms= 11
JS.Map: delete 10000 pairs elapsed ms= 5

===== word length = 10 =====
TrieMap: set 10000 pairs elapsed ms= 184
hitCount= 0
TrieMap: get 20000 pairs elapsed ms= 17
TrieMap: delete 20000 pairs elapsed ms= 35
JS.Map: insert 10000 pairs elapsed ms= 4
hitCount= 0
JS.Map: search 10000 pairs elapsed ms= 9
JS.Map: delete 10000 pairs elapsed ms= 7

```

Результаты сведены в таблицы:

длина ключа = 4 | .set() | .get() | .delete()
--- | --- | --- | ---
Класс | msec | msec | msec
TrieMap | 68 | 24 | 10
Map (встроенный класс JS) | 4 | 11 | 5

длина ключа = 10 | .set() | .get() | .delete()
--- | --- | --- | ---
Класс | msec | msec | msec
TrieMap | 184 | 17 | 35
Map (встроенный класс JS) | 4 | 9 | 7

где:

* .set() вызывался 10000 раз со случайными ключами указанной длины
* .get() вызывался 20000 раз со случайными ключами указанной длины
* .delete() вызывался 20000 раз со случайными ключами указанной длины

### Байты и затраты времени:
УРОВЕНЬ MIDDLE.
Метод TrieMap.delete() реализован без освобождения памяти, поэтому, наверное, меньше, чем +5 байт


УРОВЕНЬ SENIOR.
+5 байт. Сравнить эффективность добавления/поиска/удаления элементов в хэш-таблицу и в префиксное дерево.

затраты времени: 4,5 часа

### Язык программы: Javascript/Typescript

### Запуск программы
Предусловие: необходима установленная версия node.js 12.22.12 или 14.x
- https://nodejs.org/download/release/v12.22.12/
- https://nodejs.org/download/release/v14.21.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №18: 
```
cd ./ponomarenko-alex-otus/algo-2022-10/hw18-prefixTree 
```

3. установить зависимости:  
```
npm i
```

4. Запустить unit-тесты
```
npm test
```

5. Запустить программу (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw18-prefixTree/src/app.ts)
```
npm start
```


