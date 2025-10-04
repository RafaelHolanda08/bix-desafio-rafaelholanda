const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    env: {
      baseUrlAddress: 'http://host.docker.internal:3001',
      validUserName :'user@test.com',
      validPassword :'user123',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
