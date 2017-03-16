FROM node:latest
MAINTAINER Alain Galvan "hi@alain.xyz"
EXPOSE 8000
RUN cd backend & npm i & npm start