const fs = require('fs')
const tap = require('tap')
const path = require('path')
const timeout = require('callback-timeout');
const directory = process.cwd() + '\\downloads\\';
const originalFile = process.cwd() + '\\downloads\\data-file.txt';
const updatedFile  = process.cwd() + '\\downloads\\data-file (1).txt';

// Compare original file content
fs.readFile(originalFile, function(err, file) {
  if (err) throw err;
  tap.equal(file.toString(),
    "This file contains some text.",
    "Testing content in original file.");
})

// Compare updated file content
fs.readFile(updatedFile, (err, file) => {
  if (err) throw err;
  tap.equal(file.toString(), 
  "This file contains some text. This file has been updated with Nightwatch JS.",
  "Testing content in updated file.");
})

// Delete all files except .keep
// This is needed for re-testing, else downloaded duplicate file will have diff names
fs.readdir(directory, timeout((err, files) => {
  if (err) throw err;
  for (const file of files) {
    if(file !== ".keep") {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  }
}, 3000));
