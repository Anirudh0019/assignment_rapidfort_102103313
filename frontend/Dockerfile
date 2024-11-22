# Use the official Node.js image as the base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the frontend directory
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files (including index.html)
COPY ./frontend /app

# Build the app (for production)
RUN npm run build

# Install a static server to serve the built app
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5000"]

# Expose port 5000 (or any other port)
EXPOSE 5000
