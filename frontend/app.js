// Gets the product container
const $productList = document.getElementById("product-list");

const $adminActions = document.getElementById("admin-actions");
const $addProduct = document.getElementById("add-product");

// Gets the dashboard cards
const $totalProducts = document.getElementById("total-products");
const $lowStock = document.getElementById("low-stock");
const $inventoryValue = document.getElementById("inventory-value");

// Gets the JWT token (if the user is logged in)
const token = localStorage.getItem("token");

// Gets the logged-in user elements
const $loggedUser = document.getElementById("logged-user");
const $guestButtons = document.getElementById("guest-buttons");
const $userEmail = document.getElementById("user-email");
const $logout = document.getElementById("logout");

// Gets the user information from the JWT token
const getUserFromToken = (token) => {
  if (!token) return null;

  const payload = token.split(".")[1];

  return JSON.parse(atob(payload));
};

const user = getUserFromToken(token);

if (user) {
  // User is logged in
  $loggedUser.style.display = "flex";
  $guestButtons.style.display = "none";

  $userEmail.textContent = user.email;
} else {
  // User is not logged in
  $loggedUser.style.display = "none";
  $guestButtons.style.display = "flex";
}

const isAdmin = user?.role === "admin";

if (!isAdmin) {
  $adminActions.style.display = "none";
}

// Logout
$logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./pages/login.html";
});

// Fetches all products from the API
const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  console.log(response);

  return await response.json();
};

// Displays the products on the page
const renderProducts = (products) => {
  $productList.innerHTML = "";

  products.forEach((product) => {
    const stockClass =
      product.stock <= 5 ? "stock low-stock" : "stock";

    const adminButtons = isAdmin
      ? `
      <div class="product-actions">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    `
      : "";

    $productList.innerHTML += `
      <div class="product-card">

        <h3>${product.name}</h3>

        <p class="product-description">
          ${product.description || "No description available."}
        </p>

        <div class="product-info">
          <span class="price">$${product.price}</span>
          <span class="${stockClass}">
            Stock: ${product.stock}
          </span>
        </div>

        ${adminButtons}

      </div>
    `;
  });
};

// Updates the dashboard statistics
const updateDashboard = (products) => {
  $totalProducts.textContent = products.length;

  const lowStock = products.filter(
    (product) => product.stock <= 5
  ).length;

  $lowStock.textContent = lowStock;

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  $inventoryValue.textContent = `$${totalValue.toLocaleString()}`;
};

// Loads the page
const loadProducts = async () => {
  try {
    const products = await getProducts();

    renderProducts(products);
    updateDashboard(products);
  } catch (error) {
    console.error(error);
  }
};

loadProducts();
