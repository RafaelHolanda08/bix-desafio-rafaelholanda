# Use the official Cypress base image
FROM cypress/included:15.3.0

# Set working directory
WORKDIR /app

# Copy only the files you need
COPY package.json .
COPY cypress.config.js .
COPY cypress ./cypress

# Install dependencies
RUN npm install

# Default command: run Cypress tests headlessly
CMD ["npx", "cypress", "run"]