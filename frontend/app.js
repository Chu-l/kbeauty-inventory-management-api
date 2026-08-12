// Gets the product container
const $productList = document.getElementById("product-list");

const $adminActions = document.getElementById("admin-actions");
const $addProduct = document.getElementById("add-product");

const $productForm = document.getElementById("product-form");
const $cancelProduct = document.getElementById("cancel-product");

const $productFormTitle =
  document.getElementById("product-form-title");

const $productFormSubmit =
  document.getElementById("product-form-submit");

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

let editingProductId = null;

const editProduct = async (productId) => {
  try {
    const response = await fetch(
      `https://kbeauty-inventory-management-backend.onrender.com/api/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const product = await response.json();

    if (!response.ok) {
      throw new Error(
        product.message || "Could not get product"
      );
    }

    editingProductId = productId;

    document.getElementById("product-name").value =
      product.name;

    document.getElementById("product-description").value =
      product.description;

    document.getElementById("product-price").value =
      product.price;

    document.getElementById("product-stock").value =
      product.stock;

    $productFormTitle.textContent = "Edit Product";
    $productFormSubmit.textContent = "Save Changes";

    $productForm.style.display = "block";

    $productForm.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

if (isAdmin) {
  $addProduct.addEventListener("click", () => {
    editingProductId = null;

    $productFormTitle.textContent = "Add Product";
    $productFormSubmit.textContent = "Add Product";

    $productForm.reset();
    $productForm.style.display = "block";
  });

  $cancelProduct.addEventListener("click", () => {
    $productForm.style.display = "none";
    $productForm.reset();
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
      const productId = e.target.dataset.id;

      editProduct(productId);
    }
  });

  //Form Submit
  $productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = Number(document.getElementById("product-price").value);
    const stock = Number(document.getElementById("product-stock").value);

    try {
      const url = editingProductId
        ? `https://kbeauty-inventory-management-backend.onrender.com/api/products/${editingProductId}`
        : "https://kbeauty-inventory-management-backend.onrender.com/api/products";

      const method = editingProductId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          (editingProductId
            ? "Could not update product"
            : "Could not create product")
        );
      }

      alert(
        editingProductId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      $productForm.reset();
      $productForm.style.display = "none";

      editingProductId = null;

      loadProducts();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}

// Logout
$logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./pages/login.html";
});

// Fetches all products from the API
const getProducts = async () => {
  const response = await fetch("https://kbeauty-inventory-management-backend.onrender.com/api/products", {
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
        <button class="edit-button" data-id="${product.id}">Edit</button>
        <button class="delete-button" data-id="${product.id}">Delete</button>
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

// Delete product
const deleteProduct = async (productId) => {
  const confirmed = confirm("Are you sure you want to delete this product?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `https://kbeauty-inventory-management-backend.onrender.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Could not delete product");
    }

    alert("Product deleted successfully!");

    loadProducts();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const productId = e.target.dataset.id;

    deleteProduct(productId);
  }
});

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
