/*const $productList = document.getElementById("product-list");

// Fetches all products from the API
const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");

  const products = await response.json();
  return products;
};

// Displays all products on the page
getProducts().then((products) => {
  products.forEach((product) => {
    $productList.innerHTML += `
      <div class="product-card">
        <h4>${product.name}</h4>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="price-container">
          <span class="price">$ ${product.price}</span>
          <span class="stock">Stock: ${product.stock}</span>
        </div>

        <button class="add-button">
          Add to Cart
        </button>
      </div>
    `;
  });
});*/

// Gets the product container
const $productList = document.getElementById("product-list");

// Gets the dashboard cards
const $totalProducts = document.getElementById("total-products");
const $lowStock = document.getElementById("low-stock");
const $inventoryValue = document.getElementById("inventory-value");

// Gets the JWT token (if the user is logged in)
const token = localStorage.getItem("token");

// Fetches all products from the API
const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return await response.json();
};

// Displays the products on the page
const renderProducts = (products) => {
  $productList.innerHTML = "";

  products.forEach((product) => {
    const stockClass = product.stock <= 5 ? "stock low-stock" : "stock";

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

      </div>
    `;
  });
};

// Updates the dashboard statistics
const updateDashboard = (products) => {
  $totalProducts.textContent = products.length;

  const lowStock = products.filter((product) => product.stock <= 5).length;

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