
FROM node:22-alpine


WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install



COPY . .

RUN npm install ts-node typescript --save-dev


EXPOSE 4000


CMD ["npm", "run", "dev"]
