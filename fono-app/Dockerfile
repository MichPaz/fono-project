FROM node:14.20.1-alpine as builder

WORKDIR /fono

ARG SKIP_PREFLIGHT_CHECK=true

ENV SKIP_PREFLIGHT_CHECK=${SKIP_PREFLIGHT_CHECK}

RUN apk add --no-cache nodejs-dev

COPY ./src ./src
COPY ./.env ./.env
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

# RUN npm install -g npm@10.6.0
RUN npm install --legacy-peer-deps
RUN npm install -g nodemon watchman
RUN npm install -g react-scripts
# RUN npm install webpack@4.42.0

COPY ./public/* ./public/

RUN npm run build

FROM nginx

WORKDIR /fono

COPY --from=builder /fono/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]