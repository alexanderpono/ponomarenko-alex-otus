[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 11

# Домашнее задание 11. Архитектура React-приложения

## Цель:

Повышаем качество кодовой базы

Описание/Пошаговая инструкция выполнения домашнего задания:

* рефакторим приложение с архитектурной точки зрения
* покрываем логику работы нашего приложения интеграционными тестами https://github.com/jfairbank/redux-saga-test-plan



## Критерии оценки:

1. добавлен интеграционные тесты
2. поиск и устранение архитектурных недостатков


## Выполнение д/з №11

1. Смарт-компоненты перенесены в папку "src/modules"

2. Интеграционные тесты реализованы при помощи redux-saga-test-plan

3. [Кодовая база hw11](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw11)

4. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw11)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw11/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw11/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw11/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}

5. Покрытие кода тестами:

```

-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |     100 |      100 |     100 |     100 |                   
 src                           |     100 |      100 |     100 |     100 |                   
  consts.ts                    |     100 |      100 |     100 |     100 |                   
 src/StorageService            |     100 |      100 |     100 |     100 |                   
  StorageService.saga.ts       |     100 |      100 |     100 |     100 |                   
  StorageService.thunk.ts      |     100 |      100 |     100 |     100 |                   
  StorageService.ts            |     100 |      100 |     100 |     100 |                   
 src/components                |     100 |      100 |     100 |     100 |                   
  common.tsx                   |     100 |      100 |     100 |     100 |                   
 src/components/AppStateView   |     100 |      100 |     100 |     100 |                   
  AppStateView.tsx             |     100 |      100 |     100 |     100 |                   
 src/components/AuthorizedHead |     100 |      100 |     100 |     100 |                   
  AuthorizedHead.tsx           |     100 |      100 |     100 |     100 |                   
 src/components/Button         |     100 |      100 |     100 |     100 |                   
  Button.tsx                   |     100 |      100 |     100 |     100 |                   
 src/components/Cell           |     100 |      100 |     100 |     100 |                   
  Cell.tsx                     |     100 |      100 |     100 |     100 |                   
 src/components/DefineMode     |     100 |      100 |     100 |     100 |                   
  DefineMode.tsx               |     100 |      100 |     100 |     100 |                   
 src/components/DefineSpeed    |     100 |      100 |     100 |     100 |                   
  DefineSpeed.tsx              |     100 |      100 |     100 |     100 |                   
 src/components/FieldSize      |     100 |      100 |     100 |     100 |                   
  FieldSize.tsx                |     100 |      100 |     100 |     100 |                   
 src/components/GameField      |     100 |      100 |     100 |     100 |                   
  GameField.tsx                |     100 |      100 |     100 |     100 |                   
 src/components/GameSettings   |     100 |      100 |     100 |     100 |                   
  GameSettings.tsx             |     100 |      100 |     100 |     100 |                   
 src/components/GameUI         |     100 |      100 |     100 |     100 |                   
  GameUI.tsx                   |     100 |      100 |     100 |     100 |                   
 src/components/LoginForm      |     100 |      100 |     100 |     100 |                   
  LoginForm.tsx                |     100 |      100 |     100 |     100 |                   
 src/components/SetFillPercent |     100 |      100 |     100 |     100 |                   
  SetFillPercent.tsx           |     100 |      100 |     100 |     100 |                   
 src/modules/AppRouter         |     100 |      100 |     100 |     100 |                   
  AppRouter.tsx                |     100 |      100 |     100 |     100 |                   
 src/modules/AppStateManager   |     100 |      100 |     100 |     100 |                   
  AppStateManager.tsx          |     100 |      100 |     100 |     100 |                   
 src/store                     |     100 |      100 |     100 |     100 |                   
  hooks.ts                     |     100 |      100 |     100 |     100 |                   
 src/store/ducks/game          |     100 |      100 |     100 |     100 |                   
  game.ts                      |     100 |      100 |     100 |     100 |                   
  playFieldUtils.ts            |     100 |      100 |     100 |     100 |                   
 src/store/sagas               |     100 |      100 |     100 |     100 |                   
  rootSaga.ts                  |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib         |     100 |      100 |     100 |     100 |                   
  reducer.ts                   |     100 |      100 |     100 |     100 |                   
  store.ts                     |     100 |      100 |     100 |     100 |                   
-------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 14 passed, 14 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        6.657 s
Ran all test suites.


```
