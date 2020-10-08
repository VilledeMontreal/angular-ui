FROM node:10.22.1-alpine3.9
MAINTAINER VdMtl

# Create app directory
RUN mkdir -p /usr/src/lib

WORKDIR /usr/src/lib

# Install all dependencies
COPY . /usr/src/lib

# Install deps
RUN npm i

# Build library
RUN npm run build 

# Publish the library
CMD ["npm", "publish", "dist/core-components-angular-lib", "--tag", "latest", "--unsafe-perm"]
