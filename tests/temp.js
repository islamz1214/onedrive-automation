'use strict'

require('dotenv').config()

const { exec } = require("child_process");
const { inspect } = require('util');
module.exports = {
  'Login to OneDrive web application using user credentials': function (browser) {

  const signInPage = browser.page.SignInPage();
    signInPage
      .navigate()
      .waitForElementVisible('@emailInput')
      .setValue('@emailInput', process.env.ONEDRIVE_EMAIL)
      .waitForElementVisible('@nextSignInButton')
      .click('@nextSignInButton')
      .waitForElementVisible('@passwordInput')
      .waitForElementVisible('#idA_PWD_ForgotPassword')
      .setValue('@passwordInput', process.env.ONEDRIVE_PASSWORD)
      .waitForElementVisible('@nextSignInButton')
      .click('@nextSignInButton')
      .assert.title('Microsoft account')
      .waitForElementVisible('@nextSignInButton')
      .click('@nextSignInButton')
      .waitForElementNotPresent('@nextSignInButton')
    },

 
  'Update the contents of the text document from the OneDrive editor and click on save': function (browser) {

    const OneDrivePage = browser.page.OneDrivePage();
      OneDrivePage
        .navigate()
        .useXpath()
        .waitForElementVisible('@documentsFolder')
        .click('@documentsFolder')
        .useCss()
        .waitForElementVisible('@dataFileCheckbox')
        .click('@dataFileCheckbox')
        .waitForElementVisible('@textEditorButton')
        .click('@textEditorButton', function() {
            this.windowHandles(function(result) {
              var handle = result.value[1];
              this.switchWindow(handle);
            })
        })
        .pause(5000)
        .click('div[class="monaco-scrollable-element editor-scrollable vs"]', function() {
            this.keys(' This file has been updated with Nightwatch JS.')
        })
        .pause(2000)
        .waitForElementVisible('@saveButton')
        .click('@saveButton', function() {
          this.pause(5000) // Give some time to save before next step
        })
        
    },
}