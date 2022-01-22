[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 9

# Домашнее задание 9. Redux middwares and side effects

## Цель:

Повысить стабильность приложения и реализовать базовый функционал

Создаём структуру state-приложения с использованием Redux.
Разработку приложения ведем отталкиваясь от архитектуры https://github.com/erikras/ducks-modular-redux

* разрабатываем функционал приложения в redux. Разработку ведем полность от тестирования, redux на данном этапе к компонентами не подключается. Боевая практика разработки от тестирования.
* покрываем тестами reducers + actions.
* практикуемся с thunk, добавляем возможность сохранения и загрузки состояния нашего приложения в local storage, а так же выгрузки из него


## Критерии оценки:

1. реализован базовый функционал приложения
2. сохранение состояния в local storage
3. покрытие качественными тест кейсами


## Выполнение д/з №9

1. Состояние приложения перенесно в Redux из state компонента AppStateManager.

2. Добавлены асинхронные акшены game.ts/loadState() и game.ts/saveState(), которые реализуют логику загрузки и сохранения состояния в LocalStorage.

3. Добавлен thunk middleware

4. Доработаны тесты, в т.ч. reducer и actions

5. [Кодовая база hw09](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw9)

6. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw09)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw09/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw09/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw09/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}

7. Покрытие кода тестами:

```

--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |   98.53 |     100 |                   
 src                            |     100 |      100 |     100 |     100 |                   
  consts.ts                     |     100 |      100 |     100 |     100 |                   
 src/StorageService             |     100 |      100 |     100 |     100 |                   
  StorageService.ts             |     100 |      100 |     100 |     100 |                   
 src/components                 |     100 |      100 |     100 |     100 |                   
  common.tsx                    |     100 |      100 |     100 |     100 |                   
 src/components/AppRouter       |     100 |      100 |     100 |     100 |                   
  AppRouter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/AppStateManager |     100 |      100 |   94.74 |     100 |                   
  AppStateManager.tsx           |     100 |      100 |   94.74 |     100 |                   
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
 src/store/ducks/game           |     100 |      100 |     100 |     100 |                   
  game.ts                       |     100 |      100 |     100 |     100 |                   
  playFieldUtils.ts             |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib          |     100 |      100 |     100 |     100 |                   
  reducer.ts                    |     100 |      100 |     100 |     100 |                   
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       69 passed, 69 total
Snapshots:   0 total
Time:        7.186 s
Ran all test suites.


```



