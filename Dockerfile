# Use the official Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.38.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright browsers
RUN npx playwright install

# Copy the rest of the application files
COPY . .

# Set environment variables (optional, for debugging)
ENV NODE_ENV=production

# Set the default command to run Playwright tests
CMD ["npx", "playwright", "test"]