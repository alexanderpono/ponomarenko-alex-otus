# ponomarenko-alex-otus-nodejs
Homework for Node.js OTUS course

<h2>node-hw1</h2>

<h2>Создание NPM пакета для показа дерева</h2>

Цель: Написать функцию для показа древовидной структуры. Можно выполнять одну из двух предложенных примеров задач.
1. Пример данных:

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


<h2>node-hw3</h2>

<h2>Тестирование приложения tree</h2>

Цель: Конфигурация проекта для тестирования утилиты tree из предыдущих заданий. Добиться code coverage 95 %. Можно использовать пакет для моков файловой системы.

<i>Для проверки д/з - выполнить команды:</i>
1) git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
2) cd ponomarenko-alex-otus
3) git checkout node-3
4) cd node/node-hw3
5) npm i
6) npx jest --coverage
7) firefox coverage/lcov-report/index.html 
