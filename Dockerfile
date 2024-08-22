FROM node:18-alpine

WORKDIR /src

COPY . /src/

RUN npm install

EXPOSE 80

CMD [ "npm", "start" ]