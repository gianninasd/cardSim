# install Node.JS
FROM node:10

# create folder where our app will reside
WORKDIR /app

# copy package files and download dependencies
COPY package*.json /app/
RUN npm install

# now copy the app code to the container
COPY . /app/

# map port outside of the container
EXPOSE 3000

# start up the server
CMD [ "npm", "run", "start" ]