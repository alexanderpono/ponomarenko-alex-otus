А.Пономаренко. Домашние задания к курсам OTUS / [Administrator Linux. Professional-2024-10](../README.md) / Домашнее задание 3. Ansible. Install and configure Nginx

# Домашнее задание 3. Ansible. Install and configure Nginx

Первые шаги с Ansible
## Цель:

Написать первые шаги с Ansible.

## Описание/Пошаговая инструкция выполнения домашнего задания:
Что нужно сделать?

Подготовить стенд на Vagrant как минимум с одним сервером. На этом сервере используя Ansible необходимо развернуть nginx со следующими условиями:

* необходимо использовать модуль yum/apt;
* конфигурационные файлы должны быть взяты из шаблона jinja2 с перемененными;
* после установки nginx должен быть в режиме enabled в systemd;
должен быть использован notify для старта nginx после установки;
* сайт должен слушать на нестандартном порту - 8080, для этого использовать переменные в Ansible.


В чат ДЗ отправьте ссылку на ваш git-репозиторий. Обычно мы проверяем ДЗ в течение 48 часов.

## Критерии оценки:

Статус "Принято" ставится, если:

* предоставлен Vagrantfile и готовый playbook/роль (инструкция по запуску стенда, если посчитаете необходимым);
* после запуска стенда nginx доступен на порту 8080;
* при написании playbook/роли соблюдены перечисленные в задании условия.



## Выполнение д/з №3

### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/linux-pro-2024-10/hw03-vagrantAnsibleNginx

### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/linux-pro-2024-10/hw03-vagrantAnsibleNginx/README.md

### Запуск программы

Предусловия
* на компьютере установлен Linux
* на компьютере включена виртуализация
* установлен Vagrant


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №2: 
```
cd ./ponomarenko-alex-otus/linux-pro-2024-10/hw03-vagrantAnsibleNginx 
```

3. Запустить настройку виртуальной машины
```
vagrant up
```

При настройке виртуальной машины: 
* устанавливается ansible
* выполняется обновление существующих библиотек
* добавляется GPG-ключ репозитория nginx
* добавляется репозиторий nginx
* устанавливается nginx из репозитория
* останавливается сервис nginx
* настраивается конфигурация сайта по умолчанию nginx на порту 8080
* настраивается главная страница сайта по умолчанию nginx
* запускается сервис nginx
* выполняется распечатка:
    * списка занятых сокетов на виртуальной машине
    * установленной версии nginx
    * выполняется curl-запрос к узлу nginx, распечатывается полученная html-страница
