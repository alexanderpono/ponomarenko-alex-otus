А.Пономаренко. Домашние задания к курсам OTUS / [Administrator Linux. Professional-2024-10](../README.md) / Домашнее задание 4. Дисковая подсистема 

# Домашнее задание 4. Дисковая подсистема 

Работа с mdadm

## Цель:

научиться использовать утилиту для управления программными RAID-массивами в Linux

## Описание/Пошаговая инструкция выполнения домашнего задания:

Для выполнения домашнего задания используйте методичку


[Работа с mdadm](https://docs.google.com/document/d/1jTq4l4UD1CF9C_VFqGXZYunXA2RUap70CfKm_6OXZBU/edit?usp=sharing)


Что нужно сделать?

* добавить в Vagrantfile еще дисков
* собрать R0/R5/R10 на выбор
* прописать собранный рейд в конф, чтобы рейд собирался при загрузке
* сломать/починить raid
* создать GPT раздел и 5 партиций и смонтировать их на диск.

Формат сдачи - измененный Vagrantfile, скрипт для создания рейда, конф для автосборки рейда при загрузке.

Доп. задание - Vagrantfile, который сразу собирает систему с подключенным рейдом


## Критерии оценки:

Статус "Принято" ставится при выполнении следующего условия:

* сдан измененный Vagrantfile, скрипт для создания рейда, конф для автосборки рейда при загрузке.

Доп. задания выполняется по желанию.

Компетенции:

Администрирование, установка, настройка, отладка серверов Linux
   - работать с таблицей разделов диска, понимать разницу между GPT и MBR, корректно разбивать диск на разделы
   - выбирать нужный уровень RAID для поставленных задач
   - разбирается в принципах работы RAID массивов.
   - понимать разницу межда аппартной и програмной реализацией RAID


## Выполнение д/з №4

### Репозиторий доступен по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/linux-pro-2024-10/hw04-vagrantAnsibleMdadm

### Пояснительная записка к проекту доступна по адресу:
https://github.com/alexanderpono/ponomarenko-alex-otus/tree/master/linux-pro-2024-10/hw04-vagrantAnsibleMdadm/README.md

### Запуск программы

Предусловия
* на компьютере установлен Linux
* на компьютере включена виртуализация
* установлен Vagrant


1. Клонировать проект: 
```
git clone https://github.com/alexanderpono/ponomarenko-alex-otus.git
```

2. Зайти в папку д/з №4: 
```
cd ./ponomarenko-alex-otus/linux-pro-2024-10/hw04-vagrantAnsibleMdadm
```

3. Запустить настройку виртуальной машины
```
vagrant up
```

При настройке виртуальной машины: 
* к боксу добавляются 4 HDD размером по 1 ГБайт
* создается RAID-массив уровня 10 из 4 HDD по 1 Гбайт
* первый жесткий диск RAID-массива помечивается как сбойный, удаляется из массива. Распечатывается статус RAID (clean, degraded, resyncing). На освобожденном HDD очищается суперблок, он заново добавляется в RAID. Распечатывается статус RAID (clean, degraded, recovering)
* конфигурация RAID сохраняется для автоматической сборки при перезагрузки виртуальной машины

* на устройстве RAID-массива создаются 5 разделов
* эти 5 разделов форматируются в файловую систему ext4
* создаются 5 папок для последующего монтирования к ним новых томов
* выполняется монтирование новых томов к точкам монтирования, с сохранением автомонтирования дисков после перезагрузки виртуальной машины

Чтобы обеспечить возможность повторного запуска vagrant up с сохранением данных на RAID - в bash-скрипты, 
которые меняют состояние жестких дисков виртуальной машины, добавлена проверка, не выполнялась ли эта операция ранее.

При этом - отмонтирование первого HDD в RAID, его очистка, добавление в RAID и восстановление RAID - выполняется при каждом старте "vagrant up".

Если зайти в бокс (vagrant ssh), перезапустить виртуальную машину ВМ (sudo reboot),
дождаться перезапуска ВМ, далее  опять зайти внутрь ВМ (vagrant ssh) - то видно, что автосборка RAID и автомонтирование томов успешно выполнились:
```
$ df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
udev           devtmpfs  466M     0  466M   0% /dev
tmpfs          tmpfs      97M  1.1M   96M   2% /run
/dev/sda1      ext4       39G  1.5G   38G   4% /
tmpfs          tmpfs     483M     0  483M   0% /dev/shm
tmpfs          tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs          tmpfs     483M     0  483M   0% /sys/fs/cgroup
/dev/md127p3   ext4      371M   24K  343M   1% /mnt/data3
/dev/md127p1   ext4      371M   24K  343M   1% /mnt/data1
/dev/md127p2   ext4      371M   24K  343M   1% /mnt/data2
/dev/md127p5   ext4      371M   24K  343M   1% /mnt/data5
/dev/md127p4   ext4      371M   24K  343M   1% /mnt/data4
/dev/loop1     squashfs   64M   64M     0 100% /snap/core20/2318
/dev/loop0     squashfs   39M   39M     0 100% /snap/snapd/21759
/dev/loop2     squashfs   92M   92M     0 100% /snap/lxd/29619
tmpfs          tmpfs      97M     0   97M   0% /run/user/1000
```

Статус RAID-массива после перезагрузки ВМ (sudo reboot):
```
$ sudo mdadm -D /dev/md127
/dev/md127:
           Version : 1.2
     Creation Time : Wed Nov 20 19:40:31 2024
        Raid Level : raid10
        Array Size : 2093056 (2044.00 MiB 2143.29 MB)
     Used Dev Size : 1046528 (1022.00 MiB 1071.64 MB)
      Raid Devices : 4
     Total Devices : 4
       Persistence : Superblock is persistent

       Update Time : Wed Nov 20 19:56:51 2024
             State : clean 
    Active Devices : 4
   Working Devices : 4
    Failed Devices : 0
     Spare Devices : 0

            Layout : near=2
        Chunk Size : 512K

Consistency Policy : resync

              Name : vagrantAnsibleMdAdm:127  (local to host vagrantAnsibleMdAdm)
              UUID : 039145f9:97609e9e:c76d9ca4:308813b5
            Events : 81

    Number   Major   Minor   RaidDevice State
       4       8       32        0      active sync set-A   /dev/sdc
       1       8       48        1      active sync set-B   /dev/sdd
       2       8       64        2      active sync set-A   /dev/sde
       3       8       80        3      active sync set-B   /dev/sdf
```

