[< А.Пономаренко. Домашние задания к курсам OTUS / Алгоритмы и структуры данных-2022-10 ](../README.md) / Домашнее задание 13. Хэш-таблицы, часть I

# Домашнее задание 13. Хэш-таблицы, часть I

## Цель:

В этом домашнем задании вы научитесь реализовывать хеш-таблицу.

## Описание/Пошаговая инструкция выполнения домашнего задания:

```

1. Реализовать хеш-таблицу, использующую метод цепочек
2. Или реализовать хеш-таблицу с открытой адресацией
  *  дополнительно: реализовать "ленивое" удаление
  *  реализовать квадратичный пробинг

```

## Выполнение д/з №13
1. Реализовать хеш-таблицу, использующую метод цепочек

- создан класс HashTable, который использует метод цепочек для разрешения коллизий (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw13-hashTables1/src/HashTable.ts)

- В классе реализованы методы 
set(), get(), unset(), private rehash().

- rehash() вызывается, если количество хранимых элементов становится равным размеру хэш-таблицы.

- Код класса HasTable частично покрыт unit-тестами (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw13-hashTables1/src/HashTable.spec.ts)

### Байты и затраты времени:
- Реализовать хеш-таблицу, использующую метод цепочек (+3 байта)
- Затраты времени - 3 часа.
### Язык программы: Javascript/Typescript

### Запуск программы
Предусловие: необходима установленная версия node.js 12.22.12 или 14.x
- https://nodejs.org/download/release/v12.22.12/
- https://nodejs.org/download/release/v14.21.2/

1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №13: 
```
cd ./ponomarenko-alex-otus/algo-2022-10/hw13-hashTables1 
```

3. установить зависимости:  
```
npm i
```

4. Запустить unit-тесты
```
npm test
```

5. Запустить программу (см. https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/algo-2022-10/hw13-hashTables1/src/app.ts)
```
npm start
```


