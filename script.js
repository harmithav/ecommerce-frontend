// ✅ SHOW USER AFTER LOGIN

// ✅ ACCOUNT SYSTEM

const user = localStorage.getItem("user");

const accountBtn =
  document.getElementById("account-btn");

const dropdown =
  document.getElementById("account-dropdown");

const userEmail =
  document.getElementById("user-email");


// SHOW EMAIL
if(user){

  userEmail.innerText = "Email: " + user;

}else{

  userEmail.innerText = "Not Logged In";
}


// TOGGLE DROPDOWN
accountBtn.addEventListener("click", () => {

  dropdown.classList.toggle("show");

});


// LOGOUT
function logoutUser(){

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.href = "login.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

// 🟢 LOAD PRODUCTS
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(data);
  });

// 🟢 DISPLAY PRODUCTS
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// 🟢 ADD TO CART FUNCTION
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert("Added to cart!");
}

// 🟢 UPDATE CART COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// 🟢 SEARCH FUNCTION
function searchProducts() {
  const searchValue = document
    .getElementById("search")
    .value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(searchValue)
  );

  displayProducts(filtered);
}

// 🟢 INITIAL LOAD
updateCartCount();