# Use the Node 20 image as the base image
FROM node:20

# Install LibreOffice and required dependencies
RUN apt-get update && \
    apt-get install -y libreoffice

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for Backend
COPY ./Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application files
COPY ./Backend ./

# Expose port 3000 for the backend
EXPOSE 3000

# Specify the command to run the application
CMD ["npm", "start"]
