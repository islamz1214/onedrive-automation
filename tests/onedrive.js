'use strict'
const { config } = require('../config.js')
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

  'Upload, verify, and track status of 0 byte file' : function (browser) {

    const OneDrivePage = browser.page.OneDrivePage();
      OneDrivePage
        .navigate()
        .useXpath()
        .waitForElementVisible('@documentsFolder')
        .click('@documentsFolder')
        .useCss()
        .setValue('input[type="file"]', require('path').resolve(process.cwd() + '/test_data/empty-file.txt'))
        .waitForElementVisible('@itemDescription')
        .assert.containsText('@itemDescription', "Sorry, OneDrive can't upload empty folders or empty files. Please try again.")  
    },

  'Upload, verify, and track status of text file': function (browser) {

    const OneDrivePage = browser.page.OneDrivePage();
      OneDrivePage
        .navigate()
        .useXpath()
        .waitForElementVisible('@documentsFolder')
        .click('@documentsFolder')
        .useCss()
        .setValue('input[type="file"]', require('path').resolve(process.cwd() + '/test_data/data-file.txt'))
        .waitForElementVisible('@dataFile')
        .assert.elementPresent('@dataFile')
    },

  'Select uploaded document, click info button, and verify metadata': function (browser) {

    const OneDrivePage = browser.page.OneDrivePage();
      OneDrivePage
        .navigate()
        .useXpath()
        .waitForElementVisible('@documentsFolder')
        .click('@documentsFolder')
        .useCss()
        .waitForElementVisible('@dataFileCheckbox')
        .click('@dataFileCheckbox')
        .waitForElementVisible('@infoIcon')
        .click('@infoIcon')
        .waitForElementVisible('@infoIconDetails')
        .assert.containsText('@infoIconDetails', 'data-file.txt')
        .waitForElementVisible('@infoIconSectionType')
        .assert.containsText('@infoIconSectionType', 'Text Document')
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
        .waitForElementVisible('@viewLines')
        .click('@viewLines', function() {
            this.keys(' This file has been updated with Nightwatch JS.')
        })
        .waitForElementVisible('@saveButton')
        .click('@saveButton', function() {
          this.pause(5000) // Give some time to save before next step
        })
        
    },
    
  'Download both versions': function (browser) {

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
        .waitForElementVisible('@versionHistoryButton')
        .click('@versionHistoryButton')
        .waitForElementVisible('@originalFile')
        .click('@originalFile') 
        .waitForElementVisible('@updatedFile')
        .click('@updatedFile')         
    },

    'Compare the contents to make sure they are downloaded correctly': function() {
        
      // Not testing within a browser but actual files that are downloaded in project folder
      // End of test, will delete files in downloaded folder, for re-testing purposes
      // Utilizing "tap" for node js assertion and outputing the resuts in ./tests_output/compareFileTestReport.txt
      exec("node ./otherTests/compareFileTest.js > ./tests_output/compareFileTestReport.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        });
    },

    'Delete the document from OneDrive.': function (browser) {

      const OneDrivePage = browser.page.OneDrivePage();
        OneDrivePage
          .navigate()
          .useXpath()
          .waitForElementVisible('@documentsFolder')
          .click('@documentsFolder')
          .useCss()
          .waitForElementVisible('@dataFileCheckbox')
          .click('@dataFileCheckbox')
          .waitForElementVisible('@deleteButton')
          .click('@deleteButton', function() {
            this.pause(5000) // Give some time to save before next step)
          })
    },

    'Create "temp" folder and delete that folder - Extra Text Case': function(browser) {

      const OneDrivePage = browser.page.OneDrivePage();
        OneDrivePage
          .navigate()
          .waitForElementVisible('@newButton')
          .click('@newButton')
          .waitForElementVisible('@folderButton')
          .click('@folderButton')
          .waitForElementVisible('@inputFolderName')
          .click('@inputFolderName', function() {
              this.keys('Temp')
          })
          .waitForElementVisible('@createButton')
          .click('@createButton')
          .waitForElementVisible('@tempFolder')
          .assert.elementPresent('@tempFolder')
          .waitForElementPresent('@tempFolderCheckbox')
          .click('@tempFolderCheckbox')
          .waitForElementVisible('@deleteButton')
          .click('@deleteButton')
          .end()
     }
}