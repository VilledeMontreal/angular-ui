FROM node:10.15.2
MAINTAINER VdMtl

# Create app directory
RUN mkdir -p /usr/src/lib
RUN echo "America/Montreal" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /usr/src/lib

# Install all dependencies
COPY . /usr/src/lib
RUN npm install -g yarn@1.3.2 && \
    yarn

# Bundle app source
RUN yarn build 

# Publish the library
CMD ["npm", "publish", "dist/core-components-angular-lib", "--tag", "latest", "--unsafe-perm"]
