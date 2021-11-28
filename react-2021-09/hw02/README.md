[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 2

# Домашнее задание 2. Установка и настройка React. JSX как основа ReactJS. Functional components

## Цель:

* Главная цель - получить достаточно знаний на данном этапе. Внимательно читать документацию и набираться необходимых знаний.
* Самостоятельно сконфигурировать ReactJS-проект.
* Учимся разрабатывать сложные компоненты и познаем основы композиции.

## В результате:

* получим готовый шаблон приложения для дальнейшей разработки.
* сможем спроектировать и разработать сложный компонент.

Разрабатываем свой "сложный" компонент с логикой и вложенными компонентами.

## Пример, применительно к game of life проекту.

Разрабатываем поле и наполняем его квадратиками. Родительский компонент "держит" данные. Дочерние принимают порядковые номера и выводят их.
Пока не нужно обращать внимание на стили. Можно обойтись условными обозначениями - границами и числом внутри.

## Требования

* разработка ведется от storybook

## Что нужно сделать?

* добавить конфигурации для JSX/TSX через babel используем preset-react

* развернуть storybook

* настроить jest

* устанавливаем storybook последней версии вместе с essential
[https://storybook.js.org/docs/react/essentials/introduction](https://storybook.js.org/docs/react/essentials/introduction)

* родительский компонент должен принимать данные для отображения

* проектируем родительский компонент, который будет выводить лист дочерних компонентов

* правильно добавляем обработчик события click, выводящий номер квадратика

* покрываем обработчики тестами (самостоятельно разбиритесь с react-testing-library)
[https://www.robinwieruch.de/react-testing-library](https://www.robinwieruch.de/react-testing-library)

Не забываем про визуальную регрессию (используйте loki или chromatic)
[https://storybook.js.org/addons/chromatic/](https://storybook.js.org/addons/chromatic/)
[https://storybook.js.org/addons/loki/](https://storybook.js.org/addons/loki/])

## Шаблон Game of life
[https://codepen.io/freeCodeCamp/pen/reGdqx](https://codepen.io/freeCodeCamp/pen/reGdqx)

## Описание Game of life
[https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Критерии оценки:

1. конфигурация JSX/TSX, настройка storybook knobs
2. контейнер с логикой и вложенные компоненты
3. storybook, за для всех компонентов
4. обработчик событий
5. снепшот тесты (loki или chromatic)


# Выполнение д/з №2

В процессе выполнения д/з №2:
1. Выполнена настройка проекта с нуля: npm init, webpack, typescript, babel, jest, eslint, prettier, react, storybook, chromatic
2. Созданы визуальные компоненты Cell, GameField
3. Создан компонент-контроллер состояния приложения AppStateController
4. Компоненты добавлены в storybook
5. Настроено снепшот-тестирование chromatic [https://www.chromatic.com/builds?appId=6168a14038f17a003a388098](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098)
6. Созданы unit-тесты для функций управления состоянием приложения и для обработчиков событий компонента Cell
7. Кодовая база см. [https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw2](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw2)
8. Опубликованные результаты см. [https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw02](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw02)