# onedrive-automation

<h3>Setup:</h3>

Create a microsoft account at https://login.live.com

Create a .env file in the root directory and paste the following (input microsoft credentials):

    ONEDRIVE_EMAIL=[your one drive email]
    ONEDRIVE_PASSWORD=[your one drive password]


Run -> npm install

Run -> npx nightwatch -e chrome

The following npm packages are used:
- Name: callback-timeout, Version: 4.0.0, License: MIT, website = https://www.npmjs.com/package/callback-timeout
- Name: chromedriver, Version: 79.0.2, License: Apache-2.0, website = https://www.npmjs.com/package/chromedriver
- Name: fs, Version: 0.0.1-security, License: ISC, website = https://www.npmjs.com/package/fs
- Name: geckodriver, Version: 1.19.1, License: MPL-2.0, website = https://www.npmjs.com/package/geckodriver
- Name: nightwatch, Version: 1.3.4, License: MIT, website = https://www.npmjs.com/package/nightwatch

   
<h3>Test Cases:</h3>

Login to OneDrive web application using user credentials
- This test case ensures the user can login and is a dependency for next steps

Upload, verify, and track status of 0 byte file
- Attempts to upload a 0 byte file, but it returns an error message which gets asserted

Upload, verify, and track status of text file
- Uploads file with data successfully and assert by checking that the file element exist

Select uploaded document, click info button, and verify metadata
- Verify metadata, assert the filename and file type

Update the contents of the text document from the OneDrive editor and click on save
- Appends text to the file and saves the new version

Download both versions
- Downloads both original and updated files to the downloads folder

Compare the contents to make sure they are downloaded correctly
- Checks files are downloaded and content from orginal and updated files remain intact
- This doens't use nightwatch since it's not a browser test but uses node js "tap" for validation
- Generates a seperate report in the tests_output folder

Delete the document from OneDrive.
- The uploaded file gets deleted, this makes a re-test possible

Create "temp" folder and delete that folder - Extra Text Case
- Title explains it well, assert the folder element exist

<h3>Scalability:</h3>

- Page object models allow for clean and reusable code
- Files are organized to nightwatch standards

<h3>Extend Framework:</h3>

- Nightwatch allows capabilities to extend it's framework
- Developers can create custom commands, assertions, and reporter
- https://nightwatchjs.org/guide/extending-nightwatch/
