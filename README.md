# K-Beauty Inventory Manager

Web application for managing a K-Beauty product inventory.

The project consists of a REST API developed with Node.js and Express, and a static frontend developed with HTML, CSS and JavaScript.

## Project Structure

```text
clase20260713/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── pnpm-lock.yaml
│
└── frontend/
    ├── pages/
    │   ├── login.html
    │   ├── login.js
    │   ├── register.html
    │   └── register.js
    │
    ├── index.html
    ├── style.css
    └── app.js
```

## Technologies

### Backend

- Node.js
- Express
- JWT (JSON Web Token)
- bcryptjs
- Zod
- UUID
- dotenv
- CORS

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage

### Tools

- Postman
- Git
- GitHub

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the backend folder:

```bash
cd backend
```

Install the dependencies:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=3000
JWT_SECRET=your_secret_key
```

The `.env` file contains sensitive information and must not be uploaded to GitHub.

## Running the Backend

To start the server:

```bash
pnpm start
```

For development with Nodemon:

```bash
pnpm dev
```

The API will be available at:

```text
http://localhost:3000
```

## Frontend

The frontend is located in the `frontend` folder.

It provides:

- Product inventory dashboard
- Product listing
- User registration
- User login
- Logged-in user information
- Logout
- Admin product management
- Add product
- Edit product
- Delete product
- Stock information
- Inventory statistics

The frontend communicates with the backend API using the Fetch API.

## Authentication

The application uses JWT for authentication.

When a user logs in successfully, the server returns a JWT token.

The token is stored in the browser's `localStorage` and is sent to protected API endpoints using the `Authorization` header.

Example:

```http
Authorization: Bearer <token>
```

## User Roles

The application supports two user roles:

- `user`
- `admin`

### User

Regular users can:

- Log in
- View products
- Search/view the inventory

### Admin

Administrators can:

- View products
- Add products
- Edit products
- Delete products

The admin-only routes are protected using the `isAdmin` middleware.

## API Endpoints

### Users

#### Register

```http
POST /api/users/register
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/users/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

A successful login returns a JWT token.

---

# Products

## Get all products

```http
GET /api/products
```

Returns the list of products.

Example response:

```json
[
  {
    "id": "123",
    "name": "COSRX Snail Mucin",
    "description": "Hydrating essence",
    "price": 25000,
    "stock": 15
  }
]
```

## Add a product

```http
POST /api/products
```

**Requires authentication and admin role.**

Example request:

```json
{
  "name": "COSRX Snail Mucin",
  "description": "Hydrating essence",
  "price": 25000,
  "stock": 15
}
```

The request must include the JWT:

```http
Authorization: Bearer <admin_token>
```

## Edit a product

```http
PUT /api/products/:id
```

**Requires authentication and admin role.**

Example:

```http
PUT /api/products/123
```

Example request:

```json
{
  "name": "COSRX Snail Mucin Advanced",
  "description": "Hydrating and repairing essence",
  "price": 28000,
  "stock": 20
}
```

The request must include the JWT:

```http
Authorization: Bearer <admin_token>
```

## Delete a product

```http
DELETE /api/products/:id
```

**Requires authentication and admin role.**

Example:

```http
DELETE /api/products/123
```

The request must include the JWT:

```http
Authorization: Bearer <admin_token>
```

Before deleting a product, the frontend asks the administrator for confirmation.

## Middleware

The backend uses authentication and authorization middleware.

### authenticate

Checks whether the request contains a valid JWT token.

### isAdmin

Checks whether the authenticated user has the `admin` role.

Example:

```javascript
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  next();
};
```

Protected product routes use both middlewares:

```javascript
router.post(
  "/",
  authenticate,
  isAdmin,
  validate(createProductSchema),
  productController.create
);
```

```javascript
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validate(updateProductSchema),
  productController.update
);
```

```javascript
router.delete(
  "/:id",
  authenticate,
  isAdmin,
  productController.remove
);
```

## Validation

The API uses Zod to validate incoming data.

Product creation and update requests are validated before reaching the controller.

This helps ensure that the API receives valid data and provides appropriate error responses when validation fails.

## Password Security

Passwords are hashed using `bcryptjs` before being stored.

Plain-text passwords are not stored in the database/data files.

## Error Handling

The backend uses a centralized error-handling middleware to manage errors generated by the API.

The frontend also displays error or confirmation messages to the user.

Examples include:

- Product added successfully
- Product updated successfully
- Product deleted successfully
- Invalid credentials
- Access denied
- Validation errors

## Testing

The API routes were tested using Postman before integrating them with the frontend.

The following functionality was tested:

- User registration
- User login
- JWT authentication
- Product listing
- Product creation
- Product update
- Product deletion
- Admin authorization
- Unauthorized access
- Invalid requests

## GitHub

Repository:

```text
YOUR_GITHUB_REPOSITORY_URL
```

## API Documentation

API documentation can be accessed here:

```text
YOUR_API_DOCUMENTATION_URL
```

## Environment and Security

Sensitive environment variables are stored in `.env`.

The `.env` file and `node_modules` are excluded from the Git repository through `.gitignore`.

Example `.gitignore`:

```gitignore
node_modules/
.env
```

## Future Deployment

The backend API will be deployed using Render.

The deployed API URL will be added here once the deployment is completed:

```text
https://YOUR-API-URL.onrender.com
```

## Author

K-Beauty Inventory Manager project developed as part of the ADA ITW course.
