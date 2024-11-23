# Use Node.js image for the first stage
FROM node:20 AS base

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY ./Backend/package*.json ./
RUN npm install

# Install LibreOffice in a separate stage to avoid reinstallation on code changes
FROM base AS libreoffice
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the rest of the backend source files
COPY ./Backend .

# Final stage
FROM libreoffice AS final

# Copy only necessary files and dependencies from the previous stages
COPY --from=base /app /app
COPY --from=libreoffice /usr/lib/libreoffice /usr/lib/libreoffice

# Expose port and set the working directory
EXPOSE 3000
WORKDIR /app

# Start the server
CMD ["npm", "start"]
