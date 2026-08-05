// Imports the Express Router
const { Router } = require("express");

// Imports the product controller
const productController = require("../controllers/product.controller");

// Imports the validation and authentication middlewares
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");

// Imports the validation schemas
const {
  createProductSchema,
  updateProductSchema,
} = require("../schemas/product.schema");

// Creates a new router instance
const router = Router({
  caseSensitive: false,
});

// Public routes
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Protected routes
router.post(
  "/",
  authenticate,
  isAdmin,
  validate(createProductSchema),
  productController.create
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validate(updateProductSchema),
  productController.update
);
router.delete(
  "/:id", 
  authenticate,
  isAdmin, 
  productController.remove
);

// Exports the product routes
module.exports = router;