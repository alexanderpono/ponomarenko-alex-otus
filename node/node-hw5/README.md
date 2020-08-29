Домашние работы на курсе "OTUS Node.js 2020-06"

<h2>node-hw5</h2>

<h2>Real-time web-приложения с сокетами</h2>


1. Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
2. На FE создать index.html c основным скриптом, подключить к нему Service Worker (создать его отдельным файлом), подключить Service Worker к Web Socket Server.
Примечание: смотрите практическую часть урока, последний час записи для подробностей;
3. Отправлять нотификации через WS Server через разумный интервал, проверить, что Service Worker получает сообщения от Web Socket Server.
4. Из Service Worker отправить сообщения на основной скрипт и отображать в виде Web Notifications.

Критерии оценки: Приложения имплементируют MVP задания, в обоих случаях должны и спользоваться Web Sockets и отдельно созданный Front end script


<b>Примечание к решению:</b>
API "Service Worker" не поддерживает обмен сообщениями с основным скриптом (postMessage, onmessage) (Ubuntu, Chrome 78). Поэтому воркер реализован на основе API Worker.




<i>Для проверки д/з - выполнить команды:</i>
1) git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
2) cd ponomarenko-alex-otus
3) git checkout node-5
4) cd node/node-hw5
5) npm i
для запуска websocket-сервера 6) npm run ws-server
для запуска клиента 7) npm run dev
8) в браузере Chrome открыть url: http://localhost:8082/

Ожидаемое поведение программы: 
1) получение автоматически генерируемых сообщений от websocket-сервера, 
1.1) отображение их в всплывающих уведомлениях Web Notifications (нужно согласиться с приемом уведомлений от узла http://localhost:8082/)
1.2) отображение полученных от сервера сообщений в UI страницы

2) возможность отослать сообщение на сервер из UI страницы. Для этого нужно ввести сообщение в поле ввода и нажать "Отправить"
