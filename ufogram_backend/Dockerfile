# Use the official Node.js image with a version that supports modern JavaScript syntax
FROM node:21

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 8080

# Run the web service on container startup.
CMD ["node", "index.js"]