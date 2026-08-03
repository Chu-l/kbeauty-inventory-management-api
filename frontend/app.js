const $productList = document.getElementById("product-list");

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
});