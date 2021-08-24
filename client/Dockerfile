FROM node:16

LABEL version="1.0"
LABEL description="React front end for time tracker application."
LABEL maintainer = ["dstjohniii@gmail.com", "grahamlangford87@gmail.com"]

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
EXPOSE 3000
CMD [ "npm", "start"]
