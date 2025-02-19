
FROM node:22-alpine


WORKDIR /app


COPY  ./package.json .
RUN npm install



COPY index.ts ./index


RUN npm install ts-node typescript --save-dev


EXPOSE 4000
CMD ["npm", "run", "dev"]
