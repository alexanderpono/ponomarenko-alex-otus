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

