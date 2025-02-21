FROM node

RUN apt update && apt install -y postgresql-client
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev