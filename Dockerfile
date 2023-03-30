# Set the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /auth-client

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the app is running on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]