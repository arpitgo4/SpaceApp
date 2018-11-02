
FROM mhart/alpine-node:10

# Install git
# RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]