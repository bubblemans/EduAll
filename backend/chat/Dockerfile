FROM node:latest
WORKDIR "/app"
COPY ./package.json ./app
COPY ./package-lock.json ./app
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "start" ]
