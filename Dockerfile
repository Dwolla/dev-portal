# Create image from node v16
FROM node:21

# Install pnpm
RUN npm i -g pnpm

# All further commands to happen in /app directory (WORKDIR is similar to cd)
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Copy pnpm-lock.yaml to /app
COPY pnpm-lock.yaml ./

# Install npm dependencies with pnpm
RUN pnpm install

# Copy project files to /app directory
COPY . .

# Expose ports
EXPOSE 3000

# Run application
CMD ["pnpm", "dev"]
