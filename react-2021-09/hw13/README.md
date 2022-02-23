[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 13

# Домашнее задание 13. Продвинутая конфигурация приложения

## Цель:

Повысим качество приложения, добавим SSR

## Описание/Пошаговая инструкция выполнения домашнего задания:
Поработаем в качестве QA и научимся заводить баги.
* тестируем 2 и более приложений ваших коллег
* чем больше протестируете, тем лучше
* если находите функциональные недостатки, заводите баг репорт через issue на github
* возвращаетесь к своеме приложению и сами находите несколько багов, глядя на приложение свежим взглядом Обязательно, чтобы ваше приложение получило минимум 2 проверки.
* факсаем баги и устраняем проблемы, которые озвучили ваши коллеги


## Критерии оценки:

1. QA проверки
2. оперативное исправление проблем




## Выполнение д/з №13

1. Проведена проверка работ:
* https://github.com/ermakof/lines/issues
* https://github.com/centralToNowhere/react-otus/issues

2. Проведена работа по исправлению дефектов:
* Упростить проверки моков для тестов #45  https://github.com/alexanderpono/ponomarenko-alex-otus/issues/45 
* Ввод пробела вместо имени #46 https://github.com/alexanderpono/ponomarenko-alex-otus/issues/46 
* Нет информации о статусе игры #49 https://github.com/alexanderpono/ponomarenko-alex-otus/issues/49 

3. Соответствующим образом скорректированы unit-тесты

4. [Кодовая база hw13](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw13)

5. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw13)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw13/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw13/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw13/test-report/testResult.html)
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

Test Suites: 17 passed, 17 total
Tests:       135 passed, 135 total
Snapshots:   0 total
Time:        8.816 s
Ran all test suites.


```



