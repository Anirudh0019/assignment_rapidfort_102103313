# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY ./Backend/package*.json ./

# Install dependencies
RUN npm install

# Install LibreOffice (try with --no-install-recommends for a leaner installation)
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the backend source files
COPY ./Backend .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
