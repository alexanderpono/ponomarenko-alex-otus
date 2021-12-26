[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 8

# Домашнее задание 8. React router

## Цель:

Реализовать переход между страницами в приложении.
Данные о пользователе можно хранить в local storage.

* при старте приложения пользователь вводит имя и нажимает кнопку "start"
* после ввода имени идет перенаправление на страницу с приложением
* пользователь должен видеть экран приветствия только один раз
* после ввода имени в приложении должно показываться имя пользователя
* добавить кнопку выход, при нажатии на которую сбрасывается информация о пользователе

* Покрыть тестами базовые сценарии входа / выхода
* Покрыть тестами функционал экрана входа

## Критерии оценки:

1. реализация стартового экрана
2. кнопка выход
3. все работает по сценарию


## Выполнение д/з №8

1. Реализованы страницы "login" и "game" в приложении

2. Используется local storage для хранения данных о пользователе

3. Реализован диалог аутентификации с кнопкой "Start", имя активного пользователя с кнопкой "Logout"

4. При смене процента заполненности - меняются данные в поле

5. Дополнены тесты и сторибук.

6. [Кодовая база hw08](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw8)

7. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw08)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw08/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw08/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw08/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}

8. Покрытие кода тестами:

```

--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |     100 |     100 |                   
 src                            |     100 |      100 |     100 |     100 |                   
  consts.ts                     |     100 |      100 |     100 |     100 |                   
 src/MyStorage                  |     100 |      100 |     100 |     100 |                   
  MyStorage.ts                  |     100 |      100 |     100 |     100 |                   
 src/components/App             |     100 |      100 |     100 |     100 |                   
  App.tsx                       |     100 |      100 |     100 |     100 |                   
 src/components/AppStateManager |     100 |      100 |     100 |     100 |                   
  AppStateManager.tsx           |     100 |      100 |     100 |     100 |                   
  appReducer.ts                 |     100 |      100 |     100 |     100 |                   
  playFieldUtils.ts             |     100 |      100 |     100 |     100 |                   
 src/components/AppStateView    |     100 |      100 |     100 |     100 |                   
  AppStateView.tsx              |     100 |      100 |     100 |     100 |                   
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
 src/components/SetFillPercent  |     100 |      100 |     100 |     100 |                   
  SetFillPercent.tsx            |     100 |      100 |     100 |     100 |                   
 src/components/UserNameForm    |     100 |      100 |     100 |     100 |                   
  UserNameForm.tsx              |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib          |     100 |      100 |     100 |     100 |                   
  reducer.ts                    |     100 |      100 |     100 |     100 |                   
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       64 passed, 64 total
Snapshots:   0 total
Time:        6.711 s
Ran all test suites.


```



