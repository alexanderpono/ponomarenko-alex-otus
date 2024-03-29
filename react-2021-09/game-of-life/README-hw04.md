[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2021-09 OTUS ](../README.md) / Домашнее задание 4

# Домашнее задание 4. Components lifecycle

## Цель:

Написать "сложный" компонент с логикой с рядом дочерних презентационных компонентов, использующих методы жизненного цикла 

1. Написать "сложный" компонент с логикой с рядом дочерних презентационных компонентов(можно как основу взять дз из урока про JSX)

2. Описать constructor как минимум в одном компоненте, объявить в конструкторе стейт и привязать контекст методов

3. Описать componentDidMount как минимум в одном компоненте, получить в нем данные сервера(можно использовать заглушку или сторонние сервисы, например https://jsonplaceholder.typicode.com/). Описать подписку на событие

4. Описать shouldComponentUpdate как минимум в одном компоненте, произвести в нем оптимизацию производительности(если будет притянутый за уши случай - ничего страшного)

5. Описать componentDidUpdate как минимум в одном компоненте, описать в нем условие реализовать обновление стейта при этом условии
    
6. Описать componentWillUnmout в компоненте, где в рамках componentDidMount была подписка на событие, реализовать отписку от этого события

7. Описать все остальные методы с каким-либо функционалом

8. Написать компонент с отловом ошибок, обернуть в него любой компонент

## Критерии оценки:

ДЗ считается принятым, если выполнены первые 6 пунктов, написаны тесты и storybook


## Выполнение д/з №4
1. Создан "сложный" компонент AppStateManager, который: 
- реализует управление состоянием приложения
- включает в себя презентационные компоненты AppStateView, FieldSize, GameField

2. Компонент AppStateManager реализован как классовый компонент. В AppStateManager создан метод constructor(), в котором объявлен state и привязан конекст метода .invert()

3. В компонент AppStateManager добавлен метод componentDidMount(). Этот метод делает запрос к удаленному серверу, получает json-данные и заносит их в состояние компонента. Также в методе componentDidMount() устанавливается подписка на событие onmousemove. Добавлен обработчик события .onMouseMove(), который заносит координаты мыши в state. Компонент AppStateView отображает данные с бэка и кооринаты мыши в UI приложения.

4. Для оптимизации производительности - в компонент GameField добавлен метод shouldComponentUpdate(), который возвращает true, если обновлялся размер игрового поля или менялось состояние како-нибудь ячейки.

5. В компонент AppStateManager добавлен метод componentDidUpdate(), в котором при опеределенном условии обновляется state компонента AppStateManager

6. Создан метод AppStateManager.componentWillUnmout(), в котором реализована отписка от события mousemove, а также - отмена промиса запроса к удаленному серверу

7. Дополнены тесты и сторибук.
Покрытие тестами на данный момент:
```
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   96.94 |    93.75 |   93.75 |   96.55 |                   
 src                            |     100 |      100 |     100 |     100 |                   
  consts.ts                     |     100 |      100 |     100 |     100 |                   
 src/components/AppStateManager |   94.74 |     87.5 |      90 |   93.75 |                   
  AppStateManager.tsx           |   89.66 |       75 |   85.71 |      88 | 66-68,88          
  appReducer.ts                 |     100 |      100 |     100 |     100 |                   
 src/components/AppStateView    |     100 |      100 |     100 |     100 |                   
  AppStateView.tsx              |     100 |      100 |     100 |     100 |                   
 src/components/Cell            |     100 |      100 |     100 |     100 |                   
  Cell.tsx                      |     100 |      100 |     100 |     100 |                   
 src/components/FieldSize       |     100 |      100 |     100 |     100 |                   
  FieldSize.tsx                 |     100 |      100 |     100 |     100 |                   
 src/components/GameField       |     100 |      100 |     100 |     100 |                   
  GameField.tsx                 |     100 |      100 |     100 |     100 |                   
 src/testFramework/lib          |     100 |      100 |     100 |     100 |                   
  reducer.ts                    |     100 |      100 |     100 |     100 |                   
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 7 passed, 7 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        5.29 s
Ran all test suites.
```


8. [Кодовая база hw04](https://github.com/alexanderpono/ponomarenko-alex-otus/tree/react-hw4)
9. [Опубликованные результаты](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw04)
* [application](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw04/application)
* [storybook](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw04/storybook)
* [test-report](https://alexanderpono.github.io/ponomarenko-alex-otus/react-2021-09/hw04/test-report/testResult.html)
* [Тесты в chromatic](https://www.chromatic.com/builds?appId=6168a14038f17a003a388098){:target="_blank"}
