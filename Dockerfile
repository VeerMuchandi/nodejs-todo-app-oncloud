FROM node:18

WORKDIR /opt/backend

COPY . /opt/backend
RUN npm install

CMD ["npm", "run", "dev"]