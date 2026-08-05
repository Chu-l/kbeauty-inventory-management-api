// Imports the UUID library to generate unique IDs
const { v4: uuidv4 } = require("uuid");

// Creates a new user object
const createUser = ({ email, password, role = "user" }) => ({
  id: uuidv4(),
  email,
  password,
  role,
  createdAt: new Date().toISOString(),
});

// Exports the user creation function
module.exports = { createUser };