# onedrive-automation

Create a microsoft account at https://login.live.com

Create a config.js file in the root directory and paste the following (input microsoft credentials):

    const config = {
        email: '',
        password: '',
    }

    module.exports = { config };

Create an empty "downloads" folder in the root directory

Run -> npm install

Run -> nightwatch -e chrome

The following npm packages are used:
- "callback-timeout": "^4.0.0"
- "chromedriver": "^79.0.2"
- "fs": "^0.0.1-security"
- "geckodriver": "^1.19.1"
- "nightwatch": "^1.3.4"

   
<h3>Test Cases</h3>

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
- Develoeprs can create custom commands, assertions, and reporter
- https://nightwatchjs.org/guide/extending-nightwatch/
