# Generic implementation of Linux 
FROM node:alpine

# Create new source directory, switch to it 
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies (pkg.json)
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
## then view repositories on docker with -> docker images
## then tag image and push to docker hub registry 
## tag image with id returned when running docker image command
## -> docker tag *image ID* asross/svcc:latest
## then push container to Ducker hub
## -> docker push asross/svcc:latest
