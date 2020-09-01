FROM nginx:latest

LABEL maintainer="1024769485@qq.com"

COPY /dist /usr/share/nginx/html
