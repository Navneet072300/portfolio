FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install serve -g

RUN npm install
RUN npm install react-icons

EXPOSE 3000

CMD ["npm", "run", "dev"]