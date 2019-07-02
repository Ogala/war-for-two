FROM node:alpine

# Create and set working directory for image
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json to allow using cached packages
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy source files to working directory
COPY . .

# Define command for starting app process
CMD ["/usr/local/bin/npm", "start"]