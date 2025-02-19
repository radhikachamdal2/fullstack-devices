
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install



COPY index.ts ./index

RUN npm install ts-node typescript --save-dev

EXPOSE 4002
CMD ["npm", "run", "dev"]
