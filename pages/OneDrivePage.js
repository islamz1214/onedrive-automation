module.exports = {
    url: 'https://onedrive.live.com/',
    elements: {
        createButton: {
            selector: 'button[class="od-Dialog-action od-Button--primary od-Button"]'
        },
        dataFile: {
            selector: 'div[data-automationid="data-file.txt"]'
        },
        dataFileCheckbox: {
            selector: 'div[data-automationid="data-file.txt"] span[role=checkbox]'
        },
        deleteButton: {
            selector: 'button[name=Delete]'
        },
        documentsFolder: {
            selector: '//span[contains(@data-automationid,"name")][text()="Documents"]',
            locateStrategy: 'xpath'
        },
        folderButton: {
            selector: 'button[name=Folder]'
        },
        infoIcon: {
            selector: 'i[data-icon-name=Info]'
        },
        infoIconDetails: {
            selector: 'h2[class="od-DetailsPane-PrimaryPane-header-title"]'
        },
        infoIconSectionType: {
            selector: 'dl[class="InfoPaneSection-informationBody"] > dd:nth-of-type(1)'
        },
        inputFolderName: {
            selector: 'input[class="od-FolderBuilder-nameInput od-TextField-field"]'
        },
        itemDescription: {
            selector: 'div[class=OperationMonitor-itemDescription]'
        },
        newButton: {
            selector: 'button[name=New]'
        },
        openFileButton: {
            selector: 'button[name="Open File"]'
        },
        originalFileThreeDots: {
            selector: 'div[class="od-Panel-container"] div[class="ms-List-cell"][data-list-index="1"] div[aria-colindex="2"]'
        },
        saveButton: {
            selector: 'button[name="Save"]'
        },
        tempFolder: {
            // This selctor will be visible once the folder is created
            selector: '//span[contains(@data-automationid,"name")][text()="Temp"]',
            locateStrategy: 'xpath'
        },
        tempFolderCheckbox: {
            // This selctor will be visible once the folder is created
            selector: 'div[data-automationid="Temp"] span[role=checkbox]'
        },
        textEditorButton: {
            selector: 'button[name="Open in Text Editor"]'
        },
        updatedFileThreeDots: {
            selector: 'div[class="od-Panel-container"] div[class="ms-List-cell"][data-list-index="0"] div[aria-colindex="2"]'
        },
        versionHistoryButton: {
            selector: 'button[name="Version history"]'
        },
        viewLines: {
            selector: 'div[class="TextEditor"]'
        }
    }
};