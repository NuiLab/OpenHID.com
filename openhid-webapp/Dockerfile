FROM node:latest
MAINTAINER Alain Galvan "hi@alain.xyz"
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app
RUN npm start
EXPOSE 8000
