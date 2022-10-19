# Create image from node v16
FROM node:19

# All further commands to happen in /app directory (WORKDIR is similar to cd)
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Copy yarn.lock to /app
COPY yarn.lock ./

# Install npm dependencies with yarn
RUN yarn install

# Copy project files to /app directory
COPY . .

# Expose ports
EXPOSE 3000

# Run application
CMD ["yarn", "dev"]
