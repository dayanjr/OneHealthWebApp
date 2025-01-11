FROM node:20.13.1-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "run", "server"]