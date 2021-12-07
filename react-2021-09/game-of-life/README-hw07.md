[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 7

# Домашнее задание 7. React patterns

## Цель:

* Оптимизируем код с помощью react patterns
* Разрабатываем приложение, используя полученые знания.

## Логика приложения не должна смешиваться с логикой представления

* планируем и разделяем ответственность между контейнерами
* объединяем все элементы управления и отображения
* реализуем функцию рандомного наполнения массива, в зависимости от выбранного процента заполненности
* реализуем начальное заполнение поля, на основе сгенерированных данных
* при смене процента заполненности, меняются данные в поле, работающая кнопка reset
* Делаем refactoring нашего умного компонента из предыдущего ДЗ, используя полученные знания.
* Используем тесты, чтобы бороться к регрессией и отлавливать ошибки

## Критерии оценки:

1. подготовлен шаблон приложения
2. функция рандомного наполнения
3. если при смене процента заполненности, меняются данные в поле, работающая кнопка reset


## Выполнение д/з №7

1. Реализована функция рандомного наполнения массива playFieldUtils.ts/randomFill()

2. Реализовано начальное заполнение поля 

3. При смене процента заполненности - меняются данные в поле

4. Реализовано поведение кнопки reset

5. Проведено разделение умного компонента AppStateManager на компонент с логикой (AppStateManager) и компонент-шаблон приложения (App)

6. Дополнены тесты и сторибук.

7. [Кодовая база hw07](https://github.com/alexanderpono/ponomarenko-alex-otus/commits/react-hw7)

8. Опубликованные результаты
* [Пояснительная записка](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw07)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw07/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw07/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw07/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}

9. Покрытие кода тестами:

```

--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |     100 |     100 |                   
 src                            |     100 |      100 |     100 |     100 |                   
  consts.ts                     |     100 |      100 |     100 |     100 |                   
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

Test Suites: 10 passed, 10 total
Tests:       57 passed, 57 total
Snapshots:   0 total
Time:        5.394 s
Ran all test suites.


```



