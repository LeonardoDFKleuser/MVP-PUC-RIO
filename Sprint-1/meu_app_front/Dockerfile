FROM node:lts

WORKDIR /usr/src/app/front

COPY Sprint-1/meu_app_front/ .

RUN npm install --production

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s build"]
