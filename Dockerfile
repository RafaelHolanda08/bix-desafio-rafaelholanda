FROM cypress/included:15.3.0

WORKDIR /app

COPY package.json .
COPY cypress.config.js .
COPY cypress ./cypress

RUN npm install

CMD ["npx", "cypress", "run"]