FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set proper permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "dev", "--host"]