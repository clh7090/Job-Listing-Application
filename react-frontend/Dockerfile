FROM node:latest

WORKDIR /react-frontend

COPY package.json .

RUN npm i

COPY . . 

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
