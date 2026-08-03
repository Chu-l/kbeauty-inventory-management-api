// Handles application errors
const errorHandler = (err, req, res, next) => {
    // Uses the provided status code or defaults to 500
    const status = err.status || 500;
    // Uses the provided error message or a default message
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
};

// Exports the error-handling middleware
module.exports = { errorHandler };