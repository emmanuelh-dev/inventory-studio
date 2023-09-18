FROM node:16-alpine
ARG HOME_DIR=/home/inventory
WORKDIR ${HOME_DIR}
EXPOSE 3000
ENTRYPOINT cd inventory-studio && npm i && npm run build && npm run start