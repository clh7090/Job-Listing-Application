FROM node:20.6.1

WORKDIR /react-frontend

COPY package.json .

RUN npm i

COPY . . 

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
