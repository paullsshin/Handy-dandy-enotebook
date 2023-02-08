const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => {
    const notes = JSON.parse(data)
    console.log(notes);
    return res.json(notes)
  })
);

// POST Route for submitting feedback
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title, text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

module.exports = router;