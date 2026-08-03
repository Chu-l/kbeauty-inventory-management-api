// Validates the request body against the provided schema
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  // Returns validation errors if the request is invalid
  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Replaces the request body with the validated data
  req.body = result.data;
  // Continues to the next middleware
  next();
};

// Exports the validation middleware
module.exports = { validate };