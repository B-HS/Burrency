FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Copy the entire backend directory
COPY backend ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Set environment variable
ENV NODE_ENV=production

# Expose the application port
EXPOSE 31513

# Run the application
CMD ["bun", "run", "src/index.ts"]