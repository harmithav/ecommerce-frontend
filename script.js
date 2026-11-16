
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let allProducts = [];

// LOAD PRODUCTS FROM MONGODB API
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to load products");
    }
    return res.json();
  })
  .then(data => {
    allProducts = data;
    displayProducts(allProducts);
  })
  .catch(err => console.error("Product loading error:", err));

// DISPLAY PRODUCTS
function displayProducts(products) {
  const container = document.getElementById("products");

  if (!container) return;

  let html = "";

  products.forEach(product => {
    html += `
      <div class="card">
        <img
          loading="lazy"
          src="${product.image}"
          onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'"
        />

        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <small>${product.category || ""}</small>

        <button onclick='addToCart(${JSON.stringify(product).replace(/'/g, "&#39;")})'>
          Add to Cart
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// FILTER PRODUCTS
function filterProducts(category) {
  if (category === "All") {
    displayProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter(product =>
    product.category === category
  );

  displayProducts(filteredProducts);
}

// SEARCH PRODUCTS
function searchProducts() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}

// ADD TO CART
function addToCart(product) {
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to Cart");
}

// UPDATE CART COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

updateCartCount();
