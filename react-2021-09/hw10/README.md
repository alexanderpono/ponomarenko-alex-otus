[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 10

# Домашнее задание 10. Redux-saga intro

## Цель:

Подключим redux в react приложение

Подключаем redux, переводим стейт приложения на redux.

* добавляем тесты для connect
* подключаем redux-saga в наше приложение
* реализуем сохранение state в local storage на saga



## Критерии оценки:

1. установка и настройка redux-saga
2. сохранение стейта
3. качественные тест кейсы


## Выполнение д/з №10

1. Компоненты подключены к redux

2. Сохранение и загрузка стейта из localStorage переведены на redux-saga

3. Доработаны и дополнены jest-тесты

4. [Кодовая база hw10](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw10)

5. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw10)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw10/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw10/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw10/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}

6. Покрытие кода тестами:

```

--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |     100 |     100 |                   
 src                            |     100 |      100 |     100 |     100 |                   
  consts.ts                     |     100 |      100 |     100 |     100 |                   
 src/StorageService             |     100 |      100 |     100 |     100 |                   
  StorageService.saga.ts        |     100 |      100 |     100 |     100 |                   
  StorageService.thunk.ts       |     100 |      100 |     100 |     100 |                   
  StorageService.ts             |     100 |      100 |     100 |     100 |                   
 src/components                 |     100 |      100 |     100 |     100 |                   
  common.tsx                    |     100 |      100 |     100 |     100 |                   
 src/components/AppRouter       |     100 |      100 |     100 |     100 |                   
  AppRouter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/AppStateManager |     100 |      100 |     100 |     100 |                   
  AppStateManager.tsx           |     100 |      100 |     100 |     100 |                   
 src/components/AppStateView    |     100 |      100 |     100 |     100 |                   
  AppStateView.tsx              |     100 |      100 |     100 |     100 |                   
 src/components/AuthorizedHead  |     100 |      100 |     100 |     100 |                   
  AuthorizedHead.tsx            |     100 |      100 |     100 |     100 |                   
 src/components/Button          |     100 |      100 |     100 |     100 |                   
  Button.tsx                    |     100 |      100 |     100 |     100 |                   
 src/components/Cell            |     100 |      100 |     100 |     100 |                   
  Cell.tsx                      |     100 |      100 |     100 |     100 |                   
 src/components/DefineMode      |     100 |      100 |     100 |     100 |                   
  DefineMode.tsx                |     100 |      100 |     100 |     100 |                   
 src/components/DefineSpeed     |     100 |      100 |     100 |     100 |                   
  DefineSpeed.tsx               |     100 |      100 |     100 |     100 |                   
 src/components/FieldSize       |     100 |      100 |     100 |     100 |                   
  FieldSize.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/GameField       |     100 |      100 |     100 |     100 |                   
  GameField.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/GameSettings    |     100 |      100 |     100 |     100 |                   
  GameSettings.tsx              |     100 |      100 |     100 |     100 |                   
 src/components/GameUI          |     100 |      100 |     100 |     100 |                   
  GameUI.tsx                    |     100 |      100 |     100 |     100 |                   
 src/components/LoginForm       |     100 |      100 |     100 |     100 |                   
  LoginForm.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/SetFillPercent  |     100 |      100 |     100 |     100 |                   
  SetFillPercent.tsx            |     100 |      100 |     100 |     100 |                   
 src/store                      |     100 |      100 |     100 |     100 |                   
  hooks.ts                      |     100 |      100 |     100 |     100 |                   
 src/store/ducks/game           |     100 |      100 |     100 |     100 |                   
  game.ts                       |     100 |      100 |     100 |     100 |                   
  playFieldUtils.ts             |     100 |      100 |     100 |     100 |                   
 src/store/sagas                |     100 |      100 |     100 |     100 |                   
  rootSaga.ts                   |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib          |     100 |      100 |     100 |     100 |                   
  reducer.ts                    |     100 |      100 |     100 |     100 |                   
  store.ts                      |     100 |      100 |     100 |     100 |                   
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 14 passed, 14 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        6.932 s
Ran all test suites.


```

