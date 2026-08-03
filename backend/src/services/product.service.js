// Imports the database helper functions
const { readDB, writeDB } = require("../utils/db");

// Imports the product model
const { createProduct } = require("../models/product.model");

// Returns all products
const getAll = () => {
  const db = readDB("products.json");
  return db.products;
};

// Returns a product by ID
const getById = (id) => {
  const db = readDB("products.json");

  // Finds the product by ID
  const product = db.products.find((product) => product.id === id);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return product;
};

// Creates a new product
const create = (fields) => {
  const db = readDB("products.json");

  // Creates the product object
  const newProduct = createProduct(fields);

  // Saves the new product
  db.products.push(newProduct);

  writeDB("products.json", db);

  return newProduct;
};

// Updates a product
const update = (id, fields) => { 
  const db = readDB("products.json");

  // Finds the product index
  const index = db.products.findIndex((product) => product.id === id);

  if (index === -1) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  // Updates the product data
  db.products[index] = { ...db.products[index], ...fields, id };

  // Saves the changes
  writeDB("products.json", db);

  return db.products[index];
};

// Deletes a product
const remove = (id) => {
  const db = readDB("products.json");

  // Finds the product index
  const index = db.products.findIndex((product) => product.id === id);

  if (index === -1) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  // Removes the product
  db.products.splice(index, 1);
  // Saves the changes
  writeDB("products.json", db);
};

// Exports the product service functions
module.exports = { getAll, getById, create, update, remove };