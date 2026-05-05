// 🟢 LOAD CART (top of file)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

// 🟢 FETCH PRODUCTS FROM BACKEND
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(data);
  })
  .catch(err => console.log(err));


// 🟢 DISPLAY PRODUCTS FUNCTION
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick='addToCart(${JSON.stringify(product)})'>
          Add to Cart
        </button>
      </div>
    `;
  });
}


// 🟢 ADD TO CART FUNCTION
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();


const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
  });
}
