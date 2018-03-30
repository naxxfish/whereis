FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app/
RUN npm install yarn
RUN yarn install
ADD . /usr/src/app

CMD ["yarn","start"]
