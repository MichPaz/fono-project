FROM node:lts-alpine as builder

WORKDIR /fonoapp

COPY ./* ./
# COPY ./node_modules/* /node_modules/
# COPY ./ /opt/app-root/src/

RUN npm install -g npm@10.5.2
RUN npm install -g nodemon watchman
RUN npm install -g react-scripts
# RUN echo ls
RUN npm install
RUN npm run build

FROM node:lts-alpine
WORKDIR /fonoapp

COPY --from=builder /fonoapp /fonoapp
EXPOSE 8080
CMD node dist/index.js