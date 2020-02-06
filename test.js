'use strict'
const { config } = require('./config.js')
const { exec } = require("child_process");



module.exports = {
  'Login to OneDrive web application using user credentials': function (browser) {

  const signInPage = browser.page.SignInPage();
    signInPage
      .navigate()
      .waitForElementVisible('@emailInput')
      .setValue('@emailInput', config.email)
      .click('@nextSignInButton')
      .waitForElementVisible('@passwordInput')
      .setValue('@passwordInput', config.password)
      .waitForElementVisible('@nextSignInButton')
      .click('@nextSignInButton')
  },


'Compare the contents to make sure they are downloaded correctly': function() {
        
    // Not testing within a browser but actual files that are downloaded in project folder
    // End of test, will delete files in downloaded folder, for re-testing purposes
    // Utilizing "tap" for node js assertion and outputing the resuts in ./tests_output/compareFileTestReport.txt
    exec("node ../otherTests/compareFileTest.js > ../tests_output/compareFileTestReport.txt", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      });
  }
}