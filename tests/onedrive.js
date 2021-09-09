'use strict'

require('dotenv').config()
const { exec } = require("child_process");

module.exports = {
  'Login to OneDrive web application using user c redentials': function (browser) {

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

  'Upload, verify, and track status of 0 byte file' : function (browser) {

    const OneDrivePage = browser.page.OneDrivePage();
      OneDrivePage
        .navigate()
        .waitForElementVisible('@documentsFolder')
        .click('@documentsFolder')
        .waitForElementPresent('input[type="file"]')
        .setValue('input[type="file"]', require('path').resolve(process.env.PROJECT_PATH + '/test_data/empty-file.txt'))
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
        .setValue('input[type="file"]', require('path').resolve(process.env.PROJECT_PATH + '/test_data/data-file.txt'))
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
            this.waitForElementNotPresent('@textEditorButton')
        })
        .waitForElementVisible('div[class="TextEditor-editorFrame showUnused"]')
        .click('div[class="TextEditor-editorFrame showUnused"]', function() {
            this.keys(' This file has been updated with Nightwatch JS.')
        })
        .pause(2000)
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
              var handle = result.value[2];
              this.switchWindow(handle);
            })
            this.waitForElementNotPresent('@textEditorButton')
        })
        .waitForElementVisible('@versionHistoryButton')
        .click('@versionHistoryButton')
        .waitForElementVisible('@originalFileThreeDots')
        .click('@originalFileThreeDots')
        .waitForElementVisible('@openFileButton')
        .click('@openFileButton')
        browser.pause(5000)
        OneDrivePage.waitForElementVisible('@updatedFileThreeDots')
        .click('@updatedFileThreeDots')   
        .waitForElementVisible('@openFileButton')
        .click('@openFileButton')  
        browser.pause(5000)

    },

    'Compare the contents to make sure they are downloaded correctly': function(browser) {
        
      // Not testing within a browser but actual files that are downloaded in project folder
      // End of test, will delete files in downloaded folder, for re-testing purposes
      // Utilizing "tap" for node js assertion and outputing the resuts in ./tests_output/compareFileTestReport.txt
      browser.perform(function(done) {
        exec("node ./otherTests/compareFileTest.js > ./tests_output/compareFileTestReport.txt", (error, stdout, stderr) => {
          if (error) {
            browser.assert.fail(`error: ${error.message}`)
          } else if (stderr) {
            browser.assert.ok(`stderr: ${stderr}`);
          } else if(stdout) {
            browser.assert.ok(`stdout: ${stdout}`);
          }
          done()
        });
        })
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
          .moveToElement('@tempFolder', 0, 0)
          .waitForElementVisible('@tempFolderCheckbox')
          .click('@tempFolderCheckbox')
          .waitForElementVisible('@deleteButton')
          .click('@deleteButton')
          .click('@deleteButton')
          .end()
     }
}