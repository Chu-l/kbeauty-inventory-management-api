// Imports the JWT library
const jwt = require("jsonwebtoken");

// Authenticates requests using a JWT
const authenticate = (req, res, next) => {
    // Gets the Authorization header
    const authHeader = req.headers.authorization;
    // Checks if the token is present and has the correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ message: "Authentication token not found" });
    }
    // Extracts the token from the Authorization header
    const token = authHeader.split(" ")[1];
    try {
        // Verifies and decodes the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Stores the decoded user data in the request
        req.user = decoded;
        // Continues to the next middleware
        next();
    } catch (error) {
        return res
        .status(401)
        .json({ message: "Invalid or expired token" });
    }
};

// Allows access only to administrators
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

// Exports the authentication middleware
module.exports = { authenticate, isAdmin };