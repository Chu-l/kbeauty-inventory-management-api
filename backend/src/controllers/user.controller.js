// Imports the user service
const userService = require("../services/user.service");

// Registers a new user
const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Authenticates a user
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Returns all users
const getAll = (req, res, next) => {
  try {
    const users = userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Returns a user by ID
const getById = (req, res, next) => {
  try {
    const user = userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Updates a user
const update = (req, res, next) => {
  try {
    const user = userService.update(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Deletes a user
const remove = (req, res, next) => {
  try {
    userService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Exports the user controller functions
module.exports = { register, login, getAll, getById, update, remove };