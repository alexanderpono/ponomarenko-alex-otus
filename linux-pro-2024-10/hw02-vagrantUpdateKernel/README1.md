[< А.Пономаренко. Домашние задания к курсам OTUS / Алгоритмы и структуры данных-2022-10 ](../README.md) / Домашнее задание 32. Вероятностный алгоритм Фильтр Блума

# Домашнее задание 2. Vagrant. Обновление ядра Linux

Обновить ядро в базовой системе
## Цель:

Получить навыки работы с Git, Vagrant;
Обновлять ядро в ОС Linux.

## Описание/Пошаговая инструкция выполнения домашнего задания:
Для выполнения домашнего задания используйте методичку
1. Выполните действия, описанные в методичке.
2. Полученный в ходе выполнения ДЗ Vagrantfile и отчет залейте в ваш git-репозиторий.
3. Пришлите ссылку на него в чате для проверки ДЗ. Обычно мы проверяем ДЗ в течение 48 часов.



Реализация вероятностного алгоритма

## Цель:

Результатом домашнего задания будет исследование либо реализация вероятностного алгоритма. Это тренирует навык применения и разработки вероятностных алгоритмов для решения рабочих задач.

## Описание/Пошаговая инструкция выполнения домашнего задания:

```
Взять готовую реализацию одного из алгоритмов: Bloom Filter, MinHash, SimHash, HyperLogLog или Count-Min Sketch для вашего языка программирования для ее изучения;

изучить код реализации;

вариант повышенной сложности (опционально): самим реализовать этот алгоритм;
найти большой датасет, подходящий для выбранного алгоритма;

применить ее для решения практической задачи: например, определить, принаджежит ли элемент множеству, подсчитать число уникальных элементов в большом массиве данных или подсчитать числа вхождений каждого элемента в большой массив данных;

оценить точность реализации (% ошибок, false positives и т.д.) с помощью тестов;

выложить ваш код вместе с датасетом;

(опционально): сделать вышеперечисленное для еще одного алгоритма из списка.

(опционально): сравнить между собой "парные" алгоритмы, если вы выбрали их (напр, MinHash и SimHash).

Более подробно в презентации к занятию.

ВАЖНО! При размещении ответа укажите, на каком языке вы выполнили ДЗ. Это поможет нам ускорить его проверку.

Критерии оценки:

Выбран алгоритм, изучен код +2 байта
Реализован алгоритм варианта повышенной сложности +3 байта
Найден большой датасет и применён для решения задачи +5 байт
Повторено всё для другого алгоритма +5 байт


```

## Выполнение д/з №32

1) В качестве основы для реализации фильтра Блума взята реализация алгоритма на python, показанная на вебинаре. Этот алгоритм портирован на Javascript / Typescript.

2) Реализация доработана - добавлена возможность использовать разные хэш-функции при увеличении параметра k "количество хэш-функций".
(см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw32-BloomFilter/src/Bloom.ts)

3) Проведено исследование работы алгоритма на одном и тоже наборе тестовых данных при разных значениях параметров "N - количество элементов в фильтре, k - количество хэш-функций, filters - массив хэш-функций". 
см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw32-BloomFilter/src/hashFuncs.ts

см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw32-BloomFilter/src/app.ts

Ниже приведен вывод программы:
```

"abound"       is present (not a false positive)!
"abounds"      is present (not a false positive)!
"abundance"    is present (not a false positive)!
"abundant"     is present (not a false positive)!
"accessable"   is present (not a false positive)!
"bloom"        is present (not a false positive)!
"blossom"      is present (not a false positive)!
"bolster"      is present (not a false positive)!
"bonny"        is present (not a false positive)!
"bonus"        is present (not a false positive)!
"bonuses"      is present (not a false positive)!
"coherent"     is present (not a false positive)!
"cohesive"     is present (not a false positive)!
"colorful"     is present (not a false positive)!
"comely"       is present (not a false positive)!
"comfort"      is present (not a false positive)!
"gems"         is present (not a false positive)!
"generosity"   is present (not a false positive)!
"generous"     is present (not a false positive)!
"generously"   is present (not a false positive)!
"genial"       is present (not a false positive)!
"bluff"        is definitely not present!
"cheater"      is definitely not present!
"hate"         is definitely not present!
"war"          is definitely not present!
"humanity"     is definitely not present!
"racism"       is a false positive!
"hurt"         is definitely not present!
"nuke"         is definitely not present!
"gloomy"       is a false positive!
"facebook"     is definitely not present!
"geekforgeeks" is definitely not present!
"twitter"      is definitely not present!

Rate of false positives: 8.70%

(n=100 k=2 funcs=sha256,sha256) FP Rate=8.70%

(n=100 k=3 funcs=sha256,sha256,sha256) FP Rate=8.70%

(n=100 k=4 funcs=sha256,sha256,sha256,sha256) FP Rate=16.00%

(n=150 k=2 funcs=sha256,sha256) FP Rate=4.55%

(n=150 k=3 funcs=sha256,sha256,sha256) FP Rate=0.00%

(n=150 k=4 funcs=sha256,sha256,sha256,sha256) FP Rate=0.00%

(n=200 k=2 funcs=sha256,sha256) FP Rate=4.55%

(n=200 k=3 funcs=sha256,sha256,sha256) FP Rate=0.00%

(n=200 k=4 funcs=sha256,sha256,sha256,sha256) FP Rate=0.00%

(n=100 k=2 funcs=sha256,md5) FP Rate=8.70%

(n=100 k=3 funcs=sha256,md5,sha1) FP Rate=4.55%

(n=100 k=4 funcs=sha256,md5,sha1,sha3_512) FP Rate=8.70%

(n=150 k=2 funcs=sha256,md5) FP Rate=0.00%

(n=150 k=3 funcs=sha256,md5,sha1) FP Rate=0.00%

(n=150 k=4 funcs=sha256,md5,sha1,sha3_512) FP Rate=4.55%

(n=200 k=2 funcs=sha256,md5) FP Rate=0.00%

(n=200 k=3 funcs=sha256,md5,sha1) FP Rate=0.00%

(n=200 k=4 funcs=sha256,md5,sha1,sha3_512) FP Rate=0.00%

```
Результаты объединены в таблице.

N - размер фильтра | k - количество хэш-функций | Хэш-функции | Ложные срабатывания - Rate of false positives, %
--- | --- | --- | ---
100 | 2 | sha256,sha256 | 8.70
100 | 3 | sha256,sha256,sha256 | 8.70
100 | 4 | sha256,sha256,sha256,sha256 | 16.00
150 | 2 | sha256,sha256 | 4.55
150 | 3 | sha256,sha256,sha256 | 0
150 | 4 | sha256,sha256,sha256,sha256 | 0
200 | 2 | sha256,sha256 | 4.55
200 | 3 | sha256,sha256,sha256 | 0
200 | 4 | sha256,sha256,sha256,sha256 | 0
100 | 2 | sha256,md5 | 8.70
100 | 3 | sha256,md5,sha1 | 4.55
100 | 4 | sha256,md5,sha1,sha3_512 | 8.70
150 | 2 | sha256,md5 | 0
150 | 3 | sha256,md5,sha1 | 0
150 | 4 | sha256,md5,sha1,sha3_512 | 4.55
200 | 2 | sha256,md5 | 0
200 | 3 | sha256,md5,sha1 | 0
200 | 4 | sha256,md5,sha1,sha3_512 | 0


Из таблицы видно, что алгоритм лучше работает, если используются разные хэш-функции, а не одна и таже многократно.

Алгоритм начинает существенно лучше работать при увеличении количества элементов в фильтре.

При малых размерах фильтра чрезмерное увеличение количества хэш-функций приводит к увеличению процента ошибочных ответов.


### Выполнены пункты д/з:

1) Взять готовую реализацию одного из алгоритмов: Bloom Filter, MinHash, SimHash, HyperLogLog или Count-Min Sketch для вашего языка программирования для ее изучения; изучить код реализации - 2 байта;

### Язык программы: Javascript/Typescript

### Затраты времени:

Время выполнения задания - 5,5 часов.

### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/algo-2022-10/hw32-BloomFilter

### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/algo-2022-10/hw32-BloomFilter#readme

### Запуск программы

Предусловие: необходима установленная версия node.js 12.22.12 или 14.x
- https://nodejs.org/download/release/v12.22.12/
- https://nodejs.org/download/release/v14.21.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №32: 
```
cd ./ponomarenko-alex-otus/algo-2022-10/hw32-BloomFilter
```

3. установить зависимости:  
```
npm i
```

4. Запустить программу (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw32-BloomFilter/src/app.ts)
```
npm start
```
