FROM node:latest

# Some dependencies and nice things to have while inside a docker container
RUN apt-get update && \
    apt-get install -y \
        vim \
        less \
        iproute2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm install

# copy app source
COPY . .

EXPOSE 8081

ENTRYPOINT [ "node" ]
