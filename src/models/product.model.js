// Imports the UUID library to generate unique IDs
const { v4: uuidv4 } = require("uuid");

// Creates a new product object
const createProduct = ({ name, description, price, stock }) => ({
  id: uuidv4(),
  name,
  description,
  price,
  stock,
  createdAt: new Date().toISOString(),
});

// Exports the product creation function
module.exports = { createProduct };