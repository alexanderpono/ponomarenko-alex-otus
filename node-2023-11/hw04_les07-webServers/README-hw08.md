[< А.Пономаренко. Домашние задания к курсам OTUS](../../README.md) / [Д/З к курсу "Node.js Developer 2023-11" OTUS](../README.md) / Домашнее задание 8.  Web Sockets
# Домашнее задание 8.  Web Sockets

Web Sockets
## Цель:
  * Работа с технологией Web Sockets.
  * Освоение Web Sockets API через выполнение практических задач.


## Описание/Пошаговая инструкция выполнения домашнего задания:
```
Работа с технологией Web Sockets.
Освоение Web Sockets API через выполнение практических задач.
Option 1:
Location-based app с использованием Web Sockets
Option2:
Realtime Web Notifications c Web Sockets
Option 1:
Добавить
https://www.infoworld.com/article/2612668/use-mongodb-to-make-your-app-location-aware.html

Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом и подключить к Web Socket Server.
Используя карту Leaflet, https://leafletjs.com/, отобразите местонахождение пользователя
Поменяйте местонахождение пару-тройку раз. Изменения отправляйте на Web Socket Server и сохраните в DB (вместо DB можно использовать geojson файл) с интервалом в 1 мин или чуть более.
После этого убедитесь что web sockets server правильно записало данные в файл. Создайте тропинку маршрута на карте.
Option2:
Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Например, сервис чата общения с консультатом на проекте Best Courses Ever. Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом, подключить к нему Web Worker (создать его отдельным файлом), подключить Web Worker к Web Socket Server.
Примечание: смотрите практическую часть урока, последний час записи для подробностей;
Отправлять нотификации через WS Server через разумный интервал, проверить, что Web Worker получает сообщения от Web Socket Server.
Из Web Worker отправить сообщения на основной скрипт и отображать в виде Web Notifications.
Материалы:
Web Sockets:
https://javascript.info/websocket
https://www.websocket.org/
https://aarontgrogg.com/blog/2015/07/20/the-difference-between-service-workers-web-workers-and-websockets/
Web Workers
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
Notification API
https://hackernoon.com/why-and-how-to-implement-web-notification-api-4eb795c5b05d
https://flaviocopes.com/notifications-api/
```

## Критерии оценки:

```
Приложения имплементируют MVP задания, в обоих случаях должны и спользоваться Web Sockets и отдельно созданный Front end script
```

## Выполнение д/з №8
1. В серверную часть приложения добавлен WS сервер
2. В UI-часть приложения добавлен WS-клиент 
3. В UI-часть приложения добавлена подпрограмма отображения уведомлений, которые приходят с сервера через WebSocket, при помощи Notification API браузера
4. В UI-часть приложения добавлен worker, который запускается при помощи Worker API браузера. 
```
  4.1. В Worker перенесен функционал WS клиента
  4.2. В Worker перенесен функционал работы с Notification API браузера. 
  4.3. Организовано взаимодействие между основным приложением UI (ui.js) и потоком Worker (worker.js) при помощи механизма обмена сообщениями postMessage(), addEventListener('message')
```

### Язык программы: Javascript
### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/hw08-websocket/node-2023-11/hw04_les07-webServers

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers


### Пояснительная записка к д/з №8 доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/blob/hw08-websocket/node-2023-11/hw04_les07-webServers/README-hw08.md

либо 

https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/node-2023-11/hw04_les07-webServers/README-hw08.md


### Запуск программы
Предусловие
0.1: Необходима установленная версия node.js 16 (возможно, подойдет ранняя версия)
- https://nodejs.org/download/release/v16.20.2/

0.2: Необходима локально установленная СУБД MondoDB на порту по умолчанию 27017


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №08 (совмещена с д/з №5, №6): 
Если д/з №08 еще не в master, то:
```
cd ./ponomarenko-alex-otus/
git checkout hw08-websocket
cd ./node-2023-11/hw04_les07-webServers
```

Если д/з №08 уже в master, то:

```
cd ./ponomarenko-alex-otus/node-2023-11/hw04_les07-webServers
```
 

3. установить зависимости:  
```
npm ci
```

4. Запустить сервер
```
npm run watch
```

5. Запустить API-тесты (должны проходить)
```
npm run test
```

6. Открыть адрес http://localhost:3000/ в браузере, открыть консоль разработчика F12

7. Разрешить отображение web-уведомлений в браузере от страницы http://localhost:3000/

8. Ожидаемое поведение:
* отобразилась страница с текстом "Express. Welcome to Express"
* Раз в 5 секунд должны появиться уведомления в браузере о получении сообщений "Сообщение от поддержки. Привет XXX"
* В консоли разработчика в браузере F12 должен быть текст вида:
```
ui load
worker load
worker IN message= {type: 'initWS', payload: ''}
worker WS: подключился
worker WS: IN msg= Привет
UI: received WS message= Привет
worker WS: IN msg= Привет 0
UI: received WS message= Привет 0
worker WS: IN msg= Привет 1
UI: received WS message= Привет 1

```
