FROM node:16-alpine
ARG HOME_DIR=/home/inventory
WORKDIR ${HOME_DIR}
RUN cd inventory-studio && npm i
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm run start