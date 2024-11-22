# Use the official Node.js image as the base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the frontend directory
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files (including index.html)
COPY ./frontend .

# Debug: List contents and package.json
RUN ls -la
RUN cat package.json

# Build the app (for production)
RUN npm run build

# Start fresh with a new stage for smaller final image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy only the built files from previous stage
COPY --from=build /app/dist ./dist

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["serve", "-s", "dist", "-l", "5000"]