// Imports bcrypt for password hashing
const bcrypt = require("bcryptjs");
// Imports JWT for authentication
const jwt = require("jsonwebtoken");
// Imports the database helper functions
const { readDB, writeDB } = require("../utils/db");
// Imports the user model
const { createUser } = require("../models/user.model");

// Registers a new user
const register = async ({ email, password }) => {
  const db = readDB("users.json");

  // Checks if the email is already registered
  const exists = db.users.find((user) => user.email === email);

  if (exists) {
    const error = new Error("Email is already registered");
    error.status = 409;
    throw error;
  }

  // Hashes the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Creates a new user with the hashed password
  const newUser = createUser({
    email,
    password: hashedPassword,
    role: "user",
  });

  // Saves the new user
  db.users.push(newUser);
  writeDB("users.json", db);

  // Returns the user without the password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Authenticates a user
const login = async ({ email, password }) => {
  const db = readDB("users.json");

  // Finds the user by email
  const user = db.users.find((user) => user.email === email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // Compares the provided password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // Generates a JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h"
    }
  );

  return { token };
};

// Returns all users
const getAll = () => {
  const db = readDB("users.json");
  // Excludes passwords from the response
  return db.users.map(({ password, ...user }) => user);
};

// Returns a user by ID
const getById = (id) => {
  const db = readDB("users.json");

  // Finds the user by ID
  const user = db.users.find((user) => user.id === id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Excludes the password from the response
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Updates a user
const update = (id, fields) => {
  const db = readDB("users.json");

  // Finds the user index
  const index = db.users.findIndex((user) => user.id === id);

  if (index === -1) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Updates the user data
  db.users[index] = { ...db.users[index], ...fields, id };

  // Saves the changes
  writeDB("users.json", db);

  // Excludes the password from the response
  const { password, ...userWithoutPassword } = db.users[index];
  return userWithoutPassword;
};

// Deletes a user
const remove = (id) => {
  const db = readDB("users.json");

  // Finds the user index
  const index = db.users.findIndex((user) => user.id === id);

  if (index === -1) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Removes the user
  db.users.splice(index, 1);
  // Saves the changes
  writeDB("users.json", db);
};

// Exports the user service functions
module.exports = { register, login, getAll, getById, update, remove };