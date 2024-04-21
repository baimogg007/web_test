# Fetching the latest node image on apline linux
FROM node:18.12.1 AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
RUN mkdir -p /app
WORKDIR /app

RUN export NODE_OPTIONS=--openssl-legacy-provider

# Installing dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn

# Copying all the files in our project
COPY . .

# Building our application
RUN yarn build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY — from=builder /app/build /usr/share/nginx/html/

# Copying our nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
