// Imports the Express Router
const { Router } = require("express");

// Imports the product controller
const productController = require("../controllers/product.controller");

// Imports the validation and authentication middlewares
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

// Imports the validation schemas
const {
  createProductSchema,
  updateProductSchema,
} = require("../schemas/product.schema");

// Creates a new router instance
const router = Router();

// Public routes
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Protected routes
router.post(
  "/",
  authenticate,
  validate(createProductSchema),
  productController.create
);
router.put(
  "/:id",
  authenticate,
  validate(updateProductSchema),
  productController.update
);
router.delete("/:id", authenticate, productController.remove);

// Exports the product routes
module.exports = router;