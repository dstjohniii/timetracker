FROM node:16

LABEL version="1.0"
LABEL description="React front end for time tracker application."
LABEL maintainer = ["dstjohniii@gmail.com", "grahamlangford87@gmail.com"]

ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["wait-for-it.sh", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE ${PORT}
