FROM php:8.0-apache

RUN apt-get update \
    && apt-get install -y libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli


RUN apt-get install -y apache2-bin
RUN a2enmod alias
RUN a2enmod rewrite
RUN service apache2 restart