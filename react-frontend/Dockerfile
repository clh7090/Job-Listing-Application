FROM node:20.6.0-alpine

WORKDIR /react-frontend

COPY package.json .

RUN npm i

COPY . . 

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
