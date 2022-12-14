From node:16-alpine
RUN mkdir /jw-home-websocket-simulator
WORKDIR /jw-home-websocket-simulator
COPY . .
WORKDIR /jw-home-websocket-simulator/server
RUN npm install
WORKDIR /jw-home-websocket-simulator
RUN npm install --prefix client && npm run build --prefix client
EXPOSE 8092
ENTRYPOINT node server/index.js