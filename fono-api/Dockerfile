FROM node:18-alpine as init

WORKDIR /fono

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./babel.config.json ./babel.config.json
COPY ./jest.config.json ./jest.config.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./* ./
COPY ./.env ./.env

RUN npm run build --experimental-modules

FROM node:18-alpine

WORKDIR /fono

# COPY --from=init /fono/src ./src
COPY --from=init /fono/node_modules ./node_modules
COPY --from=init /fono/dist ./dist
# COPY --from=init /fono/tsconfig.json ./tsconfig.json
# COPY --from=init /fono/package.json ./package.json

# RUN npm install typescript -g

CMD node dist/database/sync --experimental-modules && node /dist/index.js