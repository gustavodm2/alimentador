FROM php:7.4-apache

# Install PDO PostgreSQL extension dependencies
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql
