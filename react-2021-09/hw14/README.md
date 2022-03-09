[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 14

# Домашнее задание 14. Test quality tools

## Цель:

Повышаем качество тестов до максимума

## Описание/Пошаговая инструкция выполнения домашнего задания:
Установка и настройка stryker.
Оцениваем качество тестов и рефакторим их до максимально достижимого значения.


## Критерии оценки:

1. Настройка страйкера
2. Качественный рефакторинг тестов


## Выполнение д/з №14

1. Проведена настройка страйкера

2. Проведена доработка тестов, чтобы повысить показатели страйкера. Проведен соответствующий рефакторинг программы

3. [Кодовая база hw14](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw14)

4. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw14)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw14/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw14/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw14/test-report/testResult.html)
* [stryker-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw14/stryker-report/index.html)
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
  game.saga.ts                 |     100 |      100 |     100 |     100 |                   
  game.ts                      |     100 |      100 |     100 |     100 |                   
  playFieldUtils.ts            |     100 |      100 |     100 |     100 |                   
 src/store/sagas               |     100 |      100 |     100 |     100 |                   
  rootSaga.ts                  |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib         |     100 |      100 |     100 |     100 |                   
  reducer.ts                   |     100 |      100 |     100 |     100 |                   
  store.ts                     |     100 |      100 |     100 |     100 |                   
-------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 19 passed, 19 total
Tests:       143 passed, 143 total
Snapshots:   0 total
Time:        6.878 s, estimated 10 s
Ran all test suites.


```



6. Отчет stryker (оценка качества тестов)
```

Ran 16.42 tests per mutant on average.
--------------------------|---------|----------|-----------|------------|----------|---------|
File                      | % score | # killed | # timeout | # survived | # no cov | # error |
--------------------------|---------|----------|-----------|------------|----------|---------|
All files                 |   58.79 |      264 |         7 |        189 |        1 |      10 |
 components               |   27.50 |       33 |         0 |         87 |        0 |       0 |
  AppStateView            |  100.00 |        1 |         0 |          0 |        0 |       0 |
   AppStateView.tsx       |  100.00 |        1 |         0 |          0 |        0 |       0 |
  AuthorizedHead          |  100.00 |        1 |         0 |          0 |        0 |       0 |
   AuthorizedHead.tsx     |  100.00 |        1 |         0 |          0 |        0 |       0 |
  Button                  |  100.00 |        2 |         0 |          0 |        0 |       0 |
   Button.tsx             |  100.00 |        2 |         0 |          0 |        0 |       0 |
  Cell                    |  100.00 |        4 |         0 |          0 |        0 |       0 |
   Cell.tsx               |  100.00 |        4 |         0 |          0 |        0 |       0 |
  DefineMode              |   33.33 |        3 |         0 |          6 |        0 |       0 |
   DefineMode.tsx         |   33.33 |        3 |         0 |          6 |        0 |       0 |
  DefineSpeed             |   30.77 |        4 |         0 |          9 |        0 |       0 |
   DefineSpeed.tsx        |   30.77 |        4 |         0 |          9 |        0 |       0 |
  FieldSize               |   30.77 |        4 |         0 |          9 |        0 |       0 |
   FieldSize.tsx          |   30.77 |        4 |         0 |          9 |        0 |       0 |
  GameField               |   10.00 |        3 |         0 |         27 |        0 |       0 |
   GameField.tsx          |   10.00 |        3 |         0 |         27 |        0 |       0 |
  GameSettings            |    0.00 |        0 |         0 |          4 |        0 |       0 |
   GameSettings.tsx       |    0.00 |        0 |         0 |          4 |        0 |       0 |
  GameUI                  |    0.00 |        0 |         0 |          5 |        0 |       0 |
   GameUI.tsx             |    0.00 |        0 |         0 |          5 |        0 |       0 |
  LoginForm               |   60.00 |        9 |         0 |          6 |        0 |       0 |
   LoginForm.tsx          |   60.00 |        9 |         0 |          6 |        0 |       0 |
  SetFillPercent          |    9.52 |        2 |         0 |         19 |        0 |       0 |
   SetFillPercent.tsx     |    9.52 |        2 |         0 |         19 |        0 |       0 |
  common.tsx              |    0.00 |        0 |         0 |          2 |        0 |       0 |
 modules                  |   50.00 |       14 |         0 |         14 |        0 |       0 |
  AppRouter               |    0.00 |        0 |         0 |          1 |        0 |       0 |
   AppRouter.tsx          |    0.00 |        0 |         0 |          1 |        0 |       0 |
  AppStateManager         |   51.85 |       14 |         0 |         13 |        0 |       0 |
   AppStateManager.tsx    |   51.85 |       14 |         0 |         13 |        0 |       0 |
 StorageService           |   86.11 |       31 |         0 |          5 |        0 |       0 |
  StorageService.saga.ts  |   81.82 |        9 |         0 |          2 |        0 |       0 |
  StorageService.thunk.ts |  100.00 |        5 |         0 |          0 |        0 |       0 |
  StorageService.ts       |   85.00 |       17 |         0 |          3 |        0 |       0 |
 store                    |   74.15 |      168 |         7 |         61 |        0 |      10 |
  ducks                   |   74.57 |      166 |         7 |         59 |        0 |      10 |
   game                   |   74.57 |      166 |         7 |         59 |        0 |      10 |
    game.saga.ts          |    4.17 |        0 |         1 |         23 |        0 |       0 |
    game.ts               |   94.25 |       82 |         0 |          5 |        0 |       1 |
    playFieldUtils.ts     |   74.38 |       84 |         6 |         31 |        0 |       9 |
  sagas                   |  100.00 |        2 |         0 |          0 |        0 |       0 |
   rootSaga.ts            |  100.00 |        2 |         0 |          0 |        0 |       0 |
  hooks.ts                |    0.00 |        0 |         0 |          2 |        0 |       0 |
 testFramework            |   66.67 |       18 |         0 |          9 |        0 |       0 |
  lib                     |   66.67 |       18 |         0 |          9 |        0 |       0 |
   reducer.ts             |   69.23 |       18 |         0 |          8 |        0 |       0 |
   store.ts               |    0.00 |        0 |         0 |          1 |        0 |       0 |
 app.tsx                  |    0.00 |        0 |         0 |          0 |        1 |       0 |
 consts.ts                |    0.00 |        0 |         0 |         13 |        0 |       0 |
--------------------------|---------|----------|-----------|------------|----------|---------|

```
