// Imports the Zod validation library
const { z } = require("zod");

// Schema for creating a product
const createProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().optional(),
  price: z
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  stock: z
    .number({ message: "Stock must be a number" })
    .int()
    .nonnegative({ message: "Stock cannot be negative" })
    .optional(),
});

// Schema for updating a product
const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del Producto es obligatorio" })
    .optional(),
  description: z.string().optional(),
  price: z
    .number({ message: "El Precio debe ser de tipo número" })
    .positive({ message: "El precio debe ser mayor a 0" })
    .optional(),
  stock: z
    .number({ message: "El Stock debe ser de tipo número" })
    .int()
    .nonnegative({ message: "El stock no puede ser negativo" })
    .optional(),
});

// Exports the validation schemas
module.exports = { createProductSchema, updateProductSchema };