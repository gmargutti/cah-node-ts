FROM node:alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
RUN yarn tsc
RUN yarn docs
RUN yarn test
EXPOSE 3333
CMD node ./dist/server.js