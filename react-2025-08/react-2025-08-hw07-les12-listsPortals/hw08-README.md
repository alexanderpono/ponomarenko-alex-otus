[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2025-08 OTUS ](../README.md) / Домашнее задание 8

# Домашнее задание 8. Паттерны

## Цель:

освоить основные паттеры реакт.

## Описание/Пошаговая инструкция выполнения домашнего задания:

Необходимо сделать рефакторинг 5 вариантов компонентов. В процессе рефакторинга использовать паттерны React.


## Критерии оценки:
    Применение ключевых паттернов React (3 балла):
        Правильное использование паттернов — 3 балла.
        Частично неправильно использованы паттерны или пропущены важные моменты — 1-2 балла.
        Некорректное использование паттернов или их отсутствие — 0 баллов.

    Рефакторинг компонентов для повышения читаемости и качества кода (3 балла):
        Код стал заметно лучше и более читаемым — 3 балла.
        Некоторое улучшение, но все еще неясный или громоздкий код — 1-2 балл.
        Код остался таким же сложным или хуже — 0 баллов.

    Минимизация дублирования кода (2 балла):
        Дублирующийся код существенно уменьшен и компоненты стали более переиспользуемыми — 2 балла.
        Некоторое уменьшение дублирований, но незначительное — 1 балл.
        Дублирование кода осталось или увеличилось — 0 баллов.

    Работа с состоянием и контекстом (2 балла):
        Состояние и контекст используются эффективно и правильно — 2 балла.
        Частично правильное использование состояния и контекста — 1 балл.
        Полная или частичная неправильная работа с состоянием и контекстом — 0 баллов.

Максимальное количество: 10 баллов
Статус "Принято" ставится при наборе 7 и более баллов


## Компетенции:
    React API
        - Работать с обработчиками событий в компонентах
        - Создавать и использовать функциональные и классовые компоненты
        - Понимать и использовать методы для управления состоянием и эффектами
        - Понимать проблему лишних перерисовок и применение подходов к её решению
        - Понимать и использовать методы жизненного цикла компонента
    Принципы программирования
        - Знать и уметь использовать react паттерны в соотвествии с принципами программирования



## Решение
В процессе работы над предыдущим д/з создан ряд компонентов приложения. Применены следующие паттерны React:

Modal.tsx https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/Modal/Modal.tsx

    - Презентационный компонент (компонент без состояния)
    - условный рендеринг с использованием логического && оператора
    - использование пропса "children"

ModalStarter.tsx - компонент для storybook https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/ModalStarter/ModalStarter.tsx

    - Container component (Stateful component)

Применение React Context для хранения данных, переиспользуемых в нескольких компонентах (это можно рассматривать как реализация State hoisting)

    - Контекст I18nContext используется для хранения информации о языке пользовательского интерфейса https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/I18nContext/I18nContext.tsx

    - Контекст ThemeContext используется для хранения информации о текущей цветовой схеме пользовательского интерфейса https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/ThemeContext/ThemeContext.tsx

ProductDynamicList.tsx https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/ProductDynamicList/ProductDynamicList.tsx

    - применение array desctructuring 
    setMyProducts([...myProducts, newProduct]);

    - имитация вызова API (используется Promise)
     const loadMore = () => { ... return Promise.resolve(newProduct); }

    - применение ref для доступа к DOM

ProductList.tsx https://github.com/alexanderpono/ponomarenko-alex-otus/blob/master/react-2025-08/react-2025-08-hw07-les12-listsPortals/src/shared/ProductList/ProductList.tsx

    - при отработке замечания code review устранен антипаттерн "indexes as key": key создается из комбинации полей name и description
        <ProductCard key={`${product.name}-${product.description}`} />