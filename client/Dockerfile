# Generic implementation of Linux 
FROM node:alpine

# Create new source directory, switch to it 
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies (pkg.json)
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]