[А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу React.js-2025-08 OTUS ](../README.md) / Домашнее задание 10

# Домашнее задание 10. Формы

## Цель:

научиться работать с формами, а также научиться читать чужой код. 

## Описание/Пошаговая инструкция выполнения домашнего задания:

Необходимо

    перенести форму работы с профилем из учебного репозитория в ваш проект. Стили можно изменить, важно найти компонент формы, понять как он используется и копировать в свой проект. Структуру можно изменять, важно, чтобы пользователи могли авторизоваться в вашем приложении.
    создать форму добавления/редактирования товара/операции
    создать форму входа/регистрации

Пока вы не проходили отправку данных на сервер, поэтому в формах должна быть только валидация и вывод данных в консоль с одновременной очисткой формы.




## Критерии оценки:




    Перенос формы работы с профилем (3 балла)
        (1 балл) Форма корректно перенесена и интегрирована в проект.
        (1 балл) В Storybook доступна возможность изменять данные в форме.
        (1 балл) Форма правильно обрабатывает валидацию и выводит данные в консоль.

    Форма добавления/редактирования товара/операции (3 балла)
        (1 балл) Форма создана и корректно работает в проекте.
        (1 балл) В Storybook доступна возможность изменять данные в форме.
        (1 балл) Форма правильно обрабатывает валидацию и выводит данные в консоль.

    Форма входа/регистрации (4 балла)
        (1 балл) Форма создана и корректно работает в проекте.
        (1 балл) В Storybook доступна возможность изменять данные в форме.
        (1 балл) Форма правильно обрабатывает валидацию, включая проверку email и пароля.
        (1 балл) Форма выводит данные в консоль и очищает форму после отправки.


Максимальное количество: 10 баллов
Статус "Принято" ставится при наборе 7 и более баллов


## Компетенции:


    React API
        - Создавать и использовать функциональные и классовые компоненты
        - Понимать и использовать методы для управления состоянием и эффектами
    Работа с формами
        - Использовать нативные методы работы с формами
        - Использовать formik
        - Использовать react-hooks-form
    Drag and drop
        - Обрабатывать события
    Работа с TypeScript в React
        - Написание и понимание кода на языке TypeScript






## Решение
1. Из учебного репозитория взят компонент ProfileForm. Считаю, что использованное в учебном ропозитории решение слишком усложнено по сравнению со стоящей задачей сделать прототип формы: используются кастомные компоненты для каждого поля. В результате написан новый компонент ProfileForm.
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/react-2025-08-hw10-les18-forms/react-2025-08/react-2025-08-hw10-les18-forms/src/features/forms/ProfileForm

2. Добавлена форма добавления/редактирования товара/операции EditProductForm
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/react-2025-08-hw10-les18-forms/react-2025-08/react-2025-08-hw10-les18-forms/src/features/forms/EditProductForm

3. Добавлена форма входа/регистрации LoginForm
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/react-2025-08-hw10-les18-forms/react-2025-08/react-2025-08-hw10-les18-forms/src/features/forms/LoginForm

4. CI/CD на github временно сломался - задача ставится в очередь, через 15 минут задача аварийно отменяется:
https://github.com/alexanderpono/ponomarenko-alex-otus/actions/runs/21606138256/job/62266904348
![Скриншот](01.png)

для локального запуска storybook нужно выполнить команды:
```
git clone git@github.com:alexanderpono/ponomarenko-alex-otus.git
или
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git

cd ponomarenko-alex-otus
git checkout react-2025-08-hw10-les18-forms
cd react-2025-08/react-2025-08-hw10-les18-forms 
npm ci

npm run storybook

```

скриншоты компонентов в storybook:

EditProductForm
![](02-EditProductForm.png)
![](03-EditProductForm.png)
![](04-EditProductForm.png)

LoginForm
![](05-LoginForm.png)
![](06-LoginForm.png)
![](07-LoginForm.png)
![](08-LoginForm.png)
![](09-LoginForm.png)

ProfileForm
![](10-ProfileForm.png)
![](11-ProfileForm.png)

README доступен по адресу 
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/react-2025-08-hw10-les18-forms/react-2025-08/react-2025-08-hw10-les18-forms/README.md

список коммитов (смотреть коммиты "feat: hw10: add ProfileForm", "feat: hw10: add LoginForm&RegisterForm", "feat: hw10: add EditProductForm" и последующие):
https://github.com/alexanderpono/ponomarenko-alex-otus/pull/195/commits

