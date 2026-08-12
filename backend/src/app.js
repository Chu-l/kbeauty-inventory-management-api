// Loads the environment variables from the .env file
// and makes them available through process.env
require("dotenv").config();

// Imports the Express framework
const express = require("express");

// Imports cors
const cors = require("cors");

// Imports the routes related to users and products
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

// Imports the middleware responsible for handling errors
const { errorHandler } = require("./middlewares/error.middleware");

// Imports the middleware responsible for handling errors
const app = express();

// Middleware
app.use(cors({
  origin: "https://kbeauty-inventory-management-api.vercel.app"
}));
app.use(express.json());

// Registers all user routes under the "/api/users" path
// Example: GET /api/users
app.use("/api/users", userRoutes);
// Registers all product routes under the "/api/products" path
// Example: GET /api/products
app.use("/api/products", productRoutes);

// Registers the error-handling middleware
// It should be placed after the routes so it can catch
// any errors generated while processing requests
app.use(errorHandler);

// Gets the port number from the environment variables.
// If PORT is not defined, it defaults to 3000.
const PORT = process.env.PORT || 3000; 

// Starts the server and listens for incoming requests
// on the specified port.
app.listen(PORT, () => {
  // Prints a message in the terminal once the server
  // has started successfully
  console.log(`Server running at http://localhost:${PORT}`);
});

// Exports the Express application so it can be imported
// and used in other files (for example, in tests).
module.exports = app;