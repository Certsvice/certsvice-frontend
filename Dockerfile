FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json

COPY . /usr/src/app
RUN npm install
RUN npm install react-scripts -g
# start app
EXPOSE 3000
CMD ["npm ","start"];

