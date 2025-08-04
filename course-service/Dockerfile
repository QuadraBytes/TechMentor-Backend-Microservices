# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the port (from .env or default 5002)
EXPOSE 5002

# Run the app
CMD ["npm", "start"]
