// Imports the Express Router
const { Router } = require("express");

// Imports the user controller
const userController = require("../controllers/user.controller");

// Imports the validation and authentication middlewares
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

// Imports the validation schemas
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

// Creates a new router instance
const router = Router();

// Public routes
router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);

// Protected routes
router.get("/", authenticate, userController.getAll);
router.get("/:id", authenticate, userController.getById);
router.put(
  "/:id",
  authenticate,
  validate(updateUserSchema),
  userController.update
);
router.delete("/:id", authenticate, userController.remove);

// Exports the user routes
module.exports = router;