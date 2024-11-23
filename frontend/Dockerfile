# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files first (to cache `npm install`)
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files
COPY ./frontend .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 5000
EXPOSE 5000

# Start serve
CMD ["serve", "-s", "dist", "-l", "5000"]
