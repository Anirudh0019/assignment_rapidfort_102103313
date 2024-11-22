# Build stage
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY ./Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./Backend .

# Production stage
FROM node:20-slim

# Install LibreOffice and clean up in one layer
RUN apt-get update && \
    apt-get install -y libreoffice && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy node modules and source from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose port 3000
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# Create a non-root user and switch to it
RUN useradd -r -u 1001 -g root nodeuser
USER nodeuser

# Start the application
CMD ["npm", "start"]