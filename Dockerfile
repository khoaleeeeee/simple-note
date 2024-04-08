FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and other necessary files
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Your app binds to port 3000 by default, make sure you expose it
EXPOSE 3000

# Start the Node.js server
CMD ["node", "build"]
