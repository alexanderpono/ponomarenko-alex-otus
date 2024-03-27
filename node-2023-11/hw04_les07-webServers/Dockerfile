# DEPS
FROM node:16-alpine as deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
RUN ls .

COPY package*.json ./
COPY bin ./bin
COPY api-tests ./api-tests
COPY controllers ./controllers
COPY models ./models
COPY services ./services
COPY routes ./routes
COPY views ./views
COPY app.js ./app.js
COPY constants.js ./constants.js
COPY tsconfig.json ./tsconfig.json

COPY app.js ./temp/build/app.js
COPY constants.js ./temp/build/constants.js
COPY views ./temp/build/views
COPY routes/*.js ./temp/build/routes/

# BUILD
FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app ./

RUN npm run build
RUN ls .

USER node

# RUN

FROM node:16-alpine as run

WORKDIR /usr/src/app

RUN chown node:node ./

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/temp/build ./
COPY package.json ./

USER node

RUN ls .
RUN pwd
# CMD ["sleep", "infinity"]

CMD [ "node", "./bin/www.js" ]
