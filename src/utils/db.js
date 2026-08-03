// Imports the File System module
const fs = require("fs");
// Imports the Path module to work with file paths
const path = require("path");

// Reads and parses a JSON file
const readDB = (filename) => {
   // Builds the full path to the data file
  const filepath = path.join(__dirname, "../data", filename);
  // Reads the file content as text
  const raw = fs.readFileSync(filepath, "utf-8");
  // Converts the JSON string into a JavaScript object
  return JSON.parse(raw); 
};

// Writes data to a JSON file
const writeDB = (filename, data) => {
  // Builds the full path to the data file
  const filepath = path.join(__dirname, "../data", filename);
  // Converts the data to JSON and saves it
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

// Exports the database helper functions
module.exports = { readDB, writeDB };