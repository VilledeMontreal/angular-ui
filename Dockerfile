FROM node:16-alpine
LABEL MAINTAINER="VdMtl" 

# Create app directory
RUN mkdir -p /usr/src/lib && chown -R node:node /usr

WORKDIR /usr/src/lib

# Install all dependencies
COPY --chown=node:node . /usr/src/lib

# Install deps
RUN npm i

# Build library
RUN npm run build 

# Publish the library
CMD ["npm", "publish", "dist/core-components-angular-lib", "--tag", "latest", "--unsafe-perm"]
