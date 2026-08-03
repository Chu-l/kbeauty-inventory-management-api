# K-Beauty Inventory Management API

A REST API built with Node.js and Express for managing a K-Beauty inventory. It supports user authentication with JWT and product management using CRUD operations.

---

# Features

- User registration
- User authentication (JWT)
- Product CRUD
- Request validation with Zod
- Password hashing with bcrypt
- JSON file storage
- Error handling middleware

---

# Technologies

- Node.js
- Express.js
- JWT
- bcryptjs
- Zod
- UUID

---

# Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/kbeauty-inventory-management-api.git
```

Go to the project folder:

```bash
cd kbeauty-inventory-management-api
```

Install the dependencies:

```bash
pnpm install
```

or

```bash
npm install
```

---

# Environment Variables

Create a `.env` file based on `example.env`.

Example:

```env
PORT=3000
JWT_SECRET=your_secret_key
```

---

# Run the Server

Using pnpm:

```bash
pnpm start
```

or using npm:

```bash
npm start
```

The server will run at:

```text
http://localhost:3000
```

---

# API Documentation

See the complete API documentation below.

- [User Endpoints](#user-endpoints)
- [Product Endpoints](#product-endpoints)


## Base URL

```text
http://localhost:3000/api
```

---

# User Endpoints

## Register a New User

Creates a new user account.

**Method**

```http
POST /users/register
```

**URL**

```text
http://localhost:3000/api/users/register
```

**Body (JSON)**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Login

Authenticates a user and returns a JWT token.

**Method**

```http
POST /users/login
```

**URL**

```text
http://localhost:3000/api/users/login
```

**Body (JSON)**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "your_jwt_token"
}
```

Copy the token and use it in the Authorization tab of Postman.

- Authorization
- Type: **Bearer Token**
- Paste the JWT token in the **Token** field.

---

## Get All Users

Returns all registered users.

> Authentication required.

**Method**

```http
GET /users
```

**URL**

```text
http://localhost:3000/api/users
```

---

## Get User by ID

Returns a specific user.

> Authentication required.

**Method**

```http
GET /users/:id
```

Example:

```text
http://localhost:3000/api/users/USER_ID
```

---

## Update User

Updates an existing user.

> Authentication required.

**Method**

```http
PUT /users/:id
```

**Example Body**

```json
{
  "email": "newemail@example.com"
}
```

---

## Delete User

Deletes a user.

> Authentication required.

**Method**

```http
DELETE /users/:id
```

---

# Product Endpoints

## Get All Products

Returns all products.

> Public endpoint. Authentication is not required.

**Method**

```http
GET /products
```

**URL**

```text
http://localhost:3000/api/products
```

---

## Get Product by ID

Returns a specific product.

> Public endpoint. Authentication is not required.

**Method**

```http
GET /products/:id
```

Example:

```text
http://localhost:3000/api/products/PRODUCT_ID
```

---

## Create Product

Creates a new product.

> Authentication required.

**Method**

```http
POST /products
```

**URL**

```text
http://localhost:3000/api/products
```

**Body (JSON)**

```json
{
  "name": "Beauty of Joseon Relief Sun",
  "description": "SPF 50+ sunscreen with rice and probiotics.",
  "price": 52199,
  "stock": 20
}
```

---

## Update Product

Updates an existing product.

> Authentication required.

**Method**

```http
PUT /products/:id
```

**Example Body**

```json
{
  "price": 20,
  "stock": 35
}
```

---

## Delete Product

Deletes a product.

> Authentication required.

**Method**

```http
DELETE /products/:id
```

---

# Authentication

Protected endpoints require a valid JWT token.

In Postman:

1. Open the **Authorization** tab.
2. Select **Bearer Token**.
3. Paste the token obtained from the **Login** endpoint.
