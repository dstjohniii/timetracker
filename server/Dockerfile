FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["wait-for-it.sh", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE ${PORT}
# RUN npm run sq -- db:migrate
