// Imports the Zod validation library
const { z } = require("zod");

// Schema for user registration
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Schema for user login
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Schema for updating a user
const updateUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),
});

// Exports the validation schemas
module.exports = { registerSchema, loginSchema, updateUserSchema };