# Generic implementation of Linux 
FROM node:alpine

# Create new source directory, switch to it 
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies (pkg.json), run npm installs
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm install

# Bundle app source (copy files from project)
COPY . /usr/src

# run nextjs build script
RUN npm run build
EXPOSE 3000

# launch node server
CMD ["npm", "start"]

## note: docker build command -> docker build -t svcc .