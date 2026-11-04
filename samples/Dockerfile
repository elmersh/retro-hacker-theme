# syntax=docker/dockerfile:1
FROM php:8.4-fpm-alpine AS base
ARG APP_ENV=production
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    TZ=America/El_Salvador

WORKDIR /var/www/html
RUN apk add --no-cache git zip unzip \
    && docker-php-ext-install pdo_pgsql opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . .
RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000
HEALTHCHECK CMD php-fpm -t || exit 1
CMD ["php-fpm"]
