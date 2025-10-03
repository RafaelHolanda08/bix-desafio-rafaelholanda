const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    env: {
      baseUrlAddress: 'http://localhost:3001',
      validUserName :'user@test.com',
      validPassword :'user123',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
